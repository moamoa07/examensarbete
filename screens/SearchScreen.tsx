import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';

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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState(true); // true for users, false for recipes

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
    const filtered = allUsers.filter((user) =>
      user.name.toLocaleLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
          value={searchQuery}
          style={[styles.searchbar]}
        />

        {/* Buttons to toggle between Ingredients and Instructions */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button]}
            // style={[styles.button, showIngredients && styles.activeButton]}
            // onPress={() => toggleSection('ingredients')}
          >
            <Text
              style={[styles.buttonText]}
              // style={[
              //   styles.buttonText,
              //   showIngredients && styles.activeButtonText,
              // ]}
            >
              Users
            </Text>
          </TouchableOpacity>
          <Text style={[styles.divider]}>|</Text>
          <TouchableOpacity
            style={[styles.button]}
            // style={[styles.button, !showIngredients && styles.activeButton]}
            // onPress={() => toggleSection('instructions')}
          >
            <Text
              style={[styles.buttonText]}
              // style={[
              //   styles.buttonText,
              //   !showIngredients && styles.activeButtonText,
              // ]}
            >
              Recipes
            </Text>
          </TouchableOpacity>
        </View>

        {searchQuery.length > 0 && filteredUsers.length > 0 ? (
          <View>
            {filteredUsers.map((user) => (
              <View key={user.id}>
                <Text>{user.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={[styles.emptySearchTextContainer]}>
            <Text style={[styles.emptySearchText]}>
              {searchQuery.length > 0
                ? 'No matching users found'
                : 'Discover recipes and connect with others!'}
            </Text>
          </View>
        )}

        {/* Users or Recipes /*}
        {showIngredients ? (
              // Ingredients list
              <View style={styles.ingredientsList}>
                {recipe.ingredients?.map((group, index) => (
                  <View key={index} style={styles.group}>
                    {group.ingredientSubtitle && (
                      <Text style={styles.subtitle}>
                        {group.ingredientSubtitle}
                      </Text>
                    )}
                    {group.items?.map((ingredient, i) => (
                      <View key={i} style={styles.ingredientItem}>
                        <Text
                          style={styles.ingredientQuantity}
                        >{`${ingredient.quantity}`}</Text>
                        <Text style={styles.ingredientName}>
                          {ingredient.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              // Instructions list
              <View style={styles.instructionsList}>
                {recipe.instructions?.map((group, index) => (
                  <View key={index} style={styles.group}>
                    {group.instructionSubtitle && (
                      <Text style={styles.subtitle}>
                        {group.instructionSubtitle}
                      </Text>
                    )}
                    {group.steps?.map((step, i) => (
                      <View key={i} style={styles.instructionItem}>
                        <Text style={styles.stepNumber}>{`${i + 1}.`}</Text>
                        <Text style={styles.instructionText}>
                          {step.instruction}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )} */}
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
    height: '80%',
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
    marginVertical: 10,
    marginTop: 25,
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
});

export default SearchScreen;
