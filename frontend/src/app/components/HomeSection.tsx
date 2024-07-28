// import React from 'react'

// export default function HomeSection() {
//   return (
//     <div>HomeSection</div>
//   )
// }

import React, { useState, useEffect } from 'react';

const HomeSection = () => {
  const [maticPrice, setMaticPrice] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [medGasPrice, setMedGasPrice] = useState(0);
  const [maticMarketCap, setMaticMarketCap] = useState(0);
  const [latestBlocks, setLatestBlocks]:any = useState([]);
  const [latestTransactions, setLatestTransactions]:any = useState([]);

  useEffect(() => {
    // Fetch the data from your APIs or mock data
    // Example:
    setMaticPrice(0.75);
    setTransactions(1000000);
    setMedGasPrice(30);
    setMaticMarketCap(10000000000);
    setLatestBlocks([
      // Mock data
      { number: 59416842, age: '12 mins ago', txn: 120, miner: '0x1234...abcd', gasUsed: '10,761,180 (35.87%)' },
      { number: 59416841, age: '15 mins ago', txn: 95, miner: '0x5678...efgh', gasUsed: '9,561,000 (31.87%)' }
    ]);
    setLatestTransactions([
      // Mock data
      { hash: '0x1234...abcd', block: 59416842, age: '12 mins', from: '0x5678...efgh', to: '0x9101...ijkl', value: '1.23 ETH' },
      { hash: '0x2345...bcde', block: 59416841, age: '15 mins', from: '0x6789...fghi', to: '0x1122...3344', value: '2.45 ETH' }
    ]);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-medium">MATIC Price</h2>
          <p className="text-xl font-bold">${maticPrice}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-medium">Transactions</h2>
          <p className="text-xl font-bold">{transactions.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-medium">Med Gas Price</h2>
          <p className="text-xl font-bold">{medGasPrice} Gwei</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-medium">MATIC Market Cap</h2>
          <p className="text-xl font-bold">${maticMarketCap.toLocaleString()}</p>
        </div>
      </div>

      {/* Latest Blocks Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Latest Blocks</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miner</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas Used</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {latestBlocks.map((block: { number: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; age: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; txn: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; miner: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; gasUsed: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{block.number}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{block.age}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{block.txn}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{block.miner}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{block.gasUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Transactions Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Latest Transactions</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn Hash</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {latestTransactions.map((txn: { hash: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; block: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; age: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; from: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; to: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{txn.hash}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{txn.block}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{txn.age}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{txn.from}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{txn.to}</td>
                  <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">{txn.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;

