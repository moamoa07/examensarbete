import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Recipe, RecipeWithId } from '../api/model/recipeModel';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SET_LOADING = 'SET_LOADING';
export const FETCH_RECIPE_START = 'FETCH_RECIPE_START';
export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const FETCH_RECIPE_ERROR = 'FETCH_RECIPE_ERROR';

// Define your RecipeState type
export interface RecipeState {
  recipes: (Recipe | RecipeWithId)[];
  lastFetchedRecipe: QueryDocumentSnapshot<DocumentData> | null;
  isLoading: boolean;
  currentRecipe: Recipe | RecipeWithId | null; // Updated to include Recipe or RecipeWithId
  error: string | null;
}

export interface FetchRecipesAction {
  type: typeof FETCH_RECIPES;
  payload: {
    recipes: Recipe[];
    lastFetchedRecipe: QueryDocumentSnapshot | null;
  };
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface FetchRecipeStartAction {
  type: typeof FETCH_RECIPE_START;
}

export interface FetchRecipeSuccessAction {
  type: typeof FETCH_RECIPE_SUCCESS;
  payload: Recipe | RecipeWithId;
}

export interface FetchRecipeErrorAction {
  type: typeof FETCH_RECIPE_ERROR;
  payload: string;
}
export type RecipeActionTypes =
  | FetchRecipesAction
  | SetLoadingAction
  | FetchRecipeStartAction
  | FetchRecipeSuccessAction
  | FetchRecipeErrorAction;
