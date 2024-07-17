import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-700 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link href="/">
              <samp className="flex items-center text-gray-700">
                <Image src="/headerLogo.jpg" alt="Logo" width={40} height={40} className="h-10 w-10" />
                <span className="ml-2 text-xl font-bold">Argochain Indexing</span>
              </samp>
            </Link>
            <p className="mt-4 text-sm">
            Argochain is a Block Explorer and Analytics Platform for Polygon, a decentralized smart contracts platform.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link href="/">
                <samp className="hover:text-[#D91A9C] mr-2">Home</samp>
              </Link>
              <Link href="/">
                <samp className="hover:text-[#D91A9C] mx-2">Blocks</samp>
              </Link>
              <Link href="/">
                <samp className="hover:text-[#D91A9C] mx-2">Transactions</samp>
              </Link>
              <Link href="/">
                <samp className="hover:text-[#D91A9C] mx-2">Tokens</samp>
              </Link>
              
            </nav>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@devolvedai.com</p>
            <p className="text-sm">Phone: +0 000 000 000</p>
            <div className="flex mt-4 space-x-4">
              <samp className="text-gray-700 hover:text-gray-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.85 9.85 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.86 9.86 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482 13.953 13.953 0 01-10.141-5.146 4.822 4.822 0 00-.665 2.475c0 1.71.869 3.217 2.188 4.099a4.902 4.902 0 01-2.229-.616v.06a4.917 4.917 0 003.946 4.814 4.995 4.995 0 01-2.223.084 4.922 4.922 0 004.6 3.417A9.86 9.86 0 010 21.54a13.955 13.955 0 007.548 2.213c9.054 0 14.009-7.503 14.009-14.01 0-.213-.005-.426-.015-.637A10.006 10.006 0 0024 4.557z" />
                </svg>
              </samp>
              <samp className="text-gray-700 hover:text-gray-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.602 0 0 .601 0 1.345v21.31C0 23.398.602 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.786 4.66-4.786 1.325 0 2.463.099 2.797.142v3.24l-1.92.001c-1.504 0-1.795.716-1.795 1.764v2.316h3.586l-.467 3.622h-3.12V24h6.115C23.398 24 24 23.398 24 22.655V1.345C24 .601 23.398 0 22.675 0z" />
                </svg>
              </samp>
              <samp className="text-gray-700 hover:text-gray-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 0H1.77C.79 0 0 .8 0 1.78v20.44C0 23.2.79 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.78V1.78C24 .8 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58C4.15 7.58 3.2 6.63 3.2 5.45c0-1.18.95-2.13 2.14-2.13s2.14.95 2.14 2.13c0 1.18-.96 2.13-2.14 2.13zM20.45 20.45h-3.56v-5.84c0-1.39-.03-3.18-1.94-3.18-1.94 0-2.23 1.51-2.23 3.07v5.95h-3.56V9h3.42v1.57h.05c.48-.92 1.65-1.88 3.4-1.88 3.63 0 4.3 2.39 4.3 5.5v6.26z" />
                </svg>
              </samp>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center">
          <p className="text-sm">&copy; 2024 DevolvedAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
