import React, { useState, useEffect } from 'react';
import NewTweet from './NewTweet';
import Tweet from './Tweet';
import tweetData from "../../../Data/TweetsDummy/DummyTweets.json";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // Adjust path as needed

const TwitterFeed = () => {
  const [tweets, setTweets] = useState([]);
  const tweetsCollectionRef = collection(db, "tweets");

  // Function to fetch tweets from Firestore
  const fetchTweets = async () => {
    try {
      // Order tweets by timestamp descending (newest first)
      const q = query(tweetsCollectionRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      let tweetsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        tweetsFromFirestore.push({ id: doc.id, ...doc.data() });
      });

      // If there are no tweets in Firestore, use the dummy data and upload it
      if (tweetsFromFirestore.length === 0) {
        for (const tweet of tweetData) {
          // Optionally, ensure each tweet has a timestamp; if not, add one.
          const tweetWithTimestamp = {
            ...tweet,
            timestamp: tweet.timestamp || new Date().toISOString()
          };
          const docRef = await addDoc(tweetsCollectionRef, tweetWithTimestamp);
          tweetsFromFirestore.push({ id: docRef.id, ...tweetWithTimestamp });
        }
        // Sort tweets so the newest come first
        tweetsFromFirestore.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      }

      setTweets(tweetsFromFirestore);
    } catch (error) {
      console.error("Error fetching tweets from Firestore:", error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  // Function to add a new tweet to Firestore and update local state
  const addTweet = async (newTweet) => {
    try {
      // Ensure the new tweet has a timestamp
      if (!newTweet.timestamp) {
        newTweet.timestamp = new Date().toISOString();
      }
      const docRef = await addDoc(tweetsCollectionRef, newTweet);
      const tweetWithId = { id: docRef.id, ...newTweet };

      // Update the state (new tweets appear first)
      setTweets(prevTweets => [tweetWithId, ...prevTweets]);
    } catch (error) {
      console.error("Error uploading tweet to Firestore:", error);
    }
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
