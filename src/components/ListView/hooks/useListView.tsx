import React, { useCallback, useState } from 'react'

import axios from 'axios'

interface ListItems {
    id: number;
    name: string;
    categoryId?: number;
    last_bought?: Date;
    lasts?: number;
}
export type ListData = {
    id? : number;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: number;
    items?: ListItems[]
} 

const useListView = () => {

    const [listData, setListData] = useState<ListData>({})
    const [listItems, setListItems] = useState<ListItems[]>([])
    const [pickedList, setPickedList] = useState<ListItems[]>([])

    const getList = useCallback((listId: number) => {
        axios.get('http://localhost:8080/list/listdetails/' + listId)
            .then(response => {
                console.log(response.data)
                setListData(response.data)
                setListItems(response.data.items)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const itemCheckClicked = (itemKey: number): void => {
        // remove clicked item from list items
        const newListItems = listItems?.filter(item => item.id !== itemKey)
        setListItems(newListItems)
        // put item into picked items list
        const clickedItem = listItems.find(item => item.id === itemKey)
        let newPickedItems = [...pickedList, clickedItem as ListItems]
        // newPickedItems.push(clickedItem as ListItems)
        setPickedList(newPickedItems)
    }

    const itemCheckUndo = (itemKey: number): void => {
        const newPickedItems = pickedList.filter(item => item.id !== itemKey)
        const clickedItem = pickedList.find(item => item.id === itemKey)
        setPickedList(newPickedItems)
        let newListItems = [...listItems, clickedItem as ListItems]
        setListItems(newListItems)
    }

    return {
        listData: listData,
        listItems: listItems,
        pickedList: pickedList,
        itemCheckClicked: itemCheckClicked,
        itemCheckUndo: itemCheckUndo,
        getList: getList
    }
}

export default useListView