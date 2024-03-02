import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import NavBar from './NavBar';

function App() {
  const [user, setUser] = useState(null);
  const [showGoogleOptions, setShowGoogleOptions] = useState(false);
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);

  useEffect(() => {
    const loadGoogleSDK = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: "5908036240-v4p3m3gutb2qke67g59it9limrcqlp47.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    loadGoogleSDK();
  }, []);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log("Decoded User Object: ", userObject);
    setUser(userObject);
    setShowGoogleOptions(false);
  }

  function handleSignOut() {
    setUser(null);
    setShowGoogleOptions(false);
  }

  function handleSignInClick() {
    window.google.accounts.id.prompt();
  }

  function handleRegister(user) {
    console.log("Registering user:", user);
    setUser(user);
    setShowRegisterPage(false);
  }

  function handleLogin(user) {
    console.log("Logging in user:", user);
    setUser(user);
    setShowLoginPage(false);
  }

  function handleBack() {
    setShowLoginPage(false);
    setShowRegisterPage(false);
  }

  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <h1>Welcome to BLISSMED</h1>
        <h3>Shaping the Future : Prediction at Your Fingertips</h3>

        {/* Conditional rendering based on user state */}
        {!user && !showRegisterPage && !showLoginPage && (
          <div className="auth-options">
            <p>Sign in with your Google account</p>
            {!showGoogleOptions && (
              <button onClick={handleSignInClick} className="google-signin">Sign in with Google</button>
            )}
            {showGoogleOptions && (
              <div id="signInDiv"></div>
            )}
            <h4>or register to get started</h4>
            <button onClick={() => setShowRegisterPage(true)} className="register">Sign up</button>
            <h4>Already have an account?</h4>
            <button onClick={() => setShowLoginPage(true)} className="login">Sign in</button>
          </div>
        )}

        {user && (
          <div className="user-info">
            <img src={user.picture} alt="User" />
            <h3>Hello, {user.name}</h3>
            <p>Email Address: {user.email}</p>
            <button onClick={handleSignOut} className="signout">Sign out</button>
            <button onClick={handleSignOut} className="dashboard">Dashboard</button>
          </div>
        )}

        {showRegisterPage && (
          <RegisterPage onRegister={handleRegister} onBack={handleBack} />
        )}

        {showLoginPage && (
          <LoginPage onLogin={handleLogin} onBack={handleBack}/>
        )}

        {/* Additional content for when user is logged in */}
        {user && (
          <div>
            {/* Your content for logged-in users */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
