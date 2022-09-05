// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuY0nHx9eFc4QbQdDreMwl5Mmhn9dZfy4",
  authDomain: "ecommerce-shop-bb19c.firebaseapp.com",
  projectId: "ecommerce-shop-bb19c",
  storageBucket: "ecommerce-shop-bb19c.appspot.com",
  messagingSenderId: "311453988183",
  appId: "1:311453988183:web:00732d867b37c715043a12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app