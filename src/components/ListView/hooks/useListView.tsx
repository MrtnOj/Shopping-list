import React, { useCallback, useState } from 'react'

import axios from 'axios'

interface ListTile {
    id: number;
    createdAt?: Date;
    updatedAt?: Date; 
}

type MyLists = ListTile[]

const useListView = () => {

    const [listData, setListData] = useState<MyLists>([])

    const getList = useCallback((listId: number) => {
        axios.get('http://localhost:8080/list/listdetails/' + listId)
            .then(response => {
                console.log(response.data)
                setListData(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return {
        listData: listData,
        getList: getList
    }
}

export default useListView