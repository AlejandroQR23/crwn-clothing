import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyApfhneBsRwwYjjHsDsC7v9_TW6iatE-no',
  authDomain: 'crwn-db-f9468.firebaseapp.com',
  projectId: 'crwn-db-f9468',
  storageBucket: 'crwn-db-f9468.appspot.com',
  messagingSenderId: '524535331067',
  appId: '1:524535331067:web:384b9e571e9099b5cc585e',
  measurementId: 'G-CS5V0KME6P',
};

export const createUserProfileDocument = async (userAuth, aditionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...aditionalData });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
