// src/app/chamber/[id]/page.tsx

import { chambers } from '@/data/chambers';
import { notFound } from 'next/navigation';
import ChamberClientWrapper from '@/components/ChamberClientWrapper';

type PageProps = {
  params: { id: string };
};

/**
 * Server Component representing the Chamber page.
 *
 * - Receives chamber ID from URL params.
 * - Checks if the chamber exists.
 * - If not found, triggers a 404 page.
 * - Otherwise, renders the client-side ChamberClientWrapper,
 *   passing the chamber ID for client interactions.
 */
export default function ChamberPage({ params }: PageProps) {
  const chamberId = Number(params.id);

  // Find the chamber by ID
  const chamber = chambers.find((c) => c.id === chamberId);

  // If the chamber doesn't exist, render 404 page
  if (!chamber) {
    notFound();
  }

  // Render client component wrapper with chamberId prop
  return <ChamberClientWrapper chamberId={chamberId} />;
}
