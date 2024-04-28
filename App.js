import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import GetStartedPage from './GetStartedPage'; 
import About from './About';
import HealthJournal from './HealthJournal';
import BreastCancerInfoPage from './BreastCancerInfoPage';
import Contact from './Contact';
import NextPage from './NextPage';
import NextPage2 from './NextPage2';
import Predict from './Predict';
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPassword from "./ResetPassword";
import { Route, Routes, Navigate } from "react-router-dom";
import HealthJournalPage from './HealthJournalPage';
import Predictpage from './Predictpage'; // Import the PredictPage component
import AdminDashboard from './AdminDashboard'; // Import the AdminDashboard component
import AdminLogin from './AdminLogin'; // Import the AdminDashboard component
import DeleteUser from './DeleteUser'; // Import AddUser component
import UpdateUser from './UpdateUser'; // Import AddUser component
import SearchUser from './SearchUser'; // Import AddUser component


function App() {
  // Define user state and setUser function
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <h1>Welcome to BLISSMED</h1>
        <h3>Shaping the Future: Prediction at Your Fingertips</h3>
        <Routes>
          <Route path="/GetStartedPage" element={<GetStartedPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict user={user} setUser={setUser} />} />
          <Route path="/BreastCancerInfoPage" element={<BreastCancerInfoPage />} />
          <Route path="/healthjournal" element={<HealthJournal user={user} setUser={setUser} />} />
          <Route path="/NextPage" element={<NextPage />} />
          <Route path="/NextPage2" element={<NextPage2 />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health-journal" element={<HealthJournalPage user={user} setUser={setUser} />} />
          <Route path="/predictpage" element={<Predictpage user={user} setUser={setUser} />} /> {/* Route for PredictPage */}
          <Route path="/admin-dashboard" element={<AdminDashboard user={user} setUser={setUser} />} />
          <Route path="/admin" element={<AdminLogin user={user} setUser={setUser} />} /> {/* Route for PredictPage */}
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/search-user" element={<SearchUser />} />
        </Routes>
      </div> 
    </div>
  );
}

export default App;
