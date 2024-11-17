import create from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [], // All recipes in the app
  favorites: [], // Array of recipe IDs marked as favorites
  recommendations: [], // Array of recommended recipes based on favorites

  // Add a recipe to favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  // Remove a recipe from favorites
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Generate personalized recommendations based on favorites
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) =>
          state.favorites.includes(recipe.id) && Math.random() > 0.5 // Mock logic for recommendations
      );
      return { recommendations: recommended };
    }),
}));
