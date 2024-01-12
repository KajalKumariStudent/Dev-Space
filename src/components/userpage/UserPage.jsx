import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Tab, Tabs, Box } from '@mui/material';


function UserPage() {
  const [value, setValue] = useState(1);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
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
            <div className='text-right'><button className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 
         shadow-lg border-gray-500 '>Add post</button></div>
          {posts.map((post) => (
            <div key={post.id} className='bg-cyan-100 rounded-lg border-[1px] border-black text-left
             m-3 p-4 shadow-lg font-medium'>
              <Link to={{
               pathname : `/posts/${post.id}/comments`
              }}>
              <div>Id : {post.id} </div>
              <h3>Title : {post.title}</h3>
              <p>Body : {post.body}</p>
              <p className='font-normal'>Date : {getRandomTime().toLocaleDateString()}</p>
              <p className='font-normal'>Time : {getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </Link>
            </div>
          ))}
        </div>
      )}

      {value === 2 && (
        <div >
         <div className='text-right'><button className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 
         shadow-lg border-gray-500 '>Add Album</button></div> 
          {albums.map((album) => (
            <div key={album.id} className='bg-cyan-100 rounded-lg border-[1px] border-black text-left
            m-3 p-4 shadow-lg font-medium'>
              <Link to={{
               pathname : `/albums/${album.id}/photos`
             }}>
              <div>id : {album.id} </div>
              <h3>Title : {album.title}</h3>
              <p className='font-normal'>Date : {getRandomTime().toLocaleDateString()}</p>
              <p className='font-normal'>Time : {getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
             </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default UserPage;
