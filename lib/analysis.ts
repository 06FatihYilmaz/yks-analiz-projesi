export type SubjectBreakdown = {
  name: string;
  correct: number;
  incorrect: number;
};

export type AnalysisPayload = {
  summary: string;
  focusAreas: string[];
  suggestions: string[];
  subjects: SubjectBreakdown[];
};

export type StoredState = {
  examNotes: string;
  analysis: AnalysisPayload;
};

export const DEFAULT_ANALYSIS: AnalysisPayload = {
  summary:
    "Henüz bir analiz yapılmadı. Deneme sonuçlarını girerek kişiselleştirilmiş içgörüler alabilirsin.",
  focusAreas: [],
  suggestions: [],
  subjects: [],
};

export const DEFAULT_STATE: StoredState = {
  examNotes: "",
  analysis: { ...DEFAULT_ANALYSIS },
};

export function sanitizeSubjects(subjects: SubjectBreakdown[] | undefined | null): SubjectBreakdown[] {
  if (!Array.isArray(subjects)) {
    return [];
  }

  return subjects
    .map((subject) => {
      const correct = Number(subject?.correct);
      const incorrect = Number(subject?.incorrect);

      return {
        name: typeof subject?.name === "string" ? subject.name.trim() : "",
        correct: Number.isFinite(correct) && correct >= 0 ? correct : 0,
        incorrect: Number.isFinite(incorrect) && incorrect >= 0 ? incorrect : 0,
      } satisfies SubjectBreakdown;
    })
    .filter((subject) => subject.name.length);
}

export function normalizeAnalysis(
  analysis: Partial<AnalysisPayload> | null | undefined
): AnalysisPayload {
  const summary =
    typeof analysis?.summary === "string" && analysis.summary.trim().length
      ? analysis.summary.trim()
      : DEFAULT_ANALYSIS.summary;

  const focusAreas = Array.isArray(analysis?.focusAreas)
    ? analysis.focusAreas
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => item.length)
    : [];

  const suggestions = Array.isArray(analysis?.suggestions)
    ? analysis.suggestions
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => item.length)
    : [];

  return {
    summary,
    focusAreas,
    suggestions,
    subjects: sanitizeSubjects(analysis?.subjects),
  };
}

export function normalizeState(state: Partial<StoredState> | null | undefined): StoredState {
  return {
    examNotes: typeof state?.examNotes === "string" ? state.examNotes : DEFAULT_STATE.examNotes,
    analysis: normalizeAnalysis(state?.analysis),
  };
}
