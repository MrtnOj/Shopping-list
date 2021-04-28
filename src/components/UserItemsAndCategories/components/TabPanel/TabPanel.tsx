import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    content: any;
    deleteElement?: any;
    isItem?: boolean;
    editElement?: any;
    addButtonPressed?: any;
  }

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
        }
    })
)

const TabPanel = (props: TabPanelProps) => {
    const classes = useStyles()
    const { 
        children,
        value,
        index,
        content,
        deleteElement,
        isItem,
        editElement,
        addButtonPressed,
        ...other
    } = props

    return (
        <article 
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <React.Fragment>
                    <List className={classes.itemsList}>
                        {content.map((element: any) => {
                            return (
                                <ListItem
                                    key={element.id}
                                    className={classes.listItem}
                                    divider={true}
                                >
                                    <ListItemText primary={element.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge='end'
                                            size='small'
                                            color='inherit'
                                            className={classes.iconButtons}
                                            onClick={() => editElement(element)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge='end'
                                            size='small'
                                            color='inherit'
                                            className={classes.iconButtons}
                                            onClick={() => deleteElement(element.id, isItem)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Fab color='secondary' aria-label={`add-${isItem ? 'item' : 'category'}`} className={classes.addButton} onClick={addButtonPressed}>
                        <AddIcon />
                    </Fab>
                </React.Fragment>
            ) }
        </article>

    )
}

export default TabPanel