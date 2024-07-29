"use client";

import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { FiClipboard } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

interface Transaction {
  tx_hash: string;
  block_number: number;
  age: number;
  from_address: string;
  to_address: string;
  amount: string;
  gas_fee: string;
  // Add any other properties you have in your transaction data
}

const TransactionDetailsByAddress = () => {
  const [transactionData, setTransactionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const address = pathname.split('/').pop();

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

  useEffect(() => {
    if (address) {
      fetchTransactionDetails(address as string);
    }
  }, [address]);

  const fetchTransactionDetails = async (txHash: string) => {
    try {
      const response = await fetch('/api/transaction-by-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
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
  };

  const convertTo18Precision = (amount: string) => {
    return (parseFloat(amount) / 1e18).toFixed(18);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {transactionData && (
        <div className="mt-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Address Details</h2>
            {transactionData.map((transaction: Transaction, index: number) => (
              <div key={index} className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Transaction Hash:</span>
                    <span className="flex items-center">
                      {transaction.tx_hash.slice(0, 10) + '...' + transaction.tx_hash.slice(-5)}
                      <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                      data-clipboard-text={transaction.tx_hash}
                      title="Copy txhash to clipboard">
                        <FiClipboard />
                      </button>
                    </span>
                  </div>

                  <hr className="opacity-75"></hr>

                  <div className="flex justify-between">
                    <span className="font-semibold">Block Number:</span>
                    <span>{transaction.block_number}</span>
                  </div>

                  <hr className="opacity-75"></hr>

                  <div className="flex justify-between">
                    <span className="font-semibold">Age:</span>
                    <span>{transaction.age}</span>
                  </div>

                  <hr className="opacity-75"></hr>

                  <div className="flex justify-between">
                    <span className="font-semibold">From Address:</span>
                    <span className="flex items-center">
                      {transaction.from_address.slice(0, 10) + '...' + transaction.from_address.slice(-5)}
                      <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                      data-clipboard-text={transaction.from_address}
                      title="Copy from address to clipboard">
                        <FiClipboard />
                      </button>
                    </span>
                  </div>

                  <hr className="opacity-75"></hr>

                  <div className="flex justify-between">
                    <span className="font-semibold">To Address:</span>
                    <span className="flex items-center">
                      {transaction.to_address.slice(0, 10) + '...' + transaction.to_address.slice(-5)}
                      <button className="ml-2 copy-btn bg-[#D91A9C] text-white hover:bg-[#e332ab] px-2 py-1 rounded" 
                      data-clipboard-text={transaction.to_address}
                      title="Copy to address to clipboard">
                        <FiClipboard />
                      </button>
                    </span>
                  </div>

                  <hr className="opacity-75"></hr>

                  <div className="flex justify-between">
                    <span className="font-semibold">Amount:</span>
                    <span>{convertTo18Precision(transaction.amount)} AGC</span>
                  </div>

                  <hr className="opacity-75"></hr>

                  <div className="flex justify-between">
                    <span className="font-semibold">Transaction Fee:</span>
                    <span>{convertTo18Precision(transaction.gas_fee)} AGC</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetailsByAddress;
