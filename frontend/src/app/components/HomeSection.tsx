import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BlockImage from '../../../public/icon-block.png';
import TransactionImage from '../../../public/transactions-icon.png';
import Link from 'next/link';

interface Block {
  block_number: number;
  age: string;
  validated_by: string;
}

interface Transaction {
  tx_hash: string;
  age: string;
  from_address: string;
  to_address: string;
}

const HomeSection: React.FC = () => {
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('/api/latest-blocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'next-action': 'search-transaction'
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setLatestBlocks(data.result);
      }
    })
    .catch((error) => {
      console.error('Error fetching latest blocks:', error);
    });

    fetch('/api/latest-transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'next-action': 'search-transaction'
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setLatestTransactions(data.result);
      }
    })
    .catch((error) => {
      console.error('Error fetching latest blocks:', error);
    });
  }, []);

  const shorten = (hash: string) => `${hash.slice(0, 4)}...${hash.slice(-5)}`;

  return (
    <div className="container mx-auto pt-6 lg:pt-20">

      {/* Latest Blocks and Transactions Sections */}
      <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
        {/* Latest Blocks Section */}
        <div className="w-full md:w-1/2 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Latest Blocks</h2>
          <div className="bg-white shadow-md rounded-lg p-4 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                {/* <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th> */}
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8 h-8">icon</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  {/* <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validated By</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestBlocks.map((block, index) => (
                  <tr key={index}>
                    <td className="px-5 py-7 bg-gray-100 text-xs sm:text-sm text-gray-500 h-4 w-4"><Image priority src={BlockImage} alt="block-icon" /></td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">
                      <Link href={`/blocks/${block.block_number}`}  target="_blank" className="text-[#D91A9C] hover:underline">
                        {block.block_number}
                      </Link>
                    </td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{block.age}</td>
                    {/* <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{block.validated_by}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Transactions Section */}
        <div className="w-full md:w-1/2 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Latest Transactions</h2>
          <div className="bg-white shadow-md rounded-lg p-4 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">icon</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn Hash</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestTransactions.map((txn, index) => (
                  <tr key={index}>
                    <td className="px-5 py-7 bg-gray-100 text-xs sm:text-sm text-gray-500 h-4 w-4"><Image priority src={TransactionImage} alt="transaction-icon" /></td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">
                    <Link href={`/transactions/${txn.tx_hash}`}  target="_blank" className="text-[#D91A9C] hover:underline">
                      {shorten(txn.tx_hash)}
                    </Link>
                    </td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{txn.age}</td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">
                      <Link href={`/address/${txn.from_address}`}  target="_blank" className="text-[#D91A9C] hover:underline">
                        {shorten(txn.from_address)}
                      </Link>
                    </td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">
                      <Link href={`/address/${txn.to_address}`}  target="_blank" className="text-[#D91A9C] hover:underline">
                        {shorten(txn.to_address)}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;