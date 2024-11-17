import React, { useEffect } from 'react';
import { useRecipeStore } from '../stores/recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  // Generate recommendations when the component mounts
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available. Add some favorites to see suggestions!</p>
      ) : (
        recommendations.map((recipe) => (
          <div>
            key={recipe.id}
            style={{ border: '1px solid #ccc',marginBottom: '10px',padding: '10px',}}
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;
