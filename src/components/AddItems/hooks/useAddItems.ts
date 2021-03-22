import React, { useEffect, useState } from 'react'

import axios from 'axios'

interface Category {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date; 
}

const useAddItems = () => {
    const [itemLasts, setItemLasts] = useState('')
    const [itemName, setItemName] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getCategories();
    }, [])

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setItemName(event.target.value)
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCategory(event.target.value)
    }

    const handleItemLastsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setItemLasts(event.target.value)
    }

    const getCategories = () => {
        axios.get('http://localhost:8080/categories')
            .then(response => {
                setCategories(response.data)
            })
    }

    const addItemToDB = (name: string, categoryName?: string, lasts?: number) => {
        const categoryId: number | undefined = categories.find(category => category.name === categoryName)?.id
        console.log(categoryId)
        axios.post('http://localhost:8080/items', {
            name: name,
            categoryId: categoryId,
            lasts: lasts
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const submitItem = () => {
        addItemToDB(itemName, category, +itemLasts)
    }

    return {
        submitItem,
        handleCategoryChange: handleCategoryChange,
        handleNameChange: handleNameChange,
        handleItemLastsChange: handleItemLastsChange,
        itemName: itemName,
        category: category,
        categories: categories,
        itemLasts: itemLasts
    }
}

export default useAddItems