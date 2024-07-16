"use client"

import { useState } from 'react';

interface Transaction {
  tx_hash: string;
  block_number: number;
  from_address: string;
  to_address: string;
  amount: string;
  fee: string;
  gas_fee: string;
  gas_value: string;
  method: string;
}

export default function SearchTransactions() {
  const [query, setQuery] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    if (!query) {
      setError('Transaction hash is required.');
      return;
    }

    try {
      const res = await fetch(`/api/transactions?hash=${query}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setTransactions([]);
      } else {
        setTransactions(data);
      }
    } catch (error) {
      setError('Failed to fetch transactions. Please try again.');
      setTransactions([]);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter transaction hash"
          className="border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 mt-2 w-full"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Hash</th>
            <th className="border px-4 py-2">Block Number</th>
            <th className="border px-4 py-2">From</th>
            <th className="border px-4 py-2">To</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Fee</th>
            <th className="border px-4 py-2">Gas Fee</th>
            <th className="border px-4 py-2">Gas Value</th>
            <th className="border px-4 py-2">Method</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.tx_hash}>
              <td className="border px-4 py-2">{tx.tx_hash}</td>
              <td className="border px-4 py-2">{tx.block_number}</td>
              <td className="border px-4 py-2">{tx.from_address}</td>
              <td className="border px-4 py-2">{tx.to_address}</td>
              <td className="border px-4 py-2">{tx.amount}</td>
              <td className="border px-4 py-2">{tx.fee}</td>
              <td className="border px-4 py-2">{tx.gas_fee}</td>
              <td className="border px-4 py-2">{tx.gas_value}</td>
              <td className="border px-4 py-2">{tx.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
