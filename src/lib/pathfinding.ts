export type Position = [number, number];

export type NeighborFn = (pos: Position) => Position[];

export type HeuristicFn = (a: Position, b: Position) => number;

export type PathNode = {
  position: Position;
  g: number;
  h: number;
  f: number;
  parent: PathNode | null;
};

export const manhattan: HeuristicFn = ([r1, c1], [r2, c2]) =>
  Math.abs(r1 - r2) + Math.abs(c1 - c2);

/**
 * A generic A* pathfinding implementation.
 * @param start start position
 * @param end end position
 * @param getNeighbors function returning walkable neighbors of a position
 * @param heuristic distance heuristic (defaults to Manhattan)
 * @returns array of positions representing the shortest path or null if none
 */
export function findPath(
  start: Position,
  end: Position,
  getNeighbors: NeighborFn,
  heuristic: HeuristicFn = manhattan
): Position[] | null {
  const openList: PathNode[] = [];
  const closed = new Set<string>();
  const key = (p: Position) => `${p[0]}-${p[1]}`;

  openList.push({
    position: start,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
    parent: null,
  });

  while (openList.length > 0) {
    openList.sort((a, b) => a.f - b.f);
    const current = openList.shift()!;
    closed.add(key(current.position));

    if (current.position[0] === end[0] && current.position[1] === end[1]) {
      const path: Position[] = [];
      let node: PathNode | null = current;
      while (node) {
        path.push(node.position);
        node = node.parent;
      }
      return path.reverse();
    }

    for (const n of getNeighbors(current.position)) {
      if (closed.has(key(n))) continue;

      const gScore = current.g + 1;
      const hScore = heuristic(n, end);
      const fScore = gScore + hScore;

      const existing = openList.find(
        (node) => node.position[0] === n[0] && node.position[1] === n[1]
      );

      if (existing && existing.g <= gScore) continue;

      if (existing) {
        existing.g = gScore;
        existing.h = hScore;
        existing.f = fScore;
        existing.parent = current;
      } else {
        openList.push({ position: n, g: gScore, h: hScore, f: fScore, parent: current });
      }
    }
  }

  return null;
}
