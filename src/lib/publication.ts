import type { ArticleData } from './editorial-schema';
import { withBase } from './paths.ts';
export const hasPublicBody = (article: ArticleData) => article.status === 'published' || article.status === 'archived';
export const isDiscoverable = (article: ArticleData) => article.status === 'published';
export const articleHref = (slug: string) => withBase('/articles/' + slug + '/');
