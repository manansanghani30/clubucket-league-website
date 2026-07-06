import { getApiBaseUrl, getOrganizationSlug, getPublicSurface } from "./env";
import type {
  ApiEnvelope,
  PaginationMeta,
  PublicConfig,
  PublicConfigNavigationItem,
  PublicConfigRaw,
  PublicDivision,
  PublicSeason,
  PublicSponsor,
} from "@/types/public-api";

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

const moduleRouteMap: Record<string, string | undefined> = {
  home: "/",
  divisions: "/divisions",
  schedule: "/schedule",
  standings: "/standing",
  news: "/news",
  highlights: "/highlights",
  aboutUs: "/about",
  topScorers: "/top-scorers",
};

export function normalizePublicRoute(item: PublicConfigNavigationItem): string | undefined {
  return moduleRouteMap[item.key];
}

export function normalizePublicConfig(raw: PublicConfigRaw): PublicConfig {
  const enabledModules = raw.enabledModules || {};
  const supportedLocales =
    raw.supportedLocales?.map((item) =>
      typeof item === "string" ? { label: item.toUpperCase(), locale: item } : item,
    ) || [];
  const defaultLocale = raw.defaultLocale || supportedLocales[0]?.locale || "en";
  const navigation = (raw.navigation || [])
    .map((item) => ({ ...item, appRoute: normalizePublicRoute(item) }))
    .filter(
      (item) =>
        item.appRoute &&
        (item.key === "home" || enabledModules[item.key] !== false),
    ) as PublicConfig["navigation"];

  return {
    id: raw.id,
    organizationSlug: raw.organization.slug,
    displayName: raw.displayName || raw.organization.name || raw.organization.slug,
    logoUrl: raw.logoUrl,
    appIconUrl: raw.appIconUrl,
    fallbackImageUrl: raw.fallbackImageUrl,
    contactEmail: raw.contactEmail,
    contactPhone: raw.contactPhone,
    website: raw.website,
    socialLinks: raw.socialLinks,
    defaultLocale,
    supportedLocales: supportedLocales.length
      ? supportedLocales
      : [{ label: defaultLocale.toUpperCase(), locale: defaultLocale }],
    enabledModules,
    activeSeasonId: raw.activeSeason?.id,
    activeSeason: raw.activeSeason || undefined,
    defaultDivisionId: raw.defaultDivision?.id,
    defaultDivision: raw.defaultDivision,
    navigation,
    theme: raw.theme,
    settings: raw.settings,
    publishedAt: raw.publishedAt,
  };
}

export function isModuleEnabled(config: PublicConfig | undefined, key: string): boolean {
  if (!config) return true;
  if (key === "home") return config.enabledModules.home !== false;
  return config.enabledModules[key] === true;
}

export function getDefaultSeasonId(
  config: PublicConfig | undefined,
  seasons: PublicSeason[] | undefined,
): string | undefined {
  if (config?.activeSeasonId) return config.activeSeasonId;
  const active = seasons?.find((s) => s.isActive || s.isCurrent);
  return active?.id || seasons?.[0]?.id;
}

export function getDefaultDivisionId(
  config: PublicConfig | undefined,
  divisions: PublicDivision[] | undefined,
): string | undefined {
  return config?.defaultDivisionId || divisions?.[0]?.id;
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
