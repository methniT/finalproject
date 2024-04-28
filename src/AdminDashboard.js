// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2><br></br>
      <div>
        <h3>Main Options</h3>
        <ul>
          <li><Link to="/predict">Predict</Link></li>
          <li><Link to="/health-journal">Health Journal</Link></li>
          <li><Link to="/sign-out">Sign Out</Link></li>
        </ul>
      </div>
      <div>
        <h3>User Management</h3>
        <ul>
          <li><Link to="/update-user">Update User</Link></li>
          <li><Link to="/delete-user">Delete User</Link></li>
          <li><Link to="/search-user">Search User</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
