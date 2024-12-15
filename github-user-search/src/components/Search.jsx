import React, { useState } from "react";
import axios from "axios";

function Search() {
  // Search criteria states
  const [searchCriteria, setSearchCriteria] = useState({
    query: '',
    location: '',
    language: '',
    minRepos: 0,
    minFollowers: 0
  });

  // Search results and pagination states
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Handle input changes for search fields
  const handleInputChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Advanced search function
  const searchUsers = async (options = {}, currentPage = 1) => {
    try {
      // Destructure search options with default values
      const {
        query = '',
        location = '',
        language = '',
        minRepos = 0,
        minFollowers = 0
      } = options;

      // Construct the search query string
      const searchParams = [];

      // Add base query if provided
      if (query) searchParams.push(query);
      
      // Add location filter
      if (location) searchParams.push(`location:${location}`);
      
      // Add language filter
      if (language) searchParams.push(`language:${language}`);
      
      // Add repository count filter
      if (minRepos > 0) searchParams.push(`repos:>=${minRepos}`);
      
      // Add followers filter
      if (minFollowers > 0) searchParams.push(`followers:>=${minFollowers}`);

      // Combine search parameters
      const searchQuery = searchParams.join(' ');

      // Make the API call to GitHub Search API
      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: searchQuery,
          page: currentPage,
          per_page: 9 // Display 9 results per page
        }
      });

      return {
        total_count: response.data.total_count,
        users: response.data.items
      };
    } catch (error) {
      console.error('GitHub Search API Error:', error);
      throw new Error('Failed to search GitHub users');
    }
  };

  // Handle search submission
  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await searchUsers(searchCriteria, 1);

      setSearchResults(results.users);
      setTotalResults(results.total_count);
      setPage(1);
    } catch (err) {
      setError("Failed to search GitHub users");
    } finally {
      setLoading(false);
    }
  };

  // Load more results
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const results = await searchUsers(searchCriteria, nextPage);

      setSearchResults(prev => [...prev, ...results.users]);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        GitHub User Advanced Search
      </h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="query" className="block text-sm font-medium mb-2">
            Username or Keyword
          </label>
          <input
            type="text"
            id="query"
            value={searchCriteria.query}
            onChange={(e) => handleInputChange('query', e.target.value)}
            placeholder="Enter username or keyword"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={searchCriteria.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City or Country"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label htmlFor="language" className="block text-sm font-medium mb-2">
            Primary Language
          </label>
          <input
            type="text"
            id="language"
            value={searchCriteria.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            placeholder="JavaScript, Python, etc."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium mb-2">
              Min Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              value={searchCriteria.minRepos}
              onChange={(e) => handleInputChange('minRepos', Number(e.target.value))}
              placeholder="10"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="minFollowers" className="block text-sm font-medium mb-2">
              Min Followers
            </label>
            <input
              type="number"
              id="minFollowers"
              value={searchCriteria.minFollowers}
              onChange={(e) => handleInputChange('minFollowers', Number(e.target.value))}
              placeholder="100"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search Users'}
          </button>
        </div>
      </form>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {totalResults} Users Found
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((user) => (
              <div 
                key={user.id} 
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img 
                  src={user.avatar_url} 
                  alt={user.login} 
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h4 className="font-bold text-lg">{user.login}</h4>
                <div className="text-sm text-gray-600 text-center mt-2">
                  <a 
                    href={user.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
                  >
                    View Full Profile
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {searchResults.length < totalResults && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Search;
