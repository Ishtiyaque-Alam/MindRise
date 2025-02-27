import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DummyGroups from "../../../Data/GroupsDummy/DummyGroups.json";
import CreateGroup from './CreateGroup';

const Community = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Check if groups exist in localStorage; if not, load dummy data
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    } else {
      setGroups(DummyGroups);
      localStorage.setItem('groups', JSON.stringify(DummyGroups));
    }
  }, []);

  const addGroup = (newGroup) => {
    setGroups(prevGroups => {
      const updatedGroups = [...prevGroups, newGroup];
      // Save updated groups to localStorage
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      return updatedGroups;
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Community Groups</h1>
      <CreateGroup addGroup={addGroup} />
      <div>
        {groups.map((group) => (
          <div key={group.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <Link to={`/community/group/${group.id}`}>View Group</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
