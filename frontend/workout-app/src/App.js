import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Workout from './components/Workout';
import Workouts from './pages/Workouts';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import useAuthContext from './hooks/userAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/workouts'
              element={user ? <Workouts /> : <Navigate to='/' />}
            />
            <Route
              path='/workouts/:id'
              element={user ? <Workout /> : <Navigate to='/workouts' />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/workouts' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/workouts' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
