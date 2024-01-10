import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { Recipe } from '../model/recipeModel';

// Add recipe with an autogenerated id to Firestore database
export async function addRecipe(recipeData: Recipe): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error('No authenticated user found');
    throw new Error('Unauthorized access'); // Prevent further execution
  }

  try {
    // Include the additional fields in the recipe data
    const docRef = await addDoc(collection(FIREBASE_DB, 'recipes'), {
      ...recipeData,
      userId: user.uid, // Store the user ID with the recipe
      createdAt: new Date(), // Set the current date as the creation date
      updatedAt: new Date(), // Set the current date as the updated date
    });
    console.log('Recipe added to Firestore');
    return docRef.id; // Return the generated recipe ID
  } catch (error) {
    console.error('Error adding recipe to Firestore:', error);
    throw error;
  }
}

// Get recipe by id from Firestore database
export async function getRecipeById(recipeId: string) {
  try {
    const docRef = doc(FIREBASE_DB, 'recipes', recipeId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Returns the document data
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

// Add image with an autogenerated id to Firestore database
export const addImage = async (imageData: { imageUrl: string }) => {
  try {
    await addDoc(collection(FIREBASE_DB, 'images'), imageData);
    console.log('Image added to Firestore');
  } catch (error) {
    console.error('Error adding image to Firestore:', error);
    throw error;
  }
};

// Get image by id from Firestore database
export async function getImageById(imageId: string) {
  try {
    const docRef = doc(FIREBASE_DB, 'images', imageId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Returns the document data
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

export async function getBookmarkedRecipes(userId: string): Promise<string[]> {
  try {
    const docRef = doc(FIREBASE_DB, 'bookmarks', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()?.bookmarkedRecipeIds || [];
    } else {
      console.log('No bookmarks found for the user!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
}

export async function addBookmarkedRecipe(userId: string, recipeId: string) {
  try {
    const docRef = doc(FIREBASE_DB, 'bookmarks', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentBookmarks = docSnap.data()?.bookmarkedRecipeIds || [];
      const updatedBookmarks = [...currentBookmarks, recipeId];

      await setDoc(docRef, { bookmarkedRecipeIds: updatedBookmarks });
    } else {
      await setDoc(docRef, { bookmarkedRecipeIds: [recipeId] });
    }

    console.log('Recipe bookmarked!');
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
}
