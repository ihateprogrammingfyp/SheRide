/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const locations = {
  'Liberty Market': { latitude: 31.5204, longitude: 74.3587 },
  'Mall Road': { latitude: 31.5497, longitude: 74.3436 },
  'Gulberg': { latitude: 31.5091, longitude: 74.3430 },
  'DHA Phase 5': { latitude: 31.4548, longitude: 74.3671 },
  'Johar Town': { latitude: 31.4675, longitude: 74.2937 },
};

const initialRegion = {
  latitude: 31.5204,
  longitude: 74.3587,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const SetDestinationScreen = ({ route, navigation }) => {
  const { destination } = route.params;

  const [region, setRegion] = useState(initialRegion);
  const [marker, setMarker] = useState(null);
  const [searchText, setSearchText] = useState(destination || '');

  useEffect(() => {
    if (destination && locations[destination]) {
      const location = locations[destination];
      setMarker(location);
      setRegion({
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [destination]);

  const handleSearchClear = () => {
    setSearchText('');
    setMarker(null);
  };

  const handleSetDestination = () => {
    if (searchText && locations[searchText]) {
      navigation.navigate('FindTexi', { destination: searchText });
    } else {
      alert('Please select a valid destination from the list.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleSearchClear} style={styles.clearIconContainer}>
            <FontAwesomeIcon icon={faTimes} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.setDestinationButton} onPress={handleSetDestination}>
        <Text style={styles.setDestinationButtonText}>Set Destination</Text>
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
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 1,
    elevation: 5,
  },
  backIconContainer: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 20,
    color: 'black',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearIconContainer: {
    marginLeft: 10,
  },
  clearIcon: {
    fontSize: 20,
    color: 'black',
  },
  setDestinationButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -125 }], // Adjusted to center the button
    width: 250,
    backgroundColor: '#76885B',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
  },
  setDestinationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetDestinationScreen;
