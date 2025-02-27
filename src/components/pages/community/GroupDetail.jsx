import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dummyposts from '../../../Data/PostDummy/dummyPosts.json';
import './groupDetail.css';

const GroupDetail = () => {
  const { groupId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const filteredPosts = dummyposts.filter(post => post.groupId === parseInt(groupId));
    setPosts(filteredPosts);
  }, [groupId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newPost = {
      id: posts.length + 1,
      groupId: parseInt(groupId),
      content: newMessage,
      author: 'You', 
      timestamp: new Date().toISOString(),
    };

    setPosts([...posts, newPost]);
    setNewMessage('');
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
          <h2>Group {groupId}</h2>
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
