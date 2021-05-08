import React, { useEffect, useState } from 'react'

import axios from '../../../util/axiosAPI'

interface ListTile {
    id: number;
    name: string;
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
        axios.get('/list/' + localStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setMyLists(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deleteList = (listId: number) => {
        axios.delete('/list/delete/' + listId + '?userId=' + localStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            getLists()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return {
        myLists: myLists,
        deleteList: deleteList
    }
}

export default useMyLists