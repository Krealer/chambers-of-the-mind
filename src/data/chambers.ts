// src/data/chambers.ts

import type { ChamberData } from '@/types/game';

/**
 * Chambers array holds the definitions for all seven chambers in the Mind Palace.
 * Each chamber has:
 * - id: unique numeric identifier (0 to 6)
 * - name: human-readable chamber name for UI and debugging
 * - playerStart: initial [row, col] position where the player spawns in this chamber
 * - entities: array of all characters, doors, and items placed on the chamber grid
 */
export const chambers: ChamberData[] = [
  {
    id: 0,
    name: 'Antechamber',
    playerStart: [5, 5],
    entities: [
      {
        type: 'character',
        name: 'The Flamebearer',
        characterId: 'flamebearer',
        position: [4, 12],
        color: '#f97316', // Tailwind orange-500
      },
      {
        type: 'door',
        position: [9, 0],
        leadsTo: { chamberId: 1, entryTile: [0, 17] },
      },
      {
        type: 'door',
        position: [0, 17],
        leadsTo: { chamberId: 2, entryTile: [9, 0] },
      },
    ],
  },

  {
    id: 1,
    name: 'Chamber of Whispers',
    playerStart: [0, 17],
    entities: [
      {
        type: 'door',
        position: [0, 17],
        leadsTo: { chamberId: 0, entryTile: [9, 0] },
      },
      {
        type: 'door',
        position: [9, 0],
        leadsTo: { chamberId: 3, entryTile: [0, 0] },
      },
      {
        type: 'character',
        name: 'The Whisperer',
        characterId: 'whisperer',
        position: [5, 9],
        color: '#6366f1', // Tailwind indigo-500
      },
    ],
  },

  {
    id: 2,
    name: 'Hall of Echoes',
    playerStart: [9, 0],
    entities: [
      {
        type: 'door',
        position: [9, 0],
        leadsTo: { chamberId: 0, entryTile: [0, 17] },
      },
      {
        type: 'door',
        position: [0, 17],
        leadsTo: { chamberId: 4, entryTile: [9, 0] },
      },
      {
        type: 'character',
        name: 'The Guardian',
        characterId: 'guardian',
        position: [5, 9],
        color: '#10b981', // Tailwind emerald-500
      },
    ],
  },

  {
    id: 3,
    name: 'Gallery of Insight',
    playerStart: [0, 0],
    entities: [
      {
        type: 'door',
        position: [0, 0],
        leadsTo: { chamberId: 1, entryTile: [9, 0] },
      },
      {
        type: 'door',
        position: [9, 17],
        leadsTo: { chamberId: 5, entryTile: [0, 0] },
      },
      {
        type: 'character',
        name: 'The Seer',
        characterId: 'seer',
        position: [5, 9],
        color: '#3b82f6', // Tailwind blue-500
      },
    ],
  },

  {
    id: 4,
    name: 'Corridor of Masks',
    playerStart: [9, 0],
    entities: [
      {
        type: 'door',
        position: [9, 0],
        leadsTo: { chamberId: 2, entryTile: [0, 17] },
      },
      {
        type: 'door',
        position: [0, 17],
        leadsTo: { chamberId: 6, entryTile: [9, 0] },
      },
      {
        type: 'character',
        name: 'The Whisperer',
        characterId: 'whisperer',
        position: [5, 9],
        color: '#6366f1', // Tailwind indigo-500
      },
    ],
  },

  {
    id: 5,
    name: 'Hall of Doubt',
    playerStart: [0, 0],
    entities: [
      {
        type: 'door',
        position: [0, 0],
        leadsTo: { chamberId: 3, entryTile: [9, 17] },
      },
      {
        type: 'door',
        position: [9, 17],
        leadsTo: { chamberId: 6, entryTile: [0, 0] },
      },
      {
        type: 'character',
        name: 'The Guardian',
        characterId: 'guardian',
        position: [5, 9],
        color: '#10b981', // Tailwind emerald-500
      },
    ],
  },

  {
    id: 6,
    name: 'Mirror Room',
    playerStart: [5, 9],
    entities: [
      {
        type: 'door',
        position: [9, 0],
        leadsTo: { chamberId: 4, entryTile: [0, 17] },
      },
      {
        type: 'door',
        position: [0, 0],
        leadsTo: { chamberId: 5, entryTile: [9, 17] },
      },
    ],
  },

  // All chambers defined
];
