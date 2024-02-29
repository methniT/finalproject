// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/breast-cancer-info">Breast Cancer Info</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default NavBar;
