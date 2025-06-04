'use client';

type TileProps = {
  row: number;
  col: number;
  type: 'floor' | 'door'; // Tile type: floor or door
};

/**
 * Tile component represents a single square on the grid.
 * It displays differently based on its `type`:
 * - Floor tiles: simple gray background
 * - Door tiles: black square to indicate door presence
 *
 * Position is set absolutely based on row and column, using fixed TILE_SIZE from Grid.
 */
export default function Tile({ row, col, type }: TileProps) {
  // Each tile is 32x32 pixels (should match TILE_SIZE constant in Grid)
  const TILE_SIZE = 32;

  // Determine tile styles based on type
  const baseStyle = {
    position: 'absolute' as const,
    width: TILE_SIZE,
    height: TILE_SIZE,
    top: row * TILE_SIZE,
    left: col * TILE_SIZE,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4a5568', // Tailwind gray-600
    boxSizing: 'border-box' as const,
  };

  // Color variants
  const floorStyle = {
    backgroundColor: '#374151', // Tailwind gray-700
  };

  const doorStyle = {
    backgroundColor: '#000000', // Black for doors
    borderColor: '#1a202c', // Darker border (gray-900)
  };

  return (
    <div
      style={{
        ...baseStyle,
        ...(type === 'door' ? doorStyle : floorStyle),
      }}
      aria-label={type === 'door' ? 'Door tile' : 'Floor tile'}
      role="gridcell"
      tabIndex={-1}
      data-row={row}
      data-col={col}
    />
  );
}
