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

type List = ListItems[]

const useCreateList = () => {

    const filter = createFilterOptions<Item | Category>()

    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState([])
    const [itemAddDialogValue, setItemAddDialogValue] = useState<Item>({ name: '', category: '' })
    const [itemAddModalOpen, setItemAddModalOpen] = useState<boolean>(false)
    const [itemAutocompleteValue, setItemAutocompleteValue] = useState<Item | null>(null)
    const [list, setList] = useState<List>([])

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
        setItemAddDialogValue({...(itemAddDialogValue as Item), name: event.target.value})
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
        setItemAutocompleteValue(null)

    }

    const addItem = (event: any) => {
        event.preventDefault()
        console.log(itemAddDialogValue)
        handleAddItemModalClose()
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
        itemClicked: itemClicked,
        saveList: saveList,

        items: items,
        categories: categories,
        itemAddDialogValue: itemAddDialogValue,
        itemAddModalOpen: itemAddModalOpen,
        itemAutocompleteValue: itemAutocompleteValue,
        handleAddItemModalClose: handleAddItemModalClose,
        itemAutocompleteValueChange: itemAutocompleteValueChange,
        dialogNameChange: dialogNameChange,
        dialogCategoryChange: dialogCategoryChange,
        getOptionLabel: getOptionLabel,
        filterOptions: filterOptions,
        getItems: getItems,
        getCategories: getCategories,
        addItem: addItem
    }
}

export default useCreateList