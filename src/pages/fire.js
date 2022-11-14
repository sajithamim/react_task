// // Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";


// const firebaseConfig = {
//     apiKey: "AIzaSyDguBICjJR5-8LB6t8fhX6mZEsP2Gbr9Xc",
//     authDomain: "react-task-798d9.firebaseapp.com",
//     projectId: "react-task-798d9",
//     storageBucket: "react-task-798d9.appspot.com",
//     messagingSenderId: "531328239000",
//     appId: "1:531328239000:web:96ec63b060ebb9b6f297ed",
//     databaseURL: "https://react-task-2fa7b-default-rtdb.firebaseio.com/",
    
// };


// // Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);


// export default app;

import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDguBICjJR5-8LB6t8fhX6mZEsP2Gbr9Xc",
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

export  {db};