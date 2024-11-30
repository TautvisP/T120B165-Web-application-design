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

function CommentModal({ closeModal, postId, comment, onCommentCreated, onCommentUpdated }) {
  const [text, setText] = useState(comment ? comment.text : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (comment) {
      setText(comment.text);
    }
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting comment:', { text });
    try {
      const url = comment
        ? `http://127.0.0.1:8000/api/comments/${comment.id}/`
        : `http://127.0.0.1:8000/api/posts/${postId}/comments/`;
      const method = comment ? 'put' : 'post';
      console.log(`Making ${method.toUpperCase()} request to ${url}`);
      const response = await axios[method](url, {
        text,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      console.log('Response:', response.data);
      setSuccess(comment ? 'Comment updated successfully!' : 'Comment posted successfully!');
      setText('');
      if (comment) {
        onCommentUpdated(response.data);
      } else {
        onCommentCreated(response.data);
      }
      closeModal();
    } catch (err) {
      console.error('Error:', err);
      if (err.response && err.response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          handleSubmit(e);
        } else {
          setError('You must be logged in to create or edit a comment.');
        }
      } else {
        setError('Failed to create or edit comment');
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          <img src={closeSymbol} alt="Close" />
        </button>
        <h2>{comment ? 'Edit Comment' : 'Post a Comment'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              placeholder="Your comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="button-container">
            <button className="submitButton" type="submit">{comment ? 'Update' : 'Submit'}</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
}

export default CommentModal;