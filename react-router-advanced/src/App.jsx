import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import UserProfile from './components/UserProfile';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={ 
                                       <ProtectedRoute>
                                         <Profile />
                                       </ProtectedRoute> }>
        <Route path="/login" element={<Login />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="/users/:username" element={<UserProfile />} />
          <Route path="/blog/:id" element={<BlogPost />} />

        </Route>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App