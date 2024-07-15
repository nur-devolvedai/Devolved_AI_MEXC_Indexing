import Head from 'next/head';
import SearchTransactions from '@/app/components/SearchTransactions';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Transaction Search</title>
        <meta name="description" content="Search for transactions by hash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <SearchTransactions />
      </main>
    </div>
  );
}
