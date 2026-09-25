import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const componentFiles = (await readdir(path.join(root, 'components')))
  .filter((file) => file.endsWith('.tsx'))
  .sort()
  .map((file) => path.join(root, 'components', file));
const files = [path.join(root, 'app', 'page.tsx'), ...componentFiles];

const sources = await Promise.all(
  files.map(async (file) => [file, await readFile(file, 'utf8')]),
);
const ids = new Map();
const anchors = [];

for (const [file, source] of sources) {
  const relative = path.relative(root, file);
  for (const match of source.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) {
    const line = source.slice(0, match.index).split('\n').length;
    const locations = ids.get(match[1]) ?? [];
    locations.push(`${relative}:${line}`);
    ids.set(match[1], locations);
  }
  for (const match of source.matchAll(/\bhref\s*[:=]\s*["']#([^"']+)["']/g)) {
    const line = source.slice(0, match.index).split('\n').length;
    anchors.push({ target: match[1], location: `${relative}:${line}` });
  }
}

const errors = [];
for (const [id, locations] of ids) {
  if (locations.length > 1) {
    errors.push(`duplicate id "${id}" (${locations.join(', ')})`);
  }
}
for (const { target, location } of anchors) {
  if (!ids.has(target)) {
    errors.push(`missing anchor target "#${target}" (${location})`);
  }
}

if (errors.length) {
  console.error(`FAIL: ${errors.join('; ')}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${ids.size} ids, ${anchors.length} internal anchors validated`);
}
