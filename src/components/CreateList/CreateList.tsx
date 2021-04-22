import React from 'react'
import useCreateList from './hooks/useCreateList'
import AddItemForm from '../AddItemForm/AddItemForm'
import Suggestions from './components/Suggestions'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import HelpIcon from '@material-ui/icons/Help'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '70px 10px 20px 10px'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        listPaper: {
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-evenly',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3),
            width: '100%',
        },
        list: {

        },
        suggestionButton: {
            margin: '5px auto'
        },
        saveButton: {
            position: 'fixed',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)'
        }
    })
)

const CreateList = () => {
    const classes = useStyles()
    const { 
        saveList,
        list,
        items,
        categories,
        suggestions,
        itemAddDialogValue,
        itemAutocompleteValue,
        itemAddModalOpen,
        toggleSuggestions,
        checkedSuggestions,
        handleAddItemModalClose,
        handleSuggestionsVisible,
        itemAutocompleteValueChange,
        dialogNameChange,
        dialogCategoryChange,
        getOptionLabel,
        filterOptions,
        removeListItem,
        addItem,
        addFromSuggestions,
        suggestionCheckHandler,
    } = useCreateList()

    const pickedList = list.map(item => {
        return (
            <ListItem key={item.id} divider={true}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton edge='end' size='small' color='inherit' onClick={() => removeListItem((item.id))}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    })

    let listPaper = null
    if (list.length > 0) {
        listPaper = <Paper  className={classes.listPaper} elevation={3} component='div'>
                        <List className={classes.list}>
                            {pickedList}
                        </List>
                    </Paper>
    }

    return (
        <React.Fragment>
            <Container component='article' maxWidth='sm' className={classes.container}>
                <Typography 
                    variant='h4'
                    component='h1' 
                    className={classes.articleTitle} 
                    color='primary' 
                    align='center'
                >
                    Create List
                </Typography>
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
            <Button 
                type='button' 
                color='secondary' 
                variant='contained' 
                size='large'
                onClick={saveList}
                disabled={list.length < 1}
                className={classes.saveButton}
            >
                Save list
            </Button>
        </React.Fragment>
    )
}

export default CreateList