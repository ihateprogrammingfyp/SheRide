import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const DriverProfileScreen = () => {
  const navigation = useNavigation();

  const navigateToRegistration = (vehicle) => {
    navigation.navigate('Registration', { vehicle });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Select Your Vehicle</Text>
      <TouchableOpacity onPress={() => navigateToRegistration('Car')} style={styles.button}>
        <Text style={styles.buttonText}>Car</Text>
        <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToRegistration('Rikshaw')} style={styles.button}>
        <Text style={styles.buttonText}>Rikshaw</Text>
        <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToRegistration('Bike')} style={styles.button}>
        <Text style={styles.buttonText}>Bike</Text>
        <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default DriverProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 20,
  },
});
