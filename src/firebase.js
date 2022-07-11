// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDD6tSw863fu236ggDBBx7jtkl94auVb4Y",
    authDomain: "backend-f7536.firebaseapp.com",
    projectId: "backend-f7536",
    storageBucket: "backend-f7536.appspot.com",
    messagingSenderId: "738387413601",
    appId: "1:738387413601:web:674dc5f05b48050924f820",
    measurementId: "G-J6FNGMR9HP"
};
//use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);
//Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };