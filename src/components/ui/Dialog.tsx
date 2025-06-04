'use client';

import React from 'react';

type DialogOption = {
  text: string;
  next: string | null;
};

type DialogProps = {
  characterName: string;
  text: string;
  options: DialogOption[];
  onChoice: (nextKey: string | null) => void;
  onClose: () => void;
};

/**
 * Dialog component renders a modal dialog box for conversations with characters.
 * 
 * Props:
 * - characterName: The name of the character speaking.
 * - text: The dialog text content.
 * - options: Array of selectable response options.
 * - onChoice: Callback when an option is selected, passing the next dialog node key or null.
 * - onClose: Callback to close the dialog (e.g., when clicking close button).
 */
export default function Dialog({
  characterName,
  text,
  options,
  onChoice,
  onClose,
}: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 shadow-lg text-white">
        <header className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{characterName}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-white"
          >
            &#10005;
          </button>
        </header>
        <section className="mb-6 whitespace-pre-line">{text}</section>
        <footer className="flex flex-col gap-3">
          {options.map(({ text: optionText, next }, idx) => (
            <button
              key={idx}
              onClick={() => onChoice(next)}
              className="bg-purple-700 hover:bg-purple-600 rounded px-4 py-2 text-left"
            >
              {optionText}
            </button>
          ))}
        </footer>
      </div>
    </div>
  );
}
