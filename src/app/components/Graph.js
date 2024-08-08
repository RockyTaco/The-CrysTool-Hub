import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const Graph = ({ data, removeData, title, theme }) => {
    const [graphTitle, setGraphTitle] = useState(title);
    const [startTime, setStartTime] = useState(moment().format('YYYY-MM-DD HH:mm'));
    const [endTime, setEndTime] = useState('');
    const chartRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStartTime(moment().format('YYYY-MM-DD HH:mm'));
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const lastTime = data[data.length - 1].time;
            const endMoment = moment().add(lastTime, 'hours');
            setEndTime(endMoment.format('YYYY-MM-DD HH:mm'));
        }
    }, [data]);

    const midpoints = data.flatMap((point, index) => {
        if (index < data.length - 1) {
            const nextPoint = data[index + 1];
            const timeDiff = nextPoint.time - point.time;
            const tempDiff = nextPoint.temperature - point.temperature;
            const rate = (tempDiff / timeDiff).toFixed(2);

            return [
                {
                    x: (point.time + (nextPoint.time - point.time) / 2),
                    y: (point.temperature + nextPoint.temperature) / 2,
                    label: `Duration: ${timeDiff.toFixed(2)} hours\nRate: ${rate} °C/hour`,
                }
            ];
        }
        return [];
    });

    const chartData = {
        datasets: [
            {
                label: 'Temperature vs Time',
                data: data.map((entry) => ({ x: entry.time, y: entry.temperature })),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: false,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Invisible Midpoints',
                data: midpoints,
                pointRadius: 0,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                datalabels: {
                    display: true,
                    align: 'center',
                    anchor: 'center',
                    color: theme === 'dark' ? '#fff' : '#000',
                    font: {
                        size: 12,
                        family: 'Arial',
                    },
                    formatter: (value) => value.label,
                },
            },
        ],
    };

    const handleClick = (event) => {
        const chart = event.chart;
        const { offsetX, offsetY } = event.native;
        const elements = chart.getElementsAtEventForMode(
            { offsetX, offsetY },
            'nearest',
            { intersect: true },
            true
        );

        if (elements.length > 0) {
            const index = elements[0].index;
            removeData(index);
        }
    };

    const handlePrint = () => {
        if (chartRef.current) {
            const canvas = chartRef.current.canvas;
            const imageData = canvas.toDataURL('image/png');

            const printWindow = window.open('', '', 'width=800,height=600');
            if (printWindow) {
                printWindow.document.open();
                printWindow.document.write(`
                    <html>
                        <head>
                            <style>
                                @media print {
                                    body {
                                        margin: 0;
                                        padding: 0;
                                        overflow: hidden;
                                        background: #fff;
                                    }
                                    .container {
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                        height: 100vh;
                                        width: 100vw;
                                    }
                                    img {
                                        width: 100%;
                                        height: auto;
                                    }
                                    .time-info {
                                        margin-top: 1rem;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <img src="${imageData}" alt="Graph" onload="window.print(); window.close();"/>
                                <div class="time-info">
                                    <p>Start Time: ${startTime}</p>
                                    <p>End Time: ${endTime}</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `);
                printWindow.document.close();
            } else {
                console.error('Failed to open print window');
            }
        } else {
            console.error('Chart reference is not defined');
        }
    };

    useEffect(() => {
        const resizeHandler = () => {
            if (chartRef.current?.chart) {
                chartRef.current.chart.resize();
            }
        };

        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const axisColor = theme === 'dark' ? '#fff' : '#555';

    const chartOptions = {
        onClick: handleClick,
        plugins: {
            title: {
                display: true,
                text: graphTitle,
                font: {
                    size: 20,
                    color: axisColor,
                },
            },
            tooltip: {
                callbacks: {
                    title: () => '',
                    label: (tooltipItem) => {
                        const { raw } = tooltipItem;
                        return `Time: ${raw.x}, Temperature: ${raw.y}`;
                    },
                },
            },
            datalabels: {
                display: false,
            },
            legend: {
                labels: {
                    filter: (legendItem) => {
                        return legendItem.text !== 'Invisible Midpoints';
                    }
                }
            },
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                grid: {
                    color: 'rgba(128,128,128,0.5)',
                },
                ticks: {
                    color: axisColor,
                },
                title: {
                    display: true,
                    text: 'Time (hours)',
                    color: axisColor,
                    font: {
                        size: 16,
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(128,128,128,0.5)',
                },
                ticks: {
                    color: axisColor,
                },
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: axisColor,
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    return (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', width: '100%', position: 'relative' }}>
            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 10 }}>
                <input
                    type="text"
                    value={graphTitle}
                    onChange={(e) => setGraphTitle(e.target.value)}
                    style={{
                        fontSize: '1.5rem',
                        padding: '0.5rem',
                        border: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
                        borderRadius: '4px',
                        textAlign: 'center',
                        backgroundColor: theme === 'dark' ? '#333' : '#fff',
                        color: theme === 'dark' ? '#fff' : '#000',
                        zIndex: 10,
                        position: 'relative',
                    }}
                />
                <button onClick={handlePrint} style={{
                    fontSize: '1.5rem',
                    padding: '0.5rem',
                    border: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: theme === 'dark' ? '#555' : '#f0f0f0',
                    color: theme === 'dark' ? '#fff' : '#000',
                    zIndex: 20,
                    position: 'relative',
                }}>
                    Print
                </button>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '100%', height: '80%' }}>
                    <Line
                        ref={chartRef}
                        data={chartData}
                        options={chartOptions}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        padding: '0.3rem',
                        color: axisColor,
                        backgroundColor: theme === 'dark' ? '#000' : '#fff',
                        zIndex: 5,
                        fontSize: '0.9rem',
                        textAlign: 'left',
                    }}>
                        <p>Start Time: {startTime}</p>
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        padding: '0.3rem',
                        color: axisColor,
                        backgroundColor: theme === 'dark' ? '#000' : '#fff',
                        zIndex: 5,
                        fontSize: '0.9rem',
                        textAlign: 'right',
                    }}>
                        <p>End Time: {endTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graph;
