// Post-processes the prerendered HTML in dist/ (runs after react-snap).
//
// 1. Inlines the entry stylesheet so it is no longer a render-blocking request.
// 2. Removes analytics tags/preconnects that may have been injected into the DOM
//    while prerendering (GTM/gtag/Clarity). The deferred GTM loader in index.html
//    adds them at runtime, so keeping the baked copies loads every tag twice.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.html') ? [p] : [];
  });

const cssCache = new Map();
const readCss = (href) => {
  if (!cssCache.has(href)) {
    const file = path.join(DIST, href);
    cssCache.set(href, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null);
  }
  return cssCache.get(href);
};

const THIRD_PARTY_SCRIPT =
  /<script\b[^>]*\bsrc="https:\/\/(?:www\.googletagmanager\.com|scripts\.clarity\.ms|www\.clarity\.ms)[^"]*"[^>]*><\/script>/g;
const THIRD_PARTY_PRECONNECT =
  /<link\b(?=[^>]*\brel="preconnect")(?=[^>]*\bhref="https:\/\/(?:www\.googletagmanager\.com|www\.google-analytics\.com|[a-z]\.clarity\.ms|www\.clarity\.ms|scripts\.clarity\.ms)\/?")[^>]*>/g;
const STYLESHEET =
  /<link\b(?=[^>]*\brel="stylesheet")[^>]*\bhref="(\/assets\/index-[^"]+\.css)"[^>]*>/g;

let files = 0;
for (const file of walk(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const out = html
    .replace(THIRD_PARTY_SCRIPT, '')
    .replace(THIRD_PARTY_PRECONNECT, '')
    .replace(STYLESHEET, (tag, href) => {
      const css = readCss(href);
      // Vite's chunk preloader looks for link[href][rel=stylesheet] before
      // injecting CSS deps; the disabled placeholder satisfies that check (so
      // the stylesheet isn't re-added at runtime) without blocking render.
      return css
        ? `<style data-href="${href}">${css}</style><link rel="stylesheet" href="${href}" disabled>`
        : tag;
    });
  if (out !== html) {
    fs.writeFileSync(file, out);
    files++;
  }
}
console.log(`optimize-html: processed ${files} HTML file(s)`);
