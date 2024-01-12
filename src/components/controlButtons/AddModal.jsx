import React, { useState } from 'react'
import { Modal, Box, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';


function AddModal({handleCloseAddModal, handleAdd, showAdd}) {
    const [addedData, setAddedData] = useState({
        Name: '',
        Username: '',
        Email: '',
        Address: '',
        Phone: '',
        Website: '',
        CompanyName: ''
      });

      const handleAddClick = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: 'POST',
            body: JSON.stringify({
              name:addedData.Name,
              username:addedData.Username,
              email:addedData.Email,
              address: {
                street:addedData.Address, 
              },
              phone:addedData.Phone,
              website:addedData.Website,
              company: {
                name:addedData.CompanyName,
              },
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
    
          const updatedData = await response.json();
    
          // Handle the updated data as needed
          handleAdd(updatedData);
    
          // Close the modal
          handleCloseAddModal();
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      };
  return (
    <>
    <Modal open={Boolean(showAdd)} onClose={handleCloseAddModal}>
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
           Add User
          </DialogTitle>
          <DialogContent sx={{display: 'flex' ,flexDirection: 'column', width: 750, gap: 1.5}}>
            <TextField
            label="Name"
            fullWidth
            value={addedData.Name}
            onChange={(e) => setAddedData({...addedData,Name: e.target.value})} />
            <TextField
            label="Username"
            fullWidth
            value={addedData.Username}
            onChange={(e) => setAddedData({...addedData, Username: e.target.value})} />
            <TextField
            label="Email"
            fullWidth
            value={addedData.Email}
            onChange={(e) => setAddedData({...addedData, Email: e.target.value})} />
            <TextField
            label="Address"
            fullWidth
            value={addedData.Address}
            onChange={(e) => setAddedData({...addedData, Address: e.target.value})} />
            <TextField
            label="Phone"
            fullWidth
            value={addedData.Phone}
            onChange={(e) => setAddedData({...addedData, Phone: e.target.value})} />
            <TextField
            label="Website"
            fullWidth
            value={addedData.Website}
            onChange={(e) => setAddedData({...addedData, Website: e.target.value})} />
            <TextField
            label="Company Name"
            fullWidth
            value={addedData.CompanyName}
            onChange={(e) => setAddedData({...addedData, CompanyName: e.target.value})} />
          </DialogContent>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DialogActions>
            <Button onClick={handleCloseAddModal} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleAddClick} variant='contained' color='error'>
              Add
            </Button> 
            </DialogActions>
          </Box>
        </Box>
      </Modal> 
    </>
  )
}

export default AddModal
