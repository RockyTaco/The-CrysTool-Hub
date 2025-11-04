import React from 'react';
import Image from 'next/image';
import balanceScale from '../../../public/inverted_balance_scale.png'; // Ensure this path is correct
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#121212', // Dark background color
                color: '#ffffff', // Light text color
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999, // Ensures it appears on top
            }}
        >
            <Image
                src={balanceScale}
                alt="Balance Scale Icon"
                width={150}
                height={150}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Typography variant="h6">Loading</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
                    <CircularProgress size={20} sx={{ color: '#ffffff' }} />
                </Box>
            </Box>
        </Box>
    );
};

export default LoadingPage;
