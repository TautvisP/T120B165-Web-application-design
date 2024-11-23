import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostList.css';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}/comments`} className="view-comments-button">View Comments</Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;