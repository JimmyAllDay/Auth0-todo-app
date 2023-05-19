import Image from 'next/image';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Auth0 Todo App</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl">To Do App</h1>
      </main>
    </div>
  );
}
