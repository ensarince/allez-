import React from 'react'
import {useSession, signIn, signOut} from "next-auth/react"


function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className='flex items-center justify-between bg-green1  rounded-sm p-5 my-4 overflow-y-scroll scrollbar-none'>
    {session ? 
      (
        <>
        <img className='rounded-full border p-1 w-16 h-16' src={session?.user?.image} alt="" />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold text-green3'>{session?.user?.name}</h2>
            <h3 className='text-sm text-gray-400'></h3>
            <button onClick={signOut} className='text-green3 text-sm font-semibold'>Sign Out</button>
        </div>
        </>
      ):
      (
        <>
          <img className='rounded-full border p-1 w-16 h-16' src="https://media.tenor.com/5aF7np_zPEgAAAAM/pepe-why-pepe-the-frog.gif" alt="" />

          <div className='flex-1 mx-4'>
              <h2 className='font-bold'>Login for more</h2>
              <h3 className='text-sm text-gray-400'></h3>
              <button onClick={signIn} className='text-red1 text-sm font-semibold'>Sign In</button>
          </div>
        </>
      )}

    </div>
  )
}

export default MiniProfile