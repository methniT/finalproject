import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

function Predictpage({ user, setUser }) {
  const [email, setEmail] = useState(''); // State variable for email
  const [password, setPassword] = useState(''); // State variable for password
  const [showLoginForm, setShowLoginForm] = useState(false); // State to toggle login form
  const history = useNavigate(); // Initialize useHistory hook

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      
      // Redirect to predict page after successful login
      history('/predict'); 
    } catch (error) {
      console.error('Error during login:', error);
      // Set error message or handle login failure
    }
  };

  // Render login form if user is not logged in
  if (!user) {
    return (
      <div>
        {showLoginForm ? (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginFormSubmit}>
              {/* Login form inputs */}
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div>
            <h2>Please log in to make your predictions</h2>
            <button onClick={handleLoginClick}>Log in</button>
          </div>
        )}
      </div>
    );
  }

  // Render content for logged-in user
  return (
    <div className="predict-container">
      <h2>Prediction</h2>
      <p>Placeholder content for prediction.</p>
    </div>
  );
}

export default Predictpage;
