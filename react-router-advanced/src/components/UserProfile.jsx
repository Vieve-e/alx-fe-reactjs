import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// User profile component with dynamic routing
const UserProfile = () => {
    const { username } = useParams();
  
    return (
      <div>
        <h1>User Profile: {username}</h1>
        <p>This is the user profile page for {username}.</p>
      </div>
    );
  };
export default UserProfile;