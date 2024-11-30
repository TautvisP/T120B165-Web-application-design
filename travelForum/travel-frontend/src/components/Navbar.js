import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import closeSymbol from '../photos/close_symbol.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const openRegisterDialog = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const openLoginDialog = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    window.location.reload(); // Refresh the page after logging in
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setIsOpen(false);
    window.location.reload(); // Refresh the page after logging out
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Travel Forum</div>
      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {!isLoggedIn && (
          <>
            <li><button className="nav-button" onClick={() => setIsLoginOpen(true)}>Login</button></li>
            <li><button className="nav-button" onClick={() => setIsRegisterOpen(true)}>Register</button></li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/profile" className="nav-button">
                <FiUser />
              </Link>
            </li>
            <li>
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>

      {isLoginOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsLoginOpen(false)}>
              <img src={closeSymbol} alt="Close" />
            </button>
            <Login openRegisterDialog={openRegisterDialog} closeModal={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
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
    </nav>
  );
}

export default Navbar;