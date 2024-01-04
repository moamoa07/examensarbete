import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';

// Add recipe with an autogenerated id to Firestore database
export const addRecipe = async (recipeData: {
  title: string;
  description: string;
}) => {
  try {
    await addDoc(collection(FIREBASE_DB, 'recipes'), recipeData);
    console.log('Recipe added to Firestore');
  } catch (error) {
    console.error('Error adding recipe to Firestore:', error);
    throw error;
  }
};

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
