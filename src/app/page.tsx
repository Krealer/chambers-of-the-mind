'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

/**
 * Main landing page component.
 * - Checks user authentication status on mount.
 * - Redirects authenticated users to the first chamber.
 * - Displays the login page to unauthenticated users.
 */
import LoginPage from '@/components/auth/LoginPage';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // On mount, fetch current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Subscribe to auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Clean up subscription on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Redirect to chamber 0 when user logs in
  useEffect(() => {
    if (user) {
      router.push('/chamber/0');
    }
  }, [user, router]);

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Show a loading message while redirecting
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
      Redirecting you to the Mind Palace...
    </main>
  );
}
