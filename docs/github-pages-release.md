# First GitHub Pages beta

No Git repository has been initialized and nothing has been pushed or deployed. Follow these steps only after the actual repository URL is supplied and public release is approved. Design and backend scope are unchanged.

Verified 14 October 2026: Astro checks and strict generated-type checks passed with zero diagnostics; all four editorial tests passed; publication verification passed and finished with a clean 12-page build. A test-only `https://example.invalid` origin and `/FRP/` base verified 191 internal/asset URLs, canonical URLs, local font URLs and production Privacy wording. These test values are not configured as a real destination. The local `dist/` currently contains that test build; never deploy it directly. The workflow rebuilds using the real variables. Browser rendering, live GitHub settings and the workflow's remote execution remain unverified. The initial concurrent check/build collided on Astro's cache; the sequential rerun passed, and the workflow is sequential.

## Configuration once the repository exists

In repository **Settings → Secrets and variables → Actions → Variables**, set:

| Variable | Value |
| --- | --- |
| `FRP_SITE` | Actual HTTPS origin, such as `https://<actual-owner>.github.io`, without a repository path. No example hostname is configured in source. |
| `FRP_BASE` | Exact case-sensitive repository path, including both slashes (for example `/FRP/` only if that is the actual repository name). Use `/` for an owner site or a custom domain at its root. |
| `FRP_PAGES_ENABLED` | Leave unset until ready; set to `true` to permit a manually requested deployment. |

The workflow sets `FRP_HOSTING=github-pages`; this switches Privacy to its production hosting disclosure. Local defaults remain `/`, no canonical URL, and preview wording. Configured builds generate canonical URLs with the base path. Copy-link already uses the current origin and pathname, so it preserves the project path and excludes query/device context.

Set `community.repository` in [community configuration](../src/config/community.ts) to the real HTTPS GitHub repository URL only once it exists and Issues are enabled. Set `community.alternative` only to an approved contact destination; otherwise policies honestly say direct contact is unavailable. No identity or email is invented. Terms has no unconfigured-host claim. Contact can remain unavailable for the beta, but private requests cannot then be accepted through this site.

## First safe commit (PowerShell, future actions only)

1. Review [the audit](prelaunch-audit.md), public redistribution/attribution decisions and [the exact candidate manifest](publication-files.txt). The manifest is a snapshot, not a secret-scanner guarantee. Inspect every listed file before publication; regenerate/review it if adding files. Keep original references, local evidence, environment files and private drafts out of Git. Current six source articles are published; do not put private content into an already allowlisted article.
2. Create an empty GitHub repository after approval (no auto-generated README or licence). Decide the public source licence without purporting to relicense third-party materials. Never force-add ignored files.
3. From the FRP workspace, run these commands only when ready to create the first local commit:

```powershell
git init -b main
git --literal-pathspecs add --pathspec-from-file=docs/publication-files.txt
git diff --cached --name-only
git diff --cached --check
git diff --cached
git status --short --ignored
```

Stop if the staged set contains private content, credentials, original references, drafts, logs or generated output. Verify that the intended files match the manifest. Then:

```powershell
git commit -m "Prepare FRP static editorial beta"
```

Adding a remote and pushing are separate publication actions; use the actual repository URL after approval. No remote or push is performed by this preparation. Preserve ignored files locally. New article filenames are ignored by default: review them before adding a specific exception in [.gitignore](../.gitignore). Keep private drafting in ignored `drafts/`, outside the content loader. Changing an existing tracked article to draft does not remove it from repository history.

## Enable Pages after the approved push

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. Do not select workspace/branch publishing.
2. Configure the variables above. Restrict the `github-pages` environment to `main` and restrict repository write access. Leave `FRP_PAGES_ENABLED` unset until the destination and content are reviewed.
3. Set the flag to `true`, then **Actions → FRP Pages → Run workflow → main**. There is no push trigger. The workflow uses read-only source access, Node 24.21.0, `npm ci`, existing Astro/type checks, editorial tests and publication verification. The latter finishes with a clean production build. Only successful `dist/` is uploaded; only the deploy job receives Pages/OIDC write permissions.
4. After deployment, confirm the actual Pages URL, article navigation, search, setup selection, local fonts, legal pages and copy links. In Pages settings enable/confirm **Enforce HTTPS** when available. No host settings can be verified before a repository exists.
5. Enable Dependabot alerts and secret scanning/push protection where available. To stop subsequent releases, unset the enable flag. For rollback, revert the faulty commit to the last known-good version and manually run the same verified workflow. No database recovery is needed.

The configuration follows [Astro's official GitHub Pages guidance](https://docs.astro.build/en/guides/deploy/github/), using explicit npm steps to retain FRP's existing checks and lockfile installation. New Markdown internal links should use relative destinations that resolve from the article URL; do not add host-root `/articles/...` links inside Markdown for a project-path deployment.
