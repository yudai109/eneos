import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDCaFZyHS53PkaXMrsjtXNRE7b-MWvvDQ0",
  authDomain: "vi-eneos-portal.firebaseapp.com",
  projectId: "vi-eneos-portal",
  storageBucket: "vi-eneos-portal.appspot.com",
  messagingSenderId: "329071357873",
  appId: "1:329071357873:web:8c3bda7c991d49a9019790"
};

firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();
// const auth = firebase.auth();

// const dbsettinfs = { timestampsInSnapshots: true };
// firestore.settings(dbsettinfs);

export const auth = firebase.auth
export const firestore = firebase.firestore
export default firebase