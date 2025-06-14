
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  supabaseUser: any | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage in localStorage
const USERS_KEY = 'sahara_mock_users';
const CURRENT_USER_KEY = 'sahara_current_user';

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      full_name: userData.full_name || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...userData
    };

    users.push({ ...newUser, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const signIn = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
  };

  const signOut = async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', email);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');

    const updatedUser = { ...user, ...data, updated_at: new Date().toISOString() };
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    supabaseUser: user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useMockAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
}
