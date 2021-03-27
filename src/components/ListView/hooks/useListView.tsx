import React, { useCallback, useState } from 'react'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

import axios from 'axios'

export interface Item {
    id?: number;
    name: string;
    categoryId?: number;
    category?: string;
    last_bought?: Date;
    lasts?: number;
    inputValue?: string
}

export type ListData = {
    id? : number;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: number;
    items?: Item[]
} 

const useListView = () => {

    const filter = createFilterOptions<Item>()

    const [listData, setListData] = useState<ListData>({})
    const [items, setItems] = useState<Item[]>([])
    const [itemAddDialogValue, setItemAddDialogValue] = useState<Item>({name: '', category: ''})
    const [listItems, setListItems] = useState<Item[]>([])
    const [pickedList, setPickedList] = useState<Item[]>([])
    const [finishModalOpen, setFinishModalOpen] = useState<boolean>(false)
    const [itemAddModalOpen, setItemAddModalOpen] = useState<boolean>(false)
    const [itemSearchOpen, setItemSearchOpen] = useState<boolean>(false)
    const [autocompleteValue, setAutocompleteValue] = useState<Item | null>(null)

    const getList = useCallback((listId: number) => {
        axios.get('http://localhost:8080/list/listdetails/' + listId)
            .then(response => {
                setListData(response.data)
                setListItems(response.data.items)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getItems = () => {
        axios.get('http://localhost:8080/items')
        .then(response => {
            setItems(response.data)
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

    const autocompleteValueChange = (event: React.ChangeEvent<any>, newValue: Item | string) => {
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
            setAutocompleteValue(newValue);
        }
        console.log(newValue)
    }

    const filterOptions = (options: Item[], params: any) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`
          })
        }
        return filtered
    }

    const getOptionLabel = (option: Item) => {
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
    }

    const addItemToList = (event: any) => {
        event.preventDefault()
        axios.post('http://localhost:8080/list/add/' + listData.id, {
            itemId: autocompleteValue?.id,
            name: itemAddDialogValue.name,
            category: itemAddDialogValue.category
        })
        .then(response => {
            console.log(response)
            setItemSearchOpen(false)
            setItemAddModalOpen(false)
            getList(listData.id as number)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const dialogNameChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value})
    }

    const dialogCategoryChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), category: event.target.value})
    }

    const handleFinishModalOpen = () => {
        setFinishModalOpen(true);
    }
    
    const handleFinishModalClose = () => {
        setFinishModalOpen(false);
    }

    const openItemSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        getItems()
        setItemSearchOpen(true)
    }

    const handleItemSearchClose = () => {
        setItemSearchOpen(false)
    }
    

    return {
        listData: listData,
        items: items,
        itemAddDialogValue: itemAddDialogValue,
        itemAddModalOpen: itemAddModalOpen,
        listItems: listItems,
        pickedList: pickedList,
        finishModalOpen: finishModalOpen,
        itemSearchOpen: itemSearchOpen,
        autocompleteValue: autocompleteValue,
        addItemTolist: addItemToList,
        handleFinishModalOpen: handleFinishModalOpen,
        handleFinishModalClose: handleFinishModalClose,
        handleItemSearchClose: handleItemSearchClose,
        openItemSearch: openItemSearch,
        autoCompleteValueChange: autocompleteValueChange,
        handleAddItemModalClose: handleAddItemModalClose,
        dialogNameChange: dialogNameChange,
        dialogCategoryChange: dialogCategoryChange,
        getOptionLabel: getOptionLabel,
        filterOptions: filterOptions,
        itemCheckClicked: itemCheckClicked,
        itemCheckUndo: itemCheckUndo,
        getItems: getItems,
        getList: getList
    }
}

export default useListView