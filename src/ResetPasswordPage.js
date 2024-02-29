// ResetPasswordPage.js
import React, { useState } from 'react';

function ResetPasswordPage({ email }) {
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = () => {
    // Here you can perform the logic to handle the password reset
    console.log('Resetting password for email:', email);
    console.log('New Password:', newPassword);
    // For this example, we'll just show a success message
    alert('Password reset successful!');
  };

  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      <p>You are resetting the password for: {email}</p>
      <form>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={handleResetPassword}>Reset Password</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
