import React from 'react';
import NavBar from './components/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/screens/Home';
import Signin from './components/screens/SignIn';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
