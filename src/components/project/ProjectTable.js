import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


function ProjectTable({ projectsData, view, navigate }) {
    return (
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">NAME</TableCell>
                        <TableCell align="center">START DATE</TableCell>
                        <TableCell align="center">{view === 'ongoing' ? 'PLANNED END DATE' : 'COMPLETION DATE'}</TableCell>
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
    );
}

export default ProjectTable;