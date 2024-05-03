import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function LoginPage({ onLogin, onBack }) {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      console.log(response.data); // Log response data
      const user = {
        ...response.data,
        email: email, // Include the email address in the user object
      };
      onLogin(user); // Call onLogin function with updated user object
      setLoginStatus('Login successful'); // Set login status message
      setError(''); // Clear error message if present
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials'); // Set error message if login fails
      setLoginStatus('Login failed'); // Set login status message
    }
  };

  // Function to handle checkbox change
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Function to load remember me state, email, and password from local storage on component mount
  useEffect(() => {
    const rememberMeState = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMeState);
    if (rememberMeState) {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
    }
  }, []);

  // Function to save remember me state, email, and password to local storage when remember me checkbox changes
  useEffect(() => {
    localStorage.setItem('rememberMe', rememberMe);
    if (!rememberMe) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    } else {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  }, [rememberMe, email, password]);

  // Effect to clear login status after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoginStatus('');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [loginStatus]);

  return (
    <div className="loginpage">
      <h2>Sign in Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {loginStatus && <div className="login-status">{loginStatus}</div>}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} /> Remember me
          </label>
          <Link to="/forgot-password"><p>Forgot Password?</p></Link>
        </div>
        <div className="buttons">
          <button type="submit">Sign in</button>
          <button type="button" onClick={onBack}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
