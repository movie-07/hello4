import Image from 'next/image';
import Link from 'next/link';
import Head from "next/head";


export const dynamic = 'force-dynamic';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance',
  'Thriller', 'Western', 'web-series',
];

export default async function MovieRoute({ searchParams }) {
  const search = searchParams?.q || '';
  const genre = searchParams?.genre || 'All';
  const page = parseInt(searchParams?.page || '1');
  const limit = 20;

  const query = new URLSearchParams();
  if (search) query.set('q', search);
  if (genre && genre !== 'All') query.set('genre', genre);
  query.set('page', page);
  query.set('limit', limit);

  const res = await fetch(`https://starxmovies.in/api/items?${query.toString()}`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const movies = data.movies || [];
  const totalCount = data.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
<Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "starxmovies.in",
              url: "https://www.yoursite.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://starxmovies.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <div className="p-4 ">
        {/* Search */}
        <form method="GET" className="flex flex-row items-center justify-center gap-2 mb-6 flex-wrap">
          <input
            name="q"
            type="text"
            defaultValue={search}
            placeholder="Search by title, tag, etc."
            className="border px-4 py-2 rounded w-48"
          />
          <input type="hidden" name="genre" value={genre} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>


        {/* Genre Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['All', ...GENRES].map((g) => {
            const isSelected = g === genre;
            const genreParam = g === 'All' ? '' : g;

            const filterParams = new URLSearchParams();
            if (search) filterParams.set('q', search);
            if (genreParam) filterParams.set('genre', genreParam);
            filterParams.set('page', '1');

            return (
              <Link
                key={g}
                href={`/?${filterParams.toString()}`}
                className={`px-4 py-2 rounded-full border shadow ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
              >
                {g}
              </Link>
            );
          })}
        </div>

        {/* Movies */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4">
            {movies.map((movie) => (
              <Link
                key={movie._id}
                href={`/movies/${movie.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
              >
                <Image
                  src={movie.img1 || movie.img2 || ''}
                  width={300}
                  height={400}
                  alt={movie.title}
                  className="rounded-t-lg w-full object-cover"
                />
                <div className="p-2">
                  <p className=" font-bold text-gray-800 dark:text-white ">
                    {movie.title}
                  </p>
                  <p className="text-sm font-semibold text-green-500 dark:text-red truncate">
                    {movie.genre} movie
                  </p>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Rating 
                    ({movie.rating ?? '0'})
                  </span>
                </div>
              </Link>
            ))}

          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">No movies found</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const isActive = p === page;

              const paginationParams = new URLSearchParams();
              if (search) paginationParams.set('q', search);
              if (genre && genre !== 'All') paginationParams.set('genre', genre);
              paginationParams.set('page', p);

              return (
                <Link
                  key={p}
                  href={`/?${paginationParams.toString()}`}
                  className={`px-4 py-2 rounded border text-sm ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
