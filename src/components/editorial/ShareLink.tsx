import { useState } from 'react';
export function ShareLink() {
  const [message, setMessage] = useState('');
  const [fallback, setFallback] = useState('');
  return <div className="share-link"><button className="frp-cta" onClick={async () => {
    const url = location.origin + location.pathname;
    try { await navigator.clipboard.writeText(url); setMessage('Article link copied.'); }
    catch { setFallback(url); setMessage('Copy the link below.'); }
  }}>Copy article link ↗</button><span role="status">{message}</span>{fallback && <label>Shareable link<input readOnly value={fallback} onFocus={event => event.currentTarget.select()} /></label>}</div>;
}
