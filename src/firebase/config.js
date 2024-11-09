import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuyyV4d1freOl_WRO-R6rR2RmYbfVgQqc",
  authDomain: "learning-firebase-5e051.firebaseapp.com",
  projectId: "learning-firebase-5e051",
  storageBucket: "learning-firebase-5e051.firebasestorage.app",
  messagingSenderId: "805229540590",
  appId: "1:805229540590:web:5796b3336831e53b8eafff",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
