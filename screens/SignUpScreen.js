
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGlobe, faEnvelope, faLock, faEye } from '@fortawesome/free-solid-svg-icons';
import firebase from '../firebase/firebaseconfig'; // Ensure the path is correct


const handleSignUp = async () => {
  // Validation and error handling code...

  try {
    // Call the signup function with user details
    const response = await signup({ firstName, lastName, nationality, email, password });
    // Handle success response (e.g., navigate to the next screen)
  } catch (error) {
    // Handle error response (e.g., display error message to the user)
  }
};

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [nationalityError, setNationalityError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async () => {
    // Clear previous error messages
    setFirstNameError('');
    setLastNameError('');
    setNationalityError('');
    setEmailError('');
    setPasswordError('');
    setMessage('');

    // Validate input fields
    let valid = true;
    if (!firstName) {
      setFirstNameError('First name is required.');
      valid = false;
    }
    if (!lastName) {
      setLastNameError('Last name is required.');
      valid = false;
    }
    if (!nationality) {
      setNationalityError('Nationality is required.');
      valid = false;
    }
    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    }

    if (!valid) return;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setMessage('Successfully created account.');
      navigation.navigate('Selection');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faUser} style={styles.icon} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="gray"
          style={styles.input}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            setFirstNameError('');
          }}
          autoCapitalize="none"
        />
      </View>
      {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faUser} style={styles.icon} />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="gray"
          style={styles.input}
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            setLastNameError('');
          }}
          autoCapitalize="none"
        />
      </View>
      {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faGlobe} style={styles.icon} />
        <TextInput
          placeholder="Nationality"
          placeholderTextColor="gray"
          style={styles.input}
          value={nationality}
          onChangeText={(text) => {
            setNationality(text);
            setNationalityError('');
          }}
          autoCapitalize="none"
        />
      </View>
      {nationalityError ? <Text style={styles.errorText}>{nationalityError}</Text> : null}
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faLock} style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility}>
          <FontAwesomeIcon icon={faEye} style={[styles.eyeIcon, showPassword ? styles.disabledEyeIcon : null]} />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={[styles.bottomText, { color: '#D2DE32' }]}> Sign In</Text>
        </TouchableOpacity>
      </View>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  disabledEyeIcon: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: '#630000',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomText: {
    color: 'white',
  },
  message: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default SignUpScreen;