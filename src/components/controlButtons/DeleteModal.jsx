import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";

function DeleteModal ({idToDelete, handleCloseDeleteModal, handleDelete}) {
  
  useEffect(() => {
   
    if (idToDelete) {
      
      handleCloseDeleteModal();
    }
  }, []);
    return (
<Modal open={Boolean(idToDelete)} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography variant='h6' component='h2'>
            Confirm Delete
          </Typography>
          <Typography>Are you sure you want to delete this user?</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={handleCloseDeleteModal} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant='contained' color='error'>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      )};

      export default DeleteModal