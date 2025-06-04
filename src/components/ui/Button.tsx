'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

/**
 * Button is a reusable UI component for styled buttons.
 *
 * It wraps the native HTML <button> element with default styling
 * and allows all standard button props to be passed through.
 *
 * Props:
 * - children: button label or content
 * - ...rest: all other native button attributes (onClick, disabled, etc.)
 */
export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-md font-semibold transition-colors
        bg-purple-700 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed
        text-white focus:outline-none focus:ring-2 focus:ring-purple-400
        ${rest.className ?? ''}`}
      type={rest.type ?? 'button'}
    >
      {children}
    </button>
  );
}
