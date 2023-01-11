import Head from 'next/head'
import { Inter } from '@next/font/google'
import Header from "../components/Header"
import Feed from "../components/Feed"
import Modal from "../components/Modal"
import dynamic from "next/dynamic"
import React, {useEffect, useState} from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import {useSession, signIn, signOut} from "next-auth/react"

export default function Home() {

      const {} = dynamic(import("tw-elements"), { ssr: false });

      //usesession from next-auth, rename data to session
      const { data: session } = useSession();
      const router = useRouter()
  
      const [posts, setPosts] = useState([])
      const [myPosts, setMyPosts] = useState([])

      //search ınput
      const [searchQuery, setSearchQuery] = useState('');
      const [search, setSearch] = useState(false)
      
      //getting post data
      useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'climbs'), orderBy('timestamp', 'desc')), 
        (snapshot: any) => {
          setPosts(snapshot.docs)
        });
        return unsubscribe
      }, [db, search])   
      
      //getting my post data
      useEffect(() => {
        try {                
            const unsubscribe = onSnapshot(query(collection(db, 'users', session?.user?.email, 'climbs'), orderBy('timestamp', 'desc')), 
            (snapshot: any) => {
                setMyPosts(snapshot.docs)
              });
              return unsubscribe
        } catch (error) {
            console.log("My data fetch error ->> " , error)
        }
    }, [db])   

    const handleSearch = async (e) => {
      e.preventDefault()
      const filtered = posts.filter((item: any) => {
            return item.data().climbRef.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   item.data().username.toLowerCase().includes(searchQuery.toLowerCase())
          
      })
      setPosts(filtered)
    }

     //resets the search
      function handleReset(){
          setSearchQuery("")
          setSearch(!search)
      }

  return (
    <div className="bg-green1 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>allez!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header posts={posts} myPosts={myPosts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} handleReset={handleReset} />

      <Feed posts={posts} myPosts={myPosts} />

      <Modal />
      
    </div>
  )
}
