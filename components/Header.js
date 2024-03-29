import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {SearchIcon, 
        PlusIcon, 
        DotsHorizontalIcon,
        HeartIcon, 
        MailOpenIcon, 
        ChevronDownIcon,
        RefreshIcon
        }from "@heroicons/react/outline"
        import { Fragment } from 'react'
import { useRouter } from 'next/router'
import {useSession, signIn, signOut} from "next-auth/react"
import { Menu, Transition } from '@headlessui/react'
import { useRecoilState } from 'recoil';
import { modalState } from "../atoms/modalAtom"

function Header({posts, 
                myPosts, 
                searchQuery, 
                setSearchQuery, 
                handleSearch, 
                handleReset, 
                openInbox, 
                setOpenInbox, 
                openMobileInbox, 
                setOpenMobileInbox}) {

    //usesession from next-auth, rename data to session
    const { data: session } = useSession();
    const router = useRouter()

    //opens model state
    const [open, setOpen] = useRecoilState(modalState)

    //resets the input field and calls handleReset function
    const handleSearchReset = () => {
        handleReset()
        setSearchQuery("")
    }

  return (
    <div className='sticky top-0 z-50 shadow-sm bg-green3 text-white'>
      
      <div className='flex flex-col md:flex-row'>

        <div className='flex flex-1 justify-between items-center max-w-6xl ml-3 mr-0 lg:mx-auto space-x-2 md:space-x-0 px-2 md:px-0'>
            
            {/* /* Left */}
            <div onClick={() => router.push('/')} className='flex-shrink-0 relative w-20 md:w-24 cursor-pointer hover:scale-110 transition-all duration-150 ease-out'>
                <Image src="/logo.png" width="120" height="120" className='object-contain'
                objectFit='contain'/>
            </div>
    
            {/* /* Middle - Search Input Field */}
            <div className='max-w-xs'>
                <form onSubmit={handleSearch}>
                    <div className='relative mt-1 p-2 md:p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center'>
                            {searchQuery == '' ? (
                                <SearchIcon type='submit' className='h-5 w-5 text-white '/>
                            ):
                            (
                                <RefreshIcon onClick={handleSearchReset} className='h-5 w-5 text-green3 z-50 cursor-pointer absolute'/>
                            )}
                        </div>
                        <input id='inputChange' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='bg-green2 block w-full pl-10 text-green3 font-bold sm:text-sm border-green2 rounded-md focus:ring-black
                            focus:border-black' type="text" placeholder='climb / user'/>
                        </div>
                </form>
            </div>

            {/*Dropdown  */}
            {session ? 
                (
                <Menu as="div" className="relative inline-block md:hidden text-left w-8 sm:w-24">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white1 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-none ">
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
                            <MailOpenIcon onClick={() => setOpenInbox(!openInbox)} className='navBtn' />
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
                        class="dropdown-toggle p-2 text-white font-bold text-sm active:bg-gray-500 transition duration-150 ease-in-out flex items-center"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Latest Ascents
                    </button>
                        <ul class="dropdown-menu absolute text-base z-50 py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-gray-800"
                            aria-labelledby="dropdownMenuButton2">
                            {posts?.map(item => (
                            <>
                                <li>
                                    <a class="flex dropdown-item text-sm py-2 px-4 font-normal w-64 text-truncate break-all whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-green3"
                                        href="#"    
                                    >{<img className='rounded-full h-5 mr-2' src={item.data().profileImg} alt="" />}  {item.data().climbRef} - {item.data().climbGradeRef} 
                                    </a>
                                </li>
                            </>
                            ))}
                        </ul>
                    </div>
                 </div>
                </div>

                <div class="flex justify-center">
                <div>
                    <div class="dropdown relative">
                    <button
                        class="dropdown-toggle p-2 text-white font-bold text-sm rounded active:bg-gray-500 transition duration-150 ease-in-out flex items-center"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        My Ascents
                    </button>
                        <ul class="dropdown-menu min-w-max absolute text-base z-50 py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-gray-800  overflow-x-auto scrollbar scrollbar-none"
                            aria-labelledby="dropdownMenuButton2">
                            {myPosts?.map(item => (
                            <>
                                <li>
                                    <a class="dropdown-item text-sm py-2 px-4 font-normal w-64 text-truncate break-all block whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white  focus:bg-gray-700 active:bg-green3"
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
                
                <div class="flex justify-center items-center">
                <div>
                    <MailOpenIcon onClick={() => setOpenMobileInbox(!openMobileInbox)} className='h-7 w-7 md:inline-flex hover:scale-125 active:scale-110 transition-all duration-150 ease-out' />
                 </div>
                </div>
                
            <DotsHorizontalIcon className="py-2 mt-1 h-8 w-8 active:text-gray-300 active:scale-105 transition-all duration-150 ease-out" aria-hidden="true" />
        </div>


        </div>
    </div>
  )
}

export default Header