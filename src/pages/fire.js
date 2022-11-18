// import { initializeApp } from "firebase/app"
// import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"

// const firebaseConfig = {
//     apiKey: "AIzaSyAgAQCQ8TJvOisttP3PfvczC2INz1SMiAU",
//     authDomain: "react-task-798d9.firebaseapp.com",
//     projectId: "react-task-798d9",
//     storageBucket: "react-task-798d9.appspot.com",
//     messagingSenderId: "531328239000",
//     appId: "1:531328239000:web:96ec63b060ebb9b6f297ed",
//     databaseURL: "https://react-task-2fa7b-default-rtdb.firebaseio.com/",
// };

// // Initialize Firebase and Firestore
// const app = initializeApp(firebaseConfig)
// export const db = getFirestore(app)
// export const storage = getStorage(app)

import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAgAQCQ8TJvOisttP3PfvczC2INz1SMiAU",

  authDomain: "react-task-2fa7b.firebaseapp.com",

  databaseURL: "https://react-task-2fa7b-default-rtdb.firebaseio.com",

  projectId: "react-task-2fa7b",

  storageBucket: "react-task-2fa7b.appspot.com",

  messagingSenderId: "410744045954",

  appId: "1:410744045954:web:68a420157247edbf6b8f9b",

  measurementId: "G-P39440GC8D",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)