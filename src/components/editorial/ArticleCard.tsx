import type { ArticleCard as Card } from '../../lib/editorial-schema';
import { Graphic } from '../frp/Artwork';
export function ArticleCard({ article, index=0 }: { article: Card; index?: number }) {
  return <a href={article.href} className={`frp-story ${article.color}`}><div className="story-illustration"><span className="story-category">{article.sections[0]}</span><Graphic kind={article.art}/><span className="story-index">{String(index+1).padStart(2,'0')}</span></div><div className="story-body"><span className="frp-eyebrow">{article.status === 'archived' ? 'ARCHIVED / ' : ''}{article.kind} / {article.categories[0]}</span><h3>{article.title}</h3><p>{article.description}</p><span className="story-bottom">{article.kind === 'software' ? 'Reality Check inside' : 'Read the story'} <b>↗</b></span></div></a>;
}
