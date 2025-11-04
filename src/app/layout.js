// src/app/layout.js
'use client'; // Mark this file as a client component

import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Inter } from 'next/font/google';
import LoadingPage from './components/LoadingPage'; // Adjust path as needed

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({ children }) {
  // Determine theme based on local storage or default to light
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <html lang="en">
        <body className={inter.className} style={{ margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
