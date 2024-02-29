// ForgotPasswordPage.js
import React, { useState } from 'react';

function ForgotPasswordPage({ onResetPassword }) {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Here you can perform the logic to handle the "Forgot Password" request
    console.log('Forgot Password for email:', email);
    // For this example, we'll just simulate sending a reset link
    const resetLink = `https://yourwebsite.com/reset-password?email=${email}`;
    onResetPassword(resetLink);
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <p>Please enter your email address below to reset your password.</p>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={handleForgotPassword}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
