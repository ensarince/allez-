import { FilterIcon } from '@heroicons/react/outline'
import React, {useEffect, useState} from 'react'
import Post from "../components/Post"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

function FeedSum() {
  const [posts, setPosts] = useState([])

        //getting post data
        useEffect(() => {
          const unsubscribe = onSnapshot(query(collection(db, 'climbs'), orderBy('timestamp', 'desc')), 
            snapshot => {
              setPosts(snapshot.docs)
            });
            return unsubscribe
      }, [db])   

      //filter feedsum
  
  return (
    <div className='bg-green1 rounded-sm my-10'>
      <div className='flex space-x-2 justify-center'>
        <h1 className='text-md lg:text-xl text-green3 mb-2'>Latest Ascents</h1>
        <FilterIcon  className="h-8 cursor-pointer"/>
      </div>
              <table className="divide-gray-200 table-fixed text-left w-15 ">
                  <tbody className="bg-white dark:bg-green1">
                          {posts?.map((item)=> (
                            <tr key={item.id} className='hover:bg-gray-500 dark:hover:bg-gray-400 cursor-pointer transition-all duration-150 ease-out'>
                              <td className="py-2 px-1 w-10 text-sm font-medium  whitespace-nowrap dark:text-green3">
                                <img src={item.data().profileImg} className="h-7 w-7 overflow-hidden rounded-full" alt="" />
                              </td>
                              <td className="py-2 px-1 w-36 text-md truncate font-normal whitespace-nowrap dark:text-green3">{item.data().climbRef}</td>
                              <td className="py-2 px-1 w-12 text-md font-normal whitespace-nowrap dark:text-green3">{item.data().climbGradeRef}</td>
                            </tr>
                          ))} 
                    </tbody>
            </table>
    </div>
  )
}

export default FeedSum