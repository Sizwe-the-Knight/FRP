// Temporary, version-guarded correction to Astro's source generator template.
// Never edits .astro/content.d.ts. `astro sync` remains its sole generator.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const root = dirname(require.resolve('astro/package.json'));
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
if (version !== '7.3.8') throw new Error('Reassess the Astro live-loader template fix for version ' + version);
const path = join(root, 'templates/content/types.d.ts');
let source = readFileSync(path, 'utf8');
const edits = [
  ['infer TData,', 'infer TData extends Record<string, any>,'],
  ['infer TEntryFilter,', 'infer TEntryFilter extends Record<string, any> | never,'],
  ['infer TCollectionFilter,', 'infer TCollectionFilter extends Record<string, any> | never,'],
  ['infer TError\n', 'infer TError extends Error\n'],
  ["type LiveLoaderDataType<C extends keyof LiveContentConfig['collections']> =\n", "type ConstrainLiveData<T> = T extends Record<string, any> ? T : never;\n\ttype LiveLoaderDataType<C extends keyof LiveContentConfig['collections']> = ConstrainLiveData<\n"],
  ["Exclude<LiveContentConfig['collections'][C]['schema'], undefined>\n\t\t\t\t>;", "Exclude<LiveContentConfig['collections'][C]['schema'], undefined>\n\t\t\t\t>\n\t>;"],
];
for (const [before, after] of edits) {
  if (source.includes(after)) continue;
  if (source.split(before).length !== 2) throw new Error('Unexpected Astro template; refusing to patch: ' + before);
  source = source.replace(before, after);
}
writeFileSync(path, source);
console.log('Astro 7.3.8 live-loader template constraints applied. Run astro sync to regenerate.');
