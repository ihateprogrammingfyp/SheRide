import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerifyAgainScreen = () => {
  const [timer, setTimer] = useState(60);
  const timerRef = useRef(null);
  const textInputsRef = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    return () => {};
  }, [timer]);

  const handleResendCode = useCallback(() => {
    setTimer(60);
  }, []);

  const handleCodeChange = useCallback((index, value) => {
    if (value !== '' && index < 3) {
      textInputsRef.current[index + 1].focus();
    }
  }, []);

  const handleVerify = useCallback(() => {
    navigation.navigate('NewPassword');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Code has been sent to 03******97</Text>
      <View style={styles.codeContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            onChangeText={(value) => handleCodeChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (textInputsRef.current[index] = ref)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.resendButton} onPress={handleResendCode} disabled={timer > 0}>
        <Text style={[styles.resendText, { color: timer > 0 ? 'gray' : 'white' }]}>
          Resend code in {timer}s
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
  resendButton: {
    marginTop: 30,
    marginBottom: 10,
  },
  resendText: {
    fontSize: 18,
  },
  verifyButton: {
    backgroundColor: '#630000',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginTop: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default VerifyAgainScreen;
