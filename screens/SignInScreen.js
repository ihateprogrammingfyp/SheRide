
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock, faEye } from '@fortawesome/free-solid-svg-icons';
import firebase from '../firebase/firebaseconfig'; // Ensure the path is correct
// import { signin } from '../services/api'; // Import the signin function

const handleSignIn = async () => {
  // Validation and error handling code...

  try {
    // Call the signin function with user credentials
    const response = await signin(email, password);
    // Handle success response (e.g., navigate to the next screen)
  } catch (error) {
    // Handle error response (e.g., display error message to the user)
  }
};

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setMessage('Successfully logged in.');
      navigation.navigate('Selection');
    } catch (error) {
      console.error('Error signing in:', error.message);
      handleFirebaseAuthError(error);
    }
  };

  const handleFirebaseAuthError = (error) => {
    switch (error.code) {
      case 'auth/network-request-failed':
        setMessage('Network error. Please check your internet connection.');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setMessage('Invalid email or password.');
        break;
      case 'auth/too-many-requests':
        setMessage('Too many requests. Please try again later.');
        break;
      default:
        setMessage(`Error signing in: ${error.message}`);
        break;
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to SignUpScreen
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to ForgotPassword screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createYour}>Login Your</Text>
      <Text style={styles.account}>Account</Text>
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faLock} style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility}>
          <FontAwesomeIcon icon={faEye} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>
      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : null}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={[styles.signInButtonText, { fontSize: 20 }]}>Sign In</Text>
      </TouchableOpacity>
      {/* Navigation to SignUpScreen */}
      <TouchableOpacity style={styles.signUpTextContainer} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? <Text style={[styles.signUpLink, { color: '#D2DE32' }]}>Sign Up</Text></Text>
      </TouchableOpacity>
      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  createYour: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  account: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRadius: 10,
    color: 'white',
  },
  eyeIcon: {
    marginLeft: 10,
    color: 'white',
  },
  signInButton: {
    backgroundColor: '#820000',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpTextContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  signUpText: {
    fontSize: 16,
    color: 'white',
  },
  signUpLink: {
    fontWeight: 'bold',
  },
  message: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'white',
  },
});

export default SignInScreen;