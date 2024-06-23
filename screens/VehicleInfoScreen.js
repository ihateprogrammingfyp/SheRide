import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const VehicleInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Vehicle Info Screen</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Info')}>
          <Text style={styles.buttonText}>Add some info</Text>
          <FontAwesomeIcon icon={faAngleRight} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DriverLicense')}>
          <Text style={styles.buttonText}>Driver License</Text>
          <FontAwesomeIcon icon={faAngleRight} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VehiclePhoto')}>
          <Text style={styles.buttonText}>Photo of your vehicle</Text>
          <FontAwesomeIcon icon={faAngleRight} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Certificate')}>
          <Text style={styles.buttonText}>Certificate of vehicle registration</Text>
          <FontAwesomeIcon icon={faAngleRight} size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VehicleInfoScreen;

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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
