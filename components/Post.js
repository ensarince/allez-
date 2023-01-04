import React, {useEffect} from 'react'
import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, EmojiHappyIcon, MenuIcon, PaperAirplaneIcon} from "@heroicons/react/outline"
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import {useSession, signIn, signOut} from "next-auth/react"
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
//import Moment from 'react-moment';


function Post({ id, username, userImg, img, climb, climbGrade, climbLocation, climbNote, climbedAs }) {

    const { data: session } = useSession();

    //comment
/*     useEffect(() => {


    }, [])
     */

  return (
    <div className='bg-green1 shadow-inner my-7 '>
    {/* Header */}
    <div className='flex items-center p-5'>
      <img src={userImg || "https://media.tenor.com/5aF7np_zPEgAAAAM/pepe-why-pepe-the-frog.gif"} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
      <p className='flex-1 font-bold '>{username}</p>
    </div>
          
    {/* img */}
    <img src={img} className="object-cover w-full" alt="" />

    {/* buttons */}
    {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {/* {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="btn text-red-500" />
            ) : (
            <HeartIcon onClick={likePost} className='btn'/>
            )} 
            <ChatIcon  className='btn'/>
            <PaperAirplaneIcon  className='btn'/>
            */}
          </div>
          {/* <BookmarkIcon className='btn' /> */}
        </div>
      )
    }

    {/* caption */}
    <p className='p-5 truncate'>
{/*       {likes.length > 0 && (
        <p className='font-bold mb-1'>{likes.length} likes</p>
      )} */}
      <span className='font-bold mr-1'>{session?.user.name}</span>
      {climbNote}
    </p>


    {/* commments */}
    {/* {comments.length > 0 && (
      <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb black scrollbar-thin'>
        {comments.map(comment => (
          <div className="flex items-center space-x-2 mb-3" key={comment.id}>
            <img src={comment.userImg} className="h-7 rounded-full" alt=""/>
            <p className='text-sm flex-1'><span className='font-bold'>{comment.username}</span>{comment.comment}</p>

            <Moment className="pr-5 text-xs" fromNow>
              {comment.timestamp?.toDate()}
            </Moment>
          </div>
        ))}
      </div>
    )} */}


    {session && (
      <form action="" className='flex items-center p-4' >
        <EmojiHappyIcon className='h-7' />
        <input /* onChange={(e) => setComment(e.target.value) } */ type="text" /* value={comment} */ placeholder='Add a comment...' className='bg-green1 border-none flex-1 focus:ring-0 outline-none'/>
        <button type='submit' /* disabled={!comment.trim()} onClick={sendComment} */ className='font-semibold text-blue-400'>Post</button>
      </form>
      )
    }
  </div>
  )
}

export default Post