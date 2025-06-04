'use client';

type CharacterProps = {
  position: [number, number]; // [row, col] on grid
  color: string;              // Unique color for character's tile/icon
  name: string;               // Character display name (used in tooltips)
};

const TILE_SIZE = 32;

/**
 * Character component represents a manipulator/helper on the grid.
 * - Renders as a colored circle positioned absolutely.
 * - Tooltip displays character name on hover.
 */
export default function Character({ position, color, name }: CharacterProps) {
  const [row, col] = position;

  return (
    <div
      style={{
        position: 'absolute',
        width: TILE_SIZE,
        height: TILE_SIZE,
        top: row * TILE_SIZE,
        left: col * TILE_SIZE,
        borderRadius: '50%',
        backgroundColor: color,
        border: '2px solid white', // White border for visibility
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title={name} // Shows name tooltip on hover
      role="button"
      aria-label={`Character: ${name}`}
      tabIndex={0}
    >
      {/* Optional: You can put initials or an icon here */}
    </div>
  );
}
