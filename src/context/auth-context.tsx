import { userInfo } from 'os'
import React,  { useReducer } from 'react'

import authReducer, { initialState } from '../reducers/auth'

export const AuthContext = React.createContext(initialState)

const AuthContextProvider = (props: any) => {

    const [state, dispatch] = useReducer(authReducer, initialState)
    

    return (
        <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider