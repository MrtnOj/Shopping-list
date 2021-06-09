import React, { useEffect, useState, useCallback } from 'react'

import axios from '../../../util/axiosAPI'
import { ListData, Item, Category } from '../../ListView/hooks/useListView'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

const useListEdit = () => {

    const filter = createFilterOptions<Item | Category>()

    const [list, setList] = useState<ListData>({})
    const [changedList, setChangedList] = useState<ListData>({})
    const [listChanged, setListChanged] = useState({
        name: false,
        items: false
    })
    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [itemSearchOpen, setItemSearchOpen] = useState<boolean>(false)
    const [itemAddModalOpen, setItemAddModalOpen] = useState<boolean>(false)
    const [itemAutocompleteValue, setItemAutocompleteValue] = useState<Item | null>(null)
    const [itemAddDialogValue, setItemAddDialogValue] = useState<Item>({ name: '', category: '' })
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
    const [commentDialogOpen, setCommentDialogOpen] = useState<boolean>(false)
    const [commentDialogValue, setCommentDialogValue] = useState<string>('')
    const [commentItemId, setCommentItemId] = useState<number | null>(null)


    const getList = useCallback((listId: number) => {
        axios.get('/list/listdetails/' + listId + '?userId=' + localStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setList({...response.data, items: response.data.user_items})
                setChangedList({...response.data, items: response.data.user_items})
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getItems = () => {
        axios.get('/items/' + localStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setItems(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getCategories = () => {
        axios.get('categories/' + localStorage.getItem('userId'), {
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

    const itemAutocompleteValueChange = (event: React.ChangeEvent<any>, newValue: Item | string) => {
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setItemAddModalOpen(true);
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
        }
    }

    const dialogCategoryChange = (event: React.ChangeEvent<any>, newValue: Category | string) => {
        if (typeof newValue === 'string') {
            setItemAddModalOpen(true);
            setItemAddDialogValue({
            ...(itemAddDialogValue as Item),
            category: newValue,
            })
        } else if (newValue && newValue.inputValue) {
            setItemAddDialogValue({...(itemAddDialogValue as Item), category: newValue.inputValue})
        } else {
            setItemAddDialogValue({...(itemAddDialogValue as Item), category: newValue})
        }
    }

    const filterOptions = (options: Item[] | Category[], params: any) => {
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

    const handleAddItemModalClose = () => {
        setItemAddDialogValue({
            name: '',
            category: ''
        })
        setItemAddModalOpen(false)
        setItemSearchOpen(false)
        setItemAutocompleteValue(null)

    }

    const addItemToList = (event: any) => {
        event.preventDefault()
        const newList = {
            ...changedList,
            items: [
                ...(changedList.items as Item[]),
                {name: itemAddDialogValue.name, id: itemAddDialogValue.id, list_item: null }
            ]
        }
        setChangedList(newList)
        setListChanged({...listChanged, items: true})
        handleAddItemModalClose()
    }

    const addUserItem = (event: any) => {
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
            const newListItems = {
                ...changedList,
                items: [
                    ...(changedList.items as Item[]),
                    {name: itemAddDialogValue.name, id: response.data.id, list_item: null}
                ]
            }
            setChangedList(newListItems)
            setListChanged({...listChanged, items: true})
            handleAddItemModalClose()
            getItems()
            getCategories()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const removeListItem = (itemId: any) => {
        const newListItems = changedList.items?.filter(item => {
            return item.id !== itemId
        })
        setChangedList({...changedList, items: newListItems})
        closeDotsMenu()
        setListChanged({...listChanged, items: true})
    }

    const dialogNameChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value})
    }

    const listNameChange = (event: React.ChangeEvent<any>) => {
        setChangedList({...changedList, name: event.target.value})
        setListChanged({...listChanged, name: true})
    }

    const openItemSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        getItems()
        getCategories()
        setItemSearchOpen(true)
    } 

    const saveList = () => {
        if (!listChanged.items && !listChanged.name) {
            return
        }
        if (listChanged.name) {
            listNameChangeRequest()
        }
        if (listChanged.items) {
            axios.put('/list/update', {
                list: changedList
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
    
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const listNameChangeRequest = () => {
        axios.put('/list/' + list.id, {
            userId: localStorage.getItem('userId'),
            newName: changedList.name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addCommentButtonClicked = (id: number) => {
        setCommentDialogOpen(true)
        setCommentItemId(id)
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
        const updatedCommentItems = changedList.items?.map(item => {
            if (item.id !== id) {
                return item
            }
            return {
                ...item,
                list_item: {...item.list_item, comment: null}
            }
        })
        const updatedList = {...changedList, items: updatedCommentItems}
        setChangedList(updatedList)
        setListChanged({...listChanged, items: true})
        handleCommentDialogClose()
    }

    const saveItemComment = (event: any) => {
        event.preventDefault()
        console.log(commentItemId)
        const updatedCommentItems = changedList.items?.map(item => {
            if (item.id !== commentItemId) {
                return item
            } 
            return {
                ...item,
                list_item: {...item.list_item, comment: commentDialogValue}
            }
        })
        const updatedList = {...changedList, items: updatedCommentItems}
        setChangedList(updatedList)
        setListChanged({...listChanged, items: true})
        handleCommentDialogClose()
    }

    const handleDotsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget)
    }

    const closeDotsMenu = () => {
        setMenuAnchorEl(null)
    }


    return {
        items: items,
        categories: categories,
        list: list,
        changedList: changedList,
        itemSearchOpen: itemSearchOpen,
        itemAddModalOpen: itemAddModalOpen,
        itemAutocompleteValue: itemAutocompleteValue,
        itemAddDialogValue: itemAddDialogValue,
        menuAnchorEl: menuAnchorEl,
        commentDialogOpen: commentDialogOpen,
        commentDialogValue: commentDialogValue,
        addCommentButtonClicked: addCommentButtonClicked,
        handleCommentDialogValueChange: handleCommentDialogValueChange,
        handleCommentDialogClose: handleCommentDialogClose,
        deleteItemComment: deleteItemComment,
        saveItemComment: saveItemComment,
        handleDotsClick: handleDotsClick,
        closeDotsMenu: closeDotsMenu,
        getList: getList,
        saveList: saveList,
        openItemSearch: openItemSearch,
        itemAutocompleteValueChange: itemAutocompleteValueChange,
        handleAddItemModalClose: handleAddItemModalClose,
        dialogCategoryChange: dialogCategoryChange,
        dialogNameChange: dialogNameChange,
        listNameChange: listNameChange,
        filterOptions: filterOptions,
        getOptionLabel: getOptionLabel,
        addItemToList: addItemToList,
        removeListItem: removeListItem,
        addUserItem: addUserItem
    }
}

export default useListEdit