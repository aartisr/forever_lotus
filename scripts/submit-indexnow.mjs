#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverlotus.com').replace(/\/+$/, '');
const endpoint = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const key = process.env.INDEXNOW_KEY?.trim();
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `${siteUrl}/indexnow-key.txt`;
const appDirectory = path.join(process.cwd(), 'src', 'app');
const insightsFile = path.join(process.cwd(), 'src', 'content', 'insights.ts');
const maxUrlsPerRequest = 10_000;

function absoluteUrl(value) {
  return new URL(value, siteUrl).toString();
}

function unique(values) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function isRouteGroup(segment) {
  return segment.startsWith('(') && segment.endsWith(')');
}

function isDynamicSegment(segment) {
  return segment.startsWith('[') && segment.endsWith(']');
}

function discoverStaticPaths() {
  const paths = [];

  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile() || !/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) continue;

      const segments = path
        .relative(appDirectory, path.dirname(fullPath))
        .split(path.sep)
        .filter(Boolean)
        .filter((segment) => !isRouteGroup(segment));

      if (segments.some((segment) => isDynamicSegment(segment) || segment.startsWith('_'))) continue;

      const route = segments.length === 0 ? '/' : `/${segments.join('/')}`;
      // Keep this aligned with src/config/discoverability.ts.
      if (route === '/awaricon/admin') continue;
      paths.push(route);
    }
  }

  walk(appDirectory);
  return paths;
}

function discoverInsightPaths() {
  try {
    const source = fs.readFileSync(insightsFile, 'utf8');
    return Array.from(source.matchAll(/slug:\s*'([^']+)'/g), (match) => `/insights/${match[1]}`);
  } catch {
    return [];
  }
}

function requestedUrls() {
  if (process.env.INDEXNOW_URLS) {
    return unique(process.env.INDEXNOW_URLS.split(',')).map(absoluteUrl);
  }

  return unique([...discoverStaticPaths(), ...discoverInsightPaths()]).map(absoluteUrl);
}

function batches(values, size) {
  return Array.from({ length: Math.ceil(values.length / size) }, (_, index) =>
    values.slice(index * size, (index + 1) * size)
  );
}

if (!key) {
  console.log('IndexNow skipped: INDEXNOW_KEY is not configured.');
  process.exit(0);
}

const urlList = requestedUrls();

if (urlList.length === 0) {
  console.log('IndexNow skipped: no URLs to submit.');
  process.exit(0);
}

let submitted = 0;
let failed = false;

for (const [index, urlBatch] of batches(urlList, maxUrlsPerRequest).entries()) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: new URL(siteUrl).hostname,
        key,
        keyLocation,
        urlList: urlBatch,
      }),
    });
    const body = await response.text();

    if (!response.ok) {
      failed = true;
      console.error(`IndexNow batch ${index + 1} failed: ${response.status} ${body.slice(0, 240)}`);
      continue;
    }

    submitted += urlBatch.length;
    console.log(`IndexNow accepted batch ${index + 1}: ${urlBatch.length} URL(s).`);
  } catch (error) {
    failed = true;
    console.error(`IndexNow batch ${index + 1} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

if (failed) {
  console.error(`IndexNow submitted ${submitted} of ${urlList.length} URL(s).`);
  process.exit(process.env.INDEXNOW_REQUIRED === '1' ? 1 : 0);
}

console.log(`IndexNow accepted all ${submitted} URL(s).`);
