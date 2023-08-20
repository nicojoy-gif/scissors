// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC7l8f5nDUr6sQCxoe81H2vH8YaopAvuXg",
  authDomain: "scissors-feba3.firebaseapp.com",
  projectId: "scissors-feba3",
  storageBucket: "scissors-feba3.appspot.com",
  messagingSenderId: "906872476255",
  appId: "1:906872476255:web:3170bd7077a1109c6e81ea",
  measurementId: "G-N1CQLET0LW"
};

export const Firebase = firebase.initializeApp(firebaseConfig);

export const auth = Firebase.auth()
export const analytics = getAnalytics(Firebase);
Firebase.analytics();
