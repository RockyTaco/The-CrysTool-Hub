import React, { useState } from 'react';
import { Container, Box, TextField, IconButton, Typography, Button, useTheme, useMediaQuery, createTheme, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../app/components/Header';
import { utils, writeFile } from 'xlsx';

const ELEMENTS = [
    { symbol: 'H', mass: 1.008 },
    { symbol: 'He', mass: 4.002602 },
    { symbol: 'Li', mass: 6.94 },
    { symbol: 'Be', mass: 9.0121831 },
    { symbol: 'B', mass: 10.81 },
    { symbol: 'C', mass: 12.011 },
    { symbol: 'N', mass: 14.007 },
    { symbol: 'O', mass: 15.999 },
    { symbol: 'F', mass: 18.998403163 },
    { symbol: 'Ne', mass: 20.1797 },
    { symbol: 'Na', mass: 22.98976928 },
    { symbol: 'Mg', mass: 24.305 },
    { symbol: 'Al', mass: 26.9815384 },
    { symbol: 'Si', mass: 28.085 },
    { symbol: 'P', mass: 30.973761998 },
    { symbol: 'S', mass: 32.06 },
    { symbol: 'Cl', mass: 35.45 },
    { symbol: 'Ar', mass: 39.948 },
    { symbol: 'K', mass: 39.0983 },
    { symbol: 'Ca', mass: 40.078 },
    { symbol: 'Sc', mass: 44.955908 },
    { symbol: 'Ti', mass: 47.867 },
    { symbol: 'V', mass: 50.9415 },
    { symbol: 'Cr', mass: 51.9961 },
    { symbol: 'Mn', mass: 54.938043 },
    { symbol: 'Fe', mass: 55.845 },
    { symbol: 'Co', mass: 58.933194 },
    { symbol: 'Ni', mass: 58.6934 },
    { symbol: 'Cu', mass: 63.546 },
    { symbol: 'Zn', mass: 65.38 },
    { symbol: 'Ga', mass: 69.723 },
    { symbol: 'Ge', mass: 72.630 },
    { symbol: 'As', mass: 74.921595 },
    { symbol: 'Se', mass: 78.971 },
    { symbol: 'Br', mass: 79.904 },
    { symbol: 'Kr', mass: 83.798 },
    { symbol: 'Rb', mass: 85.4678 },
    { symbol: 'Sr', mass: 87.62 },
    { symbol: 'Y', mass: 88.90584 },
    { symbol: 'Zr', mass: 91.224 },
    { symbol: 'Nb', mass: 92.90637 },
    { symbol: 'Mo', mass: 95.95 },
    { symbol: 'Tc', mass: 98 },
    { symbol: 'Ru', mass: 101.07 },
    { symbol: 'Rh', mass: 102.90549 },
    { symbol: 'Pd', mass: 106.42 },
    { symbol: 'Ag', mass: 107.8682 },
    { symbol: 'Cd', mass: 112.414 },
    { symbol: 'In', mass: 114.818 },
    { symbol: 'Sn', mass: 118.710 },
    { symbol: 'Sb', mass: 121.760 },
    { symbol: 'Te', mass: 127.60 },
    { symbol: 'I', mass: 126.90447 },
    { symbol: 'Xe', mass: 131.293 },
    { symbol: 'Cs', mass: 132.90545196 },
    { symbol: 'Ba', mass: 137.327 },
    { symbol: 'La', mass: 138.90547 },
    { symbol: 'Ce', mass: 140.116 },
    { symbol: 'Pr', mass: 140.90766 },
    { symbol: 'Nd', mass: 144.242 },
    { symbol: 'Pm', mass: 145 },
    { symbol: 'Sm', mass: 150.36 },
    { symbol: 'Eu', mass: 151.964 },
    { symbol: 'Gd', mass: 157.25 },
    { symbol: 'Tb', mass: 158.925354 },
    { symbol: 'Dy', mass: 162.500 },
    { symbol: 'Ho', mass: 164.930328 },
    { symbol: 'Er', mass: 167.259 },
    { symbol: 'Tm', mass: 168.934218 },
    { symbol: 'Yb', mass: 173.045 },
    { symbol: 'Lu', mass: 174.9668 },
    { symbol: 'Hf', mass: 178.49 },
    { symbol: 'Ta', mass: 180.94788 },
    { symbol: 'W', mass: 183.84 },
    { symbol: 'Re', mass: 186.207 },
    { symbol: 'Os', mass: 190.23 },
    { symbol: 'Ir', mass: 192.217 },
    { symbol: 'Pt', mass: 195.084 },
    { symbol: 'Au', mass: 196.966570 },
    { symbol: 'Hg', mass: 200.592 },
    { symbol: 'Tl', mass: 204.38 },
    { symbol: 'Pb', mass: 207.2 },
    { symbol: 'Bi', mass: 208.98040 },
    { symbol: 'Po', mass: 209 },
    { symbol: 'At', mass: 210 },
    { symbol: 'Rn', mass: 222 },
    { symbol: 'Fr', mass: 223 },
    { symbol: 'Ra', mass: 226 },
    { symbol: 'Ac', mass: 227 },
    { symbol: 'Th', mass: 232.0377 },
    { symbol: 'Pa', mass: 231.03588 },
    { symbol: 'U', mass: 238.02891 },
    { symbol: 'Np', mass: 237 },
    { symbol: 'Pu', mass: 244 },
    { symbol: 'Am', mass: 243 },
    { symbol: 'Cm', mass: 247 },
    { symbol: 'Bk', mass: 247 },
    { symbol: 'Cf', mass: 251 },
    { symbol: 'Es', mass: 252 },
    { symbol: 'Fm', mass: 257 },
    { symbol: 'Md', mass: 258 },
    { symbol: 'No', mass: 259 },
    { symbol: 'Lr', mass: 266 },
    { symbol: 'Rf', mass: 267 },
    { symbol: 'Db', mass: 268 },
    { symbol: 'Sg', mass: 269 },
    { symbol: 'Bh', mass: 270 },
    { symbol: 'Hs', mass: 270 },
    { symbol: 'Mt', mass: 278 },
    { symbol: 'Ds', mass: 281 },
    { symbol: 'Rg', mass: 282 },
    { symbol: 'Cn', mass: 285 },
    { symbol: 'Nh', mass: 286 },
    { symbol: 'Fl', mass: 289 },
    { symbol: 'Mc', mass: 290 },
    { symbol: 'Lv', mass: 293 },
    { symbol: 'Ts', mass: 294 },
    { symbol: 'Og', mass: 294 },
];


const StoichiometryCalculator = () => {
    const [inputs, setInputs] = useState([{ symbol: '', mass: '', ratio: '', weightPercent: '', partialMass: '' }]);
    const [totalMass, setTotalMass] = useState('');
    const [mode, setMode] = useState('light');
    const [sheetTitle, setSheetTitle] = useState('Stoichiometry Data');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAddInput = () => {
        setInputs([...inputs, { symbol: '', mass: '', ratio: '', weightPercent: '', partialMass: '' }]);
    };

    const handleDeleteInput = (index) => {
        setInputs(inputs.filter((_, i) => i !== index));
    };

    const handleSymbolChange = (index, value) => {
        const element = ELEMENTS.find(el => el.symbol.toUpperCase() === value.toUpperCase());
        const mass = element ? element.mass : '';
        setInputs(inputs.map((input, i) => (i === index ? { ...input, symbol: value, mass } : input)));
    };

    const handleRatioChange = (index, value) => {
        const numericValue = value.replace(/[^\d.]/g, ''); // Allow only numbers and dots
        setInputs(inputs.map((input, i) => (i === index ? { ...input, ratio: numericValue } : input)));
    };

    const handleTotalMassChange = (e) => {
        setTotalMass(e.target.value);
    };

    const handleSheetTitleChange = (e) => {
        setSheetTitle(e.target.value);
    };

    const calculatePartialMassAndPercent = () => {
        const weights = inputs.map(input => {
            const ratio = parseFloat(input.ratio) || 0;
            return ratio * (parseFloat(input.mass) || 0);
        });
        const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
        return inputs.map((input, index) => {
            const weight = weights[index];
            const weightPercent = weightSum > 0 ? (weight / weightSum) * 100 : 0;
            const partialMass = weightPercent > 0 ? (weightPercent / 100) * (parseFloat(totalMass) || 0) : 0;
            return {
                ...input,
                weightPercent: weightPercent.toFixed(2),
                partialMass: weightPercent > 0 ? parseFloat(partialMass.toFixed(7)).toString() : '',
            };
        });
    };

    const exportToExcel = () => {
        const data = calculatePartialMassAndPercent().map((input, index) => ({
            Element: input.symbol,
            'Atomic Ratio': input.ratio,
            'Weight %': input.weightPercent,
            'Partial Mass': input.partialMass,
        }));

        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, sheetTitle); // Use the sheetTitle here
        writeFile(workbook, `${sheetTitle}.xlsx`); // Include sheetTitle in file name
    };


    const inputsWithMassAndPercent = calculatePartialMassAndPercent();

    const themeMode = createTheme({
        palette: {
            mode,
            background: {
                default: mode === 'dark' ? '#000000' : '#ffffff',
            },
            text: {
                primary: mode === 'dark' ? '#ffffff' : '#000000',
            },
            success: {
                main: '#4caf50',
                light: '#81c784',
                dark: '#388e3c',
                contrastText: '#ffffff',
            },
            error: {
                main: '#f44336',
                light: '#e57373',
                dark: '#d32f2f',
                contrastText: '#ffffff',
            },
            primary: {
                main: '#1976d2',
                dark: '#115293',
                contrastText: '#ffffff',
            },
        },
    });

    const toggleTheme = () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={themeMode}>
            <div style={{ backgroundColor: themeMode.palette.background.default, minHeight: '100vh' }}>
                <Header
                    theme={mode}
                    toggleTheme={toggleTheme}
                    pageTitle="Stoichiometry Calculator"
                    infoTooltip="Calculate the composition of a compound by entering element symbols, atomic ratios, and total mass. The tool provides weight percentages and partial masses, and you can export the results to Excel."
                />
                <Container sx={{ marginTop: 0 }}>
                    <Box sx={{ marginBottom: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 2,
                                backgroundColor: themeMode.palette.mode === 'light' ? '#f5f5f5' : '#424242',
                                padding: 2,
                                borderRadius: 1,
                                boxShadow: 1,
                            }}

                        >
                            <TextField
                                label="Excel Sheet Title"
                                variant="outlined"
                                fullWidth
                                value={sheetTitle}
                                onChange={handleSheetTitleChange}
                                sx={{
                                    maxWidth: 1000,
                                    '& .MuiInputBase-input': {
                                        color: themeMode.palette.text.primary,
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: mode === 'dark' ? '#333333' : '#ffffff',
                                    },
                                }}
                            />
                        </Box>
                        <TextField
                            label="Total Mass (g)"
                            variant="outlined"
                            fullWidth
                            value={totalMass}
                            onChange={handleTotalMassChange}
                            sx={{
                                maxWidth: 300,
                                '& .MuiInputBase-input': {
                                    color: themeMode.palette.text.primary,
                                },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: mode === 'dark' ? '#333333' : '#ffffff',
                                },
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                gap: 4,
                                whiteSpace: 'nowrap',
                                paddingBottom: 4,
                            }}
                        >
                            {inputsWithMassAndPercent.map((input, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        minWidth: isMobile ? '100%' : 300,
                                        backgroundColor: themeMode.palette.background.paper,
                                        borderRadius: 1,
                                        boxShadow: 1,
                                        padding: 2,
                                        position: 'relative',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <TextField
                                            label={`Element ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            value={input.symbol}
                                            onChange={(e) => handleSymbolChange(index, e.target.value)}
                                            sx={{
                                                flex: 1,
                                                maxWidth: 200,
                                                '& .MuiInputBase-input': {
                                                    color: themeMode.palette.text.primary,
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: mode === 'dark' ? '#333333' : '#ffffff',
                                                },
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => handleDeleteInput(index)}
                                            sx={{
                                                backgroundColor: themeMode.palette.error.light,
                                                color: themeMode.palette.error.contrastText,
                                                '&:hover': {
                                                    backgroundColor: themeMode.palette.error.main,
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                    {input.mass && (
                                        <Typography variant="body2" sx={{ marginTop: 1, color: themeMode.palette.text.primary }}>
                                            Atomic Mass: {input.mass}
                                        </Typography>
                                    )}
                                    <TextField
                                        label="Atomic Ratio"
                                        variant="outlined"
                                        fullWidth
                                        value={input.ratio}
                                        onChange={(e) => handleRatioChange(index, e.target.value)}
                                        sx={{
                                            flex: 1,
                                            maxWidth: 200,
                                            '& .MuiInputBase-input': {
                                                color: themeMode.palette.text.primary,
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: mode === 'dark' ? '#333333' : '#ffffff',
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ marginTop: 1, color: themeMode.palette.text.primary }}>
                                        Weight %: {input.weightPercent}%
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginTop: 1, color: 'secondary.main' }}>
                                        Partial Mass: {input.partialMass}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleAddInput}>
                                <AddIcon /> Add Element
                            </Button>
                            <Button variant="contained" color="success" onClick={exportToExcel}>
                                Export to Excel
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default StoichiometryCalculator;
