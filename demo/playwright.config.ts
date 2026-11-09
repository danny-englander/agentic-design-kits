import { execFileSync } from 'node:child_process';
import { defineConfig, devices } from '@playwright/test';

// Accessibility checks for the demo (see TOOLING.md). Run with `npm test`.

// The tests' own server, on a free port the system picks for each run, so no site's tests have a
// port written down to collide on. System-picked ports sit far above the dev servers' 4321.
// Playwright loads this file again in every worker; the workers inherit TEST_SERVER_PORT from
// the first load, so they all reach the same server. Set it yourself to choose the port.
// Tests use relative URLs; this is the only place the port appears.
const PORT = Number((process.env.TEST_SERVER_PORT ||= freePort()));
const baseURL = `http://localhost:${PORT}`;

/** A port nothing is listening on, chosen by the system. */
function freePort() {
  const script = "const s = require('net').createServer().listen(0, () => { console.log(s.address().port); s.close(); });";
  return execFileSync(process.execPath, ['-e', script], { encoding: 'utf8' }).trim();
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    // The kit turns its slides and fades off for this setting, so a scan never catches a
    // page halfway through a transition.
    reducedMotion: 'reduce',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Test the production build, as visitors get it. Never reuse a server already on the port:
  // it may be a stale build or another site entirely, so a clash should fail loudly instead.
  webServer: {
    command: `npx astro build && npx astro preview --port ${PORT} --ignore-lock`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
