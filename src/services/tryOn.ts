import type { ClothType } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export interface TryOnRequest {
  humanImage: string;
  garmentImage: string;
  category: string;
  garmentName: string;
  clothType?: ClothType;
}

export interface TryOnResponse {
  imageUrl: string;
  provider?: string;
}

export interface HealthResponse {
  ok: boolean;
  providers?: { replicate: boolean; fal: boolean };
  preferred?: string;
}

export async function checkAiHealth(): Promise<HealthResponse & { aiReady: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) return { ok: false, aiReady: false };
    const data = (await res.json()) as HealthResponse & { aiReady?: boolean };
    return { ...data, aiReady: Boolean(data.aiReady) };
  } catch {
    return { ok: false, aiReady: false };
  }
}

export async function generateTryOn(
  request: TryOnRequest,
  signal?: AbortSignal,
): Promise<TryOnResponse> {
  const res = await fetch(`${API_BASE}/api/try-on`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      humanImage: request.humanImage,
      garmentImage: request.garmentImage,
      category: request.category,
      garmentName: request.garmentName,
      clothType: request.clothType,
    }),
    signal,
  });

  let data: TryOnResponse & { error?: string };
  try {
    data = (await res.json()) as TryOnResponse & { error?: string };
  } catch {
    throw new Error(
      res.status === 404
        ? "Backend not running. Run npm run dev to start both server and app."
        : "Try-on request failed.",
    );
  }

  if (!res.ok) {
    throw new Error(data.error ?? "Try-on request failed.");
  }

  return data;
}
