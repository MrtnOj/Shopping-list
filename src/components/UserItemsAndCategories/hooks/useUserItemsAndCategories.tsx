import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Item } from '../../CreateList/hooks/useCreateList'
import { Category } from '../../CreateList/hooks/useCreateList'

const useUserItemsAndCategories = () => {
    const [tabValue, setTabValue] = useState<number>(0)
    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getItems(localStorage.getItem('userId'))
        getCategories(localStorage.getItem('userId'))
    }, [localStorage.getItem('userId')])

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue)
    }

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

    const deleteItem = (itemId: number) => {
        axios.delete('http://localhost:8080/items/' + itemId)
        .then(response => {
            console.log(response)
            getItems(localStorage.getItem('userId'))
        })
        .catch(err => {
            console.log(err)
        })
    }

    return {
        items: items,
        categories: categories,
        tabValue: tabValue,
        deleteItem: deleteItem,
        handleTabChange: handleTabChange
    }
}

export default useUserItemsAndCategories