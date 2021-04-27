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
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
    const [editingElement, setEditingElement] = useState<Item | null>(null)

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

    const editItemButtonPressed = (element: Item) => {
        setEditingElement(element)
        const category = categories.find(cat => cat.id === element.userCategoryId)
        setEditItemDialogValue({ name: element.name, category: (category as Category) })
        setEditModalOpen(true)
    }

    const editDialogNameChange = (event: React.ChangeEvent<any>) => {
        setEditItemDialogValue({ ...editItemDialogValue, name: event.target.value })
    }

    const dialogCategoryChange = (event: React.ChangeEvent<any>, newValue: Category | string) => {
        if (typeof newValue === 'string') {
            setEditModalOpen(true);
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
        console.log(editingElement)
        console.log(editItemDialogValue.category)
        axios.put('http://localhost:8080/items/' + editingElement!.id, {
            userId: localStorage.getItem('userId'),
            newName: editItemDialogValue.name,
            category: editItemDialogValue.category
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        handleEditModalClose()
    }

    const handleEditModalClose = () => {
        setEditItemDialogValue({
            name: '',
            category: ''
        })
        setEditingElement(null)
        setEditModalOpen(false)
    }

    const deleteItemOrCategory = (id: number, isItem: boolean) => {
        const url = isItem ? 'items' : 'categories'
        axios.delete('http://localhost:8080/' + url + '/' + id)
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
    }

    return {
        items: items,
        categories: categories,
        tabValue: tabValue,
        editItemDialogValue: editItemDialogValue,
        editModalOpen: editModalOpen,
        editDialogNameChange: editDialogNameChange,
        saveItemEdit: saveItemEdit,
        dialogCategoryChange: dialogCategoryChange,
        filterAutocompleteOptions: filterAutocompleteOptions,
        getOptionLabel: getOptionLabel,
        editItemButtonPressed: editItemButtonPressed,
        handleEditModalClose: handleEditModalClose,
        deleteElement: deleteItemOrCategory,
        handleTabChange: handleTabChange
    }
}

export default useUserItemsAndCategories