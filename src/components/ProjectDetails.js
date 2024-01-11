import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import FinishDialog from "./dialogs/FinishDialog";
import EditProjectDialog from "./dialogs/EditProjectDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import ProjectDisplay from "./project/ProjectDisplay";

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

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }


    const showActionButtons = project.status !== "completed";

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '81vh', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <ProjectDisplay
                project={project}
                onEdit={handleEdit}
                onFinish={handleOpenFinishDialog}
                onDelete={handleOpenDeleteDialog}
                showActionButtons={showActionButtons}
            />
            <EditProjectDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                project={project}
                onSave={handleSaveEdit}
            />
            <FinishDialog
                open={openFinishDialog}
                onClose={handleCloseFinishDialog}
                onConfirm={handleFinishProject}
            />
            <DeleteDialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteProject}
            />
        </Box>
    );
};

export default ProjectDetails;
