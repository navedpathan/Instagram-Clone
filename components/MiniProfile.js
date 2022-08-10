import { useSession, signOut } from "next-auth/react";
import Image from 'next/image'

function MiniProfile() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div className="flex items-center justify-between mt-10 ml-10">
      <Image className="w-16 h-16 rounded-full border p-[2px]"
        src={session.user.image} height='40' width='40' alt="" />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button
        onClick={signOut}
        className="text-blue-400 text-sm font-semibold hover:text-blue-600">Sign Out</button>
    </div>
  )
}

export default MiniProfile