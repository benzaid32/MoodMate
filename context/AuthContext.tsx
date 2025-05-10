import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, firestore } from '@/utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock user for demo
  const mockUser = {
    uid: 'mock-user-123',
    email: 'user@example.com',
    displayName: 'Demo User',
    photoURL: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };
  
  // Auto-sign in for demo
  useEffect(() => {
    setUser(mockUser);
    setLoading(false);
  }, []);
  
  // In a real app, we would use Firebase auth state listener
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser({
  //         uid: user.uid,
  //         email: user.email,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //       });
  //     } else {
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });
  //   
  //   return () => unsubscribe();
  // }, []);
  
  const signUp = async (name: string, email: string, password: string) => {
    try {
      // For demo, we'll just set the mock user
      // In a real app, we would use Firebase auth
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(userCredential.user, { displayName: name });
      
      // Create user profile in Firestore
      // await setDoc(doc(firestore, 'users', userCredential.user.uid), {
      //   name,
      //   email,
      //   createdAt: new Date(),
      // });
      
      setUser({
        uid: 'new-user-123',
        email: email,
        displayName: name,
        photoURL: null,
      });
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const signIn = async (email: string, password: string) => {
    try {
      // For demo, we'll just set the mock user
      // In a real app, we would use Firebase auth
      // await signInWithEmailAndPassword(auth, email, password);
      
      setUser(mockUser);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const signOut = async () => {
    try {
      // For demo, we'll just clear the user
      // In a real app, we would use Firebase auth
      // await auth.signOut();
      
      setUser(null);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const updateUserProfile = async (data: Partial<User>) => {
    try {
      // In a real app, we would update the Firebase user profile
      // await updateProfile(auth.currentUser, {
      //   displayName: data.displayName || auth.currentUser?.displayName,
      //   photoURL: data.photoURL || auth.currentUser?.photoURL,
      // });
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);