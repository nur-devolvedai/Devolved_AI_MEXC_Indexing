"use client";

import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { FiClipboard } from 'react-icons/fi';

const TransactionDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionData, setTransactionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize ClipboardJS
    const clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', function(e) {
      console.log(e);
    });
    
    clipboard.on('error', function(e) {
      console.log(e);
    });

    // Cleanup
    return () => {
      clipboard.destroy();
    };
  }, []);

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

  // const convertWeiToGwei = (wei: string) => {
  //   return (parseFloat(wei) / 1e9).toFixed(9);
  // };

  const convertWeiToMatic = (wei: string) => {
    return (parseFloat(wei) / 1e18).toFixed(18);
  };

  const convertTo18Precision = (amount: string) => {
    return (parseFloat(amount) / 1e18).toFixed(18);
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
                <span className="flex items-center">
                  {transactionData.tx_hash}
                  <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                  data-clipboard-text={transactionData.tx_hash}
                  title="Copy txhash to clipboard">
                    <FiClipboard />
                  </button>
                </span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Block Number:</span>
                <span>{transactionData.block_number}</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">From Address:</span>
                <span className="flex items-center">
                  {transactionData.from_address}
                  <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                  data-clipboard-text={transactionData.from_address}
                  title="Copy from address to clipboard">
                    <FiClipboard />
                  </button>
                </span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">To Address:</span>
                <span className="flex items-center">
                  {transactionData.to_address}
                  <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                  data-clipboard-text={transactionData.to_address}
                  title="Copy from address to clipboard">
                    <FiClipboard />
                  </button>
                </span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Amount:</span>
                <span>{convertTo18Precision(transactionData.amount)} AGC</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Transaction Fee:</span>
                <span>{convertTo18Precision(transactionData.gas_fee)} AGC</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span>
                  {transactionData.method === 'balances.transferKeepAlive' || transactionData.method === 'balances.transfer' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Success
                    </span>
                  ) : (
                    <span>{transactionData.method}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
