// src/app/chamber/[id]/page.tsx

import { chambers } from '@/data/chambers';
import { notFound } from 'next/navigation';
import ChamberClientWrapper from '@/components/ChamberClientWrapper';

type PageProps = {
  params: { id: string };
};

/**
 * Server Component for rendering a Chamber page.
 *
 * - Reads the chamber ID from the URL params.
 * - Finds the corresponding chamber from the data.
 * - If not found, triggers Next.js 404 page.
 * - Renders the client-side ChamberClientWrapper with the chamberId prop.
 */
export default function ChamberPage({ params }: PageProps) {
  const { id } = params;

  // Parse chamber ID as number
  const chamberId = Number(id);

  // Look up chamber data by ID
  const chamber = chambers.find((c) => c.id === chamberId);

  // If chamber not found, show 404 page
  if (!chamber) {
    notFound();
  }

  // Render client-side component with chamberId prop
  return <ChamberClientWrapper chamberId={chamberId} />;
}
