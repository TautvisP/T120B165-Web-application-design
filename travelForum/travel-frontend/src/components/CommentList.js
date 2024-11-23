import React from 'react';
import '../styles/CommentList.css';
import userSymbol from '../media/profile-circle.svg';


function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <div className="comment-header">
          <img src={userSymbol} alt="User" className="user-icon" />
            <h4>{ comment.author}</h4>
          </div>
          <p>{comment.text}</p>
          <small>{new Date(comment.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default CommentList;