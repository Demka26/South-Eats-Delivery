import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBEi8uGeU-iXogfsGiATBq7Wn6_3AHdVko",
    authDomain: "south-eats-ecfa6.firebaseapp.com",
    projectId: "south-eats-ecfa6",
    storageBucket: "south-eats-ecfa6.appspot.com",
    messagingSenderId: "770995095612",
    appId: "1:770995095612:web:296e266a43ff7a5091db39"
};

// checking if firebase has been initialized
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();