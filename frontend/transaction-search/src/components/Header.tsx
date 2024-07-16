// components/Header.js
import React from 'react';
import Image from 'next/image'
const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/headerLogo.jpg"
                        alt="Picture of the author"
                        width={50}
                        height={50}
                    />
                    <img src="/logo.png" alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
                    <span className="ml-2 text-xl font-bold">PolygonScan</span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Blocks</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Transactions</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Tokens</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Contracts</a>
                </nav>

                {/* Search Bar */}
                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search by Address / Txn Hash / Block / Token"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* User Account Options */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-600">Sign In</a>
                    <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Register</a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-gray-700 focus:outline-none">
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
            <div className="md:hidden">
                <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                    <a href="#" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Home</a>
                    <a href="#" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Blocks</a>
                    <a href="#" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Transactions</a>
                    <a href="#" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Tokens</a>
                    <a href="#" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Contracts</a>
                    <a href="#" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Sign In</a>
                    <a href="#" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Register</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
