import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full py-4 bg-white border-b shadow flex flex-col items-center">
      {/* Logo - Top Middle - 70% width */}
      <div className="w-[80%] flex justify-center mb-4">
        <Image src="/logo.png" alt="Logo" width={300} height={80} className="object-contain rounded" />
      </div>

      {/* Horizontal Links */}
      <div className="flex flex-row gap-6 font-bold">
        <Link href="/" className="hover:text-blue-600 ">Home</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
      </div>
    </nav>
  );
}
