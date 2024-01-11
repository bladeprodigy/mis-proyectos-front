import React from 'react';
import {Box, Button, Typography, useMediaQuery, useTheme} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import LogoutButton from "./auth/LogoutButton";


function Header({ showLogout }) {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const isProjectDetail = location.pathname.match(/\/projects\/\d+$/);

    return (
        <Box sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light} 90%)`,
            color: theme.palette.secondary.contrastText,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: matchesSM ? '2rem' : '1rem',
            position: 'relative',
        }}>
            {isProjectDetail && (
                <Button
                    sx={{ position: 'absolute', left: '20px', color: 'white', minWidth: matchesSM ? 'auto' : '48px' }}
                    onClick={() => navigate('/projects')}
                >
                    {matchesSM ? 'Back to Projects' : '<'}
                </Button>
            )}

            <Typography variant={matchesSM ? 'h3' : 'h5'} sx={{ paddingX: showLogout ? '48px' : '0' }}>
                MIS PROYECTOS
            </Typography>

            {showLogout && (
                <Box sx={{ position: 'absolute', right: '20px' }}>
                    <LogoutButton size={matchesSM ? 'medium' : 'small'} />
                </Box>
            )}
        </Box>
    );
}

export default Header;
