import React, { useEffect } from 'react'
import { Redirect } from 'react-router'
import useListView from './hooks/useListView'
import ListCompleteDialog from './components/ListCompleteDialog'
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import RestoreIcon from '@material-ui/icons/Restore'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import AddItemDialog from './components/AddItemDialog'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {

        },
        listPaper: {
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-evenly',
            padding: theme.spacing(3),
            width: '100%'
        },
        pickedList: {
            marginTop: theme.spacing(4),
        },
        listItem: {
            flexGrow: 1
        },
        pickedListItemText: {
            textDecoration: 'line-through',
            flexGrow: 'unset',
            marginRight: theme.spacing(1)
        },
        hiddenTitle: {
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
        },
        addButton: {
            position: 'sticky',
            marginTop: theme.spacing(-3),
            left: '50\%',
            right: '50\%',
            bottom: theme.spacing(2),
            transform: 'translateX(-50\%)'
        },
        listItemText: {
            flexGrow: 'unset',
            marginRight: theme.spacing(1)
        },
        container: {
            height: '100%',
            position: 'relative',
            top: 0,
            paddingTop: theme.spacing(10)
        },
        listHeader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing(2)
        }
    })
)

const ListView = (props: any) => {
    const classes = useStyles()
    const { 
        listData,
        items,
        categories,
        itemAddDialogValue,
        itemAddModalOpen,
        itemAutocompleteValue,
        listItems,
        pickedList,
        finishModalOpen,
        itemSearchOpen,
        finishedRedirect,
        addItemTolist,
        handleFinishModalClose,
        handleAddItemModalClose,
        openItemSearch,
        dialogNameChange,
        dialogCategoryChange,
        itemCheckUndo,
        getOptionLabel,
        itemCheckClicked,
        getList,
        itemAutoCompleteValueChange,
        filterOptions,
        listPickingFinished
    } = useListView()

    useEffect(() => {
        getList(props.match.params.listId)
    }, [props.match.params.listId])

    const listElements = listItems.map(item => {
        return (
            <ListItem key={item.id} className={classes.listItem} divider={true}>
                <ListItemText primary={item.name} className={classes.listItemText} />
                {item.list_item.comment
                    ? <Chip label={item.list_item.comment} size='small' />
                    : null
                }
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
            <ListItem key={item.id} divider={true}>
                <ListItemText primary={item.name} className={classes.pickedListItemText}/>
                {item.list_item.comment
                    ? <Chip label={item.list_item.comment} size='small' />
                    : null
                }
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
            {finishedRedirect ? <Redirect to='/createlist' /> : null}
            <Container component='div' maxWidth='sm' className={classes.container}>
                <h1 className={classes.hiddenTitle}>{`Shopping page - ${listData.name}`}</h1>
                <Paper 
                    className={classes.listPaper} 
                    elevation={3} 
                    component='article' 
                >
                    <header className={classes.listHeader}>
                        <Typography variant='h4' component='h1' className={classes.articleTitle} color='primary' align='center'>
                            {listData.name}
                        </Typography>
                        <IconButton 
                            edge='end'
                            color='inherit'
                            onClick={() => props.history.push('/mylists/edit/' + props.match.params.listId)}
                        >
                            <EditIcon />
                        </IconButton>
                    </header>
                    <List>
                        {listElements}
                    </List>
                    <List className={classes.pickedList}>
                        {pickedListItems.reverse()}
                    </List>
                </Paper>
            </Container>
            <ListCompleteDialog open={finishModalOpen} handleClose={handleFinishModalClose} handleFinished={listPickingFinished} />
            <Fab color='secondary' aria-label='add-items-to-list' className={classes.addButton} onClick={openItemSearch}>
                <AddIcon />
            </Fab>
            <AddItemDialog 
                addItem={addItemTolist}
                addUserItem={addItemTolist}
                openItemSearch={openItemSearch}
                itemSearchOpen={itemSearchOpen}
                handleItemSearchClose={handleAddItemModalClose}
                itemAutocompleteValue={itemAutocompleteValue}
                categoryAutocompleteValue={itemAddDialogValue.category}
                autoCompleteValueChange={itemAutoCompleteValueChange}
                filterOptions={filterOptions}
                itemOptions={items}
                categoryOptions={categories}
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