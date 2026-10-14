import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articleSchema } from './lib/editorial-schema';

// One collection. Magazine labels, search and requirements are views of these entries.
export const collections = {
  articles: defineCollection({ loader: glob({ base: './src/content/articles', pattern: '**/*.md' }), schema: articleSchema }),
};
