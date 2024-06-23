
import React from 'react'; // Add this import
import AppNavigation from './navigation/AppNavigation'; // Corrected import statement
import firebase from '@react-native-firebase/app'; // Import Firebase

// Initialize Firebase
firebase.initializeApp({
  // Your Firebase configuration
});

export default function App() {
  return <AppNavigation />;
}
