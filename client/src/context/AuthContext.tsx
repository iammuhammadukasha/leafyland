import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type User } from '../lib/api';
import { supabase } from '../lib/supabase';

type AuthCtx = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    shopName?: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  profileLoading: boolean;
};

const AuthContext = createContext<AuthCtx | null>(null);

async function fetchProfile(accessToken: string): Promise<User> {
  await api.post('/auth/sync', {}, accessToken);
  return api.get<User>('/auth/me', accessToken);
}

export function redirectForRole(user: User, redirect?: string | null): string {
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    if (redirect.startsWith('/admin') && user.role !== 'ADMIN') return '/';
    if (redirect.startsWith('/vendor') && user.role !== 'VENDOR') return '/';
    return redirect;
  }
  if (user.role === 'ADMIN') return '/admin';
  if (user.role === 'VENDOR') return '/vendor';
  return '/';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const hydrateProfile = useCallback(async (accessToken: string) => {
    setProfileLoading(true);
    try {
      const profile = await fetchProfile(accessToken);
      setUser(profile);
      setToken(accessToken);
      return profile;
    } catch {
      setUser(null);
      throw new Error('Could not load your profile. Is the API server running?');
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setLoading(false);
        return;
      }
      try {
        await hydrateProfile(session.access_token);
      } catch {
        await supabase.auth.signOut();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') return;
      if (!session) {
        setToken(null);
        setUser(null);
        setProfileLoading(false);
        return;
      }
      try {
        await hydrateProfile(session.access_token);
      } catch {
        setUser(null);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [hydrateProfile]);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session) throw new Error(error?.message ?? 'Login failed');
    return hydrateProfile(data.session.access_token);
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    shopName?: string;
  }) => {
    const role = data.role ?? 'CUSTOMER';
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name, role },
      },
    });
    if (error) throw new Error(error.message);

    const session = signUpData.session;
    if (!session) {
      throw new Error('Check your email to confirm signup, then log in.');
    }

    await api.post(
      '/auth/sync',
      {
        name: data.name,
        shopName: data.shopName,
        role,
      },
      session.access_token,
    );
    await hydrateProfile(session.access_token);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading, profileLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth outside provider');
  return ctx;
}
