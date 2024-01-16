import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchRecipes } from '../redux/actions/recipeActions';
import {
  selectHasMoreRecipes,
  selectIsLoading,
  selectLastFetchedRecipeId,
  selectRecipes,
} from '../redux/reducers/recipes';
import RecipeComponent from './RecipeComponent';

const thinBorder = 1 / PixelRatio.get();

const RecipeList = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const lastFetchedRecipeId = useAppSelector(selectLastFetchedRecipeId);
  const isLoading = useAppSelector(selectIsLoading);
  const hasMoreRecipes = useAppSelector(selectHasMoreRecipes);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes(null, 2));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('Component updated with new recipes:', recipes);
  }, [recipes]);

  const handleLoadMore = () => {
    if (hasMoreRecipes) {
      dispatch(fetchRecipes(lastFetchedRecipeId, 2));
    }
  };

  return (
    <ScrollView>
      <View style={styles.screenHeader}>
        <Text style={styles.h3}>Explore Recipes</Text>
      </View>

      {/* Loader */}
      {isLoading && <ActivityIndicator size={'large'} />}

      {/* Recipes List */}
      {!isLoading &&
        recipes.map((recipe) => {
          // Assert that each recipe is a RecipeWithId
          const recipeWithId = recipe as RecipeWithId;
          return (
            <RecipeComponent key={recipeWithId.id} recipe={recipeWithId} />
          );
        })}

      {/* Load More Button */}
      {!isLoading && hasMoreRecipes && (
        <TouchableOpacity
          onPress={handleLoadMore}
          style={styles.buttonTouchable}
        >
          <Button
            mode="contained"
            style={styles.loadMoreButton}
            labelStyle={styles.buttonLabel}
          >
            Load More Recipes
          </Button>
        </TouchableOpacity>
      )}

      {/* End of List Message */}
      {!isLoading && !hasMoreRecipes && (
        <Text style={styles.endOfListMessage}>
          You've reached the last recipe.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    marginTop: 32,
    paddingBottom: 16,
    borderBottomWidth: thinBorder,
    borderBottomColor: theme.colors.primary,
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  buttonTouchable: {
    borderRadius: 10,
    flex: 1,
  },
  loadMoreButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  buttonLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  endOfListMessage: {
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#888',
  },
});

export default RecipeList;
