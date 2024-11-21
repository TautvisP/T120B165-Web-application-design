import React, { useState } from 'react';
import PostList from './PostList';
import PostModal from './PostModal';
import '../styles/CountryPage.css';

function CountryPage({ country, goBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="country-page">
      <button className="back-button" onClick={goBack}>← Back</button>
      <h2>Posts about {country}</h2>
      <button className="add-post" onClick={() => setIsModalOpen(true)}>Add New Post</button>
      <PostList country={country} />
      {isModalOpen && <PostModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default CountryPage;
