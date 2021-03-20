import React, { useReducer, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../../context/auth-context'
import authReducer, { initialState } from '../../../reducers/auth'


import axios from 'axios'

const useLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [loginRedirect, setLoginRedirect] = useState(false)

    // const [authState, dispatch] = useReducer(authReducer, initialState)
    const {state, dispatch} = useContext(AuthContext)

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
        dispatch( { type: 'LOGIN_START' } )
        axios.post('http://localhost:8080/auth/login', {
            username: username,
            password: password
        })
        .then(response => {
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('username', response.data.username)
            dispatch({ 
                type: 'LOGIN_SUCCESS',
                userId: response.data.userId,
                token: response.data.token,
                username: response.data.username 
            })
            setLoginRedirect(true)
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
        loginRedirect: loginRedirect,
        handleAlertClose: handleAlertClose,
        handleUsernameChange: handleUsernameChange,
        handlePasswordChange: handlePasswordChange,
        submitForm: submitForm
    }
}

export default useLogin