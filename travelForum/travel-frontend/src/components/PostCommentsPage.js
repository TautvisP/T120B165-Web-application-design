import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from './CommentList';
import CommentModal from './CommentModal';
import '../styles/PostCommentsPage.css';

function PostCommentsPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentCreated = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCommentUpdated = (updatedComment) => {
    setComments((prevComments) => prevComments.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="post-comments-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>Comments</h2>
      <button className="add-comment" onClick={() => setIsModalOpen(true)}>Post a Comment</button>
      {comments.length === 0 ? (
        <p>No comments found, log in and create one to start a conversation!</p>
      ) : (
        <CommentList comments={comments} onCommentUpdated={handleCommentUpdated} onCommentDeleted={handleCommentDeleted} />
      )}
      {isModalOpen && (
        <CommentModal
          closeModal={() => setIsModalOpen(false)}
          postId={postId}
          onCommentCreated={handleCommentCreated}
        />
      )}
    </div>
  );
}

export default PostCommentsPage;