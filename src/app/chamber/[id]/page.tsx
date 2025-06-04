// src/app/chamber/[id]/page.tsx

import { chambers } from '@/data/chambers';
import { notFound } from 'next/navigation';
import ChamberClientWrapper from '@/components/ChamberClientWrapper';

type PageProps = {
  // Next.js App Router now passes params as a Promise
  params: Promise<{ id: string }>;
};

/**
 * Server Component for rendering a Chamber page.
 *
 * - Awaits the `params` Promise to get the chamber ID from the URL.
 * - Finds the corresponding chamber from the data.
 * - If not found, triggers Next.js 404 page.
 * - Renders the client-side ChamberClientWrapper with the chamberId prop.
 */
export default async function ChamberPage({ params }: PageProps) {
  // Await params Promise to get actual params object
  const { id } = await params;

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
