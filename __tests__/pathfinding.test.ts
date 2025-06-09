import { findPath, Position } from '../src/lib/pathfinding';

describe('findPath', () => {
  const createGrid = (rows: number, cols: number, walls: Position[] = []) => {
    const wallSet = new Set(walls.map(([r, c]) => `${r},${c}`));
    return (row: number, col: number) => {
      if (row < 0 || col < 0 || row >= rows || col >= cols) return false;
      return !wallSet.has(`${row},${col}`);
    };
  };

  test('finds shortest path in open grid', () => {
    const isWalkable = createGrid(3, 3);
    const path = findPath([0, 0], [2, 2], (pos) => {
      const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      const neighbors: Position[] = [];
      for (const [dr, dc] of deltas) {
        const nr = pos[0] + dr;
        const nc = pos[1] + dc;
        if (isWalkable(nr, nc)) neighbors.push([nr, nc]);
      }
      return neighbors;
    });
    expect(path).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
  });

  test('returns null when no path exists', () => {
    const isWalkable = createGrid(3, 3, [
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
    const path = findPath([0, 0], [2, 2], (pos) => {
      const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      const neighbors: Position[] = [];
      for (const [dr, dc] of deltas) {
        const nr = pos[0] + dr;
        const nc = pos[1] + dc;
        if (isWalkable(nr, nc)) neighbors.push([nr, nc]);
      }
      return neighbors;
    });
    expect(path).toBeNull();
  });
});
