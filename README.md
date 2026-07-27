# Method Kit

> AI-first development methodology — progressive autonomy, spike validation, governed writes, and knowledge-as-code.

[![npm](https://img.shields.io/npm/v/@method-kit/create)](https://www.npmjs.com/package/@method-kit/create)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## What is this?

A portable **development methodology** packaged as installable scaffolding. It gives any AI-assisted project:

- Structured decision records (ADRs) before code
- Spike-based validation with objective green criteria
- Progressive autonomy ladder (A0→A3) for AI agents
- Knowledge-as-code governance
- Classification and capability-based access control
- Demo-as-contract validation
- Mandatory closing blocks for state awareness

## Quick Start

```bash
npx @method-kit/create my-project
```

This installs into your current directory:

```
.method-kit/          — methodology assets (VERSION, scripts)
.agents/skills/       — 5 governance skills for AI agents
.memory/              — living memory (decisions, vision, glossary)
docs/                 — roadmap, spike criteria
AGENTS.md             — agent contract (§1-§8)
```

## What it is

✅ A methodology for developing with AI assistance
✅ Governance framework for AI agent autonomy
✅ Templates for decisions, spikes, roadmaps
✅ Skills that teach AI agents the discipline
✅ Stack-agnostic, model-agnostic, language-agnostic

## What it is NOT

❌ A framework or library
❌ A product template
❌ Tied to any specific AI model or tool
❌ A replacement for your build system
❌ An opinionated tech stack

## The Seven Pillars

1. **Horizon Progression** — sequential, evidence-gated
2. **Spike Validation** — objective green criterion before "done"
3. **Decision Before Code** — ADR registered before implementation
4. **Governed Writes** — proportional approval pipeline
5. **Classification × Capability** — structural access control
6. **Progressive Autonomy** — A0→A3 with audit trail
7. **Demo as Contract** — one command proves everything

Full methodology: [METHODOLOGY.md](./METHODOLOGY.md)

## Compatibility

Works with any AI coding tool that reads project files:

- Claude Code / Opus 4.8 (reads AGENTS.md, .mcp.json)
- Cursor (reads .cursorrules)
- GitHub Copilot (reads .github/copilot-instructions.md)
- Codex CLI
- Windsurf
- Any MCP-compatible agent
- Any model via system prompt injection

## After Installation

1. Edit `.memory/product-vision.md` — define your real problem
2. Edit `AGENTS.md` §4 — define your surfaces
3. Edit `docs/roadmap.md` — define 3-5 spikes with green criteria
4. Write founding ADRs (D-001..D-003) in `.memory/decisions.md`
5. Run your first AI-assisted turn — verify §7 closing block renders

## Contributing

This methodology evolves through real usage. If you use it and find improvements:

1. Fork the repo
2. Apply the change
3. Document what real execution revealed the improvement
4. Open a PR with before/after evidence

## Origin

Extracted from real execution of AKOS (AI Knowledge Operating System) — v0.1 through v0.6, across 19 ADRs, 11 validated spikes, and 35+ MCP tools. Every pillar and operational rule was stress-tested in production development, not theorized.

## License

MIT