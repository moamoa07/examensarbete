import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from '../Theme';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchBookmarks } from '../redux/actions/bookmarkActions';
import { selectBookmarks } from '../redux/reducers/bookmarks';

// Get the screen width
// Calculation for styling of grid container
const { width } = Dimensions.get('window');
const containerPadding = 10; // This is the padding you want for the grid container
const numColumns = 3;
const marginSize = 8;

const totalMarginSpace = (numColumns - 1) * marginSize;
const imageSize =
  (width - totalMarginSpace - containerPadding * 2) / numColumns;

const BookmarkGrid = ({ navigation }: { navigation: any }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarks);
  const auth = getAuth();
  const userId = auth.currentUser?.uid ?? '';

  useEffect(() => {
    dispatch(fetchBookmarks(userId));
  }, [dispatch, userId]);

  const renderBookmarkItem = ({ item }: { item: RecipeWithId }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image
        source={{
          uri:
            item.imageUrl ??
            require('../assets/img/add-new-recipe-placeholder.png'),
        }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bookmarks}
      renderItem={renderBookmarkItem}
      keyExtractor={(item: RecipeWithId, index) => item.id ?? index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    width: '100%',
    // backgroundColor: 'mistyrose',
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  endOfListMessage: {
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#888',
  },
  thumbnail: {
    backgroundColor: 'mistyrose',
    width: imageSize,
    height: imageSize,
    margin: marginSize / 2, // Apply half margin size to each side
  },
});

export default BookmarkGrid;