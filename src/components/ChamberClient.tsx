'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { chambers } from '@/data/chambers';
import Grid from '@/components/grid/Grid';

/**
 * ChamberClient is a client-side React component that renders the grid for a given chamber.
 * It manages the chamber state, including loading the chamber data based on URL params.
 * 
 * Props:
 * - chamberId: the numeric ID of the chamber to render (from 0 to 6)
 */
type ChamberClientProps = {
  chamberId: number;
};

export default function ChamberClient({ chamberId }: ChamberClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // State: currently selected chamber ID
  const [currentChamberId, setCurrentChamberId] = useState(chamberId);

  // Find the chamber data for the current chamber ID
  const chamber = chambers.find((c) => c.id === currentChamberId);

  // Player start position for this chamber (default to [0,0] if not found)
  const playerStart = chamber?.playerStart ?? [0, 0];

  // Entities (characters, doors, items) to render on the grid
  const entities = chamber?.entities ?? [];

  // When chamber changes, update URL using router.push()
  useEffect(() => {
    if (currentChamberId !== chamberId) {
      router.push(`/chamber/${currentChamberId}`);
    }
  }, [currentChamberId, chamberId, router]);

  // If chamber not found, render error message
  if (!chamber) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
        <p className="text-xl font-semibold">Chamber not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">{chamber.name}</h1>
      {/* Render the grid component with chamber data and control functions */}
      <Grid
        entities={entities}
        playerStart={playerStart}
        currentChamberId={currentChamberId}
        setCurrentChamberId={setCurrentChamberId}
      />
    </main>
  );
}
