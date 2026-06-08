"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Universal Scroll Spy Hook
 *
 * Uses IntersectionObserver to detect which section is currently visible
 * and updates the URL via History API (replaceState) without page reload.
 *
 * Features:
 * - Works on any page automatically (uses usePathname)
 * - Supports hash navigation on load
 * - Smooth scroll to hash on mount
 * - Updates URL as user scrolls between sections
 * - Easily scalable: just pass sectionIds
 */
export function useScrollSpy(sectionIds: string[]) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const isScrollingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash)) {
      // Delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          isScrollingRef.current = true;
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveId(hash);
          // Reset flag after scroll animation completes
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1000);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [sectionIds]);

  // IntersectionObserver to track visible sections
  useEffect(() => {
    if (sectionIds.length === 0) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Don't update URL while programmatic scrolling
      if (isScrollingRef.current) return;

      // Find the most visible section
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length === 0) return;

      // Pick the entry with the highest intersection ratio
      const mostVisible = visibleEntries.reduce((prev, curr) =>
        curr.intersectionRatio > prev.intersectionRatio ? curr : prev
      );

      const id = mostVisible.target.id;
      if (id) {
        setActiveId(id);
        // Update URL via History API without reload
        const newHash = `#${id}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}${newHash}`
          );
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px", // Section is "active" when it's in upper-middle of viewport
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds]);

  // Smooth scroll to section by ID
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Update URL immediately
      const newHash = `#${id}`;
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${newHash}`
      );
      setActiveId(id);

      // Reset flag after scroll animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, []);

  return { activeId, scrollToSection };
}
