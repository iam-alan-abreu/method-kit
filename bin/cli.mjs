#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const projectName = args[0] || 'my-project';
const targetDir = resolve(process.cwd());

console.log(`\n🧠 Method Kit v0.2.0 — AI-first development methodology\n`);
console.log(`  Project: ${projectName}`);
console.log(`  Target:  ${targetDir}\n`);

// Copy function (recursive)
function copyDir(src, dest) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      if (existsSync(destPath)) {
        console.log(`  ⏭  Skip (exists): ${destPath.replace(targetDir + '/', '')}`);
        continue;
      }
      copyFileSync(srcPath, destPath);
      console.log(`  ✓  Created: ${destPath.replace(targetDir + '/', '')}`);
    }
  }
}

// Replace placeholders in a file
function replacePlaceholders(filePath, replacements) {
  let content = readFileSync(filePath, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }
  writeFileSync(filePath, content);
}

// 1. Copy .method-kit/
console.log('📁 Installing .method-kit/');
const methodKitDest = join(targetDir, '.method-kit');
copyDir(join(ROOT, 'templates'), join(methodKitDest, 'templates'));
copyDir(join(ROOT, 'skills'), join(methodKitDest, 'skills'));
copyDir(join(ROOT, 'scripts'), join(methodKitDest, 'scripts'));
if (!existsSync(join(methodKitDest, 'VERSION'))) {
  writeFileSync(join(methodKitDest, 'VERSION'), '0.2.0\n');
  console.log('  ✓  Created: .method-kit/VERSION');
}

// 2. Copy skills to .agents/skills/
console.log('\n📁 Installing .agents/skills/');
const skillsSrc = join(ROOT, 'skills');
const skillsDest = join(targetDir, '.agents', 'skills');
copyDir(skillsSrc, skillsDest);

// 3. Create .memory/ structure
console.log('\n📁 Creating .memory/');
const memoryDir = join(targetDir, '.memory');
const memoryTemplates = join(ROOT, 'templates', 'memory');
if (existsSync(memoryTemplates)) {
  copyDir(memoryTemplates, memoryDir);
}

// 4. Create docs/ structure
console.log('\n📁 Creating docs/');
const docsDir = join(targetDir, 'docs');
const docsTemplates = join(ROOT, 'templates', 'docs');
if (existsSync(docsTemplates)) {
  copyDir(docsTemplates, docsDir);
}

// 5. Create AGENTS.md if not exists
const agentsPath = join(targetDir, 'AGENTS.md');
const agentsTemplate = join(ROOT, 'templates', 'AGENTS.template.md');
if (!existsSync(agentsPath) && existsSync(agentsTemplate)) {
  copyFileSync(agentsTemplate, agentsPath);
  console.log('\n  ✓  Created: AGENTS.md');
}

// 6. Replace placeholders
console.log('\n🔧 Applying project name...');
const replacements = {
  PRODUCT_NAME: projectName,
  PRODUCT_TAGLINE: `${projectName} — AI-first project with method-kit governance`,
  PRODUCT_SKILL_PREFIX: projectName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  PROTECTED_MODULES: '.memory/, .agents/, AGENTS.md, .method-kit/',
  SURFACES: '| CLI | Gateway | Primary interface |\n| MCP | Gateway | AI agent interface |\n| Dashboard | Visualization | Read-only observation |',
  ACTIVE_HORIZON: 'H1',
  HORIZONS: '| H1 | Foundation | 0-6m | MVP |\n| H2 | Intelligence | 6-18m | Advanced capabilities |\n| H3 | Scale | 18m+ | Federation / enterprise |',
};

const filesToReplace = [
  agentsPath,
  join(memoryDir, 'product-vision.template.md'),
  join(memoryDir, 'decisions.template.md'),
  join(docsDir, 'roadmap.template.md'),
].filter(f => existsSync(f));

for (const f of filesToReplace) {
  replacePlaceholders(f, replacements);
  // Rename .template.md to .md
  if (f.endsWith('.template.md')) {
    const newPath = f.replace('.template.md', '.md');
    if (!existsSync(newPath)) {
      const content = readFileSync(f, 'utf8');
      writeFileSync(newPath, content);
      console.log(`  ✓  Generated: ${newPath.replace(targetDir + '/', '')}`);
    }
  }
}

console.log(`
✅ Method Kit installed successfully!

Next steps:
  1. Edit .memory/product-vision.md — define your real problem
  2. Edit AGENTS.md §4 — define your surfaces
  3. Edit docs/roadmap.md — define your first 3-5 spikes
  4. Write founding ADRs in .memory/decisions.md (D-001..D-003)
  5. Run your first delivery turn — verify §7 closing block renders

Validation:
  Your first AI agent turn should end with:
  ━━ Roadmap H1 ━━
  S1 <your spike>  [░░░░░░░░░░]  not started
  ...

Docs: https://github.com/iam-alan-abreu/method-kit
`);