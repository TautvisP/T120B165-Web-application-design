import React from 'react';
import '../styles/CountryList.css';

const countries = ['France', 'Japan', 'Australia', 'Brazil', 'Canada'];

function CountryList({ onCountryClick }) {
  return (
    <div className="country-list">
      <h2>Select a Country</h2>
      <div className="grid">
        {countries.map((country) => (
          <div key={country} className="country-card" onClick={() => onCountryClick(country)}>
            <h3>{country}</h3>
            <p>Explore posts and travel tips.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
