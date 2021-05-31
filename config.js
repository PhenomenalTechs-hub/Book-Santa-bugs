import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyCVvQUv76aAnJIfPnbQDgsO8CQ4ULKaGjY",
    authDomain: "booksanta-app-8a7b8.firebaseapp.com",
    projectId: "booksanta-app-8a7b8",
    storageBucket: "booksanta-app-8a7b8.appspot.com",
    messagingSenderId: "1018437225024",
    appId: "1:1018437225024:web:667fa8a84cf256b9fa6da5"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();