// Packs each kit into the file that is published to npm: swiss-minimal.tgz
// (@agentic-design-kits/swiss-minimal) and verdigris.tgz (@agentic-design-kits/verdigris). The
// release script attaches both to the GitHub Release, and the Publish workflow
// (.github/workflows/publish.yml) packs them again from the tag and publishes them to npm. See
// "Releases" in TOOLING.md.
//   npm run pack -- --tag v2026.11.10            writes both files to ./packed
//   npm run pack -- --tag v2026.11.10 --out dir  writes them somewhere else
//
// Each file holds what the kit's package.json lists under "files", plus its README and the
// license. The version is the release's date, and Verdigris's copy depends on the Swiss Minimal
// of the same release, so one install brings both. To try the files in a site before they are
// published, install both at once: npm install ./swiss-minimal.tgz ./verdigris.tgz
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const swissMinimal = '@agentic-design-kits/swiss-minimal';

/** Each kit's file name, and its folder in the repository. */
const kits = [
  { file: 'swiss-minimal', dir: '.' },
  { file: 'verdigris', dir: 'verdigris' },
];

/**
 * A release tag as a package version: v2026.11.08 is 2026.1108.0, and v2026.11.08.2 (a second
 * release that day) is 2026.1108.1. Month and day share the middle number, so the last one can
 * count the day's releases: npm takes three numbers, and reads anything after a hyphen as
 * coming before the plain version, not after it.
 */
export function versionFor(tag: string): string {
  const [year, month, day, nth = 1] = tag.replace(/^v/, '').split('.').map(Number);
  if (![year, month, day, nth].every(Number.isInteger) || nth < 1) throw new Error(`Not a release tag: ${tag}`);
  return `${year}.${month * 100 + day}.${nth - 1}`;
}

/** Writes swiss-minimal.tgz and verdigris.tgz for the release `tag` into `out`, and returns their paths. */
export function packKits(tag: string, out: string): string[] {
  const version = versionFor(tag);
  mkdirSync(out, { recursive: true });
  return kits.map(({ file, dir }) => {
    const from = join(repoRoot, dir);
    const stage = mkdtempSync(join(tmpdir(), `pack-${file}-`));
    try {
      const pkg = JSON.parse(readFileSync(join(from, 'package.json'), 'utf8'));
      for (const entry of pkg.files) cpSync(join(from, entry), join(stage, entry), { recursive: true });
      cpSync(join(from, 'README.md'), join(stage, 'README.md'));
      cpSync(join(repoRoot, 'LICENSE'), join(stage, 'LICENSE'));
      // What only makes sense inside the repository stays out of the packed package.json.
      // "private" is there so that `npm publish` in the repository itself is refused.
      delete pkg.private;
      delete pkg.workspaces;
      delete pkg.scripts;
      pkg.version = version;
      // In the repository this is a link to the folder above; a site gets the same release.
      if (pkg.dependencies?.[swissMinimal]) pkg.dependencies[swissMinimal] = version;
      writeFileSync(join(stage, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
      const packed = execFileSync('npm', ['pack', '--silent', '--pack-destination', stage], { cwd: stage, encoding: 'utf8' }).trim();
      const path = join(out, `${file}.tgz`);
      renameSync(join(stage, packed), path);
      return path;
    } finally {
      rmSync(stage, { recursive: true, force: true });
    }
  });
}

// Run on its own: `npm run pack -- --tag v2026.11.10`.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = (name: string) => {
    const i = process.argv.indexOf(name);
    return i === -1 ? undefined : process.argv[i + 1];
  };
  const tag = arg('--tag');
  if (!tag) {
    console.error('Give the release tag the files are for: npm run pack -- --tag v2026.11.10');
    process.exit(1);
  }
  const out = resolve(arg('--out') ?? join(repoRoot, 'packed'));
  for (const file of packKits(tag, out)) console.log(file);
}
