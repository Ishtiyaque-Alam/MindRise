import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DummyGroups from "../../../Data/GroupsDummy/DummyGroups.json";
import CreateGroup from './CreateGroup';
import "./community.css";

const Community = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
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
      const updatedGroups = [newGroup, ...prevGroups]; // Newest group first
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      return updatedGroups;
    });
  };

  return (
    <div className="community-container">
      <h1 className="community-title">Community Groups</h1>
      <CreateGroup addGroup={addGroup} />
      <div className="group-list">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <div className="group-header">
              <img src={group.image || "/assets/default-avatar.png"} alt="Group" className="group-avatar" />
              <h2 className="group-name">{group.name}</h2>
            </div>
            <p className="group-description">{group.description}</p>
            <Link to={`/community/group/${group.id}`} className="view-group-button">
              View Group
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
