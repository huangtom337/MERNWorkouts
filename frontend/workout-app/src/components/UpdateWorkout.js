import useWorkoutContext from "../hooks/useWorkoutContext"
import { useState } from "react"

const UpdateWorkout = ({id}) => {

    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    
    const url = 'http://localhost:4000/api/workouts/'

    const handleUpdate = async(e) => {
        e.preventDefault()
        const workout = {title, load, reps}

        const response = await fetch(url + id, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json'
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

