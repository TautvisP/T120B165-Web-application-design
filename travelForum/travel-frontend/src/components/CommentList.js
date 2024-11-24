import React, { useState } from 'react';
import '../styles/CommentList.css';
import userSymbol from '../media/profile-circle.svg';
import CommentModal from './CommentModal';
import axios from 'axios';

function CommentList({ comments, onCommentUpdated, onCommentDeleted }) {
  const currentUser = localStorage.getItem('username');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleEditClick = (comment) => {
    setSelectedComment(comment);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (commentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      onCommentDeleted(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCommentUpdated = (updatedComment) => {
    onCommentUpdated(updatedComment);
    setIsEditModalOpen(false);
  };

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <div className="comment-header">
            <img src={userSymbol} alt="User" className="user-icon" />
            <h4>{comment.author}</h4>
          </div>
          <p>{comment.text}</p>
          <small>{new Date(comment.created_at).toLocaleString()}</small>
          {comment.author === currentUser && (
            <>
              <button className="edit-button" onClick={() => handleEditClick(comment)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteClick(comment.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      {isEditModalOpen && selectedComment && (
        <CommentModal
          closeModal={() => setIsEditModalOpen(false)}
          comment={selectedComment}
          postId={selectedComment.post}
          onCommentUpdated={handleCommentUpdated}
        />
      )}
    </div>
  );
}

export default CommentList;