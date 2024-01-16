import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Tab, Tabs, Box } from '@mui/material';
import EditAddPostModal from '../controlButtons/EditAddPostModal';
import DeleteAlbumOrPost from '../controlButtons/DeleteAlbumorPost';
import EditAddAlbumModal from '../controlButtons/EditAddAlbumModal';

function UserPage() {
  const [value, setValue] = useState(1);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [idToEdit,setIdToEdit] = useState(false); 
  const [idToDelete, setIdToDelete] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const { userId } = useParams();

  const getRandomTime = () => {
    const randomDate = new Date ()
    randomDate.setHours(Math.floor(Math.random() * 24));
  randomDate.setMinutes(Math.floor(Math.random() * 60));
  randomDate.setSeconds(Math.floor(Math.random() * 60));
    return randomDate
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [userId]);

  const handleChange = (event, newValue) => setValue(newValue);
  const handleOpenEditPostModal = (postId) => {
    setSelectedPostId(postId);
    setIdToEdit(true);
  };

  const handleCloseEditPostModal = () => setIdToEdit(false);

  const handleEditedPost = (editedPost) => {
    setPosts((prevPosts) =>prevPosts.map((post) => post.id === editedPost.id ? editedPost: post) )
    handleCloseEditPostModal()
  }

  const handleOpenDeletePostModal = (postId) =>{
   setIsDeleteModalOpen(true);
   setIdToDelete(postId)
  }
  
  const handleOpenAddPostModal = () => setShowAdd(true);

  const handleCloseAddPostModal = () => setShowAdd(false);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) =>[...prevPosts, newPost])
    handleCloseAddPostModal()
}
const handleOpenEditAlbumModal = (postId) => {
  setSelectedAlbumId(postId);
  setIdToEdit(true);
};
const handleCloseEditAlbumModal = () => setIdToEdit(false);

const handleAlbum = (editedAlbum) => {
  setAlbums((prevAlbums) =>prevAlbums.map((album) => album.id === editedAlbum.id ? editedAlbum: album) )
  handleCloseEditAlbumModal()
}
const handleOpenDeleteAlbumModal = (postId) =>{
  setIsDeleteModalOpen(true);
  setIdToDelete(postId)
 }

const handleOpenAddAlbumModal = () => setShowAdd(true);

const handleCloseAddAlbumModal = () => setShowAdd(false);

const handleAddAlbum = (newAlbum) => {
  setAlbums((prevAlbums) =>[...prevAlbums, newAlbum])
  handleCloseAddAlbumModal()
}
  return (
    <>
    <div className='bg-cyan-50 rounded-lg border-[1px] text-left
             m-3 p-4 shadow-lg font-medium'>
      <div className='m-2'>UserId : {user.id}</div>
    <div className='m-2'>Name : {user.name}</div> 
     <div className='m-2'>Username : {user.username} </div>
     <div className='m-2'>Email : {user.email} </div>
     <div className='m-2'>
        Address : {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
      </div>
      <div className='m-2'>Geo : {user.address?.geo?.lat}, {user.address?.geo?.lng}</div>
      <div className='m-2'>Phone : {user.phone}</div>
      <div className='m-2'>Website : {user.website}</div>
      <div className='m-2'>Company Name : {user.company?.name}</div>
      <div className='m-2'>Catch Phrase : {user.company?.catchPhrase}</div>
      <div className='m-2'>B.S : {user.company?.bs}</div> 
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab  label={<span style={{ fontWeight: 'bold', color: 'black' }}>Posts</span>}  value={1} />
          <Tab label={<span style={{ fontWeight: 'bold', color: 'black' }}>Albums</span>} value={2} />
        </Tabs>
      </Box>

      {value === 1 && (
        <div>
            <div onClick={handleOpenAddPostModal} className='text-right'><button className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 
         shadow-lg border-gray-500 '>Add post</button>
         <EditAddPostModal 
          handleCloseAddModal={handleCloseAddPostModal} 
          handleAdd={handleAddPost} 
          showAdd={showAdd}/>
         </div>
         <EditAddPostModal
         handleCloseEditModal={handleCloseEditPostModal}
         handleEdit={handleEditedPost}
         idToEdit={idToEdit} 
         postId={selectedPostId}/>
         <DeleteAlbumOrPost isDeleteModalOpen={isDeleteModalOpen}
           setIsDeleteModalOpen={setIsDeleteModalOpen} 
           setAllPostsOrAlbumsData={setPosts}
           idToDelete={idToDelete} setIdToDelete={setIdToDelete}/>
          {posts.map((post) => (
            <div key={post.id} className='bg-cyan-100 rounded-lg border-[1px] border-black text-left
             m-3 p-4 shadow-lg font-medium'>
             <div className='inline mr-48'>Id : <span className='font-normal'> {post.id}</span> </div> 
             <div className='inline-flex justify-end ml-40'>
                 <button 
                 onClick={() => handleOpenEditPostModal(post.id)}
                  className='mr-4 ml-[38rem]' >✏️</button>
              
              <button onClick={() => handleOpenDeletePostModal(post.id)}className='mx-4 '> ❌</button>
             
              </div>
              <Link to={{
               pathname : `/posts/${post.id}/comments`
              }}>
              <h3>Title : <span className='font-normal'>{post.title}</span></h3>
              <p>Body : <span  className='font-normal'>{post.body}</span></p>
              <p >Date : <span className='font-normal'>{getRandomTime().toLocaleDateString()}</span></p>
              <p >Time : <span className='font-normal'>{getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}</span></p>
            </Link>
            </div>
          ))}
        </div>
      )}

      {value === 2 && (
        <div >
         <div className='text-right'><button onClick={handleOpenAddAlbumModal} className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 
         shadow-lg border-gray-500 '>Add Album</button></div> 
          <EditAddAlbumModal 
      handleOpenAddModal={handleOpenAddAlbumModal} handleAdd={handleAddAlbum} showAdd={showAdd} />
       <EditAddAlbumModal 
      albumId={selectedAlbumId} handleEdit={handleAlbum}  idToEdit={idToEdit} handleCloseEditModal={handleCloseEditAlbumModal}/>
         <DeleteAlbumOrPost isDeleteModalOpen={isDeleteModalOpen}
           setIsDeleteModalOpen={setIsDeleteModalOpen} 
           setAllPostsOrAlbumsData={setAlbums}
           idToDelete={idToDelete} setIdToDelete={setIdToDelete}/> 
          {albums.map((album) => (
            <div key={album.id} className='bg-cyan-100 rounded-lg border-[1px] border-black text-left
            m-3 p-4 shadow-lg font-medium'>
              <div className='inline'>id : {album.id} </div>
             <div className='inline-flex justify-end '> 
             <button onClick={() => handleOpenEditAlbumModal(album.id)} className='ml-[57rem] mr-8' >✏️</button>
             <button onClick={() => handleOpenDeleteAlbumModal(album.id)} className='mx-4 m'> ❌</button>
            
             </div>
             <div>
             <Link to={{
              pathname : `/albums/${album.id}/photos`
             }}>
              <div className='inline'>UserId : {album.userId}</div>
              <h3>Title : {album.title}</h3>
             <div>Date :  <span className='font-normal'>{getRandomTime().toLocaleDateString()}</span></div>
              <div>Time : <span className='font-normal'>{getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}</span></div>
            </Link>
            </div>
            
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default UserPage;
