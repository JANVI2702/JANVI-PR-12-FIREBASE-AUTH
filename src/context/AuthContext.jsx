import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function handleAuthError(error) {
  if (error.code) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Email is already in use";

      case "auth/invalid-email":
        return "Invalid email format";

      case "auth/invalid-credential":
        return "Invalid email or password";

      case "auth/user-not-found":
        return "User noy found please check your email";

      case "auth/wrong-password":
        return "In correct password";

      case "auth/weak-password":
        return "Password should be at least 6 characters";

      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later";

      default:
        return "An unkown error occured. Please try again";
    }
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function googleSignIn() {
    // create an instance GoogleAuthProvider(class)
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      throw error;
    }
  }

  async function signup(email, password) {
    try {
      setError(null);
      return await createUserWithEmailAndPassword(auth, email, password); // builtin
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      // console.log("Sigup Error : ", errorMessage);
      throw new Error(errorMessage);
    }
  }

  async function login(email, password) {
    try {
      setError(null);
      return await signInWithEmailAndPassword(auth, email, password); // builtin
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      // console.log("Login Error : ", errorMessage); debug
      throw new Error(errorMessage);
    }
  }

  async function logout() {
    try {
      setError(null);
      return await signOut(auth); // builtin
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      // console.log("Login Error : ", errorMessage);
      throw new Error(errorMessage);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        const errorMessage = handleAuthError(error);
        setError(errorMessage);
        // console.log("Auth state change Error : ", errorMessage);
        return unsubscribe;
      }
    );
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
    error,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}