import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDOm9JZGcaOOl0EhmSUJsnyLpiBOXz4Geo",
	authDomain: "business-strategy-projectt.firebaseapp.com",
	projectId: "business-strategy-projectt",
	storageBucket: "business-strategy-projectt.appspot.com",
	messagingSenderId: "254873236208",
	appId: "1:254873236208:web:8b31a798d6d8a5a3d78835",
	measurementId: "G-JEYGW983FJ",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export const db = getFirestore(app);
