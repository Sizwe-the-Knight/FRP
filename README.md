# FRP — Free-Range Picks

Phase 2: a connected editorial MVP on the approved MagicPath visual foundation. One typed Markdown article collection powers the magazine, local keyword discovery, and documented equipment requirements. No backend, accounts or persistent device profiles.

## Local development

Requires Node 22.12+ (verified with Node 24.21) and npm.

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm.cmd run dev
```

Open http://127.0.0.1:4321. Stop with Ctrl+C.

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

Dependencies are already installed for this workspace. For a future clean install, use `npm.cmd ci`; the cache stays in `.npm-cache/`. Its postinstall applies a version-guarded Astro 7.3.8 type-template correction. See the [diagnosis and maintenance notes](docs/phase-1.1-verification.md). Stop the development server before running checks/builds.

## Source organization

- [Homepage](src/pages/index.astro): renders one hydrated React island using `client:load`.
- [Document layout](src/layouts/SiteLayout.astro): HTML metadata and the original global CSS.
- [FRP component](src/components/frp/FRPFreeRangePicksStreetFuturistZine.tsx): revised headline and homepage hierarchy; original inline artwork and editorial demonstrations retained.
- [Dedicated CSS](src/components/frp/frp.css): unchanged approved styles, with focused [Phase 1.1 overrides](src/components/frp/frp-refinements.css).
- [Discovery search](src/components/frp/DiscoveryFinder.tsx): known-name and everyday-description routes over published article metadata. No live web research or service calls.
- [Editorial collection](src/content/articles/) and [schema](src/lib/editorial-schema.ts): the single source of article text, search metadata, creator attribution, source links and requirements.
- [Magazine](src/pages/explore.astro), [article route](src/pages/articles/[slug].astro) and [setup guide](src/pages/setup.astro): static routes with small interactive islands for search, comparison and copy-link.
- [Publishing guide](docs/publishing.md): add, feature, reorder, archive or withdraw articles without changing homepage components.
- [Community configuration](src/config/community.ts) and [contribution instructions](CONTRIBUTING.md): approved contact destinations remain unset; Issue Forms are prepared for future publication.
- [Global CSS](src/styles/magicpath-global.css): preserved MagicPath host styling and Tailwind reset.
- [Original archive](reference/magicpath/approved-revision/PROVENANCE.md): pinned revision and provenance; private pending licensing review.
- [Phase 1 verification](docs/phase-1-verification.md) and [Phase 1.1 verification](docs/phase-1.1-verification.md): checks, intentional differences, and comparison limits.

Astro renders the component at build time and hydrates it on page load. Browser APIs in the component are confined to effects and event handlers. The original App wrapper is archived but not executed: its theme setter accesses the document during rendering. Astro's layout supplies the light document and #root wrapper instead.

Open `/explore/` for the magazine, `/#finder` for discovery, `/setup/` for the equipment guide, and `/contribute/` for suggestions. Article slugs form permanent `/articles/slug/` URLs. Search uses article metadata rather than a duplicated catalogue; comparison uses the same articles' requirement profiles. No CMS or additional UI library is installed. See [the prelaunch audit](docs/prelaunch-audit.md) for scope and limitations.

## Publication boundary

Only `dist/` is a deployable build. Never publish the workspace root. References and screenshots are outside `public/` and excluded from Git until licensing has been reviewed. No public license is asserted yet. Fonts are self-hosted with [their original notices](docs/font-notices.md); there is no analytics or application service connection. See [the GitHub Pages release checklist](docs/github-pages-release.md) for destination configuration and the exact safe staging procedure.
