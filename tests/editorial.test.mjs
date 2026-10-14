import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { articleSchema } from '../src/lib/editorial-schema.ts';
import { searchArticles } from '../src/lib/discovery.ts';
import { compareRequirements, emptyDevice } from '../src/lib/compatibility.ts';
import { hasPublicBody, isDiscoverable } from '../src/lib/publication.ts';
const articles = readdirSync('src/content/articles').filter(f=>f.endsWith('.md')).map(file=>{
  const raw=JSON.parse(readFileSync('src/content/articles/'+file,'utf8').split(/^---\s*$/m)[1]);
  const data=articleSchema.parse(raw);return {...data,id:data.slug,href:'/articles/'+data.slug+'/'};
});
const shotcut=articles.find(a=>a.slug.startsWith('shotcut'));
test('all source entries validate; public software is evidenced',()=>{
  assert.ok(articles.length > 0);
  for(const article of articles.filter(a=>a.kind==='software')){assert.ok(article.requirements);assert.equal(Object.keys(article.reality).length,5);assert.ok(article.requirements.evidence.every(id=>article.sources.some(s=>s.id===id)));}
  assert.equal(articleSchema.safeParse({...shotcut,requirements:undefined}).success,false);
  assert.equal(articleSchema.safeParse({...shotcut,sources:[]}).success,false);
});
test('all five human prompts find useful articles; aliases, replacement, URL and empty states',()=>{
  for(const [query,slug] of [['I want to make videos with AI.','wan21'],['I saw a free video editor.','shotcut'],['I want AI voices for my videos.','coqui'],['Can I run AI on my computer?','ollama'],['I saw a cool project on GitHub.','github']])assert.ok(searchArticles(articles,query)[0]?.article.slug.startsWith(slug),query);
  for(const query of ['Shotcut','CapCut alternative','https://github.com/mltframework/shotcut','https://github.com/MLTFRAMEWORK/SHOTCUT.git?tab=readme-ov-file','https://github.com/mltframework/shotcut/releases'])assert.equal(searchArticles(articles,query,'name')[0]?.article.id,shotcut.id);
  for(const query of ['','  ','quantum toaster','https://github.com/unknown/unreviewed','https://github.com.evil.test/mltframework/shotcut'])assert.deepEqual(searchArticles(articles,query),[]);
});
test('drafts, withdrawn and archives cannot leak into discovery',()=>{
  for(const status of ['draft','withdrawn','archived']) {const entry={...shotcut,status};assert.equal(isDiscoverable(entry),false);assert.deepEqual(searchArticles([entry],'Shotcut'),[]);assert.equal(hasPublicBody(entry),status==='archived');}
});
test('unknown and incomplete device information cannot pass compatibility',()=>{
  const r=shotcut.requirements;
  assert.ok(compareRequirements(r,emptyDevice).every(f=>f.status==='unknown'));
  assert.equal(compareRequirements(r,{...emptyDevice,ram:'2'}).find(f=>f.label==='RAM').status,'mismatch');
  assert.equal(compareRequirements(r,{...emptyDevice,ram:'4'}).find(f=>f.label==='RAM').status,'checked');
  for(const ram of ['','NaN','-1','Infinity'])assert.equal(compareRequirements(r,{...emptyDevice,ram}).find(f=>f.label==='RAM').status,'unknown');
  assert.equal(compareRequirements(r,{...emptyDevice,os:'Windows',architecture:'x86'}).find(f=>f.label==='Architecture').status,'mismatch');
  assert.equal(compareRequirements(r,{...emptyDevice,os:'Other'}).find(f=>f.label==='Operating system').status,'unknown');
  const wan=articles.find(a=>a.slug.startsWith('wan21')).requirements;
  assert.equal(compareRequirements(wan,{...emptyDevice,vram:'8'}).find(f=>f.label==='Dedicated GPU memory').status,'mismatch');
  assert.equal(compareRequirements(wan,{...emptyDevice,vram:'12'}).find(f=>f.label==='Dedicated GPU memory').status,'checked');
  assert.ok(compareRequirements(r,{...emptyDevice,ram:'64',os:'Windows',architecture:'x64'}).some(f=>f.status==='unknown'));
});
