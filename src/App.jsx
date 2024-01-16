import React from 'react'
import './App.css'
import {
  Route,
  Routes, 
  BrowserRouter, 
} from 'react-router-dom';
import UsersList from './components/users/UsersList';
import UserCard from './components/users/UserCard';
import UserPage from './components/userpage/UserPage';
import Layout from './Layout';
import Posts from './posts/Posts';
import Albums from './albums/Albums';
import Comments from './posts/Comments';
import Photos from './albums/photos';


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Layout/>}>
      <Route path='' element={<UsersList/>}/>
       <Route path='usercard' element= {<UserCard/>}/> 
       <Route path="posts" element={<Posts />} />
       <Route path="posts/:postId/comments" element={<Comments />} />
     <Route path='userpage/:userId' element= {<UserPage/>} />
     <Route path='albums' element= {<Albums/>}/>
     
     <Route path='albums/:albumId/photos' element = {<Photos/>}/>
    </Route>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
