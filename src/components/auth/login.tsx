import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { AuthApiAxios } from "../../api/auth/AuthApiAxios.ts";
import { LoginForm } from "../../api/auth/LoginForm.ts";
import { AuthStorage } from "../../config/AuthStorage.ts";
import { useNavigate } from "react-router";

const authApi = new AuthApiAxios();

export const LoginFormComponent: React.FC = () => {
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await authApi.login(form);
            AuthStorage.saveToken(token);
            setSuccess('Logowanie zakończone sukcesem! Przekierowanie na stronę główną...');
            setError(null);
            setTimeout(() => navigate('/'), 2000); // Przekierowanie po 2 sekundach
        } catch (err: any) {
            setError(err.response?.data?.message || 'Logowanie nie powiodło się');
            setSuccess(null);
        }
    };

    return (
        <Paper sx={{ margin: 10, padding: 10 }}>
            <Typography component="h4" sx={{ fontSize: '2rem' }}>
                Logowanie
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}>
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
                        {success}
                    </Box>
                )}
                {error && (
                    <Box color="error.main" sx={{ mt: 2 }}>
                        {error}
                    </Box>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Zaloguj się
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Nie masz konta?{' '}
                        <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>
                            Zarejestruj się
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};
