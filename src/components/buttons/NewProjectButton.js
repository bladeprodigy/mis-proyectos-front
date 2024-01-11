import {Button} from "@mui/material";


function NewProjectButton({ onClick }) {
    return (
        <Button variant="contained" onClick={onClick} sx={{ mb: 2 }}>
            Create New Project
        </Button>
    );
}

export default NewProjectButton;