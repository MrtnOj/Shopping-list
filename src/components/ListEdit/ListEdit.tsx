import React, { useEffect } from 'react'
import useListEdit from './hooks/useListEdit'
import Alert from '../UI/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import AddItemDialog from '../ListView/components/AddItemDialog'
import CommentDialog from '../UI/CommentDialog'
import ListElement from '../UI/ListElement'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
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
        hiddenTitle: {
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
        },
        listItem: {
            flexGrow: 1,
            marginBottom: theme.spacing(1)
        },
        addButton: {
            position: 'sticky',
            marginTop: theme.spacing(3),
            left: '50\%',
            right: '50\%',
            bottom: theme.spacing(2),
            transform: 'translateX(-50\%)'
        },
        saveButton: {
            left: '50\%',
            right: '50\%',
            transform: 'translateX(-50\%)'
        },
        alert: {
            marginBottom: theme.spacing(9)
        }
    })
)

const ListEdit = (props: any) => {
    const classes = useStyles()

    const {
        items,
        categories,
        itemSearchOpen,
        itemAddModalOpen,
        itemAutocompleteValue,
        itemAddDialogValue,
        menuAnchorEl,
        commentDialogOpen,
        commentDialogValue,
        changedList,
        alertOpen,
        handleAlertClose,
        addCommentButtonClicked,
        handleCommentDialogValueChange,
        handleCommentDialogClose,
        deleteItemComment,
        saveItemComment,
        handleDotsClick,
        closeDotsMenu,
        getList,
        openItemSearch,
        itemAutocompleteValueChange,
        handleAddItemModalClose,
        dialogCategoryChange,
        dialogNameChange,
        listNameChange,
        filterOptions,
        getOptionLabel,
        addItemToList,
        removeListItem,
        saveList,
        addUserItem
    } = useListEdit()

    useEffect(() => {
        getList(props.match.params.listId)
    }, [props.match.params.listId])

    const listElements = changedList.items?.map(item => {
        return (
            <ListElement
                key={item.id}
                id={item.id}
                listItemId={item.list_item?.id}
                name={item.name}
                comment={item.list_item?.comment}
                deleteComment={deleteItemComment}
                menuAnchorEl={menuAnchorEl}
                closeDotsMenu={closeDotsMenu}
                removeListItem={removeListItem}
                addCommentButtonClicked={addCommentButtonClicked}
                handleDotsClick={handleDotsClick}
            />
        )
    })

    return (
        <Container component='article' maxWidth='sm' >
            <h1 className={classes.hiddenTitle}>{`Edit list - ${changedList.name}`}</h1>
            <TextField
                id="list-name"
                label="List name"
                type="text"
                value={changedList.name}
                onChange={listNameChange}
                className={classes.listNameInput}
                inputProps={{min: 0, style: { textAlign: 'center' }}}
                InputLabelProps={{ shrink: true }}
            />
            <Button 
                type='button' 
                color='inherit' 
                variant='contained' 
                size='small'
                className={classes.saveButton}
                startIcon={<SaveIcon />}
                onClick={() => {
                    saveList()
                    props.history.push('/mylists/use/' + props.match.params.listId)
                }}
            >
                Save & shop
            </Button>
            <List>
                {listElements}
            </List>
            <Fab
                color='secondary'
                aria-label='add-items-to-list'
                className={classes.addButton}
                onClick={openItemSearch}
            >
                <AddIcon />
            </Fab>
            <Snackbar open={alertOpen} autoHideDuration={9000} onClose={handleAlertClose} className={classes.alert}>
                <Alert onClose={handleAlertClose} severity='error'>
                    This item is already in the list
                </Alert>
            </Snackbar>
            <AddItemDialog 
                addItemToList={addItemToList}
                addItem={addUserItem}
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
            <CommentDialog
                dialogOpen={commentDialogOpen}
                dialogClose={handleCommentDialogClose}
                saveComment={saveItemComment}
                valueChange={handleCommentDialogValueChange}
                value={commentDialogValue}
            />
        </Container>
    )
}

export default ListEdit