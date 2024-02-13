import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA6RSx1C8GZjystZ_DcJ4u06KTj2Hqz1Tg",
  authDomain: "todo-list-bae7f.firebaseapp.com",
  projectId: "todo-list-bae7f",
  storageBucket: "todo-list-bae7f.appspot.com",
  messagingSenderId: "1043250528349",
  appId: "1:1043250528349:web:1da2fc3edc841f98a14db4",
  measurementId: "G-4KR106ZLJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
