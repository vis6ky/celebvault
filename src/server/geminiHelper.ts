import { GoogleGenAI } from '@google/genai';

/**
 * Priority list of production text models to try in sequence if one encounters
 * temporary capacity spikes (503 / 429 / UNAVAILABLE).
 */
const CANDIDATE_MODELS = [
  'gemini-3.7-flash',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
];

interface GeminiGenerateOptions {
  responseMimeType?: string;
  maxRetriesPerModel?: number;
}

/**
 * Robust server-side Gemini caller with automatic model fallback and transient error retry.
 */
export async function generateContentWithFallback(
  prompt: string,
  apiKey?: string,
  options?: GeminiGenerateOptions
): Promise<string | null> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }

  const ai = new GoogleGenAI({
    apiKey: key,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
  });

  const responseMimeType = options?.responseMimeType;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: responseMimeType ? { responseMimeType } : undefined,
      });

      const text = response.text;
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const isTransient =
        errMsg.includes('503') ||
        errMsg.includes('429') ||
        errMsg.includes('UNAVAILABLE') ||
        errMsg.includes('high demand') ||
        errMsg.includes('Resource has been exhausted');

      if (isTransient) {
        console.warn(`[Gemini API] Model ${model} is experiencing high demand (${errMsg.slice(0, 120)}). Trying fallback model...`);
        // Small delay before trying next model
        await new Promise((resolve) => setTimeout(resolve, 300));
        continue;
      } else {
        console.warn(`[Gemini API] Model ${model} call error: ${errMsg.slice(0, 120)}. Trying next candidate...`);
        continue;
      }
    }
  }

  console.warn('[Gemini API] All Gemini candidate models were unavailable or busy. Using verified local deterministic records.');
  return null;
}
