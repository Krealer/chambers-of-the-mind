'use client';

type PlayerProps = {
  position: [number, number]; // Player's current [row, col] on grid
};

const TILE_SIZE = 32;

/**
 * Player component represents the user's position on the grid.
 * - Rendered as a glowing white square.
 * - Positioned absolutely on the grid based on player's coordinates.
 */
export default function Player({ position }: PlayerProps) {
  const [row, col] = position;

  return (
    <div
      style={{
        position: 'absolute',
        width: TILE_SIZE,
        height: TILE_SIZE,
        top: row * TILE_SIZE,
        left: col * TILE_SIZE,
        backgroundColor: 'white',
        boxShadow: '0 0 8px 3px white', // Glowing effect
        borderRadius: '6px',
        boxSizing: 'border-box',
        pointerEvents: 'none', // Prevent player div from blocking clicks
      }}
      aria-label="Player position"
      role="img"
      tabIndex={-1}
    />
  );
}
