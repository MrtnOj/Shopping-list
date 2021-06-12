import React from 'react'
import { Redirect } from 'react-router-dom'
import useCreateList from './hooks/useCreateList'
import AddItemForm from '../AddItemForm/AddItemForm'
import Suggestions from './components/Suggestions'
import CommentDialog from '../UI/CommentDialog'
import ConfirmSaveDialog from './components/ConfirmSaveDialog'
import ListPaper from './components/ListPaper'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme, useMediaQuery } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '0 0 20px 0'
        },
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: 'url("groceries1.jpg")',
            backgroundSize: 'cover',
        },
        hiddenTitle: {
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
        },
        inputSection: {
            boxSizing: 'border-box',
            width: '100%',
            padding: '2rem 1rem 1rem 1rem',
            marginTop: '70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        suggestionButton: {
            margin: '15px auto 5px auto'
        },
        widescreenInputSection: {
            boxSizing: 'border-box',
            width: '100%',
            padding: '3rem 2rem 1rem 2rem',
            marginTop: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        saveButton: {
            position: 'fixed',
            bottom: theme.spacing(2),
            left: '50%',
            transform: 'translateX(-50%)'
        },
        wideScreenSaveButton: {
            position: 'absolute',
            width: '12rem',
            bottom: theme.spacing(3),
            left: '50%',
            transform: 'translateX(-50%)'
        }
    })
)

const CreateList = () => {
    const classes = useStyles()
    const widescreen = useMediaQuery('(min-width:600px)')
    const { 
        list,
        items,
        categories,
        suggestions,
        itemAddDialogValue,
        itemAutocompleteValue,
        itemAddModalOpen,
        toggleSuggestions,
        checkedSuggestions,
        saveListDialogOpen,
        menuAnchorEl,
        commentDialogOpen,
        commentDialogValue,
        listSaveRedirect,
        savedListId,
        addCommentButtonClicked,
        deleteItemComment,
        handleCommentDialogValueChange,
        handleCommentDialogClose,
        saveItemComment,
        handleAddItemModalClose,
        handleSuggestionsVisible,
        handleSaveListDialogClose,
        handleDotsClick,
        closeDotsMenu,
        itemAutocompleteValueChange,
        dialogNameChange,
        dialogCategoryChange,
        listNameChange,
        getOptionLabel,
        filterOptions,
        removeListItem,
        addItem,
        addFromSuggestions,
        suggestionCheckHandler,
        saveListButtonPressed,
        saveListConfirm
    } = useCreateList()

    const saveButton = 
        <Button 
            type='button' 
            color='secondary' 
            variant='contained' 
            size='large'
            onClick={saveListButtonPressed}
            disabled={list.items.length < 1}
            className={widescreen ? classes.wideScreenSaveButton : classes.saveButton}
        >
            Save list
        </Button>

    return (
        <React.Fragment>
            <Container component='article' maxWidth='sm' className={classes.container}>
                <h1 className={classes.hiddenTitle}>Create a List!</h1>
                <Paper className={widescreen ? classes.widescreenInputSection : classes.inputSection} elevation={3} component='section'>
                    <AddItemForm
                        itemAutocompleteValue={itemAutocompleteValue}
                        categoryAutocompleteValue={itemAutocompleteValue?.category}
                        itemAutoCompleteValueChange={itemAutocompleteValueChange}
                        filterOptions={filterOptions}
                        itemOptions={items}
                        categoryOptions={categories}
                        getOptionLabel={getOptionLabel}
                        dialogOpen={itemAddModalOpen}
                        dialogClose={handleAddItemModalClose}
                        addItem={addItem}
                        dialogValues={itemAddDialogValue}
                        dialogNameChange={dialogNameChange}
                        dialogCategoryChange={dialogCategoryChange}
                    />
                    <Button 
                        color='secondary'
                        className={classes.suggestionButton}
                        startIcon={<HelpIcon />}
                        onClick={handleSuggestionsVisible}
                    >
                        Suggestions
                    </Button>
                </Paper>
                <ListPaper 
                    list={list}
                    menuAnchorEl={menuAnchorEl}
                    handleDotsClick={handleDotsClick}
                    closeDotsMenu={closeDotsMenu}
                    removeListItem={removeListItem}
                    saveListButtonPressed={saveListButtonPressed}
                    widescreen={widescreen}
                    saveButton={saveButton}
                    addCommentButtonClicked={addCommentButtonClicked}
                    deleteComment={deleteItemComment}
                />
                <Suggestions 
                    items={suggestions}
                    toggleSuggestions={toggleSuggestions}
                    suggestionCheckHandler={suggestionCheckHandler}
                    checkedSuggestions={checkedSuggestions}
                    addItems={addFromSuggestions}
                    toggleVisible={handleSuggestionsVisible}
                />
            </Container>
            {!widescreen && saveButton}
            <CommentDialog 
                dialogOpen={commentDialogOpen}
                dialogClose={handleCommentDialogClose}
                saveComment={saveItemComment}
                valueChange={handleCommentDialogValueChange}
                value={commentDialogValue}
            />
            <ConfirmSaveDialog 
                dialogOpen={saveListDialogOpen}
                dialogClose={handleSaveListDialogClose}
                nameValue={list.name}
                nameChange={listNameChange}
                saveList={saveListConfirm}
            />
            {listSaveRedirect ? <Redirect to={'/mylists/use/' + savedListId} /> : null}
        </React.Fragment>
    )
}

export default CreateList