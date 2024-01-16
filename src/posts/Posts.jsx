import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditAddPostModal from '../components/controlButtons/EditAddPostModal';
import DeleteAlbumOrPost from '../components/controlButtons/DeleteAlbumorPost';

function Posts() {

    const [posts, setPosts] = useState([]);
    const [idToEdit,setIdToEdit] = useState(false); 
    const [idToDelete, setIdToDelete] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await response.json();
            setPosts(data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        fetchPosts();
      }, []);

      const getRandomTime = () => {
        const randomDate = new Date ()
        randomDate.setHours(Math.floor(Math.random() * 24));
      randomDate.setMinutes(Math.floor(Math.random() * 60));
      randomDate.setDate(Math.floor(Math.random() * 30));
      randomDate.setMonth(Math.floor(Math.random()*12));
      randomDate.setFullYear(Math.floor(Math.random()*24+2000))
        return randomDate
      }

      const handleOpenEditModal = (postId) => {
        setSelectedPostId(postId);
        setIdToEdit(true);
      };

      const handleCloseEditModal = () => setIdToEdit(false);

      const handleEditedPost = (editedPost) => {
        setPosts((prevPosts) =>prevPosts.map((post) => post.id === editedPost.id ? editedPost: post) )
        handleCloseEditModal()
      }
    
      const handleOpenDeleteModal = (postId) =>{
       setIsDeleteModalOpen(true);
       setIdToDelete(postId)
      }
      
      const handleOpenAddModal = () => setShowAdd(true);

      const handleCloseAddModal = () => setShowAdd(false);

      const handleAdd = (newPost) => {
        setPosts((prevPosts) =>[...prevPosts, newPost])
        handleCloseAddModal()
    }
  return (
    <>
     <div className='text-right'><button onClick={handleOpenAddModal}
      className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 shadow-lg
    border-gray-500'>Add Post</button>
    <EditAddPostModal 
    handleCloseAddModal={handleCloseAddModal} 
    handleAdd={handleAdd} 
    showAdd={showAdd}/>
    </div>

       <div className='flex flex-wrap'>
    <EditAddPostModal
     handleCloseEditModal={handleCloseEditModal}
     handleEdit={handleEditedPost}
      idToEdit={idToEdit} 
      postId={selectedPostId}/>
          {posts.map((post) => (
            <div  key={post.id} className='bg-cyan-100 rounded-lg border-[0.5px]
             border-black text-left m-6 p-4 shadow-lg font-medium w-[35rem]'>
              <div className='inline mr-48'>
                Id : {post.id} </div>
              <div className='inline-flex justify-end ml-40'>
                 <button 
                 onClick={() => handleOpenEditModal(post.id)}
                  className='mx-4' >✏️</button>
              
              <button onClick={() => handleOpenDeleteModal(post.id)}className='mx-4 '> ❌</button>
             
              </div>
              <div className='inline'>
              <Link to={{
                pathname : `/posts/${post.id}/comments`
              }}>
                <div>UserId : {post.userId}</div>
              
              <h3>Title : <span className='font-normal'>{post.title}</span></h3>
              <p>Body : <span className='font-normal'>{post.body}</span></p>
             <div>Date : <span className='font-normal'> 
             {getRandomTime().toLocaleDateString()}
             </span></div> 
             <div>Time : <span className='font-normal'> 
             {getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}
                </span></div> 
              </Link>
              </div>
            </div>
          ))}
          <DeleteAlbumOrPost isDeleteModalOpen={isDeleteModalOpen}
           setIsDeleteModalOpen={setIsDeleteModalOpen} 
           setAllPostsOrAlbumsData={setPosts}
           idToDelete={idToDelete} setIdToDelete={setIdToDelete}/>
        </div>
        
    </>
  )
}

export default Posts
