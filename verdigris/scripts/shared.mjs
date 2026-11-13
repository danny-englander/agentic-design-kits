// Writes kit/shared/: one small file for each component and script that Verdigris takes from
// Swiss Minimal as it is, so a site imports everything from this package
// (`@agentic-design-kits/verdigris/astro/Hero.astro`, `@agentic-design-kits/verdigris/output.js`) and never names Swiss Minimal.
//
//   npm run shared           write the files (after a component or script is added or removed)
//   npm run shared:check     fail if they are out of date (CI runs this)
//
// A component Verdigris writes itself (kit/astro/*.astro, e.g. its BaseLayout) is skipped:
// package.json's exports name those directly. Swiss Minimal is this repository's root, so a
// component or script added there needs this run in the same change. It works from any folder
// (`npm run shared` at the repository's root runs it too).
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Everything below is relative to verdigris/, the folder above this script.
process.chdir(fileURLToPath(new URL('..', import.meta.url)));

const check = process.argv.includes('--check');
const require = createRequire(join(process.cwd(), 'package.json'));
const source = join(dirname(require.resolve('@agentic-design-kits/swiss-minimal/package.json')), 'kit');
const out = 'kit/shared';
const note = '// Written by scripts/shared.mjs (npm run shared). Do not edit.\n';

const files = new Map();
const own = new Set(readdirSync('kit/astro').filter((f) => f.endsWith('.astro')));
for (const f of readdirSync(join(source, 'astro')).filter((f) => f.endsWith('.astro')).sort()) {
  if (own.has(f)) continue;
  files.set('astro/' + f.replace(/\.astro$/, '.ts'), `${note}export { default } from '@agentic-design-kits/swiss-minimal/astro/${f}';\n`);
}
for (const f of readdirSync(source).filter((f) => f.endsWith('.js')).sort()) {
  // A script with exports passes them on; the others only need to run.
  const exports = /^export /m.test(readFileSync(join(source, f), 'utf8'));
  files.set(
    f.replace(/\.js$/, '.ts'),
    `${note}${exports ? 'export * from' : 'import'} '@agentic-design-kits/swiss-minimal/${f}';\n`,
  );
}

// Components go in astro/, apart from the scripts: Dialog.astro and dialog.js would otherwise
// want the same file name on a file system that ignores case.
const current = existsSync(out)
  ? readdirSync(out, { recursive: true }).filter((f) => f.endsWith('.ts')).map((f) => f.replaceAll('\\', '/'))
  : [];
const stale = [
  ...current.filter((f) => !files.has(f)),
  ...[...files].filter(([f, text]) => !current.includes(f) || readFileSync(join(out, f), 'utf8') !== text).map(([f]) => f),
];

if (check) {
  if (stale.length) {
    console.error(`kit/shared is out of date (${stale.join(', ')}). Run: npm run shared`);
    process.exit(1);
  }
  console.log(`kit/shared matches Swiss Minimal (${files.size} files).`);
} else {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(join(out, 'astro'), { recursive: true });
  for (const [f, text] of files) writeFileSync(join(out, f), text);
  console.log(`Wrote ${files.size} files to kit/shared.`);
}
