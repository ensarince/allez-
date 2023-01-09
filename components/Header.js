import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {SearchIcon, 
        PlusIcon, 
        DotsHorizontalIcon,
        HeartIcon, 
        MailOpenIcon, 
        ChevronDownIcon} from "@heroicons/react/outline"
import { useRouter } from 'next/router'
import {useSession, signIn, signOut} from "next-auth/react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRecoilState } from 'recoil';
import { modalState } from "../atoms/modalAtom"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

function Header() {

    //usesession from next-auth, rename data to session
    const { data: session } = useSession();
    const router = useRouter()

    const [posts, setPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])

    const [open, setOpen] = useRecoilState(modalState)

        //getting post data
        useEffect(() => {
            const unsubscribe = onSnapshot(query(collection(db, 'climbs'), orderBy('timestamp', 'desc')), 
              snapshot => {
                setPosts(snapshot.docs)
              });
              return unsubscribe
        }, [db])   

        //getting my post data
        useEffect(() => {
            try {                
                const unsubscribe_myposts = onSnapshot(query(collection(db, 'users', session?.user?.email, 'climbs'), orderBy('timestamp', 'desc')), 
                  snapshot => {
                    setMyPosts(snapshot.docs)
                  });
                  return unsubscribe_myposts
            } catch (error) {
                console.log("My data fetch error ->> " , error)
            }
        }, [db])   

  return (
    <div className='sticky top-0 z-50 shadow-sm bg-green3 text-white'>
      
      <div className='flex flex-col md:flex-row'>

        <div className='flex flex-1 justify-between items-center max-w-6xl ml-3 mr-0 lg:mx-auto space-x-2 md:space-x-0'>
            
            {/* /* Left */}
            <div onClick={() => router.push('/')} className='flex-shrink-0 relative w-24 cursor-pointer hover:scale-110 transition-all duration-150 ease-out'>
                <Image src="/logo.png" width="120" height="120"
                objectFit='contain'/>
            </div>

    
            {/* /* Middle - Search Input Field */}
            <div className='max-w-xs'>
                <div className='relative mt-1 p-3 rounded-md'>
                    <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-white '/>
                    </div>
                    <input className='bg-green2 block w-full pl-10 text-green3 font-bold sm:text-sm border-green2 rounded-md focus:ring-black
                        focus:border-black' type="text" />
                </div>
            </div>

            {/*Dropdown  */}
            {session ? 
                (
                <Menu as="div" className="relative inline-block md:hidden text-left w-8 ">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white1 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <ChevronDownIcon className="-mr-2 -ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 block px-4 py-2 text-sm'}>
                            Messages
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            onClick={() => setOpen(true)}
                            className={ active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 block px-4 py-2 text-sm'} >
                            Add Climb
                            </a>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <a
                            href="#"
                            className={
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 block px-4 py-2 text-sm'}>
                            Settings
                            </a>
                        )}
                        </Menu.Item>
                        <form method="POST" action="#">
                        <Menu.Item>
                            {({ active }) => (
                            <button
                            onClick={signOut}
                                type="submit"
                                className={active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 block w-full px-4 py-2 text-left text-sm'}>
                                Sign out
                            </button>
                            )}
                        </Menu.Item>
                        </form>
                    </div>
                    </Menu.Items>
                </Transition>
                </Menu>
            ): null}
        
            {/* /* Right */}
            <div className='flex items-center justify-end space-x-4'>
                {session ? (
                    <>
                    <div className="flex space-x-2 items-baseline">
                        <PlusIcon onClick={() => setOpen(true)} className='navBtn' />
                        <div className='relative navBtn'>
                            <MailOpenIcon className='navBtn' />
                            <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white'>3</div>
                        </div>
                    </div>
                        <img src={session.user?.image} alt="profile picture" className='h-10 w-10 rounded-full cursor-pointer object-cover' />
                    </>
                ): (
                    <div onClick={signIn} className="hover:scale-125 transition-all duration-150 ease-out mr-2">
                        <svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </div>

                )}
            </div>

        </div>

        {/* Bottom, mobile navigation */}
        <div className='justify-evenly flex md:hidden h-fit bg-green3 p-2 text-md text-white1 font-bold'>            
            <div class="flex justify-center">
                <div>
                    <div class="dropdown relative">
                    <button
                        class="dropdown-toggle p-2 text-white font-bold text-sm rounded hover:shadow-lg focus:bg-green2 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green3 active:shadow-lg active:text-green3 transition duration-150 ease-in-out flex items-center"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Latest Ascents
                    </button>
                        <ul class="dropdown-menu min-w-max absolute text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-gray-800"
                            aria-labelledby="dropdownMenuButton2">
                            {posts?.map(item => (
                            <>
                                <li>
                                    <a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
                                        href="#"    
                                    >{item.data().climbRef} - {item.data().climbGradeRef} - {item.data().username}
                                    </a>
                                </li>
                            </>
                            ))}
                        </ul>
                    </div>
                 </div>
                </div>
                {session && 
                <div class="flex justify-center">
                <div>
                    <div class="dropdown relative">
                    <button
                        class="dropdown-toggle p-2 text-white font-bold text-sm rounded hover:shadow-lg focus:bg-green2 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green3 active:shadow-lg active:text-green3 transition duration-150 ease-in-out flex items-center"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        My Ascents
                    </button>
                        <ul class="dropdown-menu min-w-max absolute text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-gray-800"
                            aria-labelledby="dropdownMenuButton2">
                            {myPosts?.map(item => (
                            <>
                                <li>
                                    <a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
                                        href="#"    
                                    >{item.data().climbRef} - {item.data().climbGradeRef}
                                    </a>
                                </li>
                            </>
                            ))}
                        </ul>
                    </div>
                 </div>
                </div>
                }

                {session &&
                <div class="flex justify-center">
                <div>
                    <div class="dropdown relative">
                    <button
                        class="dropdown-toggle p-2 text-white font-bold text-sm rounded hover:shadow-lg focus:bg-green2 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green3 active:shadow-lg active:text-green3 transition duration-150 ease-in-out flex items-center"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Friends
                    </button>
                        <ul class="dropdown-menu min-w-max absolute text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-gray-800"
                            aria-labelledby="dropdownMenuButton2">
                            {/*!!implement friends {myPosts.map(item => (
                            <>
                                <li>
                                    <a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
                                        href="#"    
                                    >{item.climb} - {item.climbGrade}
                                    </a>
                                </li>
                            </>
                            ))} */}
                        </ul>
                    </div>
                 </div>
                </div>
                }
            <DotsHorizontalIcon className="py-2 mt-1 h-8 w-8 active:text-gray-300 active:scale-105 transition-all duration-150 ease-out" aria-hidden="true" />
        </div>


        </div>
    </div>
  )
}

export default Header