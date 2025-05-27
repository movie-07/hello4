import mongoose from 'mongoose';
import Item from '@/models/movies'; // adjust this path if needed
import { connectDB } from '@/lib/mongoose';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function updateSlugs() {
  await connectDB();

  const items = await Item.find();

  for (const item of items) {
    if (!item.slug) {
      const slug = generateSlug(item.title);
      try {
        await Item.updateOne({ _id: item._id }, { $set: { slug } });
        console.log(`✅ Updated slug for: ${item.title}`);
      } catch (err) {
        console.error(`❌ Failed to update ${item.title}:`, err.message);
      }
    }
  }

  console.log('Finished updating slugs.');
  process.exit();
}

updateSlugs();
