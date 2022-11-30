
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Workout from './components/Workout';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <div className="pages">
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/:id' element={<Workout />}> </Route>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
