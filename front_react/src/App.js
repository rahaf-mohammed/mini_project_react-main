import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/Profile/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
       
        <Route path="/register" element={<Register />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;