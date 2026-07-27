<p align="center">
  <img src="https://img.shields.io/badge/version-0.2.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/AI--first-methodology-purple?style=for-the-badge" alt="AI-first" />
  <img src="https://img.shields.io/badge/stack-agnostic-orange?style=for-the-badge" alt="Stack Agnostic" />
</p>

<h1 align="center">
  🧠 Method Kit
</h1>

<p align="center">
  <strong>AI-first development methodology</strong><br/>
  Progressive autonomy · Spike validation · Governed writes · Knowledge-as-code
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#the-seven-pillars">Seven Pillars</a> ·
  <a href="#commands">Commands</a> ·
  <a href="#compatibility">Compatibility</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## What is this?

A portable **development methodology** packaged as installable scaffolding. It gives any AI-assisted project:

| 🎯 Feature | Description |
|---|---|
| 📝 **Decision Records** | ADRs registered before code — Context → Decision → Consequence |
| 🎯 **Spike Validation** | Objective green criteria defined before implementation |
| 🔒 **Progressive Autonomy** | A0→A3 ladder with proportional gates |
| 📚 **Knowledge-as-Code** | Signal → approval → immutable version |
| 🛡️ **Classification** | Structural access control before delivery |
| ✅ **Demo as Contract** | One command proves everything works |
| 🚀 **Horizon Progression** | Sequential, evidence-gated advancement |

---

## Quick Start

### Option 1: Shell (no Node.js required)

```bash
git clone https://github.com/iam-alan-abreu/method-kit
cd your-project
../method-kit/scripts/init.sh my-project
```

### Option 2: npx (after npm publish)

```bash
npx @method-kit/create my-project
```

### Option 3: Direct CLI

```bash
method-kit init my-project
```

### What gets installed:

```
your-project/
├── AGENTS.md              ← Agent contract (§1-§8)
├── .memory/
│   ├── product-vision.md  ← Problem + principles + horizons
│   ├── decisions.md       ← ADR log (immutable)
│   ├── architecture.md    ← Technical target
│   ├── mapping.md         ← Surface ↔ layer ↔ component
│   └── glossary.md        ← Domain vocabulary
├── docs/
│   ├── roadmap.md         ← Horizons + spikes
│   └── spike-criterion.md ← Green criteria reference
└── .agents/skills/        ← 5 governance skills
```

---

## The Seven Pillars

<table>
<tr>
<td width="50%">

### 1️⃣ Horizon Progression

Work divides into sequential horizons. Each has closed scope and exit criterion. **No horizon starts before the previous is validated by evidence.**

```
H1 → Foundation (validated)
H2 → Intelligence (validated)
H3 → Scale (deferred until needed)
```

</td>
<td width="50%">

### 2️⃣ Spike Validation

Every capability proven by a spike with **numeric threshold defined before implementation:**

```
Question: "Does X work?"
Criterion: sample ≥ 10, rate ≥ 80%
Result: GREEN ✅ or RED ❌
```

</td>
</tr>
<tr>
<td>

### 3️⃣ Decision Before Code

Every decision registered **before** becoming code:

```
Context → Decision → Consequence
         → Acceptance Metric
```

Decisions are immutable. Supersession is explicit.

</td>
<td>

### 4️⃣ Governed Write Pipeline

```
Intention
  → Schema validation
    → Diff
      → Proportional approval
        → Commit
          → Reindex
```

</td>
</tr>
<tr>
<td>

### 5️⃣ Classification × Capability

Every information has a **classification level**. Every consumer has a **capability level**. System filters **before** delivery.

| Level | Access |
|---|---|
| A0 Read | Free |
| A1 Write | Confirm |
| A2 Prod | Named |
| A3 Destroy | Dual |

</td>
<td>

### 6️⃣ Progressive Autonomy

```
Suggest
  → Execute with approval
    → Execute with audit
      → Monitored autonomy
```

**Never skip a step.** Audited history is prerequisite for next level.

</td>
</tr>
<tr>
<td colspan="2" align="center">

### 7️⃣ Demo as Contract

**One command. Everything passes. Or nothing is ready.**

```bash
method-kit validate
# setup → build → test → benchmark → demo
# Any failure = not done.
```

</td>
</tr>
</table>

---

## Commands

### Scaffold

```bash
method-kit init <name>          # Install methodology
method-kit validate             # Check setup is correct
method-kit skills list           # Show installed skills
method-kit skills add <source>   # Install from github/npm/local
method-kit skills update         # Update all skills
method-kit prompt                # Generate system prompt
method-kit mcp-config            # Output .mcp.json template
```

### Motor (requires Go binary)

```bash
method-kit index                 # Index knowledge directory
method-kit ask "<query>"          # Context pack for a question
method-kit brain start           # Persistent daemon
method-kit mcp stdio             # MCP server for AI agents
method-kit serve                 # REST API + dashboard
method-kit search "<query>"       # Full-text search
method-kit write propose <id>    # Governed write
```

---

## Compatibility

Works with any AI coding tool that reads project files:

| Tool | Integration | Auto-discovery |
|---|---|---|
| 🧠 Claude Code / Zed | `.mcp.json` + `AGENTS.md` | ✅ |
| 🔮 Cursor | `.cursor/mcp.json` | ✅ |
| 🚀 GitHub Copilot | `.github/copilot-instructions.md` | ✅ |
| 📦 Codex CLI | MCP config | ✅ |
| 🌊 Windsurf | `.windsurfrules` + MCP | ✅ |
| 🤖 Any MCP client | `method-kit mcp stdio` | ✅ |
| 💬 GPT / API | `method-kit prompt` (system prompt) | Manual |
| 🏠 Ollama / Local | HTTP + system prompt | Manual |

---

## Skills System

Skills are **dynamic and updatable** from external sources:

```bash
# Install from GitHub
method-kit skills add github:user/repo/skill-name

# Install from npm
method-kit skills add npm:@scope/skill-package

# List installed
method-kit skills list

# Update all
method-kit skills update
```

### Built-in Skills

| Skill | Purpose |
|---|---|
| `architecture-context` | Architecture ADR discipline |
| `autonomy-ladder` | A0..A3 progressive autonomy rules |
| `knowledge-as-code` | Signal → approval → immutable version |
| `no-invention` | Cite source or declare absence |
| `product-context` | Surface × layer × source-of-truth |

---

## Operational Rules

<details>
<summary><strong>📌 Click to expand all rules</strong></summary>

| Rule | Description |
|---|---|
| **Roadmap is law** | No feature without entry |
| **Non-invention** | Never fabricate; cite or declare absence |
| **Documentary honesty** | Docs that lie = product bug |
| **Version by evidence** | Tag only when green |
| **Deferred complexity** | Explicit deferral with registered decision |
| **Correction as first-class** | Test → fix → validate → register → supersede |
| **Closing block** | Every delivery declares state + next step |
| **Skill selection** | Declare discipline before acting |
| **Full audit** | Who, what, when, context, result |
| **Single pipeline** | setup → build → test → benchmark → demo |

</details>

---

## Origin

Extracted from real execution of **AKOS** (AI Knowledge Operating System) — v0.1 through v0.6:

- ✅ 19 Architecture Decision Records
- ✅ 11 validated spikes (all GREEN)
- ✅ 35+ MCP tools
- ✅ 6 release tags
- ✅ 7 benchmarks passing in single pipeline

Every pillar and rule was **stress-tested in production development**, not theorized.

---

## After Installation

```
1. Edit .memory/product-vision.md — define your real problem
2. Edit AGENTS.md §4 — define your surfaces
3. Edit docs/roadmap.md — define 3-5 spikes with green criteria
4. Write founding ADRs (D-001..D-003)
5. Run first delivery turn — verify §7 closing block renders
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Every contribution must cite **real execution evidence** — no theoretical additions.

---

## License

[MIT](./LICENSE) © 2026 Alan Abreu

---

<p align="center">
  <strong>Built for developers who ship with AI, not despite it.</strong>
</p>
READMEOF
echo "README.md rewritten"
