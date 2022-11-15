import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAgAQCQ8TJvOisttP3PfvczC2INz1SMiAU",
    authDomain: "react-task-798d9.firebaseapp.com",
    projectId: "react-task-798d9",
    storageBucket: "react-task-798d9.appspot.com",
    messagingSenderId: "531328239000",
    appId: "1:531328239000:web:96ec63b060ebb9b6f297ed",
    databaseURL: "https://react-task-2fa7b-default-rtdb.firebaseio.com/",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)


export  default db;