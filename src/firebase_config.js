import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCktOKStiyKc-JeGHlmB4brK5d7oxswBFc",
    authDomain: "waldoapp.firebaseapp.com",
    projectId: "waldoapp",
    storageBucket: "waldoapp.appspot.com",
    messagingSenderId: "1016805756033",
    appId: "1:1016805756033:web:9657afd46f0d0067fe5180",
    measurementId: "G-EMRJ5QSVPS"
  };

firebase.initializeApp(firebaseConfig)
let uid;

firebase.auth().signOut();
firebase.auth().signInAnonymously()
.then(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      uid = user.uid;
    } else {
      console.log("Sign Out")
    }
  });
  console.log('sign in')
})
.catch((error) => {
  console.log(error)
 
});

let storage = firebase.storage()
export {storage}
const reader = new FileReader();
export {reader}
const db = firebase.database()
export {db}
export {uid}
