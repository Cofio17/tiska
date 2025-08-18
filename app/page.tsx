import Link from 'next/link';

export default function Home() {
 return (
  <main className='flex min-h-screen flex-col items-center justify-center p-10'>
   <h1 className='text-3xl font-bold mb-6'>Welcome to Tiska Fabrics Tool</h1>
   <Link href='/fabric' className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition'>
    Go to Fabric Designer
   </Link>
  </main>
 );
}
