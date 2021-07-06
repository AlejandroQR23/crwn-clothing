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

firebase.initializeApp(config);

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

/**
 * This function gets the shop data from the firestore database
 * and then transforms this data in order to be readable for the shop reducer
 * @param {*} collections
 */
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

/**
 * This function is used to add a new collection with initial values (documents)
 * to firebase
 * @param {*} collectionKey
 * @param {*} itemsToAdd
 * @returns
 */
export const addCollectionAndDocuments = async (collectionKey, itemsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  itemsToAdd.forEach((item) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, item);
  });

  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
