// Tags and publishes a release of both kits, Swiss Minimal and Verdigris: runs both demos'
// tests, pushes main, adds a date tag such as v2026.10.19 (v2026.10.19.2 for a second release
// that day) and creates the GitHub Release, with each kit attached as a file a site can install
// (scripts/pack.ts). Adapted from Dial Hopping's scripts/release.ts (see "Releases" in
// TOOLING.md). Run at the repository's root:
//   npm run release              asks before tagging and publishing
//   npm run release -- --dry-run shows the tag and notes, changes nothing
//   npm run release -- --yes     skips the question
//
// The notes come from each demo's src/data/features.ts: entries added since the last tag are
// "New", entries whose text changed are "Updated". A kit with neither says "Polish and fixes."
// Every commit since the last tag is listed underneath, folded away.
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { pathToFileURL } from 'node:url';
import { features as swissMinimalFeatures } from '../demo/src/data/features.ts';
import { features as verdigrisFeatures } from '../verdigris/demo/src/data/features.ts';
import { packKits } from './pack.ts';
import type { Feature } from 'swiss-minimal/types';

const dryRun = process.argv.includes('--dry-run');
const yes = process.argv.includes('--yes');
const repoRoot = new URL('../', import.meta.url);
// Each kit, its demo's folder (with the tests) and its features, in the order of the notes.
const kits = [
  { name: 'Swiss Minimal', demo: 'demo', features: swissMinimalFeatures },
  { name: 'Verdigris', demo: 'verdigris/demo', features: verdigrisFeatures },
];
const featuresPath = (demo: string) => `${demo}/src/data/features.ts`;

function git(...args: string[]): string {
  return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' }).trim();
}

function stop(message: string): never {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

const pad = (n: number) => String(n).padStart(2, '0');
const now = new Date();
// RELEASE_TODAY=YYYY-MM-DD pretends it is another day, for trying out --dry-run.
const today = process.env.RELEASE_TODAY ?? `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

// 1. Only release a clean, up-to-date main.
if (git('rev-parse', '--abbrev-ref', 'HEAD') !== 'main') stop('Switch to main first.');
if (git('status', '--porcelain')) {
  if (!dryRun) stop('There are uncommitted changes. Commit or stash them first.');
  console.warn('Note: there are uncommitted changes. A real release would stop here.');
}
git('fetch', '--quiet', '--tags', 'origin');
if (git('rev-list', '--count', 'HEAD..origin/main') !== '0') stop('origin/main has commits you do not have. Pull first.');

// 2. The last release, and today's tag name. Only tags on origin count, in case this clone
// holds tags fetched from another remote.
const ownTags = new Set(
  git('ls-remote', '--tags', '--refs', 'origin')
    .split('\n')
    .filter(Boolean)
    .map((ref) => ref.split('\t')[1].replace('refs/tags/', '')),
);
const tags = git('tag', '--list', 'v*', '--merged', 'HEAD', '--sort=-creatordate')
  .split('\n')
  .filter((t) => ownTags.has(t));
const lastTag = tags[0];
if (lastTag && git('rev-list', '-n', '1', lastTag) === git('rev-parse', 'HEAD')) {
  stop(`This commit is already released as ${lastTag}.`);
}
const base = `v${today.replaceAll('-', '.')}`;
const sameDay = [...ownTags].filter((t) => t === base || t.startsWith(`${base}.`));
const tag = sameDay.length === 0 ? base : `${base}.${sameDay.length + 1}`;
if (git('tag', '--list', tag)) {
  stop(`There is already a local tag ${tag} that isn't on origin, perhaps fetched from another remote. Delete it with: git tag -d ${tag}`);
}

const line = (f: Feature) => `- **${f.title}.** ${f.body}`;
// The entry's line, then its details as sub-bullets. Only the line is compared with what was
// published, so details can be added to an entry without it counting as updated.
const entry = (f: Feature) => [line(f), ...(f.details ?? []).map((d) => `  - ${d}`)].join('\n');

// 3. Features at the last release, read from that version of a demo's features.ts. Null when
// the file was not in the repository yet.
async function featuresAt(ref: string, path: string): Promise<Feature[] | null> {
  const dir = mkdtempSync(join(tmpdir(), 'release-'));
  try {
    const file = join(dir, 'features.ts');
    // Not through git(): when the file is missing, git's complaint should stay off the screen.
    writeFileSync(file, execFileSync('git', ['show', `${ref}:${path}`], { cwd: repoRoot, stdio: ['ignore', 'pipe', 'ignore'] }));
    return (await import(pathToFileURL(file).href)).features;
  } catch {
    return null;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Lines already in the last release's published notes (added there by hand) are not repeated.
let lastNotes = '';
if (lastTag) {
  try {
    lastNotes = execFileSync('gh', ['release', 'view', lastTag, '--json', 'body', '--jq', '.body'], {
      cwd: repoRoot,
      encoding: 'utf8',
    });
  } catch {
    // No release page for that tag, or gh is not signed in: nothing to compare with.
  }
}
const alreadyPublished = (f: Feature) => lastNotes.includes(line(f));
const lastTagDay = lastTag?.slice(1, 11).replaceAll('.', '-');

/** One kit's part of the notes: what is new and what changed since the last release. */
async function kitNotes({ name, demo, features }: (typeof kits)[number], since: string): Promise<string> {
  const path = featuresPath(demo);
  const before = await featuresAt(since, path);
  // The kit's first release from this repository: everything it has would count as new.
  if (!before) return `${name} is released from this repository from now on.`;
  const oldByTitle = new Map(before.map((f) => [f.title, f]));
  const newSinceTag = features.filter((f) => !oldByTitle.has(f.title));

  // An entry added after a release but dated on or before that release's day belongs to that
  // release (it was live already, and its notes are fixed by hand), so it is not news now.
  // On a second release the same day there is no telling, so it counts as new.
  const lateAdditions = newSinceTag.filter((f) => lastTagDay && lastTagDay !== today && f.date <= lastTagDay);
  const added = newSinceTag.filter((f) => !lateAdditions.includes(f) && !alreadyPublished(f));
  if (lateAdditions.length) {
    console.log(
      `Left out of the notes, as part of ${since} already:\n` +
        lateAdditions.map((f) => `  ${f.date}  ${f.title}`).join('\n'),
    );
  }
  const updated = features.filter((f) => {
    const old = oldByTitle.get(f.title);
    return old && (old.body !== f.body || old.date !== f.date) && !alreadyPublished(f);
  });

  // The Features tab shows the day each feature went live, which is today.
  const wrongDate = added.filter((f) => f.date !== today);
  if (wrongDate.length) {
    stop(
      `These new features are not dated today (${today}) in ${path}:\n` +
        wrongDate.map((f) => `  ${f.date}  ${f.title}`).join('\n') +
        '\nUpdate the dates, commit, and run this again.',
    );
  }

  const parts: string[] = [];
  if (added.length) parts.push(`### New\n\n${added.map(entry).join('\n')}`);
  if (updated.length) parts.push(`### Updated\n\n${updated.map(entry).join('\n')}`);
  return parts.length ? parts.join('\n\n') : 'Polish and fixes.';
}

// 4. The notes.
const commits = git('log', '--no-merges', '--format=- %s (%h)', ...(lastTag ? [`${lastTag}..HEAD`] : ['-n', '30']));
const sections: string[] = [];
for (const kit of kits) {
  const body = lastTag
    ? await kitNotes(kit, lastTag)
    : `The first tagged release.\n\n### Features so far\n\n${kit.features.map(entry).join('\n')}`;
  sections.push(`## ${kit.name}\n\n${body}`);
}
// How a site takes this release. The files are attached below, under Assets.
const download = `https://github.com/danny-englander/swiss-minimal-design-kit/releases/download/${tag}`;
sections.push(
  `## Install\n\n\`\`\`sh\nnpm install ${download}/swiss-minimal.tgz\n\`\`\`\n\n` +
    `\`\`\`sh\nnpm install ${download}/verdigris.tgz\n\`\`\`\n\nVerdigris brings Swiss Minimal with it.`,
);
sections.push(
  `<details>\n<summary>${lastTag ? `Commits since ${lastTag}` : 'Recent commits'}</summary>\n\n${commits}\n\n</details>`,
);
const notes = sections.join('\n\n') + '\n';
const title = `Swiss Minimal and Verdigris ${tag}`;

console.log(`\n${title}${lastTag ? ` (previous: ${lastTag})` : ' (first release)'}\n`);
console.log(notes);
if (dryRun) {
  console.log('Dry run: nothing was tested, tagged, pushed or published.\n');
  process.exit(0);
}

// 5. Ask, test, push, tag, publish.
if (!yes) {
  if (!process.stdin.isTTY) stop('Run this in a terminal, or pass --yes.');
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`Run the tests, then push and publish ${tag}? (y/N) `);
  rl.close();
  if (answer.trim().toLowerCase() !== 'y') stop('Nothing was released.');
}

const run = (cmd: string, args: string[], cwd: URL = repoRoot) => {
  const r = spawnSync(cmd, args, { cwd, stdio: 'inherit' });
  if (r.status !== 0) stop(`${cmd} ${args.join(' ')} failed. Nothing was tagged or published.`);
};
for (const { demo } of kits) run('npm', ['test'], new URL(`${demo}/`, repoRoot));
run('git', ['push', 'origin', 'main']);
run('git', ['tag', '-a', tag, '-m', title]);
run('git', ['push', 'origin', tag]);

const notesDir = mkdtempSync(join(tmpdir(), 'release-'));
const notesFile = join(notesDir, 'notes.md');
writeFileSync(notesFile, notes);
// Each kit as a file, attached to the release for sites to install.
const files = packKits(tag, notesDir);
const published = spawnSync(
  'gh',
  ['release', 'create', tag, ...files, '--title', title, '--notes-file', notesFile, '--verify-tag'],
  { cwd: repoRoot, stdio: 'inherit' },
);
rmSync(notesDir, { recursive: true, force: true });
if (published.status !== 0) {
  stop(
    `${tag} is tagged and pushed, but the GitHub Release failed. Retry with: gh release create ${tag} --generate-notes, ` +
      `then attach the kits: npm run pack -- --tag ${tag} && gh release upload ${tag} packed/*.tgz`,
  );
}
console.log(`\n✓ Released ${tag}.\n`);
