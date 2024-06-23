import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJ9eGNvfRw1jaTsmt9FUJYZb_fl4lDaSss",
  authDomain: "start-fyp.firebaseapp.com",
  projectId: "start-fyp",
  storageBucket: "start-fyp.appspot.com",
  messagingSenderId: "428466149522",
  appId: "1:428466149522:android:780616fe9dabcbf298ae4b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { auth };
export default firebase;
