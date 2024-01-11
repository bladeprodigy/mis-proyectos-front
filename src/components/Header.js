import React from 'react';
import {Box, Button, Typography, useMediaQuery} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import LogoutButton from './LogoutButton';
import theme from '../theme';

function Header({ showLogout }) {
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const isProjectDetail = location.pathname.match(/\/projects\/\d+$/);

    return (
        <Box sx={{
            flexGrow: 0,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light} 90%)`,
            color: theme.palette.secondary.contrastText,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: matches ? '2rem' : '1rem',
            position: 'relative',
        }}>
            {isProjectDetail && (
                <Button
                    sx={{ position: 'absolute', left: '20px', color: 'white' }}
                    onClick={() => navigate('/projects')}
                >
                    Back to Projects
                </Button>
            )}

            <Typography variant="h3" sx={{ paddingX: showLogout ? '48px' : '0' }}>MIS PROYECTOS</Typography>

            {showLogout && (
                <Box sx={{ position: 'absolute', right: '20px' }}>
                    <LogoutButton />
                </Box>
            )}
        </Box>
    );
}

export default Header;

