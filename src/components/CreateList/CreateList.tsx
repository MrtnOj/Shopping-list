import React from 'react'
import useCreateList from './hooks/useCreateList'
import AddItemForm from '../AddItemForm/AddItemForm'
import Suggestions from './components/Suggestions'
import ConfirmSaveDialog from './components/ConfirmSaveDialog'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, makeStyles, Theme, useMediaQuery } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import HelpIcon from '@material-ui/icons/Help'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Fade from '@material-ui/core/Fade';

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
            padding: '1rem',
            paddingTop: '2rem',
            marginTop: '70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        listPaper: {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3),
            width: '100%',
            minHeight: '350px'
        },
        list: {
            marginBottom: '4rem'
        },
        suggestionButton: {
            margin: '5px auto'
        },
        saveButton: {
            position: 'fixed',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)'
        },
        widescreenInputSection: {
            boxSizing: 'border-box',
            width: '100%',
            padding: '3rem',
            marginTop: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        wideScreenSaveButton: {
            position: 'absolute',
            width: '12rem',
            bottom: '15px',
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

    const pickedList = list.items.map(item => {
        return (
            <ListItem key={item.id} divider={true}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton 
                        aria-controls='item-actions-menu'
                        aria-haspopup='true'
                        edge='end'
                        size='small'
                        color='inherit'
                        onClick={handleDotsClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                <Menu
                    id="item-actions-menu"
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={Boolean(menuAnchorEl)}
                    onClose={closeDotsMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => removeListItem((item.id))}>Remove</MenuItem>
                    <MenuItem onClick={closeDotsMenu}>Add comment</MenuItem>
                </Menu>
            </ListItem>
        )
    })

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

    const listPaper = 
        <Paper  className={classes.listPaper} elevation={3} component='section'>
            <List className={classes.list}>
                {pickedList}
            </List>
            {widescreen && saveButton}
        </Paper>


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
                {listPaper}
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
            <ConfirmSaveDialog 
                dialogOpen={saveListDialogOpen}
                dialogClose={handleSaveListDialogClose}
                nameValue={list.name}
                nameChange={listNameChange}
                saveList={saveListConfirm}
            />
        </React.Fragment>
    )
}

export default CreateList