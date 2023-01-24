import { useState } from 'react';
import useWorkoutContext from '../hooks/useWorkoutContext';
import useAuthContext from '../hooks/userAuthContext';

const CreateWorkout = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('User not logged in');
      return;
    }

    if (!load) {
      setError('Please enter a valid load value');
      return;
    }

    if (!reps) {
      setError('Please enter a valid reps value');
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch(
      'https://workouttracker-mrde.onrender.com/api/workouts',
      {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };
  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Exercise Title:</label>
      <input
        type='text'
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        required={true}
      />

      <label>Exercise Load:</label>
      <input
        type='number'
        onChange={(e) => {
          e.target.value > 0 ? setLoad(e.target.value) : setLoad(''); // has to be positive
        }}
        value={load}
        required={true}
      />

      <label>Reps:</label>
      <input
        type='number'
        onChange={(e) => {
          e.target.value > 0 ? setReps(e.target.value) : setReps('');
        }}
        value={reps}
        required={true}
      />
      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default CreateWorkout;
