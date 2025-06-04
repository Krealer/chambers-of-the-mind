// src/data/characters.ts

/**
 * CharacterType defines whether a character is a Manipulator or Helper.
 */
export type CharacterType = 'manipulator' | 'helper';

/**
 * Each character in the Mind Palace has:
 * - id: unique identifier string used in data and dialogs
 * - name: display name shown in UI and tooltips
 * - type: whether manipulator (deceptive) or helper (supportive)
 * - color: hex color string for rendering character tile
 * - motive: short description or motive of the character
 */
export type CharacterData = {
  id: string;
  name: string;
  type: CharacterType;
  color: string;
  motive: string;
};

/**
 * List of all characters in the game, manipulators and helpers alike.
 * Each character has unique attributes and motives influencing dialog and gameplay.
 */
export const characters: CharacterData[] = [
  {
    id: 'flamebearer',
    name: 'The Flamebearer',
    type: 'manipulator',
    color: '#f97316', // Tailwind orange-500
    motive:
      'Spreads false warmth and light, manipulating perception to mask the cold truth.',
  },
  {
    id: 'whisperer',
    name: 'The Whisperer',
    type: 'manipulator',
    color: '#6366f1', // Tailwind indigo-500
    motive:
      'Sows doubt and quiet lies, whispering fears into the corners of the mind.',
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    type: 'helper',
    color: '#10b981', // Tailwind emerald-500
    motive: 'Protects the vulnerable with honest guidance and steady presence.',
  },
  {
    id: 'seer',
    name: 'The Seer',
    type: 'helper',
    color: '#3b82f6', // Tailwind blue-500
    motive: 'Offers clarity and insight, helping to reveal hidden truths.',
  },

  // Add other characters here...
];
