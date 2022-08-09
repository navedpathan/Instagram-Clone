import { getProviders, signIn } from 'next-auth/react'
import Header from '../../components/Header';
import Image from 'next/image'

// Browser
const SignIn = ({ providers }) => {
  return (
    <>
    <Header />

<div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center'>
  <Image className='w-80' src="/instafont.png" alt="" />
  <p className='font-xs italic'>This is the world largest photo & video sharing social networking app!</p>
<div className="mt-20">
    {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
          className='p-3 bg-blue-500 rounded-lg text-white'
           onClick={() => signIn(provider.id, { callbackUrl: '/'})}>
            Sign in with Google
          </button>
        </div>
      ))}
    </div>
</div>
   
     
    </>
  );
}

// Service side render
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {providers},
    }
}

export default SignIn