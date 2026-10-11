Portfolio build plan: Litos command deck
Oct 10, 2026 · @Skylar
Overview
Build a developer portfolio on Astro, starting from the free Litos theme and extending it into a green, space-themed "command deck" that stays professional underneath the fun. The target is roughly two to three weekends of work, live on a free host.
• Framework: Astro, chosen over Hugo for component-based customization while keeping Markdown content.
• Base theme: Litos (MIT), which already has projects with tags, Expressive Code, dark mode, and a single src/config.ts.
• Design direction: a starfield with a rotating ringed planet that reacts to the cursor, a command-deck hero with a typed terminal and tracking radar, a scrolling stack of tech icons that filters projects, and terminal-styled code blocks.
• Reference: the command deck demo is the visual target for every component below.
Rejected along the way: Hugo (theme overrides were painful), the paid DevPro template ($40), a contribution grid, and a telemetry panel.

Status (as of Oct 10, 2026)
Phases 1–3 complete and committed on the astro branch (commit 0423051) with the last Hugo commit as its parent — history reads cleanly from Hugo era → Astro reboot. Dev server runs locally; nothing deployed yet. The remote main branch still holds the live Hugo site, untouched. Next up is phase 4 (card glow + Expressive Code theming).
Content shipped so far (4 projects, within the plan's 3–6 range):
• tack-ai (featured) — AI coding agent with Cedar policy enforcement + hash-chained audit
• Skylab (featured) — self-hosted platform engineering environment; the "shoutsky-images" workload layer and Backstage/Crossplane EKS self-service templates folded in as sub-sections rather than their own cards
• mechatracker (featured, paused) — Go/Next.js/React Native repair tracker; honest about being paused mid Clerk auth
• POTD Web App — Flask + split-workflow CI pipeline

Design system
All colors and the glow strength live as CSS variables in Litos's global stylesheet, so the whole look can be tuned in one file. Dark mode is the primary design; light mode is a readable fallback.
Token
Dark
Light
Used for
--bg
#040906
#edf4ef
Page background
--panel
#0a120d
#ffffff
Cards and deck frame
--line
#1b2a21
#cddfd3
Borders
--text
#e4f2e9
#13221a
Body text
--muted
#8aa595
#4f6658
Supporting text
--neon
#4ade80
#15803d
Primary accent, glow, selected states
--neon2
#5eead4
#0f766e
Tags, hover states
--term-cmd
#6ee7a0
#6ee7a0
Terminal commands and keywords
--term-ok
#bef264
#bef264
Status text, radar blips, strings
Terminal surfaces (deck bays, code blocks) stay dark in both modes. Dedicated tokens that never flip: --term-bg #0c110e, --term-header #121a15, --term-border #1f2a23, --term-text #e4f2e9, --term-muted #8aa595, plus the always-same --term-cmd / --term-ok accents. Rule of thumb: anything rendered on a dark bay surface must use these, never --text / --muted (which flip to dark values in light mode and vanish on the dark surface).
Glow. Every glow is a shadow multiplied by --glow (1 in dark mode, 0.35 in light), for example 0 0 calc(20px * var(--glow)) .... Turning the site from loud to subtle is a one-number change.
Type. Chakra Petch for headings, IBM Plex Sans for body, JetBrains Mono for terminals and code, all from Google Fonts with system fallbacks.
Components
Five pieces, each a self-contained .astro component (or a style change to an existing Litos one). The demo page contains working code for all of them to port from.
Component
Where it goes
What it does
Notes
Sky.astro
Base layout, behind everything
Canvas starfield at several depths plus a ringed green planet whose bands and storms rotate
Stars and planet shift with the cursor (eased parallax); planet's lit side follows the pointer; planet scrolls away with parallax; static when reduced motion is on
CommandDeck.astro
Homepage hero, replacing Litos's hero
Frame with a typed terminal bay and a tracking radar bay, plus a control strip
Terminal lines come from props or config; controls toggle stars, spin, cursor follow, theme, and glow
StackMarquee.astro
Homepage, replacing the skills section
Two rows of icon pills scrolling in opposite directions; tapping one navigates to /projects?tag=X where cards not matching the tag render in the dimmed state
Pauses on hover and focus; wraps into a static list with reduced motion. Litos ships a two-row directional SkillsShowcase already, so this is a restyle + tag-link wiring job, not greenfield
Project card glow
Litos's existing project card
Green glow and lift on hover and focus, dimmed state when filtered out
Style-only change; Markdown content untouched
Code block theme
ec.config.mjs
Expressive Code styled to match the terminal bays
Dark frame, three dots, green keywords, lime strings, left-bar line highlights
Icons. Use the simple-icons package (or astro-icon with its simple-icons set) so each stack entry is referenced by name. Icons render muted, turn mint on hover, and glow green when selected. Simple Icons has no gRPC logo, and brand logos occasionally get removed between versions, so check each name exists.
Filtering. Each project's front matter tags must use the same names as the stack config, so a pill click can match cards by tag.
Content
Projects stay as Markdown files, one per project, validated by a content collection schema so a missing field fails the build instead of rendering broken.
// project front matter fields
title: string
summary: string        // one or two sentences for the card
tags: string[]         // must match names in the stack config
repo?: url
demo?: url
cover?: image
featured: boolean      // shown first and counted on the radar
date: date
The stack list lives once in src/config.ts as name plus icon slug, and both the marquee and the terminal's stack line read from it.
Copy to write before launch:
[ ] One-line intro under the name (what you build, main languages)
[ ] Terminal lines: role, stack, current status (for example, open to backend roles)
[ ] 3 to 6 project write-ups: the problem, what you built, a technical decision you'd defend, and the result
[ ] At least one code snippet per write-up to show off the code block styling
[ ] Short about page and contact links (email, GitHub, LinkedIn)
Build order
Six phases, about 20 to 28 hours total. Each phase ends with something deployable, so the site can go live after phase 3 and improve from there.
1. ✓ Set up — Scaffolded from Litos, Hugo files removed, v1 archived, demo content deleted, Chinese comments scrubbed across 28 files. Not yet connected to a host.
2. ✓ Design tokens — Palette, --glow, Chakra Petch / IBM Plex Sans / JetBrains Mono wired in. Header gradient re-tinted green.
3. ✓ Content — 4 project MDX files, schema extended with tags/featured/date/status, built a /projects/[slug] detail-page route (wasn't in the plan but needed for the write-ups to render). About page skipped; home page doubles as it, per Litos's layout.
4. Cards and code blocks (2 to 3 h) — Next. Card glow and filtered state; theme Expressive Code in ec.config.mjs.
5. ✓ Command deck and marquee — 5a CommandDeck shell (frame + typed terminal + control strip with live glow/theme toggles, placeholder stars/spin/cursor awaiting phase 6). 5b radar bay with per-featured-project blips: sweep-synced subtle ping, hover opens a mini-card (name + description + status chip), click → /projects/<slug>. 5c SkillsShowcase restyled as command-deck chips (mono uppercase, mint-on-hover glow, keyboard-nav skips duplicated pills); new FeaturedProjects strip under the marquee. Homepage order: hero + socials + CommandDeck → Stack marquee → Featured work; GitHub Activity and Posts sections removed. 5d tag filter on /projects: client script reads ?tag=X, dims non-matching cards (hover restores partial opacity so they're still clickable), filter banner shows active tag + match count + Clear link.
6. Sky (5 to 7 h) — Port the starfield and planet canvas, then cursor parallax and scroll behavior. Last because it is the most work and purely decorative.
After phase 6, run the quality checklist below before sharing the link widely.

Bug fixes bundled into phases 1–3 (worth remembering next time):
• remark-gfm had to be added for Markdown tables (MDX inherits markdown config but tables don't work without it)
• rehype-autolink-headings `content: () => 'h' + level` leaked "h2"/"h3" as visible text — fixed to use `#` with .header-anchor CSS hiding it until hover
• Tailwind typography (prose) renders literal backticks around inline code via ::before/::after; stripped via content: none override
• pnpm v12 moved onlyBuiltDependencies out of package.json; pnpm-workspace.yaml now carries `allowBuilds` for esbuild + sharp

Dev workflow
Taskfile.yml at the repo root wraps the pnpm commands — same convention as tack-ai and mechatracker — so day-to-day work is one keystroke and the stack config's "Task" entry earns its place.
• task dev — pnpm dev, local server at :4321
• task build — pnpm build, outputs to dist/
• task preview — pnpm preview, serve the production build
• task check — astro check, schema + TS validation
• task clean — rm -rf dist .astro
CI/CD. GitHub Actions runs `task check` and `task build` on every push and PR, so a broken content schema or type error fails fast before the host picks it up. Deploys stay on the host side (Vercel/Netlify/Cloudflare auto-deploy on push to main, plus PR previews), so the workflow stays single-purpose and the deploy credentials live only in one place.
Quality checklist
The effects should never cost readability, speed, or access. Check these before launch.
[ ] Reduced motion: stars and planet hold still, marquee becomes a static list, terminal shows text instantly, cursor follow is off
[ ] Keyboard: every pill, card, switch, and button is reachable with a visible focus ring; duplicate marquee pills are skipped
[ ] Contrast: body and muted text pass WCAG AA in both modes, including over the starfield
[ ] Mobile at 390 px: planet shrinks to the corner, deck stacks, terminal text doesn't wrap awkwardly, nothing scrolls sideways
[ ] Performance: Lighthouse 90+ on mobile; canvas capped at 2x pixel ratio and paused when the tab is hidden
[ ] Light mode: glow drops to subtle and every section stays legible
[ ] Content: no placeholder text, all project links work, page titles and social preview image set
Deployment and launch
Host on Vercel, Netlify, or Cloudflare Pages; all have free tiers that build Astro automatically on every push.
1. Connect the GitHub repo to the host during phase 1 so previews exist from day one.
2. Buy or point a custom domain (yourname.dev or similar), then set website in src/config.ts to match so the sitemap and social tags use it.
3. Enable analytics if wanted; Litos supports Umami and Vercount through config.
4. Run the quality checklist on the live URL, not just locally.
5. Share it: GitHub profile README, LinkedIn, and résumé header. Add a project write-up about building the site itself.
Open decisions
[ ] Keep the control strip on the live site, or move it into a small settings menu so visitors see a cleaner deck?
[x] Should the radar blips link to featured projects, or stay decorative? → Linked. Each featured project gets a blip positioned around the radar face; hover shows the project name; click goes to /projects/<slug>. Blip style follows status: shipped = solid lime glow, in-progress = pulsing neon, paused/archived = dim gray no-glow. The radar earns its screen space by surfacing featured work, not just decoration.
[x] Keep Litos's blog section, or launch with projects only? → Projects only for launch; Posts section hidden from home and nav. Clevis / NBDE / auditd ideas held for future blog posts.
[x] Should tapping a stack pill filter cards in place on the homepage, or link to a filtered /projects page? → Link to /projects?tag=X. Reason: keeps homepage short and scannable for skimmers (hero + marquee + 3 featured cards), lets the /projects page carry the deeper filter + dim-when-filtered state for engineers who click through. Two-audience split.
[ ] Which host and domain?
[x] Final stack list: 17 technologies in config — Python, Go, Bash, TypeScript, Ansible, Terraform, Linux, Docker, Kubernetes, Crossplane, PostgreSQL, Git, AWS, GitHub Actions, Redis, Nginx, Task, Astro, Vercel. Added mid-flight: Task (from Taskfiles in tack-ai and mechatracker), Crossplane (from Backstage EKS templates). Dropped: JavaScript (TypeScript covers it).