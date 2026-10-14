import { withBase } from '../../lib/paths';
import React, { useEffect, useRef, useState } from 'react';
import './frp.css';
import './frp-refinements.css';
import { DiscoveryFinder } from './DiscoveryFinder';
import { Star, TechArt, Graphic } from './Artwork';
import { ArticleCard } from '../editorial/ArticleCard';
import type { ArticleCard as Card } from '../../lib/editorial-schema';
import '../../styles/editorial.css';
const questions = ['What does it actually do?', 'Is it genuinely free?', 'Will it work on my device?', 'How difficult is it?', 'What’s the catch?'];
const answers = ['A plain-language explanation of the job it helps you finish.', 'Free, open-source, free tier, or trial: we spell out the difference.', 'Operating systems, browsers, hardware needs, and offline support.', 'The first-step learning curve, without the technical gatekeeping.', 'Export limits, privacy trade-offs, hidden costs, and other deal-breakers.'];
export const FRPFreeRangePicksStreetFuturistZine = ({ articles }: { articles: Card[] }) => {
  const published=articles.filter(a=>a.status==='published');
  const featured=published.find(a=>a.featured) ?? published[0];
  const drops=published.filter(a=>a.sections.includes('Fresh Drops'));
  const current=published.filter(a=>a.sections.includes('The Current')).slice(0,2);
  const boiling=published.find(a=>a.sections.includes('Boiling Point'));
  const evaporated=published.find(a=>a.sections.includes('Evaporated'));
  const root = useRef<HTMLDivElement>(null),
    hero = useRef<HTMLElement>(null),
    rail = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false),
    [reduced, setReduced] = useState(false),
    [menu, setMenu] = useState(false),
    [port, setPort] = useState('USB-C'),
    [openCheck, setOpenCheck] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (paused || reduced) return;
    const items = root.current?.querySelectorAll('.frp-reveal');
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('arrived');
        e.target.classList.remove('waiting');
        obs.unobserve(e.target);
      }
    }), {
      threshold: .06
    });
    items?.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('waiting');
        obs.observe(el);
      }
    });
    return () => {
      obs.disconnect();
      items?.forEach(el => el.classList.remove('waiting'));
    };
  }, [paused, reduced]);
  useEffect(() => {
    if (paused || reduced) return;
    let frame = 0;
    const tick = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = hero.current?.getBoundingClientRect().top || 0;
        hero.current?.style.setProperty('--scroll', `${Math.max(-35, Math.min(35, -top * .045))}px`);
      });
    };
    window.addEventListener('scroll', tick, {
      passive: true
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', tick);
      hero.current?.style.setProperty('--scroll', '0px');
    };
  }, [paused, reduced]);
  const jump = (id: string) => {
    setMenu(false);
    const destination = document.getElementById(id);
    destination?.focus({ preventScroll: true });
    destination?.scrollIntoView({
      behavior: paused || reduced ? 'auto' : 'smooth'
    });
  };
  const pointer = (e: React.PointerEvent<HTMLElement>) => {
    if (paused || reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * .024}px`);
    e.currentTarget.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * .025}px`);
  };
  return <div ref={root} className={`frp ${paused || reduced ? 'still' : ''}`}><a className="frp-skip" href="#frp-main">Skip to content</a>
 <div className="frp-topline"><span>INDEPENDENT PICKS. UNLIMITED POSSIBILITIES.</span><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{reduced ? 'Reduced motion on' : paused ? '▶ Play motion' : 'Ⅱ Pause motion'}</button></div>
 <header className="frp-nav"><button className="frp-logo" onClick={() => jump('frp-main')} aria-label="FRP home">frp<span>®? NO.<br />FREE-RANGE PICKS.</span></button><nav className={menu ? 'show' : ''} aria-label="Main navigation"><a href={withBase("/explore/")}>Explore <span>↘</span></a><button onClick={() => jump('finder')}>Find my way <span>↗</span></button><a href={withBase("/setup/")}>Know my setup <span>⌁</span></a></nav><button className="underground-link" onClick={() => jump('underground')}>Off the beaten feed <span>✳</span></button><button className="frp-menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>Menu {menu ? '−' : '+'}</button></header>
 <main id="frp-main"><section className="frp-hero" ref={hero} onPointerMove={pointer} onPointerLeave={e => {
        e.currentTarget.style.setProperty('--mx', '0px');
        e.currentTarget.style.setProperty('--my', '0px');
      }}><div className="hero-gridlines" aria-hidden="true" /><div className="hero-type"><span className="frp-eyebrow"><i /> THE INTERNET HAS MORE TO OFFER.</span><h1><span className="chrome-type">Learn You</span><span className="bubble-type">Something<span className="headline-dot">.</span></span></h1><p className="frp-tagline">There's another way to do that.</p><p className="hero-description">The cool stuff you saw online, explained for the rest of us. Discover independent tools, open-source projects, and what's actually worth trying.</p><div className="hero-stamp">PICKED BY PEOPLE.<br />MADE FOR EVERYONE. <span>↗</span></div></div><div className="hero-collage"><span className="orbit-letter">ALT / CTRL / CREATE</span><div className="swoosh" /><div className="hero-art-layer"><TechArt /></div><div className="sticker sticker-one">GOOD FINDS.<br /><b>ZERO GATES.</b></div><div className="sticker sticker-two">OPEN<br />MINDS <span>✳</span></div><Star className="hero-star" /><span className="tiny-azul" aria-label="Azul accent">◆</span><span className="collage-caption">YOUR NEXT RABBIT HOLE STARTS HERE ↙</span></div>
</section>

 <section className="frp-routes primary-pathways" aria-labelledby="pathways-heading">
   <div className="route-intro"><h2 id="pathways-heading">THREE WAYS IN.</h2><p>No expert badge required. Follow your curiosity. ↙</p></div>
   <a className="route route-explore" href={withBase("/explore/")}><span className="route-number">01 — EXPLORE</span><h3>Just browsing.</h3><p>What's new, what's trending, what's actually worth checking out?</p><span className="route-glyph" aria-hidden="true">✳</span><b className="route-arrow" aria-hidden="true">↗</b></a>
   <a className="route route-find" href="#finder" onClick={e => { e.preventDefault(); jump('finder'); }}><span className="route-number">02 — FIND MY WAY</span><h3>I saw something...</h3><p>Found something on TikTok, Reddit or GitHub? Let's figure out what it is and how you can try it.</p><span className="route-glyph" aria-hidden="true">↝</span><b className="route-arrow" aria-hidden="true">↗</b></a>
   <a className="route route-setup" href={withBase("/setup/")}><span className="route-number">03 — KNOW MY SETUP</span><h3>Will my potato run it?</h3><p>Don't know your specs? Let's figure out what your computer can actually handle.</p><span className="route-glyph" aria-hidden="true">⌘</span><b className="route-arrow" aria-hidden="true">↗</b></a>
 </section>
 <div className="current-strip"><div className="ticker-track" aria-hidden="true">{[0, 1, 2, 3].map(i => <span key={i}>TAKE THE ALTERNATIVE ROUTE <b>✳</b> LESS HYPE. MORE POSSIBLE. <b>✳</b> STAY FREE-RANGE <b>↗</b></span>)}</div><span className="sr-only">Take the alternative route. Less hype. More possible. Stay free-range.</span></div>

 {featured && <section className="frp-feature frp-reveal" id="explore" tabIndex={-1}><div className="feature-art"><div className="feature-circle"/><span className="feature-tape">THE COVER STORY / EDITOR'S PICK</span><div className="feature-type" aria-hidden="true">MAKE<br/><em>more.</em><span>SPEND LESS.</span></div><Graphic kind={featured.art}/><div className="feature-corner">YOUR IDEAS<br/>AREN'T PAYWALLED.</div></div><div className="feature-copy"><span className="frp-eyebrow">FEATURED / {featured.categories[0]}</span><h2>{featured.title}</h2><p>{featured.description}</p><div className="story-meta"><span>{featured.author}</span><span>SOURCE-REVIEWED {featured.reviewed}</span></div><a className="frp-cta" href={featured.href}>Read the story ↗</a><span className="feature-scribble">Less friction. More making.</span></div></section>}
 <section className="frp-drops frp-reveal" id="drops"><div className="frp-section-heading"><div><span className="frp-eyebrow">FRESH SIGNAL. NO FILLER.</span><h2>Fresh <span className="bubble-heading">Drops<sup>✳</sup></span></h2></div><div className="rail-controls"><a href={withBase("/explore/")}>All editorial shelves ↗</a><button aria-label="Previous stories" onClick={()=>rail.current?.scrollBy({left:-370,behavior:paused||reduced?'auto':'smooth'})}>←</button><button aria-label="Next stories" onClick={()=>rail.current?.scrollBy({left:370,behavior:paused||reduced?'auto':'smooth'})}>→</button></div></div><div ref={rail} className="frp-story-rail" aria-label="Editorial story carousel" tabIndex={0}>{drops.map((article,index)=><ArticleCard key={article.id} article={article} index={index}/>)}</div></section>
 <section className="frp-pulse frp-reveal"><div className="current-block"><span className="frp-eyebrow">CURATED BY PEOPLE / THE CULTURE EDIT</span><h2>The <em>Current</em><span>↗</span></h2>{current.map((article,index)=><a key={article.id} href={article.href}><span>0{index+1}</span><div><h3>{article.title}</h3><p>{article.description}</p></div><b>↗</b></a>)}<a href={withBase("/explore/#the-reservoir")}>The Reservoir / evergreen reading ↗</a></div><a className="boiling-block" href={boiling?.href ?? withBase('/explore/#boiling-point')}><span className="hot-badge">HOT<br/>TAKE</span><span className="frp-eyebrow">BOILING POINT / OPINION</span><h2>{boiling?.title ?? 'A place for the bigger questions.'}</h2><span>{boiling?.description ?? 'No opinion piece published yet.'} ↗</span><Graphic kind="flame"/></a><a className="evaporated-block" href={evaporated?.href ?? withBase('/explore/#evaporated')}><span className="frp-eyebrow">EVAPORATED / HYPE REVISITED</span><h2>{evaporated?.title ?? 'After the hype. What remains?'}</h2><span>{evaporated?.description ?? 'No entries yet. This shelf is waiting for a properly sourced revisit.'} ↗</span><Graphic kind="evaporated"/></a></section>
 <DiscoveryFinder articles={published} />
 <section className="frp-reality frp-reveal" id="reality"><div className="reality-intro"><span className="frp-eyebrow">THE FRP SIGNATURE / NO MYSTERY FINE PRINT</span><h2>Reality<br /><em>Check.</em><span>✓</span></h2><p>A cool tool still has to work for you.<br />Five questions. Straight answers.</p><span className="reality-stamp">CURIOUS, NOT GULLIBLE.</span></div><div className="frp-checks">{questions.map((q, i) => <div className={openCheck === i ? 'check open' : 'check'} key={q}><button aria-expanded={openCheck === i} aria-controls={'check-' + i} onClick={() => setOpenCheck(openCheck === i ? -1 : i)}><span>0{i + 1}</span><b>{q}</b><span>{openCheck === i ? '−' : '+'}</span></button><div id={'check-' + i} hidden={openCheck !== i}><p>{answers[i]}</p></div></div>)}</div></section>
 <section className="frp-setup frp-reveal" id="setup" tabIndex={-1}><div className="setup-preview"><span className="frp-eyebrow">FIELD NOTES / KNOW MY SETUP</span><h2>Nice port.<br /><em>What does it do?</em></h2><p>Same shape doesn't mean the same thing.<br />Let's decode the side of your laptop.</p><div className="port-tabs" role="group" aria-label="Select a connection">{['USB-C', 'HDMI', 'Not sure'].map(p => <button onClick={() => setPort(p)} aria-pressed={port === p} key={p}><span className={p === 'USB-C' ? 'usb-port' : p === 'HDMI' ? 'hdmi-port' : 'unknown-port'}>{p === 'Not sure' ? '?' : ''}</span>{p}</button>)}</div><div className="port-answer" aria-live="polite"><b>{port === 'USB-C' ? 'One shape. A few different jobs.' : port === 'HDMI' ? 'Picture and sound, in one cable.' : 'Start with the model name.'}</b><p>{port === 'USB-C' ? 'Some USB-C ports carry video; others do not. Check your device specifications before choosing a display adapter.' : port === 'HDMI' ? 'Match the HDMI output on your computer to a supported input on your screen. Resolution and refresh-rate limits vary.' : 'Look for your device model in system settings, then check the manufacturer’s port guide. No guesswork needed.'}</p></div></div><div className="setup-visual"><span className="setup-badge">NO TECH<br />DEGREE<br />REQUIRED.</span><TechArt small /><span className="setup-annotation">← LITTLE PORT. BIG POSSIBILITIES.</span><a className="frp-cta" href={withBase("/setup/")}>Explore the field guide <span>↗</span></a></div></section>
 <section className="frp-underground frp-reveal" id="underground"><div><span className="frp-eyebrow">GOOD FINDS TRAVEL BY WORD OF MOUTH.</span><h2>From the<br /><em>Underground.</em></h2><p>The tiny project. The weirdly useful website. The tool your friend won't stop talking about. Make room for the finds outside the algorithm.</p><a className="frp-cta" href={withBase("/contribute/")}>Put us onto something <span>↗</span></a></div><div className="community-board"><div className="community-note note-one"><span>THE COMMUNITY WISHLIST</span><h3>“Something simple.<br />Something useful.<br />Something I can<br /><em>actually keep.”</em></h3><small>WHAT WE LOOK FOR IN A GOOD PICK</small></div><div className="community-note note-two"><span>OUR EDITORIAL PROMISE</span><b>You bring the find.<br />We bring the<br />Reality Check.</b><span className="note-star">✳</span></div><span className="community-caption">SMALL CORNERS. GOOD INTERNET.</span></div></section>
 </main><footer className="frp-footer"><div><span className="footer-wordmark">frp</span><p>FREE-RANGE PICKS.<br /><b>There's another way to do that.</b></p><button onClick={() => jump('frp-main')}>BACK TO TOP ↑</button></div><div className="footer-fine"><span>INDEPENDENT INTERNET CULTURE. OPEN TO EVERYONE.</span><span><a href={withBase("/privacy/")}>PRIVACY &amp; ASSET CREDITS</a> / <a href={withBase("/terms/")}>TERMS OF USE</a></span><span>STAY FREE-RANGE. ✳</span></div></footer>

 </div>;
};