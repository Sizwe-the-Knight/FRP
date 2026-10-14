# FRP pre-launch audit

## GitHub Pages preparation - 14 October 2026

Configurable HTTPS origin and repository base path, base-aware navigation and canonical URLs, and a manual, explicitly gated Pages workflow are prepared. The existing publication check supplies the final clean build; deployment receives only that artifact. Privacy names GitHub Pages only in the configured hosted build. Contact destinations remain unset. See [release instructions](github-pages-release.md) and [the reviewed publication candidates](publication-files.txt). New article filenames are ignored until explicitly reviewed; private drafts belong outside the collection loader.

The previously inspected official [MagicPath FAQ](https://www.magicpath.ai/documentation/help/faq) permits use of generated code, including commercial projects. That resolves the earlier uncertainty about the general generated-code permission; it does not grant a blanket licence for independently sourced third-party material or choose FRP's public source licence. Font notices now accompany local font files. The dated historical findings below should be read with these updates. No licensing research was repeated, and no references were changed.


## Limited beta update — 14 October 2026

The working website now self-hosts its three existing fonts through pinned Fontsource packages. Google Fonts imports have been removed from both working stylesheets; original reference material remains unchanged. Full SIL OFL 1.1 copyright/licence notices ship with the site; see [font notices](font-notices.md). The historical third-party-font-request finding below is superseded.

Privacy now describes temporary browser processing, local font delivery, external services, hosting limitations and contributions. Terms of Use has been added, with both pages linked from both site footers. The approved contact destination remains unset in [community configuration](../src/config/community.ts), and both policies disclose that gap. Hosting configuration, wider redistribution decisions and publication remain deferred; this update does not clear those release gates. The audit below records the earlier review, not a new audit of those decisions.

Reviewed 2026-10-13. **Do not publish yet: redistribution rights remain unresolved.** This is a proportionate source/build review, not a penetration test, legal opinion or guarantee against undiscovered vulnerabilities. No Git initialization, deployment, external account changes, dependency upgrades or design changes were made.

## PASS — verified protections

### Actual attack surface

| Capability | Production implementation |
| --- | --- |
| Runtime APIs / server endpoints | None. Astro `output: 'static'`, no server adapter or API routes; 11 HTML pages and 7 local CSS/JS assets in the inspected build. Node is a build/development dependency, not a public application server. |
| Payments, database, authentication, public uploads | None. No credentials or service integrations for these systems. |
| Analytics, advertising, external AI services, embeds | None identified in application source or rendered pages. |
| Cookies / persistent visitor profiles | No application cookie, localStorage, sessionStorage, IndexedDB or service-worker implementation. |
| Third-party requests | Google Fonts stylesheets (`fonts.googleapis.com`) and font files (`fonts.gstatic.com`). Project/source links are navigation links, not automatic downloads or live repository analysis. |
| Community submission | No FRP endpoint. Both approved-destination settings are null. GitHub Issue Forms are files prepared for future publication, not an active submission service. |

### Dependencies and build integrity

- Full `npm audit --json`, including development dependencies: **0 reported vulnerabilities** across 382 dependency entries. The sandbox could not reach npm initially; the authorized network-enabled audit succeeded. This is a point-in-time advisory check, not proof of supply-chain safety.
- Lockfile version 3; root dependency/devDependency declarations match the manifest. Every non-root entry has integrity metadata and all resolved package URLs use the npm registry. `npm ls --depth=0` reports the expected pinned versions without invalid top-level dependencies.
- No reinstall or tarball re-download was performed; installed package bytes were not independently authenticated. Use `npm ci` in the eventual clean release build, with the committed lockfile.
- The version-guarded Astro 7.3.8 template patch and explicit generated-type checks remain intact. It modifies the dependency's generator template, not generated declarations, and needs review before Astro upgrades. Do not auto-merge upgrades that invalidate it.

### Rendering, input and navigation

- Reader text is rendered through React text interpolation, not `innerHTML`, `dangerouslySetInnerHTML`, `set:html`, `eval` or generated code. Search is bounded by the 280-character input and searches only local published metadata. Pasted URLs are compared to known repository identities, never fetched or used as result destinations.
- Article metadata URLs require HTTPS; slugs permit only lowercase letters, numbers and hyphens. Current source links are editor-supplied. HTTPS validation does **not** prove a destination is official or safe. Repository matching checks the GitHub hostname; unknown URLs yield an honest empty state.
- Markdown is trusted, repository-controlled editorial input rendered at build time. Current article bodies contain no raw HTML. **It is not an untrusted-content sanitizer:** reviewers must inspect Markdown links and any future HTML; schema validation does not validate URLs inside the Markdown body. Contributions cannot publish themselves.
- Compatibility text inputs have length limits; numeric inputs have bounds and the comparison rejects non-finite/negative amounts. Unknown values remain unknown. OS versions, processor capability, graphics models and drivers are explicitly left for manual verification. Passing a numeric threshold is not presented as guaranteed compatibility.
- Missing search results, missing article context and unavailable contacts have explicit states. Copy-link has a manual-copy fallback when clipboard access fails. Current external links use ordinary navigation, without a new-window opener relationship. Add `rel="noopener noreferrer"` if future links deliberately open a new tab.
- All inspected production root-relative `href`/`src` paths resolve to output files or directories. No missing article destinations were found. External availability and every fragment/interactive transition were not re-tested in a browser during this audit.

### Privacy and community accuracy

- [Privacy page](../src/pages/privacy.astro) matches the source: temporary React state for searches/device answers, no FRP storage or submission of those inputs, user-triggered clipboard writing, and article-only fragment context. Browsers may retain a page in memory through navigation; this is not a persistent FRP profile.
- The page discloses Google Fonts, hosting-provider connection processing, and external navigation without promising control over third parties. The current referrer policy is `strict-origin-when-cross-origin`.
- [Contribution page](../src/pages/contribute.astro) clearly states submissions are not open, identifies public GitHub issue risks, and requires manual editorial review. [Issue Forms](../.github/ISSUE_TEMPLATE/) request sources and project affiliation without requesting private device reports. No automatic publishing workflow exists.
- Requirements allow explicit unknowns, record evidence and scope, and distinguish developer documentation from FRP hands-on testing. Articles disclaim benchmarks, security guarantees and automatic equivalence with products being replaced. Factual claims were not re-researched in this audit; existing cited source-review dates are retained.

### Publication hygiene

- All four archived source and six original screenshot hashes match their preservation manifests. References were not edited.
- Production output contains no reference folders, original screenshots, source maps, environment files, test fixtures, npm cache or development logs.
- A targeted scan of application source, scripts, tests, documentation, configuration, lockfile and output found no common credential/private-key patterns or owner-specific absolute paths. No root environment files were present. This scan is not a comprehensive secret-detection guarantee; private ignored folders were not cleared for publication.
- All six current articles are `published`. Prior finalization verified draft exclusion, labelled archives, withdrawal notices without private body/title content, and a clean 11-page build. **Website exclusion never makes a draft safe to commit to a public repository.**
- The magazine, discovery and compatibility guide use the single [articles collection](../src/content.config.ts); no duplicate manually maintained catalogue was introduced.

## BLOCKER — resolve before publication

1. **Owner: establish redistribution rights for the working design.** The retained provenance has no component-specific export licence. Confirm the applicable MagicPath export terms/account rights for the original and modified React/CSS, inline computer illustrations, flower motif, chrome/other graphics and any generated copy. Ignoring the original archive does not clear the working code for GitHub or deployment. Preserve the artwork while reviewing; accessibility of an asset is not permission.
2. **Owner: approve the public licence and attribution inventory.** Do not add a blanket licence covering material you cannot license. Record required notices for MagicPath-derived assets, dependency distribution and the exact Google Fonts families/versions (UnifrakturCook, Bricolage Grotesque, DM Sans). Fonts are remotely served today, not copied into this repository; self-hosting later requires retaining the appropriate font licence files. Current articles use short original explanations and source links, not copied READMEs; retain attribution and review any future excerpts/images individually. Public project names do not imply endorsement. Brand/name ownership clearance is an owner decision, not established by this technical audit.
3. **Owner: approve the exact first-publication file set.** Review every candidate file and any confidential/unpublished editorial material before the first push. No Git history exists yet; avoid creating history containing excluded material. Once published, changing status or deleting a file does not erase prior Git history.

Before deployment (distinct from making source public), select the hosting provider, confirm HTTPS and deployment permissions, and approve the resulting privacy/contact presentation. No operator identity, company, address, domain or hosting arrangement has been invented. Contact destinations can remain explicitly unavailable for the initial portfolio; enabling them requires actual approved details and manual-review ownership.

### Smallest publication strategy

Keep the existing [.gitignore](../.gitignore): it already excludes `reference/`, `FRP reference design/`, `.local/`, `.env`, `.env.*`, `node_modules/`, `dist/`, `.astro/` and `.npm-cache/`. No additional broad ignore rule is needed for the current file set.

When publication is separately approved, stage a reviewed allowlist: application source, package manifest/lockfile, build/type configuration, necessary scripts/tests, intended documentation and Issue Forms. Inspect the staged file list and diff before the first commit; do not force-add ignored folders or blindly stage the workspace. The workspace-only TypeScript settings contain relative paths and are optional to publish. Exclude any future host credentials, private keys, personal logs or editor workspace files if introduced.

Private drafts should live outside the public repository or in an explicitly ignored private area **outside the collection loader**, not merely use `status: draft` inside tracked content. There are no current drafts to relocate. Review the documented limitations before accepting outside content changes. Never run the `.local` seed/rewrite scripts as part of a release build.

Publish only clean `dist/` output to hosting, never the workspace root. Never expose the development/preview server as the public service. Missing routes and removed files must be removed from the deployed artifact too; use an atomic replacement rather than an accumulating upload.

## OPTIONAL — practical release controls and later improvements

- At repository creation, enable dependency graph/Dependabot alerts and security updates, plus secret scanning and push protection where available. Keep updates reviewable and preserve the Astro patch safeguard. Restrict who can write to the default branch; require successful checks before deployment. See [GitHub's repository-security guidance](https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository).
- Minimal future CI: a pinned supported Node version, `npm ci`, `npm run check`, `npm test`, `npm run test:publication` (already includes a final clean production build). Deploy that successful artifact only from the approved branch/tag. Default workflow token permissions to read-only; grant deployment permissions only to the trusted deploy job/environment. Do not give secrets/deploy credentials to untrusted pull-request code. Pin third-party Actions to reviewed commit SHAs. No workflow was installed before choosing a host.
- Keep the last known-good artifact/release identifier. Roll back by redeploying it or reverting the change and rebuilding with the lockfile. No database migration or profile recovery is involved.
- Once the host is selected, consider `X-Content-Type-Options: nosniff`, an explicit referrer policy, and framing protection through `frame-ancestors`. Scope any Permissions Policy to unused capabilities such as camera/microphone/geolocation, preserving clipboard behavior. Enable HSTS only after HTTPS and the domain/subdomain implications are understood.
- Test CSP in report-only mode before enforcing it. Account for local modules, Astro inline hydration scripts, dynamic inline styles, and the two Google Fonts origins. Prefer generated script hashes to blanket inline-script allowance. Reasonable starting restrictions include `object-src 'none'`, `base-uri 'self'` and a framing policy chosen for whether portfolio embedding is wanted. Header support depends on the eventual host; no unverified policy was added. CSP supplements, not replaces, editorial review.
- Optional self-hosted fonts could remove Google requests after licence verification; it is not needed to make the current disclosure truthful. Do not change the approved typography in this audit.
- Non-blocking documentation issue: README links to a Phase 2 verification document that does not currently exist. Existing publishing instructions and prior verification logs are available. Fix the link or add a short record during release preparation; it does not break the public website.

## NOT APPLICABLE — systems FRP does not operate

No payment/PCI controls, database access policies/backups, authentication/session hardening, password rules, upload scanning, API rate limits, server-side CSRF tokens, account recovery or model-service protections are needed for the current static architecture. Do not add a backend or paid monitoring merely to implement them. Reassess if the architecture actually changes.

## Verification limits and change record

This audit added this document only; no demonstrated release-blocking technical defect required an application fix. No dependencies, artwork, original references or unrelated projects were modified. The advisory audit, lock consistency check, production-path check and targeted sensitive-data scan were run during this review. Prior passing application/publication checks were reused; the production build was rerun after the documentation addition. No new browser framework or live-host header test was performed. Licensing approval, actual GitHub settings, public-host processing and enforcement remain outside what has been verified locally.
