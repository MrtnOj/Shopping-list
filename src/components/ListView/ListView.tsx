import React, { useEffect } from 'react'
import useListView from './hooks/useListView'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check';
import RestoreIcon from '@material-ui/icons/Restore';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '100px 10px 20px 10px'
        },
        listPaper: {
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-evenly',
            marginTop: theme.spacing(4),
            padding: theme.spacing(3),
            width: '100%'
        },
        listItem: {
            flexGrow: 1
        },
        pickedListItem: {
            textDecoration: 'line-through'
        }
    })
)

const ListView = (props: any) => {
    const classes = useStyles()
    const { listData, listItems, pickedList, itemCheckUndo, itemCheckClicked, getList } = useListView()

    useEffect(() => {
        getList(props.match.params.listId)
    }, [props.match.params.listId])

    const listElements = listItems.map(item => {
        return (
            <React.Fragment>
                <ListItem key={item.id} className={classes.listItem} divider={true}>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' size='small' color='secondary' onClick={() => itemCheckClicked(item.id)}>
                            <CheckIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </React.Fragment>
        )
    })

    const pickedListItems = pickedList.map(item => {
        return (
            <React.Fragment>
                <ListItem key={item.id} className={classes.pickedListItem} divider={true}>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' size='small' color='inherit' onClick={() => itemCheckUndo(item.id)}>
                            <RestoreIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </React.Fragment>
        )
    })


    
    return (
        <Container component='article' maxWidth='sm'>
            <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                List {props.match.params.listId}
            </Typography>
            <Paper 
                className={classes.listPaper} 
                elevation={3} 
                component='div' 
            >
                <List>
                    {listElements}
                </List>
            </Paper>
            <Paper 
                className={classes.listPaper} 
                elevation={3} 
                component='div' 
            >
                <List>
                    {pickedListItems}
                </List>
            </Paper>
        </Container>
    )
}

export default ListView