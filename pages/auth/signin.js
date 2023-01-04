import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header"
import Image from 'next/image'

//Browser...
export default function SignIn({ providers }) {
  return (
    <>
    <Header />

    <div className="flex flex-col bg-green1 items-center justify-center min-h-screen py-2 px-14 text-center">
            <Image src="/logo.png" width="200" height="120" objectFit='contain' className="mb-10"/>
            <h1 className='text-2xl mb-10 font-semibold text-black1  '>Add your ascents.</h1>
            <h2 className='text-xl mb-10 font-semibold text-black1 '>Always keep track of your climbs.</h2>
            <h3 className='text-md font-semibold text-black1 '>Ready to see your logbook? Register now with your email.</h3>
        <div className="mt-20">
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
            <button className="p-3 bg-green3 rounded-lg text-white" 
                onClick={() => signIn(provider.id, {callbackUrl: '/'})}>
                Sign in with {provider.name}
            </button>
            </div>
        ))}
        </div>
    </div>
    </>
  )
}

//Server side render
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}