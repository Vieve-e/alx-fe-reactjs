import axios from "axios";

// Base URL for GitHub API
const BASE_URL = "https://api.github.com/users";

// Function to fetch user data from GitHub
export const fetchUserData = async (username) => {
  try {
    // Make the API call with Axios
    const response = await axios.get(`${BASE_URL}/${username}`);
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
