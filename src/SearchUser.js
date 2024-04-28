// SearchUser.js
import React, { useState } from 'react';
import Axios from 'axios';

function SearchUser() {
  const [email, setEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send search request to backend
      const response = await Axios.get(`http://localhost:3001/search-user/${email}`);
      console.log('User search successful:', response.data);
      setSearchResult(response.data); // Response directly contains the user object
      setError(null);
    } catch (error) {
      console.error('Error searching user:', error.response.data.message);
      setSearchResult(null);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Search User</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <button type="submit">Search User</button>
      </form>
      {error && <p>Error: {error}</p>}
      {searchResult && (
        <div>
          <h3>Search Result</h3>
          <p>Name: {searchResult.name}</p>
          <p>Age: {searchResult.age}</p>
          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
}

export default SearchUser;
