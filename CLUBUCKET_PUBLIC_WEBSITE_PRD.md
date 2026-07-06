# Product Requirements Document
## Clubucket Public League Website

**Document Version:** 1.0
**Date:** June 6, 2026
**Product Stage:** Frontend-only Lovable prototype
**Source Explored:** https://website.sportsfirst.net/
**Sample League:** LigaD1

**June 24, 2026 Backend Alignment:** Public website implementation remains later scope, but backend config now prepares a `public_web` surface. The website should share the simplified public content modules with the fan app: News, Highlights, Sponsors, and About Us. Website-specific theme/navigation config should stay separate from fan app config.

---

## 1. Product Overview

### 1.1 Platform Purpose

The Clubucket Public League Website appears to be a white-labeled public website for a sports league. The explored prototype uses LigaD1 as the sample league and presents a fan-facing experience with league branding, division information, team profiles, fixtures, results, standings, news, highlights, sponsors, and a team registration request form.

The website is designed to help each league present its own public identity while using Clubucket as the underlying platform. The site communicates league activity to fans, players, teams, sponsors, and prospective member clubs.

The current product is a frontend-only demo. It shows proposed product behavior, public content structure, forms, navigation, and league-specific content. It does not confirm real backend APIs, persistent submissions, content management, authentication, localization, email delivery, mobile app installation, analytics, or live sports data integrations.

### 1.2 Main Capabilities Shown

| Capability | What The UI Shows |
|---|---|
| League-branded public homepage | LigaD1 logo, colors, hero carousel, league story, score ticker, divisions, top scorers, latest news, highlights, sponsors, and footer |
| Public navigation | Header and footer links for Home, Divisions, Schedule, Standing, News, Highlights, and About Us |
| Team registration interest | Register dropdown leading to a New Team Membership form |
| League divisions | Public division page with Bajio Zone and Downtown Area team cards |
| Team profiles | Team detail pages with squad players and coaching staff |
| Fixtures and results | Schedule page with Fixtures and Results tabs, division filter, season selector, round groupings, match cards, scores, status, and venue |
| Standings | Division standings table with team rank, played matches, losses, goals for, goals against, goal difference, and points |
| News and highlights | Public content lists for league news, player spotlight, fixture news, club news, match highlights, top goals, player of the week, and best saves |
| Public league story | About page with league overview, mission, vision, and values |
| White-label branding | League logo, league name, league colors, sponsor logos, contact details, domain identity, language toggle, and Clubucket powered-by footer |

### 1.3 Target Users

| User Type | Description |
|---|---|
| Public Visitor / Fan | Browses league content, teams, fixtures, results, standings, news, and highlights. |
| Player | Uses public website content to view team rosters, fixtures, standings, and league visibility. No player login is shown on this site. |
| Coach | Appears on team profile pages as public staff information. No coach login is shown on this site. |
| Prospective Team or Club Representative | Uses the New Team Membership form to request joining the league. |
| Team Admin | Implied as a future/internal user who may manage team information, roster details, or registration requests in another portal. |
| League Admin | Implied as the league operator responsible for league branding, divisions, schedule, standings, public content, sponsors, and registrations. |
| Organization Content Manager | Implied by existing Clubucket role design as a content owner for news, highlights, website copy, and media. |
| Super Admin / Platform Owner | Implied as the Clubucket operator who manages league setup, domains, branding capabilities, and white-label availability. |

---

## 2. White-Label And League-Personalized Content

### 2.1 White-Label Purpose

The website should support multiple leagues using the same Clubucket public website structure while showing each league's own identity, content, teams, fixtures, and public messaging.

LigaD1 should be treated as the sample white-label tenant, not hardcoded product identity.

### 2.2 League-Personalized Content Areas

| Area | LigaD1 Example Shown | White-Label Requirement |
|---|---|---|
| Logo | LigaD1 logo in header and footer | Each league should upload and display its own logo. |
| League name | LigaD1 | Each league should control league name across title, metadata, copy, and footer. |
| Tagline / hero message | The Heart of Mexican Soccer | Each league should define its own headline and supporting message. |
| Colors | Dark blue and red | Each league should define primary and secondary colors. |
| Domain | website.sportsfirst.net / ligad1.com shown in footer | Each league should support a public website domain or subdomain. |
| Divisions | Bajio Zone, Downtown Area | Divisions should come from the league's own competition structure. |
| Teams | 14 public team cards | Teams should reflect the league's registered teams. |
| Fixtures/results | Round 5 upcoming fixture and completed results | Match data should be league and season specific. |
| Standings | Division standings tables | Standings should be generated from the league's competition data. |
| News | League news, player spotlight, fixture news, club news | News categories and articles should be league-managed. |
| Highlights | Match highlights, top goals, best saves | Highlight content should support league-uploaded media and external links. |
| Sponsors | Century Sports and Go Media | Each league should manage sponsor logos and display order. |
| Contact details | leonel@ligad1.com, ligad1.com, info@ligad1.com | Each league should manage public contact email, website, and form routing. |
| Language | EN and ES toggle | Each league should decide supported languages and provide translated content. |
| Clubucket attribution | Powered by Clubucket | Platform should support controlled powered-by branding based on plan or settings. |

### 2.3 Suggested White-Label Controls

| Control | Business Purpose |
|---|---|
| Website status | Let leagues keep the website in draft before publishing. |
| Public registration setting | Let leagues enable or disable public team registration requests. |
| Branding settings | Let leagues manage logo, colors, hero images, and theme values. |
| Domain settings | Let Clubucket or Super Admin users connect the correct public website domain. |
| Sponsor management | Let league staff add, reorder, hide, and remove sponsors. |
| Content publishing | Let authorized staff draft, preview, publish, and archive news/highlights. |
| Language management | Let leagues provide content in supported languages rather than only switching a UI label. |

---

## 3. Navigation Structure

### 3.1 Header Navigation

The public site uses a fixed header with the league logo, primary navigation, language toggle, and registration entry point.

| Header Item | Behavior Shown |
|---|---|
| League logo | Links to Home. |
| Home | Opens the public homepage. |
| Divisions | Opens the divisions page with team cards grouped by division. |
| Schedule | Opens the fixtures/results page. |
| Standing | Opens the standings page. |
| News | Opens the news listing page. |
| Highlights | Opens the highlights listing page. |
| About Us | Opens the league story page. |
| EN / ES | Toggles visual active language state. No confirmed translation behavior is visible. |
| Register | Opens a dropdown with New Team Membership. |

### 3.2 Footer Navigation

The footer repeats key league identity and navigation elements.

| Footer Area | Visible Content |
|---|---|
| Brand | LigaD1 logo and "Liga Nacional de Futbol de Mexico" text |
| Social icons | Instagram, Twitter/X, YouTube, and Facebook icons |
| Quick Links | Home, Divisions, Schedule, Standing, News |
| Contact | leonel@ligad1.com and ligad1.com |
| Language label | EN / ES |
| Legal line | Copyright 2026 LigaD1 |
| Platform attribution | Powered by Clubucket |

### 3.3 Main Navigation Relationships

| Flow | Relationship |
|---|---|
| Home to Schedule | Hero CTA opens Schedule. |
| Home to Divisions | Division cards link to the Divisions page. |
| Home to News | Latest News section links to News. |
| Home to Highlights | Highlights section links to Highlights. |
| Divisions to Team Profile | Team cards link to individual team profile pages. |
| Team Profile to Divisions | Team profile page includes a back link to Divisions. |
| Register to New Team Membership | Header dropdown links to the registration request form. |

---

## 4. Module-Wise Breakdown

## 4.1 Home

**Purpose:** Present the league brand, current activity, featured content, and key public entry points.

### What Users Can View

| Home Area | Visible Information |
|---|---|
| Hero carousel | Large soccer imagery, headline "The Heart of Mexican Soccer", LigaD1 subtext, and View Schedule CTA |
| Carousel controls | Left/right arrows and slide indicator dots |
| Score ticker | Recent match scores with team initials |
| About preview | League summary and community positioning |
| Divisions preview | Bajio Zone and Downtown Area cards |
| Top scorers | Player cards with initials, goal totals, team, and position |
| Latest news | Three featured news cards |
| Highlights | Three featured highlight cards |
| Sponsors | Sponsor logos |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| View Schedule | Navigates to Schedule. |
| Learn more | Appears in About preview; no separate destination is visible in the static output. |
| View Standings on division cards | Links to Divisions rather than directly to standings. |
| Scroll top scorers | Left/right controls are visible for the horizontal scorer list. |
| View All News | Navigates to News. |
| View All Highlights | Navigates to Highlights. |

### Top Scorers Shown

| Player | Team | Position | Goals |
|---|---|---|---:|
| Arnold J. Mendez | Inter City FC | Forward | 19 |
| Mateja Bozic | FC Bartlesville Buffaloes | Forward | 18 |
| Finley W. Mitchell | AC Raleigh | Forward | 15 |
| Saber Charif | Nomads SC | Forward | 14 |
| Tom Marriott | SCU Heat | Midfield | 13 |
| Abubaker Mayanja | Tar Devils SC | Forward | 13 |
| Sebastian Ruiz | NY Renegades FC | Midfield | 13 |

### Product Observations

- Home content mixes league story, match data, rankings, content, sponsors, and conversion to registration.
- The page is strongest as a public marketing and engagement dashboard rather than an admin dashboard.
- Some top scorer teams do not appear in the visible LigaD1 division lists, which may be mock data or reused demo content.

---

## 4.2 Divisions

**Purpose:** Let visitors browse league teams grouped by division.

### What Users Can View

The Divisions page displays team cards under two divisions:

| Division | Teams Shown |
|---|---|
| Bajio Zone | Sports Club F, Project Talents, Cheran Owls, Comonfort Academy, Independent Club V, PL Jerez FC, Furniture Makers FC |
| Downtown Area | Barracudas CL, FC Mixquiahuala, Dragones Metepec FC, Tecos Temascalapa, FC Galeones Acapulco, Tuzos Altiplano FC, Acapulco Resilience |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Select team card | Opens the public team profile page for that team. |
| View team initials | Each card shows a short team code/initials. |

### Product Observations

- Divisions behave as public discovery pages.
- No search, sorting, filters, or division tabs are visible beyond the section grouping.
- Team cards are repeated in the static render, likely because of animation or layout duplication.

---

## 4.3 Team Profile

**Purpose:** Provide a public profile for each registered team, including players and coaches.

### What Users Can View

| Team Profile Area | Visible Information |
|---|---|
| Breadcrumb | Divisions > Division name > Team name |
| Team identity | Team initials and team name |
| Squad | Player cards with number, name, team, and position |
| Coaches | Coaching staff cards with initials, name, team, and staff role |
| Back navigation | Link back to Divisions |

### Squad Information Shown

The team profile uses a repeated sample squad structure for explored teams.

| Player | Number | Position |
|---|---:|---|
| Rodrigo Alvarez | 1 | Goalkeeper |
| Carlos Mendez | 5 | Defender |
| Javier Soto | 4 | Defender |
| Rafael Cruz | 3 | Defender |
| Eduardo Flores | 2 | Defender |
| Oscar Lima | 8 | Midfield |
| Diego Herrera | 6 | Midfield |
| Andres Vega | 11 | Midfield |
| Pablo Torres | 7 | Midfield |
| Fernando Ruiz | 9 | Forward |
| Marcos Ibanez | 10 | Forward |

### Coaching Staff Shown

| Coach | Role |
|---|---|
| Miguel Hernandez | Head Coach |
| Luis Ramirez | Assistant |
| Sergio Perez | GK Coach |
| Andrea Castillo | Fitness |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Back to Divisions | Returns to the division listing. |
| View roster | Roster is public and read-only. |
| View coaches | Coaching staff is public and read-only. |

### Product Observations

- The public team profile does not show club address, social links, full player stats, fixtures, results, photos, or sponsor details.
- Team profiles are informational only. No edit, contact, follow, or share actions are visible.
- Player and coach data appears duplicated across teams, which should be treated as demo data until real data sources are connected.

---

## 4.4 Schedule

**Purpose:** Show league fixtures and completed results in a public match schedule.

### What Users Can View

| Schedule Area | Visible Information |
|---|---|
| Tabs | Fixtures and Results |
| Division filter | All Divisions, Bajio Zone, Downtown Area |
| Season selector | Spring 2026 |
| Round groups | Fixtures/results grouped by round and date range |
| Match cards | Date, time, home team, away team, score or "vs", status, and venue |

### Fixture Data Shown

| Round | Date | Match | Status | Venue |
|---|---|---|---|---|
| Round 5 | 23 May, 18:00 | FC Mixquiahuala vs Barracudas CL | Upcoming | Estadio Mixquiahuala, Hidalgo |

### Result Data Shown

| Round | Date | Result | Venue |
|---|---|---|---|
| Round 4 | 15 May | Barracudas CL 0-2 FC Mixquiahuala | Estadio Barracudas, Celaya |
| Round 4 | 16 May | FC Galeones Acapulco 2-0 Dragones Metepec FC | Estadio Galeones, Acapulco |
| Round 3 | 8 May | FC Mixquiahuala 4-0 Barracudas CL | Estadio Mixquiahuala, Hidalgo |
| Round 3 | 10 May | Acapulco Resilience 1-1 FC Galeones Acapulco | Estadio Resilience, Acapulco |
| Round 2 | 1 May | Tecos Temascalapa 2-0 Dragones Metepec FC | Estadio Tecos, Temascalapa |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Switch tab | User can switch between Fixtures and Results. |
| Filter by division | User can view all divisions or select Bajio Zone / Downtown Area. |
| Select season | Season dropdown is visible but only Spring 2026 is shown. |

### Product Observations

- No match detail page, ticket purchase, calendar export, team-specific schedule filter, or venue map link is visible.
- Completed results are displayed publicly but do not show scorers, cards, lineups, match report, or media.
- Dates are from May 2026 and should be treated as sample data unless connected to real schedules.

---

## 4.5 Standing

**Purpose:** Show current division rankings and performance totals.

### What Users Can View

The Standing page shows a division selector and standings table.

| UI Element | Behavior Shown |
|---|---|
| Division buttons | Bajio Zone and Downtown Area |
| Active standings table | Shows rank and team performance metrics |
| Legend | Explains P, L, F, TO, and GD |

### Bajio Zone Standings Shown

| Position | Team | Played | Lost | Goals For | Goals Against | Goal Difference | Points |
|---:|---|---:|---:|---:|---:|---:|---:|
| 1 | PL Jerez FC | 10 | 2 | 34 | 12 | +22 | 24 |
| 2 | Furniture Makers FC | 10 | 2 | 23 | 9 | +14 | 22 |
| 3 | Sports Club F | 10 | 4 | 26 | 22 | +4 | 18 |
| 4 | Cheran Owls | 9 | 3 | 21 | 4 | +17 | 14 |
| 5 | Project Talents | 9 | 4 | 13 | 12 | +1 | 11 |
| 6 | Independent Club V | 9 | 5 | 18 | 21 | -3 | 10 |
| 7 | Comonfort Academy | 0 | 0 | 0 | 0 | 0 | 0 |

### Downtown Area Standings Available In Data

| Position | Team | Played | Points |
|---:|---|---:|---:|
| 1 | Barracudas CL | 10 | 27 |
| 2 | Tecos Temascalapa | 11 | 17 |
| 3 | Dragones Metepec FC | 10 | 16 |
| 4 | Tuzos Altiplano FC | 10 | 13 |
| 5 | Acapulco Resilience | 10 | 12 |
| 6 | FC Galeones Acapulco | 10 | 10 |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Switch division | User can toggle between Bajio Zone and Downtown Area standings. |
| Read standings legend | User can understand table abbreviations. |

### Product Observations

- Standings appear read-only.
- The table uses abbreviated statistics and should be confirmed against league rules before production.
- No team profile link from standings is visible.
- There is no explanation of tie-breakers, wins, draws, form, home/away record, disciplinary points, or qualification status.

---

## 4.6 News

**Purpose:** Present league editorial content and updates.

### What Users Can View

| News Item | Category | Date |
|---|---|---|
| Spring 2026 Season Kicks Off with Record Attendance Across All Venues | League News | May 10, 2026 |
| Oscar Lima Named Player of the Month for April | Player Spotlight | May 5, 2026 |
| Round 5 Fixtures Confirmed - Key Clashes Ahead | Fixture News | May 17, 2026 |
| FC Mixquiahuala Extend Winning Run to Four Games in Bajio Zone | Club News | May 15, 2026 |
| LigaD1 Partners with Local Youth Academies for Player Development | League News | May 3, 2026 |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Browse article cards | User can scan category, title, date, excerpt, and image. |

### Product Observations

- News cards do not visibly open a full article detail page.
- No search, category filter, archive, author, social share, or featured story controls are visible.
- News images are present and appear to be static sample assets.

---

## 4.7 Highlights

**Purpose:** Promote match moments, goals, players, and video-oriented content.

### What Users Can View

| Highlight Item | Category | Date |
|---|---|---|
| Barracudas CL 0-2 FC Mixquiahuala - Round 4 Recap | Match Highlights | May 15, 2026 |
| Top 5 Goals of the Month - April 2026 | Top Goals | May 2, 2026 |
| Oscar Lima's Masterclass vs PL Jerez FC | Player of the Week | May 11, 2026 |
| FC Galeones 2-0 Dragones Metepec - Statement Win | Match Highlights | May 16, 2026 |
| Top Goalkeeper Saves - Round 3 & 4 | Best Saves | May 12, 2026 |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Browse highlight cards | User can scan category, title, date, excerpt, and image. |

### Product Observations

- Highlight cards do not visibly open video playback or detail pages.
- No video provider, upload, embed, duration, playlist, or share behavior is confirmed.
- The section is positioned as media/content discovery rather than a full media library in the current prototype.

---

## 4.8 About Us

**Purpose:** Explain the league's identity, mission, vision, and values.

### What Users Can View

| About Area | Visible Information |
|---|---|
| Page header | About Us and "The story behind LigaD1" |
| Who We Are | League overview and community positioning |
| Mission | Develop the next generation of Mexican soccer talent through competitive, well-organized league play |
| Vision | Become the most respected semi-professional league in Latin America, known for fair play and community impact |
| Values | Passion, discipline, community, and respect |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Read league story | Page is informational and read-only. |

### Product Observations

- The About page supports league credibility and storytelling.
- No staff profiles, governance details, rules documents, contact CTA, downloadable media kit, or history timeline are visible.

---

## 4.9 New Team Membership

**Purpose:** Let prospective teams submit interest in joining the league.

### What Users Can View

| Area | Visible Information |
|---|---|
| Page title | New Team Membership |
| Subtitle | Submit a request to join LigaD1 |
| Form intro | League will respond within 3-5 business days |
| Benefits panel | Why Join LigaD1 |
| Contact prompt | info@ligad1.com |

### What Users Can Submit

| Field | Required | Notes |
|---|---|---|
| Team Name | Yes | Text field |
| City | Yes | Text field |
| Contact Person Full Name | Yes | Text field |
| Describe your Role | No | Placeholder example: Team Manager |
| Email Address | Yes | Email field |
| Phone Number | Yes | Text field |
| Division Interest | No | Dropdown: Bajio Zone, Downtown Area, No Preference |
| Tell us about your team | No | Multi-line text area |

### Actions And Workflows

| Action | Behavior Shown |
|---|---|
| Submit Request | Prevents page reload and shows a success state in the frontend. |
| Back to Home | Appears after successful submission. |

### Success State

After submission, the UI shows:

- "Request Submitted!"
- "Thank you for your interest. Our team will review your application and reach out within 3-5 business days."
- Back to Home button

### Product Observations

- Required fields and email input type provide basic browser-level validation.
- No server-side submission, confirmation email, spam protection, file upload, payment, or admin review workflow is confirmed by the public UI.
- This form closely aligns with the League Admin Inquiry Management concept in existing documentation and should likely create a team registration inquiry for league staff review.

---

## 4.10 Mobile App Prompt

**Purpose:** Encourage mobile visitors to use the league app for live updates.

### What Users Can View

The frontend includes a mobile-only prompt that appears on small screens unless dismissed.

| Prompt Area | Visible Information |
|---|---|
| Message | "For the best live experience" |
| Supporting text | Encourages faster push notifications and live stats |
| Primary action | Get the LigaD1 App |
| Secondary action | Continue in browser |

### Product Observations

- The prompt stores dismissal locally in the browser.
- The Get App action is visible as a button, but no app store destination or installation flow is confirmed.
- This should be configurable by league because some leagues may not have a mobile app.

---

## 5. User Roles And Permissions

The public website does not show authenticated role-based screens. The following roles are visible or inferred from public content and existing Clubucket product structure.

| Role | Visible Or Implied | Likely Responsibilities |
|---|---|---|
| Public Visitor / Fan | Visible | Browse league content, schedules, standings, news, highlights, teams, sponsors, and public information. |
| Prospective Team or Club Representative | Visible | Submit a team membership request and provide contact/team information. |
| Player | Visible through rosters and top scorers | Publicly represented in rosters and statistics. May use other Clubucket portals for self-service. |
| Coach | Visible through team profile staff list | Publicly represented on team profiles. May be managed by team or league staff. |
| Team Admin | Implied | Maintains team information, roster, coaches, and possibly coordinates registration in separate portal. |
| League Admin | Implied | Manages league public website content, divisions, teams, fixtures, standings, news, highlights, sponsors, and registration inquiries. |
| Organization Content Manager | Implied from existing role model | Manages public website editorial content, media, and published pages. |
| Super Admin / Platform Owner | Implied from Clubucket platform | Enables the website module, connects domains, manages tenant branding capability, and oversees white-label configuration. |

### Permission Observations

| Area | Public Visitor | Prospective Team | League Admin / Content Manager | Super Admin |
|---|---|---|---|---|
| Browse public pages | Yes | Yes | Yes | Yes |
| Submit membership request | No, unless representing a team | Yes | View/manage submissions in admin portal, assumed | Platform access, assumed |
| Edit league content | No | No | Yes, assumed in admin/CMS | Yes, assumed |
| Manage branding/domain | No | No | Limited, assumed | Yes, assumed |
| Manage teams/fixtures/results | No | No | Yes, assumed through League Admin portal | Platform oversight, assumed |

---

## 6. Key Workflows

### 6.1 Browsing League Website

1. Visitor opens the public league website.
2. Visitor sees league-branded header, hero carousel, and featured content.
3. Visitor navigates through public pages using header or footer links.
4. Visitor can return to Home by selecting the logo or Home link.

### 6.2 Viewing Divisions And Teams

1. Visitor opens Divisions.
2. System displays teams grouped by division.
3. Visitor selects a team card.
4. System opens the team profile page.
5. Visitor reviews public squad and coach information.
6. Visitor returns to Divisions using the back link.

### 6.3 Checking Fixtures And Results

1. Visitor opens Schedule.
2. Visitor chooses Fixtures or Results.
3. Visitor optionally filters by division.
4. Visitor optionally reviews the selected season.
5. System displays match cards grouped by round.
6. Visitor reads match date, time, teams, score/status, and venue.

### 6.4 Viewing Standings

1. Visitor opens Standing.
2. Visitor selects a division.
3. System displays ranked teams and table metrics.
4. Visitor uses the legend to understand abbreviations.

### 6.5 Reading News And Highlights

1. Visitor opens News or Highlights from the header, footer, or Home section.
2. System displays cards with category, title, date, excerpt, and image.
3. Visitor scans public updates and media-focused content.

Current limitation: no article detail or video playback workflow is confirmed.

### 6.6 Submitting New Team Membership Request

1. Prospective team representative selects Register.
2. Register dropdown displays New Team Membership.
3. User opens the registration page.
4. User enters team, contact, email, phone, division interest, and background information.
5. User selects Submit Request.
6. UI shows a request-submitted confirmation.
7. User can return to Home.

Assumed future behavior: the request should be saved as a league inquiry and routed to League Admin staff for review and follow-up.

### 6.7 League White-Label Setup

This workflow is inferred from the UI and existing Clubucket docs.

1. Super Admin creates or configures a league tenant.
2. League or Super Admin configures logo, colors, contact details, public domain, and website status.
3. League Admin or Content Manager adds public content such as About copy, hero images, sponsors, news, and highlights.
4. League operations data populates divisions, teams, fixtures, results, standings, rosters, and scorer information.
5. League publishes the public website.
6. Public users browse the personalized league website.

---

## 7. Forms And Data Capture

### 7.1 Team Registration Request Form

| Data Captured | Business Purpose |
|---|---|
| Team Name | Identify the applicant team. |
| City | Understand team location and league fit. |
| Contact Person Full Name | Identify the primary applicant contact. |
| Role | Understand whether the applicant is a manager, owner, coach, or representative. |
| Email Address | Provide follow-up contact path. |
| Phone Number | Provide direct contact path. |
| Division Interest | Help route the request to the right competition division. |
| Team Background | Allow applicant to describe team history, size, experience, and readiness. |

### 7.2 Visible Validation And Behavior

| Form Behavior | Observation |
|---|---|
| Required fields | Team Name, City, Contact Person Full Name, Email Address, and Phone Number are marked required. |
| Email validation | Email input uses browser email validation behavior. |
| Division dropdown | User can select Bajio Zone, Downtown Area, or No Preference. |
| Success message | Frontend shows confirmation after submit. |
| Data persistence | Not confirmed. |
| Confirmation email | Not visible. |
| Admin review queue | Not visible on public site, but aligns with League Admin Inquiry Management concept. |

---

## 8. Dashboard And Analytics

The public website does not show an authenticated dashboard. Instead, the Home and Standing pages provide public-facing performance and engagement information.

### 8.1 Public Information Cards And Metrics

| Area | Metrics Or Information Communicated |
|---|---|
| Score ticker | Recent match results and team initials |
| Top scorers | Player goal totals, team, and position |
| Standings | Team rank, played matches, losses, goals for, goals against, goal difference, and points |
| Schedule | Upcoming fixtures, completed results, match status, and venue |
| News/highlights | Current league stories and media topics |
| Sponsors | Sponsor visibility and league commercial partnerships |

### 8.2 Suggested Future Analytics

| Analytics Area | Business Value |
|---|---|
| Page views by section | Understand which public content drives engagement. |
| Team profile views | Show teams and sponsors their visibility. |
| Fixture/result engagement | Understand fan interest by match and division. |
| Registration conversion | Track visits to registration and completed submissions. |
| News/highlight performance | Measure article and media interest. |
| Sponsor impressions | Support sponsorship reporting. |
| Language usage | Understand whether EN/ES or other translations are being used. |

---

## 9. Assumptions And Suggested Backend Functionalities

This section describes likely backend needs based on the visible UI. It should not be read as implemented functionality.

### 9.1 League Website And White-Label Management

| Suggested Capability | Purpose |
|---|---|
| League branding profile | Store logo, colors, league name, hero images, footer copy, and attribution settings. |
| Public domain management | Route each league's website to the right tenant and domain. |
| Website publish status | Support draft, published, and disabled states. |
| League contact settings | Manage public emails, phone numbers, website links, and social links. |
| Sponsor management | Manage sponsor logos, names, links, order, visibility, and active dates. |
| Language content | Store translated copy and content for supported languages. |

### 9.2 Public Content Management

| Suggested Capability | Purpose |
|---|---|
| Page content editor | Manage Home and About copy, hero messages, mission, vision, and values. |
| News management | Create, edit, publish, archive, categorize, and feature news. |
| Highlight management | Manage highlight cards, images, video links, categories, and publish dates. |
| Media library | Store and manage logos, photos, sponsor assets, article images, and highlight thumbnails. |

### 9.3 League Data Publishing

| Suggested Capability | Purpose |
|---|---|
| Public divisions feed | Show active divisions for the selected league/season. |
| Public teams feed | Show public team profiles and division membership. |
| Roster publishing controls | Decide which player and coach details are public. |
| Fixture/result publishing | Show public fixtures, results, statuses, dates, times, venues, and scores. |
| Standings publishing | Display standings derived from fixture results and league rules. |
| Top scorers publishing | Display player leaderboards based on result data. |

### 9.4 Registration Inquiry Handling

| Suggested Capability | Purpose |
|---|---|
| Public registration submissions | Save New Team Membership requests. |
| Inquiry review queue | Let league staff view, approve, archive, and follow up on submissions. |
| Notification workflow | Notify league staff and applicant when a request is submitted. |
| Spam protection | Protect the form from low-quality or automated submissions. |
| Audit history | Track submission status changes and staff actions. |

### 9.5 Mobile App And Engagement

| Suggested Capability | Purpose |
|---|---|
| App prompt configuration | Let each league enable/disable mobile app promotion. |
| App store links | Send users to league-specific or Clubucket app destinations. |
| Push notification opt-in | Future option for fixtures, results, and news alerts. |

---

## 10. UX Observations

### 10.1 Strengths

| Area | Observation |
|---|---|
| Brand clarity | LigaD1 identity is visible immediately through logo, colors, hero messaging, and soccer imagery. |
| Simple navigation | Main sections are clear and easy to understand for public visitors. |
| Sports-first layout | Fixtures, scores, standings, teams, scorers, news, and highlights align with common sports website expectations. |
| Conversion path | Register button provides a clear path for prospective teams. |
| Public credibility | Sponsors, About content, news, and highlights help the league feel active and established. |
| White-label foundation | The page structure can be reused for other leagues with league-specific branding and content. |

### 10.2 Gaps And Missing States

| Area | Observation |
|---|---|
| Language toggle | EN/ES changes active state only; translated content is not confirmed. |
| Register dropdown | Only one option is available. Future states may need team registration, player registration, volunteer, sponsor inquiry, or contact options. |
| News/highlight cards | No detail pages or video playback are visible. |
| Schedule | No match detail, calendar export, venue map, ticket link, or team filter is visible. |
| Standings | Tie-breaker rules, wins, draws, form, and qualification context are not shown. |
| Team profiles | Profiles are read-only and basic; no team bio, crest image, social links, stats, or fixture history are visible. |
| Data consistency | Some top scorer teams do not appear in the visible LigaD1 division list, likely due to demo data. |
| Registration form | No backend confirmation, admin review status, file upload, or email confirmation is visible. |
| Mobile app prompt | App button has no confirmed destination. |
| Empty/error states | No public empty states, loading states, failed-content states, or maintenance messaging are visible. |

### 10.3 Usability Notes

- The website feels ready as a public prototype and content showcase.
- Navigation is easy for fans and prospective teams.
- The Registration flow is simple and understandable.
- The site should eventually distinguish clearly between live data, upcoming fixtures, completed results, and editorial content.
- The product should decide whether public roster visibility is always enabled or controlled by league/team privacy settings.

---

## 11. Final Summary

The Clubucket Public League Website is a strong frontend prototype for a white-labeled, league-personalized public website. Using LigaD1 as the sample league, it demonstrates the main public capabilities a sports league needs: brand presentation, divisions, team profiles, schedules, results, standings, news, highlights, sponsors, contact details, and team registration interest.

The platform's main business value is giving leagues a professional public presence without requiring each league to build a custom website from scratch. It connects league operations data with public fan engagement and gives prospective teams a clear path to join.

The product maturity impression is that the public website is visually coherent and business-aligned, but still a prototype. The next product step is to connect the website to real league configuration, content publishing, registration inquiry handling, fixture/result/standing data, media management, localization, and domain-based white-label delivery.
