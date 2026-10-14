import { z } from 'astro/zod';

export const sections = ['Fresh Drops', 'The Current', 'Boiling Point', 'Evaporated', 'The Reservoir', 'From the Underground'] as const;
const text = z.string().trim().min(1);
const https = z.url({ protocol: /^https$/ }).refine(value => value.startsWith('https://'), 'Use an official HTTPS URL');
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => !Number.isNaN(Date.parse(value)), 'Use YYYY-MM-DD');
export const requirementsSchema = z.object({
  scope: text,
  systems: z.array(z.object({ os: z.enum(['Windows', 'macOS', 'Linux']), versions: text, architectures: z.array(z.enum(['x64', 'arm64'])).min(1).nullable() })).min(1).nullable(),
  cpu: text.nullable(), ramGb: z.number().positive().nullable(),
  gpu: z.object({ description: text, minVramGb: z.number().positive().nullable() }).nullable(),
  storageGb: z.number().positive().nullable(),
  installation: z.enum(['desktop app', 'command line / Python', 'browser', 'unknown']),
  limitations: z.array(text).min(1), evidence: z.array(text).min(1),
});
export const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: text, description: text, kind: z.enum(['software', 'guide', 'editorial']),
  status: z.enum(['draft', 'published', 'archived', 'withdrawn']).default('draft'),
  sections: z.array(z.enum(sections)).min(1), categories: z.array(text).min(1),
  keywords: z.array(text).default([]), aliases: z.array(text).default([]), replaces: z.array(text).default([]),
  featured: z.boolean().default(false), order: z.number().int().default(100),
  art: z.enum(['flower', 'folder', 'flame', 'evaporated']).default('flower'),
  color: z.enum(['pink', 'lime', 'orange', 'purple']).default('pink'),
  author: text, reviewed: date.nullable().default(null),
  creator: z.object({ name: text, url: https }).optional(),
  officialUrl: https.optional(), repositoryUrl: https.refine(value => /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(value), 'Use the repository root URL').optional(),
  docsUrl: https.optional(), githubGuide: z.boolean().default(false),
  sources: z.array(z.object({ id: text, title: text, url: https, checked: date })),
  reality: z.object({ does: text, free: text, device: text, difficulty: text, catch: text }).optional(),
  requirements: requirementsSchema.optional(), archiveNote: text.optional(),
}).superRefine((article, ctx) => {
  const publicArticle = article.status === 'published' || article.status === 'archived';
  const issue = (message: string) => ctx.addIssue({ code: 'custom', message });
  if (publicArticle && (!article.reviewed || !article.sources.length)) issue('Public articles need a review date and verified sources.');
  if (article.status === 'archived' && !article.archiveNote) issue('Archived articles need an archiveNote.');
  if (publicArticle && article.kind === 'software' && (!article.requirements || !article.reality || !article.creator || !article.officialUrl || !article.repositoryUrl || !article.docsUrl)) issue('Software articles need requirements, all five Reality Checks, creator and official/repository/documentation links.');
  const ids = new Set(article.sources.map(source => source.id));
  if (ids.size !== article.sources.length) issue('Source IDs must be unique.');
  for (const id of article.requirements?.evidence ?? []) if (!ids.has(id)) issue('Unknown requirements evidence source: ' + id);
});
export type ArticleData = z.infer<typeof articleSchema>;
export type Requirements = z.infer<typeof requirementsSchema>;
export type ArticleCard = ArticleData & { id: string; href: string };
