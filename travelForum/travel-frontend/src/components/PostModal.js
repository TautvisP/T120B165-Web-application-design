import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostModal.css';
import closeSymbol from '../media/close_symbol.svg';

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

function PostModal({ closeModal, countryId, onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/countries/${countryId}/posts/`, {
        title,
        content,
        author: localStorage.getItem('username'),
        country: countryId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setSuccess('Post created successfully!');
      setTitle('');
      setContent('');
      onPostCreated(response.data);
      closeModal();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          handleSubmit(e);
        } else {
          setError('You must be logged in to create a post.');
        }
      } else {
        setError('Failed to create post');
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          <img src={closeSymbol} alt="Close" />
        </button>
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <div className="button-container">
            <button className="submitButton" type="submit">Post</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
}

export default PostModal;