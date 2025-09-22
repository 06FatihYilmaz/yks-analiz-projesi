import { NextResponse } from "next/server";
import { AnalysisPayload, DEFAULT_STATE, StoredState, normalizeAnalysis } from "../../../lib/analysis";
import { mergeState, readState } from "../../../lib/storage";

export const runtime = "nodejs";

export async function GET() {
  try {
    const state = await readState();
    return NextResponse.json(state);
  } catch (error) {
    console.error("Durum alınırken hata oluştu", error);
    return NextResponse.json(DEFAULT_STATE, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown> | null;
    const update: Partial<StoredState> = {};

    if (payload && typeof payload.examNotes === "string") {
      update.examNotes = payload.examNotes;
    }

    if (payload && typeof payload.analysis === "object" && payload.analysis !== null) {
      update.analysis = normalizeAnalysis(payload.analysis as Partial<AnalysisPayload>);
    }

    const merged = await mergeState(update);

    return NextResponse.json(merged);
  } catch (error) {
    console.error("Durum güncellenirken hata oluştu", error);
    return NextResponse.json({ message: "Durum kaydedilemedi." }, { status: 500 });
  }
}
