import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Layout } from 'lucide-react';
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === '/') {
      // If we are already home, just scroll
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we are on /register, go home first then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <img 
            src={logo}
            alt="BookMyBite - Digital Restaurant QR Ordering System" 
            className="w-8 h-8 object-contain rounded-lg" 
            title="BookMyBite Home"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <button onClick={(e) => handleNavClick(e, 'features')} className="hover:text-blue-600 transition">Features</button>
            <button onClick={(e) => handleNavClick(e, 'how-it-works')} className="hover:text-blue-600 transition">How it Works</button>
            <button onClick={(e) => handleNavClick(e, 'pricing')} className="hover:text-blue-600 transition">Pricing</button>
            <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-4 shadow-lg">
          <button onClick={(e) => handleNavClick(e, 'features')} className="block w-full text-left text-slate-600 font-medium px-2">Features</button>
          <button onClick={(e) => handleNavClick(e, 'how-it-works')} className="block w-full text-left text-slate-600 font-medium px-2">How it Works</button>
          <button onClick={(e) => handleNavClick(e, 'pricing')} className="block w-full text-left text-slate-600 font-medium px-2">Pricing</button>
          <Link to="/register" className="block bg-blue-600 text-white px-5 py-3 rounded-xl text-center font-bold" onClick={() => setIsMenuOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;