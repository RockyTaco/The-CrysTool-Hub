// src/app/page.js
'use client';

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    const navigateToFurnaceGraph = () => {
        router.push('/furnace-graph');
    };

    const navigateToStoichiometryCalculator = () => {
        router.push('/stoichiometry-calculator');
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 2,
                backgroundColor: 'background.default',
                color: 'text.primary',
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
        </Container>
    );
};

export default HomePage;
