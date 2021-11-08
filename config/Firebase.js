import { initializeApp, getApp, getApps } from "firebase/app";
import "firebase/auth";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL,
  measurementId: Constants.manifest.extra.measurementId,
};

let Firebase;
// Firebase = initializeApp(firebaseConfig);

if (getApps().length === 0) {
  Firebase = initializeApp(firebaseConfig);
} else {
  const getAppVar = getApp();
  console.log(getAppVar)
}

export default Firebase;
