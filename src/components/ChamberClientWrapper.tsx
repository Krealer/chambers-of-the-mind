// src/components/ChamberClientWrapper.tsx

'use client'; // Marks this component as a Client Component, enabling hooks and browser APIs

import ChamberClient from './ChamberClient';

type ChamberClientWrapperProps = {
  chamberId: number; // The ID of the chamber to render
};

/**
 * ChamberClientWrapper is a lightweight client component that acts as a bridge
 * between the server-side page and the fully interactive ChamberClient.
 *
 * It receives the chamberId as a prop from the server component
 * and passes it down to ChamberClient, which contains all client-side logic.
 */
export default function ChamberClientWrapper({ chamberId }: ChamberClientWrapperProps) {
  return <ChamberClient chamberId={chamberId} />;
}
