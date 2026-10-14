import type { ArticleCard } from './editorial-schema';
import { isDiscoverable } from './publication.ts';
const stop = new Set('i a an the to with for my on in of is it that this can want saw something cool project make run do how what and or me'.split(' '));
const synonyms: Record<string,string> = { videos:'video', voices:'voice', editing:'edit', editor:'edit', editors:'edit', locally:'local', computer:'local', computers:'local', generation:'generate', generator:'generate', alternative:'replace', alternatives:'replace', replacing:'replace', repositories:'repository', projects:'project' };
export function tokens(value: string) { return [...new Set(value.toLowerCase().replace(/[^a-z0-9]+/g,' ').split(' ').filter(t=>t && !stop.has(t)).map(t=>synonyms[t]??t))]; }
export function repositoryKey(value: string) {
  try { const url=new URL(value.startsWith('github.com/') ? 'https://'+value : value); if(url.protocol!=='https:' || !['github.com','www.github.com'].includes(url.hostname)) return null; const parts=url.pathname.split('/').filter(Boolean);return parts.length>=2 ? parts.slice(0,2).join('/').replace(/\.git$/,'').toLowerCase() : null; } catch { return null; }
}
export function searchArticles(articles: ArticleCard[], query: string, mode: 'name'|'description'='description') {
  const visible=articles.filter(isDiscoverable); const trimmed=query.trim();
  // A URL only matches a reviewed repository entry. Never fall back to broad keywords.
  if (/^(https?:\/\/|(?:www\.)?github\.com\/)/i.test(trimmed)) {
    const key=repositoryKey(trimmed); return key ? visible.filter(a=>a.repositoryUrl && repositoryKey(a.repositoryUrl)===key).map(article=>({article,score:100,reason:'Repository URL already in FRP'})) : [];
  }
  const terms=tokens(trimmed).filter(t=>t!=='replace'); if(!terms.length)return [];
  return visible.map(article=>{
    const fields:[string,number][]=[[article.title,7],[article.description,3],[article.categories.join(' '),5],[article.keywords.join(' '),6],[article.aliases.join(' '),mode==='name'?12:8],[article.replaces.join(' '),mode==='name'?12:8],[article.repositoryUrl??'',2]];
    const weighted=fields.map(([value,weight])=>({words:tokens(value),weight}));
    let matches=0; let score=0;
    for(const term of terms){const best=Math.max(0,...weighted.filter(field=>field.words.includes(term)).map(field=>field.weight));if(best){matches++;score+=best;}}
    const ratio=matches/terms.length;
    return {article,score:ratio>=.6?score*ratio:0,reason:'Matches reviewed article metadata'};
  }).filter(result=>result.score>0).sort((a,b)=>b.score-a.score || a.article.order-b.article.order || a.article.id.localeCompare(b.article.id)).slice(0,8);
}
