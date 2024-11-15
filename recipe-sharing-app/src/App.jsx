import React from 'react';
import RecipeList from './components/RecipeList'; // Correct import
import AddRecipeForm from './components/AddRecipeForm'; // Correct import

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Recipe Manager</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
