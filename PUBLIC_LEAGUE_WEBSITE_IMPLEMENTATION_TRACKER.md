# Public League Website Implementation Tracker

> Steps use checkbox syntax for tracking. Complete one module fully before starting the next module.

**Strategy:** Public-API-first website delivery using the existing `public_web` surface.
**Current backend state:** Public website hostname bootstrap, public surface config, public home data, divisions, seasons, team profiles, schedule/results, standings, top scorers, news, highlights, sponsors, About Us, public admin branding, dynamic public website CORS, LigaD1 seed content, and League Admin CMS routes already exist. The website should reuse those contracts instead of adding a parallel website API namespace.
**Scope:** This tracker covers base runtime config, public website data wiring, CMS/admin content readiness, the public website frontend, seed data, late-stage white-labelling polish, QA, and handoff documentation. It does not include a new `/website/*` API architecture, fan accounts, push notifications, reminders, real media uploads, analytics, or app-store workflows.
**Rule:** Default to existing public APIs with `surface=public_web`. Add a new backend endpoint only when the public website has a concrete need that current APIs cannot satisfy.

---

## API Architecture Decision

Do not create separate website APIs by default. Public browsing should use the existing organization-scoped public routes:

```text
GET /api/v1/public/website-bootstrap?hostname=:hostname
```

The website bootstrap route resolves default league subdomains and custom domains through active `public_website` `portal_domains` records, then returns the organization slug and published `public_web` config. The frontend should call this route first using `window.location.hostname`, then call the organization-scoped routes below.

```text
GET /api/v1/public/organizations/:organizationSlug/config?surface=public_web
GET /api/v1/public/organizations/:organizationSlug/home?surface=public_web
GET /api/v1/public/organizations/:organizationSlug/divisions
GET /api/v1/public/organizations/:organizationSlug/seasons
GET /api/v1/public/organizations/:organizationSlug/teams/:teamId
GET /api/v1/public/organizations/:organizationSlug/schedule
GET /api/v1/public/organizations/:organizationSlug/standings
GET /api/v1/public/organizations/:organizationSlug/top-scorers
GET /api/v1/public/organizations/:organizationSlug/news?surface=public_web
GET /api/v1/public/organizations/:organizationSlug/news/:slug?surface=public_web
GET /api/v1/public/organizations/:organizationSlug/highlights?surface=public_web
GET /api/v1/public/organizations/:organizationSlug/highlights/:slug?surface=public_web
GET /api/v1/public/organizations/:organizationSlug/sponsors?surface=public_web
GET /api/v1/public/organizations/:organizationSlug/about-us?surface=public_web
```

League Admin config/content management should use the existing routes:

```text
GET/PATCH /api/v1/league-admin/public-config/public_web
GET/PATCH /api/v1/league-admin/website-domain
GET/POST/PATCH /api/v1/league-admin/news
GET/POST/PATCH /api/v1/league-admin/highlights
GET/POST/PATCH /api/v1/league-admin/sponsors
GET/POST/PATCH /api/v1/league-admin/about-us
```

`public_web.status = published` is the website-enabled flag. The website-domain endpoint returns the derived temporary hostname and stores one custom domain for later DNS verification; it does not make custom domains live in v1.

Known likely gap:

- Public New Team Membership submission probably needs a small unauthenticated public `POST` route that reuses `squad_inquiries`. Current inquiry creation is League Admin-authenticated.
- Do not add schema for this unless implementation inspection proves the existing inquiry table cannot store the public form.

## Test Plan

- Run `npm test` before starting and after every backend change.
- DB-backed integration tests use `TEST_DATABASE_URL`; tests may skip locally when no test database is configured.
- Public API tests must cover `surface=public_web`, published-only content, disabled/deleted organization handling, locale fallback, tenant isolation, pagination, filters, and public-safe fields.
- Public inquiry submission tests must cover validation, active organization resolution, optional division interest scoping, audit metadata, spam/rate-limit behavior if added, and no auth requirement.
- Frontend QA must cover desktop/mobile navigation, loading states, empty states, error states, form success/failure, language behavior, image fallback behavior, and public website CORS/domain behavior.

## Assumptions

- LigaD1 is the first configured public website instance.
- Website browsing uses hostname bootstrap first, then organization slug routes after the league is resolved.
- Default league subdomains are generated as `{slug}.{PUBLIC_WEBSITE_DOMAIN_SUFFIX}`.
- `public_web` config is separate from `fan_app` config, but both can share CMS content modules.
- The website should use `public_web` config early for runtime behavior, then handle advanced white-labelling and branding polish after the core pages work.
- Current direct URL media fields are acceptable until the future media library/upload flow exists.
- Public rosters, coaches, scorers, fixtures, and standings use existing league operations data and must not expose private contacts, payment state, invite tokens, audit internals, or admin-only fields.

---

## Module Sequence

### Module 0: Branch, Baseline, And Tracker Creation

- [x] Run `git status` and confirm the working tree is clean.
- [x] Run `git pull --ff-only`.
- [x] Stay on the current feature branch unless the user asks for a separate branch.
- [x] Run baseline `npm test`.
- [x] Create `PUBLIC_LEAGUE_WEBSITE_IMPLEMENTATION_TRACKER.md`.
- [x] Commit tracker as `docs(public-web): add implementation tracker`.

### Module 1: Bootstrap And Base Runtime Config

- [ ] Confirm `public_web` config is the source for league resolution, website enabled status, navigation defaults, default locale, supported locales, active season, default division, and feature settings.
- [ ] Add `GET /api/v1/public/website-bootstrap?hostname=:hostname`.
- [ ] Resolve active `public_website` domains to organization slug and published `public_web` config.
- [ ] Generate default public website domains for new leagues using `PUBLIC_WEBSITE_DOMAIN_SUFFIX`.
- [ ] Add League Admin website domain settings for temporary hostname display and custom domain storage.
- [ ] Use `/api/v1/league-admin/public-config/public_web` for League Admin config reads/writes.
- [ ] Use `/api/v1/public/organizations/:organizationSlug/config?surface=public_web` after hostname bootstrap when the frontend needs to refresh config by slug.
- [ ] Use `/api/v1/public/organizations/:organizationSlug/home?surface=public_web` for home-page startup data.
- [ ] Verify public config is returned only for active organizations with published `public_web` config.
- [ ] Add or extend tests only if current coverage misses `public_web` config behavior.
- [ ] Commit as `test(public-web): verify website config surface` if code/test changes are needed.

### Module 2: Homepage And Navigation Data

- [ ] Wire the public homepage to existing config and home endpoints.
- [ ] Show league identity, hero content, score ticker/recent results, division preview, top scorers, latest news, highlights, sponsors, and footer data from public APIs.
- [ ] Keep navigation fixed to documented public modules: Home, Divisions, Schedule, Standing, News, Highlights, About Us, and Register/New Team Membership.
- [ ] Use existing content and competition endpoints instead of adding website-specific aggregate endpoints unless measured frontend needs prove otherwise.
- [ ] Add frontend loading, empty, and error states for missing or unpublished content.
- [ ] Verify mobile app prompt is configurable and hidden when no app destination exists.

### Module 3: Divisions And Team Profile Pages

- [ ] Use `/divisions` to render active divisions and teams grouped by division.
- [ ] Use `/teams/:teamId` for public team profile detail.
- [ ] Display team identity, logo, division, venue/location where available, public players, and public coaches.
- [ ] Keep team profiles read-only.
- [ ] Do not add public edit/contact/follow/share workflows unless product explicitly asks.
- [ ] Add frontend coverage for empty divisions, teams without logos, teams without roster data, and invalid team IDs.

### Module 4: Schedule, Results, Standings, And Top Scorers

- [ ] Use `/seasons` for season selector options.
- [ ] Use `/schedule` for fixtures and completed results with existing `seasonId`, `divisionId`, `status`, date range, team, page, and limit filters.
- [ ] Use `/standings` for division standings.
- [ ] Use `/top-scorers` for homepage and leaderboard displays.
- [ ] Keep standings/stat labels aligned with backend response fields instead of hardcoding prototype abbreviations when they differ.
- [ ] Do not add match detail, ticketing, venue maps, calendar export, form tables, or tie-breaker UI until product confirms them.

### Module 5: News, Highlights, Sponsors, And About Us

- [ ] Use existing public content routes with `surface=public_web`.
- [ ] Support News and Highlights lists plus slug detail pages where the backend route exists.
- [ ] Render Sponsors as list-only cards using title, summary, image/logo URL, metadata, CTA label, CTA URL, and sort order.
- [ ] Render About Us from the first published About Us item for requested locale or fallback locale.
- [ ] Keep draft/unpublished/future/expired content out of the public website.
- [ ] Add frontend empty states for each content module.

### Module 6: New Team Membership Inquiry Submission

- [ ] Confirm the public website needs real persistence for New Team Membership in this phase.
- [ ] If persistence is required, add the smallest unauthenticated public `POST` route under `/api/v1/public/organizations/:organizationSlug`.
- [ ] Reuse `squad_inquiries` and the existing inquiry create service behavior where possible.
- [ ] Validate team name, city, contact name, email, phone, optional role, optional division interest, and optional team background.
- [ ] Scope division interest to the active public organization.
- [ ] Record audit history with public actor metadata and no authenticated `actorUserId`.
- [ ] Avoid new schema, payment, file upload, confirmation email, or admin workflow changes unless explicitly approved.
- [ ] Add DB-backed tests for validation, successful submission, tenant scoping, disabled organization rejection, and League Admin visibility.

### Module 7: Frontend Website Wiring And Responsive QA

- [ ] Build the public website as the first screen experience, not a marketing placeholder.
- [ ] Match the existing public website PRD modules and reuse visual assets from configured URLs or safe fallbacks.
- [ ] Verify desktop and mobile layouts for Home, Divisions, Team Profile, Schedule, Standing, News, Highlights, About Us, and New Team Membership.
- [ ] Ensure text does not overlap or overflow buttons, cards, navigation, tables, or mobile forms.
- [ ] Keep public pages unauthenticated except the League Admin CMS used to manage their data.
- [ ] Run browser QA against local API responses and at least one empty-state league if available.

### Module 8: LigaD1 Seed And Content Readiness

- [ ] Verify LigaD1 has published `public_web` config with locale, active season, default division, and base runtime settings.
- [ ] Verify LigaD1 has enough divisions, teams, fixtures/results, standings, top scorers, news, highlights, sponsors, and About Us content for the website.
- [ ] Keep seed media URLs public placeholders only; never add credentials, signed URLs, or environment-specific secrets.
- [ ] Add seed coverage only where current tests do not already prove public website readiness.
- [ ] Confirm `public_web` and `fan_app` can share content without hardcoding one surface into the frontend.

### Module 9: White-Labelling, Branding Polish, And Domain Readiness

- [ ] Verify league logo, league name, theme colors, hero media, public contact details, footer copy, and social links come from `public_web` config or CMS content.
- [ ] Verify powered-by Clubucket attribution follows the configured white-label or plan setting.
- [ ] Verify default subdomain behavior works before treating custom domains as launch-ready.
- [ ] Confirm custom domain storage, admin display, DNS verification expectations, and public website CORS behavior are documented for the launch path.
- [ ] Apply per-league visual polish only after Home, Divisions, Schedule, Standing, News, Highlights, About Us, and New Team Membership are wired to real data.
- [ ] Do not block core public page delivery on advanced white-label polish.

### Module 10: Final Regression, Handoff, And Launch Checklist

- [ ] Run full `npm test`.
- [ ] Run Prisma validation/generate only if schema or Prisma client behavior changed.
- [ ] Manually inspect public website API responses for safe field shape and direct URL shape.
- [ ] Document website API base URL, required calls, query parameters, fallback behavior, and manual per-league setup steps.
- [ ] Confirm public website CORS works for configured `public_website` domains and localhost.
- [ ] Confirm no duplicate `/website/*` API namespace was added.
- [ ] Commit final implementation/test/docs work in logical commits.
