import axios from 'axios'
import { useEffect, useState } from 'react'

interface ListItems {
            id: number,
            name: string,
            category?: string,
            lasts?: number
}

type List = ListItems[]

const useSuggestions = () => {
    const [suggestions, setSuggestions] = useState<List>([])
    const [searchSuggestions, setSearchSuggestions] = useState<List>([])
    const [list, setList] = useState<List>([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        getItems()
    }, [])

    const getItems = () => {
        axios.get('http://localhost:8080/items/' + localStorage.getItem('userId'))
        .then(response => {
            setSuggestions(response.data)
            setSearchSuggestions(response.data)
        })
    }

    const inputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value)
        let searchInputSuggestions = [...suggestions]
        if (event.target.value && event.target.value.length > 0) {
            const regex = new RegExp(`^${event.target.value}`, 'i')
            searchInputSuggestions = suggestions.filter(item => regex.test(item.name))
        }
        setSearchSuggestions(searchInputSuggestions)
    }

    const clearSearchOnClick = () => {
        document.querySelector('item-search')
        setInputValue('')
    }

    // adds item to shopping list and removes from current suggestions and clears search
    const itemClicked = (event: React.MouseEvent<HTMLLIElement>, itemKey: number): void => {
        let newList = [...list]
        let newSuggestions = [...suggestions]
        newList.push(suggestions.find(suggestion => suggestion.id === itemKey)!)
        newSuggestions = (suggestions.filter(suggestion => suggestion.id !== itemKey)!)
        setList(newList)
        setSuggestions(newSuggestions)
        setSearchSuggestions(newSuggestions)
        clearSearchOnClick()
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
        searchSuggestions: searchSuggestions,
        suggestions: suggestions,
        list: list,
        inputValue: inputValue,
        inputChanged: inputChanged,
        itemClicked: itemClicked,
        saveList: saveList
    }
}

export default useSuggestions