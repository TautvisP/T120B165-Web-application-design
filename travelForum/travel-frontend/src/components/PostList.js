import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostList.css';
import PostModal from './PostModal';
import axios from 'axios';

function PostList({ posts, onPostUpdated, onPostDeleted }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setCurrentUser(username);
  }, []);

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (postId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      onPostDeleted(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePostUpdated = (updatedPost) => {
    onPostUpdated(updatedPost);
    setIsEditModalOpen(false);
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>By: {post.author}</p>
          <Link to={`/posts/${post.id}/comments`} className="view-comments-button">View Comments</Link>
          {console.log(`post.author: ${post.author}, currentUser: ${currentUser}`)}
          {post.author === currentUser ? (
            <div>
              <button className="edit-button" onClick={() => handleEditClick(post)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteClick(post.id)}>Delete</button>
            </div>
          ) : (
            console.log('User does not have permission to edit or delete this post')
          )}
        </div>
      ))}
      {isEditModalOpen && selectedPost && (
        <PostModal
          closeModal={() => setIsEditModalOpen(false)}
          post={selectedPost}
          onPostUpdated={handlePostUpdated}
        />
      )}
    </div>
  );
}

export default PostList;