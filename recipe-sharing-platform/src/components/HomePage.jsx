import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import data from '../data.json';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await fetch('./data.json');
          const data = await response.json();
          setRecipes(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipes();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 hover:shadow-xl hover:scale-105">
          <h1 className="text-3xl font-bold mb-4">Recipe Sharing Platform</h1>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <li key={(link)} className="bg-white rounded shadow-md p-4">
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover mb-4" />
                <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">{recipe.summary}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Recipe
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default HomePage;
    