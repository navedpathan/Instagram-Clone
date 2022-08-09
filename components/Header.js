import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <>
      <div className="shadow-sm border-b bg-white sticky top-0 z-50">
        <div className="flex justify-between max-w-6xl xl:mx-auto lg:mx-auto mx-4">

          {/* Left - logo */}
          <div onClick={() => router.push('/')}
          className='relative hidden lg:inline-grid w-24 h-16 cursor-pointer'>
            <Image src="/instafont.png" layout="fill" objectFit="contain" alt=""/>
          </div>

          <div onClick={() => router.push('/')} 
          className='relative w-10 h-10 flex inset-y-3 lg:hidden flex-shrink-0 cursor-pointer'>
            <Image src="/instablack.png" layout="fill" objectFit="contain" />
          </div>

          {/* Middle - search input field */}
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-5 pl-4 flex pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm py-1 rounded-md focus:ring-black focus:border-black"
              type="text" placeholder="Search" />
          </div>

          {/* Right */}
          <div className="flex items-center justify-end space-x-4">
            <HomeIcon onClick={() => router.push('/')} className="navBtn" />
            <MenuIcon className="h-10 v-10 md:hidden cursor-pointer" />

            {session ? (
              <>
                <div className="relative navBtn">
                  <PaperAirplaneIcon className="navBtn rotate-45" />
                  {/* <div className="relative bottom-2 right-8 text-xs w-6 p-1 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">24</div> */}
                  <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">24</div>
                  </div>
                <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                <UserGroupIcon className="navBtn" />
                <HeartIcon className="navBtn" />

                <img
                  onClick={signOut}
                  src={session.user.image}
                  alt="profilepic" layout="fill" className="h-10 w-10 rounded-full cursor-pointer" />
              </>
            ) : (
              <button onClick={signIn}>Sign In</button>
            )}


          </div>

        </div>
      </div>
    </>
  )
}

export default Header