import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const AuthContextReducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED IN':
            return {
                user: action.payload
            }
        case 'LOGGED OUT':
            return {
                user: null
            }
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthContextReducer, {
        user: null
    })
    console.log('Auth state: ', state)
    return ( //using ..state because there could be more than one element in state, right now its just user we couldve just done state.user
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}