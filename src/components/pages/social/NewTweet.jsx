import React, { useState } from 'react';

const NewTweet = ({ addTweet }) => {
  const [name, setName] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || post.trim() === '') return;
    
    const newTweet = {
      id: Date.now(), // Unique ID based on current time
      name,
      timestamp: new Date().toISOString(),
      comments: [],
      post
    };
    
    addTweet(newTweet);
    setName('');
    setPost('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
        required
      />
      <textarea 
         value={post} 
         onChange={(e) => setPost(e.target.value)} 
         placeholder="What's happening?" 
         rows="3"
         style={{ width: '100%', padding: '8px', marginBottom: '8px', fontSize: '16px' }}
         required
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Tweet</button>
    </form>
  );
};

export default NewTweet;
