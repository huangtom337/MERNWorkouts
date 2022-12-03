import useAuthContext from "./userAuthContext"
import useWorkoutContext from "./useWorkoutContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutDispatch } = useWorkoutContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGGED_OUT'})
        workoutDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}

}