import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Comments() {
    const [comments, setComments] = useState([])
    const { postId } = useParams()

    const getRandomTime = () => {
        const randomDate = new Date ()
        randomDate.setHours(Math.floor(Math.random() * 24));
      randomDate.setMinutes(Math.floor(Math.random() * 60));
        return randomDate
      }
    

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const data = await response.json();
            setComments(data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        fetchPosts();
      }, [postId]);
  return (
    <>
     <h1 className='font-bold text-3xl inline-block text-center'> Comments </h1>
          {comments.map((comment) => (
            <div key={comment.id} className='bg-cyan-100 rounded-lg border-[1px] border-black text-left
             m-3 p-4 shadow-lg font-medium'>
               <div>Post Id : {comment.postId}</div>
              <div>Id : {comment.id} </div>
              <h3>Name : {comment.name}</h3>
              <p>Email : {comment.email}</p>
              <p>Body : {comment.body}</p>
              <p className='font-normal'>Time : {getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
             ))}
    </>
  )
}

export default Comments
