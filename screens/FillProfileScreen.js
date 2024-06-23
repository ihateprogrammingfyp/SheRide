import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen, faEnvelope, faCalendarAlt, faPhoneAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import FemaleIcon from '../assets/animations/female.jpg';

const FillProfile = ({ navigation }) => {
  const handleSaveProfile = () => {
    navigation.navigate('Home');
  };

  const renderInput = (placeholder, icon, editable = true) => (
    <View style={styles.inputContainer}>
      <FontAwesomeIcon icon={icon} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.input}
        editable={editable}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleSaveProfile}>
          <Image source={FemaleIcon} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveProfile} style={styles.penContainer}>
          <FontAwesomeIcon icon={faPen} style={styles.penIcon} />
        </TouchableOpacity>
      </View>
      {renderInput('Full Name', faUser)}
      {renderInput('Nick Name', faUser)}
      {renderInput('Email', faEnvelope)}
      {renderInput('Date of Birth', faCalendarAlt)}
      {renderInput('Phone Number', faPhoneAlt)}
      {renderInput('Gender', faUser, false)}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save</Text>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  penContainer: {
    position: 'absolute',
    right: -10, // adjust as needed
    bottom: 0, // adjust as needed
    backgroundColor: 'transparent',
  },
  penIcon: {
    color: 'white',
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    color: 'white',
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#c9184a',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 100, // Adjust width as needed
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FillProfile;
