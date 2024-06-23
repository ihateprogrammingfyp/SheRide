import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

const RoleSelectionScreen = ({ navigation }) => {
  const handleUser = () => {
    navigation.navigate('SignUp');
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground source={require('../assets/animations/car.jpg')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <LottieView
            source={require('../assets/animations/welcome.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <TouchableOpacity style={styles.button} onPress={handleUser}>
            <Text style={styles.buttonText}>Create your account</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  button: {
    width: '80%',
    height: 45,
    backgroundColor: 'transparent',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },
});

export default RoleSelectionScreen;
