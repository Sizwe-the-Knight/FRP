# Editing FRP without changing components

FRP has one [articles collection](../src/content/articles/). The magazine, homepage selections, search results and setup requirements all come from those files. No second catalogue needs updating.

## Add an article

1. Copy a similar Markdown file inside the articles folder. Use a lowercase filename with hyphens.
2. Change `slug` to a unique, permanent URL name, for example `my-useful-tool`. Its address will be `/articles/my-useful-tool/`. Keep this slug after publication even when you change the headline.
3. Set `status` to `draft` while researching. Drafts have no public route and are absent from search and browser metadata. This applies in local development too. Draft files still belong to the source tree: do not put secrets in them, especially before a future public GitHub release.
4. Edit the metadata between the two `---` lines. Existing entries use JSON syntax (also valid YAML frontmatter): keep double quotes, commas between fields, and no trailing comma. Below the second `---`, write the article in Markdown. `##` starts a section, and `[label](https://official.example/path)` creates a link.
5. Fill in your own explanation, creator attribution and official links. Check each source yourself and record its check date. Do not copy a README. Distinguish developer claims, your opinion and hands-on tests. The current examples are documentation reviews, not performance tests.
6. For software, supply all five `reality` answers and a `requirements` object. Unknown values should be `null`, never invented. See the requirements notes below.
7. Set `status` to `published` only when the entry is reviewed and complete. Update `reviewed` to the review date. The schema enforces structural completeness; it cannot establish whether a claim is true.
8. Stop the development server and run the checks below. Restart it to inspect the article, homepage, search and setup link. No deployment happens automatically.

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

For an end-to-end publication-status test, `npm.cmd run test:publication` creates temporary draft/archive/withdrawal fixtures, verifies built output, removes only those fixtures, and rebuilds the real site. Run it with the development server stopped.

## Choose where a story appears

`sections` can contain one or more of: Fresh Drops, The Current, Boiling Point, Evaporated, The Reservoir, From the Underground. These are editorial labels inside one collection. “Evaporated” is for sourced revisits, not an automatic claim that a project is dead. The Reservoir holds evergreen reading. Empty shelves remain honestly empty.

- Set `featured: true` for the homepage cover. If several are marked, the lowest `order` wins; if none are marked, the first published entry is used.
- Lower `order` values appear first. The homepage takes Fresh Drops entries, the first two Current entries and the first Boiling Point/Evaporated entry. The magazine lists every eligible entry under its assigned labels.
- Choose an existing `art` motif (`flower`, `folder`, `flame`, `evaporated`) and `color` (`pink`, `lime`, `orange`, `purple`). No new image download is needed.
- `categories`, `keywords`, `aliases`, `replaces` and `repositoryUrl` help discovery. `replaces` means a possible alternative to investigate, not proven feature equivalence. Search does not read remote repositories.

## Archive, withdraw or reorganize

| Status | Article URL | Magazine / discovery |
| --- | --- | --- |
| draft | Not generated | Excluded everywhere |
| published | Full article | Eligible for sections, homepage, search and setup |
| archived | Full article with historical notice | Archive shelf; excluded from search/homepage; setup warns that requirements are archived |
| withdrawn | Generic, noindex withdrawal notice | Excluded; body and title are not sent to visitors |

To archive, change `status` and add `archiveNote` explaining why it is historical. To withdraw, change only `status`; retain the slug so old links get an honest notice. Withdrawal is not deletion from a future repository's history. Never store confidential material in article files. To reorganize, edit labels and order; leave the slug stable. Do not delete an already published file unless you also plan its old URL's handling.

## Requirements: document what you know

Each software entry has one requirements profile with a clear `scope` (for example basic SD editing, not all resolutions). `systems` lists assessed OS families with a human-readable version note and documented architectures. A missing OS is **not** treated as proof that it is unsupported. Use `null` for an unknown list or architecture.

`cpu` is a documented text requirement. `ramGb`, `storageGb` and `gpu.minVramGb` are numeric minimums for that scope or `null`. `gpu.description` explains GPU type/API/driver context; the whole GPU field can be null. `installation` is one of desktop app, command line / Python, browser, unknown. Add meaningful `limitations` and cite source IDs in `evidence`; those IDs must occur in `sources`.

Do not put an installer-only storage number into a total-workload field. Do not combine system RAM, shared GPU memory and dedicated VRAM. If several operating systems have different numeric minimums, use an explicitly limited scope or leave the shared figure unknown instead of creating a misleading universal number.

The MVP compares numeric thresholds and listed architecture only. It displays OS version requirements for manual checking and does not interpret CPU/GPU model names or guarantee compatibility. All answers stay in browser memory; no device-model database exists.

## Contact options and publication boundary

Configure only owner-approved destinations in [community.ts](../src/config/community.ts). `repository` enables GitHub suggestion/correction links. `alternative` enables a labelled HTTPS contact page or mailto link for people without GitHub. Both are currently null; no address has been invented or published. [Issue forms](../.github/ISSUE_TEMPLATE/) are prepared but not live.

Keep submissions as suggestions until reviewed; nothing auto-publishes. Review licence/ownership claims and disclose conflicts. See [CONTRIBUTING](../CONTRIBUTING.md).

The original MagicPath source archive and screenshots remain excluded from deployment and future Git staging pending rights review. Only the generated `dist` output is deployable. Publishing remains a separate, explicitly approved phase.

## Maintenance

- Recheck official sources when a project changes; update the review date and limitations. Archive an entry you cannot keep current.
- The temporary `.local/phase2-content.mjs` was a one-time seed script. It is retained only as local history; **do not rerun it** because it overwrites articles. It is excluded from deployment and Git.
- Preserve the guarded Astro 7.3.8 type-template workaround and direct declaration checks. Follow [Phase 1.1 diagnostics notes](phase-1.1-verification.md) before upgrading Astro. Do not edit generated declarations.
