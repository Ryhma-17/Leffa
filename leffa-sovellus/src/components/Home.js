// HomePage.js

import React from 'react';
 // Assuming you have a Header component
import './../styles.css';

const HomePage = () => {
  return (
    <div>
      <div className="movie-list">
      <h1 className="header">Welcome to LEFFA</h1>
        {/* Add your movie list or other content here */}
      </div>
      <footer className="footer">
        <p>&copy; 2023 Your Movie App</p>
      </footer>
    </div>
  );
};

export default HomePage;
