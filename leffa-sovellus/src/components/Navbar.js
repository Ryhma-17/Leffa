import React from 'react';
import { Link } from 'react-router-dom';
import './../styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/C">Home</Link></li>
        <li className="nav-item"><Link to="/moviesC">Movies</Link></li>
        <li className="nav-item"><Link to="/mypageC">MyPage</Link></li>
        <li className="nav-item"><Link to="/signupC">Sign Up</Link></li>
        <li className="nav-item"><Link to="/groupsC">GroupPage</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
