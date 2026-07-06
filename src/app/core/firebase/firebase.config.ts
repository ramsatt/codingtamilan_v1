import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../../environments/environment";

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
