import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Typography
} from '@mui/material';
import EditProjectDialog from "./EditProjectDialog";

const ProjectDetails = () => {
    let { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [openFinishDialog, setOpenFinishDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const url = `https://laravelfinalproject.azurewebsites.net/projects/${projectId}`;
            const token = localStorage.getItem('accessToken');

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProject(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Failed to fetch project details');
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleEdit = () => {
        setEditDialogOpen(true);
    };

    const handleSaveEdit = async (updatedProjectData) => {
        const url = `https://laravelfinalproject.azurewebsites.net/projects/${projectId}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProjectData),
            });

            if (!response.ok) {
                new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProject(data);
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Edit error:', error);
            setError('Failed to update project');
        }
    };

    const handleOpenFinishDialog = () => {
        setOpenFinishDialog(true);
    };

    const handleCloseFinishDialog = () => {
        setOpenFinishDialog(false);
    };

    const handleFinishProject = async () => {
        const url = `https://laravelfinalproject.azurewebsites.net/projects/${projectId}/complete`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                new Error(`HTTP error! status: ${response.status}`);
            }

            setOpenFinishDialog(false);
            navigate('/projects');
        } catch (error) {
            console.error('Finish error:', error);
            setError('Failed to finish project');
        }
    };

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteProject = async () => {
        const url = `https://laravelfinalproject.azurewebsites.net/projects/${projectId}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                new Error(`HTTP error! status: ${response.status}`);
            }

            setOpenDeleteDialog(false);
            navigate('/projects');
        } catch (error) {
            console.error('Delete error:', error);
            setError('Failed to delete project');
        }
    };

    if (!project) {
        return <Typography>Loading...</Typography>;
    }

    const showActionButtons = project.status !== "completed";

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            {showActionButtons && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
                    <Button variant="contained" color="success" onClick={handleOpenFinishDialog}>Finish</Button>
                    <Button variant="contained" color="error" onClick={handleOpenDeleteDialog}>Delete</Button>
                </Box>
            )}
            <Card sx={{ minWidth: '80%', mb: 4 }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        {project.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Start Date:</strong> {project.startDate}</Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Planned End Date:</strong> {project.plannedEndDate}</Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Participants:</strong> {project.participants}</Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Description:</strong> {project.description}</Typography>
                    <Typography variant="subtitle1" gutterBottom><strong>Status:</strong> {project.status}</Typography>
                </CardContent>
            </Card>
            <EditProjectDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} project={project} onSave={handleSaveEdit} />
            <Dialog open={openFinishDialog} onClose={handleCloseFinishDialog} aria-labelledby="finish-dialog-title" aria-describedby="finish-dialog-description">
                <DialogTitle id="finish-dialog-title">{"Finish Project?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="finish-dialog-description">
                        Are you sure you want to mark this project as finished?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFinishDialog} color="primary">Cancel</Button>
                    <Button onClick={handleFinishProject} color="primary" autoFocus>Finish</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
                <DialogTitle id="delete-dialog-title">{"Delete Project?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete this project? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteProject} color="primary" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectDetails;
