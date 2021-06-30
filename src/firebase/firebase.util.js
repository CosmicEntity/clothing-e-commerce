import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCOhTXypmtO6kne8bLikb3CwdHRjh9YN9c",
    authDomain: "clothing-e-commerce-db.firebaseapp.com",
    projectId: "clothing-e-commerce-db",
    storageBucket: "clothing-e-commerce-db.appspot.com",
    messagingSenderId: "266294515284",
    appId: "1:266294515284:web:4b7e12d25526b2be2bbfc1"
  }

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log("Error creating user ", error.message);
      }
    }

   return userRef;
} 

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach( obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })

  return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map( doc => {
    const{title,items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((acccumulator,collection)=>{
    acccumulator[collection.title.toLowerCase()]=collection;
    return acccumulator;
  },{})
}





  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt:'select_account'});

  export const SignInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;