import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/storage'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW82pxG1EKZJ6hhdYk-S6dkTL4V3IHndo",
  authDomain: "allez-d7a07.firebaseapp.com",
  projectId: "allez-d7a07",
  storageBucket: "allez-d7a07.appspot.com",
  messagingSenderId: "89290670606",
  appId: "1:89290670606:web:e6c056df30d24a1d41325f",
  measurementId: "G-JG12Y7EP1R"
};
// get the apps, if there are no apps, get app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

/* const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()
var storage = getStorage(app) */

export {app, db, storage};
