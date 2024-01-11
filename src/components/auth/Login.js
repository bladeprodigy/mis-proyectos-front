import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            email: data.get('email'),
            password: data.get('password'),
        };

        try {
            const response = await fetch('https://laravelfinalproject.azurewebsites.net/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('accessToken', result.access_token);
                navigate('/projects');
            } else {
                if (result.error && typeof result.error === 'object') {
                    setFormErrors(result.error);
                } else if (result.error) {
                    setFormErrors({ general: result.error });
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setFormErrors({ general: 'Network error' });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '81vh',
                    justifyContent: 'center'
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {formErrors.general && <Alert severity="error">{formErrors.general}</Alert>}
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!formErrors.email}
                        helperText={formErrors.email && formErrors.email.join(" ")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        error={!!formErrors.password}
                        helperText={formErrors.password && formErrors.password.join(" ")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
