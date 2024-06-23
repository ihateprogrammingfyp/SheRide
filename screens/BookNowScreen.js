import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const vehicles = [
  { id: 1, type: 'Rickshaw', time: '5 mins', fare: 'PKR 100', image: require('../assets/animations/rikshaw.jpg') },
  { id: 2, type: 'Car', time: '7 mins', fare: 'PKR 300', image: require('../assets/animations/femalecar.jpg') },
  { id: 3, type: 'Bike', time: '3 mins', fare: 'PKR 50', image: require('../assets/animations/bike.jpg') },
  { id: 4, type: 'Scooty', time: '6 mins', fare: 'PKR 70', image: require('../assets/animations/scooty2.jpg') },
];

const BookNowScreen = ({ navigation }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.arrowIcon} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Available Taxis</Text>

      <View style={styles.vehicleList}>
        {vehicles.map(vehicle => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleButton,
              selectedVehicle === vehicle.id && styles.selectedVehicleButton,
            ]}
            onPress={() => setSelectedVehicle(vehicle.id)}
          >
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{vehicle.type}</Text>
              <Text style={styles.vehicleText}>{vehicle.time}</Text>
              <Text style={styles.vehicleText}>{vehicle.fare}</Text>
            </View>
            <Image source={vehicle.image} style={[styles.vehicleImage, getVehicleImageStyle(vehicle.id)]} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Booking')}
        style={styles.bookNowButton}
      >
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const getVehicleImageStyle = (id) => {
  switch (id) {
    case 1:
      return { width: 120, height: 70 };
    case 2:
      return { width: 150, height: 70 };
    case 3:
      return { width: 140, height: 70 };
    case 4:
      return { width: 90, height: 70 };
    default:
      return { width: 160, height: 60 };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  arrowButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
    elevation: 5,
  },
  arrowIcon: {
    fontSize: 20,
    color: 'black',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  vehicleList: {
    flex: 1,
    marginVertical: 10,
  },
  vehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
  },
  selectedVehicleButton: {
    borderColor: '#016A70',
    borderWidth: 2,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  vehicleText: {
    fontSize: 16,
    color: 'black',
  },
  vehicleImage: {
    marginLeft: 10,
  },
  bookNowButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#76885B',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 300, // Adjusted width
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookNowScreen;
