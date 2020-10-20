import * as firebase from "firebase";
import "firebase/database";

// TODO: ENTER FIREBASE CONFIG
const firebaseConfig = {};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
export const auth = firebase.auth();
export const db = firebase.database().ref();
export const store = firebase.firestore();
export default firebase;
