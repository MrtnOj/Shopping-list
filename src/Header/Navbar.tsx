import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
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
            fontSize: "2rem"
        },
        links: {
            marginRight: theme.spacing(2)
        }
    })
);


const NavBar = (props: any) => {
    const classes = useStyles();

    const [state, setState] = useState({
        mobileView: false
    })
    const { mobileView } = state;
    
    return (
        <AppBar color='primary' position='fixed'>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h1" className={classes.title} color="inherit">
                    Shoppinglist
                </Typography>
                <Button color="inherit" href="#" className={classes.links}>
                    Add items
                </Button>
                <Button color="inherit" href="#" className={classes.links}>
                    Create a list
                </Button>
                <Button color="secondary" variant="contained">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;