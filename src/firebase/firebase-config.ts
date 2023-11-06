// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBrM8tUK1T27vpHFYiODU4H9x6sYfj71ss',
    authDomain: 'fileuploads-2fc11.firebaseapp.com',
    projectId: 'fileuploads-2fc11',
    storageBucket: 'fileuploads-2fc11.appspot.com',
    messagingSenderId: '672921362961',
    appId: '1:672921362961:web:f1713dfbae2c136e6b07b0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
