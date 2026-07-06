import { getApiBaseUrl, getOrganizationSlug, getPublicSurface } from "./env";
import type { ApiEnvelope, PaginationMeta, PublicSponsor } from "@/types/public-api";

export class PublicApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "PublicApiError";
    this.status = status;
  }
}

async function fetchPublicApiEnvelope<T>(
  path: string,
  options?: { params?: Record<string, string | number | undefined>; init?: RequestInit },
): Promise<ApiEnvelope<T>> {
  const base = getApiBaseUrl();
  const slug = getOrganizationSlug();
  const url = new URL(`${base}/public/organizations/${slug}${path}`);

  url.searchParams.set("surface", getPublicSurface());

  if (options?.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    ...options?.init,
  });

  if (!response.ok) {
    throw new PublicApiError(
      `API request failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  const envelope: ApiEnvelope<T> = await response.json();

  if (!envelope.success) {
    throw new PublicApiError(
      envelope.message || "API returned unsuccessful response",
      response.status,
    );
  }

  return envelope;
}

export async function fetchPublicApi<T>(
  path: string,
  options?: { params?: Record<string, string | number | undefined>; init?: RequestInit },
): Promise<T> {
  const envelope = await fetchPublicApiEnvelope<T>(path, options);
  return envelope.data;
}

export async function postPublicApi<T>(
  path: string,
  body: Record<string, unknown>,
  options?: { params?: Record<string, string | number | undefined>; init?: RequestInit },
): Promise<T> {
  const envelope = await fetchPublicApiEnvelope<T>(path, {
    ...options,
    init: {
      method: "POST",
      body: JSON.stringify(body),
      ...options?.init,
    },
  });
  return envelope.data;
}

export async function fetchPublicApiWithMeta<T>(
  path: string,
  options?: { params?: Record<string, string | number | undefined>; init?: RequestInit },
): Promise<{ data: T; meta?: PaginationMeta }> {
  const envelope = await fetchPublicApiEnvelope<T>(path, options);
  return { data: envelope.data, meta: envelope.meta };
}

export function normalizeContentImage(
  item: { featuredImageUrl?: string; thumbnailUrl?: string },
  fallbackImageUrl?: string,
): string | undefined {
  return item.featuredImageUrl || item.thumbnailUrl || fallbackImageUrl;
}

export function normalizeContentExcerpt(item: {
  summary?: string;
  body?: string;
  bodySections?: { title?: string; body: string }[];
}): string {
  if (item.summary) return item.summary;
  if (item.body) return item.body;
  if (item.bodySections?.length && item.bodySections[0].body) {
    return item.bodySections[0].body;
  }
  return "";
}

export function generateInitials(name: string | undefined | null): string {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function displaySafeString(value: string | undefined | null): string {
  return value || "";
}

export function normalizeSponsor(raw: {
  id: string;
  title?: string;
  featuredImageUrl?: string;
  ctaUrl?: string;
  metadata?: { websiteUrl?: string };
  sortOrder?: number;
}): PublicSponsor {
  return {
    id: raw.id,
    name: raw.title || "",
    logoUrl: raw.featuredImageUrl,
    websiteUrl: raw.ctaUrl || raw.metadata?.websiteUrl,
    order: raw.sortOrder,
  };
}

export function normalizeTopScorer(raw: {
  rank: number;
  playerId: string;
  player: { fullName: string; imageUrl?: string };
  teamId?: string;
  team: { name: string; shortCode: string };
  goals: number;
}): {
  rank: number;
  playerId: string;
  playerName: string;
  teamId?: string;
  teamName?: string;
  teamInitials?: string;
  goals: number;
  imageUrl?: string;
} {
  return {
    rank: raw.rank,
    playerId: raw.playerId,
    playerName: raw.player.fullName,
    teamId: raw.teamId,
    teamName: raw.team.name,
    teamInitials: raw.team.shortCode,
    goals: raw.goals,
    imageUrl: raw.player.imageUrl,
  };
}
