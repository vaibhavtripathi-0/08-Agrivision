'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface UserProfile {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: string;
  state?: string;
  district?: string;
  villageCity?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'agrivision_demo_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const meta = session.user.user_metadata || {};
          const profile: UserProfile = {
            id: session.user.id,
            fullName: meta.full_name || session.user.email?.split('@')[0] || 'Farmer',
            email: session.user.email || '',
            phone: meta.phone,
            role: meta.role || 'farmer',
            state: meta.state || 'Uttar Pradesh',
            district: meta.district || 'Mathura',
            villageCity: meta.village_city || 'Raya Village',
          };
          setUserState(profile);
        } else {
          // Check local storage for signed in user profile
          const stored = localStorage.getItem(DEMO_USER_KEY);
          if (stored) {
            try {
              setUserState(JSON.parse(stored));
            } catch (e) {
              setUserState(null);
            }
          }
        }
      } catch (err) {
        console.error('Error checking auth session:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const setUser = (newUser: UserProfile | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(DEMO_USER_KEY);
    }
  };

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
