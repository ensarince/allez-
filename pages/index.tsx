import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from "../components/Header"
import Feed from "../components/Feed"
import Modal from "../components/Modal"


export default function Home() {
  return (
    <div className="bg-green1 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>allez!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Feed />

      <Modal />
      
    </div>
  )
}
