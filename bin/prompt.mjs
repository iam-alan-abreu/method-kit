#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const cwd = process.cwd();
const agentsFile = join(cwd, 'AGENTS.md');
const memoryDir = join(cwd, '.memory');
const skillsDir = join(cwd, '.agents', 'skills');

let prompt = '';

// 1. Include AGENTS.md core rules
if (existsSync(agentsFile)) {
  const content = readFileSync(agentsFile, 'utf8');
  // Extract §1 and §2 only (operating principles + data contract)
  const sections = content.split('## ');
  const s1 = sections.find(s => s.startsWith('§1'));
  const s2 = sections.find(s => s.startsWith('§2'));
  if (s1) prompt += '## ' + s1.split('## ')[0] + '\n';
  if (s2) prompt += '## ' + s2.split('## ')[0] + '\n';
}

// 2. List available MCP tools
prompt += `## Available Tools (MCP)\n\n`;
prompt += `Call these tools via method-kit MCP server:\n\n`;
prompt += `- \`cortex_doc_context_pack\` — PRIMARY: structured context for any query\n`;
prompt += `- \`cortex_doc_search\` — full-text search in knowledge graph\n`;
prompt += `- \`cortex_doc_get\` — get specific document by ID\n`;
prompt += `- \`cortex_doc_detect_conflicts\` — find contradictions\n`;
prompt += `- \`cortex_doc_provenance\` — who wrote it, where it came from\n`;
prompt += `- \`cortex_doc_transition_history\` — state change log\n`;
prompt += `- \`cortex_brain_get\` — read project brain/rules\n`;
prompt += `- \`cortex_brain_append\` — learn something new\n`;
prompt += `\n`;

// 3. List installed skills
if (existsSync(skillsDir)) {
  const skills = readdirSync(skillsDir).filter(d => {
    return existsSync(join(skillsDir, d, 'SKILL.md'));
  });
  if (skills.length > 0) {
    prompt += `## Installed Skills\n\n`;
    for (const skill of skills) {
      const md = readFileSync(join(skillsDir, skill, 'SKILL.md'), 'utf8');
      const descLine = md.split('\n').find(l => l.startsWith('description:'));
      const desc = descLine ? descLine.replace('description:', '').trim() : '';
      prompt += `- **${skill}**: ${desc}\n`;
    }
    prompt += `\n`;
  }
}

// 4. Hard rules
prompt += `## Hard Rules\n\n`;
prompt += `1. ALWAYS call \`cortex_doc_context_pack\` before answering project questions\n`;
prompt += `2. ALWAYS cite source document IDs in your reply\n`;
prompt += `3. If no context is returned, say: "I don't have verified information on this."\n`;
prompt += `4. NEVER invent facts or guess\n`;
prompt += `5. Respect classification — if content is filtered, don't mention it exists\n`;
prompt += `6. For writes, use the governed pipeline (propose → approve → commit)\n`;

console.log(prompt);