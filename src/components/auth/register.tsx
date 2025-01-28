import React, { useState } from 'react';
import {TextField, Button, Box, Paper, Typography, Link, Container} from '@mui/material';
import { AuthApiAxios } from "../../api/auth/AuthApiAxios.ts";
import { RegisterForm } from "../../api/auth/RegisterForm.ts";
import {useNavigate} from "react-router";

const authApi = new AuthApiAxios();

export const RegisterFormComponent: React.FC = () => {
    const [form, setForm] = useState<RegisterForm>({ firstName: '', lastName: '', email: '', password: '' });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authApi.register(form);
            setSuccess('Rejestracja zakończona sukcesem!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Rejestracja nie powiodła się');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: "150px" }}>
        <Paper sx={{ margin: 10, padding: 10}}>
            <Typography component="h4" sx={{ fontSize: '2rem', textAlign: 'center' }}>
                Rejestracja
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}>
                <TextField
                    label="Imię"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Nazwisko"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Hasło"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                {success && (
                    <Box color="success.main" sx={{ mt: 2 }}>
                        {success} Przekierowanie na stronę logowania...
                    </Box>
                )}
                {error && <Box color="error.main" sx={{ mt: 2 }}>{error}</Box>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Zarejestruj się
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Masz już konto?{' '}
                        <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}>
                            Zaloguj się
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Paper>
        </Container>
    );
};
