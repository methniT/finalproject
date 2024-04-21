import React, { useState } from 'react';
import Axios from 'axios';

function RegisterPage({ onRegister, onBack }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/register", {
        name: name,
        age: age,
        email: email,
        password: password,
      });
      console.log(response.data); // Log response data
      onRegister(response.data); // Call onRegister function with response data
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-page">
      <h2>Sign up Page</h2><br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
        </div><br></br>
        <div className="form-group">
          <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required/>
        </div><br></br>
        <div className="form-group">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div><br></br>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div><br></br>
        <button type="submit">Sign up</button>
        <button type="button" onClick={onBack}>Back</button>
      </form>
    </div>
  );
}

export default RegisterPage;
