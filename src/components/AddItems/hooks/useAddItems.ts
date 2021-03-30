import React, { useEffect, useState } from 'react'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'

import axios from 'axios'

interface Category {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    inputValue?: string; 
}

const filter = createFilterOptions<Category>()

const useAddItems = () => {
    const [itemLasts, setItemLasts] = useState('')
    const [itemName, setItemName] = useState('')
    const [category, setCategory] = useState<Category | null | string>(null)
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getCategories();
    }, [])

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setItemName(event.target.value)
    }

    const handleCategoryChange = (event: React.ChangeEvent<any>, newValue: Category | null | string) => {
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setCategory({ name: newValue })
            })
        } else if (newValue && newValue.inputValue) {
            setCategory({ name: newValue.inputValue })
        } else {
            setCategory(newValue)
        }
    }

    const filterOptions = (options: Category[], params: any) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`
          })
        }
        return filtered
    }

    const getOptionLabel = (option: Category) => {
        if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
    }

    const handleItemLastsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setItemLasts(event.target.value)
    }

    const getCategories = () => {
        axios.get('http://localhost:8080/categories/' + localStorage.getItem('userId'))
            .then(response => {
                setCategories(response.data)
            })
    }

    const addItemToDB = (name: string, category?: Category | null | string, lasts?: string) => {
        axios.post('http://localhost:8080/items/' + localStorage.getItem('userId'), {
            name: name,
            categoryId: (category as Category)?.id,
            categoryName: (category as Category)?.name,
            lasts: (lasts !== '' ? lasts : null)
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const submitItem = (event: any) => {
        event.preventDefault()
        addItemToDB(itemName, category, itemLasts)
    }

    return {
        submitItem,
        handleCategoryChange: handleCategoryChange,
        handleNameChange: handleNameChange,
        handleItemLastsChange: handleItemLastsChange,
        filterOptions: filterOptions,
        getOptionLabel: getOptionLabel,
        itemName: itemName,
        category: category,
        categories: categories,
        itemLasts: itemLasts
    }
}

export default useAddItems