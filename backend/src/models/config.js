// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
var initializeApp = require('firebase/app')
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt_Xn_NCaIHvofXnmBs4DtGcqEpNkRIis",
  authDomain: "co3103.firebaseapp.com",
  databaseURL: "https://co3103-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "co3103",
  storageBucket: "co3103.appspot.com",
  messagingSenderId: "994368899903",
  appId: "1:994368899903:web:a548ec7e755f07fc80618a",
  measurementId: "G-NQ1T7V32TS"
};

// Initialize Firebase
const fb_app = initializeApp.initializeApp(firebaseConfig);
module.exports = fb_app;