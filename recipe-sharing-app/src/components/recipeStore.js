import create from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [], // Full list of recipes
  searchTerm: '', // The current search term
  filteredRecipes: [], // Computed filtered recipes based on search term

  // Action to set the search term
  setSearchTerm: (term) => 
    set((state) => {
      const updatedFilteredRecipes = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
      return {
        searchTerm: term,
        filteredRecipes: updatedFilteredRecipes,
      };
    }),

  // Action to add a new recipe and update filtered recipes
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      const updatedFilteredRecipes = updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedFilteredRecipes,
      };
    }),
}));
