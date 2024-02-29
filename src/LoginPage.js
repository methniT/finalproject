import React, { useState } from 'react';

function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your login logic
    onLogin({ email, password });
  };

  return (
    <div className="loginpage">
      <form action="">

     
      <h2>Sign in Page</h2><br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Username" required/>
        </div><br></br>

        <div className="form-group">
        <input type="password" placeholder="Password" required/>
        </div><br></br>

        <div className="remember-forgot">
          <label><input type="checkbox"/> Remember me </label>
          <a href="#"><p>Forgot Password?</p></a>
        </div>

        <div className="buttons">
          <button type="submit">Sign in</button><br></br>
          <button type="button" onClick={onBack}>Back</button>
        </div>
      </form>
      </form>
    </div>
  );
}

export default LoginPage;
