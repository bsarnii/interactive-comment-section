// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection} from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9xZ0Ybu31ExQ7BEkf48k_nZblKCr5eO0",
  authDomain: "comment-section-812cd.firebaseapp.com",
  projectId: "comment-section-812cd",
  storageBucket: "comment-section-812cd.appspot.com",
  messagingSenderId: "804806084171",
  appId: "1:804806084171:web:7742a7c564db006653afce",
  measurementId: "G-BVQXKWEEV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore()

export const colRef = collection(db, "post")

export const auth = getAuth(app)

