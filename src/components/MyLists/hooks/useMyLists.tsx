import React, { useEffect, useState } from 'react'

import axios from 'axios'

interface ListTile {
    id: number;
    createdAt?: Date;
    updatedAt?: Date; 
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

    return {
        myLists: myLists,
    }
}

export default useMyLists