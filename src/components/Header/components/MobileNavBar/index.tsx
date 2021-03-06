import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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
            width: "180px",
            display: "flex",
            flexDirection: "column",
            fontSize: '1.3rem'
        },
        link: {
            textDecoration: "none",
            margin: theme.spacing(2)
        },
        linkText: {
            fontSize: '20px'
        },
    })
);


const MobileNavBar = (props: any) => {
    const classes = useStyles()

    return (
        <Toolbar>
            { localStorage.getItem('token') && (
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
            )}
            <Drawer open={props.drawerOpen} onClose={props.closeDrawer}>
                <nav className={classes.drawer}>
                    <List>
                        <ListItem color="inherit" alignItems="center" onClick={props.closeDrawer}>
                            <RouterLink to="/createlist" className={classes.link}>
                                <ListItemText primary="Create a list" classes={{ primary: classes.linkText }} />
                            </RouterLink>
                        </ListItem>
                        <ListItem color="inherit" alignItems="center" onClick={props.closeDrawer}>
                            <RouterLink to="/useritems" className={classes.link}>
                                <ListItemText primary="Edit Items" classes={{ primary: classes.linkText }} />
                            </RouterLink>
                        </ListItem>
                        <ListItem color="inherit" alignItems="center" onClick={props.closeDrawer}>
                            <RouterLink to="/mylists" className={classes.link}>
                                <ListItemText primary="My lists" classes={{ primary: classes.linkText }} />
                            </RouterLink>
                        </ListItem>
                    </List>
                </nav>
            </Drawer>
            <Typography variant="h1" className={classes.title} color="inherit">
                Shopping
            </Typography>
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

export default MobileNavBar;