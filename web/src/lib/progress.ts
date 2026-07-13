import type { Annotation, StageId, TextProgress } from "./types";

const STORAGE_KEY = "wenjing-progress-v1";

function emptyProgress(textId: string): TextProgress {
  return {
    textId,
    stages: {
      read: { status: "available" },
      techniques: { status: "locked" },
      write: { status: "locked" },
    },
    annotations: [],
    quizAnswers: {},
    quizCorrect: {},
    writingDraft: "",
    checklistChecked: [false, false, false, false, false, false],
    updatedAt: Date.now(),
  };
}

export function loadProgress(textId: string): TextProgress {
  if (typeof window === "undefined") return emptyProgress(textId);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress(textId);
    const all = JSON.parse(raw) as Record<string, TextProgress>;
    return all[textId] ?? emptyProgress(textId);
  } catch {
    return emptyProgress(textId);
  }
}

export function saveProgress(progress: TextProgress): void {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(STORAGE_KEY);
  const all: Record<string, TextProgress> = raw ? JSON.parse(raw) : {};
  all[progress.textId] = { ...progress, updatedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function markStage(
  progress: TextProgress,
  stage: StageId,
  status: TextProgress["stages"][StageId]["status"],
  extras?: Partial<TextProgress["stages"][StageId]>,
): TextProgress {
  const next: TextProgress = {
    ...progress,
    stages: {
      ...progress.stages,
      [stage]: {
        ...progress.stages[stage],
        status,
        ...extras,
      },
    },
  };

  if (status === "done") {
    if (stage === "read" && next.stages.techniques.status === "locked") {
      next.stages.techniques = { status: "available" };
    }
    if (stage === "techniques" && next.stages.write.status === "locked") {
      next.stages.write = { status: "available" };
    }
  }

  return next;
}

export function overallPercent(progress: TextProgress): number {
  const weights: Record<StageId, number> = {
    read: 30,
    techniques: 35,
    write: 35,
  };
  let total = 0;
  (Object.keys(weights) as StageId[]).forEach((id) => {
    const s = progress.stages[id];
    if (s.status === "done") total += weights[id];
    else if (s.status === "in_progress") total += weights[id] * 0.45;
  });
  return Math.round(total);
}

export function addAnnotation(
  progress: TextProgress,
  annotation: Omit<Annotation, "id" | "createdAt">,
): TextProgress {
  const item: Annotation = {
    ...annotation,
    id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  return {
    ...progress,
    annotations: [...progress.annotations, item],
  };
}

export function resetProgress(textId: string): TextProgress {
  const fresh = emptyProgress(textId);
  saveProgress(fresh);
  return fresh;
}
