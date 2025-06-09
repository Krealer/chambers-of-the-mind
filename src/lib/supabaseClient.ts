// lib/supabaseClient.ts

/**
 * Supabase client initialization.
 * This client will be used across the app to interact with Supabase backend,
 * including authentication, database queries, and storage.
 * 
 * Make sure to define the following environment variables in your .env.local or Vercel:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * The variables are validated at runtime to provide clear feedback during
 * development if they're missing.
 */

import { createClient } from '@supabase/supabase-js';

// Read environment variables for Supabase project URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Provide helpful feedback if variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  const missing: string[] = [];
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error(
    `Supabase environment variables missing: ${missing.join(', ')}. ` +
      'Check your .env.local or Vercel project settings.'
  );
}

// Create the Supabase client with URL and anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
