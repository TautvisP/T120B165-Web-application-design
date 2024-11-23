import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostModal from './PostModal';
import '../styles/CountryPage.css';

function CountryPage({ country, goBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/countries/${country.id}/posts/`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [country.id]);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div className="country-page">
      <button className="back-button" onClick={goBack}>← Back</button>
      <h2>Posts about {country.name}</h2>
      <button className="add-post" onClick={() => setIsModalOpen(true)}>Add New Post</button>
      {posts.length === 0 ? (
        <p>No posts found, log in and create one to start a conversation!</p>
      ) : (
        <PostList posts={posts} />
      )}
      {isModalOpen && (
        <PostModal
          closeModal={() => setIsModalOpen(false)}
          countryId={country.id}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
}

export default CountryPage;