import { connectDB } from '@/lib/mongoose';
import Item from '@/models/item';

export async function GET(req, { params }) {
  await connectDB();
  const item = await Item.findById(params.id);
  return Response.json(item);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const item = await Item.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(item);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Item.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
