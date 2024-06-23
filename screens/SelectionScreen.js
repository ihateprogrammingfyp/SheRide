/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const SelectionScreen = ({ navigation }) => {
  const handlePassengerPress = () => {
    navigation.navigate('FillProfile');
  };

  const handleDriverPress = () => {
    navigation.navigate('DriverProfile');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/animations/background_image.jpg')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Who are You?</Text>
          <TouchableOpacity style={styles.button} onPress={handlePassengerPress}>
            <Text style={styles.buttonText}>Passenger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDriverPress}>
            <Text style={styles.buttonText}>Driver</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: width * 0.8, // Use a percentage of screen width for flexibility
    height: 40,
    backgroundColor: '#135D66',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default SelectionScreen;
