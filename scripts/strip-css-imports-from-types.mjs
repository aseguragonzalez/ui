#!/usr/bin/env node
// Removes CSS side-effect imports from the emitted declaration files.
//
// src/index.ts imports tokens.css and base.css so Vite bundles them into
// dist/index.css. tsc faithfully copies those imports into dist/index.d.ts,
// where they are worse than useless: a .css file carries no types, and the
// relative paths they point at (dist/tokens/*.css) are not part of the
// published layout. A consumer compiling with skipLibCheck disabled and
// noUncheckedSideEffectImports enabled then fails on our declarations:
//
//   error TS2307: Cannot find module './tokens/tokens.css'
//
// The stylesheet still reaches consumers through dist/index.css and the
// ./index.css export; only the untyped import statement is dropped.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const typesDir = path.join(process.cwd(), 'dist');
const CSS_IMPORT = /^\s*import\s+['"][^'"]+\.css['"];?\s*$\n?/gm;

function* declarationFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* declarationFiles(full);
    else if (entry.name.endsWith('.d.ts')) yield full;
  }
}

let stripped = 0;
for (const file of declarationFiles(typesDir)) {
  const before = readFileSync(file, 'utf8');
  const after = before.replace(CSS_IMPORT, '');
  if (after !== before) {
    writeFileSync(file, after);
    stripped += 1;
  }
}

console.log(`Stripped CSS side-effect imports from ${stripped} declaration file(s).`);
