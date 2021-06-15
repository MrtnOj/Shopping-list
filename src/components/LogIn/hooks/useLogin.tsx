import React, { useEffect, useState,} from 'react'

import axios from '../../../util/axiosAPI'

const useLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [loginRedirect, setLoginRedirect] = useState(false)

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

    const handleRegisterSuccessMessage = (message: string) => {
        setMessage(message)
        setMessageType('success')
        setAlertOpen(true)
    }

    const userLogin = (username: string, password: string): void => {
        axios.post('/auth/login', {
            username: username,
            password: password
        })
        .then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('username', response.data.username)
            setLoginRedirect(true)
        })
        .catch(err => {
            setMessage(err.response.data.error)
            setMessageType('error')
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
        message: message,
        messageType: messageType,
        alertOpen: alertOpen,
        loginRedirect: loginRedirect,
        handleAlertClose: handleAlertClose,
        handleRegisterSuccessMessage: handleRegisterSuccessMessage,
        handleUsernameChange: handleUsernameChange,
        handlePasswordChange: handlePasswordChange,
        submitForm: submitForm
    }
}

export default useLogin