const API_KEY = process.env.REACT_APP_GITHUB_API_KEY;
const BASE_URL = "https://api.github.com";

export const fetchGitHubData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`, // Use the API key here
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from GitHub API");
  }

  return response.json();
};