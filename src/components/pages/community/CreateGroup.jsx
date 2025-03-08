import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // Adjust the path as needed

const CreateGroup = ({ addGroup }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new group object
    const newGroup = {
      name,
      description,
      createdAt: new Date().toISOString()
    };

    setLoading(true);
    try {
      // Define the subcollection "group" under the "community" document "default"
      const groupCollectionRef = collection(db, "community", "default", "group");
      // Add the new group to Firestore
      const docRef = await addDoc(groupCollectionRef, newGroup);
      
      // Optionally, include the new document ID with the group data
      const groupWithId = { id: docRef.id, ...newGroup };
      
      // Update the parent component state via callback
      addGroup(groupWithId);
      
      // Reset the form
      setName('');
      setDescription('');
    } catch (error) {
      console.error("Error creating group in Firestore:", error.message);
    } finally {
      setLoading(false);
    }
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
        type="text"
        placeholder="Group Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }} disabled={loading}>
        {loading ? "Creating..." : "Create Group"}
      </button>
    </form>
  );
};

export default CreateGroup;
