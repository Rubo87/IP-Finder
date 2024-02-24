import React, { useState, useEffect } from 'react';

function CountryInfo() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Country Information</h1>
      {countries.length > 0 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              <strong>{country.name.common}</strong>
              <p>Capital: {country.capital}</p>
              <p>Region: {country.region}</p>
              <p>Subregion: {country.subregion}</p>
              <p>Population: {country.population}</p>
              {/* Add more information as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountryInfo;