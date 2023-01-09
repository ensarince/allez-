import { UserIcon } from '@heroicons/react/outline'
import React, {useState, useEffect} from 'react'
import {useSession, signIn, signOut} from "next-auth/react"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

function MyLatestAscents() {

  const [myPosts, setMyPosts] = useState([])
  const { data: session } = useSession();

        //getting my post data
        useEffect(() => {
          try {                
              const unsubscribe = onSnapshot(query(collection(db, 'users', session?.user?.email, 'climbs'), orderBy('timestamp', 'desc')), 
                snapshot => {
                  setMyPosts(snapshot.docs)
                });
                return unsubscribe
          } catch (error) {
              console.log("My data fetch error ->> " , error)
          }
      }, [db])   


  

  return (
    <div className='bg-green1 rounded-sm p-5 my-4'>
            <div className='flex space-x-2 justify-center'>
        <h1 className='text-md lg:text-xl text-green3'>My Ascents</h1>
        <UserIcon  className="h-8 cursor-pointer"/>
      </div>

      <table className="divide-gray-200 table-fixed text-left w-15 ">
                  <tbody className="bg-white dark:bg-green1">
                          {myPosts?.map((item)=> (
                            <tr key={item.id} className='hover:bg-gray-500 dark:hover:bg-gray-400 cursor-pointer transition-all duration-150 ease-out'>
                              <td className="py-2 px-1 w-12 text-md truncate font-normal whitespace-nowrap dark:text-green3">{item.data().climbRef}</td>
                              <td className="py-2 px-1 w-12 text-md font-normal whitespace-nowrap dark:text-green3">{item.data().climbGradeRef}</td>
                              <td className="py-2 px-1 w-12 text-md truncate font-normal whitespace-nowrap dark:text-green3">{item.data().climbLocation}</td>
                            </tr>
                          ))} 
                    </tbody>
            </table>
    </div>
  )
}

export default MyLatestAscents