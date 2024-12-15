import axios from "axios";
const GITHUB_API_URL = '(https://api.github.com/search/users?q={query})';
// Base URL for GitHub API
const BASE_URL = "https://api.github.com";

// Function to fetch user data from GitHub
export const fetchUserData = async (username) => {
  try {
    // Make the API call with Axios
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data; // Return the user data
  } catch (error) {
    // Handle errors and throw them for the caller to handle
    if (error.response && error.response.status === 404) {
      throw new Error("User not found");
    } else {
      throw new Error("Looks like we can't find the user");
    }
  }
};

// Advanced user search function with multiple filter options
export const searchUsers = async (options = {}) => {
  try {
    // Destructure search options with default values
    const {
      query = '',        // Base search query 
      location = '',     // User's location
      language = '',     // Primary programming language
      minRepos = 0,      // Minimum number of repositories
      minFollowers = 0,  // Minimum number of followers
      sortBy = 'followers', // Sort criteria
      order = 'desc'     // Sort order
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
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: searchQuery,
        sort: sortBy,
        order: order
      }
    });

    // Return the search results
    return {
      total_count: response.data.total_count,
      users: response.data.items
    };
  } catch (error) {
    // Handle potential errors
    console.error('GitHub Search API Error:', error);
    throw new Error('Failed to search GitHub users');
  }
};

// Function to get user repositories
export const getUserRepositories = async (username, options = {}) => {
  try {
    const {
      type = 'all',     // Repository type (all, public, private)
      sort = 'updated', // Sort by updated date
      direction = 'desc' // Sort direction
    } = options;

    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
      params: {
        type,
        sort,
        direction
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch user repositories:', error);
    throw new Error('Unable to retrieve user repositories');
  }
};