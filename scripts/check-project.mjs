import { readFile, readdir, access } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const required = ['SKILL.md', 'README.md', 'LICENSE', 'INSTALL.md', 'CONTRIBUTING.md',
  'docs/PRINCIPLES.md', 'docs/COMPATIBILITY.md', 'src/index.mjs', 'adapters/index.mjs'];
for (const file of required) {
  const content = await readFile(path.join(root, file), 'utf8');
  assert(content.trim().length > 0, `Empty required file: ${file}`);
}
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
assert.equal(pkg.name, 'fierte-ia-dz');
assert.equal(pkg.license, 'MIT');
for (const entry of Object.values(pkg.exports)) await import(pathToFileURL(path.join(root, entry)));
const skill = await readFile(path.join(root, 'SKILL.md'), 'utf8');
const front = skill.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
assert(front, 'Missing SKILL frontmatter');
assert.match(front[1], /^name: fierte-ia-dz$/m);
assert.match(front[1], /^description: .+/m);
// Deliberately a minimal project check, not a platform skill loader validator.
let links = 0;
async function checkLinks(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (item.name.startsWith('.') || item.name === 'node_modules') continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) await checkLinks(file);
    else if (item.name.endsWith('.md')) {
      const text = await readFile(file, 'utf8');
      for (const match of text.matchAll(/\]\(([^)\s]+)\)/g)) {
        const target = match[1].split('#')[0];
        if (!target || /^[a-z]+:/i.test(target)) continue;
        await access(path.resolve(dir, decodeURIComponent(target)));
        links++;
      }
    }
  }
}
await checkLinks(root);
console.log(`Project files, package exports, minimal skill frontmatter and ${links} local links verified.`);
