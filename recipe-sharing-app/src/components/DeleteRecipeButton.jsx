import React from 'react';
import { useRecipeStore } from '../stores/recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = () => {
    deleteRecipe(recipeId); // Delete the recipe
    alert('Recipe deleted!');
    navigate('/'); // Navigate back to the main recipe list
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
