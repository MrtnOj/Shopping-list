import React, { useEffect } from 'react'
import useCreateList from './hooks/useCreateList'
import AddItemForm from '../AddItemForm/AddItemForm'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox';
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
            margin: '100px 10px 20px 10px'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        suggestionItem: {
            cursor: 'pointer'
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
            width: '100%'
        },
        suggestionButton: {
            margin: '5px auto'
        },
        suggestionsBoxVisible: {
            display: 'block',
            position: 'fixed',
            top: '100px',
            left: '50px',
            right: 50,
            bottom: 100,
            zIndex: 10,
            padding: theme.spacing(1)
        },
        suggestionsBoxHidden: {
            display: 'none'
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
                        <List>
                            {pickedList}
                        </List>
                    </Paper>
    }

    return (
        <Container component='article' maxWidth='sm' className={classes.container}>
            <Typography 
                variant='h1' 
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
            <Button 
                type='button' 
                color='secondary' 
                variant='contained' 
                size='large'
                onClick={saveList}
            >
                Save list
            </Button>
            <Paper
                className={toggleSuggestions 
                    ? classes.suggestionsBoxVisible 
                    : classes.suggestionsBoxHidden
                } 
                elevation={4}
                component='article'
            >
                <List>
                    {items.map(item => {
                        return (
                            <ListItem 
                                key={item.id} 
                                className={classes.suggestionItem}
                                divider={true}
                            >
                                <ListItemText primary={item.name}/>
                                <ListItemSecondaryAction>
                                    <Checkbox 
                                        edge='end'
                                        onChange={() => suggestionCheckHandler(item)}
                                        checked={checkedSuggestions.indexOf(item) !== -1}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem> 
                        )
                    })}
                </List>
            </Paper>
        </Container>
    )
}

export default CreateList