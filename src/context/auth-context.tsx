import React,  { useReducer } from 'react'

import authReducer, { initialState } from '../reducers/auth'
import {userInfo} from '../reducers/auth'

export const AuthContext = React.createContext<{state: userInfo; dispatch: React.Dispatch<any>}>(
    {
    state: initialState,
    dispatch: () => null
    }
)

const AuthContextProvider = (props: any) => {

    const [authState, dispatch] = useReducer(authReducer, initialState)   

    return (
        <AuthContext.Provider value={{state: authState, dispatch: dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider