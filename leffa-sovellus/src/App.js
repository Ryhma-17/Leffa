import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import SignUp from './components/SignUp';
import './App.css';
import './styles.css';
import MyPage from './components/MyPage';
import GroupPage from './components/groups';
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
          <Route path="/C" element={<Home />} />
          <Route path="/moviesC" element={<Movies />} />
          <Route path="/mypageC" element={<MyPage signedIn={signedIn} setSignedIn={setSignedIn}/>} />
          <Route path="/signupC" element={<SignUp signedIn={signedIn} setSignedIn={setSignedIn} />} />
          <Route path="/groupsC" element={<GroupPage signedIn={signedIn} setSignedIn={setSignedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;