import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tags: [String],
    img1: String,
    img2: String,
    img3: String,
    downloadLink: String,
    runtime: String,
    language: String,
    date: String,
    rating: Number,
    genre: [String],
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true, // Ensure it's indexed for faster lookup
    },
  },
  { timestamps: true }
);

// Auto-generate slug if missing or title is modified
itemSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();

  const baseSlug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let count = 1;

  const Item = mongoose.models.Item;

  // Only check for uniqueness if it's a new document
  while (await Item.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

export default mongoose.models.Item || mongoose.model('Item', itemSchema);
