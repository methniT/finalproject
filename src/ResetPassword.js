import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to extract URL parameters
import Axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams(); // Extract the token from the URL

  useEffect(() => {
    // Optionally, you can add some validation to ensure the token is present
    if (!token) {
      console.error('Token not found in URL');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/reset-password", {
        password: password,
        confirmPassword: confirmPassword,
        token: token, // Include the token from the URL
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><br></br>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div><br></br>
<button type="submit" className="reset-password-button">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
