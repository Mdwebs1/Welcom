import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA6ulKuRMQ5wK4LIOAjjMWhgoOrRyKZYkw",
    authDomain: "finalproject-14aff.firebaseapp.com",
    databaseURL: "https://finalproject-14aff-default-rtdb.firebaseio.com",
    projectId: "finalproject-14aff",
    storageBucket: "finalproject-14aff.appspot.com",
    messagingSenderId: "341329459761",
    appId: "1:341329459761:web:95f46a9b25912aeee17310",
    measurementId: "G-N47S10C85R"
  };


// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();