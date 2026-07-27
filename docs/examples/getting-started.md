# Getting Started — Method Kit from Zero

How to apply method-kit to a brand new project.

## Step 1: Install

```bash
mkdir my-new-project && cd my-new-project
git init

# Option A: Shell
git clone https://github.com/iam-alan-abreu/method-kit /tmp/method-kit
/tmp/method-kit/scripts/init.sh my-new-project

# Option B: npx (when published)
npx @method-kit/create my-new-project
```

## Step 2: Define your problem

Edit `.memory/product-vision.md`:

```markdown
## §1 · Executive summary

Developers lose context between AI sessions, repeat research,
and make contradictory decisions because knowledge dies in chat history.

## §2 · The problem

- Context lost between sessions
- Decisions not recorded
- No source of truth
- Agent hallucinates without governance
```

## Step 3: Define your surfaces

Edit `AGENTS.md` §4:

```markdown
| Surface | Role |
|---|---|
| CLI | Primary interface for developers |
| MCP | AI agent interface (models connect here) |
| API | REST endpoints for consumers |
| Dashboard | Visual observation |
```

## Step 4: Define your first spikes

Edit `docs/roadmap.md`:

```markdown
| # | Question | Green criterion | State |
|---|---|---|---|
| S1 | Does search return relevant results? | 10 queries, 80% top-3 | not started |
| S2 | Does write governance work? | 10 writes, 100% schema | not started |
| S3 | Does classification prevent leaks? | 10 probes, 0% leak | not started |
```

## Step 5: Write founding ADRs

Edit `.memory/decisions.md`:

```markdown
## D-001 · Source of truth is Git/Markdown

- Context: Need portability, no vendor lock-in
- Decision: Everything canonical lives in Markdown, versioned in Git
- Consequence: All derived data (SQLite, embeddings) is rebuildable

## D-002 · Gateway is mandatory

- Context: Agents shouldn't access raw files directly
- Decision: All access through a controlled gateway
- Consequence: Classification and audit happen automatically

## D-003 · No invention

- Context: AI models hallucinate when unsure
- Decision: Agent must cite source or say "I don't know"
- Consequence: Every reply points at a real document
```

## Step 6: First delivery turn

Start working. Your first AI-assisted turn should end with:

```
━━ Roadmap H1 ━━
S1 search relevance     [░░░░░░░░░░]  not started
S2 write governance     [░░░░░░░░░░]  not started
S3 classification       [░░░░░░░░░░]  not started
Aggregate H1: 0% · ADRs: D-001..D-003
Skill applied: architecture-context · reason: founding decisions
Impact: D-001 · D-002 · D-003
```

If this block renders correctly, the methodology is live.

## Step 7: Validate

```bash
method-kit validate
```

Should show all checkmarks green.
