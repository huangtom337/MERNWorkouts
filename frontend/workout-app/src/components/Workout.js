import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWorkoutContext from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import UpdateWorkout from './UpdateWorkout';
import useAuthContext from '../hooks/userAuthContext';

const Workout = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { id } = useParams();
  const { user } = useAuthContext();

  console.log(id);
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch('http://localhost:4000/api/workouts/' + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'FIND_WORKOUT', payload: json });
      }
    };
    if (user) {
      fetchWorkout();
    }
  }, [id, dispatch, user]);

  return (
    <div className='workout-details'>
      {workouts && (
        <div className='single-workout' key={workouts[0]._id}>
          <h4>{workouts[0].title}</h4>
          <p>
            <strong>Load (kg): </strong>
            {workouts[0].load}
          </p>
          <p>
            <strong>Reps: </strong>
            {workouts[0].reps}
          </p>
          <p>
            <strong>Created At: </strong>
            {formatDistanceToNow(new Date(workouts[0].createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      )}

      <UpdateWorkout id={id} />
    </div>
  );
};

export default Workout;
