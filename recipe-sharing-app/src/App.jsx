import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
        <AddRecipeForm />
      </div>

      {/* Routes Configuration */}
      <Routes>
        <Route path="/" element={<RecipeList />} /> {/* Home route */}
        <Route path="/recipe/:id" element={<RecipeDetailsWrapper />} /> {/* Recipe details route */}
      </Routes>
    </Router>
  );
}

// Wrapper to extract recipeId from route params
const RecipeDetailsWrapper = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL
  return <RecipeDetails recipeId={parseInt(id, 10)} />; // Pass the ID as a prop to RecipeDetails
};

export default App;

