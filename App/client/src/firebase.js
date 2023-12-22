import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsvkBe4kqB4icjZjPptWUj0VaebDwecS8",
  authDomain: "react-blog1000.firebaseapp.com",
  projectId: "react-blog1000",
  storageBucket: "react-blog1000.appspot.com",
  messagingSenderId: "339707168636",
  appId: "1:339707168636:web:aab999d56fac6d4b7606f9"
};

firebase.initializeApp(firebaseConfig)

export default firebase;