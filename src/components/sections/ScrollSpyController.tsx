"use client";

import PageScrollSpyController from "./PageScrollSpyController";

/**
 * ScrollSpyController — Home page wrapper.
 * Delegates to the shared PageScrollSpyController with home-specific section IDs.
 */

const HOME_SECTIONS = [
  "inicio",
  "features",
  "catalogo",
  "calidad",
  "testimonios",
  "contacto",
] as const;

export default function ScrollSpyController({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageScrollSpyController sections={[...HOME_SECTIONS]}>
      {children}
    </PageScrollSpyController>
  );
}
