import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase"; // ✅ Import Firebase auth
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

// Create the Auth Context
const AuthContext = createContext();

// Custom Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor Auth State (User Login/Logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  // Sign Up Function
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In Function
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout Function
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

