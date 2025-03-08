import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './groupDetail.css';
import { doc, collection, getDoc, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // Adjust path as needed
import {useAuth} from "../../context/AuthContext" 

const GroupDetail = () => {
  const { groupId } = useParams(); // groupId is the document ID
  const { user } = useAuth();
  const [groupDetails, setGroupDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [des,setdesc]=useState('');
  const [name,setname]=useState('');
  // Fetch group details from Firestore
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupRef = doc(db, "community", "default", "group", groupId);
        
        const groupSnap = await getDoc(groupRef);
        if (groupSnap.exists()) {
          setGroupDetails(groupSnap.data());
        } else {
          console.log("No such group!");
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  // Listen for posts in the group's "posts" subcollection (real-time updates)
  useEffect(() => {
    const postsRef = collection(db, "community", "default", "group", groupId, "posts");
    const q = query(postsRef, orderBy("timestamp", "asc")); // Order posts chronologically
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const postsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsList);
      },
      (error) => {
        console.error("Error fetching posts:", error);
      }
    );
    return () => unsubscribe();
  }, [groupId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const postData = {
      content: newMessage,
      author: user 
  ? (user.displayName || ((email) => email.split('@')[0])(user.email))
  : "Anonymous",
      timestamp: new Date().toISOString(),
    };

    try {
      const postsRef = collection(db, "community", "default", "group", groupId, "posts");
      await addDoc(postsRef, postData);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Community</h2>
      </div>

      {/* Main Chat Window */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-header">
          {groupDetails ? (
            <>
              <h2>{groupDetails.name}</h2>
              <p>{groupDetails.description}</p>
            </>
          ) : (
            <h2>Loading group...</h2>
          )}
        </div>

        {/* Messages Section */}
        <div className="chat-messages">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="message">
                <div className="message-header">
                  <strong>{post.author}</strong>
                  <span className="timestamp">
                    {new Date(post.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">{post.content}</div>
              </div>
            ))
          ) : (
            <p className="no-posts">No posts in this group yet.</p>
          )}
        </div>

        {/* Input Box */}
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
