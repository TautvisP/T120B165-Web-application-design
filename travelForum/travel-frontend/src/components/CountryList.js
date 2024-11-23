import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryModal from './CountryModal';
import '../styles/CountryList.css';

function CountryList({ onCountryClick }) {
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/countries/');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryCreated = (newCountry) => {
    setCountries((prevCountries) => [...prevCountries, newCountry]);
  };

  return (
    <div className="country-list">
      <h2>Select a Country</h2>
      <button className="add-country" onClick={() => setIsModalOpen(true)}>Add Country</button>
      {countries.length === 0 ? (
        <p>No countries found, log in and create one to start a conversation!</p>
      ) : (
        <div className="grid">
          {countries.map((country) => (
            <div key={country.id} className="country-card" onClick={() => onCountryClick(country)}>
              <h3>{country.name}</h3>
              <p>{country.description}</p>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <CountryModal
          closeModal={() => setIsModalOpen(false)}
          onCountryCreated={handleCountryCreated}
        />
      )}
    </div>
  );
}

export default CountryList;