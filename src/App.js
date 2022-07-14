import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import UserDetails from './pages/UserDeatils';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path=':userId' element={<UserDetails />} />
    </Routes>
  );
}

export default App;
