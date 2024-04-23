import './GetStartedPage.css';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import NextPage2 from './NextPage2';
import HealthJournal from './HealthJournal';
import Predict from './Predict';
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPassword from "./ResetPassword";
import NextPage from './NextPage';



function GetStartedPage({ onGoogleSDKLoad, onRegisterClick }) {
  const [user, setUser] = useState(null);
  const [showGoogleOptions, setShowGoogleOptions] = useState(false);
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);
  const [showHealthJournal, setShowHealthJournal] = useState(false);
  const [showPredict, setShowPredict] = useState(false);
  const [showForgotPasswordPage, setShowForgotPasswordPage] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showNextPage2, setShowNextPage2] = useState(false);

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
    setShowRegisterPage(false);
    setShowLoginPage(true); // Show the login page after registering
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

  function handleSubmit() {
    setShowHealthJournal(true);
  }

  function handlePredict() {
    setShowPredict(true);
  }

  function handleHealthJournal() {
    setUser(false);
    setShowHealthJournal(true); // Toggle the showHealthJournal state
  }

  function handleNextPage() {
    setShowNextPage(true); 
  }

  function handleNextPage2() {
    setShowNextPage2(true); 
  }

  function handleForgotPasswordPage() {
    setShowForgotPasswordPage(true); 
  }

  function handleResetPassword() {
    setShowResetPassword(true); 
  }

  return (
    <div className="content">
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
          <button onClick={handlePredict} className="Predict">Predict</button><br></br>
          <button onClick={handleHealthJournal} className="Health Journal">Health Journal</button><br></br>
          <button onClick={handleSignOut} className="signout">Sign out</button><br></br>
        </div>
      )}

      {showRegisterPage && (
        <RegisterPage onRegister={handleRegister} onBack={handleBack} />
      )}

      {showLoginPage && (
        <LoginPage onLogin={handleLogin} onBack={handleBack}/>
      )}

      {showHealthJournal && (
        <HealthJournal onLogin={handleLogin} onSubmit={handleSubmit}/>
      )}

      {showNextPage && <NextPage onNextPage={handleNextPage} />}
        
      {showNextPage2 && <NextPage2 onNextPage={handleNextPage2} />}

      {showPredict && <Predict onSignOut={handlePredict} />}

      {showForgotPasswordPage && <ForgotPasswordPage onNextPage={handleForgotPasswordPage} />}

      {showResetPassword && <ResetPassword onNextPage={handleResetPassword} />}
    </div>
  );
}

export default GetStartedPage;
