import { createContext, useReducer } from 'react'


export const WorkoutsContext = createContext()

//state is previous(or current)state
export const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS': 
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] 
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(workout => workout._id!==action.payload._id)
            }
        case 'FIND_WORKOUT':
            return {
                workouts: [action.payload]
            }
        case 'UPDATE_WORKOUT':
            return {
                workouts: [action.payload]
            }
        default:
            return state
    }
}

//children of whatever this component wraps, which is <App /> in index.js
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })

    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}