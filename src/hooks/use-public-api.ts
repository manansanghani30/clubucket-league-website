import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchPublicApi,
  fetchPublicApiWithMeta,
  postPublicApi,
  normalizeTopScorer,
  normalizeSponsor,
  normalizePublicConfig,
} from "@/lib/public-api";
import { getOrganizationSlug } from "@/lib/env";
import type {
  PublicConfigRaw,
  PublicDivision,
  PublicTeamDetail,
  PublicTeamDetailRaw,
  PublicSeason,
  PublicFixture,
  PublicStandingRow,
  PublicTopScorer,
  PublicTopScorerRaw,
  PublicContentItem,
  PublicSponsor,
  PublicHome,
  PublicAboutUs,
  PaginationMeta,
} from "@/types/public-api";

const slug = getOrganizationSlug();

export const queryKeys = {
  config: ["public-config", slug] as const,
  home: (locale: string) => ["public-home", slug, locale] as const,
  divisions: ["public-divisions", slug] as const,
  team: (teamId: string) => ["public-team", slug, teamId] as const,
  seasons: ["public-seasons", slug] as const,
  schedule: (seasonId?: string, divisionId?: string, status?: string, page?: number) =>
    ["public-schedule", slug, seasonId, divisionId, status, page] as const,
  standings: (seasonId?: string, divisionId?: string) =>
    ["public-standings", slug, seasonId, divisionId] as const,
  topScorers: (seasonId?: string, divisionId?: string) =>
    ["public-top-scorers", slug, seasonId, divisionId] as const,
  topScorersPage: (seasonId?: string, divisionId?: string, page?: number) =>
    ["public-top-scorers-page", slug, seasonId, divisionId, page] as const,
  news: (locale: string, page?: number) => ["public-news", slug, locale, page] as const,
  highlights: (locale: string, page?: number) => ["public-highlights", slug, locale, page] as const,
  sponsors: (locale: string) => ["public-sponsors", slug, locale] as const,
  about: (locale: string) => ["public-about", slug, locale] as const,
};

export function usePublicConfig() {
  return useQuery({
    queryKey: queryKeys.config,
    queryFn: () => fetchPublicApi<PublicConfigRaw>("/config"),
    select: normalizePublicConfig,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function usePublicHome(locale: string) {
  return useQuery({
    queryKey: queryKeys.home(locale),
    queryFn: () =>
      fetchPublicApi<PublicHome>("/home", {
        params: { locale },
      }),
    select: (data) => {
      const result = { ...data };
      if (data.topScorers && Array.isArray(data.topScorers)) {
        result.topScorers = (data.topScorers as unknown as PublicTopScorerRaw[]).map(
          normalizeTopScorer,
        );
      }
      if (data.sponsors && Array.isArray(data.sponsors)) {
        result.sponsors = (
          data.sponsors as unknown as Parameters<typeof normalizeSponsor>[0][]
        ).map(normalizeSponsor);
      }
      return result;
    },
    staleTime: 2 * 60 * 1000,
    enabled: !!locale,
  });
}

export function usePublicDivisions() {
  return useQuery({
    queryKey: queryKeys.divisions,
    queryFn: () => fetchPublicApi<PublicDivision[]>("/divisions"),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicTeam(teamId: string) {
  return useQuery({
    queryKey: queryKeys.team(teamId),
    queryFn: () => fetchPublicApi<PublicTeamDetailRaw>(`/teams/${teamId}`),
    select: (raw): PublicTeamDetail => ({
      id: raw.id,
      name: raw.name,
      logoUrl: raw.logoUrl,
      divisionName: raw.division?.name,
      divisionId: raw.division?.id,
      players: (raw.roster || []).map((r) => ({
        id: r.id,
        name: r.fullName,
        number: r.jerseyNumber,
        position: r.position,
        imageUrl: r.imageUrl,
      })),
      coaches: [],
      socialLinks: raw.socialLinks,
    }),
    staleTime: 5 * 60 * 1000,
    enabled: !!teamId,
    retry: 1,
  });
}

export function usePublicSeasons() {
  return useQuery({
    queryKey: queryKeys.seasons,
    queryFn: () => fetchPublicApi<PublicSeason[]>("/seasons"),
    staleTime: 10 * 60 * 1000,
  });
}

export function usePublicSchedule(
  seasonId?: string,
  divisionId?: string,
  status?: string,
  page?: number,
) {
  return useQuery({
    queryKey: queryKeys.schedule(seasonId, divisionId, status, page),
    queryFn: () =>
      fetchPublicApiWithMeta<PublicFixture[]>("/schedule", {
        params: { seasonId, divisionId, status, page: page ?? 1, limit: 50 },
      }),
    staleTime: 2 * 60 * 1000,
    enabled: !!seasonId,
    select: (envelope) => ({
      items: envelope.data ?? [],
      meta: envelope.meta,
    }),
  });
}

export function usePublicStandings(seasonId?: string, divisionId?: string) {
  return useQuery({
    queryKey: queryKeys.standings(seasonId, divisionId),
    queryFn: () =>
      fetchPublicApi<unknown>("/standings", {
        params: { seasonId, divisionId },
      }),
    staleTime: 2 * 60 * 1000,
    enabled: !!divisionId,
    select: (data): PublicStandingRow[] => {
      if (Array.isArray(data)) return data as PublicStandingRow[];
      if (data && typeof data === "object") {
        const obj = data as Record<string, unknown>;
        if (Array.isArray(obj.rows)) return obj.rows as PublicStandingRow[];
        if (Array.isArray(obj.data)) return obj.data as PublicStandingRow[];
        if (Array.isArray(obj.standings)) return obj.standings as PublicStandingRow[];
      }
      return [];
    },
  });
}

export function usePublicTopScorers(seasonId?: string, divisionId?: string) {
  return useQuery({
    queryKey: queryKeys.topScorers(seasonId, divisionId),
    queryFn: () =>
      fetchPublicApi<PublicTopScorerRaw[]>("/top-scorers", {
        params: { seasonId, divisionId, limit: 20 },
      }),
    select: (raw) => raw.map(normalizeTopScorer),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePublicTopScorersPaginated(page: number, seasonId?: string, divisionId?: string) {
  return useQuery({
    queryKey: queryKeys.topScorersPage(seasonId, divisionId, page),
    queryFn: () =>
      fetchPublicApiWithMeta<PublicTopScorerRaw[]>("/top-scorers", {
        params: { seasonId, divisionId, page, limit: 50 },
      }),
    select: (raw) => ({
      items: raw.data.map(normalizeTopScorer),
      meta: raw.meta,
    }),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePublicNews(locale: string, page?: number) {
  return useQuery({
    queryKey: queryKeys.news(locale, page),
    queryFn: () =>
      fetchPublicApiWithMeta<PublicContentItem[]>("/news", {
        params: { locale, page: page ?? 1, limit: 20 },
      }),
    staleTime: 2 * 60 * 1000,
    enabled: !!locale,
    select: (envelope) => ({
      items: envelope.data ?? [],
      meta: envelope.meta,
    }),
  });
}

export function usePublicHighlights(locale: string, page?: number) {
  return useQuery({
    queryKey: queryKeys.highlights(locale, page),
    queryFn: () =>
      fetchPublicApiWithMeta<PublicContentItem[]>("/highlights", {
        params: { locale, page: page ?? 1, limit: 20 },
      }),
    staleTime: 2 * 60 * 1000,
    enabled: !!locale,
    select: (envelope) => ({
      items: envelope.data ?? [],
      meta: envelope.meta,
    }),
  });
}

export function usePublicNewsItem(slug: string, locale: string) {
  return useQuery({
    queryKey: queryKeys.news(locale),
    queryFn: () =>
      fetchPublicApiWithMeta<PublicContentItem[]>("/news", {
        params: { locale, limit: 50 },
      }),
    staleTime: 2 * 60 * 1000,
    enabled: !!locale && !!slug,
    select: (data) => data?.items?.find((item) => item.slug === slug) ?? null,
  });
}

export function usePublicHighlightsItem(slug: string, locale: string) {
  return useQuery({
    queryKey: queryKeys.highlights(locale),
    queryFn: () =>
      fetchPublicApiWithMeta<PublicContentItem[]>("/highlights", {
        params: { locale, limit: 50 },
      }),
    staleTime: 2 * 60 * 1000,
    enabled: !!locale && !!slug,
    select: (data) => data?.items?.find((item) => item.slug === slug) ?? null,
  });
}

export function usePublicSponsors(locale: string) {
  return useQuery({
    queryKey: queryKeys.sponsors(locale),
    queryFn: () =>
      fetchPublicApi<Parameters<typeof normalizeSponsor>[0][]>("/sponsors", {
        params: { locale, limit: 20 },
      }),
    select: (data) => data.map(normalizeSponsor),
    staleTime: 5 * 60 * 1000,
    enabled: !!locale,
  });
}

export function usePublicAbout(locale: string) {
  return useQuery({
    queryKey: queryKeys.about(locale),
    queryFn: () =>
      fetchPublicApi<PublicAboutUs>("/about-us", {
        params: { locale },
      }),
    staleTime: 10 * 60 * 1000,
    enabled: !!locale,
  });
}

export type CreateInquiryBody = {
  teamName?: string;
  city?: string;
  divisionInterestId?: string | null;
  contactName?: string;
  contactRole?: string;
  contactEmail?: string;
  contactPhone?: string;
  aboutTeam?: string;
};

export type CreateInquiryResponse = {
  id: string;
  status: string;
  submittedAt: string;
};

export function useCreateInquiry() {
  return useMutation({
    mutationFn: (body: CreateInquiryBody) =>
      postPublicApi<CreateInquiryResponse>("/inquiries", body),
  });
}
