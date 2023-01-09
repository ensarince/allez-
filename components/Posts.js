import React, {useEffect, useState} from 'react'
import Post from "../components/Post"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

function Posts() {

  const [posts, setPosts] = useState([])

  //getting post data
  useEffect(() => {
      const unsubscribe = onSnapshot(query(collection(db, 'climbs'), orderBy('timestamp', 'desc')), 
        snapshot => {
          setPosts(snapshot.docs)
        });
        return unsubscribe
  }, [db])   

  return (
    <div>
    {posts.map(post => (
      <Post key={post.id} 
            id={post.id} 
            username={post.data().username} 
            userImg = {post.data().profileImg} 
            img={post.data().image} 
            climb={post.data().climbRef} 
            climbGrade={post.data().climbGradeRef} 
            climbLocation={post.data().climbLocation} 
            climbNote={post.data().climbNoteRef} 
            climbedAs={post.data().climbedAsRef} 
        />
    ))}
</div>
  )
}

export default Posts