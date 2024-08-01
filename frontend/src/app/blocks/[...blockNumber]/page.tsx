"use client"

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ClipboardJS from 'clipboard';

interface Block {
  block_number: string;
  block_hash: string;
  parent_hash: string;
  state_root: string;
  extrinsics_root: string;
  timestamp: string;
}

const BlocksDetailsByBlockNumber = () => {
  const [blockData, setBlockData] = useState<Block | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const blockNumber = pathname.split('/').pop();
  // console.log(blockNumber);

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
    if (blockNumber) {
      fetchBlockDetails(blockNumber as string);
    }
  }, [blockNumber]);

  const fetchBlockDetails = async (blockNumber: string) => {
    try {
      const response = await fetch('/api/block-details-by-block-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'next-action': 'search-block'
        },
        body: JSON.stringify({ blockNumber })
      });

      const data = await response.json();
      // console.log(data);

      if (data.success) {
        setBlockData(data.result);
        setError(null);
      } else {
        setError(data.message);
        setBlockData(null);
      }
    } catch (err) {
      setError('Transaction not found or an error occurred.');
      setBlockData(null);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {blockData && (
        <div className="mt-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Block Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="flex justify-between">
                <span className="font-semibold">Block Number:</span>
                <span className="flex items-center">{blockData.block_number}</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Block Hash:</span>
                <span className="flex items-center">{blockData.block_hash.slice(0, 10) + '...' + blockData.block_hash.slice(-6)}</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Parent Hash:</span>
                <span className="flex items-center">{blockData.parent_hash.slice(0, 10) + '...' + blockData.parent_hash.slice(-6)}</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">State Root:</span>
                <span className="flex items-center">{blockData.state_root.slice(0, 10) + '...' + blockData.state_root.slice(-6)}</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Extrinsics Root:</span>
                <span className="flex items-center">{blockData.extrinsics_root.slice(0, 10) + '...' + blockData.extrinsics_root.slice(-6)}</span>
              </div>

              <hr className="opacity-75"></hr>

              <div className="flex justify-between">
                <span className="font-semibold">Timestamp:</span>
                <span>{blockData.timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default BlocksDetailsByBlockNumber;
