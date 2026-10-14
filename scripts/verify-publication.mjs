// End-to-end status checks against actual built HTML, using disposable entries.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const fixtures=['draft','archived','withdrawn'];const created=[];
const build=()=>{const result=process.platform==='win32' ? spawnSync(process.env.ComSpec || 'cmd.exe',['/d','/s','/c','npm.cmd run build'],{encoding:'utf8'}) : spawnSync('npm',['run','build'],{encoding:'utf8'});if(result.status!==0)throw Error(result.stdout+'\n'+result.stderr);return result.stdout;};
const files=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);
mkdirSync('.local',{recursive:true});
try {
 for(const status of fixtures){const slug='verification-only-'+status;const path='src/content/articles/'+slug+'.md';if(existsSync(path))throw Error('Refusing to overwrite '+path);
 const data={slug,title:'PRIVATE_TITLE_'+status,description:'PRIVATE_DESCRIPTION_'+status,kind:'guide',status,sections:['The Reservoir'],categories:['Verification'],author:'Test fixture',reviewed:'2026-10-13',sources:[{id:'official',title:'Astro documentation',url:'https://docs.astro.build/',checked:'2026-10-13'}],...(status==='archived'?{archiveNote:'Historical verification fixture.'}:{})};
 writeFileSync(path,'---\n'+JSON.stringify(data)+'\n---\n\nPRIVATE_BODY_'+status);created.push(path);}
 writeFileSync('.local/publication-fixture-build.log',build());
 const home=readFileSync('dist/index.html','utf8');
 for(const status of fixtures)assert.ok(!home.includes('PRIVATE_TITLE_'+status));
 assert.equal(existsSync('dist/articles/verification-only-draft/index.html'),false);
 const archived=readFileSync('dist/articles/verification-only-archived/index.html','utf8');assert.ok(archived.includes('PRIVATE_BODY_archived'));assert.ok(archived.includes('Archived'));
 const withdrawn=readFileSync('dist/articles/verification-only-withdrawn/index.html','utf8');assert.ok(withdrawn.includes('Article withdrawn.'));assert.ok(withdrawn.includes('noindex'));
 const output=files('dist').map(f=>readFileSync(f,'utf8')).join('\n');for(const status of ['draft','withdrawn']){assert.ok(!output.includes('PRIVATE_BODY_'+status));assert.ok(!output.includes('PRIVATE_TITLE_'+status));}
 console.log('Actual build: draft excluded; archive retained and labelled; withdrawal tombstone contains no private title/body.');
} finally { for(const path of created)unlinkSync(path);writeFileSync('.local/publication-clean-build.log',build()); }
