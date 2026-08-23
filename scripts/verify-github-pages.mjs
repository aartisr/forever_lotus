import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const pagesDirectory = 'github-pages';
const canonicalSite = 'https://foreverlotus.com';
const defaultPagesOrigin = 'https://aartisr.github.io/forever_lotus';
const htmlFiles = readdirSync(pagesDirectory).filter((file) => file.endsWith('.html')).sort();
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function pageUrl(file) {
  return file === 'index.html' ? defaultPagesOrigin + '/' : defaultPagesOrigin + '/' + file;
}

const sitemap = readFileSync(join(pagesDirectory, 'sitemap.xml'), 'utf8');
const robots = readFileSync(join(pagesDirectory, 'robots.txt'), 'utf8');
const indexNowKeyFiles = readdirSync(pagesDirectory).filter((file) => /^[a-z0-9-]{8,128}\.txt$/i.test(file));

expect(robots.includes(defaultPagesOrigin + '/sitemap.xml'), 'robots.txt must point crawlers to the deployed GitHub Pages sitemap.');
expect(indexNowKeyFiles.length === 1, 'github-pages/ must contain exactly one IndexNow key file named <key>.txt.');

for (const keyFile of indexNowKeyFiles) {
  const key = readFileSync(join(pagesDirectory, keyFile), 'utf8').trim();
  expect(keyFile === key + '.txt', keyFile + ' must contain its filename stem exactly for IndexNow verification.');
}

for (const file of htmlFiles) {
  const page = readFileSync(join(pagesDirectory, file), 'utf8');
  const h1Count = (page.match(/<h1(?:\s|>)/gi) ?? []).length;
  const hrefs = [...page.matchAll(/(?:href|src)="([^"]+)"/gi)].map((match) => match[1]);
  const isErrorPage = file === '404.html';

  expect(h1Count === 1, file + ' must contain exactly one <h1>; found ' + h1Count + '.');
  expect(/<meta\s+name="viewport"\s+content="[^"]+"/i.test(page), file + ' must include responsive viewport metadata.');
  expect(/<meta\s+name="description"\s+content="[^"]+"/i.test(page), file + ' must include a non-empty meta description.');
  expect(page.includes('<main'), file + ' must contain a <main> landmark.');
  expect(hrefs.includes('./styles.css'), file + ' must load the shared Pages stylesheet.');

  if (!isErrorPage) {
    expect(
      new RegExp('<link\\s+rel="canonical"\\s+href="' + pageUrl(file).replace(/[.*+?^$()|[\]\\]/g, '\\$&') + '"\\s*/?>', 'i').test(page),
      file + ' must self-canonicalize to its expected GitHub Pages URL.'
    );
    expect(page.includes(canonicalSite), file + ' must link readers to the Forever Lotus canonical site.');
    expect(sitemap.includes('<loc>' + pageUrl(file) + '</loc>'), file + ' must be listed in sitemap.xml.');
  }

  for (const href of hrefs) {
    if (!href.startsWith('./') || href === './') continue;
    const localTarget = href.slice(2).split('#')[0];
    expect(existsSync(join(pagesDirectory, localTarget)), file + ' references missing local asset or page: ' + href);
  }
}

if (errors.length) {
  console.error('GitHub Pages verification failed:\n');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

console.log('GitHub Pages verification passed: ' + htmlFiles.length + ' HTML pages, crawl assets, headings, canonical links, and sitemap entries are valid.');
