import React, { useEffect, useState, useCallback } from 'react'

import axios from '../../../util/axiosAPI'
import { ListData, Item, Category } from '../../ListView/hooks/useListView'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { PinDropSharp } from '@material-ui/icons'

const useListEdit = () => {

    const filter = createFilterOptions<Item | Category>()

    const [listData, setListData] = useState<ListData>({})
    const [items, setItems] = useState<Item[]>([])
    const [nameChanged, setNameChanged] = useState<boolean>(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [itemSearchOpen, setItemSearchOpen] = useState<boolean>(false)
    const [itemAddModalOpen, setItemAddModalOpen] = useState<boolean>(false)
    const [itemAutocompleteValue, setItemAutocompleteValue] = useState<Item | null>(null)
    const [itemAddDialogValue, setItemAddDialogValue] = useState<Item>({ name: '', category: '' })


    const getList = useCallback((listId: number) => {
        axios.get('/list/listdetails/' + listId + '?userId=' + localStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setListData({...response.data, items: response.data.user_items})
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
                name: newValue.inputValue,
                category: '',
            })
        } else {
            setItemAddDialogValue({
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
        axios.post('/list/add/' + listData.id, {
            userId: localStorage.getItem('userId'),
            itemId: itemAutocompleteValue?.id,
            name: itemAddDialogValue.name,
            category: itemAddDialogValue.category
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            const newListData = { ...listData, items: [...listData.items!, {name: itemAddDialogValue.name, id: response.data.itemId }]}
            setListData(newListData)
            handleAddItemModalClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const removeListItem = (itemId: any) => {
        const newList = listData.items?.filter(item => {
            return item.list_item.id !== itemId
        })
        axios.delete('/list/listitem/delete/' + itemId + '?userId=' + localStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setListData({...listData, items: newList })
        })
        .catch(err => {
            console.log(err)
        })
    }

    const dialogNameChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value})
    }

    const listNameChange = (event: React.ChangeEvent<any>) => {
        setListData({...listData, name: event.target.value})
        setNameChanged(true)
    }

    const openItemSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        getItems()
        getCategories()
        setItemSearchOpen(true)
    } 

    const saveListNameChange = () => {
        if (!nameChanged) {
            return
        }
        axios.put('/list/' + listData.id, {
            userId: localStorage.getItem('userId'),
            newName: listData.name
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

    return {
        items: items,
        categories: categories,
        listData: listData,
        itemSearchOpen: itemSearchOpen,
        itemAddModalOpen: itemAddModalOpen,
        itemAutocompleteValue: itemAutocompleteValue,
        itemAddDialogValue: itemAddDialogValue,
        getList: getList,
        saveListNameChange: saveListNameChange,
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
    }
}

export default useListEdit