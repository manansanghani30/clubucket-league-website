## Goal
Rename and redesign the "Our Competitions" section on the home page so it scales to any number of divisions, not just two.

## Changes

### 1. Rename section
In `src/routes/index.tsx`, change the heading from:
- "OUR COMPETITIONS" → "OUR DIVISIONS"

### 2. Redesign the divisions display
Replace the current pill/rounded-row layout (two big horizontal bars) with a responsive **card grid** that gracefully handles 2, 3, 4, or more divisions.

Each division card will show:
- Division name (large, bold, uppercase)
- A small "LIGAD1" badge/monogram in the corner
- Number of teams in that division (computed from `teams` data, e.g. "7 Clubs")
- A short label like "View standings →" as the call-to-action
- Subtle hover lift + red accent bar on hover (matches existing red/navy palette)

Layout:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (so 2 divisions look balanced, 3 fill the row, 4+ wrap naturally)

Cards link to `/divisions` (same destination as today).

### 3. Keep styling consistent
- Keep the navy `#001D4C` section background
- White cards with red `#ED2D23` accents
- Same typography scale as other home sections

## Files touched
- `src/routes/index.tsx` — section heading + new card grid markup

## Out of scope
- No data model changes (divisions still come from `src/data/league.ts`)
- No changes to the `/divisions` page itself
- No new routes
