import { withBase } from '../../lib/paths';
import { useRef, useState } from 'react';
import type { ArticleCard } from '../../lib/editorial-schema';
import { searchArticles } from '../../lib/discovery';
const examples=['I want to make videos with AI.','I saw a free video editor.','I want AI voices for my videos.','Can I run AI on my computer?','I saw a cool project on GitHub.'];
export function DiscoveryFinder({ articles }: { articles: ArticleCard[] }) {
  const [mode,setMode]=useState<'name'|'description'>('name');
  const [query,setQuery]=useState('');
  const [submitted,setSubmitted]=useState<{query:string;mode:'name'|'description'}|null>(null);
  const input=useRef<HTMLTextAreaElement>(null);
  const results=submitted ? searchArticles(articles,submitted.query,submitted.mode) : [];
  return <section id="finder" className="frp-discovery frp-reveal" aria-labelledby="finder-heading" tabIndex={-1}>
    <div className="discovery-intro"><span className="frp-eyebrow">02 / FIND MY WAY</span><h2 id="finder-heading">Saw something <em>cool?</em></h2><p>You don't need to know the technical name. Tell us what you remember.</p><span className="discovery-sticker" aria-hidden="true">LESS JARGON.<br/><b>MORE “OH!”</b> ↗</span><p className="discovery-note">A name, a GitHub project, a Reddit thread, a half-remembered TikTok. Start wherever you are.</p></div>
    <form className="frp-finder discovery-form" onSubmit={event=>{event.preventDefault();if(!query.trim()){input.current?.setCustomValidity('Tell us a little about what you saw.');input.current?.reportValidity();return;}setSubmitted({query:query.trim(),mode});}}>
      <fieldset className="discovery-routes"><legend>How do you want to start?</legend>{([['name','A name or an alternative'],['description','Describe what you saw']] as const).map(([value,label])=><label key={value}><input type="radio" name="discovery-route" checked={mode===value} onChange={()=>{setMode(value);setSubmitted(null);}}/><span>{label}</span></label>)}</fieldset>
      <label className="discovery-query"><span>{mode==='name'?'Tool, project, product to replace, or GitHub URL':'What could it do? What do you remember?'}</span><textarea ref={input} required maxLength={280} rows={2} value={query} aria-describedby="discovery-note" placeholder={mode==='name'?'Shotcut, CapCut, or https://github.com/…':'A tool that makes voices from text…'} onChange={event=>{setQuery(event.target.value);setSubmitted(null);event.target.setCustomValidity('');}}/></label>
      <div className="discovery-examples" aria-label="Example queries"><span>TRY A STARTING POINT ↘</span>{examples.map(example=><button key={example} type="button" onClick={()=>{setQuery(example);setMode('description');input.current?.setCustomValidity('');setSubmitted({query:example,mode:'description'});}}>{example}</button>)}</div>
      <div className="discovery-submit"><button className="frp-cta" type="submit">Find articles <span>↗</span></button><p id="discovery-note">Search FRP's published articles. No live web search or repository analysis.</p></div>
      <p className="small-note">Device questions can wait. Open an article's setup link when you're ready.</p>
      <div className="finder-result" aria-live="polite" aria-atomic="true">{submitted && <><p><b>{results.length ? `${results.length} article${results.length===1?'':'s'} found` : 'No relevant article yet.'}</b> for “{submitted.query}”</p>{results.length ? <ul className="search-results">{results.map(({article,reason})=><li key={article.id}><a href={article.href}><h3>{article.title} ↗</h3></a><p>{article.description}</p><small>{reason}. Check the article's Reality Check; a match is not an endorsement or a compatibility result.</small></li>)}</ul> : <p>FRP only searches its small reviewed collection. A pasted URL cannot fetch a new project. <a href={withBase("/contribute/")}>Suggest this discovery ↗</a></p>}</>}</div>
    </form>
  </section>;
}
