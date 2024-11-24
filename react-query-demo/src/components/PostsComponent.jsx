import React from 'react';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Use the useQuery hook to handle data fetching and caching
  const { data, error, isLoading, isError } = useQuery(
    'posts',
    fetchPosts,
    { 
      refetchOnWindowFocus: true, // Refetch data when the window regains focus
      staleTime: 60000, // Refetch data every 60 seconds when the window is focused
      keepPreviousData: true, // Keep previous data in cache while refetching new data
      cacheTime: 300000, // cached data is stored in memory for 5 minutes
    }
  );
  
  const queryClient = useQueryClient();

  const handleRefetch = async () => {
    await queryClient.refetchOnWindowFocus('posts');
  };
  
  // Handling loading state
  if (isLoading) {
    return <span>Loading...</span>;
  }
  // Handling Error state
  if (isError) {
    return <span>An error has occurred: ' + error.message</span>;
  }
  // Render the fetched data
  return (
    <div>
      <h1>Posts</h1>
      <ul>
       {data.map ((post) => (
        <li key={('https://jsonplaceholder.typicode.com/posts')}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
      </ul>
      <button onClick={handleRefetch}>Refetch Posts</button>
    </div>
);
};

export default PostsComponent;