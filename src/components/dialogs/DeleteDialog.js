import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
            <DialogTitle id="delete-dialog-title">{"Delete Project?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    Are you sure you want to delete this project? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={onConfirm} color="primary" autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;