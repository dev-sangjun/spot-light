import * as firebase from "firebase";
import "firebase/database";

// TODO: ENTER FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBp1fdpne0Y__RWC8K6-VnAELBwZf4DuUY",
  authDomain: "spot-light-66918.firebaseapp.com",
  databaseURL: "https://spot-light-66918.firebaseio.com",
  projectId: "spot-light-66918",
  storageBucket: "spot-light-66918.appspot.com",
  messagingSenderId: "89111530830",
  appId: "1:89111530830:web:3e7dfa9c30b54b14cca21f",
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const auth = firebase.auth();
export const db = firebase.database().ref();
export const store = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;
