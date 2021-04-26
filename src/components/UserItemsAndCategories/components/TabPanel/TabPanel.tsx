import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    content: any;
    deleteElement?: any
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemsList: {

        },
        listItem: {

        },
        iconButtons: {
            marginLeft: theme.spacing(2)
        }
    })
)

const TabPanel = (props: TabPanelProps) => {
    const classes = useStyles()
    const { children, value, index, content, deleteElement, ...other } = props

    return (
        <article 
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <List className={classes.itemsList}>
                    {content.map((item: any) => {
                        return (
                            <ListItem
                                key={item.id}
                                className={classes.listItem}
                                divider={true}
                            >
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge='end'
                                        size='small'
                                        color='inherit'
                                        className={classes.iconButtons}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge='end'
                                        size='small'
                                        color='inherit'
                                        className={classes.iconButtons}
                                        onClick={() => deleteElement(item.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            ) }
        </article>

    )
}

export default TabPanel