import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {filteredRecipes.length === 0 ? (
        <p>No matching recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description.substring(0, 50)}...</p> {/* Shortened description */}
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
