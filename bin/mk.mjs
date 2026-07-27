#!/usr/bin/env node

/**
 * method-kit — Unified CLI
 *
 * Usage:
 *   method-kit init <project-name>     Scaffold methodology into current directory
 *   method-kit skills <command>         Manage skills (list/add/update/remove)
 *   method-kit prompt                   Generate system prompt for models without MCP
 *   method-kit mcp-config               Output .mcp.json template for current project
 *   method-kit validate                 Check methodology setup is correct
 *   method-kit version                  Print version
 *   method-kit help                     Show this help
 *
 * For the Go-powered motor (indexing, MCP server, brain, etc):
 *   method-kit index                    Index knowledge directory
 *   method-kit ask <query>              Query the knowledge graph
 *   method-kit brain start|stop|status  Manage persistent daemon
 *   method-kit mcp stdio|serve          Start MCP server
 *   method-kit serve                    Start REST API + dashboard
 *
 * Note: motor commands require the Go binary (method-kit core) to be compiled.
 * Run: cd core && go build -o ../bin/mk-core ./cmd/mk
 */

import { execSync, spawn } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VERSION = '0.2.0';
const args = process.argv.slice(2);
const command = args[0] || 'help';

// Check if Go binary exists for motor commands
const coreBin = resolve(__dirname, 'mk-core');
const hasCorebin = existsSync(coreBin);

function runScript(script, scriptArgs = []) {
  const child = spawn('node', [resolve(__dirname, script), ...scriptArgs], {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  child.on('exit', (code) => process.exit(code || 0));
}

function runCore(coreArgs) {
  if (!hasCorebin) {
    console.error('❌ Motor not found. Build it first:');
    console.error('   cd core && go build -o ../bin/mk-core ./cmd/mk');
    console.error('');
    console.error('Or install globally:');
    console.error('   go install github.com/iam-alan-abreu/method-kit/core/cmd/mk@latest');
    process.exit(1);
  }
  const child = spawn(coreBin, coreArgs, { stdio: 'inherit', cwd: process.cwd() });
  child.on('exit', (code) => process.exit(code || 0));
}

function validate() {
  const cwd = process.cwd();
  let ok = true;
  const checks = [
    ['AGENTS.md', 'Agent contract'],
    ['.memory/decisions.md', 'Decision log'],
    ['.memory/product-vision.md', 'Product vision'],
    ['docs/roadmap.md', 'Roadmap'],
    ['.agents/skills', 'Skills directory'],
  ];

  console.log('\n🔍 Method Kit validation\n');
  for (const [path, label] of checks) {
    const fullPath = join(cwd, path);
    if (existsSync(fullPath)) {
      console.log(`  ✓ ${label}: ${path}`);
    } else {
      console.log(`  ❌ ${label}: ${path} (missing)`);
      ok = false;
    }
  }

  // Check AGENTS.md has §7 closing block reference
  const agentsPath = join(cwd, 'AGENTS.md');
  if (existsSync(agentsPath)) {
    const content = readFileSync(agentsPath, 'utf8');
    if (content.includes('§7')) {
      console.log('  ✓ §7 closing block defined');
    } else {
      console.log('  ❌ §7 closing block missing in AGENTS.md');
      ok = false;
    }
    if (content.includes('§8')) {
      console.log('  ✓ §8 skill selection defined');
    } else {
      console.log('  ❌ §8 skill selection missing in AGENTS.md');
      ok = false;
    }
  }

  // Check skills installed
  const skillsDir = join(cwd, '.agents', 'skills');
  if (existsSync(skillsDir)) {
    const { readdirSync } = await import('fs');
    const skills = readdirSync(skillsDir).filter(d =>
      existsSync(join(skillsDir, d, 'SKILL.md'))
    );
    console.log(`  ✓ Skills installed: ${skills.length}`);
  }

  console.log(ok ? '\n✅ Method Kit setup valid' : '\n❌ Setup incomplete — run: method-kit init');
  process.exit(ok ? 0 : 1);
}

function help() {
  console.log(`
🧠 method-kit v${VERSION} — AI-first development methodology

Scaffold commands:
  init <name>          Install methodology into current directory
  validate             Check methodology setup is correct
  skills <cmd>         Manage skills (list/add/update/remove)
  prompt               Generate system prompt for models without MCP
  mcp-config           Output .mcp.json template

Motor commands (require Go binary):
  index                Index knowledge directory
  ask <query>          Query knowledge graph (context pack)
  brain <cmd>          Manage persistent daemon (start/stop/status)
  mcp <mode>           Start MCP server (stdio/serve)
  serve                Start REST API + dashboard
  search <query>       Full-text search
  write <cmd>          Governed write (propose/approve/commit)

Other:
  version              Print version
  help                 Show this help

Examples:
  npx @method-kit/create my-project     # scaffold (alias for init)
  method-kit skills add github:user/repo/skill-name
  method-kit ask "how does auth work?"
  method-kit brain start
`);
}

function mcpConfig() {
  const template = readFileSync(resolve(__dirname, '..', 'templates', 'mcp-config.json'), 'utf8');
  console.log(template);
  console.log('\n# Copy this to .mcp.json in your project root.');
  console.log('# Ensure method-kit is in your PATH (go install or brew install).');
}

// Route commands
switch (command) {
  case 'init':
    runScript('cli.mjs', args.slice(1));
    break;
  case 'skills':
    runScript('skills.mjs', args.slice(1));
    break;
  case 'prompt':
    runScript('prompt.mjs', args.slice(1));
    break;
  case 'mcp-config':
    mcpConfig();
    break;
  case 'validate':
    validate();
    break;
  case 'version':
    console.log(`method-kit v${VERSION}`);
    break;
  case 'help':
  case '--help':
  case '-h':
    help();
    break;
  // Motor commands — delegate to Go binary
  case 'index':
  case 'ask':
  case 'brain':
  case 'mcp':
  case 'serve':
  case 'search':
  case 'write':
    runCore(args);
    break;
  default:
    console.error(`Unknown command: ${command}`);
    help();
    process.exit(1);
}
