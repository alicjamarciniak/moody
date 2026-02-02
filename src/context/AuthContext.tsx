import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  configureGoogleSignIn,
  signUp as authSignUp,
  signIn as authSignIn,
  signInWithGoogle as authSignInWithGoogle,
  firebaseSignOut,
  onAuthStateChanged,
} from '../services/authService';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    configureGoogleSignIn();
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    await authSignUp(email, password);
  };

  const signIn = async (email: string, password: string) => {
    await authSignIn(email, password);
  };

  const signInWithGoogle = async () => {
    await authSignInWithGoogle();
  };

  const signOut = async () => {
    await firebaseSignOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signUp, signIn, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
