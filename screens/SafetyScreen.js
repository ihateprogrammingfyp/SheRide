import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = ({ route }) => {
  const { vehicle } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={30} color="#000" />
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={styles.headerText}>Register your {vehicle}</Text>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {/* Basic Info Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Basicinfo')} style={styles.button}>
          <Text style={styles.buttonText}>Basic Info</Text>
          <FontAwesomeIcon icon={faChevronRight} size={24} color="black" />
        </TouchableOpacity>

        {/* CNIC Button */}
        <TouchableOpacity onPress={() => navigation.navigate('CNIC')} style={styles.button}>
          <Text style={styles.buttonText}>CNIC</Text>
          <FontAwesomeIcon icon={faChevronRight} size={24} color="black" />
        </TouchableOpacity>

        {/* Selfie with ID Button */}
        <TouchableOpacity onPress={() => navigation.navigate('SelfieIDScreen')} style={styles.button}>
          <Text style={styles.buttonText}>Selfie with ID</Text>
          <FontAwesomeIcon icon={faChevronRight} size={24} color="black" />
        </TouchableOpacity>

        {/* Vehicle Info Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Vehicleinfo')} style={styles.button}>
          <Text style={styles.buttonText}>Vehicle Info</Text>
          <FontAwesomeIcon icon={faChevronRight} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Done Button */}
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
  },
  doneButton: {
    backgroundColor: '#2C7865',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  doneButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
