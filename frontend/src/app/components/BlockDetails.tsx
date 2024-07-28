"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BlockDetails = ({ blockId }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
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
            placeholder="Search by Address / Txn Hash / Block / Token"
            className="w-full lg:w-[750px] px-4 py-2 border border-gray-300 rounded-l-md h-16 focus:outline-none focus:ring-1 focus:ring-[#D91A9C]"
          />
          <button type="submit" className="px-4 py-2 h-16 bg-[#D91A9C] text-white rounded-r-full hover:bg-[#e332ab]">
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-b">
        <div className="w-full sm:w-auto flex items-center mb-4 sm:mb-0">
          <h1 className="text-xl sm:text-2xl font-semibold">Block #{blockId}</h1>
        </div>
        
      </div>

      {/* Block Details */}
      <div className="mt-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg sm:text-xl font-medium mb-4">Block Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="flex justify-between">
              <span className="font-semibold">Block Height:</span>
              <span>59416842</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Timestamp:</span>
              <span>12 mins ago (Jul-16-2024 12:34:56 PM +UTC)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Transactions:</span>
              <span>120</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Validated By:</span>
              <span className='  overflow-x-auto '>0x98c27cc3f0301b6272049dc3f972e2f542780629  in 2 secs</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Block Reward:</span>
              <span>0.435011236776889237 MATIC</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Difficulty:</span>
              <span>23</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total Difficulty:</span>
              <span>1,103,543,208</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Size:</span>
              <span>57,659 bytes</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Gas Used:</span>
              <span>10,761,180(35.87%)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Gas Limit:</span>
              <span>30,000,000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Base Fee Per Gas:</span>
              <span>0.000000000448958959 MATIC (0.448958959 Gwei)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Burnt Fees:</span>
              <span>0.00483132817041162 MATIC</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">Transactions</h2>
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Txn Hash</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Block</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">To</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">0x1234...abcd</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">59416842</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">12 mins</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">0x5678...efgh</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">0x9101...ijkl</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">1.23 ETH</td>
                </tr>
                {/* More rows */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
