// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

// Create a separate Home component
const Home = () => (
    <div>
        <h1>Welcome to Travel Forum</h1>
        <h2>
            <a href="/login">Login</a> | <a href="/register">Register</a>
        </h2>
    </div>
);

export default App;
