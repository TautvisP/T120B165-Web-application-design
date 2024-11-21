import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryList from './components/CountryList';
import CountryPage from './components/CountryPage';
import Navbar from './components/Navbar';
import './styles/App.css';


function App() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = (country) => {
      setSelectedCountry(country);
};

return (
<div className="App">
    <Navbar />
    <Header />

    <div className="content">
        {selectedCountry ? (
            <CountryPage country={selectedCountry} goBack={() => setSelectedCountry(null)} />
        ) : (
            <CountryList onCountryClick={handleCountryClick} />
        )}
    </div>

    <Footer />
</div>



);
}

export default App;
