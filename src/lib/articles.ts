import { getCollection } from 'astro:content';
import { articleHref, hasPublicBody } from './publication';
import type { ArticleCard } from './editorial-schema';

export async function publicArticles() {
  return (await getCollection('articles')).filter(entry => hasPublicBody(entry.data)).sort((a,b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}
export async function articleCards(): Promise<ArticleCard[]> {
  return (await publicArticles()).map(({ id, data }) => ({ ...data, id, href: articleHref(data.slug) }));
}
