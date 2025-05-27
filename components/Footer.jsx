
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t text-center py-4 text-sm text-gray-700">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-2">
        <Link href="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link href="/contact" className="hover:text-blue-600">
          Contact Us
        </Link>
      </div>

      <p className="px-4 text-xs text-gray-500 max-w-md mx-auto">
        © {new Date().getFullYear()} StarxMovies.in. All rights reserved. Content on this site is for personal use and help only. 
        We respect the <span className="font-medium">DMCA (Digital Millennium Copyright Act) of 1976</span>.</p>
     <p className= 'p-10'  >  If you believe your copyrighted content is being used improperly, please contact us for removal.</p> 
      
    </footer>
  );
}
