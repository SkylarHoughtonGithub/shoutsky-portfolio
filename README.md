<div align="center">
  <img src="./public/logo.png" width="180" alt="shoutsky-portfolio logo" />
</div>

# shoutsky-portfolio

Personal portfolio site for Skylar Houghton — platform engineer.

**Live**: [skylarhoughtongithub.com](https://skylarhoughtongithub.com/)

Astro + Tailwind, custom command-deck hero (typed terminal, radar of featured projects, cursor + scroll parallax on a canvas starfield / SVG planet in dark mode, warm sun on a gradient sky in light mode). Project write-ups rendered from MDX. Mode-adaptive terminal palette shared across the deck and all code blocks.

## Local dev

Requires Node 22+ and pnpm 10+. [Task](https://taskfile.dev) wraps the common commands:

```bash
task dev           # dev server at :4321
task build         # astro check + astro build
task preview       # build and serve dist/
task check         # type + content-schema validation
task format:write  # Prettier
task clean         # nuke dist + astro caches
```

Pure pnpm equivalents (`pnpm dev`, `pnpm astro build`, etc.) also work — see `Taskfile.yml` and `package.json`.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. Pre-merge validation (format + type-check) runs via `ci.yml` on PRs. Custom domain served through `public/CNAME`.

## Docs

Architecture, component map, design-system tokens, interactive patterns, and known gotchas live in [`ARCHITECTURE.md`](./ARCHITECTURE.md). The narrative "why I built this" is in the portfolio project entry: [`src/content/projects/portfolio/index.mdx`](./src/content/projects/portfolio/index.mdx).

## Credit

Scaffolded from the [Litos](https://github.com/Dnzzk2/Litos) Astro theme (MIT), then forked and reshaped substantially. Original theme components for posts, photos, tags, search, comments, and analytics were removed; the deck, radar, parallax sky, and mode-adaptive terminal palette are custom.
