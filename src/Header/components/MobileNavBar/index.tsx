import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1,
            fontSize: "1.5rem"
        }
    })
);

const MobileNavBar = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        drawerOpen: false
    })
    const { drawerOpen } = state

    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
        <Toolbar>
            <IconButton 
                edge="start" 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="menu"
                aria-haspopup="true"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
            >
                
            </Drawer>
            <Typography 
                variant="h1" 
                className={classes.title} 
                color="inherit"
            >
                Shopping
            </Typography>
            <Button color="secondary" variant="contained">Login</Button>
        </Toolbar>
    )
}

export default MobileNavBar;