import { supabase } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: number;
}

const STORAGE_KEY = 'smile_dentos_admin_session';

/**
 * Verifies whether the Supabase user has the required admin role in app_metadata
 * and matches the designated admin account.
 */
export function isAuthorizedAdminUser(
  user: { app_metadata?: Record<string, unknown>; email?: string | null } | null | undefined
): boolean {
  if (!user) return false;
  const role = (user.app_metadata as Record<string, unknown> | undefined)?.role;
  const email = user.email?.toLowerCase().trim();
  return role === 'admin' && email === 'smiledentos@gmail.com';
}

/**
 * Authenticates the administrator using Supabase Email/Password Authentication.
 * Enforces role-based authorization (app_metadata.role === 'admin') for smiledentos@gmail.com.
 */
export async function signInAdmin(
  email: string,
  password: string
): Promise<{ user: AdminUser; session: AdminSession }> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Enforce authorized administrator email
  if (trimmedEmail !== 'smiledentos@gmail.com') {
    throw new Error('Unauthorized account. Only smiledentos@gmail.com is authorized for admin access.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password,
  });

  if (error) {
    throw new Error(error.message || 'Invalid administrator email or password.');
  }

  if (!data.user || !data.session) {
    throw new Error('Failed to obtain authenticated session from Supabase.');
  }

  // Enforce role-based authorization via auth.users.raw_app_meta_data (role === 'admin')
  if (!isAuthorizedAdminUser(data.user)) {
    await supabase.auth.signOut();
    throw new Error('Access denied. Administrator privileges (role: admin) are required.');
  }

  const user: AdminUser = {
    id: data.user.id,
    email: data.user.email || trimmedEmail,
    name: 'Smile Dentos Administrator',
    role: 'admin',
  };

  const session: AdminSession = {
    user,
    token: data.session.access_token,
    expiresAt: (data.session.expires_at || 0) * 1000,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }

  return { user, session };
}

export async function signOutAdmin(): Promise<void> {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed || !parsed.user || !parsed.expiresAt) return null;

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
