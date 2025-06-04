'use client';

import LoginButton from './LoginButton';

/**
 * LoginPage component:
 * - Full page centered login screen with welcoming message.
 * - Contains a GitHub login button component.
 * - Styled with a dark gradient background and clean typography.
 */
export default function LoginPage() {
  return (
    <main
      className="
        min-h-screen
        flex flex-col items-center justify-center
        bg-gradient-to-br from-purple-900 via-indigo-900 to-black
        text-white
        p-8
      "
    >
      {/* Main title welcoming players */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Chambers of the Mind
      </h1>

      {/* Subtitle / explanation */}
      <p className="mb-10 max-w-md text-center text-lg opacity-80">
        Enter the Mind Palace by signing in with your GitHub account.
      </p>

      {/* Reusable GitHub login button */}
      <LoginButton />
    </main>
  );
}
