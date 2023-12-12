import React, { useState, useEffect } from 'react';
import './../styles.css';
import './../App.js';

const SignUp = ({ signedIn, setSignedIn }) => {
  const [signupformData, setSignupFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loginformData, setLoginFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    console.log('signedIn is:', signedIn);
    localStorage.setItem('signedIn', JSON.stringify(signedIn));
  }, [signedIn]);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupformData),
      });
  
      if (response.ok) {
        // Sign up onnistui
        const data = await response.json();
        console.log('Sign Up successful:', data);
  
        // Update signedIn state
        setSignedIn(true);
      } else {
        // Sign up error
        const errorData = await response.json();
        console.error('Sign Up failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during sign-up:', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginformData),
      });

      if (response.ok) {
        // Login onnistui
        const { message, token } = await response.json();
        console.log('Login successful:', message);

        // Säilytetään token localStorage:ssa
        localStorage.setItem('token', token);

        // Päivitetään signedIn tila
        setSignedIn(true);
      } else {
        // Login error
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  // Ternarylla tarkistetaan onko käyttäjä kirjautunut sisään
  return (
    signedIn ? (
      <div className="login-container">
        <div className="login-form">
        <form>
          <label>
            Username:
            <input
              type="text"
              name='username'
              value={loginformData.username}
              onChange={handleLoginChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name='password'
              value={loginformData.password}
              onChange={handleLoginChange}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <br />
          <button type="button" onClick={() => setSignedIn(false)}>
            Dont have an account?
          </button>
        </form>
        </div>
      </div>
    ) : (
      <div className="signup-container">
        <div className="signup-form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={signupformData.username}
                onChange={handleSignupChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={signupformData.email}
                onChange={handleSignupChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={signupformData.password}
                onChange={handleSignupChange}
              />
            </label>
            <button type="submit">Sign Up</button>
            <button type="button" onClick={() => setSignedIn(true)}>
            Already have an account?
          </button>
          </form>
          
        </div>
      </div>
    )
  );
};

export default SignUp;
