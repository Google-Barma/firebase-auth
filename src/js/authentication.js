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

function clearEmailAndPassInput() {
  refs.email.value = '';
  refs.password.value = '';
}

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    const email = refs.email.value;
    const password = refs.password.value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);

        refs.signInBtn.disabled = false;
      });
  }
  refs.signInBtn.disabled = true;

  clearEmailAndPassInput();
}

function handleSignUp() {
  createNewUserWithEmailAndPassword();
}

function createNewUserWithEmailAndPassword() {
  const email = refs.email.value;
  const password = refs.password.value;

  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

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
}

function initApp() {
  // Listening for auth state changes.

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      const email = user.email;
      // const displayName = user.displayName;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const isAnonymous = user.isAnonymous;
      // const uid = user.uid;
      // const providerData = user.providerData;

      refs.signInStatus.textContent = 'Signed in';
      refs.signInBtn.textContent = 'Sign out';
      refs.accountDetails.textContent = email;
    } else {
      // User is signed out.

      refs.signInStatus.textContent = 'Signed out';
      refs.signInBtn.textContent = 'Sign in';
      refs.accountDetails.textContent = 'noname';
    }

    refs.signInBtn.disabled = false;
  });

  refs.signInBtn.addEventListener('click', toggleSignIn, false);
  refs.signUpBtn.addEventListener('click', handleSignUp, false);
}

window.onload = function () {
  initApp();
};
