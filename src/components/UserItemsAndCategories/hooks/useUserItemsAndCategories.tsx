import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Item } from '../../CreateList/hooks/useCreateList'
import { Category } from '../../CreateList/hooks/useCreateList'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

const useUserItemsAndCategories = () => {
    const [tabValue, setTabValue] = useState<number>(0)
    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [editItemDialogValue, setEditItemDialogValue] = useState({ name: '', category: {}})
    const [editCategoryDialogValue, setEditCategoryDialogValue] = useState<string>('')
    const [editItemModalOpen, setEditItemModalOpen] = useState<boolean>(false)
    const [editCategoryModalOpen, setEditCategoryModalOpen] = useState<boolean>(false)
    const [editingItem, setEditingItem] = useState<Item | null>(null)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [elementToDelete, setElementToDelete] = useState<any>(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

    const filter = createFilterOptions<Item | Category>()

    useEffect(() => {
        getItems(localStorage.getItem('userId'))
        getCategories(localStorage.getItem('userId'))
    }, [localStorage.getItem('userId')])

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
    }

    const getItems = (userId: string | null) => {
        axios.get('http://localhost:8080/items/' + userId)
        .then(response => {
            setItems(response.data)
        })
    }

    const getCategories = (userId: string | null) => {
        axios.get('http://localhost:8080/categories/' + userId)
        .then(response => {
            setCategories(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addItemButtonPressed = () => {
        setEditItemModalOpen(true)
    }

    const addCategoryButtonPressed = () => {
        setEditCategoryModalOpen(true)
    }

    const editItemButtonPressed = (item: Item) => {
        setEditingItem(item)
        const category = categories.find(cat => cat.id === item.userCategoryId)
        setEditItemDialogValue({ name: item.name, category: (category as Category) })
        setEditItemModalOpen(true)
    }

    const editCategoryButtonPressed = (category: Category) => {
        setEditingCategory(category)
        setEditCategoryDialogValue(category.name)
        setEditCategoryModalOpen(true)
    }

    const editDialogNameChange = (event: React.ChangeEvent<any>) => {
        setEditItemDialogValue({ ...editItemDialogValue, name: event.target.value })
    }

    const editItemDialogCategoryChange = (event: React.ChangeEvent<any>, newValue: Category | string) => {
        if (typeof newValue === 'string') {
            setEditItemModalOpen(true);
            setEditItemDialogValue({
            ...(editItemDialogValue as Item),
            category: newValue,
            })
        } else if (newValue && newValue.inputValue) {
            setEditItemDialogValue({...(editItemDialogValue as Item), category: newValue.inputValue})
        } else {
            setEditItemDialogValue({...(editItemDialogValue as Item), category: newValue})
        }
        console.log(editItemDialogValue)
    }

    const filterAutocompleteOptions = (options: Item[] | Category[], params: any) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`
          })
        }
        return filtered
    }

    const editCategoryNameChange = (event: React.ChangeEvent<any>) => {
        setEditCategoryDialogValue(event.target.value)
    }

    const getOptionLabel = (option: Item | Category | string) => {
        if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
    }

    const saveItemEdit = (event: any) => {
        event.preventDefault()
        if (editingItem) {
            axios.put('http://localhost:8080/items/' + editingItem!.id, {
                userId: localStorage.getItem('userId'),
                newName: editItemDialogValue.name,
                category: editItemDialogValue.category
            })
            .then(response => {
                console.log(response)
                getItems(localStorage.getItem('userId'))
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            axios.post('http://localhost:8080/items/' + localStorage.getItem('userId'), {
                name: editItemDialogValue.name,
                category: editItemDialogValue.category
            })
            .then(response => {
                console.log(response)
                getItems(localStorage.getItem('userId'))
                getCategories(localStorage.getItem('userId'))
            })
            .catch(err => {
                console.log(err)
            })
        }
        handleItemEditModalClose()
    }

    const saveCategoryEdit = (event: any) => {
        event.preventDefault()
        if (editingCategory) {
            axios.put('http://localhost:8080/categories/' + editingCategory.id, {
                newCategoryName: editCategoryDialogValue
            })
            .then(response => {
                getCategories(localStorage.getItem('userId'))
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            axios.post('http://localhost:8080/categories/' + localStorage.getItem('userId'), {
                name: editCategoryDialogValue
            })
            .then(response => {
                console.log(response)
                getCategories(localStorage.getItem('userId'))
            })
            .catch(err => {
                console.log(err)
            })
        }
        handleCategoryEditModalClose()
    }

    const handleItemEditModalClose = () => {
        setEditItemDialogValue({
            name: '',
            category: ''
        })
        setEditingItem(null)
        setEditItemModalOpen(false)
    }

    const handleCategoryEditModalClose = () => {
        setEditCategoryDialogValue('')
        setEditingCategory(null)
        setEditCategoryModalOpen(false)
    }

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false)
        setElementToDelete(null)
    }

    const deleteButtonPressed = (element: any) => {
        setDeleteModalOpen(true)
        setElementToDelete(element)
    }

    const deleteItemOrCategory = (isItem: boolean) => {
        const url = isItem ? 'items' : 'categories'
        axios.delete('http://localhost:8080/' + url + '/' + elementToDelete.id)
        .then(response => {
            if (isItem) {
                getItems(localStorage.getItem('userId'))
            } else {
                getCategories(localStorage.getItem('userId'))
            }
        })
        .catch(err => {
            console.log(err)
        })
        handleDeleteModalClose()
    }

    return {
        items: items,
        categories: categories,
        elementToDelete: elementToDelete,
        // input values
        tabValue: tabValue,
        editItemDialogValue: editItemDialogValue,
        editCategoryDialogValue: editCategoryDialogValue,
        // modal states
        editItemModalOpen: editItemModalOpen,
        editCategoryModalOpen: editCategoryModalOpen,
        deleteModalOpen: deleteModalOpen,
        // modal close handlers
        handleItemEditModalClose: handleItemEditModalClose,
        handleCategoryEditModalClose: handleCategoryEditModalClose,
        handleDeleteModalClose: handleDeleteModalClose,
        //functions when buttons are pressed
        addItemButtonPressed: addItemButtonPressed,
        addCategoryButtonPressed: addCategoryButtonPressed,
        deleteButtonPressed: deleteButtonPressed,
        editItemButtonPressed: editItemButtonPressed,
        editCategoryButtonPressed: editCategoryButtonPressed,
        handleTabChange: handleTabChange,
        // input changes
        editDialogNameChange: editDialogNameChange,
        editItemDialogCategoryChange: editItemDialogCategoryChange,
        editCategoryNameChange: editCategoryNameChange,
        // autocomplete functions
        filterAutocompleteOptions: filterAutocompleteOptions,
        getOptionLabel: getOptionLabel,
        // api request senders
        saveItemEdit: saveItemEdit,
        saveCategoryEdit: saveCategoryEdit,
        deleteElement: deleteItemOrCategory,
    }
}

export default useUserItemsAndCategories