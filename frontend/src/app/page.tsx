import './globals.css'
import TransactionDetails from '@/app/components/TransactionDetails';

export default function Home() {
  return (
    <div>
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <TransactionDetails/>
      </main>
    </div>
  );
}