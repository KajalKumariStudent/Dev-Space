import React, 
{ useState,
  useEffect } from 'react'
import 
{ Modal,
   Box, 
   DialogTitle,
   DialogContent, 
   DialogActions, 
   Button, 
   TextField } from '@mui/material';

function EditAddAlbumModal({
     albumId, idToEdit, handleCloseEditModal, handleEdit, showAdd, handleAdd, handleCloseAddModal}) {
        const [updatedAlbum,setUpdatedAlbum] = useState({
            Title : '',
          });
          useEffect(() => {
            async function fetchEditedAlbum() {
              try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
                  method: 'GET',
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
                });
        
                const Album = await response.json();
        
                setUpdatedAlbum({
                  Title: Album.title,
                  
                });
              } catch (error) {
                console.error('Error fetching Album:', error);
              }
            }
        
            fetchEditedAlbum();
          }, [albumId]);
        
          const handleEditClick = async () => {
            try {
              const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
                method: 'PUT',
                body: JSON.stringify({
                  id: albumId,
                  title: updatedAlbum.Title,
                  userId: 1,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });
          
              const editedAlbum = await response.json();
          
              // Handle the edited Album as needed
              handleEdit(editedAlbum);
          
              // Close the modal
              handleCloseEditModal();
            } catch (error) {
              console.error('Error updating user Album:', error);
            }
          };
          
        
          const handleAddClick = async () => {
            try {
              const response = await fetch(`https://jsonplaceholder.typicode.com/albums`, {
                method: 'POST',
                body: JSON.stringify({
                  title: updatedAlbum.Title,
                  userId: 1, // Provide the userId if needed
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });
          
              const newAlbum = await response.json();
          
              // Handle the new Album as needed
              handleAdd(newAlbum);
          
              // Close the modal
              handleCloseAddModal();
            } catch (error) {
              console.error('Error adding album:', error);
            }
          };
          
          
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
                label="Title"
                fullWidth
                value={updatedAlbum.Title}
                onChange={(e) =>setUpdatedAlbum({...updatedAlbum,Title: e.target.value})} />
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
    

export default EditAddAlbumModal
