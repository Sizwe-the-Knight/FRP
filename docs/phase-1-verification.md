# Phase 1 verification

Verified on 2026-10-12 in the FRP workspace. No Git initialization, publication, deployment, accounts, or editorial backend was performed.

## Preservation

All four archived source strings were compared with the pinned MagicPath response and match exactly. The working TSX, dedicated CSS, and global CSS have the same SHA-256 values as their archive counterparts. See the private [provenance](../reference/magicpath/approved-revision/PROVENANCE.md), [source checksums](../reference/magicpath/approved-revision/checksums.json), and [screenshot checksums](../reference/magicpath/approved-revision/screenshots-checksums.json). All six existing screenshots retain their original names and bytes.

## Build and runtime

- `npm.cmd run check`: passed; 0 errors, 0 warnings, 0 hints.
- `npm.cmd run build`: passed; one static homepage.
- `npm.cmd ls --depth=0`: passed; no invalid top-level dependencies.
- Development server: HTTP 200 at http://127.0.0.1:4321/.
- Browser: no page/runtime errors during the completed checks.
- Development housekeeping: Vite excludes local browser-test files, npm cache, and reference material from watching. This avoids Windows file-lock warnings from temporary browser profiles.
- Production output: homepage HTML and four compiled CSS/JS assets only. Neither reference folder nor screenshots are in `dist/`.

The official Astro React integration renders HTML and hydrates on load. The component's browser APIs are in effects and event handlers, so `client:only` is unnecessary. The original host wrapper is preserved in the archive but replaced in execution by an Astro document shell with the same light presentation and #root wrapper. Original package versions were unavailable; the new locked dependencies passed the comparison below.

## Visual comparison

Headless Microsoft Edge was used with fixed 1440 × 1000 and 390 × 1000 CSS-pixel viewports. The local page and approved MagicPath embedded preview were loaded in the same browser context. Fonts were allowed to load, hydration was awaited, and motion was paused through the existing UI before measurements.

At each width, all 526 inspected elements matched for geometry (rounded to 0.01 CSS px), font family/size/weight/line height, color, background, border width, and display. The reveal-state classes `arrived` and `waiting` were normalized for this comparison. Zero differences were reported at both widths, and neither page had horizontal document overflow. Desktop and mobile full-page captures were visually inspected; their typography, SVG artwork, section order, card arrangement, colors, and spacing agree with the approved design. The six user screenshots were also inspected as composition references.

This is not a claim of pixel-perfect equivalence in every browser. The original screenshots have differing crops, viewport/zoom, pointer, selection, and animation states; they were not used for an exact pixel diff. The live preview is not a revision-pinned URL, while the archived source is explicitly pinned. Its observed layout matched the pinned source at verification time.

Local-only evidence, excluded from Git and deployment:

- [Desktop capture](../.local/local-1440.png), [reference desktop](../.local/reference-1440.png)
- [Mobile capture](../.local/local-390.png), [reference mobile](../.local/reference-390.png)
- [Browser report](../.local/browser-report.json)
- [Verification script](../.local/verify-browser.cjs), using existing machine-level Playwright and Edge rather than a new project dependency.

## Verified interactions and motion

- Mobile menu opens; navigation scrolls and closes it.
- Finder selections produce the original demonstration response.
- Story modal opens; save toggles; Escape and close button dismiss it.
- Reality Check accordion changes the expanded answer.
- HDMI selection updates the port explanation.
- Community submission displays the original local-only acknowledgment.
- Story rail advances with its arrow control.
- Ticker transform changes over time.
- Pointer and scroll parallax variables update.
- Scrolling reveals an offscreen section.
- Route-card hover changes its transform.
- Pause motion disables ticker animation.
- Emulated reduced motion disables animation and applies the component's still state.

Original decorative keyframes and durations are unchanged. Their entire repeating timelines, real touch gestures, screen-reader behavior, other browsers, and every responsive width have not been exhaustively tested.

## Known differences and remaining concerns

No design-source changes or measured visual differences were required. The standalone site has its own document title and description and omits MagicPath's surrounding preview controls. Astro replaces the original application host, not the design component.

Google Fonts still require network access; fallback fonts may alter layout offline. Public redistribution rights remain pending review as described in provenance, including the working source. The prototype's editorial text, matching, save state, and submission behavior remain demonstrations. Hydration is needed before interactive controls respond; build-time HTML displays before that. Production publishing and new features await review.

For manual review, run the development command in the [README](../README.md), open the local page beside the approved reference, set equal browser zoom and viewport widths, wait for fonts, and pause motion on both pages. Compare the sections, then resume motion and exercise the controls above. Use DevTools reduced-motion emulation for the accessibility comparison.
