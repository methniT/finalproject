import React from 'react';

const Dashboard = ({ onSignOut }) => {
  const handleSignOut = () => {
    // Logic to sign out user
    onSignOut();
    // Redirect to the login page after signing out
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div className="dashboard">
      <h1>Welcome to BLISSMED</h1>
      <h3>Shaping the Future: Prediction at Your Fingertips</h3>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Dashboard;
