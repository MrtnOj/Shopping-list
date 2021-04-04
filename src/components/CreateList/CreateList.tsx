import React, { useEffect } from 'react'
import useCreateList from './hooks/useCreateList'
import AddItemForm from '../AddItemForm/AddItemForm'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleTitle: {
            margin: '100px 10px 20px 10px'
        },
        listBuildContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        searchInput: {
            display: 'block',
            maxWidth: 450,
            margin: '0 auto'
        },
        list: {

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
        handleAddItemModalClose,
        itemAutocompleteValueChange,
        dialogNameChange,
        dialogCategoryChange,
        getOptionLabel,
        filterOptions,
        removeListItem,
        addItem
    } = useCreateList()

    const pickedList = list.map(item => {
        return (
            <ListItem key={item.id} className={classes.list} divider={true}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton edge='end' size='small' color='inherit' onClick={() => removeListItem((item.id))}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    })

    return (
        <Container component='article' maxWidth='sm'>
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
            <List>
                {pickedList}
            </List>
            <Button 
                type='button' 
                color='secondary' 
                variant='contained' 
                size='large'
                onClick={saveList}
            >
                Save list
            </Button>
        </Container>
    )
}

export default CreateList