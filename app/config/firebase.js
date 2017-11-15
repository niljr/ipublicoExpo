// import * as RNFirebase from 'firebase';

// // Initialize Firebase
// const firebase = RNFirebase.initializeApp({
//   apiKey: "AIzaSyDodqOifEIpC90L6jUfsefJ7q7OlSrFKNc",
//   authDomain: "ipublico-a8719.firebaseapp.com",
//   databaseURL: "https://ipublico-a8719.firebaseio.com",
//   storageBucket: "ipublico-a8719.appspot.com",
// });

// // firebase.initializeApp(firebaseConfig);

// // (firebaseConfig);

// export default firebase;

const firebase = require("firebase");
require("firebase/firestore");

//Initializing firebase firestore
firebase.initializeApp({
  apiKey: "AIzaSyDodqOifEIpC90L6jUfsefJ7q7OlSrFKNc",
  authDomain: "ipublico-a8719.firebaseapp.com",
  databaseURL: "https://ipublico-a8719.firebaseio.com",
  storageBucket: "ipublico-a8719.appspot.com",
});

export default firebase;