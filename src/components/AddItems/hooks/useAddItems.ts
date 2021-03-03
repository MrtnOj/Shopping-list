import React, { useEffect, useState } from 'react'

import axios from 'axios'

interface Category {
    id: number;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null; 
}

const categories = [
    {
        value: 'dairy',
        label: 'Dairy'
    },
    {
        value: 'meat',
        label: 'Meat'
    },
    {
        value: 'carbs',
        label: 'Carbs'
    },
    {
        value: 'vegetable',
        label: 'Vegetable'
    },
    {
        value: 'fruit',
        label: 'Fruit'
    },
    {
        value: 'sandwich material',
        label: 'Sandwich material'
    },
    {
        value: 'spice',
        label: 'Spice'
    }
]

const useAddItems = () => {
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getCategories();
    }, [])

    const categorySelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
        // axios.get('http://localhost:3000/categories')
        setCategory(event.target.value)
    }

    const getCategories = () => {
        axios.get('http://localhost:8080/categories')
            .then(response => {
                // const categs = response.data
                console.log(response.data)
                setCategories(response.data)
            })
    }

    const addItem = (name: string, categoryId?: number, lasts?: number) => {
        axios.post('http://localhost:8080/items', {
            name: name,
            category_id: categoryId,
            lasts: lasts
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return {
        addItem: addItem,
        categorySelect: categorySelect,
        categories: categories,
        category: category
    }
}

export default useAddItems