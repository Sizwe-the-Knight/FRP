# Phase 1.1 verification

Verified 2026-10-13 inside FRP only. No Git initialization, publication, deployment, account changes, or editorial backend work.

## Intentional changes from the approved baseline

- “Learn You Something.” replaces the original headline, using the same chrome gothic and neon bubble treatments. The tagline stays unchanged and the supporting copy explains FRP's publication purpose.
- The shorter hero leads directly into three full-width pathway cards. Their pink tilted sheet, lime rounded shape, orange clipped shape, outlines, glyphs, hover behavior, and asymmetry reuse the original design system. At 1366 × 768 all three headlines finish above 675px; all three are also visible at 1440 × 900 and 1920 × 1080.
- Explore leads to the existing editorial preview, Find My Way to the separate purple discovery section, and Know My Setup to the existing interactive port guide. These are working same-page destinations, not completed future products. Keyboard focus follows pathway navigation.
- “Saw something cool?” introduces a local demonstration with known-name/alternative and everyday-description routes, all five requested examples, optional device context, and explicit limitations. Submitting offers next-step guidance, not fabricated matching results or AI research. No network submission occurs.
- The ticker follows the pathways. Remaining editorial sections, branding, illustrations, original keyframes and timing stay intact. No popularity metrics or live-trending claims were added.

The original component stylesheet and global stylesheet are unchanged. Overrides are isolated in [frp-refinements.css](../src/components/frp/frp-refinements.css); new discovery behavior lives in [DiscoveryFinder.tsx](../src/components/frp/DiscoveryFinder.tsx). The original archive and all six screenshots passed their recorded SHA-256 checks (10 files total).

## TypeScript diagnosis

Installed versions: Astro 7.3.8, TypeScript 6.0.3, @astrojs/check 0.9.10, @astrojs/react 7.0.1. The installed dependency tree has no invalid top-level packages. Astro and its checker were already at the latest versions returned by npm during this investigation; no dependency upgrade was required. VS Code's installed bundled TypeScript is also 6.0.3. Its active language-service selection was not observable; [workspace settings](../.vscode/settings.json) now point at the project SDK.

The four TS2344 errors reproduced with the project's TypeScript, so they were not merely stale editor messages. Running official `astro sync` alone did not resolve them. Astro 7.3.8's generator template inferred live-loader data/filter/error types without their required constraints, and its live-data schema branch could yield unknown instead of a record. No content collections are configured in this phase; generated `never` content configurations are expected. Adding a dummy content configuration would not address the underlying declarations.

[patch-astro-types.mjs](../scripts/patch-astro-types.mjs) applies a narrow, idempotent correction to the installed dependency's **source template**, then official `astro sync` generates the declarations. No generated file is manually edited. The patch constrains inferred data, filters and errors to their actual loader contracts and restricts schema-derived live data to records. This is a temporary local workaround, not an official Astro release fix. It fails explicitly on an Astro version other than 7.3.8 or an unexpected template; reassess/remove it when upgrading Astro. `npm ci` reapplies it through postinstall.

`tsconfig.json` and its inherited `skipLibCheck` setting were not changed. No diagnostics are disabled. [check-generated-types.mjs](../scripts/check-generated-types.mjs) explicitly checks the regenerated declarations and [inference probes](../tests/live-content-types.ts) with `skipLibCheck: false`. The probes cover loader data, filters, error type, default filters, and record/nonrecord schema output. This targeted check is included in `npm run check`; it is not a claim that every third-party declaration in the dependency tree passes an unrestricted library audit.

Official references: [Astro sync/check commands](https://docs.astro.build/en/reference/cli-reference/), [Astro generator source](https://github.com/withastro/astro/blob/main/packages/astro/templates/content/types.d.ts), [loader contracts](https://github.com/withastro/astro/blob/main/packages/astro/src/content/loaders/types.ts), and [VS Code workspace TypeScript selection](https://code.visualstudio.com/docs/typescript/typescript-transpiling).

If VS Code still shows the old four messages:

1. Run `npm.cmd run sync`, then `npm.cmd run check`.
2. Open a TSX file. Run **TypeScript: Select TypeScript Version → Use Workspace Version** (6.0.3).
3. Run **TypeScript: Restart TS Server**, then **Developer: Reload Window** to refresh the Astro language service too.

The regenerated types are clean in the explicit compiler check. The live VS Code Problems panel could not be inspected, so editor-message disappearance is not asserted.

## Browser verification

Final `npm.cmd run check` passed: zero Astro errors, warnings or hints, and zero targeted declaration/inference diagnostics with library checking enabled. `npm.cmd run build` passed and generated one static page.

Headless Microsoft Edge using existing machine-level Playwright; no browser-testing dependency was added. Google Fonts loaded, React hydration completed, and screenshots used the existing pause control for stable inspection.

Tested 1366 × 768, 1440 × 900, 1920 × 1080, 768 × 1024, 390 × 844, and 320 × 740. All had zero horizontal document overflow and fitting hero text. All three pathway headlines are visible in each tested desktop first viewport. Mobile retains the full illustration and stacks the pathways immediately after the hero.

Verified all pathway and main-navigation destinations, mobile menu closure, both discovery routes, five examples, optional device details, whitespace validation, local preview, story dialog/Escape, Reality Check accordion, HDMI explanation, story rail, ticker movement, pointer/scroll parallax, scroll reveals, pathway hover, pause control, and emulated reduced motion. No runtime/console errors or POST requests occurred in the completed run.

Desktop and mobile captures were visually reviewed against the retained Phase 1 reference capture. The original palette, fonts, SVG collage and editorial composition remain recognizable; changed hierarchy and new discovery section are deliberate. This revision is not pixel-identical to the prototype. Real touch gestures, assistive technology, all browsers, and every animation timeline were not exhaustively tested.

Local evidence (excluded from Git/deployment): [browser report](../.local/phase-1.1-browser-report.json), [verification script](../.local/verify-phase-1.1.cjs), [desktop](../.local/phase-1.1-1440.png), [mobile](../.local/phase-1.1-mobile-full.png).

An initial dev run exposed a stale production-mode Vite dependency bundle (`jsxDEV` undefined). Stopping the server and clearing its generated dependency cache restored development hydration; completed browser verification had no such error. A fresh development start after the final check/build also passed hydration and pause-control checks without runtime errors. Avoid running the development server concurrently with checks/builds.

## Remaining boundaries

Google Fonts require network access. Editorial stories, setup guidance, save state, and community forms remain prototype demonstrations. Licensing and redistribution review remain required before any public release. Original reference material remains outside deployable assets. Further Explore, Find My Way, Know My Setup, Reality Check and publishing implementation awaits review.
