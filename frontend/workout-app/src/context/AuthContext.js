import { createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()

export const AuthContextReducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                user: action.payload
            }
        case 'LOGGED_OUT':
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

    useEffect(() => {
        //converts local storage JSON user to javascript object 
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            //update global variable
            dispatch({type: 'LOGGED_IN', payload: user})
        }
    }, [])

    // console.log('Auth state: ', state)
    return ( //using ..state because there could be more than one element in state, right now its just user we couldve just done state.user
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}