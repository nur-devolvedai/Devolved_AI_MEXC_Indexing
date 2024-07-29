"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeSection from './HomeSection';
import Link from 'next/link';

const BlockDetails = ({ blockId }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const [filter, setFilter] = useState('address');

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
          <option value="address">Address</option>
          <option value="txnHash">Txn Hash</option>
          <option value="block">Block</option>
          <option value="token">Token</option>
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
        {/* if (${filter.charAt(0).toUpperCase() + filter.slice(1)}==="block") {
          <Link href={'/blocks'}>
            <button type="submit" className="px-4 py-2 h-16 bg-[#D91A9C] text-white rounded-r-full hover:bg-[#e332ab]">
          Search
        </button>
          </Link>
        } */}
      </form>
    </div>

    <HomeSection/>
  </div>
  );
};

export async function getServerSideProps(context: { params: { blockId: any; }; }) {
  const { blockId } = context.params;
  // Fetch block data using blockId

  return {
    props: {
      blockId,
    },
  };
}

export default BlockDetails;
