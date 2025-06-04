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
 * The non-null assertion operator (!) tells TypeScript we guarantee these env vars exist.
 */

import { createClient } from '@supabase/supabase-js';

// Read environment variables for Supabase project URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create the Supabase client with URL and anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
