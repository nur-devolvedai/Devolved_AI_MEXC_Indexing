import BlockDetails from './components/BlockDetails';
import './globals.css';

export default function Home() {
  return (
    <div>
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        {/* <TransactionDetails/> */}
        <BlockDetails/>
      </main>
    </div>
  );
}