// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8xJKhPfHK2LadSXdi_BCjMUeBYk_oKPM",
  authDomain: "schedly-91e1d.firebaseapp.com",
  projectId: "schedly-91e1d",
  storageBucket: "schedly-91e1d.firebasestorage.app",
  messagingSenderId: "35345530110",
  appId: "1:35345530110:web:d0cef67dda54e821eab9af",
  measurementId: "G-WLQSHENDTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);