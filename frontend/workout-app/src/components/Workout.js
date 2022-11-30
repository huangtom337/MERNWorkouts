import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useWorkoutContext from "../hooks/useWorkoutContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateWorkout from "./UpdateWorkout";

const Workout = () => {
    const { workouts, dispatch } = useWorkoutContext()
    const { id } = useParams()
    const url = 'http://localhost:4000/api/workouts/'



    useEffect(() => {
        
        const fetchWorkout = async() => {
           
            const response = await fetch(url + id)
            const json = await response.json()
       
            if (response.ok) {
                dispatch({type: 'FIND_WORKOUT', payload: json})
            }
        
        }
        fetchWorkout()
        
    },[id, url, dispatch])



    return (
        <div className="workout-details"> 
            {workouts && <div className="single-workout" key={workouts[0]._id}>
                <h4>{workouts[0].title}</h4>
                <p><strong>Load (kg): </strong>{workouts[0].load}</p>
                <p><strong>Reps: </strong>{workouts[0].reps}</p>
                <p><strong>Created At: </strong>{formatDistanceToNow(new Date(workouts[0].createdAt), { addSuffix: true })}</p>
            </div>}
            
            <UpdateWorkout id={id}/>
        </div>
    );
}
 
export default Workout;