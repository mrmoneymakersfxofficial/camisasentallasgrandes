"use client";

import { useEffect } from "react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

interface PageScrollSpyControllerProps {
  sectionIds: string[];
}

/**
 * Reusable Scroll Spy Controller for any page.
 *
 * Wrap each page's content with this component, passing the section IDs
 * that exist on that page. It will:
 * - Track which section is currently visible
 * - Update the URL via History API on scroll
 * - Handle hash navigation on page load
 * - Support smooth scrolling
 *
 * Usage:
 *   <PageScrollSpyController sectionIds={['hero', 'productos']}>
 *     <YourPageContent />
 *   </PageScrollSpyController>
 */
export default function PageScrollSpyController({
  sectionIds,
}: PageScrollSpyControllerProps) {
  const { activeId } = useScrollSpy(sectionIds);

  // Set initial active section if no hash in URL
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash && sectionIds.length > 0) {
      // Default to first section
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${sectionIds[0]}`
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // This component doesn't render any UI
  return null;
}
