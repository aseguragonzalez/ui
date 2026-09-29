#!/usr/bin/env node
// Builds a throwaway consumer that imports a single component from the built
// package and fails if unrelated components end up in its bundle. Run after
// `npm run build`.
//
// 1.0.4 shipped a dist/index.js that a consumer importing only a handful of
// components still pulled in whole (~63 kB of the library, charts and
// DataTable included): the build was one module, and every component's
// top-level forwardRef() call and displayName assignment counted as a side
// effect. The build output looks the same whether or not unused components
// can be dropped — only bundling a real consumer shows it.

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { build } from 'vite';

const repoRoot = process.cwd();

// What the fixture imports, and components it must not drag along with it.
// displayName strings survive minification, so they identify each component.
const IMPORTED = 'Button';
const MUST_BE_ABSENT = ['DataTable', 'Carousel', 'LineChart', 'Modal', 'TextField'];

// The fixture imports the package by name, resolved through package.json
// "exports" like a consumer's would be, so "sideEffects" applies.
const fixtureDir = mkdtempSync(path.join(tmpdir(), 'ui-tree-shaking-'));
const entry = path.join(fixtureDir, 'main.js');
writeFileSync(entry, `import { ${IMPORTED} } from '@aseguragonzalez/ui';\nconsole.log(${IMPORTED});\n`);

let code;
try {
  const result = await build({
    configFile: false,
    logLevel: 'silent',
    resolve: { alias: { '@aseguragonzalez/ui': repoRoot } },
    build: {
      write: false,
      minify: true,
      lib: { entry, formats: ['es'], fileName: 'main' },
      rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
    },
  });
  const outputs = (Array.isArray(result) ? result : [result]).flatMap((r) => r.output);
  code = outputs
    .filter((chunk) => chunk.type === 'chunk')
    .map((chunk) => chunk.code)
    .join('\n');
} finally {
  rmSync(fixtureDir, { recursive: true, force: true });
}

const errors = [];
if (!code.includes(`"${IMPORTED}"`)) {
  errors.push(`the fixture bundle does not contain ${IMPORTED} itself — the check is not measuring anything`);
}
for (const name of MUST_BE_ABSENT) {
  if (code.includes(`"${name}"`)) errors.push(`${name} is bundled although only ${IMPORTED} is imported`);
}

const size = `${(Buffer.byteLength(code) / 1024).toFixed(1)} kB`;

if (errors.length > 0) {
  console.error(`\nUnused components are not tree-shaken (fixture bundle: ${size}):\n`);
  for (const error of errors) console.error(`  - ${error}`);
  console.error('');
  process.exit(1);
}

console.log(`Tree-shaking works: importing only ${IMPORTED} bundles ${size}, without ${MUST_BE_ABSENT.join(', ')}.`);
