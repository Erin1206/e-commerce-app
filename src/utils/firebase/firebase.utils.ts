import { initializeApp } from 'firebase/app';

import { 
    getFirestore,
    collection,
    query,
    getDocs,
} from 'firebase/firestore'

import { Category } from '../../store/categories/category.types';

const firebaseConfig = {
    apiKey: "AIzaSyBtXNcMcUK8okOyJ8J_H6SbXV4yK4QfDKI",
    authDomain: "crwn-clothing-e2437.firebaseapp.com",
    projectId: "crwn-clothing-e2437",
    storageBucket: "crwn-clothing-e2437.appspot.com",
    messagingSenderId: "571658257796",
    appId: "1:571658257796:web:e9dffe02e2d7392c1549d1"
};

// // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category)
}