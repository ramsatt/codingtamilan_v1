import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { environment } from "../../../environments/environment";

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

if (!environment.production) {
  // Uncomment the line below if you want to use the local Firestore emulator
  // connectFirestoreEmulator(db, '127.0.0.1', 8080);
  
  // Connect to the local Cloud Functions emulator
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export { app, auth, db, functions };
