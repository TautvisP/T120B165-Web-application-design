import React, { useState } from 'react';
import '../styles/Navbar.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import closeSymbol from '../media/close_symbol.svg'; // Import the SVG file

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegisterDialog = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const openLoginDialog = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-logo">Travel Forum</div>
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><button className="nav-button" onClick={() => setIsLoginOpen(true)}>Login</button></li>
          <li><button className="nav-button" onClick={() => setIsRegisterOpen(true)}>Register</button></li>
        </ul>
      </nav>

      {isLoginOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsLoginOpen(false)}>
              <img src={closeSymbol} alt="Close" />
            </button>
            <Login openRegisterDialog={openRegisterDialog} />
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsRegisterOpen(false)}>
              <img src={closeSymbol} alt="Close" />
            </button>
            <Register openLoginDialog={openLoginDialog} />
          </div>
        </div>
      )}
    </Router>
  );
}

export default Navbar;