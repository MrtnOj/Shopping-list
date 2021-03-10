import React, { useEffect, useState } from 'react'

import axios from 'axios'

const useLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false)
    }

    const userLogin = (username: string, password: string): void => {
        axios.post('http://localhost:8080/auth/login', {
            username: username,
            password: password
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            setErrorMessage(err.response.data.error)
            setAlertOpen(true)
        })
    }

    const submitForm = (event: any): void => {
        event.preventDefault()
        userLogin(username, password)
    }

    return {
        username: username,
        password: password,
        errorMessage: errorMessage,
        alertOpen: alertOpen,
        handleAlertClose: handleAlertClose,
        handleUsernameChange: handleUsernameChange,
        handlePasswordChange: handlePasswordChange,
        submitForm: submitForm
    }
}

export default useLogin