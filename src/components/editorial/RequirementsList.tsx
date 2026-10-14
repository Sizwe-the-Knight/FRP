import type { Requirements, ArticleData } from '../../lib/editorial-schema';
export function RequirementsList({ requirements: r, sources }: { requirements: Requirements; sources: ArticleData['sources'] }) {
  return <div className="requirements-list"><p><b>Scope:</b> {r.scope}</p><dl>
    <dt>Operating systems / architecture</dt><dd>{r.systems ? r.systems.map(s => <div key={s.os}>{s.os}: {s.versions}. {s.architectures?.join(' / ') ?? 'Architecture not verified'}.</div>) : 'Not verified'}</dd>
    <dt>Processor (CPU)</dt><dd>{r.cpu ?? 'Not verified'}</dd>
    <dt>Memory (RAM)</dt><dd>{r.ramGb ? `${r.ramGb} GB minimum for this scope` : 'No verified universal minimum'}</dd>
    <dt>Graphics (GPU)</dt><dd>{r.gpu?.description ?? 'Not verified'}{r.gpu?.minVramGb ? ` — ${r.gpu.minVramGb} GB documented video memory for this scope.` : ''}</dd>
    <dt>Free storage</dt><dd>{r.storageGb ? `${r.storageGb} GB minimum for this scope` : 'No verified fixed minimum'}</dd>
    <dt>Installation</dt><dd>{r.installation}</dd>
  </dl><ul>{r.limitations.map(line => <li key={line}>{line}</li>)}</ul><p>Requirements evidence: {sources.filter(s => r.evidence.includes(s.id)).map((s,i) => <span key={s.id}>{i > 0 && ' · '}<a href={s.url}>{s.title}</a> (checked {s.checked})</span>)}</p></div>;
}
