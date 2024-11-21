import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ openRegisterDialog }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage('Login failed. Please check your credentials.');
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button className="submitButton" type="submit">Log in</button>
                </div>
            </form>
            <p>Don't have an account? <button onClick={openRegisterDialog} className="link-button">Register</button></p>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;