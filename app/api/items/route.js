import { connectDB } from '@/lib/mongoose';
import Item from '@/models/item';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

// GET handler
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('q');
  const genre = searchParams.get('genre');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let query = {};

  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  if (genre) {
    const genreRegex = new RegExp(genre, 'i');
    query.$or = query.$or || [];
    query.$or.push(
      { genre: { $in: [genreRegex] } },
      { tags: { $in: [genreRegex] } }
    );
  }

  const totalCount = await Item.countDocuments(query);
  const movies = await Item.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ movies, totalCount });
}

// POST handler
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  try {
    // Sanitize and transform
    const slug = slugify(body.title, { lower: true, strict: true });

    const newItem = await Item.create({
      ...body,
      downloadLink: body.download, // Map if frontend sends "download"
      slug,
    });

    return NextResponse.json(
      { message: 'Item created', item: newItem },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json(
      { error: err.message, details: err.errors || null },
      { status: 400 }
    );
  }
}
