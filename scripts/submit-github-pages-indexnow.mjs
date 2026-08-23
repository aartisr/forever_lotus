#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const pagesDirectory = join(process.cwd(), 'github-pages');
const siteUrl = (process.env.GITHUB_PAGES_SITE_URL || 'https://aartisr.github.io/forever_lotus').replace(/\/+$/, '');
const endpoint = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const maxUrlsPerRequest = 10_000;

function unique(values) {
  return [...new Set(values)];
}

function discoverKey() {
  const keyFile = readdirSync(pagesDirectory).find((file) => /^[a-z0-9-]{8,128}\.txt$/i.test(file));
  if (!keyFile) throw new Error('No IndexNow key file was found in github-pages/.');

  const key = readFileSync(join(pagesDirectory, keyFile), 'utf8').trim();
  if (!/^[a-z0-9-]{8,128}$/i.test(key) || keyFile !== `${key}.txt`) {
    throw new Error(`IndexNow key file ${keyFile} must contain its filename stem exactly.`);
  }
  return { key, keyLocation: `${siteUrl}/${keyFile}` };
}

function sitemapUrls() {
  const sitemap = readFileSync(join(pagesDirectory, 'sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) => match[1]);
  const site = new URL(siteUrl);
  const sitePathPrefix = site.pathname === '/' ? '/' : `${site.pathname.replace(/\/+$/, '')}/`;
  const invalid = urls.find((url) => {
    const parsed = new URL(url);
    return parsed.hostname !== site.hostname || !parsed.pathname.startsWith(sitePathPrefix);
  });
  if (invalid) throw new Error(`Sitemap URL is not on the GitHub Pages host: ${invalid}`);
  if (!urls.length) throw new Error('No URLs were found in github-pages/sitemap.xml.');
  return unique(urls);
}

function batches(values) {
  return Array.from({ length: Math.ceil(values.length / maxUrlsPerRequest) }, (_, index) =>
    values.slice(index * maxUrlsPerRequest, (index + 1) * maxUrlsPerRequest)
  );
}

try {
  const { key, keyLocation } = discoverKey();
  const urlList = sitemapUrls();
  const host = new URL(siteUrl).hostname;

  for (const [index, batch] of batches(urlList).entries()) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
    });
    const body = await response.text();
    if (!response.ok) throw new Error(`IndexNow batch ${index + 1} failed: ${response.status} ${body.slice(0, 240)}`);
    console.log(`IndexNow accepted GitHub Pages batch ${index + 1}: ${batch.length} URL(s).`);
  }
} catch (error) {
  console.error(`GitHub Pages IndexNow submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  process.exit(1);
}
