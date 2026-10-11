Portfolio build plan: Litos command deck
Oct 10, 2026 · @Skylar
Overview
Build a developer portfolio on Astro, starting from the free Litos theme and extending it into a green, space-themed "command deck" that stays professional underneath the fun. The target is roughly two to three weekends of work, live on a free host.
• Framework: Astro, chosen over Hugo for component-based customization while keeping Markdown content.
• Base theme: Litos (MIT), which already has projects with tags, Expressive Code, dark mode, and a single src/config.ts.
• Design direction: a starfield with a rotating ringed planet that reacts to the cursor, a command-deck hero with a typed terminal and tracking radar, a scrolling stack of tech icons that filters projects, and terminal-styled code blocks.
• Reference: the command deck demo is the visual target for every component below.
Rejected along the way: Hugo (theme overrides were painful), the paid DevPro template ($40), a contribution grid, and a telemetry panel.
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
Terminal surfaces (deck bays, code blocks) stay dark in both modes: background #0c110e, header #121a15, border #1f2a23, three muted dots in the header, soft gray-green text.
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
Two rows of icon pills scrolling in opposite directions; tapping one filters project cards
Pauses on hover and focus; wraps into a static list with reduced motion
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
1. Set up (1 to 2 h). Clone Litos, run it locally, push to a new GitHub repo, connect a free host so every push deploys. Remove the photos section and anything else you won't use.
2. Design tokens (2 to 3 h). Add the color variables, --glow, and fonts; switch Litos to dark-first. This alone delivers most of the visual change.
3. Content (4 to 6 h). Write the project files, intro, and about page. Set up the stack list in config. A plain but complete site beats a beautiful empty one.
4. Cards and code blocks (2 to 3 h). Card glow and filtered state; theme Expressive Code in ec.config.mjs.
5. Command deck and marquee (5 to 7 h). Build the terminal, radar, and control strip; build the icon marquee and wire the tag filter.
6. Sky (5 to 7 h). Port the starfield and planet canvas, then cursor parallax and scroll behavior. Last because it is the most work and purely decorative.
After phase 6, run the quality checklist below before sharing the link widely.
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
[ ] Should the radar blips link to featured projects, or stay decorative?
[ ] Keep Litos's blog section, or launch with projects only?
[ ] Which host and domain?
[ ] Final stack list: which 12 to 16 technologies to feature