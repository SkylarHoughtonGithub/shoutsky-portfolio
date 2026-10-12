# Architecture

Astro-generated static site, deployed to GitHub Pages, extended from the Litos theme. Four surfaces: a command-deck hero, a tech-stack marquee, a featured-projects strip, and a filterable projects list. Dark mode is primary; light mode is a readable daytime variant with its own matching sky.

The narrative version of _why_ this exists lives in [`src/content/projects/portfolio/index.mdx`](src/content/projects/portfolio/index.mdx). This file is the technical reference: how it's wired.

---

## Design system

All colors and the glow multiplier are CSS variables in `src/styles/global.css`. Both modes read the same token names; `:root` holds light defaults, `.dark` overrides for dark mode.

Core tokens (collapsed):

| Token              | Role                                                | Light     | Dark      |
| ------------------ | --------------------------------------------------- | --------- | --------- |
| `--bg` / `--panel` | Page background / card surface                      | `#edf4ef` / `#ffffff` | `#000000` / `#080f0b` |
| `--text`           | Body text                                           | `#13221a` | `#e4f2e9` |
| `--muted`          | Supporting text                                     | `#4f6658` | `#8aa595` |
| `--neon`           | Primary accent, glow, selected states               | `#15803d` | `#4ade80` |
| `--neon2`          | Hover accent                                        | `#0f766e` | `#5eead4` |
| `--glow`           | Multiplier applied to every `box-shadow` / `text-shadow` | `0.35` | `1` |

### Terminal surface tokens

The command deck and Expressive Code frames share a dedicated palette so a single theme-swap updates both. All `--term-*` tokens are **mode-adaptive** (not always-dark — the always-dark variant was replaced because the hard-cornered black deck read as jarring against the light-mode sky):

- `--term-bg`, `--term-header`, `--term-border`, `--term-text`, `--term-muted`, `--term-cmd`, `--term-ok`

Rule: anything rendered inside a terminal surface uses these tokens, not `--text` / `--muted`.

### Sky surface tokens

Light-mode-only, used by the body gradient and the sun:

- `--sky-top` `#cfe3ff`, `--sky-bottom` `#edf4ef` — dawn gradient (fixed-attachment)
- `--sun-core` `#fff8dc`, `--sun-corona` `#ffd98a` — always-warm sun

### Type

Chakra Petch (headings), IBM Plex Sans (body), JetBrains Mono (terminal/code). Loaded from Google Fonts with system fallbacks.

---

## Component map

### `src/components/Sky.astro`

Fixed-position background. Dark mode draws a starfield + ringed planet; light mode draws a gradient sky + sun. One component, mode-switched via CSS `html.dark` / `html:not(.dark)`.

- **Canvas starfield**: density scales to viewport, three visual depths (size + alpha), sin-wave twinkle. White / cool blue / mint hue mix. Hidden in light mode via `display: none`.
- **Planet (SVG)**: 4-stop radial-gradient body + `feTurbulence` with discrete alpha thresholds for binary continent-like wisps + 8 Saturn-style ring arcs split into back/front half-paths via `A` arc commands. Wrapped in `<g class="planet-rotator">` for optional spin animation; rings stay fixed.
- **Sun (CSS)**: radial-gradient core (white → cornsilk → warm yellow) with a triple drop-shadow halo, soft blurred corona ring behind it.
- **Parallax**: `pointermove` listener sets normalized `-1..1` target; eased in RAF (`0.08/frame`). Script writes `--sky-pointer-x`, `--sky-pointer-y`, `--sky-scroll-y` on `<html>`; planet/sun transforms consume them. Planet's lit side follows the pointer by live-updating `#planet-body` and `#planet-shadow` SVG gradient `cx` / `cy` attributes each frame. Sun's hot spot shifts similarly via a gradient center in CSS.
- **Perf guards**: `devicePixelRatio` capped at 2x; RAF cancelled on `visibilitychange`; `resize` re-seeds the star field.
- **Reduced motion**: tracking disabled, offsets forced to 0, canvas renders once static, planet-rotator animation none.

### `src/components/CommandDeck.astro`

Hero. Border + traffic-light dots + title + pulsing "online" status in the header. Two bays below (terminal + radar). Control strip across the bottom.

- **Terminal bay**: ordered list of `{prompt, text, kind: 'cmd' | 'out'}` lines. Each line gets `.is-revealed` added on a staggered `setTimeout` after boot. Blinking caret element, `overflow-x: auto` on narrow viewports so the stack line can scroll.
- **Radar bay**: CSS-only radar face (concentric rings + crosshairs + rotating conic-gradient sweep with `mix-blend-mode: screen`). Blips are `<a>` elements positioned via `--x` / `--y` CSS vars computed in the frontmatter from angle × distance. Each blip's `animation-delay` is set so its ping cycle peaks when the sweep passes over it. Hover opens a mini-card with name + description + status chip; hover/focus pauses that blip's ping. Status drives dot style: shipped = lime glow, in-progress = pulse, paused = dim gray.
- **Control strip**: stars / spin / cursor toggle `html` classes (`sky-stars-off`, `sky-spin-off`, `sky-cursor-off`) + persist to `localStorage`. Glow cycles `--glow` between normal and subtle. Theme hooks `window.__theme.setTheme()` from `public/js/theme.js`. All toggle state applied **before first paint** via a `applyStoredSkyToggles()` call at the top of the module script, so there's no FOUC on reload.

### `src/components/base/SkillsShowcase.astro`

Two-row directional marquee (plus a third row for a longer stack). Pills styled as command-deck chips (mono uppercase, mint-tinted border, panel background, lifted-on-hover). Each pill links to `/projects?tag=<encoded name>`. The duplicate copies that enable seamless scrolling get `tabindex="-1"` + `aria-hidden="true"` so keyboard / screen-reader users see each tech once.

### `src/components/FeaturedProjects.astro`

3-card strip under the marquee. Reads `getAllProjects()`, filters `featured`, takes top 3. Shares the `.project-card` hover glow with the projects-list cards.

### `src/pages/projects/index.astro` + `[...slug].astro`

List + detail routes. List cards carry `data-tags="..."`. A page-level `<script>` reads `?tag=X` on load, applies `.filtered-out` to non-matching cards (dim + partial-opacity-on-hover so they stay clickable), and reveals a filter banner with "N of M match" + a Clear link that routes back to `/projects`.

### Expressive Code

`ec.config.mjs` ships two custom themes (`command-deck-dark` + `command-deck-light`) wired via `themeCssSelector` to the `.dark` class. `defaultProps.frame = 'terminal'` forces the terminal-style frame (3 dots) on all code blocks regardless of language. Frame chrome (background, header, border, tab indicator) uses `var(--term-*)` so it swaps automatically with the deck. Syntax palette in each theme is tuned so all tokens pass WCAG AA against their respective backgrounds.

---

## Content model

Projects live in `src/content/projects/<slug>/index.mdx`. Schema in `src/content.config.ts`:

- `name`, `description`, `tags` (array), `status` (`shipped` / `in-progress` / `paused` / `archived`), `featured` (bool), `date`, `githubUrl?`, `website?`, `icon?`
- `status` drives the colored dot on list cards + the radar blip style (lime glow / neon pulse / dim gray).
- `featured` controls visibility in the home-page `FeaturedProjects` strip and the radar.
- Missing required fields fail the build via Zod validation — content errors never render as broken HTML.

The marquee tag names in `src/config.ts` must match the tag strings in project frontmatter for `/projects?tag=X` filtering to work.

---

## Interactive patterns

Astro's `<ClientRouter>` is active (loaded in `src/components/base/Head.astro`), so page navigation is a client-side DOM swap, not a full reload. Every component that attaches listeners must use the boot pattern:

```ts
let current: Instance | null = null
const relaunch = () => {
  current?.cleanup()
  current = boot()
}
relaunch()
document.addEventListener('astro:page-load', relaunch)
document.addEventListener('astro:before-swap', () => current?.cleanup())
```

Without this, listeners attach to stale DOM nodes after first navigation and silently break. `Sky.astro`, `CommandDeck.astro` all follow it.

Expressive Code emits per-span inline styles like `style="--0:#E4F2E9;--1:#0A1510"` and a page-level CSS cascade swaps `color: var(--0)` → `color: var(--1)` based on the `.dark` class on `<html>`. If a token appears unstyled or using the wrong theme's color, suspect a cache issue (see "Known gotchas" below) before editing the config.

---

## Dev workflow

`Taskfile.yml` wraps the pnpm commands so day-to-day work is one keystroke:

- `task dev` — `pnpm dev`
- `task build` — `pnpm astro check && pnpm astro build`
- `task preview` — build then serve
- `task check` — type + schema validation
- `task format` / `task format:write` — Prettier check / rewrite
- `task clean` — `rm -rf dist .astro node_modules/.astro node_modules/.vite`
- `task reinstall` — nuke + `pnpm install`

Prettier config is `.prettierrc` with `prettier-plugin-astro`.

CI is split by lifecycle stage:

- **`.github/workflows/ci.yml`** — runs on PRs and pushes to any branch except `main`. Does `pnpm install → format → astro check`. Validation gate before merge.
- **`.github/workflows/deploy.yml`** — runs on push to `main` (or manual `workflow_dispatch`). Does `pnpm install → astro build → upload-pages-artifact → deploy-pages`. No format or check — those already passed on the PR, no need to re-run.

Direct pushes to `main` (bypassing a PR) therefore skip validation. Use the PR flow for anything non-trivial.

---

## Deploy

Static output to `dist/`, deployed to GitHub Pages via `.github/workflows/deploy.yml`:

1. Push to `main` triggers the workflow (also `workflow_dispatch`).
2. Workflow: `pnpm install --frozen-lockfile → format check → astro check → astro build → upload-pages-artifact → deploy-pages`.
3. Custom domain `skylarhoughtongithub.com` served via `public/CNAME`.

**Repo settings requirement**: GitHub Pages source must be set to **GitHub Actions**, not a branch. The old Hugo workflow pushed to `gh-pages`; this one uses the Pages Actions runtime directly.

DNS: `A` records at the apex to GitHub's four IPs (`185.199.108.153` / `.109.153` / `.110.153` / `.111.153`), plus a `www` CNAME to `SkylarHoughtonGithub.github.io` if needed.

---

## Accessibility and perf standing requirements

Enforced in the code; verify on every structural change:

- **Reduced motion**: starfield renders once static, planet-rotator animation none, deck lines auto-reveal, marquee `animation: none !important`, radar sweep opacity drops to 0.25.
- **Keyboard**: every pill, card, button, radar blip has a visible `:focus-visible` style (green border + glow). Marquee duplicate pills get `tabindex="-1"` + `aria-hidden="true"` so each tech is reached exactly once.
- **Contrast**: all text passes WCAG AA against its surface in both modes. `--term-muted` light = `#566b5c` (5.1:1 on paper); EC light-theme syntax tokens all in the `L≤0.2` range.
- **DPR cap**: 2x on the sky canvas. RAF cancels on `visibilitychange` so a backgrounded tab consumes no CPU.
- **Mobile at 390px**: planet / sun slot `clamp(…)` pulls them to visible-but-compact corner placement; deck bays stack via `max-width: 640px` media query; terminal bay allows horizontal scroll if the stack line overflows.

---

## Known gotchas

- **Expressive Code cache**: generated themes live in `.astro/` (project root), which survives `rm -rf node_modules`. If a syntax-color change doesn't appear even after a dev-server restart, `rm -rf .astro node_modules/.astro node_modules/.vite` and re-run `pnpm dev`.
- **Spin button in light mode**: no-op (no planet to rotate); toggle state still persists.
- **Stars button in light mode**: canvas is already `display: none` under `:not(.dark)`; the toggle is a visual no-op but kept for consistency.
- **remark-gfm required**: MDX inherits markdown config but tables don't work without `remark-gfm` explicitly listed in `plugins/index.ts`.
- **rehype-autolink-headings `content`**: must use a `{ type: 'text', value: '#' }` plus the `.header-anchor` CSS to hide-until-hover; using the raw heading text leaks `"h2"` / `"h3"` as visible content.
- **Tailwind typography prose backticks**: `prose` wraps inline `<code>` in literal backtick characters via `::before` / `::after`; stripped globally in `global.css` with `content: none`.
- **pnpm v12 `onlyBuiltDependencies`**: moved out of `package.json`; `pnpm-workspace.yaml` carries `allowBuilds` for `esbuild` + `sharp`.
