import React from 'react'
import Container from '@material-ui/core/Container'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './components/TabPanel'
import EditElementDialog from './components/EditElementDialog'
import EditCategoryDialog from './components/EditCategoryDialog'
import useUserItemsAndCategories from './hooks/useUserItemsAndCategories'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {

        },
        hiddenTitle: {
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
        },
        tabs: {
            marginTop: 70
        }
    })
)

const UserItemsAndCategories = () => {
    const classes = useStyles()

    const { 
        items,
        categories,
        tabValue,
        editItemModalOpen,
        editCategoryModalOpen,
        deleteModalOpen,
        elementToDelete,
        editItemDialogValue,
        editCategoryDialogValue,
        addItemButtonPressed,
        addCategoryButtonPressed,
        deleteButtonPressed,
        saveItemEdit,
        saveCategoryEdit,
        editDialogNameChange,
        editItemDialogCategoryChange,
        editCategoryNameChange,
        filterAutocompleteOptions,
        getOptionLabel,
        editItemButtonPressed,
        editCategoryButtonPressed,
        handleItemEditModalClose,
        handleCategoryEditModalClose,
        handleDeleteModalClose,
        handleTabChange,
        deleteElement,

    } = useUserItemsAndCategories()

    return (
        <Container component='article' maxWidth='sm' className={classes.container}>
            <h1 className={classes.hiddenTitle}>Edit items and categories</h1>
            <Tabs 
                value={tabValue}
                variant='fullWidth'
                aria-label="user-items-navigation-tabs"
                className={classes.tabs}
                onChange={handleTabChange}
            >
                <Tab label="Items" />
                <Tab label="Categories" />
                <Tab label="Recipes" disabled />
            </Tabs>
            <TabPanel
                value={tabValue}
                name='Items'
                index={0}
                isItem={true}
                content={items}
                deleteElement={deleteElement}
                editElement={editItemButtonPressed}
                addButtonPressed={addItemButtonPressed}
                deleteButtonPressed={deleteButtonPressed}
                deleteModalOpen={deleteModalOpen}
                elementToDelete={elementToDelete}
                deleteModalClose={handleDeleteModalClose}
            />
            <TabPanel
                value={tabValue}
                name='Categories'
                index={1}
                isItem={false}
                content={categories}
                deleteElement={deleteElement}
                editElement={editCategoryButtonPressed}
                addButtonPressed={addCategoryButtonPressed}
                deleteButtonPressed={deleteButtonPressed}
                deleteModalOpen={deleteModalOpen}
                elementToDelete={elementToDelete}
                deleteModalClose={handleDeleteModalClose}
            />
            <EditElementDialog 
                dialogOpen={editItemModalOpen}
                dialogClose={handleItemEditModalClose}
                confirmEdit={saveItemEdit}
                dialogValues={editItemDialogValue}
                itemNameChange={editDialogNameChange}
                categoryAutocompleteValue={editItemDialogValue.category}
                dialogCategoryChange={editItemDialogCategoryChange}
                filterOptions={filterAutocompleteOptions}
                categoryOptions={categories}
                getOptionLabel={getOptionLabel}
            />
            <EditCategoryDialog 
                dialogOpen={editCategoryModalOpen}
                dialogClose={handleCategoryEditModalClose}
                dialogValue={editCategoryDialogValue}
                confirmEdit={saveCategoryEdit}
                nameChange={editCategoryNameChange}
            />
        </Container>
    )
}

export default UserItemsAndCategories
