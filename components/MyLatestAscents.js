import { UserIcon } from '@heroicons/react/outline'
import React, {useState, useEffect} from 'react'
import {useSession, signIn, signOut} from "next-auth/react"
import { db } from '../firebase'

function MyLatestAscents() {

  const [myPosts, setMyPosts] = useState([])
  const { data: session } = useSession();

  //getting post data
  useEffect(() => {
    db.collection('users')
      .doc(session.user.email)
      .collection('climbs')
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        setMyPosts(querySnapshot.docs.map(doc => ({
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
    <div className='bg-green1 rounded-sm p-5 my-4'>
            <div className='flex space-x-2 justify-center'>
        <h1 className='text-md lg:text-xl text-green3'>My Ascents</h1>
        <UserIcon  className="h-8 cursor-pointer"/>
      </div>

      <div className='p-2'>
        <div className='flex space-x-3 items-center flex-col'>
              {myPosts?.map(item => (
                <tr className='flex space-x-10' key={item.id}>
                  <p key={item.id} className='text-sm text-green3'>{item.climb}</p>
                  <p key={item.id} className='text-sm text-green3'>{item.climbGrade}</p>
                  <p key={item.id} className='text-sm text-green3'>{item.climbLocation}</p>
                </tr>
              ))}
          </div>
      </div>
    </div>
  )
}

export default MyLatestAscents