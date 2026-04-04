import fs from 'fs';
import path from 'path';

const root = process.cwd();
const budgetPath = process.argv[3] || path.join(root, 'config', 'perf-budgets.json');
const appManifestPath = path.join(root, '.next', 'app-build-manifest.json');
const buildManifestPath = path.join(root, '.next', 'build-manifest.json');

if (!fs.existsSync(appManifestPath) || !fs.existsSync(buildManifestPath)) {
  console.error('Next build manifests not found. Run `npm run build` before budget checks.');
  process.exit(1);
}

if (!fs.existsSync(budgetPath)) {
  console.error(`Budget config not found: ${budgetPath}`);
  process.exit(1);
}

const budgets = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));
const appManifest = JSON.parse(fs.readFileSync(appManifestPath, 'utf8'));
const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));

const sharedFiles = new Set(
  (buildManifest.rootMainFiles || []).filter((file) => file.endsWith('.js'))
);

function fileSizeKb(file) {
  const filePath = path.join(root, '.next', file);
  if (!fs.existsSync(filePath)) return 0;
  return fs.statSync(filePath).size / 1024;
}

const sharedJsKb = Array.from(sharedFiles).reduce((sum, file) => sum + fileSizeKb(file), 0);

const maxSharedJsKb = budgets.maxSharedJsKb ?? Number.POSITIVE_INFINITY;
const violations = [];
const seen = [];

if (sharedJsKb > maxSharedJsKb) {
  violations.push(
    `shared-js ${sharedJsKb.toFixed(1)}kB exceeds budget ${maxSharedJsKb}kB`
  );
}

for (const [pageKey, files] of Object.entries(appManifest.pages || {})) {
  if (!pageKey.endsWith('/page')) continue;

  const routePath =
    pageKey === '/page' ? '/' : pageKey.replace(/\/page$/, '');
  const jsFiles = files.filter((file) => file.endsWith('.js'));
  const routeExtraJsKb = jsFiles
    .filter((file) => !sharedFiles.has(file))
    .reduce((sum, file) => sum + fileSizeKb(file), 0);
  const estimatedFirstLoadKb = sharedJsKb + routeExtraJsKb;

  const routeBudget = budgets.routes?.[routePath] || {};
  const maxEstimatedFirstLoadKb =
    routeBudget.maxEstimatedFirstLoadKb ?? budgets.defaultMaxEstimatedFirstLoadKb;
  const maxRouteExtraJsKb =
    routeBudget.maxRouteExtraJsKb ?? budgets.defaultMaxRouteExtraJsKb;

  seen.push({
    route: routePath,
    routeExtraJsKb,
    estimatedFirstLoadKb,
    maxRouteExtraJsKb,
    maxEstimatedFirstLoadKb,
  });

  if (estimatedFirstLoadKb > maxEstimatedFirstLoadKb) {
    violations.push(
      `${routePath}: estimated-first-load ${estimatedFirstLoadKb.toFixed(1)}kB exceeds budget ${maxEstimatedFirstLoadKb}kB`
    );
  }

  if (routeExtraJsKb > maxRouteExtraJsKb) {
    violations.push(
      `${routePath}: route-extra-js ${routeExtraJsKb.toFixed(1)}kB exceeds budget ${maxRouteExtraJsKb}kB`
    );
  }
}

if (seen.length === 0) {
  console.error('No app routes parsed from manifest. Budget check failed.');
  process.exit(1);
}

console.log(`Parsed ${seen.length} app routes. Shared JS: ${sharedJsKb.toFixed(1)}kB`);

if (violations.length > 0) {
  console.error('Bundle budget violations found:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Bundle budget check passed.');
