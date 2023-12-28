// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBeNIY00IjPVYGiq8uPbAlPMGqfs7tpvqU',
  authDomain: 'plateup-1507b.firebaseapp.com',
  projectId: 'plateup-1507b',
  storageBucket: 'plateup-1507b.appspot.com',
  messagingSenderId: '725439259612',
  appId: '1:725439259612:web:58f9c9d7a291909fed2519',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

const specialOfTheDay = doc(FIREBASE_DB, 'dailySpecial/2023-12-28');
function writeDailySpecial() {
  const docData = {
    description: 'Latte',
    price: 12,
    milk: 'Whole',
    vegan: false,
  };
  setDoc(specialOfTheDay, docData);
}

writeDailySpecial();
