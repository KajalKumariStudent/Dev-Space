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


function EditAddPostModal({postId, idToEdit, handleCloseEditModal, handleEdit, showAdd, handleAdd, handleCloseAddModal}) {
    const [updatedPost,setUpdatedPost] = useState({
        Title : '',
        Body : ''
      });
      useEffect(() => {
        async function fetchEditedPost() {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
              method: 'GET',
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
    
            const Post = await response.json();
    
            setUpdatedPost({
              Title: Post.title,
              Body: Post.body,
              
            });
          } catch (error) {
            console.error('Error fetching user Post:', error);
          }
        }
    
        fetchEditedPost();
      }, [postId]);
    
      const handleEditClick = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
              id: postId,
              title: updatedPost.Title,
              body: updatedPost.Body,
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
      
          const editedPost = await response.json();
      
          // Handle the edited Post as needed
          handleEdit(editedPost);
      
          // Close the modal
          handleCloseEditModal();
        } catch (error) {
          console.error('Error updating user Post:', error);
        }
      };
      
    
      const handleAddClick = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify({
              title: updatedPost.Title,
              body: updatedPost.Body,
              userId: 1, // Provide the userId if needed
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
      
          const newPost = await response.json();
      
          // Handle the new Post as needed
          handleAdd(newPost);
      
          // Close the modal
          handleCloseAddModal();
        } catch (error) {
          console.error('Error adding user Post:', error);
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
            value={updatedPost.Title}
            onChange={(e) =>setUpdatedPost({...updatedPost,Title: e.target.value})} />
            <TextField
            label="Body"
            fullWidth
            value={updatedPost.Body}
            onChange={(e) =>setUpdatedPost({...updatedPost, Body: e.target.value})} />
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

export default EditAddPostModal
