/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  animationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  animation: {
    width: width * 0.9,
    height: width,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

const AnimationView = React.memo(({ source }) => (
  <View style={styles.animationContainer}>
    <LottieView
      source={source}
      autoPlay
      loop
      style={styles.animation}
    />
  </View>
));

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = useCallback(() => {
    navigation.navigate('RoleSelection');
  }, [navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate('RoleSelection');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleSkip}
        containerStyles={styles.containerStyles}
        pages={[
          {
            backgroundColor: 'black',
            image: <AnimationView source={require('../assets/animations/onboarding.json')} />,
            title: 'Welcome to SheRide',
            subtitle: 'The safe and reliable ride-sharing app exclusively for women',
          },
          {
            backgroundColor: 'black',
            image: <AnimationView source={require('../assets/animations/location.json')} />,
            title: '',
            subtitle: 'Your Ride, Your Way',
          },
          {
            backgroundColor: 'black',
            image: <AnimationView source={require('../assets/animations/login.json')} />,
            title: '',
            subtitle: '',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
