import React, { useState } from "react";
import { fetchUserData } from "../services/githubService"; // Import the service function

function Search() {
  const [username, setUsername] = useState(""); // State for input field
  const [userData, setUserData] = useState(null); // State for user data
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset previous errors
    setUserData(null); // Reset previous user data
    setLoading(true); // Start loading

    if (username.trim() ===" ") {
      alert('Please enter a Github username!');
      setLoading(false);
      return;
    }
    try {
      const data = await fetchUserData(username); // Call the service to fetch data
      setUserData(data); // Update the user data state
    } catch (err) {
      setError("Looks like we can't find the user."); // Set the error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="search-container text-center mt-8">
      {/* Form to search GitHub users */}
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4 mb-8">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <p className="text-blue-500">Loading...</p>} {/* Loading State */}
      {error && <p className="text-red-500">{error}</p>} {/* Error State */}
      {userData && ( /* Success State */
        <div className="user-card bg-gray-100 p-6 rounded-lg shadow-lg inline-block mt-6">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
          <p className="text-gray-600">{userData.bio || "No bio available"}</p>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-4 inline-block"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};
export default Search;
