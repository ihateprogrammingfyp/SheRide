import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CNICScreen = () => {
  const navigation = useNavigation();
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);
  const [cnicNumber, setCnicNumber] = useState('');
  const [isValidCnic, setIsValidCnic] = useState(true);

  const takePhoto = async (setPhoto) => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', 'Failed to capture image. Please try again.');
        } else {
          const source = { uri: response.assets[0].uri };
          setPhoto(source);
        }
      }
    );
  };

  const handleCnicChange = (text) => {
    setCnicNumber(text);
    setIsValidCnic(text.length <= 13);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          {frontPhoto ? (
            <Image source={frontPhoto} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>CNIC (Front Side)</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => takePhoto(setFrontPhoto)} style={styles.button}>
          <Text style={styles.buttonText}>Add a Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          {backPhoto ? (
            <Image source={backPhoto} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>CNIC (Back Side)</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => takePhoto(setBackPhoto)} style={styles.button}>
          <Text style={styles.buttonText}>Add a Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cnicContainer}>
        <Text style={styles.cnicText}>CNIC Number</Text>
        <TextInput
          style={[styles.cnicInput, !isValidCnic && styles.invalidInput]}
          keyboardType="numeric"
          maxLength={13}
          value={cnicNumber}
          onChangeText={handleCnicChange}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('RegistrationScreen')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  photoSection: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  photoContainer: {
    width: '90%',
    height: 200,
    marginBottom: 10,
    borderWidth: 1,
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
    height: '100%',
  },
  photoPlaceholderText: {
    color: '#aaa',
  },
  button: {
    backgroundColor: '#2C7865',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  cnicContainer: {
    width: '90%',
    marginBottom: 20,
    alignItems: 'center',
  },
  cnicText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cnicInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    width: '100%',
  },
  invalidInput: {
    borderColor: 'red',
  },
  nextButton: {
    backgroundColor: '#2C7865',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default CNICScreen;
