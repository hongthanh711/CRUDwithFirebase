// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA0PhbrFEP1UGWHj4Xi0RlvM760cE8Sn0U',
    authDomain: 'api-firebase-shoes.firebaseapp.com',
    projectId: 'api-firebase-shoes',
    storageBucket: 'api-firebase-shoes.appspot.com',
    messagingSenderId: '451246385245',
    appId: '1:451246385245:web:c34868addbf644e76a05b4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
