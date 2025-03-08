import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateGroup from './CreateGroup';
import "./community.css";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // Adjust the path as needed

const Community = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Reference to the "groups" subcollection under the "default" document in "community"
        const groupsCollectionRef = collection(db, "community", "default", "group");
        // Optionally, order groups by a field like "createdAt" in descending order
        const q = query(groupsCollectionRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const groupsList = [];
        querySnapshot.forEach((doc) => {
          groupsList.push({ id: doc.id, ...doc.data() });
        });
        setGroups(groupsList);
        console.log(groupsList);
      } catch (error) {
        console.error("Error fetching groups from Firestore:", error);
      }
    };

    fetchGroups();
  }, []);

  // Callback to update state if a new group is added via CreateGroup component
  const addGroup = (newGroup) => {
    setGroups(prevGroups => [newGroup, ...prevGroups]);
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
        ))
        }
      </div>
    </div>
  );
};

export default Community;
