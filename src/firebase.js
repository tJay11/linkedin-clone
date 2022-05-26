import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAAA0bs_9MyNk2WFqZLK67wjK5kZrPya9U",
	authDomain: "linkedin-clone-2bb14.firebaseapp.com",
	projectId: "linkedin-clone-2bb14",
	storageBucket: "linkedin-clone-2bb14.appspot.com",
	messagingSenderId: "338419821286",
	appId: "1:338419821286:web:2b4357cb0387ab08656927",
};

// Initializing firebase
const app = firebase.initializeApp(firebaseConfig);
// Connecting to db
const db = firebase.firestore();
//Connecting Auth
const auth = firebase.auth();

export { app, db, auth };
