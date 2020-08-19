import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDrD9QAGakarpLsqHyPBiMMCdOpwmjLfmk',
  authDomain: 'whatsapp-clone-109b1.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-109b1.firebaseio.com',
  projectId: 'whatsapp-clone-109b1',
  storageBucket: 'whatsapp-clone-109b1.appspot.com',
  messagingSenderId: '726758700256',
  appId: '1:726758700256:web:f381c9bbe6dd133d5f8c85',
  measurementId: 'G-M4Y1PL73T5',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
