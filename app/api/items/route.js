import { connectDB } from '@/lib/mongoose';
import Item from '@/models/item';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

// GET handler for listing items with search, genre, pagination
export async function GET(req) {
  try {
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
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new item
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const slug = slugify(body.title, { lower: true, strict: true });

    const newItem = await Item.create({
      ...body,
      downloadLink: body.download || body.downloadLink,
      slug,
    });

    return NextResponse.json(
      { message: 'Item created successfully', item: newItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create item' },
      { status: 400 }
    );
  }
}
