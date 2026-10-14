import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.FRP_SITE || undefined;
const base = process.env.FRP_BASE || '/';
if (site) {
  const url = new URL(site);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) throw new Error('FRP_SITE must be an HTTPS origin, without a repository path or credentials.');
}
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(base) || base.split('/').some(part => part === '.' || part === '..')) throw new Error('FRP_BASE must be / or a path such as /FRP/, including the final slash.');
if (process.env.FRP_HOSTING === 'github-pages' && !site) throw new Error('GitHub Pages requires FRP_SITE.');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  integrations: [react()],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: { ignored: ['**/.local/**', '**/.npm-cache/**', '**/reference/**', '**/FRP reference design/**'] },
    },
  },
});
