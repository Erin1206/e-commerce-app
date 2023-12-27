import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBtXNcMcUK8okOyJ8J_H6SbXV4yK4QfDKI",
    authDomain: "crwn-clothing-e2437.firebaseapp.com",
    projectId: "crwn-clothing-e2437",
    storageBucket: "crwn-clothing-e2437.appspot.com",
    messagingSenderId: "571658257796",
    appId: "1:571658257796:web:e9dffe02e2d7392c1549d1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })
    await batch.commit()
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
//     const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//         const {title, items} = docSnapshot.data()
//         acc[title.toLowerCase()] = items
//         return acc
//     }, {})
//     return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid) // database, collection, unique id for a document

    const userSanpshot = await getDoc(userDocRef)

    if(!userSanpshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt, 
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)

        }
    }
    return userSanpshot;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const getCurrentUser = () => {
    return new Promise((resolve, reject ) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe()
                resolve(userAuth)
            },
            reject
        )
    })
}