import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostModal from './PostModal';
import EditCountryModal from './EditCountryModal';
import '../styles/CountryPage.css';

function CountryPage({ country, goBack, onCountryDeleted, onCountryUpdated }) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isEditCountryModalOpen, setIsEditCountryModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const currentUser = localStorage.getItem('username');

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

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) => prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
  };

  const handleEditClick = () => {
    setIsEditCountryModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/countries/${country.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      onCountryDeleted(country.id);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div className="country-page">
      <button className="back-button" onClick={goBack}>← Back</button>
      <h2>Posts about {country.name}</h2>
      <button className="add-post" onClick={() => setIsPostModalOpen(true)}>Add New Post</button>
      {posts.length === 0 ? (
        <p>No posts found, log in and create one to start a conversation!</p>
      ) : (
        <PostList posts={posts} onPostUpdated={handlePostUpdated} onPostDeleted={handlePostDeleted} />
      )}
      {isPostModalOpen && (
        <PostModal
          closeModal={() => setIsPostModalOpen(false)}
          countryId={country.id}
          onPostCreated={handlePostCreated}
        />
      )}
      {isEditCountryModalOpen && (
        <EditCountryModal
          closeModal={() => setIsEditCountryModalOpen(false)}
          country={country}
          onCountryUpdated={onCountryUpdated}
        />
      )}
      {country.creator === currentUser && (
        <>
          <button className="edit-button" onClick={handleEditClick}>Edit Country</button>
          <button className="delete-button" onClick={handleDeleteClick}>Delete Country</button>
        </>
      )}
    </div>
  );
}

export default CountryPage;