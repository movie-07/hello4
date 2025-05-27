import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout";

import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "starxmovies.in",
  description: "movie download site, latest movies, HD movie downloads, Bollywood movies, Hollywood movies, full movie download, movie reviews, action movies, thriller films, watch movies online"

};

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body className="min-h-screen">
    //     <Navbar/>
    //     <main className="p-4">{children}</main>
    //   </body>
    // </html>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
        <Navbar/>
        {children}
        
        <Footer/>
      </body>
    </html>
  );
}
