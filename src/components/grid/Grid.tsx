'use client';

import { useEffect, useState, useRef } from 'react';
import Tile from './Tile';
import Character from '../Character';
import Player from '../Player';
import Dialog from '@/components/ui/Dialog';
import { dialogs } from '@/data/dialogs';
import { isAdjacent } from '@/lib/isAdjacent';

type Entity = {
  type: 'character' | 'item' | 'door';
  position: [number, number];
  characterId?: string;
  color?: string;
  name?: string;
  leadsTo?: {
    chamberId: number;
    entryTile: [number, number];
  };
};

type DialogOption = {
  text: string;
  next: string | null;
};

type DialogNode = {
  text: string;
  options: DialogOption[];
};

type DialogTree = {
  [nodeKey: string]: DialogNode;
};

type DialogsType = Record<string, DialogTree>;

type GridProps = {
  entities: Entity[];
  playerStart: [number, number];
  currentChamberId: number;
  setCurrentChamberId: (id: number) => void;
};

const TILE_SIZE = 32;
const GRID_ROWS = 10;
const GRID_COLS = 18;

type Node = {
  position: [number, number];
  g: number;
  h: number;
  f: number;
  parent: Node | null;
};

export default function Grid({
  entities,
  playerStart,
  currentChamberId,
  setCurrentChamberId,
}: GridProps) {
  // Player's current position on the grid
  const [playerPos, setPlayerPos] = useState(playerStart);

  // Dialog state: current character ID and dialog node key
  const [dialogCharacterId, setDialogCharacterId] = useState<string | null>(null);
  const [dialogNodeKey, setDialogNodeKey] = useState<string | null>(null);

  // Movement path and timer references
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathRef = useRef<[number, number][]>([]);

  // Last clicked character to confirm interaction on second click
  const lastClickedCharacterRef = useRef<Entity | null>(null);

  // Reset player position when chamber changes
  useEffect(() => {
    setPlayerPos(playerStart);
    lastClickedCharacterRef.current = null; // Reset interaction state
    // Clear any ongoing movement timeout
    if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    pathRef.current = [];
  }, [playerStart, currentChamberId]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  /**
   * Safely access the current dialog node from dialogs data.
   * Returns null if character or node is invalid.
   */
  const currentDialog: DialogNode | null = (() => {
    if (!dialogCharacterId || !dialogNodeKey) return null;

    const dialogTree: DialogsType = dialogs;
    const characterDialog = dialogTree[dialogCharacterId];

    if (!characterDialog) return null;

    const node = characterDialog[dialogNodeKey];
    if (!node) return null;

    return node;
  })();

  /**
   * Checks if the tile at [row,col] is walkable (not blocked by door)
   */
  const isWalkable = (row: number, col: number) => {
    if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) return false;
    const entity = entities.find(
      (e) => e.position[0] === row && e.position[1] === col
    );
    if (!entity) return true; // No entity means floor tile = walkable
    return entity.type !== 'door'; // Doors block movement
  };

  /**
   * Manhattan distance heuristic for A* pathfinding
   */
  const heuristic = ([r1, c1]: [number, number], [r2, c2]: [number, number]) =>
    Math.abs(r1 - r2) + Math.abs(c1 - c2);

  /**
   * Returns walkable neighbors (up, down, left, right) of a tile
   */
  const getNeighbors = ([row, col]: [number, number]) => {
    const neighbors: [number, number][] = [];
    const deltas = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const [dr, dc] of deltas) {
      const nr = row + dr;
      const nc = col + dc;
      if (isWalkable(nr, nc)) neighbors.push([nr, nc]);
    }
    return neighbors;
  };

  /**
   * A* pathfinding implementation to find shortest walkable path from start to end
   */
  const findPath = (
    start: [number, number],
    end: [number, number]
  ): [number, number][] | null => {
    const openList: Node[] = [];
    const closedList: Set<string> = new Set();

    const posKey = (pos: [number, number]) => `${pos[0]}-${pos[1]}`;

    openList.push({
      position: start,
      g: 0,
      h: heuristic(start, end),
      f: heuristic(start, end),
      parent: null,
    });

    while (openList.length > 0) {
      // Sort openList by lowest f score (g + h)
      openList.sort((a, b) => a.f - b.f);
      const current = openList.shift()!;
      closedList.add(posKey(current.position));

      // Check if goal reached
      if (
        current.position[0] === end[0] &&
        current.position[1] === end[1]
      ) {
        // Reconstruct path by walking parents backwards
        const path: [number, number][] = [];
        let node: Node | null = current;
        while (node) {
          path.push(node.position);
          node = node.parent;
        }
        return path.reverse();
      }

      // Explore neighbors
      const neighbors = getNeighbors(current.position);
      for (const neighborPos of neighbors) {
        if (closedList.has(posKey(neighborPos))) continue;

        const gScore = current.g + 1;
        const hScore = heuristic(neighborPos, end);
        const fScore = gScore + hScore;

        const existing = openList.find(
          (node) =>
            node.position[0] === neighborPos[0] &&
            node.position[1] === neighborPos[1]
        );

        if (existing && existing.g <= gScore) continue;

        if (existing) {
          existing.g = gScore;
          existing.h = hScore;
          existing.f = fScore;
          existing.parent = current;
        } else {
          openList.push({
            position: neighborPos,
            g: gScore,
            h: hScore,
            f: fScore,
            parent: current,
          });
        }
      }
    }

    return null; // No path found
  };

  /**
   * Move player step-by-step along computed path every 200ms
   */
  const moveAlongPath = () => {
    if (pathRef.current.length === 0) return;

    const nextPos = pathRef.current.shift()!;
    setPlayerPos(nextPos);

    if (pathRef.current.length > 0) {
      moveTimeoutRef.current = setTimeout(moveAlongPath, 200);
    }
  };



  /**
   * Handle mouse clicks on grid: movement, dialog interaction, or chamber switching
   */
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Block clicks during dialog to prevent movement
    if (dialogCharacterId !== null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clickedCol = Math.floor(clickX / TILE_SIZE);
    const clickedRow = Math.floor(clickY / TILE_SIZE);

    if (
      clickedRow < 0 ||
      clickedRow >= GRID_ROWS ||
      clickedCol < 0 ||
      clickedCol >= GRID_COLS
    ) {
      return; // Ignore clicks outside grid
    }

    // Check if clicked tile is a door and leads somewhere
    const clickedDoor = entities.find(
      (e) =>
        e.type === 'door' &&
        e.position[0] === clickedRow &&
        e.position[1] === clickedCol &&
        e.leadsTo !== undefined
    );

    if (clickedDoor && clickedDoor.leadsTo) {
      // Switch chamber and teleport player to linked entry tile
      setCurrentChamberId(clickedDoor.leadsTo.chamberId);
      setPlayerPos(clickedDoor.leadsTo.entryTile);
      lastClickedCharacterRef.current = null; // Reset interaction state
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      pathRef.current = [];
      return;
    }

    // Check if clicked tile contains a character
    const clickedCharacter = entities.find(
      (e) =>
        e.type === 'character' &&
        e.position[0] === clickedRow &&
        e.position[1] === clickedCol
    );

    if (clickedCharacter) {
      // If player is adjacent AND last clicked same character → open dialog
      if (
        isAdjacent(playerPos, clickedCharacter.position) &&
        lastClickedCharacterRef.current === clickedCharacter
      ) {
        setDialogCharacterId(clickedCharacter.characterId ?? null);
        setDialogNodeKey('start');
        lastClickedCharacterRef.current = null; // Reset interaction state
        return;
      }

      // Otherwise store clicked character and move player adjacent
      lastClickedCharacterRef.current = clickedCharacter;

      // Find all walkable adjacent tiles next to character
      const adjTiles = getNeighbors(clickedCharacter.position).filter((pos) =>
        isWalkable(pos[0], pos[1])
      );

      if (adjTiles.length === 0) return; // No walkable adjacent tile

      // Find closest adjacent tile to player
      const closestAdj = adjTiles.reduce(
        (closest, pos) =>
          heuristic(pos, playerPos) < heuristic(closest, playerPos)
            ? pos
            : closest,
        adjTiles[0]
      );

      const path = findPath(playerPos, closestAdj);
      if (!path) return;

      // Remove current player pos from path start if present
      if (
        path.length > 0 &&
        path[0][0] === playerPos[0] &&
        path[0][1] === playerPos[1]
      ) {
        path.shift();
      }

      pathRef.current = path;
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      moveAlongPath();

      return;
    }

    // Clicked non-character tile cancels last clicked character (interaction)
    lastClickedCharacterRef.current = null;

    if (!isWalkable(clickedRow, clickedCol)) return;

    const path = findPath(playerPos, [clickedRow, clickedCol]);
    if (!path) return;

    if (
      path.length > 0 &&
      path[0][0] === playerPos[0] &&
      path[0][1] === playerPos[1]
    ) {
      path.shift();
    }

    pathRef.current = path;
    if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    moveAlongPath();
  };

  /**
   * Handles player choice selection inside dialog
   */
  const handleDialogChoice = (nextKey: string | null) => {
    if (!nextKey) {
      // Dialog ends
      setDialogCharacterId(null);
      setDialogNodeKey(null);
      lastClickedCharacterRef.current = null;
    } else {
      // Proceed to next dialog node
      setDialogNodeKey(nextKey);
    }
  };

  /**
   * Closes the dialog UI
   */
  const handleDialogClose = () => {
    setDialogCharacterId(null);
    setDialogNodeKey(null);
    lastClickedCharacterRef.current = null;
  };

  /**
   * Helper: returns true if the tile is a door tile, used for rendering
   */
  const isDoorTile = (row: number, col: number) =>
    entities.some(
      (entity) =>
        entity.type === 'door' &&
        entity.position[0] === row &&
        entity.position[1] === col
    );

  return (
    <>
      <div
        onClick={handleGridClick}
        style={{
          position: 'relative',
          width: GRID_COLS * TILE_SIZE,
          height: GRID_ROWS * TILE_SIZE,
          backgroundColor: '#2d3748',
          border: '2px solid #4a5568',
          userSelect: 'none',
          cursor: dialogCharacterId !== null ? 'default' : 'pointer',
          filter: dialogCharacterId !== null ? 'blur(2px)' : 'none',
          pointerEvents: dialogCharacterId !== null ? 'none' : 'auto',
        }}
      >
        {/* Render floor/door tiles */}
        {[...Array(GRID_ROWS)].map((_, row) =>
          [...Array(GRID_COLS)].map((_, col) => (
            <Tile
              key={`tile-${row}-${col}`}
              row={row}
              col={col}
              type={isDoorTile(row, col) ? 'door' : 'floor'}
            />
          ))
        )}

        {/* Render characters */}
        {entities
          .filter((e) => e.type === 'character')
          .map(({ position, color, name }, idx) => (
            <Character
              key={`char-${idx}`}
              position={position}
              color={color ?? '#f56565'}
              name={name ?? 'Unknown'}
            />
          ))}

        {/* Render player */}
        <Player position={playerPos} />
      </div>

      {/* Render Dialog UI if dialog active */}
      {currentDialog && dialogCharacterId && (
        <Dialog
          characterName={
            dialogCharacterId.charAt(0).toUpperCase() + dialogCharacterId.slice(1)
          }
          text={currentDialog.text}
          options={currentDialog.options}
          onChoice={handleDialogChoice}
          onClose={handleDialogClose}
        />
      )}
    </>
  );
}
