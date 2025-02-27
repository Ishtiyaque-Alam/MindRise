import React, { useState, useEffect } from 'react';
import NewTweet from './NewTweet';
import Tweet from './Tweet';
import tweetData from "../../../Data/TweetsDummy/DummyTweets.json";

const TwitterFeed = () => {
  const [tweets, setTweets] = useState([]);
  
  // Load tweets from localStorage or JSON file on first render
  useEffect(() => {
    const storedTweets = localStorage.getItem('tweets');
      setTweets(tweetData); // Use JSON file if no localStorage data
      localStorage.setItem('tweets', JSON.stringify(tweetData)); // Store in localStorage
    
  }, []);

  // Function to add a new tweet
  const addTweet = (newTweet) => {
    setTweets(prevTweets => {
      const updatedTweets = [newTweet, ...prevTweets]; // Newest tweets first
      localStorage.setItem('tweets', JSON.stringify(updatedTweets)); // Save to localStorage
      return updatedTweets;
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Let's Talk</h1>
      <NewTweet addTweet={addTweet} />
      {tweets.length > 0 ? (
        tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)
      ) : (
        <p>No posts yet. Be the first to share your thoughts!</p>
      )}
    </div>
  );
};

export default TwitterFeed;
