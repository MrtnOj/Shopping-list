import React from 'react'
import ListElement from '../../../UI/ListElement'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
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
        listPaper: {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3) ,
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
        },
        listItemText: {
            flexGrow: 'unset',
            marginRight: theme.spacing(1)
        }
    })
)

const ListPaper = (props: any) => {
    const classes = useStyles()

    // const pickedList = props.list.items.map((item: any) => {
    //     return (
    //         <ListItem key={item.id} divider={true} >
    //             <ListItemText primary={item.name} className={classes.listItemText} />
    //             {item.comment
    //                 ? <Chip label={item.comment} variant='outlined' size='small' onDelete={() => props.deleteComment(item.id)}/>
    //                 : null
    //             }
    //             <Menu
    //                 id="item-actions-menu"
    //                 anchorEl={props.menuAnchorEl}
    //                 keepMounted
    //                 open={Boolean(props.menuAnchorEl)}
    //                 onClose={props.closeDotsMenu}
    //                 TransitionComponent={Fade}
    //             >
    //                 <MenuItem onClick={() => props.removeListItem((item.id))}>Remove</MenuItem>
    //                 <MenuItem onClick={() => props.addCommentButtonClicked(item.id)}>Add comment</MenuItem>
    //             </Menu>
    //             <ListItemSecondaryAction>
    //                 <IconButton 
    //                     aria-controls='item-actions-menu'
    //                     aria-haspopup='true'
    //                     edge='end'
    //                     size='small'
    //                     color='inherit'
    //                     onClick={props.handleDotsClick}
    //                 >
    //                     <MoreVertIcon />
    //                 </IconButton>
    //             </ListItemSecondaryAction>
    //         </ListItem>
    //     )
    // })

    return (
        <Paper  className={classes.listPaper} elevation={3} component='section'>
            <List className={classes.list}>
                {/* {pickedList} */}
                {props.list.items.map((item: any) => {
                    <ListElement
                        id={item.id}
                        name={item.name}
                        comment={item.comment}
                        deleteComment={props.deleteComment}
                        menuAnchorEl={props.menuAnchorEl}
                        closeDotsMenu={props.closeDotsMenu}
                        removeListItem={props.removeListItem}
                        addCommentButtonClicked={props.addCommentButtonClicked}
                        handleDotsClick={props.handleDotsClick}
                    />
                })}
            </List>
            {props.widescreen && props.saveButton}
        </Paper>
    )
}

export default ListPaper