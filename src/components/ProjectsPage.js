import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import NewProjectDialog from "./NewProjectDialog";
import {useNavigate} from "react-router-dom";

function ProjectsPage() {
    const [view, setView] = useState('ongoing');
    const [projectsData, setProjectsData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProjects = async () => {
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
    };

    useEffect(() => {
        fetchProjects();
    }, [view]);

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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <Container component="main" sx={{ flex: '1 0 auto', pt: 4, pb: 4 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button variant="contained" onClick={handleNewProjectClick} sx={{ mb: 2 }}>
                        Create New Project
                    </Button>
                    <ToggleButtonGroup color="primary" value={view} exclusive onChange={handleViewChange} sx={{ mb: 2 }}>
                        <ToggleButton value="ongoing">Ongoing</ToggleButton>
                        <ToggleButton value="finished">Finished</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <NewProjectDialog open={openDialog} onClose={handleCloseDialog} onCreate={handleCreateProject} />
                <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">NAME</TableCell>
                                <TableCell align="center">START DATE</TableCell>
                                <TableCell align="center">END DATE</TableCell>
                                <TableCell align="center">PARTICIPANTS</TableCell>
                                <TableCell align="center">DESCRIPTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectsData.map((project, index) => (
                                <TableRow key={index} hover onClick={() => navigate(`/projects/${project.id}`)}>
                                    <TableCell align="center">{project.name}</TableCell>
                                    <TableCell align="center">{project.startDate}</TableCell>
                                    <TableCell align="center">{project.plannedEndDate}</TableCell>
                                    <TableCell align="center">{project.participants}</TableCell>
                                    <TableCell align="center">{project.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}

export default ProjectsPage;
