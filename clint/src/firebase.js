import firebase from 'firebase/app' 
import 'firebase/auth'
 

  var firebaseConfig = {
    apiKey: "AIzaSyBBb89y_gKPPMc86KCg_2qyYOu0AaoNlKg",
    authDomain: "signinwithfacebook-chat.firebaseapp.com",
    projectId: "signinwithfacebook-chat",
    storageBucket: "signinwithfacebook-chat.appspot.com",
    messagingSenderId: "811342222594",
    appId: "1:811342222594:web:2fba7ef28c756eab771e1b",
    measurementId: "G-L5573BJ0ML"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase
