import React, { useState } from 'react';

function RegisterPage({ onRegister , onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your registration logic
    onRegister({ email, password });
  };

  return (
    <div className="register-page">
      <h2>Sign up Page</h2><br></br>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input type="text" placeholder="Name" required/>
        </div><br></br>

        <div className="form-group">
          <input type="text" placeholder="Age" required/>
        </div><br></br>

        <div className="form-group">
          <input type="text" placeholder="Username" required/>
        </div><br></br>

        <div className="form-group">
        <input type="password" placeholder="Password" required/>
        </div><br></br>

        <button type="submit">Sign up</button><br></br>
        <button type="button" onClick={onBack}>Back</button>
      </form>
    </div>
  );
}

export default RegisterPage;
