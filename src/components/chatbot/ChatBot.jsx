import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import zIndex from '@mui/material/styles/zIndex';

// Replace this with your actual API key
const genAI = new GoogleGenerativeAI('AIzaSyBcb_OkqmYjCTM-Xp-Rpo4ZJry5u5xqT8g');

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am Sara your therapist' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(text);
      const response = await result.response;
      const reply = response.text();

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I encountered an error.' },
      ]);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Gemini ChatBot</h2>
      <div style={styles.chatContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.botMessage}>Typing...</div>}
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    position:"fixed",
    bottom:"20px",
    right:"20px",
    zIndex:1000

  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  chatContainer: {
    border: '1px solid #ddd',
    padding: '10px',
    height: '300px',
    overflowY: 'auto',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  userMessage: {
    textAlign: 'right',
    backgroundColor: '#daf1da',
    padding: '8px',
    borderRadius: '10px',
    margin: '5px 0',
  },
  botMessage: {
    textAlign: 'left',
    backgroundColor: '#f1f1f1',
    padding: '8px',
    borderRadius: '10px',
    margin: '5px 0',
  },
  form: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '1em',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 16px',
    fontSize: '1em',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ChatBot;
