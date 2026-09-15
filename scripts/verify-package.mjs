#!/usr/bin/env node
// Checks that the tarball npm would actually publish contains every file
// package.json promises, and that the stylesheet carries the design tokens.
// Run after `npm run build`.
//
// Both failures this guards against shipped in 1.0.2 with a fully green
// pipeline: `types` pointed at a dist/index.d.ts nothing emitted, and the
// ./tokens.css export pointed at a file the build never produced. A build
// that succeeds is not evidence that the package works — only the packed
// artifact is.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const pkg = JSON.parse(readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

// Every relative path package.json points consumers at: main/module/types plus
// each leaf of the exports map, whatever shape it takes.
function declaredFiles(value, found = new Set()) {
  if (typeof value === 'string') {
    if (value.startsWith('./')) found.add(value.slice(2));
  } else if (value && typeof value === 'object') {
    for (const entry of Object.values(value)) declaredFiles(entry, found);
  }
  return found;
}

const declared = declaredFiles({
  main: pkg.main,
  module: pkg.module,
  types: pkg.types,
  exports: pkg.exports,
});

const packed = new Set(
  JSON.parse(
    execFileSync('npm', ['pack', '--dry-run', '--json'], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      maxBuffer: 100 * 1024 * 1024,
    }),
  )[0].files.map((file) => file.path),
);

const errors = [];

for (const file of [...declared].sort()) {
  if (!packed.has(file)) {
    errors.push(`package.json points at "./${file}", which the tarball does not contain`);
  }
}

// A stylesheet full of var(--ds-*) with no :root block defining them renders
// every component unstyled. Storybook imports src/tokens/tokens.css directly,
// so it never notices.
const stylesheet = 'dist/index.css';
if (packed.has(stylesheet)) {
  const css = readFileSync(path.join(repoRoot, stylesheet), 'utf8');
  const definitions = new Set(css.match(/--ds-[a-z0-9-]+\s*:/gi) ?? []).size;
  if (definitions === 0) {
    errors.push(`${stylesheet} uses design tokens but defines none — consumers would get unstyled components`);
  } else {
    console.log(`${stylesheet}: ${definitions} token definitions`);
  }
}

if (errors.length > 0) {
  console.error('\nThe package that would be published is broken:\n');
  for (const error of errors) console.error(`  - ${error}`);
  console.error('');
  process.exit(1);
}

console.log(`Package looks publishable: ${declared.size} declared entry points, ${packed.size} files packed.`);
