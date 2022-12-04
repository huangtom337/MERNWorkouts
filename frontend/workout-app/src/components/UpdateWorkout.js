import useWorkoutContext from "../hooks/useWorkoutContext"
import { useState } from "react"
import useAuthContext from "../hooks/userAuthContext"

const UpdateWorkout = ({id}) => {

    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const {user} = useAuthContext()


    const handleUpdate = async(e) => {
        e.preventDefault()
        console.log('logged in')
        if (!user) {
            setError('User must be logged in')
            return
        }

        const workout = {title, load, reps}
        
        const response = await fetch(`https://localhost:4000/api/workouts` + id, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            dispatch({type: 'FIND_WORKOUT', payload: json})
            console.log('workout updated')
            console.log(json)
        } else {
            setError(json.error)
        }

    }

    return (
        <form className="create" onSubmit={handleUpdate}>

            <label>Exercise Title:</label>
            <input 
                type="text" 
                onChange={(e) => {setTitle(e.target.value)}}
                value={title}   
                required={true}
            />

            <label>Exercise Load:</label>
            <input 
                type="number" 
                onChange={(e) => {setLoad(e.target.value)}}
                value={load}   
                required={true}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => {setReps(e.target.value)}}
                value={reps}   
                required={true}
            />
            <button>Update</button>
            {error && <div className='error'>{error}</div>}

        </form>
    );
}
 
export default UpdateWorkout;

