import { useState } from 'react';

const Search = ({onSearch}) => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    
    const handleChange = (event) => {
        setUsername = (event.target.value);
    };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh
    setError(null); // Reset any previous errors
    setUserData(null); // Clear previous user data


    if (username.trim() ===" ") {
      alert('Please enter a Github username!');
      setLoading(false);
      return;
    }
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error("Looks like we can't find the user.");
        }   
        const data = await response.json();
        setUserData(data); // Store the user data in state
      } catch(err) {
        setError(err.message); // Store the error message
      }finally{
        setLoading(false);
      }
    onSearch(username); // Pass the username to the parent component
    setUsername("");  // Reset the input field
  };
  return (
    <div className="search-container text-center">
      {/* Form to Search for GitHub Users */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-center mt-4">
        <input
          type="text"
          value={username}
          onChange={handleChange}
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
      <div className="mt-6">
        {/* Show loading message */}
        {loading && <p className="text-blue-500">Loading...</p>}

        {/* Show error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Show user information if API call is successful */}
        {userData && (
          <div className="user-card bg-gray-100 p-4 rounded-lg shadow-md inline-block mt-6">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-xl font-bold mt-2">{userData.name || userData.login}</h2>
            <p className="text-sm text-gray-600">{userData.bio || "No bio available"}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
