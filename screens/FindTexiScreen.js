/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

Geocoder.init('AIzaSyBJ9eGNvfRw1jaTsmt9FUJYZb_fl4lDaSss'); // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key

const FindTexiScreen = ({ route, navigation }) => {
  const { destination } = route.params;

  const initialRegion = {
    latitude: 31.5204,
    longitude: 74.3587,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [region, setRegion] = useState(initialRegion);
  const [userLocation, setUserLocation] = useState(initialRegion);
  const [driverLocations, setDriverLocations] = useState([]);
  const [closestDriver, setClosestDriver] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    // Mock data for driver locations
    const drivers = [
      { id: 1, latitude: 31.5285, longitude: 74.3578 },
      { id: 2, latitude: 31.5171, longitude: 74.3612 },
      { id: 3, latitude: 31.5225, longitude: 74.3422 },
    ];
    setDriverLocations(drivers);

    Geocoder.from(destination)
      .then((json) => {
        const location = json.results[0].geometry.location;
        const userLoc = { latitude: location.lat, longitude: location.lng };
        setUserLocation(userLoc);
        setRegion({
          ...userLoc,
          latitudeDelta: 0.01, // Smaller delta for closer zoom
          longitudeDelta: 0.01,
        });

        // Find closest driver
        let closest = null;
        let minDistance = Infinity;
        drivers.forEach((driver) => {
          const distance = getDistance(userLoc, driver);
          if (distance < minDistance) {
            minDistance = distance;
            closest = driver;
          }
        });
        setClosestDriver(closest);

        // Get route coordinates
        if (closest) {
          getRouteCoordinates(userLoc, closest);
        }
      })
      .catch((error) => {
        console.error('Error fetching destination:', error);
        Alert.alert('Error', 'Could not fetch destination. Please try again later.');
      });
  }, [destination]);

  const getDistance = (loc1, loc2) => {
    const R = 6371e3; // metres
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres
    return distance;
  };

  const getRouteCoordinates = async (start, end) => {
    const mode = 'driving'; // Change as necessary
    const origin = `${start.latitude},${start.longitude}`;
    const destination = `${end.latitude},${end.longitude}`;
    const apiKey = 'AIzaSyBJ9eGNvfRw1jaTsmt9FUJYZb_fl4lDaSss'; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const points = response.data.routes[0].overview_polyline.points;
      const steps = decodePolyline(points);
      setRouteCoordinates(steps);
    } catch (error) {
      console.error('Error fetching route:', error);
      Alert.alert('Error', 'Could not fetch route. Please try again later.');
    }
  };

  const decodePolyline = (t) => {
    let points = [];
    let index = 0,
      len = t.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
      >
        <Marker coordinate={userLocation} title="User Location" />
        {driverLocations.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={driver}
            title={`Driver ${driver.id}`}
          />
        ))}
        {closestDriver && (
          <Marker
            coordinate={closestDriver}
            pinColor="blue"
            title="Closest Driver"
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('BookNow')}
        style={styles.findTexiButton}
      >
        <Text style={styles.buttonText}>Find Taxi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
  findTexiButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#76885B',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
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

export default FindTexiScreen;
