import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop'; // Import the new utility
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      {/* 1. Reset scroll position on every navigation */}
      <ScrollToTop />
      
      <div className="min-h-screen">
        {/* 2. Persistent Navigation */}
        <Navbar />

        {/* 3. Page Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;