import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton, Tooltip, Menu, MenuItem, FormControlLabel, Switch } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Brightness7Icon from '@mui/icons-material/Brightness4';
import Brightness4Icon from '@mui/icons-material/Brightness7';
import { useRouter } from 'next/router';

const Header = ({ theme, toggleTheme, pageTitle, infoTooltip }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (page) => {
        setAnchorEl(null);
        if (page) {
            router.push(page);
        }
    };

    const currentPath = router.pathname;

    return (
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Toolbar>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => router.push('/')} aria-label="Home" sx={{ marginRight: 2 }}>
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h4" component="h1" sx={{ marginLeft: 1 }}>
                            {pageTitle}
                        </Typography>
                        <Tooltip title={infoTooltip} arrow>
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <IconButton 
                            onClick={handleMenuOpen} 
                            sx={{ 
                                borderRadius: 2, 
                                padding: 1, 
                                border: '1px solid',
                                borderColor: theme === 'light' ? '#98FF98' : 'grey.400', // Royal Blue
                                color: theme === 'light' ? '#98FF98' : 'inherit',
                                marginRight: 2 // Adjust margin between button and theme switch
                            }}
                        >
                            <Typography variant="body1">More Projects</Typography>
                        </IconButton>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={theme === 'dark'}
                                    onChange={toggleTheme}
                                    color="default"
                                    inputProps={{ 'aria-label': 'theme switch' }}
                                    icon={<Brightness4Icon sx={{ marginTop: '-2px', zIndex: 2 }} />}
                                    checkedIcon={<Brightness7Icon sx={{ marginTop: '-2px', zIndex: 2 }} />}
                                />
                            }
                            label=""
                            sx={{ margin: 0 }}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleMenuClose(null)}
                            PaperProps={{ 
                                style: { 
                                    borderRadius: 4, 
                                    border: '1px solid', 
                                    borderColor: theme === 'light' ? '#4169E1' : 'grey.400' 
                                } 
                            }}
                        >
                            {currentPath !== '/furnace-graph' && (
                                <MenuItem onClick={() => handleMenuClose('/furnace-graph')}>
                                    Furnace Graph Generator
                                </MenuItem>
                            )}
                            {currentPath !== '/stoichiometry-calculator' && (
                                <MenuItem onClick={() => handleMenuClose('/stoichiometry-calculator')}>
                                    Stoichiometry Calculator
                                </MenuItem>
                            )}
                        </Menu>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
