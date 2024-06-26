import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

function HealthJournalPage({ user, setUser }) {
    const [healthStatus, setHealthStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/update-health-status", {
        email: user.email,
        healthStatus: healthStatus,
      });
      console.log(response.data); // Log response data
      setMessage(response.data.message); // Display success message
      setHealthStatus(''); // Clear healthStatus state
    } catch (error) {
      console.error('Error updating health status:', error);
      setMessage('Failed to update health status'); // Display error message
    }
  };

  const handleSignOut = () => {
    // Your sign out logic goes here
    console.log('Sign out logic goes here');
  };

  return (
    <div className="health-journal">
      <h2>Health Journal</h2>
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
      <button onClick={handleSignOut} className="signout">Sign out</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default HealthJournalPage;
