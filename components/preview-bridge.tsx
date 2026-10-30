
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  siteContentService,
  type SiteContentEntry,
} from "@/lib/services/siteContentService";

export type PreviewDrafts = Record<
  string,
  Record<string, unknown>
>;

interface PreviewContextValue {
  drafts: PreviewDrafts;
  visibility: Record<string, boolean>;
  content: PreviewDrafts;
  publishedVisibility: Record<string, boolean>;
  previewMode: boolean;
}

const PreviewContext = createContext<PreviewContextValue>({
  drafts: {},
  visibility: {},
  content: {},
  publishedVisibility: {},
  previewMode: false,
});

// Các domain Admin được phép giao tiếp với Client.
const ALLOWED_ADMIN_ORIGINS = [
  "https://admin.bpsclub.com",
  "https://admin-bpsclub.vercel.app",
  "http://localhost:8080",
  "http://localhost:8081",
];

function getAdminOrigin(): string | null {
  // Ưu tiên lấy origin từ trang cha (Admin).
  try {
    if (document.referrer) {
      const referrerOrigin = new URL(document.referrer).origin;

      if (ALLOWED_ADMIN_ORIGINS.includes(referrerOrigin)) {
        return referrerOrigin;
      }
    }
  } catch {
    console.warn("[Preview] Invalid parent referrer");
  }

  // Fallback cho môi trường local.
  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:8080";
  }

  // Domain Admin production mặc định.
  if (
    hostname === "bpsclub.com" ||
    hostname === "www.bpsclub.com"
  ) {
    return "https://admin.bpsclub.com";
  }

  return null;
}

export function PreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drafts, setDrafts] = useState<PreviewDrafts>({});
  const [visibility, setVisibility] = useState<
    Record<string, boolean>
  >({});

  const [content, setContent] = useState<PreviewDrafts>({});
  const [publishedVisibility, setPublishedVisibility] = useState<
    Record<string, boolean>
  >({});

  const [previewMode, setPreviewMode] = useState(false);

  // Load published content.
  useEffect(() => {
    let isCurrent = true;

    siteContentService
      .getAllPublic()
      .then((entries: SiteContentEntry[]) => {
        if (!isCurrent) return;

        const nextContent: PreviewDrafts = {};
        const nextVisibility: Record<string, boolean> = {};

        entries.forEach((entry) => {
          nextContent[entry.key] = entry.value ?? {};
          nextVisibility[entry.key] = entry.is_visible ?? true;
        });

        setContent(nextContent);
        setPublishedVisibility(nextVisibility);
      })
      .catch((error) => {
        console.error(
          "[Preview] Could not load public site content",
          error
        );
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  // Preview communication with Admin.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const enabled =
      params.get("bpscPreview") === "1" &&
      window.parent !== window;

    setPreviewMode(enabled);

    if (!enabled) return;

    const adminOrigin = getAdminOrigin();

    if (!adminOrigin) {
      console.error(
        "[Preview] Unable to identify a trusted Admin origin"
      );
      return;
    }

    console.log("[Preview] Admin origin:", adminOrigin);

    // Notify Admin that Client is ready.
    const sendReady = () => {
      window.parent.postMessage(
        {
          type: "BPSC_PREVIEW_READY",
        },
        adminOrigin
      );
    };

    // Receive preview updates from Admin.
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the actual parent window.
      if (event.source !== window.parent) return;

      // Verify the sender's origin.
      if (event.origin !== adminOrigin) {
        console.warn(
          "[Preview] Rejected message from:",
          event.origin
        );
        return;
      }

      if (event.data?.type !== "BPSC_PREVIEW_UPDATE") {
        return;
      }

      const payload = event.data.payload;

      if (!payload || typeof payload !== "object") {
        return;
      }

      // Update draft content.
      if (
        payload.drafts &&
        typeof payload.drafts === "object" &&
        !Array.isArray(payload.drafts)
      ) {
        setDrafts(payload.drafts as PreviewDrafts);
      }

      // Update section visibility.
      if (
        payload.visibility &&
        typeof payload.visibility === "object" &&
        !Array.isArray(payload.visibility)
      ) {
        setVisibility(
          payload.visibility as Record<string, boolean>
        );
      }

      console.log("[Preview] Draft updated successfully");
    };

    window.addEventListener("message", handleMessage);

    // Tell Admin that the Client preview is ready.
    sendReady();

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const value = useMemo(
    () => ({
      drafts,
      visibility,
      content,
      publishedVisibility,
      previewMode,
    }),
    [
      content,
      drafts,
      previewMode,
      publishedVisibility,
      visibility,
    ]
  );

  return (
    <PreviewContext.Provider value={value}>
      {children}
    </PreviewContext.Provider>
  );
}

// Get content with draft overrides in preview mode.
export function usePreviewSection<
  T extends Record<string, unknown>
>(key: string): T {
  const { content, drafts, previewMode } =
    useContext(PreviewContext);

  const published = content[key] ?? {};
  const draft = previewMode ? drafts[key] : undefined;

  return {
    ...published,
    ...draft,
  } as T;
}

// Check whether preview mode is active.
export function usePreviewMode() {
  return useContext(PreviewContext).previewMode;
}

// Get section visibility.
export function usePreviewVisible(
  key: string,
  fallback = true
) {
  const {
    visibility,
    publishedVisibility,
    previewMode,
  } = useContext(PreviewContext);

  if (
    previewMode &&
    visibility[key] !== undefined
  ) {
    return visibility[key];
  }

  return publishedVisibility[key] ?? fallback;
}
