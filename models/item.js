import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  img1: String,
  img2: String,
  img3: String,
  downloadLink: String, // Ensure this matches the request field or remap in POST
  runtime: String,
  language: String,
  date: String,
  rating: Number, // Changed from String to Number
  genre: [String],
  slug: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

// Auto-generate slug if missing
itemSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();

  const baseSlug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let count = 1;

  const Item = mongoose.models.Item;

  while (await Item.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

export default mongoose.models.Item || mongoose.model('Item', itemSchema);
