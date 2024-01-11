import React from 'react';
import {Box, Typography} from '@mui/material';
import theme from '../theme';

function Footer() {
    return (
        <Box sx={{
            flexGrow: 0,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.background.default,
            textAlign: 'center',
            padding: '0.5rem 0',
        }}>
            <Typography variant="body2">
                © {new Date().getFullYear()} |  MIS PROYECTOS
            </Typography>
            <Typography variant="body2">
                Developed by Aleks Gałęza | Maciej Zarzycki | Mateusz Trzebiatowski | Michał Turbiarz
            </Typography>
        </Box>
    );
}

export default Footer;
