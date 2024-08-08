import React, { useState } from 'react';
import { Container, Box, TextField, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import the "+" icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import Header from '../app/components/Header'; // Import the Header component

const StoichiometryCalculator = () => {
    const [inputs, setInputs] = useState([{}]);

    const handleAddInput = () => {
        setInputs([...inputs, {}]);
    };

    const handleDeleteInput = (index) => {
        setInputs(inputs.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Header
                theme="light" // Set the theme as needed
                toggleTheme={() => {}} // Replace with your toggleTheme function
                pageTitle="Stoichiometry Calculator"
                infoTooltip="Information about Stoichiometry Calculator" // Update tooltip text as needed
            />
            <Container sx={{ marginTop: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                        }}
                    >
                        {inputs.map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <TextField
                                    label={`Element ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ flex: 1, maxWidth: 200 }} // Adjust maxWidth as needed
                                />
                                <IconButton
                                    onClick={() => handleDeleteInput(index)}
                                    sx={{
                                        backgroundColor: '#FF9999', // Light red color for delete button
                                        color: '#900000', // Darker red for the icon
                                        '&:hover': {
                                            backgroundColor: '#FF6666', // Even lighter red for hover
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <IconButton
                            onClick={handleAddInput}
                            sx={{
                                alignSelf: 'flex-start',
                                backgroundColor: '#98FF98', // Light mint color
                                color: '#004d00', // Darker green for the icon
                                '&:hover': {
                                    backgroundColor: '#b3ffb3', // Even lighter mint for hover
                                },
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default StoichiometryCalculator;
