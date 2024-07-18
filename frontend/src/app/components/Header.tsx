"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/headerLogo.jpg" alt="Logo" width={60} height={60} className="h-8 w-8 sm:h-16 sm:w-16" />
          <span className="ml-2 mr-8 text-xl font-bold">Argochain Indexing</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/">
            <samp className="text-gray-700 hover:text-[#D91A9C]">Home</samp>
          </Link>
          <Link href="/">
            <samp className="text-gray-700 hover:text-[#D91A9C]">Blocks</samp>
          </Link>
          <Link href="/">
            <samp className="text-gray-700 hover:text-[#D91A9C]">Transactions</samp>
          </Link>
          {/* <Link href="/">
            <samp className="text-gray-700 hover:text-[#D91A9C]">Tokens</samp>
          </Link>
          <Link href="/">
            <samp className="text-gray-700 hover:text-[#D91A9C]">Contracts</samp>
          </Link> */}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 mx-4 hidden sm:block">
          <input
            disabled
            type="text"
            placeholder="Search by Address / Txn Hash / Block / Token"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D91A9C]"
          />
        </div>

        {/* User Account Options */}
        {/* <div className="hidden md:flex items-center space-x-4">
          <Link href="/">
            <samp className="text-gray-700 hover:text-[#D91A9C]">Sign In</samp>
          </Link>
          <Link href="/">
            <samp className="bg-[#D91A9C] text-white px-4 py-2 rounded-full hover:bg-[#e332ab]">Register</samp>
          </Link>
        </div> */}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none" onClick={toggleMenu}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link href="/">
              <samp onClick={handleNavLinkClick} className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Home</samp>
            </Link>
            <Link href="/">
              <samp onClick={handleNavLinkClick} className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Blocks</samp>
            </Link>
            <Link href="/">
              <samp onClick={handleNavLinkClick} className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Transactions</samp>
            </Link>
            <Link href="/">
              <samp onClick={handleNavLinkClick} className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Tokens</samp>
            </Link>
            <Link href="/">
              <samp onClick={handleNavLinkClick} className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Contracts</samp>
            </Link>
            <Link href="/">
              <samp onClick={handleNavLinkClick} className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Sign In</samp>
            </Link>
            <Link href="/">
              <samp onClick={handleNavLinkClick} className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Register</samp>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
