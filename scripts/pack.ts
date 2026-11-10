// Packs each kit into one file a site can install by URL: swiss-minimal.tgz and verdigris.tgz.
// The release script attaches both to the GitHub Release (see "Releases" in TOOLING.md), because
// npm cannot install a folder of a repository, which is where Verdigris lives.
//   npm run pack -- --tag v2026.11.10            writes both files to ./packed
//   npm run pack -- --tag v2026.11.10 --out dir  writes them somewhere else
//
// Each file holds what the kit's package.json lists under "files", plus its README and the
// license. The version is the release's date, and Verdigris's copy depends on the Swiss Minimal
// file of the same release, so one install brings both.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const releases = 'https://github.com/danny-englander/swiss-minimal-design-kit/releases/download';

/** Each kit's folder in the repository, and the name of its file. */
const kits = [
  { name: 'swiss-minimal', dir: '.' },
  { name: 'verdigris', dir: 'verdigris' },
];

/**
 * A release tag as a package version: v2026.11.08 is 2026.11.8, and v2026.11.08.2 (a second
 * release that day) is 2026.11.8-2. npm allows no leading zeros.
 */
export function versionFor(tag: string): string {
  const [year, month, day, nth] = tag.replace(/^v/, '').split('.').map(Number);
  if (![year, month, day].every(Number.isInteger)) throw new Error(`Not a release tag: ${tag}`);
  return `${year}.${month}.${day}${nth ? `-${nth}` : ''}`;
}

/**
 * Writes swiss-minimal.tgz and verdigris.tgz for the release `tag` into `out`, and returns their
 * paths. `baseUrl` is where the files will be served from; it is only passed to try the files
 * out before a release exists.
 */
export function packKits(tag: string, out: string, baseUrl = `${releases}/${tag}`): string[] {
  const version = versionFor(tag);
  mkdirSync(out, { recursive: true });
  return kits.map(({ name, dir }) => {
    const from = join(repoRoot, dir);
    const stage = mkdtempSync(join(tmpdir(), `pack-${name}-`));
    try {
      const pkg = JSON.parse(readFileSync(join(from, 'package.json'), 'utf8'));
      for (const entry of pkg.files) cpSync(join(from, entry), join(stage, entry), { recursive: true });
      cpSync(join(from, 'README.md'), join(stage, 'README.md'));
      cpSync(join(repoRoot, 'LICENSE'), join(stage, 'LICENSE'));
      // What only makes sense inside the repository stays out of the packed package.json.
      delete pkg.private;
      delete pkg.workspaces;
      delete pkg.scripts;
      pkg.version = version;
      if (pkg.dependencies?.['swiss-minimal']) pkg.dependencies['swiss-minimal'] = `${baseUrl}/swiss-minimal.tgz`;
      writeFileSync(join(stage, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
      const packed = execFileSync('npm', ['pack', '--silent', '--pack-destination', stage], { cwd: stage, encoding: 'utf8' }).trim();
      const file = join(out, `${name}.tgz`);
      renameSync(join(stage, packed), file);
      return file;
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
  for (const file of packKits(tag, out, arg('--base-url'))) console.log(file);
}
