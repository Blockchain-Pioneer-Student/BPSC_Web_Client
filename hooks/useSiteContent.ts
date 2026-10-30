import {
  usePreviewSection,
} from "@/components/preview-bridge";
import type { PublicSiteContentKey } from "@/lib/services/siteContentService";

export function useSiteContent(key: PublicSiteContentKey) {
  return usePreviewSection(key);
}

export function readSiteContent(
  section: Record<string, unknown>,
  key: string,
  fallback: string,
) {
  const value = section[key];
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : fallback;
}
