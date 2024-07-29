"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeSection from './HomeSection';

const BlockDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      if (filter === 'txnHash') {
        router.push(`/transactions/${searchQuery}`);
      }
      if (filter === 'block') {
        router.push(`/blocks/${searchQuery}`);
      } 
      if (filter === 'address') {
        router.push(`/address/${searchQuery}`);
      }
    }
  };

  const [filter, setFilter] = useState('txnHash');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
    {/* Centered Search Section */}
    <div className="flex justify-left items-left mb-4">
      <form onSubmit={handleSearch} className="w-full sm:w-auto flex items-center justify-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="lg:px-4 py-2 border border-gray-300 rounded-l-md w-20 lg:w-auto h-10 lg:h-16 focus:outline-none focus:ring-1 focus:ring-[#D91A9C]"
        >
          <option value="txnHash">Txn Hash</option>
          <option value="address">Address</option>
          <option value="block">Block</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search by ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
          className="w-full lg:w-[750px] px-4 py-2 border border-gray-300 h-10 lg:h-16 focus:outline-none focus:ring-1 focus:ring-[#D91A9C]"
        />
        <button type="submit" className="px-1 lg:px-4 py-2 h-10 lg:h-16 bg-[#D91A9C] text-white rounded-r-full hover:bg-[#e332ab]">
          Search
        </button>
      </form>
    </div>

    <HomeSection/>
  </div>
  );
};

export default BlockDetails;