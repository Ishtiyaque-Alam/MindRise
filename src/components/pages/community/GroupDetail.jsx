import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import dummyposts from '../../../Data/PostDummy/dummyPosts.json'
// Dummy posts data for demonstration. In a real app, fetch posts based on groupId.

const dummyPosts=dummyposts;
const GroupDetail = () => {
  const { groupId } = useParams();
  const [posts, setPosts] = useState([]);
  
  // Filter posts for the given group
  useEffect(() => {
    // In a real app, use groupId to fetch posts via API
    const filteredPosts = dummyPosts.filter(post => post.groupId === parseInt(groupId));
    setPosts(filteredPosts);
  }, [groupId]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Group: {groupId}</h1>
      
      {/* Link to a page or modal to add a new post */}
      <Link to={`/community/group/${groupId}/new-post`}>Add New Post</Link>
      
      <div style={{ marginTop: '20px' }}>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <p>{post.content}</p>
              <small>
                Posted by: {post.anonymous ? "Anonymous" : post.author} on {new Date(post.timestamp).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>No posts in this group yet.</p>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
