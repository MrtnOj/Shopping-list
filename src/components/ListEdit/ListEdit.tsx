import React, { useEffect } from 'react'
import useListEdit from './hooks/useListEdit'
import AddItemDialog from '../ListView/components/AddItemDialog'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listNameInput: {
            width: '80%',
            left: '10%',
            right: '10%',
            marginTop: '100px',
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 30,

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
        listItem: {
            flexGrow: 1,
            marginBottom: theme.spacing(1)
        },
        addButton: {
            position: 'fixed',
            right: theme.spacing(2),
            bottom: theme.spacing(2)
        },
    })
)

const ListEdit = (props: any) => {
    const classes = useStyles()

    const {
        listData,
        listItems,
        items,
        categories,
        itemSearchOpen,
        itemAddModalOpen,
        itemAutocompleteValue,
        itemAddDialogValue,
        getList,
        openItemSearch,
        itemAutocompleteValueChange,
        handleAddItemModalClose,
        dialogCategoryChange,
        dialogNameChange,
        filterOptions,
        getOptionLabel,
        addItemToList,
        removeListItem,
    } = useListEdit()

    useEffect(() => {
        getList(props.match.params.listId)
    }, [props.match.params.listId])

    const listElements = listData.items?.map(item => {
        return (
            <ListItem key={item.id} className={classes.listItem} divider={true}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton edge='end' size='small' onClick={() => removeListItem(item.id!)}>
                        <RemoveCircle />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    })

    return (
        <Container component='article' maxWidth='sm'>
                <TextField
                    id="list-name"
                    label="List name"
                    type="text"
                    value={listData.name}
                    className={classes.listNameInput}
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    InputLabelProps={{ shrink: true }}
                />
                <List>
                    {listElements}
                </List>
                <Fab color='primary' aria-label='add-items-to-list' className={classes.addButton} onClick={openItemSearch}>
                    <AddIcon />
                </Fab>
                <AddItemDialog 
                    addItem={addItemToList}
                    openItemSearch={openItemSearch}
                    itemSearchOpen={itemSearchOpen}
                    handleItemSearchClose={handleAddItemModalClose}
                    itemAutocompleteValue={itemAutocompleteValue}
                    categoryAutocompleteValue={itemAddDialogValue.category}
                    autoCompleteValueChange={itemAutocompleteValueChange}
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
        </Container>
    )
}

export default ListEdit