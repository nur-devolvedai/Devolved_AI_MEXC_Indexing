import React, { useState, useEffect, FormEvent } from 'react';

interface Block {
  number: number;
  age: string;
  txn: number;
  miner: string;
  gasUsed: string;
}

interface Transaction {
  hash: string;
  block: number;
  age: string;
  from: string;
  to: string;
  value: string;
}

const HomeSection: React.FC = () => {
  const [maticPrice, setMaticPrice] = useState<number>(0);
  const [transactions, setTransactions] = useState<number>(0);
  const [medGasPrice, setMedGasPrice] = useState<number>(0);
  const [maticMarketCap, setMaticMarketCap] = useState<number>(0);
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch the data from your APIs or mock data
    // Example:
    setMaticPrice(0.75);
    setTransactions(1000000);
    setMedGasPrice(30);
    setMaticMarketCap(10000000000);
    setLatestBlocks([
      // Mock data
      {number: 59416842, age: '12 mins ago', txn: 120, miner: '0x1234...abcd', gasUsed: '10,761,180 (35.87%)' },
      {number: 59416841, age: '15 mins ago', txn: 95, miner: '0x5678...efgh', gasUsed: '9,561,000 (31.87%)' },
      {number: 59416842, age: '12 mins ago', txn: 120, miner: '0x1234...abcd', gasUsed: '10,761,180 (35.87%)' },
      {number: 59416841, age: '15 mins ago', txn: 95, miner: '0x5678...efgh', gasUsed: '9,561,000 (31.87%)' },
      {number: 59416841, age: '15 mins ago', txn: 95, miner: '0x5678...efgh', gasUsed: '9,561,000 (31.87%)' }
    ]);
    setLatestTransactions([
      // Mock data
      {hash: '0x1234...abcd', block: 59416842, age: '12 mins', from: '0x5678...efgh', to: '0x9101...ijkl', value: '1.23 ETH' },
      {hash: '0x2345...bcde', block: 59416841, age: '15 mins', from: '0x6789...fghi', to: '0x1122...3344', value: '2.45 ETH' },
      {hash: '0x1234...abcd', block: 59416842, age: '12 mins', from: '0x5678...efgh', to: '0x9101...ijkl', value: '1.23 ETH' },
      {hash: '0x2345...bcde', block: 59416841, age: '15 mins', from: '0x6789...fghi', to: '0x1122...3344', value: '2.45 ETH' },
      {hash: '0x2345...bcde', block: 59416841, age: '15 mins', from: '0x6789...fghi', to: '0x1122...3344', value: '2.45 ETH' }
    ]);
  }, []);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    // Implement search functionality
  };

  return (
    <div className="container mx-auto pt-6 lg:pt-20">
      {/* Top Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white shadow-md rounded-lg p-4">
        <div className="bg-white p-4 border-r border-gray-300">
          <h2 className="text-md text-gray-500 font-medium">MATIC Price</h2>
          <p className="text-sm text-[#D91A9C]">${maticPrice.toFixed(2)}</p>
        </div>
        <div className="bg-white  border-r border-gray-300 p-4">
          <h2 className="text-lg text-gray-500 font-medium">Transactions</h2>
          <p className="text-sm text-[#D91A9C]">{transactions.toLocaleString()}</p>
        </div>
        <div className="bg-white  border-r border-gray-300 p-4">
          <h2 className="text-lg text-gray-500 font-medium">Med Gas Price</h2>
          <p className="text-sm text-[#D91A9C]">{medGasPrice} Gwei</p>
        </div>
        <div className="bg-white  border-r border-gray-300 p-4">
          <h2 className="text-lg text-gray-500 font-medium">MATIC Market Cap</h2>
          <p className="text-sm text-[#D91A9C]">${maticMarketCap.toLocaleString()}</p>
        </div>
      </div> */}

      {/* Latest Blocks and Transactions Sections */}
      <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
        {/* Latest Blocks Section */}
        <div className="w-full md:w-1/2 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Latest Blocks</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                {/* <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th> */}
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8 h-8">icon</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validated By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestBlocks.map((block, index) => (
                  <tr key={index}>
                    <td className="px-5 py-7 bg-gray-100 text-xs sm:text-sm text-gray-500 h-4 w-4"><img src='./icon-block.png' alt="block-icon" /></td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{block.number}</td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{block.age}</td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{block.miner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Transactions Section */}
        <div className="w-full md:w-1/2">
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
                    <td className="px-5 py-7 bg-gray-100 text-xs sm:text-sm text-gray-500 h-4 w-4"><img src='./transactions-icon.png' alt="transaction-icon" /></td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{txn.hash}</td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{txn.age}</td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{txn.from}</td>
                    <td className="px-4 py-6 text-xs sm:text-sm text-[#D91A9C]">{txn.to}</td>
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


