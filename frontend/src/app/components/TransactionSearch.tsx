"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const TransactionSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/tx/${searchQuery}`);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Centered Search Section */}
      <div className="flex justify-center items-center mb-4">
        <form onSubmit={handleSearch} className="w-full sm:w-auto flex items-center justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by transaction hash"
            className="w-full lg:w-[750px] px-4 py-2 border border-gray-300 rounded-l-md h-16 focus:outline-none focus:ring-1 focus:ring-[#D91A9C]"
          />
          <button type="submit" className="px-4 py-2 h-16 bg-[#D91A9C] text-white rounded-r-full hover:bg-[#e332ab]">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionSearch;
