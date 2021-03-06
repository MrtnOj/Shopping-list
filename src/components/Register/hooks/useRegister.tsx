import React, { useEffect, useState } from 'react'

import axios from 'axios'

const useRegister = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

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

    const registerUser = (username: string, email: string, password: string, repeatPassword: string): void => {
        if (password === repeatPassword) {
            axios.post('http://localhost:8080/auth/signup', {
                username: username,
                email: email,
                password: password
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err.response.data.error)
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
        handleUsernameChange: handleUsernameChange,
        handleEmailChange: handleEmailChange,
        handlePasswordChange: handlePasswordChange,
        handleRepeatPasswordChange: handleRepeatPasswordChange,
        submitForm: submitForm
    }
}

export default useRegister
