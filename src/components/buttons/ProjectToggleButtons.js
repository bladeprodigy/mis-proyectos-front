import {ToggleButton, ToggleButtonGroup} from "@mui/material";


function ProjectToggleButtons({ view, onChange }) {
    return (
        <ToggleButtonGroup color="primary" value={view} exclusive onChange={onChange} sx={{ mb: 2 }}>
            <ToggleButton value="ongoing">Ongoing</ToggleButton>
            <ToggleButton value="finished">Completed</ToggleButton>
        </ToggleButtonGroup>
    );
}

export default ProjectToggleButtons;