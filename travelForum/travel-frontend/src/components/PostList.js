import React from 'react';
import '../styles/PostList.css';

const posts = [
  { title: 'Best Beaches in France', content: 'Check out these amazing beaches in the south of France...' },
  { title: 'Top Sushi Spots in Japan', content: 'A guide to the best sushi restaurants in Tokyo.' }
];

function PostList() {
  return (
    <div className="post-list">
      {posts.map((post, index) => (
        <div key={index} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
