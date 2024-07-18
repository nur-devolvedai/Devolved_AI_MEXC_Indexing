import React from 'react';

const BlockDetails = ({ blockId }:any) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b">
        <h1 className="text-xl sm:text-2xl font-semibold">Block #{blockId}</h1>
        <button className="mt-2 sm:mt-0 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Back to Blocks</button>
      </header>

      <div className="mt-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg sm:text-xl font-medium mb-4">Block Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="font-semibold">Block Height:</span>
              <span>{blockId}</span>
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
              <span className="font-semibold">Mined by:</span>
              <span>Miner123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Block Reward:</span>
              <span>2.5 ETH</span>
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
