import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

// Create the Context to share authentication data across the app
const AuthContext = createContext();

// Setup the Google provider for social login
const googleProvider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
  // 'user' stores the currently logged-in user information
  const [user, setUser] = useState(null);
  // 'loading' tracks if we are still checking the login status
  const [loading, setLoading] = useState(true);

  // Login with Email and Password
  const emailLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Create a new account with Email and Password
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login using a Google account popup
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update the user's name and profile picture in Firebase
  const updateProfileInfo = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  // Automatically check if a user is already logged in when the app starts
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user
      setLoading(false);    // Stop showing the loading spinner
    });
    // Cleanup the listener when the component is unmounted
    return () => unSubscribe();
  }, []);

  // Logout the current user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Pack all auth functions into one object for easy sharing
  const authInfo = {
    googleLogin,
    user,
    setUser,
    setLoading,
    updateProfileInfo,
    loading,
    logOut,
    emailLogin,
    registerUser,
  };

  // Provide the auth data to the rest of the application
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export { AuthContext, AuthContextProvider };
