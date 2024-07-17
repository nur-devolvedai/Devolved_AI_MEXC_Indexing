"use client";

import React, { useState } from 'react';

const TransactionDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionData, setTransactionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ txHash: searchQuery })
        });

        const data = await response.json();

        if (data.success) {
          setTransactionData(data.result);
          setError(null);
        } else {
          setError(data.message);
          setTransactionData(null);
        }
      } catch (err) {
        setError('Transaction not found or an error occurred.');
        setTransactionData(null);
      }
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

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {transactionData && (
        <div className="mt-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Transaction Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="flex justify-between">
                <span className="font-semibold">Transaction Hash:</span>
                <span>{transactionData.tx_hash}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Block Number:</span>
                <span>{transactionData.block_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">From Address:</span>
                <span>{transactionData.from_address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">To Address:</span>
                <span>{transactionData.to_address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Amount:</span>
                <span>{transactionData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Transaction Fee:</span>
                <span>{transactionData.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Gas Fee:</span>
                <span>{transactionData.gas_fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Gas Value:</span>
                <span>{transactionData.gas_value}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Method:</span>
                <span>{transactionData.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Events:</span>
                <span className="whitespace-pre-wrap">{JSON.stringify(transactionData.events, null, 2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
