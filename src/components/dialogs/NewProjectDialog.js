import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const NewProjectDialog = ({ open, onClose, onCreate }) => {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        plannedEndDate: '',
        participants: ''
    });

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreate = () => {
        onCreate(projectData);
        setProjectData({ name: '', description: '', plannedEndDate: '', participants: '' });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Project Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="name"
                    value={projectData.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    name="description"
                    value={projectData.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Planned End Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="plannedEndDate"
                    value={projectData.plannedEndDate}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Participants"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="participants"
                    value={projectData.participants}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewProjectDialog;