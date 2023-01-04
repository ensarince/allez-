import { FilterIcon } from '@heroicons/react/outline'
import React, {useEffect, useState} from 'react'
import Post from "../components/Post"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
function FeedSum() {

  const [posts, setPosts] = useState([])

  //getting post data
  useEffect(() => {
    db.collection('climbs')
      .get()
      .then((querySnapshot) => {
        setPosts(querySnapshot.docs.map(doc => ({
          id: doc.id,
          username: doc.data().username,
          userImg: doc.data().profileImg,
          img: doc.data().image,
          climbGrade: doc.data().climbGradeRef,
          climbLocation: doc.data().climbLocation,
          climbNote: doc.data().climbNoteRef,
          climb: doc.data().climbRef,
          climbedAs: doc.data().climbedAsRef,
        })))
      }); 
  }, [db])   
  
  return (
    <div className='bg-green1 rounded-sm my-4 '>
      <div className='flex space-x-2 justify-center'>
        <h1 className='text-md lg:text-xl text-green3'>Latest Ascents</h1>
        <FilterIcon  className="h-8 cursor-pointer"/>
      </div>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <tbody className="bg-white divide-y divide-white1 dark:bg-green3 dark:divide-gray-700">
                          {posts?.map((item)=> (
                            <tr key={item.id} className='hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer transition-all duration-150 ease-out'>
                              <td className="py-2 px-1 text-sm font-medium whitespace-nowrap dark:text-white">{item.username}</td>
                              <td className="py-2 px-1 text-sm font-medium whitespace-nowrap dark:text-white">{item.climb}</td>
                              <td className="py-2 px-1 text-sm font-medium whitespace-nowrap dark:text-white">{item.climbGrade}</td>
                            </tr>
                          ))}
                    </tbody>
            </table>
    </div>
  )
}

export default FeedSum