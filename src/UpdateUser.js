import React, { useState } from 'react';
import Axios from 'axios';

function UpdateUser() {
  const [email, setEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated user data to backend
      const response = await Axios.put('http://localhost:3001/update-user', {
        email: email,
        newName: newName,
        newAge: newAge
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
      setNewName('');
      setNewAge('');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('An error occurred'); // Set generic error message
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="text" placeholder="new name" value={newName} onChange={(e) => setNewName(e.target.value)} /><br />
        <input type="number" placeholder="new age" value={newAge} onChange={(e) => setNewAge(e.target.value)} /><br />
        <button type="submit">Update User</button>
      </form>
      <div>{message}</div> {/* Display the response message */}
    </div>
  );
}

export default UpdateUser;
