import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import * as firebase from "firebase/app";
import { useEffect } from "react";
const firebaseConf = {
  apiKey: "AIzaSyBAX2u96gpYSmM7CuECu6c5scZAB2zl5ks",
  authDomain: "osvb-1.firebaseapp.com",
  projectId: "osvb-1",
  storageBucket: "osvb-1.appspot.com",
  messagingSenderId: "115801201583",
  appId: "1:115801201583:web:87483ef97d8ade89676d5a",
  measurementId: "G-CJF52B9K88"
};

const app = initializeApp(firebaseConf);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore();
const provider = new GoogleAuthProvider()

var currToken = null;
export {auth, storage, db, provider,currToken}

