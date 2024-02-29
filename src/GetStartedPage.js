import React from 'react';
import './GetStartedPage.css';

function GetStartedPage({ onGoogleSDKLoad, onRegisterClick }) {
  return (
    <div className="get-started-box">
      <div className="google-sign-in" ref={onGoogleSDKLoad}></div>
      <div className="register-button-container">
        <button onClick={onRegisterClick} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
}

export default GetStartedPage;
