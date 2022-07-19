import { initializeApp } from "@firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
  getDocs,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzvNfQeYM7CZqQOxrWOE9DftbSgDzcfPA",
  authDomain: "dev-twitter-e255a.firebaseapp.com",
  projectId: "dev-twitter-e255a",
  storageBucket: "dev-twitter-e255a.appspot.com",
  messagingSenderId: "568832884874",
  appId: "1:568832884874:web:4d621ef665365fb9cc6d73",
  measurementId: "G-TKSJ01H2B0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const mapUserFromFirebaseAuthToUser = (userInfo) => {
  const { photoURL, email, displayName, uid } = userInfo;
  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid,
  };
};

// Funcion que se ejecutará cuando cambie si el usuario pasa a estar auth o no.
// onAuthStateChanged Recibe un metodo que se ejecutará cuando cambie el estado del usuario.

export const onAuthStateChangedFunction = (onChange) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user);
      onChange(normalizedUser);
    } else {
      onChange(null);
    }
  });
};

export const loginWithGitHub = async () => {
  const githubProvider = new GithubAuthProvider();
  githubProvider.setCustomParameters(firebaseConfig);
  return signInWithPopup(auth, githubProvider);
};

export const addDevit = async ({ avatar, content, userId, userName }) => {
  return await addDoc(collection(db, "devits"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = async () => {
  return await getDocs(collection(db, "devits")).then((docs) => {
    return docs.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      const date = new Date(createdAt.seconds * 1000);
      const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date);
      return {
        ...data,
        id,
        createdAt: normalizedCreatedAt,
      };
    });
  });
};
