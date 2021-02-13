import React from 'react';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
    
    return (
        <Toolbar>
            <Typography variant="h1" className={classes.title} color="inherit">
                Shopping
            </Typography>
            <Button color="inherit" href="#" className={classes.links}>
                Add items
            </Button>
            <Button color="inherit" href="#" className={classes.links}>
                Create a list
            </Button>
            <Button color="secondary" variant="contained">Log in</Button>
        </Toolbar>
    )
}

export default NavBar;