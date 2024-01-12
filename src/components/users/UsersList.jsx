import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import AddModal from '../controlButtons/AddModal';


function UsersList() {
  const [users, setUsers] = useState([]);
 const [showAdd, setShowAdd] = useState(false);

  async function getAllUsers(id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const usersData = [];
      for (let id = 1; id <= 10; id++) {
        const user = await getAllUsers(id);
        if (user) {
          usersData.push(user);
        }
      }
      setUsers(usersData);
    };

    fetchData();
  }, []);

  const handleCloseAddModal = () => setShowAdd(false)

  const handleOpenAddModal = () => setShowAdd(true)

  const handleAdd = (newUser) => {
      setUsers((prevUsers) =>[...prevUsers, newUser])
      handleCloseAddModal()
  }

 const deleteUserData = (userId) => {
  setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
 }

 const editUserData = (editedUser) => {
  setUsers((prevUsers) =>
    prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
  );
};
  

  return (
    <>
     <div className='text-right'><button onClick={handleOpenAddModal} className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 shadow-lg
      border-gray-500'>Add User</button>
      <AddModal handleCloseAddModal={handleCloseAddModal} handleAdd={handleAdd} showAdd={showAdd}/>
      </div>
    <div className='flex flex-wrap justify-center text-left'>
      {users.map((user, index) => (
        <UserCard key={index} user={user} deleteUserData={deleteUserData}  editUserData={editUserData}/>
        
      ))}
      </div>
    </>
  );
}

export default UsersList;
