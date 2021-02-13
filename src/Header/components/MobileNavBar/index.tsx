import React from 'react';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1,
            fontSize: "1.5rem"
        },
        drawer: {
            width: "160px",
            display: "flex",
            flexDirection: "column"
        }
    })
);

interface Props { 
    drawerOpen: boolean,
    openDrawer(event: React.MouseEvent<HTMLButtonElement>): void,
    closeDrawer(event: React.MouseEvent<HTMLButtonElement>): void
}

const MobileNavBar = (props: Props) => {
    const classes = useStyles();

    return (
        <Toolbar>
            <IconButton 
                edge="start" 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="menu"
                aria-haspopup="true"
                onClick={props.openDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={props.drawerOpen} onClose={props.closeDrawer}>
                <nav className={classes.drawer}>
                    <Link variant="body2" color="inherit" href="#">Add items</Link>
                    <Link variant="body2" color="inherit" href="#">Create a list</Link>
                </nav>
            </Drawer>
            <Typography variant="h1" className={classes.title} color="inherit">
                Shopping
            </Typography>
            <Button color="secondary" variant="contained">Log in</Button>
        </Toolbar>
    )
}

export default MobileNavBar;