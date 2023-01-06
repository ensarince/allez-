import React, {useEffect, useState} from 'react'
import MiniProfile from "../components/MiniProfile"
import MyLatestAscents from "./MyLatestAscents"
import Posts from "../components/Posts"
import Friends from "../components/Friends"
import FeedSum from "../components/FeedSum"
import {useSession, signIn, signOut} from "next-auth/react"
import Footer from "../components/Footer"


function Feed() {

const { data: session } = useSession();

    //loading state for smooth upload
    const [loading, setLoading] = useState(false)

      //for loading animation
        setTimeout(() => {
            setLoading(false);
        }, 2000);

    useEffect(() => {
    setLoading(true);

    }, [])
    

  return (
    <main className='grid grid-cols-1 md:grid-cols-1 md:max-w-3xl xl:grid-cols-4 xl:max-w-7xl mx-auto'>

        <section className='hidden xl:inline-grid md:col-span-1'>
            <div className='fixed top-20 h-full w-fit'>
                <FeedSum/> 
            </div>
        </section>

        <section className='col-span-2'>

        {/* render loader spinner to wait for data fetch */}
        {loading ? 
            (
                <div className="loader-container w-full md:w-1/3">
                    <div className="spinner"></div>
               </div>
            ):
            (
                <>
                <Posts />
                <Footer />
                </>
            )
        }
        </section>

        <section className='hidden xl:inline-grid md:col-span-1'>
            <div className='fixed top-20 h-full w-fit'>
                <MiniProfile className="overflow-y-scroll scrollbar-none"/>
                {session ?
                (
                    <>
                        <MyLatestAscents className="overflow-y-scroll scrollbar-thin scrollbar-thumb-green3"/>
                        <Friends className=""/>
                    </>
                ): null}
            </div>
        </section>

    </main>
  )
}

export default Feed