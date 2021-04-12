import axios from 'axios'
import { useEffect, useState } from 'react'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

export interface Item {
    id?: number;
    name: string;
    categoryId?: number;
    category?: string | Category | null;
    last_bought?: Date;
    lasts?: number;
    inputValue?: string
}

export interface Category {
    id?: number;
    name: string
    inputValue?: string;
}

interface ListItems {
    id: number,
    name: string,
    category?: string,
    lasts?: number
}

type List = Item[]

const useCreateList = () => {

    const filter = createFilterOptions<Item | Category>()

    const [list, setList] = useState<List>([])
    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState([])
    const [itemAddDialogValue, setItemAddDialogValue] = useState<Item>({ id: undefined, name: '', category: '' })
    const [itemAddModalOpen, setItemAddModalOpen] = useState<boolean>(false)
    const [itemAutocompleteValue, setItemAutocompleteValue] = useState<Item | null>(null)
    const [toggleSuggestions, setToggleSuggestions] = useState<boolean>(false)
    const [checkedSuggestions, setCheckedSuggestions] = useState<Item[]>([])

    useEffect(() => {
        getItems(localStorage.getItem('userId'))
        getCategories(localStorage.getItem('userId'))
    }, [localStorage.getItem('userId')])

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
            const newList = [...list, {name: newValue.name, id: newValue.id }]
            setList(newList)
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
            setItemAddDialogValue({...(itemAddDialogValue as Item), category: (newValue ? newValue.name : '')})
        }
    }

    const dialogNameChange = (event: React.ChangeEvent<any>) => {
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value, id: event.target.value.id })
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
        axios.post('http://localhost:8080/items/' + localStorage.getItem('userId'), {
            itemId: itemAutocompleteValue?.id,
            name: itemAddDialogValue.name,
            categoryName: itemAddDialogValue.category
        })
        .then(response => {
            const newListItems = [...list, {name: itemAddDialogValue.name, id: response.data.id }]
            setList(newListItems)
            handleAddItemModalClose()
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
        console.log(newChecked)
        setCheckedSuggestions(newChecked)
    }

    const addFromSuggestions = (item: any) => {
        const newListItems = [...list, {name: item.name, id: item.id }]
        setList(newListItems)
    }

    const removeListItem = (itemId: number | undefined) => {
        const newList = list.filter(item => {
            return item.id !== itemId
        })
        setList(newList)
    }

    const saveList = (): void => {
        axios.post('http://localhost:8080/list', {
            list: list,
            userId: localStorage.getItem('userId')
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return {
        list: list,
        items: items,
        categories: categories,
        itemAddDialogValue: itemAddDialogValue,
        itemAddModalOpen: itemAddModalOpen,
        itemAutocompleteValue: itemAutocompleteValue,
        toggleSuggestions: toggleSuggestions,
        checkedSuggestions: checkedSuggestions,
        handleAddItemModalClose: handleAddItemModalClose,
        handleSuggestionsVisible: handleSuggestionsVisible,
        itemAutocompleteValueChange: itemAutocompleteValueChange,
        dialogNameChange: dialogNameChange,
        dialogCategoryChange: dialogCategoryChange,
        getOptionLabel: getOptionLabel,
        filterOptions: filterOptions,
        getItems: getItems,
        getCategories: getCategories,
        removeListItem: removeListItem,
        addItem: addItem,
        addFromSuggestions: addFromSuggestions,
        suggestionCheckHandler: suggestionCheckHandler,
        saveList: saveList
    }
}

export default useCreateList