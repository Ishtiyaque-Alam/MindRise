import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../Data/SearchDummy/data.json'; // Ensure the path is correct

const Profile = () => {
  const { id } = useParams();
  const profile = data[parseInt(id)];

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{profile.name}</h1>
      <img
        src={profile.profilePhoto}
        alt={profile.name}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Distance:</strong> {profile.distance}</p>
      <p><strong>Description:</strong> {profile.description}</p>
      <p><strong>Rating:</strong> {profile.ratings}</p>
    </div>
  );
};

export default Profile;
