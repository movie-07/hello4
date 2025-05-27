import { connectDB } from '@/lib/mongoose'; // ✅ correct import
// import movie from '@/models/movie';
import item from '@/models/item';

export async function GET() {
  await connectDB(); // ✅ FIXED!

  const baseUrl = 'http://localhost:3000';
  const movies = await item.find({}, 'slug updatedAt');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${movies
      .map((movie) => {
        return `
    <url>
      <loc>${baseUrl}/movies/${movie.slug}</loc>
      <lastmod>${new Date(movie.updatedAt).toISOString()}</lastmod>
    </url>`;
      })
      .join('')}
  </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
