import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostModal.css';
import closeSymbol from '../photos/close_symbol.svg';

const refreshToken = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh: localStorage.getItem('refresh_token'),
    });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

function CountryModal({ closeModal, onCountryCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/countries/', {
        name,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setSuccess('Country created successfully!');
      setName('');
      setDescription('');
      onCountryCreated(response.data);
      closeModal();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          handleSubmit(e);
        } else {
          setError('You must be logged in to create a country.');
        }
      } else {
        setError('Failed to create country');
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          <img src={closeSymbol} alt="Close" />
        </button>
        <h2>Create New Country</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Country Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="button-container">
            <button className="submitButton" type="submit">Submit</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
}

export default CountryModal;