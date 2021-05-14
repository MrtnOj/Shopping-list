import React, { useEffect, useState, useCallback } from 'react'

import axios from '../../../util/axiosAPI'
import { ListData, Item, Category } from '../../ListView/hooks/useListView'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

const useListEdit = () => {

    const filter = createFilterOptions<Item | Category>()

    const [listData, setListData] = useState<ListData>({})
    const [listItems, setListItems] = useState<Item[]>([])
    const [items, setItems] = useState<Item[]>([])
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
                console.log(listData)
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
            // const newListItems = [...listData.items, {name: itemAddDialogValue.name, id: response.data.itemId }]
            const newListData = { ...listData, items: [...listData.items!, {name: itemAddDialogValue.name, id: response.data.itemId }]}
            setListData(newListData)
            handleAddItemModalClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const removeListItem = (itemId: number) => {
        const newList = listData.items?.filter(item => {
            return item.id !== itemId
        })
        setListData({...listData, items: newList })
    }

    const dialogNameChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value})
    }

    const openItemSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        getItems()
        getCategories()
        setItemSearchOpen(true)
    } 

    return {
        items: items,
        categories: categories,
        listData: listData,
        listItems: listItems,
        itemSearchOpen: itemSearchOpen,
        itemAddModalOpen: itemAddModalOpen,
        itemAutocompleteValue: itemAutocompleteValue,
        itemAddDialogValue: itemAddDialogValue,
        getList: getList,
        openItemSearch: openItemSearch,
        itemAutocompleteValueChange: itemAutocompleteValueChange,
        handleAddItemModalClose: handleAddItemModalClose,
        dialogCategoryChange: dialogCategoryChange,
        dialogNameChange: dialogNameChange,
        filterOptions: filterOptions,
        getOptionLabel: getOptionLabel,
        addItemToList: addItemToList,
        removeListItem: removeListItem,
    }
}

export default useListEdit