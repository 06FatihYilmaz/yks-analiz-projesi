import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AnalysisPayload, normalizeAnalysis } from "../../../lib/analysis";
import { writeState } from "../../../lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ message: "Analiz için deneme notları gerekli." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "Sunucu Gemini API anahtarı ile yapılandırılmamış." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemPrompt = `Sen Türkiye'deki Yükseköğretim Kurumları Sınavı (YKS) denemeleri konusunda uzman bir eğitim koçusun.
Kullanıcının sağladığı deneme sonuçlarını analiz et ve aşağıdaki JSON şemasına sıkı sıkıya bağlı kal:
{
  "summary": string,
  "focusAreas": string[],
  "suggestions": string[],
  "subjects": [{ "name": string, "correct": number, "incorrect": number }]
}
- "summary" kısmı 2-3 cümlede genel değerlendirme sağlamalı.
- "focusAreas" eksik veya zayıf konuları net şekilde belirtmeli.
- "suggestions" uygulanabilir çalışma önerileri olmalı.
- "subjects" dizisi, metinden çıkarılabilen dersler için doğru ve yanlış adetlerini içermeli; veri yoksa ilgili alanı 0 gir.
JSON dışında hiçbir açıklama ekleme.`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\nKullanıcı deneme notları:\n${prompt}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            summary: { type: SchemaType.STRING },
            focusAreas: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            suggestions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            subjects: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  name: { type: SchemaType.STRING },
                  correct: { type: SchemaType.NUMBER },
                  incorrect: { type: SchemaType.NUMBER },
                },
                required: ["name", "correct", "incorrect"],
              },
            },
          },
          required: ["summary", "focusAreas", "suggestions", "subjects"],
        },
      },
    });

    const responseText = result.response.text();

    let payload: AnalysisPayload | null = null;
    try {
      payload = JSON.parse(responseText);
    } catch (error) {
      const cleaned = responseText.replace(/```json|```/g, "").trim();
      payload = JSON.parse(cleaned);
    }

    if (!payload) {
      throw new Error("Gemini yanıtı çözümlenemedi.");
    }

    const normalized = normalizeAnalysis(payload);
    await writeState({ examNotes: prompt.trim(), analysis: normalized });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Gemini API hatası", error);
    return NextResponse.json(
      { message: "Gemini yanıtı alınırken bir sorun oluştu." },
      { status: 500 }
    );
  }
}
