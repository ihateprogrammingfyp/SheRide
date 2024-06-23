/* eslint-disable no-unused-vars */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {onAuthStateChanged} from 'firebase/auth';
import {ActivityIndicator, View} from 'react-native';
import OnboardingScreen from '../screens/OnboardingScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import SelectionScreen from '../screens/SelectionScreen';
import FillProfileScreen from '../screens/FillProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswodScreen from '../screens/NewPasswordScreen';
import VerifyAgainScreen from '../screens/VerifyAgainScreen';
import HomeScreen from '../screens/Homescreen';
import SafetyScreen from '../screens/SafetyScreen';
import SupportScreen from '../screens/SupportScreen';
import FAQScreen from '../screens/FAQScreen';
import InboxScreen from '../screens/Inbox';
import RequestHistory from '../screens/RequestHistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Profile from '../screens/Profile';
import SetDestinationScreen from '../screens/SetDestinationScreen';
import FindTexiScreen from '../screens/FindTexiScreen';
import BookNowScreen from '../screens/BookNowScreen';
import DriverProfileScreen from '../screens/DriverProfileScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import SelfieIDScreen from '../screens/SelfieIDScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import CNICScreen from '../screens/CNICScreen';
import VehicleInfoScreen from '../screens/VehicleInfoScreen';
import DriverLicenseScreen from '../screens/DriverLicenseScreen.js';
import InfoScreen from '../screens/InfoScreen';
import VehiclePhotoScreen from '../screens/VehiclePhotoScreen';
import CertificateScreen from '../screens/CertificateScreen';


import {Screen} from 'react-native-screens';



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          options={{headerShown: false}}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="RoleSelection"
          options={{headerShown: false}}
          component={RoleSelectionScreen}
        />
         <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUpScreen}
        />
         <Stack.Screen
          name="SignInScreen"
          options={{headerShown: false}}
          component={SignInScreen}
        />
         <Stack.Screen
          name="Selection"
          options={{headerShown: false}}
          component={SelectionScreen}
        />
         <Stack.Screen
          name="FillProfile"
          options={{headerShown: false}}
          component={FillProfileScreen}
        />
         <Stack.Screen
          name="ForgotPassword"
          options={{headerShown: false}}
          component={ForgotPasswordScreen}
        />
         <Stack.Screen
          name="VerifyAgain"
          options={{headerShown: false}}
          component={VerifyAgainScreen}
        />
        <Stack.Screen
          name="NewPassword"
          options={{headerShown: false}}
          component={NewPasswodScreen}
        />
         <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
         <Stack.Screen
          name="Safety"
          options={{headerShown: false}}
          component={SafetyScreen}
        />
         <Stack.Screen
          name="Support"
          options={{headerShown: false}}
          component={SupportScreen}
        />
         <Stack.Screen
          name="FAQ"
          options={{headerShown: false}}
          component={FAQScreen}
        />
        <Stack.Screen
          name="Inbox"
          options={{headerShown: false}}
          component={InboxScreen}
        />
          <Stack.Screen
          name="RequestHistory"
          options={{headerShown: false}}
          component={RequestHistory}
        />
        <Stack.Screen
          name="Notification"
          options={{headerShown: false}}
          component={NotificationScreen}
        />
         <Stack.Screen
          name="Profile"
          options={{headerShown: false}}
          component={Profile}
        />
         <Stack.Screen
          name="SetDestination"
          options={{headerShown: false}}
          component={SetDestinationScreen}
        />
         <Stack.Screen
          name="FindTexi"
          options={{headerShown: false}}
          component={FindTexiScreen}
        />
          <Stack.Screen
          name="BookNow"
          options={{headerShown: false}}
          component={BookNowScreen}
        />
          <Stack.Screen
          name="DriverProfile"
          options={{headerShown: false}}
          component={DriverProfileScreen}
        />
        <Stack.Screen
          name="Registration"
          options={{headerShown: false}}
          component={RegistrationScreen}
        />
      <Stack.Screen
          name="SelfieID"
          options={{headerShown: false}}
          component={SelfieIDScreen}
        />
         <Stack.Screen
          name="CNIC"
          options={{headerShown: false}}
          component={CNICScreen}
        />
          <Stack.Screen
          name="BasicInfo"
          options={{headerShown: false}}
          component={BasicInfoScreen}
        />
         <Stack.Screen
          name="VehicleInfo"
          options={{headerShown: false}}
          component={VehicleInfoScreen}
        />
        <Stack.Screen
          name="DriverLicense"
          options={{headerShown: false}}
          component={DriverLicenseScreen}
        />
        <Stack.Screen
          name="Info"
          options={{headerShown: false}}
          component={InfoScreen}
        />
         <Stack.Screen
          name="VehiclePhoto"
          options={{headerShown: false}}
          component={VehiclePhotoScreen}
        />
         <Stack.Screen
          name="Certificate"
          options={{headerShown: false}}
          component={CertificateScreen}
        />
    
 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
