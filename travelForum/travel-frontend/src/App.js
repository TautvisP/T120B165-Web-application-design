import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryList from './components/CountryList';
import CountryPage from './components/CountryPage';
import Navbar from './components/Navbar';
import ProfileEdit from './components/ProfileEdit';
import PostCommentsPage from './components/PostCommentsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleCountryDeleted = (countryId) => {
    setSelectedCountry(null);
  };

  const handleCountryUpdated = (updatedCountry) => {
    setSelectedCountry(updatedCountry);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={
              selectedCountry ? (
                <CountryPage 
                  country={selectedCountry} 
                  goBack={() => setSelectedCountry(null)} 
                  onCountryDeleted={handleCountryDeleted} 
                  onCountryUpdated={handleCountryUpdated} 
                />
              ) : (
                <CountryList onCountryClick={handleCountryClick} />
              )
            } />
            <Route path="/profile" element={<ProfileEdit />} />
            <Route path="/posts/:postId/comments" element={<PostCommentsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;