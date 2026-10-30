"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PreviewDrafts = Record<string, Record<string, unknown>>;

interface PreviewContextValue {
  drafts: PreviewDrafts;
  visibility: Record<string, boolean>;
  previewMode: boolean;
}

const PreviewContext = createContext<PreviewContextValue>({
  drafts: {},
  visibility: {},
  previewMode: false,
});

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [drafts, setDrafts] = useState<PreviewDrafts>({});
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const enabled =
      params.get("bpscPreview") === "1" && window.parent !== window;
    setPreviewMode(enabled);
    if (!enabled) return;

    const sendReady = () => {
      window.parent.postMessage({ type: "BPSC_PREVIEW_READY" }, "*");
    };

    const handleMessage = (event: MessageEvent) => {
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
    () => ({ drafts, visibility, previewMode }),
    [drafts, previewMode, visibility],
  );

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
}

export function usePreviewSection<T extends Record<string, unknown>>(
  key: string,
): T {
  return useContext(PreviewContext).drafts[key] as T || ({} as T);
}

export function usePreviewMode() {
  return useContext(PreviewContext).previewMode;
}

export function usePreviewVisible(key: string, fallback = true) {
  const { visibility, previewMode } = useContext(PreviewContext);
  if (!previewMode || visibility[key] === undefined) return fallback;
  return visibility[key];
}
