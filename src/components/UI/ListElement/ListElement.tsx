import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItemText: {
            flexGrow: 'unset',
            marginRight: theme.spacing(1)
        }
    })
)

const ListElement = (props: any) => {
    const classes = useStyles()

    return (
        <ListItem divider={true} >
            <ListItemText primary={props.name} className={classes.listItemText} />
            {props.comment
                ? <Chip label={props.comment} variant='outlined' size='small' onDelete={() => props.deleteComment(props.id)}/>
                : null
            }
            <Menu
                id="item-actions-menu"
                anchorEl={props.menuAnchorEl}
                keepMounted
                open={Boolean(props.menuAnchorEl)}
                onClose={props.closeDotsMenu}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={props.removeListItem}>Remove</MenuItem>
                <MenuItem onClick={props.addCommentButtonClicked}>Add comment</MenuItem>
            </Menu>
            <ListItemSecondaryAction>
                <IconButton 
                    aria-controls='item-actions-menu'
                    aria-haspopup='true'
                    edge='end'
                    size='small'
                    color='inherit'
                    onClick={(event) => props.handleDotsClick(event, props.id)}
                >
                    <MoreVertIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ListElement