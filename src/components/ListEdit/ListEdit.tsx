import React, { useEffect } from 'react'
import useListEdit from './hooks/useListEdit'
import AddItemDialog from '../ListView/components/AddItemDialog'
import CommentDialog from '../UI/CommentDialog'
import ListElement from '../UI/ListElement'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
        actionsSection: {
            position: 'absolute',
            width: '100%',
            height: 40,
            right: 0,
            bottom: 15,
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between'

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
            marginLeft: theme.spacing(2)
        },
        saveButton: {
            marginRight: theme.spacing(2)
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
            <List>
                {listElements}
            </List>
            <section className={classes.actionsSection}>
                <Button 
                    type='button'
                    color='primary'
                    variant='contained'
                    size='small'
                    className={classes.addButton}
                    onClick={openItemSearch}
                >
                    Add items
                </Button>
                <Button 
                    type='button' 
                    color='secondary' 
                    variant='contained' 
                    size='small'
                    className={classes.saveButton}
                    onClick={() => {
                        saveList()
                        props.history.push('/mylists')
                    }}
                >
                    Save & exit
                </Button>
            </section>
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