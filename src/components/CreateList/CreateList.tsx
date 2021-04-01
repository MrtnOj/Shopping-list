import React, { useEffect } from 'react'
import useCreateList from './hooks/useCreateList'
import ItemSuggest from './components/ItemSuggest'
import BuildingList from './components/BuildingList'
import AddItemForm from '../AddItemForm/AddItemForm'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

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
        addItem
    } = useCreateList()


    return (
        <Container component='article' maxWidth='lg'>
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