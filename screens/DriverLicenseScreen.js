import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, PermissionsAndroid, Platform, Alert, Modal } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const DriverLicenseScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPhotoSetter, setCurrentPhotoSetter] = useState(null);
  const navigation = useNavigation();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs camera permission to take photos",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleActionSheet = (setPhotoFunction) => {
    setCurrentPhotoSetter(setPhotoFunction);
    setModalVisible(true);
  };

  const handleModalOptionPress = async (option) => {
    setModalVisible(false);
    switch (option) {
      case 'gallery':
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const source = { uri: response.assets[0].uri };
            currentPhotoSetter(source);
          }
        });
        break;
      case 'camera':
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
          console.log("Camera permission denied");
          return;
        }
        launchCamera({ mediaType: 'photo' }, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const source = { uri: response.assets[0].uri };
            currentPhotoSetter(source);
          }
        });
        break;
      case 'remove':
        Alert.alert(
          'Confirmation',
          'Are you sure you want to remove the photo?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => currentPhotoSetter(null) },
          ],
          { cancelable: false }
        );
        break;
    }
  };

  const handleSubmit = () => {
    console.log('Photo URI:', photo?.uri);
    console.log('Photo2 URI:', photo2?.uri);
    // Add your form submission logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={photo} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>No photo</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => handleActionSheet(setPhoto)} style={styles.button}>
        <Text style={styles.buttonText}>Add a Photo</Text>
      </TouchableOpacity>

      <View style={styles.photoContainer}>
        {photo2 ? (
          <Image source={photo2} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>No photo</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => handleActionSheet(setPhoto2)} style={styles.button}>
        <Text style={styles.buttonText}>Add a Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleModalOptionPress('gallery')}>
              <Text style={styles.modalButtonText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleModalOptionPress('camera')}>
              <Text style={styles.modalButtonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleModalOptionPress('remove')}>
              <Text style={[styles.modalButtonText, { color: 'red' }]}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  photoContainer: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    color: '#aaa',
  },
  button: {
    backgroundColor: '#2C7865',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#2C7865',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default DriverLicenseScreen;
