import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import React, { useContext } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Details from './pages/Details.Page';
import AuthContext from './context/AuthContext';

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

function App() {
  const { user } = useContext(AuthContext);

  return (
    <React.Fragment>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/:id' element={user ? <Details /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
