'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

/**
 * LoginButton component handles GitHub OAuth login via Supabase.
 * - Shows a button that triggers OAuth sign-in on click.
 * - Displays loading state while redirecting.
 * - Shows alert on error.
 */
export default function LoginButton() {
  // Loading state to disable button and show feedback
  const [loading, setLoading] = useState(false);

  // Function to initiate GitHub OAuth login
  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github', // OAuth provider
    });
    if (error) {
      alert('Error logging in: ' + error.message);
      setLoading(false); // Reset loading if error
    }
    // On success, Supabase redirects automatically, no further action needed here
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      aria-label="Log in with GitHub"
      className="
        bg-black text-white px-6 py-3 rounded-lg
        hover:bg-gray-800 transition-colors
        flex items-center gap-3 justify-center
        font-semibold text-lg
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? 'Redirecting...' : 'Log in with GitHub'}
      {/* You can add a GitHub SVG icon here if you want */}
    </button>
  );
}
