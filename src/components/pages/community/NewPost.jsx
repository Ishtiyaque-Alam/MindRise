import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Assume you have a UserContext that holds the current user data
// import { UserContext } from '../contexts/UserContext';

const NewPost = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  
  // Uncomment when UserContext is set up
  // const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build the post object. Replace `user.name` with your user's name.
    const post = {
      groupId: parseInt(groupId),
      content,
      author: anonymous ? "Anonymous" : "UserName", // Replace "UserName" with user.name from context
      anonymous,
      timestamp: new Date().toISOString()
    };

    // Here, send the post to your backend API
    console.log('New Post:', post);

    // After submission, redirect back to the group detail page
    navigate(`/community/group/${groupId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add a New Post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your post..."
          rows="5"
          style={{ width: '100%', padding: '10px' }}
        ></textarea>
        <div style={{ margin: '10px 0' }}>
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={e => setAnonymous(e.target.checked)}
            />{" "}
            Post anonymously
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Submit Post</button>
      </form>
    </div>
  );
};

export default NewPost;
