import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook


function HealthJournal({ user, setUser }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/update-health-status", {
        email: user.email,
        healthStatus: healthStatus,
      });
      setMessage(response.data.message);
      setHealthStatus('');
    } catch (error) {
      console.error('Error updating health status:', error);
      setMessage('Failed to update health status');
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
      history('/healthjournal'); 
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
            <h2>Please log in to update health journal details</h2>
            <p>If you haven't an account, go to Home tab an sign up first</p>
            <button onClick={handleLoginClick}>Log in</button><br></br>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="health-journal">
      <h2>Health Journal</h2>
      <div className="user-health-status">
        <h3>Your Health Status:</h3>
        <p>{userHealthStatus}</p>
      </div>
      {user ? (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              rows="15"
              placeholder="Update your health status"
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    ) : (
      <div>
        <h2>Please log in to view health journal details</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleLoginFormSubmit}>
          <input type="text" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} /><br></br>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} /><br></br>
          <button type="submit">Login</button>
        </form>
      </div>
    )}
  </div>
);
}

export default HealthJournal;
