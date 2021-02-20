import { useState } from 'react'
import suggestionsList from '../tempList'

// const suggestionReducer = (state: object, action: any) => {
//     switch (action.type) {
//         case '':
//             return { }
//     }
// }

// interface SugsInterface {
//     id: string;
//     name: string;
//     category: string;
//     lasts: number;

// }

const useSuggestions = () => {
    const [suggestions, setSuggestions] = useState(suggestionsList)

    const inputChanged = (event: any) => {
        let newSuggestions = suggestionsList
        if (event.target.value.length > 0) {
            const regex = new RegExp(`^${event.target.value}`, 'i')
            newSuggestions = suggestionsList.filter(item => regex.test(item.name))
        } 
        setSuggestions(newSuggestions)
    }

    return {
        suggestions: suggestions,
        inputChanged: inputChanged
    }
}

export default useSuggestions