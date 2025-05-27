// app/movies/[slug]/page.js
import { connectDB } from '@/lib/mongoose';
import Item from '@/models/item';
import { notFound } from 'next/navigation';
import Head from "next/head";

// Metadata for SEO
export async function generateMetadata({ params }) {
  await connectDB();
  const movie = await Item.findOne({ slug: params.slug });

  if (!movie) {
    return {
      title: 'Movie Not Found',
      description: 'This movie page could not be found.',
    };
  }

  return {
    title: `${movie.title} | Watch & Download - YourSiteName`,
    description: movie.description?.slice(0, 160) || 'Watch and download movies in HD.',
    openGraph: {
      title: `${movie.title} | HD Movie`,
      description: movie.description,
      url: `https://starxmovies.in/api/items/movies/${params.slug}`,
      images: [
        {
          url: movie.img1,
          width: 1200,
          height: 630,
          alt: movie.title,
        },
      ],
      type: 'video.movie',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} | HD Movie`,
      description: movie.description,
      images: [movie.img1],
    },
    alternates: {
      canonical: `https://starxmovies.in/api/items/movies/${params.slug}`,
    },
  };
}

export default async function MovieDetailPage({ params }) {
  await connectDB();
  const movie = await Item.findOne({ slug: params.slug });

  if (!movie) return notFound();

  return (
    <>
      {/* JSON-LD */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Movie",
              name: movie.title,
              image: [movie.img1, movie.img2, movie.img3].filter(Boolean),
              description: movie.description,
              datePublished: movie.date,
              genre: movie.genre,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: movie.rating,
                bestRating: "10",
                worstRating: "1",
                ratingCount: 1234,
              },
            }),
          }}
        />
      </Head>

      {/* Movie Page */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{movie.title}</h1>
        <p className="mt-2 text-gray-700 text-base md:text-lg">{movie.description}</p>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {[movie.img1, movie.img2, movie.img3].map(
            (src, i) =>
              src && (
                <div key={i} className="aspect-video overflow-hidden rounded-lg shadow">
                  <img
                    src={src}
                    alt={`Movie Image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
          )}
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-2 text-sm md:text-base">
          <p><strong>Runtime:</strong> {movie.runtime}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Release Date:</strong> {movie.date}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Genres:</strong> {movie.genre.join(', ')}</p>
        </div>

        {/* Download Button */}
        <div className="mt-6">
          <a
            href={movie.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Download Movie
          </a>
        </div>
      </div>
    </>
  );
}
