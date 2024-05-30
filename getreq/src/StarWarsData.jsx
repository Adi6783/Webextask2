import React, { useEffect, useState } from 'react';
import axios from 'axios';

const cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds

const StarWarsData = ({ type, index }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!index) {
      setLoading(false);
      return;
    }

    const apiUrl = `https://swapi.dev/api/${type}/${index}/`;
    const cacheKey = `${type}Data_${index}`;
    const cacheExpiryKey = `${type}DataExpiry_${index}`;

    const fetchData = async () => {
      const cachedData = localStorage.getItem(cacheKey);
      const cachedExpiry = localStorage.getItem(cacheExpiryKey);

      if (cachedData && cachedExpiry && Date.now() < cachedExpiry) {
        console.log('Using cached data');
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        console.log('Fetching new data');
        try {
          const response = await axios.get(apiUrl);
          localStorage.setItem(cacheKey, JSON.stringify(response.data));
          localStorage.setItem(cacheExpiryKey, Date.now() + cacheDuration);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error making GET request:', error);
          setData(null);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [type, index]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          <strong>{key.replace('_', ' ')}:</strong> {value}, 
        </p>
      ))}
    </div>
  );
};

export default StarWarsData;
