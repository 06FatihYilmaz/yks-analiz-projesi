"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ProgressChart } from "../components/ProgressChart";
import {
  AnalysisPayload,
  DEFAULT_ANALYSIS,
  DEFAULT_STATE,
  StoredState,
  normalizeAnalysis,
} from "../lib/analysis";

export default function HomePage() {
  const [examNotes, setExamNotes] = useState(DEFAULT_STATE.examNotes);
  const [analysis, setAnalysis] = useState<AnalysisPayload>(DEFAULT_ANALYSIS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAutoSaveReady = useRef(false);

  const hasInsights = useMemo(
    () =>
      analysis.summary !== DEFAULT_ANALYSIS.summary ||
      analysis.focusAreas.length > 0 ||
      analysis.suggestions.length > 0 ||
      analysis.subjects.length > 0,
    [analysis]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadState() {
      try {
        const response = await fetch("/api/state", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Sunucu durum bilgisine ulaşılamadı.");
        }

        const payload = (await response.json()) as StoredState;
        if (!isMounted) {
          return;
        }

        setExamNotes(typeof payload.examNotes === "string" ? payload.examNotes : "");
        setAnalysis(normalizeAnalysis(payload.analysis));
      } catch (err) {
        console.error("Durum bilgisi yüklenemedi", err);
      } finally {
        isAutoSaveReady.current = true;
      }
    }

    loadState();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAutoSaveReady.current) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examNotes }),
        signal: controller.signal,
      }).catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Notlar kaydedilirken hata oluştu", err);
        }
      });
    }, 800);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [examNotes]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!examNotes.trim()) {
      setError("Lütfen denemeye ait notlarını yaz.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: examNotes }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message ?? "Analiz sırasında bir sorun oluştu.");
      }

      const payload = (await response.json()) as AnalysisPayload;
      setAnalysis(normalizeAnalysis(payload));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <div className="container">
        <header>
          <h1>YKS Yol Arkadaşı</h1>
          <p>
            Deneme sonuçlarını paylaş, Gemini destekli analizle ders bazlı performansını gör ve bir sonraki
            çalışma adımlarını planla.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="notes">Deneme Notların</label>
            <textarea
              id="notes"
              value={examNotes}
              onChange={(event) => setExamNotes(event.target.value)}
              placeholder="Örn: TYT denemesindeki netlerim: Matematik 28-6, Türkçe 34-3, Fen 18-7..."
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Gemini analiz ediyor..." : "Analiz Et"}
            </button>
          </section>
        </form>

        {error ? (
          <div className="alert" role="status">
            {error}
          </div>
        ) : null}

        <section className="analysis-grid" aria-live="polite">
          <article className="card">
            <h2>Özet</h2>
            <p>{analysis.summary}</p>
          </article>

          <article className="card">
            <h2>Odak Alanları</h2>
            {analysis.focusAreas.length ? (
              <ul>
                {analysis.focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Analiz sonrasında kritik konu önerileri burada görünecek.</p>
            )}
          </article>

          <article className="card">
            <h2>Önerilen Aksiyonlar</h2>
            {analysis.suggestions.length ? (
              <ul>
                {analysis.suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Gemini tarafından önerilen çalışma adımları burada listelenecek.</p>
            )}
          </article>
        </section>

        <ProgressChart subjects={analysis.subjects} />

        {!hasInsights ? (
          <footer>
            <p>
              Girdiğin deneme sonuçlarına göre ders bazlı doğru/yanlış dağılımı ve çalışma önerileri hazırlanacaktır.
            </p>
          </footer>
        ) : null}
      </div>
    </main>
  );
}
