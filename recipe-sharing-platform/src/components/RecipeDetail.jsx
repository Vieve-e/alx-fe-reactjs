import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`./data.json`);
        const data = await response.json();
        const recipeData = data.find((recipe) => ( Link ) === parseInt(id));
        setRecipe(recipeData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 shadow">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover mb-4" />
      <p className="text-gray-600 mb-4">{recipe.summary}</p>
      <h2 className="text-lg font-bold mb-2">Ingredients:</h2>
      <ul>
        {/* Add ingredients list here */}
      </ul>
      <h2 className="text-lg font-bold mb-2">Summary:</h2>
      <ol>
        {/* Add instructions list here */}
      </ol>
    </div>
  );
};
export default RecipeDetail;