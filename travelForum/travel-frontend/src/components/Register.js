import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ openLoginDialog }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', {
                username,
                password
            });
            setSuccess('User registered successfully!');
            setUsername('');
            setPassword('');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="">
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className="button-container">
                    <button className="submitButton" type="submit">Register</button>
                </div>
            </form>
            <p className="textas">Already have an account? <button onClick={openLoginDialog} className="link-button">Log in</button></p>
        </div>
    );
};

export default Register;