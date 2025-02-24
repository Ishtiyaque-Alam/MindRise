import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../../Data/SearchDummy/data.json';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [distanceInput, setDistanceInput] = useState('');
  const [minRating, setMinRating] = useState('');
  const [results, setResults] = useState([]);

  // On initial load, set results to all data
  useEffect(() => {
    setResults(data);
  }, []);

  // Update filtered results when any filter changes
  useEffect(() => {
    let filtered = data.filter(item => {
      const query = searchQuery.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesDescription = item.description.toLowerCase().includes(query);
      const matchesRating = minRating ? item.ratings >= parseFloat(minRating) : true;
      return (matchesName || matchesDescription) && matchesRating;
    });

    // If distance is provided, sort by closeness to the entered distance
    if (distanceInput) {
      const targetDistance = parseFloat(distanceInput);
      filtered = filtered.sort((a, b) => {
        const distanceA = parseFloat(a.distance);
        const distanceB = parseFloat(b.distance);
        return Math.abs(distanceA - targetDistance) - Math.abs(distanceB - targetDistance);
      });
    }

    setResults(filtered);
  }, [searchQuery, distanceInput, minRating]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Profiles</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="number"
          placeholder="Enter distance"
          value={distanceInput}
          onChange={(e) => setDistanceInput(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }}
        />
        <input
          type="number"
          placeholder="Minimum rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          style={{ padding: '8px', width: '150px' }}
        />
      </div>
      
      <div>
        {results.length > 0 ? (
          results.map((item, index) => (
            <Link
              to={`/profile/${index}`}
              key={index}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  padding: '10px',
                  margin: '10px 0'
                }}
              >
                <img
                  src={item.profilePhoto}
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    marginRight: '20px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h2 style={{ margin: 0 }}>{item.name}</h2>
                  <p style={{ margin: '5px 0' }}>{item.location} • {item.distance}</p>
                  <p style={{ margin: '5px 0' }}>{item.description}</p>
                  <p style={{ margin: '5px 0' }}>Rating: {item.ratings}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No profiles found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
