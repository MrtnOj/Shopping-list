import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { PinDropSharp } from '@material-ui/icons'

const useRegister = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [resultMessage, setResultMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRepeatPassword(event.target.value)
    }

    const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false)
    }

    const registerUser = (username: string, email: string, password: string, repeatPassword: string): void => {
        if (password === repeatPassword) {
            axios.post('http://localhost:8080/auth/signup', {
                username: username,
                email: email,
                password: password,
                confirmPassword: repeatPassword
            })
            .then(response => {
                setIsError(false)
                setAlertOpen(true)
                setResultMessage(response.data.message)
                
            })
            .catch(err => {
                setIsError(true)
                setResultMessage(err.response.data.error)
                setAlertOpen(true)
            })
        }
    }

    const submitForm = (event: any) => {
        event.preventDefault()
        registerUser(username, email, password, repeatPassword)
    }

    return {
        username: username,
        email: email,
        password: password,
        resultMessage: resultMessage,
        alertOpen: alertOpen,
        isError: isError,
        handleAlertClose: handleAlertClose,
        handleUsernameChange: handleUsernameChange,
        handleEmailChange: handleEmailChange,
        handlePasswordChange: handlePasswordChange,
        handleRepeatPasswordChange: handleRepeatPasswordChange,
        submitForm: submitForm
    }
}

export default useRegister
