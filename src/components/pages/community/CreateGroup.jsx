import React, { useState } from 'react';

const CreateGroup = ({ addGroup }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new group object
    const newGroup = {
      id: Date.now(), // Use a unique id
      name,
      description
    };
    addGroup(newGroup); // Callback to add group to parent component state
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <input
        Classname=""
        type="text"
        placeholder="Group Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Create Group</button>
    </form>
  );
};

export default CreateGroup;
