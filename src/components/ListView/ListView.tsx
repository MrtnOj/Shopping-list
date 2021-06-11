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
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import RestoreIcon from '@material-ui/icons/Restore'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import AddItemDialog from './components/AddItemDialog'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            marginBottom: '1.5rem',
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
        editButton: {
            
        },
        actionsSection: {
            boxSizing: 'border-box',
            position: 'sticky',
            width: 'inherit',
            marginTop: theme.spacing(2),
            bottom: theme.spacing(1),
            display: 'flex',
            zIndex: 10,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between'
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
            <Container component='article' maxWidth='sm' className={classes.container}>
                <h1 className={classes.hiddenTitle}>{`Shopping ${listData.name}`}</h1>
                <Paper 
                    className={classes.listPaper} 
                    elevation={3} 
                    component='section' 
                >
                    <Typography variant='h4' component='h2' className={classes.articleTitle} color='primary' align='center'>
                        {listData.name}
                    </Typography>
                    <List>
                        {listElements}
                    </List>
                    <List className={classes.pickedList}>
                        {pickedListItems.reverse()}
                    </List>
                </Paper>
                <section className={classes.actionsSection}>
                    <Button 
                        type='button'
                        color='primary'
                        variant='contained'
                        className={classes.editButton}
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                    <Fab color='secondary' aria-label='add-items-to-list' className={classes.addButton} onClick={openItemSearch}>
                        <AddIcon />
                    </Fab>
                </section>
            </Container>
            <ListCompleteDialog open={finishModalOpen} handleClose={handleFinishModalClose} handleFinished={listPickingFinished} />
            {/* <Fab color='secondary' aria-label='add-items-to-list' className={classes.addButton} onClick={openItemSearch}>
                <AddIcon />
            </Fab> */}
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