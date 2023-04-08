import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:7500';
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') ?? '';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
