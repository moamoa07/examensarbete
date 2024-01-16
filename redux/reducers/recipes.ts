import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, RecipeWithId } from '../../api/model/recipeModel';
import { RecipeState } from '../../types/Action';
import { RootState } from '../store';

const initialState: RecipeState = {
  recipes: [],
  lastFetchedRecipeId: null,
  isLoading: false,
  currentRecipe: null,
  error: null,
  hasMoreRecipes: true,
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    // Updates the state based on the fetched recipes
    updateRecipesState: (
      state,
      action: PayloadAction<{
        recipes: (Recipe | RecipeWithId)[];
        lastFetchedRecipeId: string | null;
      }>
    ) => {
      state.recipes = [...state.recipes, ...action.payload.recipes];
      state.lastFetchedRecipeId = action.payload.lastFetchedRecipeId;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    fetchRecipesSuccess: (
      state,
      action: PayloadAction<{
        recipes: RecipeWithId[];
        lastFetchedRecipeId: string | null;
        limitNumber: number; // Add this line
      }>
    ) => {
      const newRecipes = action.payload.recipes.filter(
        (newRecipe) =>
          !state.recipes.some(
            (existingRecipe) => existingRecipe.id === newRecipe.id
          )
      );
      state.recipes = [...state.recipes, ...newRecipes];
      state.lastFetchedRecipeId = action.payload.lastFetchedRecipeId;
      state.isLoading = false;
      state.hasMoreRecipes = newRecipes.length === 2; // Assuming 2 is the limit per fetch
    },

    fetchRecipeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // Add other reducers like updateRecipe, deleteRecipe, etc. as needed
  },
});

export const {
  updateRecipesState,
  setLoading,
  fetchRecipesSuccess,
  fetchRecipeError,
} = recipesSlice.actions;

// Update your selector and other parts of the code where you use this reducer

// Selector to get the recipes from the state
export const selectRecipes = (state: RootState) =>
  state.recipes.recipes as (Recipe | RecipeWithId)[];

// Selector to get the isLoading flag from the state
export const selectIsLoading = (state: RootState) => state.recipes.isLoading;

// Selector to get the last fetched recipe ID from the state
export const selectLastFetchedRecipeId = (state: RootState) =>
  state.recipes.lastFetchedRecipeId;

// Selector to get the hasMoreRecipes flag from the state
export const selectHasMoreRecipes = (state: RootState) =>
  state.recipes.hasMoreRecipes;

export default recipesSlice.reducer;
