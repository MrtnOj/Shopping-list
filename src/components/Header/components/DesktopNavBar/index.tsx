import React from 'react';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
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


const NavBar = (props: { logOut: () => void }) => {
    const classes = useStyles();

    return (
        <Toolbar>
            <Typography variant="h1" className={classes.title} color="inherit">
                Shopping
            </Typography>
            <Button color="inherit" component={RouterLink} to="/createlist" className={classes.links}>
                Create a list
            </Button>
            <Button color="inherit" component={RouterLink} to="/useritems" className={classes.links}>
                Edit items
            </Button>
            <Button color="inherit" component={RouterLink} to="/mylists" className={classes.links}>
                My lists
            </Button>
            {!localStorage.getItem('token')
                ?
                <Button color="secondary" variant="contained" component={RouterLink} to="/login">
                    Log In
                </Button>
                :
                <Button color="secondary" variant="contained" onClick={props.logOut}>
                    Log Out
                </Button> 
            }
        </Toolbar>
    )
}

export default NavBar;