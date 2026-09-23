import { createClient } from '@supabase/supabase-js';

// Safe environment variable resolution supporting Vite, Next.js, and Node
const getEnvVar = (key: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key] as string;
  }
  const globalProc = typeof globalThis !== 'undefined'
    ? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    : undefined;
  if (globalProc?.env && globalProc.env[key]) {
    return globalProc.env[key] as string;
  }
  return '';
};

export const supabaseUrl =
  getEnvVar('NEXT_PUBLIC_SUPABASE_URL') ||
  getEnvVar('VITE_SUPABASE_URL') ||
  'https://jrbupgcftsnxrypxtkts.supabase.co';

export const supabaseAnonKey =
  getEnvVar('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ||
  getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') ||
  getEnvVar('VITE_SUPABASE_ANON_KEY') ||
  'sb_publishable_fkm4hGkzCXi5baywS2nMuQ_IBZkpULU';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon')
  );
};

// Singleton Supabase client for all database operations
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
