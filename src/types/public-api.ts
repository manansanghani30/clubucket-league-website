export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
  message?: string;
};

export type PaginationMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

export type PublicConfig = {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  faviconUrl?: string;
  defaultLocale: string;
  supportedLocales: string[];
  enabledModules: string[];
  activeSeasonId?: string;
  defaultDivisionId?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  settings?: Record<string, string>;
  theme?: Record<string, string>;
};

export type PublicDivision = {
  id: string;
  name: string;
  order?: number;
  teams?: PublicTeamSummary[];
};

export type PublicTeamSummary = {
  id: string;
  name: string;
  initials?: string;
  logoUrl?: string;
  divisionId?: string;
  divisionName?: string;
};

export type PublicRosterEntry = {
  id: string;
  playerId: string;
  publicCode: string;
  fullName: string;
  imageUrl?: string;
  jerseyNumber?: number;
  position?: string;
  status?: string;
};

export type PublicTeamDetailRaw = {
  id: string;
  name: string;
  slug?: string;
  shortCode?: string;
  logoUrl?: string;
  location?: string;
  division: { id: string; name: string; sortOrder?: number };
  homeVenue?: PublicVenueInfo;
  status?: string;
  roster: PublicRosterEntry[];
  socialLinks?: Record<string, string>;
};

export type PublicTeamDetail = {
  id: string;
  name: string;
  initials?: string;
  logoUrl?: string;
  divisionId?: string;
  divisionName?: string;
  players?: PublicPlayer[];
  coaches?: PublicCoach[];
  socialLinks?: Record<string, string>;
};

export type PublicPlayer = {
  id: string;
  name: string;
  number?: number;
  position?: string;
  nationality?: string;
  imageUrl?: string;
};

export type PublicCoach = {
  id: string;
  name: string;
  role?: string;
  nationality?: string;
  imageUrl?: string;
};

export type PublicSeason = {
  id: string;
  name: string;
  isActive?: boolean;
  isCurrent?: boolean;
  startDate?: string;
  endDate?: string;
};

export type PublicVenueInfo = {
  id: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
};

export type PublicFixtureTeam = {
  id: string;
  name: string;
  shortCode?: string;
  logoUrl?: string;
  slug?: string;
  location?: string;
};

export type PublicFixtureResult = {
  homeScore: number;
  awayScore: number;
};

export type PublicFixture = {
  id: string;
  round?: number;
  roundName?: string;
  matchDate: string;
  kickoffTime?: string;
  season: { id: string; name: string; status: string };
  division: { id: string; name: string; sortOrder: number };
  homeTeam: PublicFixtureTeam;
  awayTeam: PublicFixtureTeam;
  venue: PublicVenueInfo;
  status: "scheduled" | "completed" | "postponed" | "cancelled";
  result: PublicFixtureResult | null;
};

export type PublicStandingTeam = {
  id: string;
  name: string;
  shortCode?: string;
  logoUrl?: string;
  slug?: string;
};

export type PublicStandingRow = {
  id: string;
  rank: number;
  team: PublicStandingTeam;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export type PublicTopScorer = {
  playerId: string;
  playerName: string;
  teamId?: string;
  teamName?: string;
  teamInitials?: string;
  goals: number;
  position?: string;
  imageUrl?: string;
  rank: number;
};

export type PublicTopScorerRaw = {
  rank: number;
  playerId: string;
  player: {
    id: string;
    fullName: string;
    publicCode: string;
    imageUrl?: string;
    status: string;
  };
  teamId?: string;
  team: {
    id: string;
    name: string;
    slug: string;
    shortCode: string;
    logoUrl?: string;
    location?: string;
    status: string;
  };
  goals: number;
};

export type PublicContentItem = {
  id: string;
  title: string;
  slug?: string;
  category?: string;
  tags?: string[];
  date?: string;
  summary?: string;
  body?: string;
  bodySections?: { title?: string; body: string; order?: number }[];
  featuredImageUrl?: string;
  thumbnailUrl?: string;
  mediaUrl?: string;
  ctaUrl?: string;
  ctaText?: string;
  author?: string;
};

export type PublicSponsor = {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  order?: number;
};

export type PublicHome = {
  heroSlides?: {
    imageUrl?: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
  }[];
  aboutContent?: {
    title?: string;
    body?: string;
    imageUrl?: string;
  };
  divisions?: PublicDivision[];
  recentResults?: PublicFixture[];
  topScorers?: PublicTopScorer[];
  latestNews?: PublicContentItem[];
  highlights?: PublicContentItem[];
  sponsors?: PublicSponsor[];
};

export type PublicAboutUs = {
  title?: string;
  summary?: string;
  bodySections?: { title?: string; body: string }[];
  imageUrl?: string;
};
