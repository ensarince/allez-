import React, {useEffect, useState} from 'react'
import Post from "../components/Post"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

function Posts() {

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
    <div>
    {posts.map(post => (
      <Post key={post.id} 
            id={post.id} 
            username={post.username} 
            userImg = {post.userImg} 
            img={post.img} 
            climb={post.climb} 
            climbGrade={post.climbGrade} 
            climbLocation={post.climbLocation} 
            climbNote={post.climbNote} 
            climbedAs={post.climbedAs} 
        />
    ))}
</div>
  )
}

export default Posts