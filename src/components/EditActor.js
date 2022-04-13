import { Dialog } from "@mui/material";


import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditActor({open,actor_id, first_name,last_name,changeHandler,submitHandler,handleClose}){
  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Edit Actor</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="actor_id"
            name='actor_id'
            label="Actor ID"
            value={actor_id}
            type="text"
            onChange={changeHandler}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            name='first_name'
            value={first_name}
            label="First Name"
            type="text"
            onChange={changeHandler}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="last_name"
            name='last_name'
            value={last_name}
            label="Last Name"
            type="text"
            onChange={changeHandler}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>Cancel</Button>
          <Button onClick={()=>handleClose(true)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}