import Head from 'next/head'
import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';

export default function Home() {
  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram by nextJS" />
        <link rel="icon" href="/favicon.ico" />

        {/* tailwindcss link */}
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
      </Head>
      
      <Header />
      <Feed />
      <Modal />     
      
    </div>
  )
}
