import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  configureGoogleSignIn,
  signUp as authSignUp,
  signIn as authSignIn,
  signInWithGoogle as authSignInWithGoogle,
  firebaseSignOut,
  onAuthStateChanged,
} from '../services/authService';
import { getUserProfile, createUserProfile } from '../services/userService';
import { UserProfile, AvatarKey } from '../types/user';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, profileData?: { avatar: AvatarKey; displayName: string }) => Promise<FirebaseAuthTypes.UserCredential>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserProfile = useCallback(async () => {
    if (!user) {
      setUserProfile(null);
      return;
    }
    const profile = await getUserProfile(user.uid);
    setUserProfile(profile);
  }, [user]);

  useEffect(() => {
    configureGoogleSignIn();
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      refreshUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [user, refreshUserProfile]);

  const signUp = async (email: string, password: string, profileData?: { avatar: AvatarKey; displayName: string }) => {
    const credential = await authSignUp(email, password);
    if (profileData) {
      await createUserProfile(credential.user.uid, profileData);
    }
    return credential;
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
      value={{ user, userProfile, isLoading, signUp, signIn, signInWithGoogle, signOut, refreshUserProfile }}
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
