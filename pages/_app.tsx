import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { useEffect } from 'react';
import React from 'react';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
        <RecoilRoot>
          <Component {...pageProps} />
         </RecoilRoot>
      </SessionProvider>

  )
}

export default MyApp