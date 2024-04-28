import React, { useState } from 'react';
import Axios from 'axios';

function DeleteUser() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send user data to backend for deletion
      const response = await Axios.delete('http://localhost:3001/delete-user', {
        data: { email: email } // Send email of the user to be deleted
      });
      
      // Handle different status codes from the server response
      if (response.status === 200) {
        setMessage(response.data.message); // Set success message
      } else if (response.status === 404) {
        setMessage(response.data.message); // Set user not found message
      } else {
        setMessage('An error occurred'); // Set generic error message
      }

      // Clear form fields after handling the response
      setEmail('');
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('An error occurred'); // Set generic error message
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <button type="submit">Delete User</button>
      </form>
      <div>{message}</div> {/* Display the response message */}
    </div>
  );
}

export default DeleteUser;
