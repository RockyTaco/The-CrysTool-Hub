'use client'; // Mark this file as a client component

import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, createTheme, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import Image from 'next/image';
import balanceScale from '../../public/balance_scale.png';
import invertedBalanceScale from '../../public/inverted_balance_scale.png';
import LoadingPage from './components/LoadingPage';
import { useRouter } from 'next/navigation';
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon

const HomePage = () => {
    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);

        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 100);

        return () => {
            clearTimeout(loadingTimeout);
        };
    }, []);

    useEffect(() => {
        if (router.isReady) {
            const loadingTimeout = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => {
                clearTimeout(loadingTimeout);
            };
        }

        return () => {
            // Cleanup if necessary
        };
    }, [router.isReady]);

    const navigateToFurnaceGraph = () => {
        router.push('/furnace-graph');
    };

    const navigateToStoichiometryCalculator = () => {
        router.push('/stoichiometry-calculator');
    };

    const handleThemeChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
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

    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            {loading && <LoadingPage />}
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                    padding: 0,
                    margin: 0,
                }}
            >
                <Box sx={{ marginBottom: 3 }}>
                    <Image
                        src={theme === 'light' ? balanceScale : invertedBalanceScale}
                        alt="Balance Scale Icon"
                        width={100}
                        height={100}
                    />
                </Box>
                <Typography variant="h2" component="h1" sx={{ marginBottom: 3 }}>
                    Welcome to the CrysTool Hub
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
                <Box sx={{ marginTop: 4 }}>
                    <IconButton
                        component="a"
                        href="https://github.com/RockyTaco/The-CrysTool-Hub"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: currentTheme.palette.text.primary,
                            '&:hover': {
                                color: currentTheme.palette.primary.main,
                            },
                        }}
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: 2,
                        backgroundColor: theme === 'light' ? 'secondary.main' : 'secondary.main', // Change button color based on the theme
                        color: 'common.white', // Button text color
                        '&:hover': {
                            backgroundColor: theme === 'light' ? 'secondary.dark' : 'secondary.dark', // Darker color on hover
                        },
                        padding: '10px 20px', // Adjust padding as needed
                        borderRadius: '8px', // Optional: Adjust border radius
                    }}
                    onClick={handleThemeChange}
                >
                    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Button>

            </Container>
        </ThemeProvider>
    );
};

export default HomePage;
