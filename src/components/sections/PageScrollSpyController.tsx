"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

/**
 * PageScrollSpyController — Reusable wrapper for ANY page to provide:
 *  - Auto URL hash updates on scroll (History API, no reload)
 *  - Initial hash scroll on page load
 *  - Browser back/forward hash navigation
 *  - Anchor click interception for smooth scroll
 *
 * Usage:
 *   <PageScrollSpyController sections={["hero", "content", "cta"]}>
 *     <HeroSection />
 *     <ContentSection />
 *     <CTASection />
 *   </PageScrollSpyController>
 */

export default function PageScrollSpyController({
  sections,
  children,
}: {
  /** Array of section IDs that exist as `id="..."` on child section elements */
  sections: string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { scrollToSection } = useScrollSpy({ sectionIds: sections });

  // Intercept all anchor (#) clicks on the page for smooth scroll
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const id = href.replace("#", "");
      if (sections.includes(id)) {
        e.preventDefault();
        scrollToSection(id);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, scrollToSection, sections]);

  return <>{children}</>;
}
