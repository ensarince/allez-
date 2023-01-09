import React, {useEffect, useState} from 'react'
import {BookmarkIcon, ChatIcon, HeartIcon, ChatAlt2Icon} from "@heroicons/react/outline"
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import {useSession, signIn, signOut} from "next-auth/react"
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';
import Image from 'next/image';


function Post({ id, username, userImg, img, climb, climbGrade, climbLocation, climbNote, climbedAs }) {

    const { data: session } = useSession();

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

          //getting comment data
          useEffect(() => {
            const comments = onSnapshot(query(collection(db, 'climbs', id, 'comments'), orderBy('timestamp', 'desc')), 
              snapshot => {
                setComments(snapshot.docs)
              });
              return comments
        }, [db])   
        
           //getting like data
           useEffect(() => {
            try {
              const likes = onSnapshot(query(collection(db, 'climbs', id, 'likes')), 
              snapshot => {
                setLikes(snapshot.docs)
              });
              return likes
            } catch (error) {
              console.log("Like fetching error --> ", error)
            }
          }, [db, id])     

          //hasLiked info
           useEffect(() => {
            setHasLiked(likes.findIndex((like) => like.id === session?.user.email) !== -1)
          }, [likes])   

        //like adding functionality
        const likePost = async() => {

          if(hasLiked){
            await deleteDoc(doc(db, 'climbs', id, 'likes', session.user.email))
          }else{
            await setDoc(doc(db, 'climbs', id, 'likes', session.user.email), {
              username: session.user.name 
            })
          }
        }

    //comment adding functionality
    const sendComment = async(e) => {
      e.preventDefault();

      const commentToSend = comment;
      setComment('');

      await addDoc(collection(db, 'climbs', id, 'comments'), {
        comment: commentToSend,
        username: session.user.name,
        userImg: session.user.image,
        timestamp: serverTimestamp(),
      })
    }

  return (
    <div className='bg-green1 my-7 '>

    {/* img */}
    <img src={img} className="object-cover w-full" alt="" />

    {/* buttons */}
    {session && (
        <div className='flex justify-start space-x-2 px-4 pt-4'>
          <div className='flex space-x-4'>
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="btn text-red-500" />
            ) : (
            <HeartIcon onClick={likePost} className='btn'/>
            )}            
          </div>
          {likes.length > 0 && (
            <p className='font-bold mt-1'>{likes.length} likes</p>
          )}
        </div>
      )
    }

       {/* caption */}
       <p className='p-5 truncate flex items-center justify-start space-x-2'>
        <img src={userImg || "https://media.tenor.com/5aF7np_zPEgAAAAM/pepe-why-pepe-the-frog.gif"} className="rounded-full h-12 w-12 object-contain border" alt="" />
        <span className='font-bold mr-2'>{username}</span>
        {climbNote}
      </p>

      {/* Comments section */}
    {comments.length > 0 && (
      <div className='ml-10 h-12 overflow-y-scroll scrollbar-none'>
        {comments.map(comment => (
          <div className="flex items-center space-x-2 mb-3" key={comment.data().id}>
            <img src={comment?.data().userImg} className="h-7 rounded-full" alt=""/>
            <p className='text-sm flex-1'><span className='font-bold'>{comment.data().username}<span>   </span></span>{comment.data().comment}</p>

            <Moment className="pr-5 text-xs" fromNow>
              {comment.timestamp?.toDate()}
            </Moment>
          </div>
        ))}
      </div>
    )}


    {session && (
      <form action="" className='flex items-center p-4' >
        <ChatAlt2Icon disabled={!comment.trim()} onClick={sendComment} className='h-7 cursor-pointer' />
        <input onChange={(e) => setComment(e.target.value) } type="text" value={comment} placeholder='Comment here' className='bg-green1 border-none flex-1 focus:ring-0 outline-none'/>
        <button type='submit' disabled={!comment.trim()} onClick={sendComment} className='font-semibold hidden  text-green3 cursor-pointer'>Post</button>
      </form>
      )
    }
  </div>
  )
}

export default Post