import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFCSbxibZmwAkU6Qvi9Prhk4OtaTqNfs0",
    authDomain: "myrecipe-277116.firebaseapp.com",
    databaseURL: "https://myrecipe-277116.firebaseio.com",
    projectId: "myrecipe-277116",
    storageBucket: "myrecipe-277116.appspot.com",
    messagingSenderId: "936485468190",
    appId: "1:936485468190:web:c7fab05ac817558c62d60f",
    measurementId: "G-P13EN6Z3PP"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
