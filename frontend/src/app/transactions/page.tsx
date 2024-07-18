"use client";

import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { FiClipboard } from 'react-icons/fi';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionData, setTransactionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mt-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Transaction Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="flex justify-between">
                <span className="font-semibold">Transaction Hash:</span>
                <span className="flex items-center">
                  hash
                  <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                  data-clipboard-text={'hash'}
                  title="Copy txhash to clipboard">
                    <FiClipboard />
                  </button>
                </span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Block Number:</span>
                <span>block</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">From Address:</span>
                <span className="flex items-center">
                  from
                  <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                  data-clipboard-text={'from'}
                  title="Copy from address to clipboard">
                    <FiClipboard />
                  </button>
                </span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">To Address:</span>
                <span className="flex items-center">
                  to
                  <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                  data-clipboard-text={'to'}
                  title="Copy from address to clipboard">
                    <FiClipboard />
                  </button>
                </span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Amount:</span>
                <span>0 AGC</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Transaction Fee:</span>
                <span>0 AGC</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span>success</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Transactions;
