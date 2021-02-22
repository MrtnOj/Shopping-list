import { useEffect, useState } from 'react'
import suggestionsList from '../components/ItemSuggest/tempList'

// const suggestionReducer = (state: object, action: any) => {
//     switch (action.type) {
//         case '':
//             return { }
//     }
// }

const builtList: any = [
] 

const useSuggestions = () => {
    const [suggestions, setSuggestions] = useState(suggestionsList)
    const [searchSuggestions, setSearchSuggestions] = useState(suggestions)
    const [list, setList] = useState(builtList)
    const [inputValue, setInputValue] = useState('')

    const inputChanged = (event: any) => {
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
    const itemClicked = (event: any, itemKey: any, ref: any) => {
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