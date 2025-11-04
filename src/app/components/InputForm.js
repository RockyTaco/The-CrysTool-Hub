import React, { useState, useEffect, forwardRef } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const InputForm = forwardRef(({ addData, prevTemperature }, ref) => {
    const [time, setTime] = useState('');
    const [temperature, setTemperature] = useState('');
    const [label, setLabel] = useState('');

    useEffect(() => {
        const currentTemperature = parseFloat(temperature);
        if (!isNaN(currentTemperature)) {
            if (currentTemperature > prevTemperature) {
                setLabel('Heat to');
            } else if (currentTemperature < prevTemperature) {
                setLabel('Cool to');
            } else {
                setLabel('Hold at');
            }
        } else {
            setLabel('');
        }
    }, [temperature, prevTemperature]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (time && temperature) {
            const currentTemperature = parseFloat(temperature);
            addData({ time: parseFloat(time), temperature: currentTemperature });
            setTime('');
            setTemperature('');
            setLabel('');
            if (ref.current) {
                ref.current.focus(); // Focus the time input box
            }
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: (theme) => theme.palette.background.paper,
                padding: 1,
                borderRadius: 1,
            }}
        >
            <Typography
                variant="h6"
                component="span"
                sx={{
                    color: (theme) => theme.palette.mode === 'light' ? 'black' : theme.palette.text.primary
                }}
            >
                For
            </Typography>
            <TextField
                label="Time (hours)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                variant="outlined"
                type="number"
                inputRef={ref} // Set ref here
                sx={{
                    '& .MuiInputBase-input': {
                        color: (theme) => theme.palette.text.primary,
                    },
                    '& .MuiFormLabel-root': {
                        color: (theme) => theme.palette.text.primary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: (theme) => theme.palette.text.primary,
                    },
                }}
            />
            <Typography
                variant="h6"
                component="span"
                sx={{
                    color: (theme) => theme.palette.mode === 'light' ? 'black' : theme.palette.text.primary
                }}
            >
                {label}
            </Typography>
            <TextField
                label="Temperature (°C)"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                variant="outlined"
                type="number"
                sx={{
                    '& .MuiInputBase-input': {
                        color: (theme) => theme.palette.text.primary,
                    },
                    '& .MuiFormLabel-root': {
                        color: (theme) => theme.palette.text.primary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: (theme) => theme.palette.text.primary,
                    },
                }}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Data
            </Button>
        </Box>
    );
});

export default InputForm;
