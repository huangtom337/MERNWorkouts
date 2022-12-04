import { useState } from "react";
import useAuthContext from './userAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAuthContext(null)

    const login = async (email, password) => {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://localhost:4000/api/user/login/`, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const json = await response.json()
        setLoading(false)
        if (response.ok) {
            //save user to local storage instead of context hook
            localStorage.setItem('user', JSON.stringify(json))
            setError(null)
            dispatch({type: 'LOGGED_IN', payload: json})
        } else {
            setError(json.error)

        }
    }

    return { login, isLoading, error }
}