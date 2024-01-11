import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

const ProjectDisplay = ({ project, onEdit, onFinish, onDelete, showActionButtons }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '81vh', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            {showActionButtons && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <Button variant="contained" color="primary" onClick={onEdit}>Edit</Button>
                    <Button variant="contained" color="success" onClick={onFinish}>Finish</Button>
                    <Button variant="contained" color="error" onClick={onDelete}>Delete</Button>
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
        </Box>
    );
};

export default ProjectDisplay;