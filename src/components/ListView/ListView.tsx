import React, { useEffect, useRef } from 'react'
import useListView from './hooks/useListView'
import ListCompleteDialog from './components/ListCompleteDialog'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import RestoreIcon from '@material-ui/icons/Restore'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import AddItemDialog from './components/AddItemDialog'

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
            marginTop: theme.spacing(10),
            padding: theme.spacing(3),
            width: '100%'
        },
        pickedList: {
            marginTop: theme.spacing(4),
        },
        listItem: {
            flexGrow: 1
        },
        pickedListItem: {
            textDecoration: 'line-through'
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

const ListView = (props: any) => {
    const classes = useStyles()
    const { 
        listData,
        items,
        itemAddDialogValue,
        itemAddModalOpen,
        autocompleteValue,
        listItems,
        pickedList,
        finishModalOpen,
        itemSearchOpen,
        addItemTolist,
        handleFinishModalClose,
        handleAddItemModalClose,
        handleItemSearchClose,
        openItemSearch,
        dialogNameChange,
        dialogCategoryChange,
        itemCheckUndo,
        getOptionLabel,
        itemCheckClicked,
        getList,
        autoCompleteValueChange,
        filterOptions
    } = useListView()

    useEffect(() => {
        getList(props.match.params.listId)
    }, [props.match.params.listId])

    const listElements = listItems.map(item => {
        return (
            <ListItem key={item.id} className={classes.listItem} divider={true}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton edge='end' size='small' color='secondary' onClick={() => itemCheckClicked(item.id)}>
                        <CheckIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    })

    const pickedListItems = pickedList.map(item => {
        return (
            <ListItem key={item.id} className={classes.pickedListItem} divider={true}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton edge='end' size='small' color='inherit' onClick={() => itemCheckUndo(item.id)}>
                        <RestoreIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    })

    return (
        <React.Fragment>
            <Container component='article' maxWidth='sm'>
                {/* <Typography variant='h1' className={classes.articleTitle} color='primary' align='center'>
                    List {props.match.params.listId}
                </Typography> */}
                <Paper 
                    className={classes.listPaper} 
                    elevation={3} 
                    component='div' 
                >
                    <List>
                        {listElements}
                    </List>
                    <List className={classes.pickedList}>
                        {pickedListItems}
                    </List>
                </Paper>
            </Container>
            <ListCompleteDialog open={finishModalOpen} handleClose={handleFinishModalClose} />
            <Fab color='secondary' aria-label='add-items-to-list' className={classes.addButton} onClick={openItemSearch}>
                <AddIcon />
            </Fab>
            <AddItemDialog 
                addItem={addItemTolist}
                openItemSearch={openItemSearch}
                itemSearchOpen={itemSearchOpen}
                handleItemSearchClose={handleItemSearchClose}
                autocompleteValue={autocompleteValue}
                autoCompleteValueChange={autoCompleteValueChange}
                filterOptions={filterOptions}
                options={items}
                getOptionLabel={getOptionLabel}
                dialogOpen={itemAddModalOpen}
                dialogClose={handleAddItemModalClose}
                dialogValues={itemAddDialogValue}
                dialogNameChange={dialogNameChange}
                dialogCategoryChange={dialogCategoryChange}
            />
        </React.Fragment>
    )
}

export default ListView