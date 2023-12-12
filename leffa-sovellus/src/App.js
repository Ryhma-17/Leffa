import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import SignUp from './components/SignUp';
import './App.css';
import './styles.css';
import MyPage from './components/MyPage';

const Welcome = () => {
  return <p></p>;
};

const App = () => {
  const [signedIn, setSignedIn] = useState(() => { 
    
    const storedValue = localStorage.getItem('signedIn');

    return storedValue ? JSON.parse(storedValue) : false;
  });


  return (
    <Router>
      <div>
        <Welcome />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/mypage" element={<MyPage signedIn={signedIn} setSignedIn={setSignedIn}/>} />
          <Route path="/signup" element={<SignUp signedIn={signedIn} setSignedIn={setSignedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;