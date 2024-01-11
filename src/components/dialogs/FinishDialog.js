import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const FinishDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="finish-dialog-title" aria-describedby="finish-dialog-description">
            <DialogTitle id="finish-dialog-title">{"Finish Project?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="finish-dialog-description">
                    Are you sure you want to mark this project as finished?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={onConfirm} color="primary" autoFocus>Finish</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FinishDialog;