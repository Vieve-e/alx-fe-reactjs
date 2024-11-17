import React from 'react';
import { useRecipeStore } from '../stores/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = (id) => favorites.includes(id);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes available.</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {isFavorite(recipe.id) ? (
              <button onClick={() => removeFavorite(recipe.id)}>Remove from Favorites</button>
            ) : (
              <button onClick={() => addFavorite(recipe.id)}>Add to Favorites</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
