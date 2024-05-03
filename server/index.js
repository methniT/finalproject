const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // Import crypto for token generation
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "breastcancer",
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'blissmed.web@gmail.com', // Your email address
    pass: 'hsnd mvmv oldb ylhq', // Your email password or App Password
  },
});


//register function
app.post("/register", async (req, res) => {
    const { name, age, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
      db.query(
        "INSERT INTO userss (name, age, email, password) VALUES (?, ?, ?, ?)",
        [name, age, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Error during registration:', err);
            res.status(500).json({ message: 'Registration failed' });
          } else {
            console.log('Registration successful');
            res.status(200).json({ message: 'Registration successful' });
          }
        }
      );
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

//login function - google sign in
  app.post("/register-google", async (req, res) => {
    const { name, email } = req.body;
    try {
      // Check if the user already exists in the database
      db.query(
        "SELECT * FROM userss WHERE email = ?",
        [email],
        async (err, result) => {
          if (err) {
            console.error('Error during registration:', err);
            res.status(500).json({ message: 'Registration failed' });
          } else {
            if (result.length === 0) {
              // User does not exist, proceed with registration
              db.query(
                "INSERT INTO userss (name, email) VALUES (?, ?)",
                [name, email],
                (err, result) => {
                  if (err) {
                    console.error('Error during registration:', err);
                    res.status(500).json({ message: 'Registration failed' });
                  } else {
                    console.log('Registration successful');
                    res.status(200).json({ message: 'Registration successful' });
                  }
                }
              );
            } else {
              // User already exists
              console.log('User already exists');
              res.status(409).json({ message: 'User already exists' });
            }
          }
        }
      );
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });


// Login function - users
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  db.query(
    "SELECT * FROM userss WHERE email = ?",
    [email],
    async (err, userResults) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Login failed' });
      }

      if (userResults.length === 0) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = userResults[0];
      
      // Compare the provided password with the hashed password in the database
      try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          // Passwords match, user authenticated successfully
          console.log('Login successful');
          return res.status(200).json({ message: 'Login successful', user: user, isAdmin: false });
        } else {
          // Passwords don't match
          console.log('Invalid credentials');
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ message: 'Login failed' });
      }
    }
  );
});


// Login function - admin
app.post("/adlogin", (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    async (err, userResults) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Login failed' });
      }

      if (userResults.length === 0) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = userResults[0];
      
      // Compare the provided password with the password in the database
      if (password === user.password) {
        // Passwords match, user authenticated successfully
        console.log('Login successful');
        return res.status(200).json({ message: 'Login successful', user: user, isAdmin: false });
      } else {
        // Passwords don't match
        console.log('Invalid credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
});






// Endpoint for handling password reset requests
app.post("/forgot-password", (req, res) => {  
    const { email } = req.body;
    
    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");
    
    // Save the token in the database with the user's email
    db.query(
      "UPDATE userss SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?",
      [token, email],
      (err, result) => {
        if (err) {
          console.error('Error saving reset token:', err);
          res.status(500).json({ message: 'Error sending password reset email' });
        } else {
          // Send an email with the password reset link
          const mailOptions = {
            from: 'blissmed.web@gmail.com', // Sender address
            to: email, // Recipient address
            subject: 'Password Reset Request',
            text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.status(500).json({ message: 'Error sending password reset email' });
            } else {
              console.log('Password reset email sent:', info.response);
              res.status(200).json({ message: 'Password reset email sent' });
            }
          });
        }
      }
    );
  });


// Endpoint for resetting password
app.post("/reset-password", (req, res) => {
    const { password, confirmPassword, token } = req.body;
    
    // Validate password and confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    // Check if the token is valid and not expired
    db.query(
      "SELECT * FROM userss WHERE reset_token = ? AND reset_token_expires > NOW()",
      [token],
      (err, result) => {
        if (err) {
          console.error('Error checking reset token:', err);
          res.status(500).json({ message: 'Error resetting password' });
        } else {
          if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
          }
  
          // Update the user's password in the database
          db.query(
            "UPDATE userss SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?",
            [password, token],
            (err, result) => {
              if (err) {
                console.error('Error updating password:', err);
                res.status(500).json({ message: 'Error resetting password' });
              } else {
                console.log('Password reset successfully');
                res.status(200).json({ message: 'Password reset successfully' });
              }
            }
          );
        }
      }
    );
  });

// Add these endpoints to your existing backend code


// Endpoint for updating health status
app.post("/update-health-status", (req, res) => {
  const { email, healthStatus } = req.body;
  
  // Check if the user exists in the database
  db.query(
      "SELECT * FROM userss WHERE email = ?",
      [email],
      (err, result) => {
          if (err) {
              console.error('Error selecting user from database:', err);
              return res.status(500).json({ message: 'Failed to update health status' });
          } else {
              if (result.length === 0) {
                  // User not found
                  return res.status(404).json({ message: 'User not found' });
              } else {
                  // User found, update the health status
const email = result[0].email;
db.query(
    "UPDATE userss SET health_status = ? WHERE email = ?",
    [healthStatus, email],
    (err, _updateResult) => { // Renamed 'result' to 'updateResult'
         if (err) {
                    console.error('Error updating health status:', err);
                    return res.status(500).json({ message: 'Failed to update health status' });
            } else {
                    console.log('Health status updated successfully for user:', userId);
                     return res.status(200).json({ message: 'Health status updated successfully' });
                    }
                  }
                );
              }
          }
      }
  );
});

// Endpoint for handling contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Send an email with the contact form details
  const mailOptions = {
    from: email, // Sender address (your email address)
    to: 'blissmed.web@gmail.com', // Recipient address (your email address or any other recipient email address)
    subject: 'Contact Form Submission',
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    replyTo: email // Reply-to address (sender's email address)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending contact form submission email' });
    } else {
      console.log('Contact form submission email sent:', info.response);
      // Respond with a success message
      res.status(200).json({ message: 'Message received successfully. We will get back to you soon.' });
    }
  });
});

// Modify the Predict endpoint to include email sending logic
app.post("/predict", async (req, res) => {
  const { email, prediction } = req.body;

  // Create email message
  const mailOptions = {
    from: 'blissmed.web@gmail.com',
    to: email,
    subject: 'Breast Cancer Prediction Result',
    html: `
        <p>The result is: ${prediction}</p>
        <p>We understand that waiting for such results can be stressful. 
        Please remember that this is just a prediction and not a diagnosis. 
        Regardless of the result, there are many treatment options available, 
        and early detection is key to successful treatment. We highly recommend 
        scheduling an appointment with your healthcare provider to discuss the 
        prediction result in detail, as they can provide personalized guidance 
        and support tailored to your specific health needs.</p>
        <p> Thank you</p>
        <p> Regards,</p>
        <p> Blissmed.web</p>
    `
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    // Send response with prediction result
    res.status(200).json({ message: 'Email sent successfully', prediction: prediction });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});



app.delete('/delete-user', (req, res) => {
  const { email } = req.body;

  // Delete the user from the database based on their email
  db.query('DELETE FROM userss WHERE email = ?', email, (err, result) => {
    if (err) {
      console.error('Error deleting user from database:', err);
      res.status(500).json({ message: 'Error deleting user from database', error: err });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        console.log('User deleted from database:', result);
        res.status(200).json({ message: 'User deleted successfully' });
      }
    }
  });
});



app.put('/update-user', (req, res) => {
  const { email, newName, newAge } = req.body;

  // Update the user's name and age in the database based on their email
  db.query('UPDATE userss SET name = ?, age = ? WHERE email = ?', [newName, newAge, email], (err, result) => {
    if (err) {
      console.error('Error updating user in database:', err);
      res.status(500).json({ message: 'Error updating user in database', error: err });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        console.log('User updated in database:', result);
        res.status(200).json({ message: 'User updated successfully' });
      }
    }
  });
});


// Backend endpoint for searching a user
app.get('/search-user/:email', (req, res) => {
  const email = req.params.email;

  // Search for the user in the database based on their email
  db.query('SELECT * FROM userss WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error searching user in database:', err);
      res.status(500).json({ message: 'Error searching user in database', error: err });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const user = result[0];
        console.log('User found:', user);
        // Send only the user data without any extra wrapping
        res.status(200).json(user);
      }
    }
  });
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});