// Generates scripts/seed-data.json from lib/seed-data.ts (the single source
// of truth) so scripts/seed.mjs can run with plain Node, no TS loader.
// Run automatically before `npm run seed` (npm "preseed" hook).
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, '.seed-build');

execSync(
  `npx tsc lib/seed-data.ts lib/types.ts --outDir "${outDir}" --module commonjs --target es2020 --esModuleInterop --skipLibCheck --declaration false`,
  { cwd: root, stdio: 'inherit' }
);

const { seedContent } = await import(path.join(outDir, 'seed-data.js'));
fs.writeFileSync(
  path.join(root, 'scripts', 'seed-data.json'),
  JSON.stringify(seedContent, null, 2) + '\n'
);
fs.rmSync(outDir, { recursive: true, force: true });
console.log('scripts/seed-data.json generated from lib/seed-data.ts');
