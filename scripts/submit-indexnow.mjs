#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverlotus.com').replace(/\/+$/, '');
const endpoint = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const key = process.env.INDEXNOW_KEY?.trim();
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `${siteUrl}/indexnow-key.txt`;

const staticPaths = [
  '/',
  '/about',
  '/manifesto',
  '/philosophy',
  '/research',
  '/insights',
  '/insights/indexing',
  '/insights/indexing/portfolio',
  '/growth',
  '/ecosystem',
  '/backlinks',
  '/onboarding-websites',
  '/evaluate',
  '/awaricon',
  '/awaricon/apply',
  '/awaricon/badge-generator',
  '/awaricon/compliance',
  '/awaricon/legal',
  '/contact',
];

function absoluteUrl(value) {
  return new URL(value, siteUrl).toString();
}

function unique(values) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function readInsightPaths() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'insights.ts');

  try {
    const source = fs.readFileSync(filePath, 'utf8');
    return Array.from(source.matchAll(/slug:\s*'([^']+)'/g)).map((match) => `/insights/${match[1]}`);
  } catch {
    return [];
  }
}

function requestedUrls() {
  if (process.env.INDEXNOW_URLS) {
    return unique(process.env.INDEXNOW_URLS.split(',')).map(absoluteUrl);
  }

  return unique([...staticPaths, ...readInsightPaths()]).map(absoluteUrl);
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

const payload = {
  host: new URL(siteUrl).hostname,
  key,
  keyLocation,
  urlList,
};

try {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const body = await response.text();

  if (!response.ok) {
    console.error(`IndexNow failed: ${response.status} ${body.slice(0, 240)}`);
    process.exit(process.env.INDEXNOW_REQUIRED === '1' ? 1 : 0);
  }

  console.log(`IndexNow accepted ${urlList.length} URL(s).`);
} catch (error) {
  console.error(`IndexNow request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  process.exit(process.env.INDEXNOW_REQUIRED === '1' ? 1 : 0);
}
