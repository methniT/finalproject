// App.js
import React from 'react';
import './App.css';
import NavBar from './NavBar';
import GetStartedPage from './GetStartedPage'; 
import About from './About';
import HealthJournal from './HealthJournal';
import BreastCancerInfoPage from './BreastCancerInfoPage';
import Predict from './Predict';
import Contact from './Contact';
import NextPage from './NextPage';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
          <h1>Welcome to BLISSMED</h1>
          <h3>Shaping the Future: Prediction at Your Fingertips</h3>
        <Routes>
          <Route path="/GetStartedPage" element={<GetStartedPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/BreastCancerInfoPage" element={<BreastCancerInfoPage />} />
          <Route path="/NextPage" element={<NextPage />} />
          <Route path="/healthjournal" element={<HealthJournal />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </div> 
    </div>
    
  );
}

export default App;