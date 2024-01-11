import React from 'react';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = React.useState({});

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const payload = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            password_confirmation: data.get('confirmPassword'),
        };

        const url = 'https://laravelfinalproject.azurewebsites.net/register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setFormErrors(result.error || { general: 'An unexpected error occurred' });
            }
        } catch (error) {
            setFormErrors({ general: 'Network error' });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '81vh', justifyContent: 'center' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                {formErrors.general && <Alert severity="error">{formErrors.general}</Alert>}
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoComplete="username"
                        error={Boolean(formErrors.username)}
                        helperText={formErrors.username ? formErrors.username[0] : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={Boolean(formErrors.email)}
                        helperText={formErrors.email ? formErrors.email[0] : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        error={Boolean(formErrors.password)}
                        helperText={formErrors.password ? formErrors.password[0] : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        error={Boolean(formErrors.password_confirmation)}
                        helperText={formErrors.password_confirmation ? formErrors.password_confirmation[0] : ''}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;