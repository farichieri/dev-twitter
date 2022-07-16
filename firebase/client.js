import { initializeApp } from "@firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

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

initializeApp(firebaseConfig);
const auth = getAuth();

const mapUserFromFirebaseAuthToUser = (userInfo) => {
  const { photoURL, email, displayName } = userInfo;
  return {
    avatar: photoURL,
    username: displayName,
    email,
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
