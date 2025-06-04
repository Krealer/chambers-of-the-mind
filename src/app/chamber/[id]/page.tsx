import type { Metadata } from 'next';
import type { ChamberData } from '@/types/game';
import { chambers } from '@/data/chambers';
import ChamberClient from '@/components/ChamberClient';

type ChamberPageProps = {
  params: { id: string }; // Next.js dynamic route params
};

/**
 * Server component to fetch chamber data by ID.
 * If chamber not found, renders a friendly message.
 * Otherwise, renders ChamberClient client component with props.
 */
export default function ChamberPage({ params }: ChamberPageProps) {
  const chamberId = Number(params.id);

  // Find chamber by id from data
  const chamber = chambers.find((c) => c.id === chamberId);

  if (!chamber) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl p-4">
        <p>Chamber not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gray-900 text-white flex flex-col items-center">
      <h2 className="mb-6 text-3xl font-semibold">{chamber.name}</h2>
      <ChamberClient
        chamberId={chamber.id}
        entities={chamber.entities}
        playerStart={chamber.playerStart}
      />
    </main>
  );
}

/**
 * Optional: You can export metadata per page for SEO
 */
export const metadata: Metadata = {
  title: 'Chamber',
  description: 'Explore the Mind Palace chamber',
};
