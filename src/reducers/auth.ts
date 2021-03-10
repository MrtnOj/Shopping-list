import React, { useReducer } from 'react'

export interface userInfo  {
    isAuth: boolean,
    userId: number | null,
    token: string | null,
    username: string | null,
}

type Actions = 
    | { type: 'LOGIN';
        username: string;
        password: string;
        }
    | { type: 'LOGOUT';
        }
    | { type: 'REGISTER';
        username: string;
        email: string;
        password: string;
        repeatPassword: string;
        }

export const initialState: userInfo = {
    isAuth: false,
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

const authReducer = (currentState: userInfo | null, action: Actions) => {
    switch (action.type) {
        case ActionTypes.LOGIN_START:
            return { }
        case ActionTypes.LOGIN_SUCCESS:
            return { isAuth: true, userId: action.userId, token: action.token, username: action.username }
        case ActionTypes.LOGOUT:
            return initialState
        default:
            return initialState
    }
}

export default authReducer