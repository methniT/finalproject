import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function HealthJournal({ user }) {
  const [healthStatus, setHealthStatus] = useState('');
  const [message, setMessage] = useState('');
  const [userHealthStatus, setUserHealthStatus] = useState('');

  useEffect(() => {
    fetchUserHealthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.log(response.data); // Log response data
      setMessage(response.data.message); // Display success message
      setHealthStatus(''); // Clear healthStatus state
    } catch (error) {
      console.error('Error updating health status:', error);
      setMessage('Failed to update health status'); // Display error message
    }
  };

  return (
    <div className="health-journal">
      <h2>Health Journal</h2>
      <div className="user-health-status">
        <h3>Your Health Status:</h3>
        <p>{userHealthStatus}</p>
      </div>
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
  );
}

export default HealthJournal;
