import React, { useEffect, useState } from 'react'
import { Modal, Box, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function EditModal({userId, idToEdit, handleCloseEditModal, handleEdit}) {

  const [editedData, setEditedData] = useState({
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
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        const data = await response.json();

        setEditedData({
          Name: data.name,
          Username: data.username,
          Email: data.email,
          Address: data.address.street, // Assuming you have nested properties for address
          Phone: data.phone,
          Website: data.website,
          CompanyName: data.company.name,
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
          name: editedData.Name,
          username: editedData.Username,
          email: editedData.Email,
          address: {
            street: editedData.Address, // Assuming you have nested properties for address
          },
          phone: editedData.Phone,
          website: editedData.Website,
          company: {
            name: editedData.CompanyName,
          },
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const updatedData = await response.json();

      // Handle the updated data as needed
      handleEdit(updatedData);

      // Close the modal
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
    
  return (
    <>
     <Modal open={Boolean(idToEdit)} onClose={handleCloseEditModal}>
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
           Edit User
          </DialogTitle>
          <DialogContent sx={{display: 'flex' ,flexDirection: 'column', width: 750, gap: 1.5}}>
            <TextField
            label="Name"
            fullWidth
            value={editedData.Name}
            onChange={(e) => setEditedData({...editedData,Name: e.target.value})} />
            <TextField
            label="Username"
            fullWidth
            value={editedData.Username}
            onChange={(e) => setEditedData({...editedData, Username: e.target.value})} />
            <TextField
            label="Email"
            fullWidth
            value={editedData.Email}
            onChange={(e) => setEditedData({...editedData, Email: e.target.value})} />
            <TextField
            label="Address"
            fullWidth
            value={editedData.Address}
            onChange={(e) => setEditedData({...editedData, Address: e.target.value})} />
            <TextField
            label="Phone"
            fullWidth
            value={editedData.Phone}
            onChange={(e) => setEditedData({...editedData, Phone: e.target.value})} />
            <TextField
            label="Website"
            fullWidth
            value={editedData.Website}
            onChange={(e) => setEditedData({...editedData, Website: e.target.value})} />
            <TextField
            label="Company Name"
            fullWidth
            value={editedData.CompanyName}
            onChange={(e) => setEditedData({...editedData, CompanyName: e.target.value})} />
          </DialogContent>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DialogActions>
            <Button onClick={handleCloseEditModal} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleEditClick} variant='contained' color='error'>
              Edit
            </Button> 
            </DialogActions>
          </Box>
        </Box>
      </Modal> 
    </>
  )
}

export default EditModal
