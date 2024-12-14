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
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Search for GitHub Users</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {userFields.map((field) => (  //rendering form fields based on the userFields array with map method
          <div key={field.name} className="flex flex-col space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            <input
              type={field.name === 'minRepos' ? 'number' : 'text'}
              id={field.name}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              placeholder={field.name === 'minRepos' ? '10' : ''}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
        ))}
        
        <button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        >Search
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : error && (
        <p className="text-red-500 text-sm mt-4">Looks like we cant find the user.</p>
      ) }: userData && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">User Information</h2>
          <img src={userData.avatar_url} alt={userData.name} width="100" height="100" className="rounded-lg"/>
          <h3  className="text-sm font-medium">
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
              {userData.name} ({userData.login}) ({userData.location}) ({userData.minRepos})

            </a>
          </h3>
        </div>
      ) : null
    </div>
  );
}
export default Search;
