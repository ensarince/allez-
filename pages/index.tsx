import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from "../components/Header"
import Feed from "../components/Feed"
import Modal from "../components/Modal"
import Script from 'next/script'
import dynamic from "next/dynamic"
import React from 'react'

export default function Home() {

  const {} = dynamic(import("tw-elements"), { ssr: false });

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
