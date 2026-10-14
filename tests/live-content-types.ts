import type { ConstrainLiveData, ExtractLoaderTypes } from 'astro:content';
import type { LiveLoader } from 'astro/loaders';
import type { z } from 'astro/zod';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;
type Entry = { title: string; score: number };
type Inferred = ExtractLoaderTypes<LiveLoader<Entry, { id: string }, { category: string }, TypeError>>;
export type PreservesEntry = Assert<Equal<Inferred['data'], Entry>>;
export type PreservesEntryFilter = Assert<Equal<Inferred['entryFilter'], { id: string }>>;
export type PreservesCollectionFilter = Assert<Equal<Inferred['collectionFilter'], { category: string }>>;
export type PreservesError = Assert<Equal<Inferred['error'], TypeError>>;
export type PreservesDefaultFilters = Assert<Equal<ExtractLoaderTypes<LiveLoader<Entry>>['entryFilter'], never>>;
export type PreservesObjectSchema = Assert<Equal<ConstrainLiveData<z.infer<z.ZodObject<{ title: z.ZodString }>>>, { title: string }>>;
export type RejectsNonRecord = Assert<Equal<ConstrainLiveData<string>, never>>;
export type RejectsUnknown = Assert<Equal<ConstrainLiveData<unknown>, never>>;
