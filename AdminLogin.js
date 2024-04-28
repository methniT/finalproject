// AdminLogin.js
import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginPage.css'; // Corrected import statement for CSS file

function AdminLogin({ setUser }) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); // State to toggle login form
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/adlogin", {
        email: email,
        password: password,
      });
      
      const userData = response.data;
      setUser(userData.user);
      navigate('/admin-dashboard'); // Corrected usage to navigate to admin dashboard after successful login
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Invalid credentials'); // Set error message
    }
  };

  return (
    <div>
      {showLoginForm ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLoginFormSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>} {/* Display error message */}
        </div>
      ) : (
        <div>
          <h2>Administration Login</h2>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      )}
    </div>
  );
}

export default AdminLogin;
