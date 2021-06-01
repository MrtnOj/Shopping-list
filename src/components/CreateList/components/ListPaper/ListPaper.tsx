import React from 'react'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Fade from '@material-ui/core/Fade'
import { createStyles, makeStyles, Theme, useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listPaper: {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3),
            width: '100%',
            minHeight: '350px'
        },
        list: {
            marginBottom: '4rem'
        },
        saveButton: {
            position: 'fixed',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)'
        },
        wideScreenSaveButton: {
            position: 'absolute',
            width: '12rem',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)'
        }
    })
)

const ListPaper = (props: any) => {
    const classes = useStyles()

    const pickedList = props.list.items.map((item: any) => {
        return (
            <ListItem key={item.id} divider={true}>
                <ListItemText primary={item.name} />
                <Menu
                    id="item-actions-menu"
                    anchorEl={props.menuAnchorEl}
                    keepMounted
                    open={Boolean(props.menuAnchorEl)}
                    onClose={props.closeDotsMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => props.removeListItem((item.id))}>Remove</MenuItem>
                    <MenuItem onClick={props.closeDotsMenu}>Add comment</MenuItem>
                </Menu>
                <ListItemSecondaryAction>
                    <IconButton 
                        aria-controls='item-actions-menu'
                        aria-haspopup='true'
                        edge='end'
                        size='small'
                        color='inherit'
                        onClick={props.handleDotsClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    })

    return (
        <Paper  className={classes.listPaper} elevation={3} component='section'>
            <List className={classes.list}>
                {pickedList}
            </List>
            {props.widescreen && props.saveButton}
        </Paper>
    )
}

export default ListPaper