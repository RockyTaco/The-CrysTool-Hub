import React, { useState, useEffect, useRef } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Header from '../app/components/Header'; // Update the path
import InputForm from '../app/components/InputForm'; // Update the path
import Graph from '../app/components/Graph'; // Update the path

const FurnaceGraphPage = () => {
    const [data, setData] = useState([{ time: 0, temperature: 0 }]);
    const [cumulativeTime, setCumulativeTime] = useState(0);
    const [prevTemperature, setPrevTemperature] = useState(0);
    const [graphTitle, setGraphTitle] = useState('Graph Title');
    const [theme, setTheme] = useState('light');
    const timeInputRef = useRef(null);

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

    const handleThemeChange = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        if (data.length > 1) {
            const maxTimeDataPoint = data.reduce((prev, current) => (prev.time > current.time ? prev : current));
            setPrevTemperature(maxTimeDataPoint.temperature);
        } else {
            setPrevTemperature(0);
        }
    }, [data]);

    const addData = (newData) => {
        const updatedData = {
            ...newData,
            time: cumulativeTime + newData.time
        };
        setData(prevData => [...prevData, updatedData]);
        setCumulativeTime(updatedData.time);
    };

    const removeData = (index) => {
        setData(prevData => {
            const newData = prevData.filter((_, i) => i !== index);
            const newCumulativeTime = newData.reduce((acc, cur) => acc + cur.time, 0);
            setCumulativeTime(newCumulativeTime);
            return newData;
        });
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Header
                theme={theme}
                toggleTheme={handleThemeChange}
                pageTitle="Furnace Graph Generator"
                infoTooltip="This tool helps you design furnace plans by plotting temperature versus time. Input temperatures and durations to create points on the graph. Click on a point to remove it."
            />
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
                    zIndex: -1,
                    overflow: 'hidden',
                }}
            />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    padding: 2,
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            border: '2px solid',
                            borderColor: theme === 'light' ? 'grey.300' : 'grey.700',
                            borderRadius: 2,
                            padding: 2,
                            backgroundColor: 'background.paper',
                            flexShrink: 0,
                        }}
                    >
                        <InputForm addData={addData} prevTemperature={prevTemperature} ref={timeInputRef} />
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid',
                            borderColor: theme === 'light' ? 'grey.300' : 'grey.700',
                            borderRadius: 2,
                            padding: 2,
                            marginTop: 1,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Graph data={data} removeData={removeData} title={graphTitle} theme={theme} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default FurnaceGraphPage;