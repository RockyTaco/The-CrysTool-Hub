// src/app/page.js
'use client';

import React, { useState } from 'react';
import { Container, Typography, Button, Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const [theme, setTheme] = useState('light');
    const router = useRouter();

    const navigateToFurnaceGraph = () => {
        router.push('/furnace-graph');
    };

    const navigateToStoichiometryCalculator = () => {
        router.push('/stoichiometry-calculator');
    };

    const handleThemeChange = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Container
                maxWidth={false} // Full-width container
                disableGutters // Remove container padding
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                    padding: 0, // Ensure no extra padding
                    margin: 0, // Ensure no extra margin
                }}
            >
                <Typography variant="h2" component="h1" sx={{ marginBottom: 3 }}>
                    Welcome to the Calculator Hub
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 3 }}>
                    Choose a tool to get started:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="contained" onClick={navigateToFurnaceGraph}>
                        Furnace Graph Generator
                    </Button>
                    <Button variant="contained" onClick={navigateToStoichiometryCalculator}>
                        Stoichiometry Calculator
                    </Button>
                </Box>
                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Acknowledgments
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        Special thanks to Professor David Mandrus and his group for giving me the experience and opportunity to make this possible.
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Contact Information
                    </Typography>
                    <Typography variant="body1">
                        If you have any questions or feedback, please reach out to me:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        manley15@purdue.edu
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={handleThemeChange}
                >
                    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Button>
            </Container>
        </ThemeProvider>
    );
};

export default HomePage;
