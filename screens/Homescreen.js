/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faHome, faMapMarkerAlt, faInbox, faUser, faHistory, faQuestionCircle, faShieldAlt, faLifeRing, faAngleUp, faAngleDown, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigationState } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [region, setRegion] = useState({
    latitude: 31.5204, // Lahore's latitude
    longitude: 74.3587, // Lahore's longitude
    latitudeDelta: 0.0922, // Adjust as necessary to zoom in/out
    longitudeDelta: 0.0421, // Adjust as necessary to zoom in/out
  });
  const [marker, setMarker] = useState({
    latitude: 31.5204,
    longitude: 74.3587,
  });
  const [destination, setDestination] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const routeState = useNavigationState(state => state);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const hideSidebar = () => {
    setShowSidebar(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      setLocationModalVisible(false);
    }, 1000); // Close the modal and show home screen after 1 second
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowSidebar(false); // Hide sidebar when navigating back to this screen
    });

    return unsubscribe;
  }, [navigation]);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDestinationSelect = (destination) => {
    setDestination(destination);
    setDropdownVisible(false);
    navigation.navigate('SetDestination', { destination });
  };

  return (
    <View style={styles.container}>
      {/* Google Map */}
      <MapView style={styles.map} initialRegion={region}>
        <Marker coordinate={marker} />
      </MapView>

      {/* Menu Icon at Top Left */}
      {!showSidebar && (
        <TouchableOpacity style={styles.menuIconTopLeft} onPress={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} style={styles.menuIcon} />
        </TouchableOpacity>
      )}

      {/* Search Bar */}
      <View style={styles.searchBar}>
        {/* Pick up section */}
        <View style={styles.searchSection}>
          <FontAwesomeIcon icon={faMapMarker} style={styles.locationIcon} />
          <View>
            <Text style={styles.pickUpText}>Pick up</Text>
            <Text style={styles.currentLocationText}>Current Location</Text>
          </View>
        </View>

        <View style={styles.separator} />

        {/* Drop out section */}
        <View style={styles.searchSection}>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.locationIcon} />
          <View>
            <Text style={styles.dropOutText}>Drop out</Text>
            <Text style={styles.chooseDestinationText}>Choose destination</Text>
          </View>
          <TouchableOpacity style={styles.dropdownIconContainer} onPress={handleDropdownToggle}>
            <FontAwesomeIcon icon={dropdownVisible ? faAngleUp : faAngleDown} style={styles.dropdownIcon} />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <ScrollView style={styles.dropdownMenu}>
            {['Liberty Market', 'Mall Road', 'Gulberg', 'DHA Phase 5', 'Johar Town'].map((dest, index) => (
              <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleDestinationSelect(dest)}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.dropdownItemIcon} />
                <Text>{dest}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Task Bar */}
      <View style={styles.taskBar}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
          <FontAwesomeIcon icon={faHome} style={[styles.icon, { color: routeState.index === 0 ? 'black' : 'white' }]} />
          <Text style={[styles.iconText, { color: routeState.index === 0 ? 'black' : 'white' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Inbox')}>
          <FontAwesomeIcon icon={faInbox} style={[styles.icon, { color: routeState.index === 2 ? 'black' : 'white' }]} />
          <Text style={[styles.iconText, { color: routeState.index === 2 ? 'black' : 'white' }]}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Notification')}>
          <FontAwesomeIcon icon={faInbox} style={[styles.icon, { color: routeState.index === 3 ? 'black' : 'white' }]} />
          <Text style={[styles.iconText, { color: routeState.index === 3 ? 'black' : 'white' }]}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profile')}>
          <FontAwesomeIcon icon={faUser} style={[styles.icon, { color: routeState.index === 4 ? 'black' : 'white' }]} />
          <Text style={[styles.iconText, { color: routeState.index === 4 ? 'black' : 'white' }]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {showSidebar && (
        <View style={styles.sidebar}>
          {/* Sidebar items */}
          <TouchableOpacity style={styles.sidebarItem} onPress={() => { hideSidebar(); navigation.navigate('Home'); }}>
            <FontAwesomeIcon icon={faHome} style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('RequestHistory')}>
            <FontAwesomeIcon icon={faHistory} style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Request History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('FAQ')}>
            <FontAwesomeIcon icon={faQuestionCircle} style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Safety')}>
            <FontAwesomeIcon icon={faShieldAlt} style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Safety</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Support')}>
            <FontAwesomeIcon icon={faLifeRing} style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Support</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Location Modal */}
      <Modal visible={locationModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setLocationModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Enable location services for better experience</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setLocationModalVisible(false)}>
                <Text style={styles.modalButtonText}>Enable</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  menuIconTopLeft: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  menuIcon: {
    fontSize: 24,
    color: 'black',
  },
  searchBar: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  pickUpText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  currentLocationText: {
    fontSize: 16,
  },
  dropOutText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chooseDestinationText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  dropdownIconContainer: {
    marginLeft: 'auto',
  },
  dropdownIcon: {
    fontSize: 20,
  },
  dropdownMenu: {
    maxHeight: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    elevation: 5, // Adds a shadow for better visibility
    zIndex: 2,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  taskBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#76885B',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  iconText: {
    fontSize: 12,
    marginTop: 5,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '75%',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 2,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sidebarIcon: {
    marginRight: 15,
    fontSize: 20,
    color: 'black',
  },
  sidebarText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#016A70',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;