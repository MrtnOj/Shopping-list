import axios from '../../../util/axiosAPI'
import React, { useEffect, useState } from 'react'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

export interface Item {
    id?: number;
    name: string;
    categoryId?: number;
    userCategoryId?: number;
    category?: string | Category | null;
    last_bought?: Date;
    lasts?: number;
    inputValue?: string;
    comment?: string | null
}

export interface Category {
    id?: number;
    name: string
    inputValue?: string;
}

interface List { name: string; items: Item[] }

const useCreateList = () => {

    const filter = createFilterOptions<Item | Category>()

    const [list, setList] = useState<List>({name: '', items: []})
    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState([])
    const [itemAddDialogValue, setItemAddDialogValue] = useState<Item>({ id: undefined, name: '', category: '' })
    const [itemAddModalOpen, setItemAddModalOpen] = useState<boolean>(false)
    const [itemAutocompleteValue, setItemAutocompleteValue] = useState<Item | null>(null)
    const [suggestions, setSuggestions] = useState<Item[]>([])
    const [toggleSuggestions, setToggleSuggestions] = useState<boolean>(false)
    const [checkedSuggestions, setCheckedSuggestions] = useState<Item[]>([])
    const [saveListDialogOpen, setSaveListDialogOpen] = useState<boolean>(false)
    const [listSaveRedirect, setListSaveRedirect] = useState<boolean>(false)
    const [savedListId, setSavedListId] = useState<number | null>(null)
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
    const [commentDialogOpen, setCommentDialogOpen] = useState<boolean>(false)
    const [commentDialogValue, setCommentDialogValue] = useState<string>('')
    const [commentItemId, setCommentItemId] = useState<number | null>(null)


    useEffect(() => {
        getItems(localStorage.getItem('userId'))
        getCategories(localStorage.getItem('userId'))
        getSuggestions(localStorage.getItem('userId'))
    }, [localStorage.getItem('userId')])

    const getItems = (userId: string | null) => {
        axios.get('items/' + userId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setItems(response.data)
        })
    }

    const getCategories = (userId: string | null) => {
        axios.get('categories/' + userId, {
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

    const getSuggestions = (userId: string | null) => {
        axios.get('items/suggestions/' + userId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setSuggestions(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const itemAutocompleteValueChange = (event: React.ChangeEvent<any>, newValue: Item | string) => {
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setItemAddModalOpen(true)
              setItemAddDialogValue({
                name: newValue,
                category: '',
              })
            })
        } else if (newValue && newValue.inputValue) {
            setItemAddModalOpen(true)
            setItemAddDialogValue({
                id: newValue.id,
                name: newValue.inputValue,
                category: '',
            })
        } else {
            setItemAddDialogValue({
                id: newValue.id,
                name: newValue.name,
                category: ''
            })
            const newList = {...list, items: [...list.items, {name: newValue.name, id: newValue.id }]}
            const newItems = items.filter(item => item.id !== newValue.id)
            const newSuggestions = suggestions.filter(item => item.id !== newValue.id)
            setSuggestions(newSuggestions)
            setList(newList)
            setItems(newItems)
        }
    }

    const dialogCategoryChange = (event: React.ChangeEvent<any>, newValue: Category | string) => {
        if (typeof newValue === 'string') {
            setTimeout(() => {
              setItemAddModalOpen(true);
              setItemAddDialogValue({
                ...(itemAddDialogValue as Item),
                category: newValue,
              })
            })
        } else if (newValue && newValue.inputValue) {
            setItemAddDialogValue({...(itemAddDialogValue as Item), category: newValue.inputValue})
        } else {
            setItemAddDialogValue({...(itemAddDialogValue as Item), category: newValue})
        }
    }

    const dialogNameChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value, id: event.target.value.id })
    }

    const listNameChange = (event: React.ChangeEvent<any>) => {
        setList({...list, name: event.target.value})
    }

    const filterOptions = (options: Item[] | Category[], params: any) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
            id: params.id
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

    const addItem = (event: any) => {
        event.preventDefault()
        axios.post('/items/' + localStorage.getItem('userId'), {
            itemId: itemAutocompleteValue?.id,
            name: itemAddDialogValue.name,
            category: itemAddDialogValue.category
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            const newListItems = {...list, items: [...list.items, {name: itemAddDialogValue.name, id: response.data.id }]}
            setList(newListItems)
            handleAddItemModalClose()
            getItems(localStorage.getItem('userId'))
            getCategories(localStorage.getItem('userId'))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleAddItemModalClose = () => {
        setItemAddDialogValue({
            name: '',
            category: ''
        })
        setItemAddModalOpen(false)
        setItemAutocompleteValue(null)
    }

    const handleSuggestionsVisible = () => {
        if (toggleSuggestions === true) {
            setToggleSuggestions(false)
        } else {
            setToggleSuggestions(true)
        }
    }

    const suggestionCheckHandler = (item: Item) => {
        const currentIndex = checkedSuggestions.indexOf(item)
        const newChecked = [...checkedSuggestions]

        if (currentIndex === -1) {
            newChecked.push(item)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setCheckedSuggestions(newChecked)
    }

    const addFromSuggestions = () => {
        const newListItems = {...list, items: [...list.items, ...checkedSuggestions]}
        let newSuggestions = [...suggestions]
        let newItems = [...items]
        // Taking off items from suggestions and item autocomplete item pool after they are added to list
        checkedSuggestions.forEach(suggestion => {
            newSuggestions = newSuggestions.filter(item => item.id !== suggestion.id)
            newItems = newItems.filter(item => item.id !== suggestion.id)
        })
        setList(newListItems)
        setItems(newItems)
        setSuggestions(newSuggestions)
        handleSuggestionsVisible()
        setCheckedSuggestions([])
    }

    const handleDotsClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        setMenuAnchorEl(event.currentTarget)
        setCommentItemId(id)
    }

    const closeDotsMenu = () => {
        setMenuAnchorEl(null)
    }

    const removeListItem = () => {
        const newList = list.items.filter(item => {
            return item.id !== commentItemId
        })
        setList({...list, items: newList })
        closeDotsMenu()
        getItems(localStorage.getItem('userId'))
    }

    const handleSaveListDialogClose = () => {
        setSaveListDialogOpen(false)
    }

    const saveListButtonPressed = () => {
        setSaveListDialogOpen(true)
        const randomName = 'list' + String(Math.floor(Math.random() * 10000))
        setList({...list, name: randomName})
    }

    const saveListConfirm = (event: any) => {
        event.preventDefault()
        saveList()
        handleSaveListDialogClose()
    }

    const saveList = (): void => {
        axios.post('/list', {
            list: list,
            userId: localStorage.getItem('userId')
        }, { 
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response)
            setSavedListId(response.data)
            setListSaveRedirect(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addCommentButtonClicked = (event: any) => {
        setCommentDialogOpen(true)
    }

    const handleCommentDialogValueChange = (event: React.ChangeEvent<any>) => {
        setCommentDialogValue(event.target.value)
    }

    const handleCommentDialogClose = () => {
        setCommentDialogOpen(false)
        setCommentItemId(null)
        setMenuAnchorEl(null)
        setCommentDialogValue('')
    }

    const deleteItemComment = (id: number) => {
        const updatedCommentItems = list.items.map(item => {
            if (item.id !== id) {
                return item
            }
            return {
                ...item,
                comment: null
            }
        })
        const updatedList = {...list, items: updatedCommentItems}
        setList(updatedList)
        handleCommentDialogClose()
    }

    const saveItemComment = (event: any) => {
        event.preventDefault()
        const updatedCommentItems = list.items.map(item => {
            if (item.id !== commentItemId) {
                return item
            }
            return {
                ...item,
                comment: commentDialogValue
            }
        })
        const updatedList = {...list, items: updatedCommentItems}
        setList(updatedList)
        handleCommentDialogClose()
    }

    return {
        list: list,
        items: items,
        categories: categories,
        suggestions: suggestions,
        itemAddDialogValue: itemAddDialogValue,
        itemAddModalOpen: itemAddModalOpen,
        saveListDialogOpen: saveListDialogOpen,
        itemAutocompleteValue: itemAutocompleteValue,
        toggleSuggestions: toggleSuggestions,
        checkedSuggestions: checkedSuggestions,
        menuAnchorEl: menuAnchorEl,
        commentDialogOpen: commentDialogOpen,
        commentDialogValue: commentDialogValue,
        listSaveRedirect: listSaveRedirect,
        savedListId: savedListId,
        addCommentButtonClicked: addCommentButtonClicked,
        handleCommentDialogValueChange: handleCommentDialogValueChange,
        handleCommentDialogClose: handleCommentDialogClose,
        deleteItemComment: deleteItemComment,
        saveItemComment: saveItemComment,
        handleAddItemModalClose: handleAddItemModalClose,
        handleSaveListDialogClose: handleSaveListDialogClose,
        handleSuggestionsVisible: handleSuggestionsVisible,
        handleDotsClick: handleDotsClick,
        closeDotsMenu: closeDotsMenu,
        itemAutocompleteValueChange: itemAutocompleteValueChange,
        dialogNameChange: dialogNameChange,
        dialogCategoryChange: dialogCategoryChange,
        listNameChange: listNameChange,
        getOptionLabel: getOptionLabel,
        filterOptions: filterOptions,
        getItems: getItems,
        getCategories: getCategories,
        removeListItem: removeListItem,
        addItem: addItem,
        addFromSuggestions: addFromSuggestions,
        suggestionCheckHandler: suggestionCheckHandler,
        saveListButtonPressed: saveListButtonPressed,
        saveListConfirm: saveListConfirm,
        saveList: saveList,
    }
}

export default useCreateList