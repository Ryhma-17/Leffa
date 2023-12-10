import React from 'react';
import { Link } from 'react-router-dom';
import './../styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/movies">Movies</Link></li>
        <li claasName="nav-item"><Link to="/mypage">MyPage</Link></li>
        <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
