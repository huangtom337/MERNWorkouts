import { useEffect } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/userAuthContext";

//components
import CreateWorkout from "../components/CreateWorkout";
import WorkoutDetails from "../components/WorkoutDetails";

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

 

    useEffect(() => {
        const fetchWorkout = async() => {
            
            const response = await fetch('http://localhost:4000/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            } else {
                console.log(json.error)
            }
        }

        if (user) {
            
            fetchWorkout()
        }

    }, [dispatch, user]) //dispatch is not a dependency to avoid fetching again for changes, instead we update locally 

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails workout={workout} key={workout._id}/>
                ))}
            </div>
            <CreateWorkout />
        </div>
    );
}
 
export default Home;