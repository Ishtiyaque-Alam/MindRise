import React from 'react';

const Tweet = ({ tweet }) => {
  console.log(tweet);
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: '#fff'
    }}>
      <p style={{ fontWeight: 'bold', margin: 0 }}>
        {tweet.name} <span style={{ fontSize: '12px', color: 'gray' }}>
          {new Date(tweet.timestamp).toLocaleString()}
        </span>
      </p>
      <p style={{ margin: '8px 0' }}>{tweet.post}</p>
      {tweet.comments && tweet.comments.length > 0 && (
        <div style={{ marginTop: '8px', paddingLeft: '10px', borderLeft: '2px solid #ccc' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '4px' }}>Comments:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
            {tweet.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tweet;
