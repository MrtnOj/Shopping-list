import React, { useCallback, useState } from 'react'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

import axios from '../../../util/axiosAPI'

export interface Item {
    id?: number;
    name: string;
    categoryId?: number;
    category?: string | Category | null;
    last_bought?: Date;
    lasts?: number;
    inputValue?: string;
    list_item?: any
}

export interface Category {
    id?: number;
    name: string
    inputValue?: string;
}

export type ListData = {
    id? : number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: number;
    items?: Item[]
} 

const useListView = () => {

    const filter = createFilterOptions<Item | Category>()

    const [listData, setListData] = useState<ListData>({})
    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState([])
    const [itemAddDialogValue, setItemAddDialogValue] = useState<Item>({ name: '', category: '' })
    const [listItems, setListItems] = useState<Item[]>([])
    const [pickedList, setPickedList] = useState<Item[]>([])
    const [finishModalOpen, setFinishModalOpen] = useState<boolean>(false)
    const [itemAddModalOpen, setItemAddModalOpen] = useState<boolean>(false)
    const [itemSearchOpen, setItemSearchOpen] = useState<boolean>(false)
    const [itemAutocompleteValue, setItemAutocompleteValue] = useState<Item | null>(null)

    const getList = useCallback((listId: number) => {
        axios.get('/list/listdetails/' + listId + '?userId=' + localStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setListData(response.data)
                setListItems(response.data.user_items)
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

    const itemCheckClicked = (itemKey: number | undefined): void => {
        // remove clicked item from list items
        const newListItems = listItems?.filter(item => item.id !== itemKey)
        setListItems(newListItems)
        if (newListItems.length < 1) {
            handleFinishModalOpen()
        }
        // put item into picked items list
        const clickedItem = listItems.find(item => item.id === itemKey)
        let newPickedItems = [...pickedList, clickedItem as Item]
        setPickedList(newPickedItems)
    }

    const itemCheckUndo = (itemKey: number | undefined): void => {
        const newPickedItems = pickedList.filter(item => item.id !== itemKey)
        const clickedItem = pickedList.find(item => item.id === itemKey)
        setPickedList(newPickedItems)
        let newListItems = [...listItems, clickedItem as Item]
        setListItems(newListItems)
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
            const newListItems = [...listItems, {name: itemAddDialogValue.name, id: response.data.itemId }]
            setListItems(newListItems)
            handleAddItemModalClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const dialogNameChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value})
    }

    const handleFinishModalOpen = () => {
        setFinishModalOpen(true)
    }
    
    const handleFinishModalClose = () => {
        setFinishModalOpen(false)
    }

    const listPickingFinished = () => {
        axios.post('/items/bought/' + localStorage.getItem('userId'), {
            items: pickedList,
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        setFinishModalOpen(false)
    }

    const openItemSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        getItems()
        getCategories()
        setItemSearchOpen(true)
    }   

    return {
        listData: listData,
        items: items,
        categories: categories,
        itemAddDialogValue: itemAddDialogValue,
        itemAddModalOpen: itemAddModalOpen,
        listItems: listItems,
        pickedList: pickedList,
        finishModalOpen: finishModalOpen,
        itemSearchOpen: itemSearchOpen,
        itemAutocompleteValue: itemAutocompleteValue,
        addItemTolist: addItemToList,
        handleFinishModalOpen: handleFinishModalOpen,
        handleFinishModalClose: handleFinishModalClose,
        handleAddItemModalClose: handleAddItemModalClose,
        openItemSearch: openItemSearch,
        itemAutoCompleteValueChange: itemAutocompleteValueChange,
        dialogNameChange: dialogNameChange,
        dialogCategoryChange: dialogCategoryChange,
        getOptionLabel: getOptionLabel,
        filterOptions: filterOptions,
        itemCheckClicked: itemCheckClicked,
        itemCheckUndo: itemCheckUndo,
        getItems: getItems,
        getList: getList,
        listPickingFinished: listPickingFinished,
    }
}

export default useListView