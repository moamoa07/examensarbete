import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Searchbar, Text } from 'react-native-paper';

type User = {
  id: string;
  name: string;
  image: string;
  // ... other properties
};

type Recipe = {
  id: string;
  title: string;
  image: string;
};

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<(User | Recipe)[]>([]);
  const [searchType, setSearchType] = useState<'users' | 'recipes'>('users');

  // Mocked list of users (replace with your actual list of users)
  const allUsers: User[] = [
    {
      id: '1',
      name: 'Nathalie',
      image:
        'https://github.com/moamoa07/PlateUp/assets/113519935/a3aa104c-d5ff-4d1b-bcd5-54a10fd00fd7',
    },
    {
      id: '2',
      name: 'Moa',
      image:
        'https://github.com/moamoa07/PlateUp/assets/113519935/a3aa104c-d5ff-4d1b-bcd5-54a10fd00fd7',
    },
    {
      id: '3',
      name: 'Lisa-Marie',
      image:
        'https://github.com/moamoa07/PlateUp/assets/113519935/a3aa104c-d5ff-4d1b-bcd5-54a10fd00fd7',
    },
    // ... other users
  ];

  // Mocked list of recipes (replace with your actual list of users)
  const allRecipes: Recipe[] = [
    {
      id: '11',
      title: 'Chokladkaka',
      image:
        'https://cdn-rdb.arla.com/Files/arla-se/3181484453/def2d890-b9c5-4f30-b60b-626fb40e74dc.jpg?crop=(0,0,0,-148)&w=1269&h=715&mode=crop&ak=f525e733&hm=bd2594bd',
    },
    {
      id: '22',
      title: 'Citronkaka',
      image:
        'https://img.koket.se/standard-mega/mjuk-citronkaka-med-syrlig-glasyr-dansukker.png.webp',
    },
    {
      id: '33',
      title: 'Macarons',
      image:
        'https://cdn-rdb.arla.com/Files/arla-se/3269212119/01bd1421-10fa-497e-8a5b-ee2c5101e31d.jpg?w=1269&h=715&mode=crop&ak=f525e733&hm=b762ca1a',
    },
    // ... other recipes
  ];

  const handleSearch = (query: string) => {
    const filtered =
      searchType === 'users'
        ? allUsers.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
          )
        : allRecipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(query.toLowerCase())
          );
    setFilteredResults(filtered);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          Platform.OS === 'android' && { marginTop: 50 },
          Platform.OS === 'ios' && { marginTop: 20 },
        ]}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
          value={searchQuery}
          style={[styles.searchbar]}
        />

        {/* Buttons to toggle between Users and Recipes */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              searchType === 'users' && styles.activeButton,
            ]}
            onPress={() => {
              setSearchType('users');
              setSearchQuery(''); // Clear the search query
            }}
          >
            <Text style={[styles.buttonText && styles.activeButtonText]}>
              Users
            </Text>
          </TouchableOpacity>
          <Text style={[styles.divider]}>|</Text>
          <TouchableOpacity
            style={[
              styles.button,
              searchType === 'recipes' && styles.activeButton,
            ]}
            onPress={() => {
              setSearchType('recipes');
              setSearchQuery(''); // Clear the search query
            }}
          >
            <Text
              style={[
                styles.buttonText,
                searchType === 'recipes' && styles.activeButtonText,
              ]}
            >
              Recipes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Users or Recipes based on the active section */}
        {searchQuery.length > 0 && filteredResults.length > 0 ? (
          <View>
            {filteredResults.map((result) => (
              <View key={result.id}>
                {searchType === 'users' ? (
                  <View style={[styles.userLayout]}>
                    <Avatar.Image
                      size={50}
                      source={{ uri: (result as User).image }}
                    />
                    <Text style={[styles.userName]}>
                      {(result as User).name}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>{(result as Recipe).title}</Text>
                    <Avatar.Image
                      size={140}
                      source={{ uri: (result as Recipe).image }}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={[styles.emptySearchTextContainer]}>
            <Text style={[styles.emptySearchText]}>
              {searchQuery.length > 0
                ? searchType === 'users'
                  ? 'No matching users found'
                  : 'No matching recipes found'
                : searchType === 'users'
                ? 'Discover amazing users and connect with them!'
                : 'Explore delicious recipes and get inspired!'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  searchbar: {
    borderRadius: 10,
    width: '90%',
  },
  emptySearchTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    paddingHorizontal: 10,
  },
  emptySearchText: {
    fontFamily: 'Crake-Regular',
    fontSize: 40,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  button: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    // marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  divider: {
    marginHorizontal: 10,
  },
  userLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  userName: {
    fontFamily: 'Jost-Regular',
    fontSize: 20,
  },
  activeButtonText: {
    fontWeight: 'bold',
    fontFamily: 'Jost-Medium',
  },
  activeButton: {
    // backgroundColor: '#ccc',
  },
});

export default SearchScreen;
