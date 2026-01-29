// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBfPAgSVNAr-YVjo7Ns9iZno73yx9sB3LY',
  authDomain: 'moody-5acc6.firebaseapp.com',
  projectId: 'moody-5acc6',
  storageBucket: 'moody-5acc6.firebasestorage.app',
  messagingSenderId: '512571258179',
  appId: '1:512571258179:web:1c51156467b219e6692bf6',
  measurementId: 'G-1CSHZT6K4Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
