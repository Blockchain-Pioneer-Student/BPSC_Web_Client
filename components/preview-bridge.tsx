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

export type PreviewDrafts = Record<string, Record<string, unknown>>;

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

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [drafts, setDrafts] = useState<PreviewDrafts>({});
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [content, setContent] = useState<PreviewDrafts>({});
  const [publishedVisibility, setPublishedVisibility] = useState<
    Record<string, boolean>
  >({});
  const [previewMode, setPreviewMode] = useState(false);

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
        console.error("Could not load public site content", error);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const enabled =
      params.get("bpscPreview") === "1" && window.parent !== window;
    setPreviewMode(enabled);
    if (!enabled) return;

    const adminOrigin =
      window.location.hostname === "localhost" ||
      window.location.hostname === "https://admin.bpsclub.com" ||
      window.location.hostname === "127.0.0.1"
        ? `http://${window.location.hostname}:8080`
        : "https://admin-bpsclub.vercel.app";

    const sendReady = () => {
      window.parent.postMessage(
        { type: "BPSC_PREVIEW_READY" },
        adminOrigin,
      );
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.parent || event.origin !== adminOrigin) return;
      if (event.data?.type !== "BPSC_PREVIEW_UPDATE") return;
      const payload = event.data.payload;
      if (!payload || typeof payload !== "object") return;

      if (payload.drafts && typeof payload.drafts === "object") {
        setDrafts(payload.drafts as PreviewDrafts);
      }
      if (payload.visibility && typeof payload.visibility === "object") {
        setVisibility(payload.visibility as Record<string, boolean>);
      }
    };

    window.addEventListener("message", handleMessage);
    sendReady();
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const value = useMemo(
    () => ({
      drafts,
      visibility,
      content,
      publishedVisibility,
      previewMode,
    }),
    [content, drafts, previewMode, publishedVisibility, visibility],
  );

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
}

export function usePreviewSection<T extends Record<string, unknown>>(
  key: string,
): T {
  const { content, drafts, previewMode } = useContext(PreviewContext);
  const published = content[key] ?? {};
  const draft = previewMode ? drafts[key] : undefined;
  return { ...published, ...draft } as T;
}

export function usePreviewMode() {
  return useContext(PreviewContext).previewMode;
}

export function usePreviewVisible(key: string, fallback = true) {
  const { visibility, publishedVisibility, previewMode } =
    useContext(PreviewContext);
  if (previewMode && visibility[key] !== undefined) return visibility[key];
  return publishedVisibility[key] ?? fallback;
}
