import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from '../controlButtons/DeleteModal';
import EditModal from '../controlButtons/EditModal';

function UserCard({user,key,deleteUserData, editUserData}) {
 
  const [idToDelete, setIdToDelete] = useState(false)
  const [idToEdit, setIdToEdit] = useState(false)
  
  const handleOpenDeleteModal = () => {
    setIdToDelete(true)
  }
  const handleCloseDeleteModal = () => {
    setIdToDelete(false)
  }

 
  const handleDelete = () => {
    if (user && user.id) {
      deleteUserData(user.id);
      setIdToDelete(false);
    }
    else {
      console.log("Error code")
    }
  }

  const handleOpenEditModal = () => {
    setIdToEdit(true)
  }

  const handleCloseEditModal = () =>  setIdToEdit(false)
  
  const handleEdit = (editedData) => {
    if (user && user.id) {
      editUserData(editedData);
     setIdToEdit(false)
    }  else {
      console.log("Error code")
    }
  }
  return (
    <>
    <div className=' border-[1px] border-black rounded-lg h-[400px] w-[300px] bg-cyan-100 m-4 shadow-xl ' >
       <div className='flex justify-end'> <button className='mx-4' onClick={handleOpenEditModal}>✏️</button>
       {<EditModal idToEdit={idToEdit} handleCloseEditModal={handleCloseEditModal}
        handleEdit={handleEdit} userId={user.id}/>}
        <button className='mx-4 m'onClick={ handleOpenDeleteModal}> ❌</button>
        {<DeleteModal idToDelete={idToDelete} handleCloseDeleteModal={handleCloseDeleteModal}
         handleDelete={handleDelete}/>}
        </div>
       <Link to={{
      pathname: `/userpage/${user.id}`,
    }}> 
       <div className='mx-5 my-3'><img className=' w-64 '
        src="https://t4.ftcdn.net/jpg/04/68/39/67/360_F_468396795_VljJWcf5C80sOq2P8ip689rdTY2eRQHq.jpg" alt="DevLabs" />
      </div>
        
        <div className='mx-4 flex justify-start font-medium' >
        Name : {user.name}
        </div>
        
        <div className='mx-4 flex justify-start  font-semibold'>
          Email : {user.email}
          </div>
          
        <div className='mx-4 flex justify-start  font-semibold'>Address :
        {user.address.street}, {user.address.suite}, {user.address.city}
        </div>
        
        <div className='mx-4 flex justify-start  font-semibold'>
        Phone : {user.phone}
        </div>
        
        <div className='mx-4 flex justify-start  font-semibold'>
          Website : {user.website}
          </div>

        <div className='mx-4 flex justify-start  font-semibold'>
        Company Name : {user.company.name}
        </div>
       </Link>  
    </div>
      
    
    </>
  )
}

export default UserCard
