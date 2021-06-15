import React, { useEffect, useState } from 'react'
import axios from '../../../util/axiosAPI'
import { Item } from '../../CreateList/hooks/useCreateList'
import { Category } from '../../CreateList/hooks/useCreateList'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

const useUserItemsAndCategories = () => {
    const [tabValue, setTabValue] = useState<number>(0)
    const [items, setItems] = useState<Item[]>([])
    const [addOrEdit, setAddOrEdit] = useState<string>('add')
    const [categories, setCategories] = useState<Category[]>([])
    const [editItemDialogValue, setEditItemDialogValue] = useState({ name: '', category: {}})
    const [editCategoryDialogValue, setEditCategoryDialogValue] = useState<string>('')
    const [editItemModalOpen, setEditItemModalOpen] = useState<boolean>(false)
    const [editCategoryModalOpen, setEditCategoryModalOpen] = useState<boolean>(false)
    const [editingItem, setEditingItem] = useState<Item | null>(null)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [elementToDelete, setElementToDelete] = useState<any>(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)

    const filter = createFilterOptions<Item | Category>()

    useEffect(() => {
        getItems(localStorage.getItem('userId'))
        getCategories(localStorage.getItem('userId'))
    }, [localStorage.getItem('userId')])

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
    }

    const getItems = (userId: string | null) => {
        axios.get('/items/' + userId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setItems(response.data)
        })
    }

    const getCategories = (userId: string | null) => {
        axios.get('/categories/' + userId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setCategories(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addButtonPressed = (isItem: boolean) => {
        setEditingCategory(null)
        setAddOrEdit('add')
        setEditingItem(null)
        if (isItem) {
            setEditItemModalOpen(true)
        } else {
            setEditCategoryModalOpen(true)
        }
    }

    const editItemButtonPressed = () => {
        setAddOrEdit('edit')
        const category = categories.find(cat => cat.id === editingItem!.userCategoryId)
        setEditItemDialogValue({ name: editingItem!.name, category: (category as Category) })
        setEditItemModalOpen(true)
        setMenuAnchorEl(null)
    }

    const editCategoryButtonPressed = () => {
        setAddOrEdit('edit')
        setEditCategoryDialogValue(editingCategory!.name)
        setEditCategoryModalOpen(true)
        setMenuAnchorEl(null)
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
            axios.put('/items/' + editingItem!.id, {
                userId: localStorage.getItem('userId'),
                newName: editItemDialogValue.name,
                category: editItemDialogValue.category
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                getItems(localStorage.getItem('userId'))
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            axios.post('/items/' + localStorage.getItem('userId'), {
                name: editItemDialogValue.name,
                category: editItemDialogValue.category
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
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
            axios.put('/categories/' + editingCategory.id + '?userId=' + localStorage.getItem('userId'), {
                newCategoryName: editCategoryDialogValue
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                getCategories(localStorage.getItem('userId'))
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            axios.post('/categories/' + localStorage.getItem('userId'), {
                name: editCategoryDialogValue
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
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
        setMenuAnchorEl(null)
    }

    const deleteItemOrCategory = (isItem: boolean) => {
        const url = isItem ? '/items/' : '/categories/'
        axios.delete(url + elementToDelete.id + '?userId=' + localStorage.getItem('userId'), {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
        })
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

    const handleDotsClick = (event: React.MouseEvent<HTMLButtonElement>, element: Category | Item) => {
        setMenuAnchorEl(event.currentTarget)
        if (tabValue === 0) {
            setEditingItem(element)
        } else {
            setEditingCategory(element)
        }
    }

    const closeDotsMenu = () => {
        setMenuAnchorEl(null)
    }

    return {
        items: items,
        categories: categories,
        elementToDelete: elementToDelete,
        menuAnchorEl: menuAnchorEl,
        addOrEdit: addOrEdit,
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
        closeDotsMenu: closeDotsMenu,
        //functions when buttons are pressed
        addButtonPressed: addButtonPressed,
        deleteButtonPressed: deleteButtonPressed,
        editItemButtonPressed: editItemButtonPressed,
        editCategoryButtonPressed: editCategoryButtonPressed,
        handleTabChange: handleTabChange,
        handleDotsClick: handleDotsClick,
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