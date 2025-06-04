// src/types/game.ts

/**
 * Position type represents a coordinate on the grid: [row, col]
 */
export type Position = [number, number];

/**
 * EntityType defines possible entities on a grid tile.
 */
export type EntityType = 'character' | 'item' | 'door';

/**
 * Entity represents an object placed on the grid.
 * Depending on type, additional properties are used.
 */
export type Entity = {
  type: EntityType;
  position: Position;
  characterId?: string; // Required if type === 'character'
  itemId?: string;      // Required if type === 'item'
  color?: string;       // Hex color for display
  name?: string;        // Display name for UI or tooltips
  leadsTo?: {           // Required if type === 'door'
    chamberId: number;
    entryTile: Position;
  };
};

/**
 * ChamberData defines all data for a chamber in the Mind Palace.
 */
export type ChamberData = {
  id: number;              // Unique chamber ID (0-6)
  name: string;            // Chamber display name
  playerStart: Position;   // Starting tile position for player
  entities: Entity[];      // List of entities in this chamber
};

/**
 * User progress data structure saved per user per chamber.
 */
export type ProgressData = {
  userId: string;          // Supabase user ID
  chamberId: number;       // Chamber ID
  items: string[];         // List of item IDs held by player
  visited: Position[];     // Tiles visited by player
  completed: boolean;      // Whether chamber is finished
  manipulation: string;    // Player's final interpretation of manipulation
  timestamp: string;       // Completion timestamp
};
