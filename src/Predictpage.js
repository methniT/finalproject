import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

function Predictpage({ user, setUser }) {
  const [healthStatus, setHealthStatus] = useState('');
  const [message, setMessage] = useState('');
  const [userHealthStatus, setUserHealthStatus] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); // State to toggle login form
  const history = useNavigate(); // Initialize useHistory hook

  useEffect(() => {
    fetchUserHealthStatus();
  }, []);

  const fetchUserHealthStatus = async () => {
    try {
      const response = await Axios.get(`http://localhost:3001/get-health-status/${user.email}`);
      setUserHealthStatus(response.data.healthStatus);
    } catch (error) {
      console.error('Error fetching user health status:', error);
    }
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/login", {
        email: email, // Assuming email is used for login
        password: password,
      });
      
      const userData = response.data;
      setUser(userData.user);
      history('/predict'); 
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Invalid credentials'); // Set error message
    }
  };

  if (!user) {
    return (
      <div>
        {showLoginForm ? (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginFormSubmit}>
              <input type="text" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} /><br></br>
              <input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} /><br></br>
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div><br></br>
            <h2>Please log in to make your predictions</h2>
            <p>If you haven't an account, go to Home tab an sign up first</p><br></br>
            <button onClick={handleLoginClick}>Log in</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="predict-container">
      <h2>Prediction</h2>
      <p>Placeholder content for prediction.</p>
    </div>
  );
}

export default Predictpage;
