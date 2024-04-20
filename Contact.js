import React from 'react';

function ContactUs() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, please feel free to contact us using the form below:</p>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required /><br></br><br></br>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required /><br></br><br></br>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea><br></br><br></br>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
