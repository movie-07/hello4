import { connectDB } from '@/lib/mongoose';
import Item from '@/models/item';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Avoid build-time MongoDB errors

// GET /api/items/[id]
export async function GET(req, { params }) {
  try {
    await connectDB();
    const item = await Item.findById(params.id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

// PUT /api/items/[id]
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();
    const updatedItem = await Item.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE /api/items/[id]
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deleted = await Item.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
