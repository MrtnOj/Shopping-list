import { useEffect, useState } from 'react'
import suggestionsList from '../components/ItemSuggest/tempList'

// const suggestionReducer = (state: object, action: any) => {
//     switch (action.type) {
//         case '':
//             return { }
//     }
// }

interface ListItems {
    searchSuggestions: {
            id: number,
            name: string,
            category?: string,
            lasts?: number
    }[];
}

const builtList: typeof suggestionsList = [
] 

const useSuggestions = () => {
    const [suggestions, setSuggestions] = useState(suggestionsList)
    const [searchSuggestions, setSearchSuggestions] = useState(suggestions)
    const [list, setList] = useState(builtList)
    const [inputValue, setInputValue] = useState('')

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

    return {
        searchSuggestions: searchSuggestions,
        suggestions: suggestions,
        list: list,
        inputValue: inputValue,
        inputChanged: inputChanged,
        clearSearchOnClick: clearSearchOnClick,
        itemClicked: itemClicked,
    }
}

export default useSuggestions