#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCK_FILE = resolve(process.cwd(), '.agents', 'skills.lock.json');
const SKILLS_DIR = resolve(process.cwd(), '.agents', 'skills');

const args = process.argv.slice(2);
const command = args[0];

function readLock() {
  if (!existsSync(LOCK_FILE)) return { version: 1, skills: {} };
  return JSON.parse(readFileSync(LOCK_FILE, 'utf8'));
}

function writeLock(data) {
  mkdirSync(dirname(LOCK_FILE), { recursive: true });
  writeFileSync(LOCK_FILE, JSON.stringify(data, null, 2) + '\n');
}

function list() {
  const lock = readLock();
  console.log('\n📦 Installed skills:\n');
  for (const [name, info] of Object.entries(lock.skills)) {
    console.log(`  ${name} (v${info.version})`);
    console.log(`    source: ${info.source}`);
    console.log(`    ${info.description}`);
    console.log();
  }
  console.log(`Total: ${Object.keys(lock.skills).length} skills`);
}

function add(source) {
  if (!source) {
    console.error('Usage: method-kit skills add <source>');
    console.error('Sources: github:owner/repo/path, npm:package, local:path');
    process.exit(1);
  }

  const [type, path] = source.includes(':') ? source.split(':', 2) : ['github', source];
  let name = path.split('/').pop();
  const destDir = join(SKILLS_DIR, name);

  console.log(`\n📥 Installing skill: ${name} from ${type}:${path}`);

  switch (type) {
    case 'github': {
      const [owner, repo, ...rest] = path.split('/');
      const subPath = rest.join('/');
      const tempDir = join('/tmp', `skill-${Date.now()}`);
      try {
        execSync(`git clone --depth 1 --sparse https://github.com/${owner}/${repo} ${tempDir}`, { stdio: 'pipe' });
        if (subPath) {
          execSync(`cd ${tempDir} && git sparse-checkout set ${subPath}`, { stdio: 'pipe' });
        }
        const srcDir = subPath ? join(tempDir, subPath) : tempDir;
        mkdirSync(destDir, { recursive: true });
        execSync(`cp -r ${srcDir}/* ${destDir}/`, { stdio: 'pipe' });
        rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {
        console.error(`  ❌ Failed to clone: ${e.message}`);
        process.exit(1);
      }
      break;
    }
    case 'npm': {
      try {
        execSync(`npx skills add ${path}`, { stdio: 'inherit' });
      } catch (e) {
        console.error(`  ❌ npm install failed: ${e.message}`);
        process.exit(1);
      }
      break;
    }
    case 'local': {
      const srcDir = resolve(path);
      if (!existsSync(srcDir)) {
        console.error(`  ❌ Local path not found: ${srcDir}`);
        process.exit(1);
      }
      mkdirSync(destDir, { recursive: true });
      execSync(`cp -r ${srcDir}/* ${destDir}/`);
      break;
    }
    default:
      console.error(`  ❌ Unknown source type: ${type}`);
      process.exit(1);
  }

  // Update lock
  const lock = readLock();
  lock.skills[name] = {
    source: source,
    version: 'latest',
    description: existsSync(join(destDir, 'SKILL.md'))
      ? readFileSync(join(destDir, 'SKILL.md'), 'utf8').split('\n').find(l => l.startsWith('description:'))?.replace('description:', '').trim() || ''
      : ''
  };
  writeLock(lock);
  console.log(`  ✓ Installed: ${name}`);
}

function update() {
  const lock = readLock();
  console.log('\n🔄 Updating skills...\n');
  for (const [name, info] of Object.entries(lock.skills)) {
    if (info.source.startsWith('local:')) {
      console.log(`  ⏭  ${name} (local, skip)`);
      continue;
    }
    console.log(`  ↻  ${name} from ${info.source}`);
    add(info.source);
  }
  console.log('\n✓ All skills updated');
}

function remove(name) {
  if (!name) {
    console.error('Usage: method-kit skills remove <name>');
    process.exit(1);
  }
  const destDir = join(SKILLS_DIR, name);
  if (existsSync(destDir)) {
    rmSync(destDir, { recursive: true, force: true });
  }
  const lock = readLock();
  delete lock.skills[name];
  writeLock(lock);
  console.log(`  ✓ Removed: ${name}`);
}

switch (command) {
  case 'list': list(); break;
  case 'add': add(args[1]); break;
  case 'update': update(); break;
  case 'remove': remove(args[1]); break;
  default:
    console.log('method-kit skills <command>');
    console.log('');
    console.log('Commands:');
    console.log('  list              Show installed skills');
    console.log('  add <source>      Install skill from source');
    console.log('  update            Update all non-local skills');
    console.log('  remove <name>     Remove a skill');
    console.log('');
    console.log('Sources:');
    console.log('  github:owner/repo/path');
    console.log('  npm:package-name');
    console.log('  local:./path/to/skill');
    break;
}