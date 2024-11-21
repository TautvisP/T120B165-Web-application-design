import React from 'react';
import '../styles/PostModal.css';

function PostModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Post</h2>
        <form>
          <input type="text" placeholder="Title" required />
          <textarea placeholder="Content" required></textarea>
          <button type="submit">Submit</button>
        </form>
        <button className="close-modal" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default PostModal;
