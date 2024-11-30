import React, { useState, useEffect } from 'react';
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

function EditCountryModal({ closeModal, country, onCountryUpdated }) {
  const [name, setName] = useState(country.name);
  const [description, setDescription] = useState(country.description);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (country) {
      setName(country.name);
      setDescription(country.description);
    }
  }, [country]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://127.0.0.1:8000/api/countries/${country.id}/`;
      const response = await axios.put(url, {
        name,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setSuccess('Country updated successfully!');
      onCountryUpdated(response.data);
      closeModal();
    } catch (err) {
      console.error('Error:', err);
      if (err.response && err.response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          handleSubmit(e);
        } else {
          setError('You must be logged in to edit a country.');
        }
      } else {
        setError('Failed to edit country');
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          <img src={closeSymbol} alt="Close" />
        </button>
        <h2>Edit Country</h2>
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
            <button className="submitButton" type="submit">Update</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
}

export default EditCountryModal;