import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Fade from '@material-ui/core/Fade'
import { createStyles, DialogContentText, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { isIterationStatement } from 'typescript'

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemsList: {

        },
        listItem: {
            marginBottom: '0.5rem'
        },
        iconButtons: {
            marginLeft: theme.spacing(2)
        },
        addButton: {
            position: 'fixed',
            left: '50\%',
            right: '50\%',
            bottom: theme.spacing(2),
            transform: 'translateX(-50\%)'
        },
        hiddenTitle: {
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
        },
    })
)

const TabPanel = (props: any) => {
    const classes = useStyles()

    return (
        <section 
            role='tabpanel'
            hidden={props.value !== props.index}
            id={`${props.name} Tab`}
            aria-labelledby={props.name}
            {...props.other}
        >
            {props.value === props.index && (
                <React.Fragment>
                    <h2 className={classes.hiddenTitle}>{props.name}</h2>
                    <List className={classes.itemsList}>
                        {props.content.map((element: any) => {
                            return (
                                <ListItem
                                    key={element.id}
                                    className={classes.listItem}
                                    divider={true}
                                >
                                    <ListItemText primary={element.name} />
                                    <Menu
                                        id="item-actions-menu"
                                        anchorEl={props.menuAnchorEl}
                                        keepMounted
                                        open={Boolean(props.menuAnchorEl)}
                                        onClose={props.closeDotsMenu}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={props.editElement}>Edit</MenuItem>
                                        <MenuItem onClick={() => props.deleteButtonPressed(element)}>Delete</MenuItem>
                                    </Menu>
                                    <ListItemSecondaryAction>
                                        <IconButton 
                                            aria-controls='item-actions-menu'
                                            aria-haspopup='true'
                                            edge='end'
                                            size='small'
                                            color='inherit'
                                            onClick={(event) => props.handleDotsClick(event, element)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Dialog open={props.deleteModalOpen} onClose={props.deleteModalClose}>
                        <DialogTitle id="confirm-delete">
                            Delete item?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {`Are you sure you want to delete ${props.isItem ? 'item ' : 'category '} - ${props.elementToDelete ? props.elementToDelete.name : null} ?`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={props.deleteModalClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => props.deleteElement(props.isItem)}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Fab color='secondary' aria-label={`add-${props.isItem ? 'item' : 'category'}`} className={classes.addButton} onClick={() => props.addButtonPressed(props.isItem)}>
                        <AddIcon />
                    </Fab>
                </React.Fragment>
            ) }
        </section>

    )
}

export default TabPanel