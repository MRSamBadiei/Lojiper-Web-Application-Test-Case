import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXpIleYj-_79Tykvk1izX0OdydldOTt6k",
  authDomain: "bus-ticket-d6b60.firebaseapp.com",
  projectId: "bus-ticket-d6b60",
  storageBucket: "bus-ticket-d6b60.appspot.com",
  messagingSenderId: "1081101731125",
  appId: "1:1081101731125:web:3a66ed6628fc685cd1387c",
};

const app = getApps().length !== 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
