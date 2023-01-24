import { Link } from 'react-router-dom';
import useWorkoutContext from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAuthContext from '../hooks/userAuthContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      console.log('not logged in');
      return;
    }

    const response = await fetch(
      'https://workouttracker.pages.dev/api/workouts/' + workout._id,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className='workout-details'>
      <Link to={`${workout._id}`}>
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          <strong>Created At: </strong>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </Link>
      <span className='material-symbols-outlined' onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
