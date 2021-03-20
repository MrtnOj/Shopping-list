import React, { useReducer } from 'react'

export interface userInfo  {
    isAuth: boolean;
    isLoading: boolean;
    userId: number | null;
    token: string | null;
    username: string | null;
}

type Action = 
    { type: 'LOGIN_START' }
    | {
        type: 'LOGIN_SUCCESS';
        username: string;
        isAuth: boolean;
        userId: number | null;
        token: string | null;
    }
    | { type: 'LOGOUT' }
    // | { type: 'REGISTER_START';
    //     username: string;
    //     email: string;
    //     password: string;
    //     repeatPassword: string;
    //     }

export const initialState: userInfo = {
    isAuth: false,
    isLoading: false,
    userId: null,
    token: null,
    username: null
}

export const ActionTypes = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS'

}

export type Reducer<userInfo, Action> =
    (state: userInfo, action: Action) => userInfo

const authReducer = (state: userInfo, action: Action): userInfo => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true }
        case 'LOGIN_SUCCESS':
            return { ...state, isAuth: true, userId: action.userId, token: action.token, username: action.username }
        case 'LOGOUT':
            return initialState
        default:
            return initialState
    }
}

export default authReducer