import * as firebase from "firebase";
import dotenv from "dotenv";
import "firebase/database";

dotenv.config();

// TODO: ENTER FIREBASE CONFIG
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "spot-light-66918.firebaseapp.com",
  databaseURL: "https://spot-light-66918.firebaseio.com",
  projectId: "spot-light-66918",
  storageBucket: "spot-light-66918.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const auth = firebase.auth();
export const db = firebase.database().ref();
export const store = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;
