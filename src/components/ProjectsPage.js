import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Box, Container} from '@mui/material';
import {useNavigate} from "react-router-dom";
import NewProjectButton from "./buttons/NewProjectButton";
import ProjectToggleButtons from "./buttons/ProjectToggleButtons";
import NewProjectDialog from "./dialogs/NewProjectDialog";
import ProjectTable from "./project/ProjectTable";

function ProjectsPage() {
    const [view, setView] = useState('ongoing');
    const [projectsData, setProjectsData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProjects = useCallback(async () => {
        const endpoint = view === 'ongoing' ? '/projects/ongoing' : '/projects/completed';
        const url = `https://laravelfinalproject.azurewebsites.net${endpoint}`;
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
            setProjectsData(data);
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to fetch projects');
        }
    }, [view]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleNewProjectClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCreateProject = async (newProjectData) => {
        const url = 'https://laravelfinalproject.azurewebsites.net/projects';
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProjectData)
            });

            if (!response.ok) {
                new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('New project created:', data);
            handleCloseDialog();

            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
            setError('Failed to create project');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '81vh' }}>
            <Container component="main" sx={{ flex: '1 0 auto', pt: 4, pb: 4 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <NewProjectButton onClick={handleNewProjectClick} />
                    <ProjectToggleButtons view={view} onChange={handleViewChange} />
                </Box>
                <NewProjectDialog open={openDialog} onClose={handleCloseDialog} onCreate={handleCreateProject} />
                <ProjectTable projectsData={projectsData} view={view} navigate={navigate} />
            </Container>
        </Box>
    );
}

export default ProjectsPage;
