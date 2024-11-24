import React from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

const Profile = () => {
    return (
      <div>
        <h1>Profile</h1>
        <nav>
          <ul>
            <li>
              <Link to="details">Details</Link>
            </li>
            <li>
              <Link to="settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    );
  };

  // ProfileDetails component
const ProfileDetails = () => {
    return (
      <div>
        <h2>Profile Details</h2>
        <p>This is the profile details page.</p>
      </div>
    );
  };

  
  // ProfileSettings component
const ProfileSettings = () => {
    return (
      <div>
        <h2>Profile Settings</h2>
        <p>This is the profile settings page.</p>
      </div>
    );
  };
  
export default Profile;  