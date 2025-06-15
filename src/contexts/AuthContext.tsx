import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  preferences?: any;
  travelHistory?: any[];
  savedDestinations?: string[];
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'users', user.uid));
          if (profileDoc.exists()) {
            setUserProfile(profileDoc.data() as UserProfile);
          }
          setError(null);
        } catch (err: any) {
          console.warn('Failed to fetch user profile:', err);
          if (err.code === 'unavailable' || err.message?.includes('offline')) {
            setError('You appear to be offline. Some features may be limited.');
          } else {
            setError('Failed to load user profile. Please try again.');
          }
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'unavailable' || err.message?.includes('offline')) {
        throw new Error('Unable to sign in while offline. Please check your connection.');
      }
      throw err;
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName,
        savedDestinations: [],
        travelHistory: [],
        createdAt: new Date()
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
      setUserProfile(userProfile);
    } catch (err: any) {
      if (err.code === 'unavailable' || err.message?.includes('offline')) {
        throw new Error('Unable to create account while offline. Please check your connection.');
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err: any) {
      console.warn('Logout error:', err);
      // Even if logout fails due to network, clear local state
      setUser(null);
      setUserProfile(null);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    
    try {
      setError(null);
      const updatedProfile = { ...userProfile, ...data };
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
      setUserProfile(updatedProfile);
    } catch (err: any) {
      console.warn('Failed to update user profile:', err);
      if (err.code === 'unavailable' || err.message?.includes('offline')) {
        setError('Unable to save changes while offline. Changes will be saved when connection is restored.');
      } else {
        setError('Failed to save profile changes. Please try again.');
      }
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};