import React, { useEffect, useState } from 'react'
import { Modal, Box, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function EditAddModal({userId, idToEdit, handleCloseEditModal, handleEdit, showAdd, handleAdd, handleCloseAddModal}) {

  const [updatedData, setUpdatedData] = useState({
    Name: '',
    Username: '',
    Email: '',
    Address: '',
    Phone: '',
    Website: '',
    CompanyName: ''
  });

  useEffect(() => {
    async function fetchEditedData() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        const data = await response.json();

        setUpdatedData({
          Name: data.name,
          Username: data.username,
          Email: data.email,
          Address: data?.address?.street, 
          Phone: data.phone,
          Website: data.website,
          CompanyName: data?.company?.name,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchEditedData();
  }, [userId]);

  const handleEditClick = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: updatedData.Name,
          username: updatedData.Username,
          email: updatedData.Email,
          address: {
            street: updatedData.Address,
          },
          phone: updatedData.Phone,
          website: updatedData.Website,
          company: {
            name: updatedData.CompanyName,
          },
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const newData = await response.json();

      // Handle the new data as needed
      handleEdit(newData);

      // Close the modal
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  let handleAddClick
  if(!userId){
     handleAddClick = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
          method: 'POST',
          body: JSON.stringify({
            name:updatedData.Name,
            username:updatedData.Username,
            email:updatedData.Email,
            address: {
              street:updatedData.Address, 
            },
            phone:updatedData.Phone,
            website:updatedData.Website,
            company: {
              name:updatedData.CompanyName,
            },
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
  
        const newData = await response.json();
  
        // Handle the new data as needed
        handleAdd(newData);
  
        // Close the modal
        handleCloseAddModal();
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };
  }
    
  return (
    <>
     <Modal open={Boolean(idToEdit || showAdd)} onClose={idToEdit ? handleCloseEditModal : handleCloseAddModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <DialogTitle variant='h6' component='h2'>
           {idToEdit ? 'Edit User' : 'Add User'}
          </DialogTitle>
          <DialogContent sx={{display: 'flex' ,flexDirection: 'column', width: 750, gap: 1.5}}>
            <TextField
            label="Name"
            fullWidth
            value={updatedData.Name}
            onChange={(e) => setUpdatedData({...updatedData,Name: e.target.value})} />
            <TextField
            label="Username"
            fullWidth
            value={updatedData.Username}
            onChange={(e) => setUpdatedData({...updatedData, Username: e.target.value})} />
            <TextField
            label="Email"
            fullWidth
            value={updatedData.Email}
            onChange={(e) => setUpdatedData({...updatedData, Email: e.target.value})} />
            <TextField
            label="Address"
            fullWidth
            value={updatedData.Address}
            onChange={(e) => setUpdatedData({...updatedData, Address: e.target.value})} />
            <TextField
            label="Phone"
            fullWidth
            value={updatedData.Phone}
            onChange={(e) => setUpdatedData({...updatedData, Phone: e.target.value})} />
            <TextField
            label="Website"
            fullWidth
            value={updatedData.Website}
            onChange={(e) => setUpdatedData({...updatedData, Website: e.target.value})} />
            <TextField
            label="Company Name"
            fullWidth
            value={updatedData.CompanyName}
            onChange={(e) => setUpdatedData({...updatedData, CompanyName: e.target.value})} />
          </DialogContent>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DialogActions>
            <Button onClick={idToEdit ? handleCloseEditModal : handleCloseAddModal} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={idToEdit ? handleEditClick : handleAddClick} variant='contained' color='error'>
             {idToEdit ? ' Edit' : 'Add'}
            </Button> 
            </DialogActions>
          </Box>
        </Box>
      </Modal> 
    </>
  )
}

export default EditAddModal
