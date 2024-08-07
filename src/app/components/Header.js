import React from 'react';
import { AppBar, Toolbar, Typography, Container, Switch, IconButton, Tooltip, FormControlLabel } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Brightness7Icon from '@mui/icons-material/Brightness4';
import Brightness4Icon from '@mui/icons-material/Brightness7';

const Header = ({ theme, toggleTheme }) => {
    return (
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Toolbar>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4" component="h1" sx={{ marginRight: 1 }}>
                            Furnace Graph Generator
                        </Typography>
                        <Tooltip title="This website helps you design furnace plans that you can print. Input temperatures and durations to create points on the graph. To remove a point, simply click on it." arrow>
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
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
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
