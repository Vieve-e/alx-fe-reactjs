jsx
import React from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserProfile() {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Optional: Add profile update functionality */}
      <button onClick={() => setUserData({ ...userData, name: 'Updated Name' })}>
        Update Name
      </button>
    </div>
  );
}

export default UserProfile;