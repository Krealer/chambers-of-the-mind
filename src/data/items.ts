// src/data/items.ts

/**
 * ItemType enumerates the different symbolic item types available.
 */
export type ItemType = 'token' | 'key' | 'artifact';

/**
 * Each item has:
 * - id: unique identifier used internally and in progress tracking
 * - name: human-readable display name
 * - description: symbolic meaning or lore text for the item
 * - type: category to differentiate usage or importance
 * - color: hex color string used for rendering on the grid or UI
 */
export type ItemData = {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  color: string;
};

/**
 * The list of symbolic items in the game.
 * Items can be given, received, or used to unlock progress.
 */
export const items: ItemData[] = [
  {
    id: 'silver_token',
    name: 'Silver Token',
    description:
      'A small silver coin representing fleeting trust, easy to lose but hard to regain.',
    type: 'token',
    color: '#c0c0c0', // Silver gray
  },
  {
    id: 'ancient_key',
    name: 'Ancient Key',
    description:
      'An old, ornate key that opens hidden doors in the mind palace.',
    type: 'key',
    color: '#b5651d', // Bronze-like brown
  },
  {
    id: 'crystal_shard',
    name: 'Crystal Shard',
    description:
      'A glowing fragment of clarity, used to unlock insight and reflection.',
    type: 'artifact',
    color: '#7dd3fc', // Tailwind light blue
  },

  // Additional items can be added here...
];
