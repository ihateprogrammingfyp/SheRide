import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ForgotPasswordScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleContinue = useCallback(() => {
    // Implement the logic for continuing to the next screen or any other action
    // For example:
    // navigation.navigate('NextScreen');
  }, []);

  const handleOptionSelection = useCallback((option) => {
    setSelectedOption(option);
    if (option === 'SMS') {
      navigation.navigate('VerifyAgain');
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/forget.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.infoText}>
        Select which contact details should we use to reset your password:
      </Text>
      <OptionButton
        selected={selectedOption === 'SMS'}
        icon={faMobileAlt}
        label="via SMS"
        details="03******97"
        onPress={() => handleOptionSelection('SMS')}
      />
      <OptionButton
        selected={selectedOption === 'Email'}
        icon={faEnvelope}
        label="via Email"
        details="sa******@gmail.com"
        onPress={() => handleOptionSelection('Email')}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const OptionButton = React.memo(({ selected, icon, label, details, onPress }) => (
  <TouchableOpacity
    style={[styles.buttonContainer, selected && styles.selectedOption]}
    onPress={onPress}
  >
    <View style={styles.iconContainer}>
      <FontAwesomeIcon icon={icon} style={styles.icon} />
    </View>
    <View>
      <Text style={styles.buttonText}>{label}</Text>
      <Text style={styles.buttonText}>{details}</Text>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  animation: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  infoText: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'left',
    color: 'white',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'white',
    width: '80%',
  },
  selectedOption: {
    borderColor: '#4A4A4A',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#630000',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;
