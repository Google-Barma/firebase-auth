// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

import refs from './refs';

const firebaseConfig = {
  apiKey: 'AIzaSyBsRG3CSgC96oZt0Ie8WGDsycA2pj1pjzQ',
  authDomain: 'hangry-snake.firebaseapp.com',
  databaseURL: 'https://hangry-snake.firebaseio.com',
  projectId: 'hangry-snake',
  storageBucket: 'hangry-snake.appspot.com',
  messagingSenderId: '24823724390',
  appId: '1:24823724390:web:011f63f4cfdf0468f030a7',
  measurementId: 'G-0M0HHTH4Q8',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function createNewUserWithEmailAndPassword() {
  let email = refs.email.value;
  let password = refs.password.value;

  console.log(email);
  console.log(password);

  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

  refs.email.value = '';
  refs.password.value = '';
}

refs.authForm.addEventListener('click', event => {
  event.preventDefault();

  const signUp = document.querySelector('.js-sign-up-btn');

  if (event.target === signUp) {
    createNewUserWithEmailAndPassword();
  }
});
