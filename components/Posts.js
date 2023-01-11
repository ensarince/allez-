import React from 'react'
import Post from "../components/Post"

function Posts({posts}) {

  return (
    <div className={posts.length == 0 ? 'h-screen' : null}>
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