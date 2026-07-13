"use client";

import { useCallback, useEffect, useState } from "react";
import { loadProgress, saveProgress } from "./progress";
import type { TextProgress } from "./types";

export {
  addAnnotation,
  markStage,
  overallPercent,
  resetProgress,
} from "./progress";

export function useProgress(textId: string) {
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<TextProgress>(() =>
    loadProgress(textId),
  );

  useEffect(() => {
    setProgress(loadProgress(textId));
    setHydrated(true);
  }, [textId]);

  const update = useCallback((updater: (prev: TextProgress) => TextProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  return { progress, update, hydrated };
}
