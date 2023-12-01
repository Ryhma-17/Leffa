import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import SignUp from './components/SignUp';
import './App.css';
import './styles.css';

const Welcome = () => {
  return <p>Leffa</p>;
};

const App = () => {
  return (
    <Router>
      <div>
        <Welcome />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;