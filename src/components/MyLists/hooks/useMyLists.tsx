import React, { useEffect, useState } from 'react'

import axios from 'axios'

interface ListTile {
    id: number;
    createdAt?: string;
    updatedAt?: string; 
}

type MyLists = ListTile[]

const useMyLists = () => {

    const [myLists, setMyLists] = useState<MyLists>([])

    useEffect(() => {
        getLists()
    }, [])

    const getLists = () => {
        axios.get('http://localhost:8080/list/' + localStorage.getItem('userId'))
            .then(response => {
                setMyLists(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteList = (listId: number) => {
        axios.delete('http://localhost:8080/list/delete/' + listId)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        getLists()

    }

    return {
        myLists: myLists,
        deleteList: deleteList
    }
}

export default useMyLists