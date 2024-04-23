import React, { useState } from 'react';
import Axios from 'axios';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:3001/contact', formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, please feel free to contact us using the form below</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name            </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div><br></br>
        <div>
          <label htmlFor="email">Email         </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div><br></br>
        <div>
          <label htmlFor="message">Message      </label>
          <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
        </div><br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
