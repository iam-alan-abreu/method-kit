# Case Study: AKOS — AI Knowledge Operating System

> How method-kit was born from real execution, not theory.

## What is AKOS

AKOS is an **AI-first knowledge operating system** — a personal/professional second brain where:

- All knowledge lives in Git/Markdown (portable, versioned, no lock-in)
- A **Cortex Gateway** controls all access (CLI + MCP + REST API)
- **Classification** prevents cross-domain leaks (personal/professional/confidential)
- **Write Orchestrator** governs every mutation (schema + policy + audit + rollback)
- Any AI model (Claude, GPT, Cursor, Codex) connects via MCP

## The numbers

| Metric | Value |
|---|---|
| Documents indexed | 1,015 |
| Relationships (edges) | 3,394 |
| Classifications | 6 levels |
| Architecture decisions | 19 ADRs |
| Validated spikes | 11 (all GREEN) |
| MCP tools | 35+ |
| Release tags | v0.1 → v0.6 |
| Query latency (p90) | 2.9ms |
| Write governance | 100% schema + policy |
| Classification leak | 0% (invariant) |
| Rebuild from zero | 936ms, idempotent |

## How method-kit was extracted

During AKOS development (v0.1 to v0.6), patterns emerged that were **not product-specific**:

```
v0.1 — H1 Foundation established
        → Horizon progression pattern emerged
        → Spike validation with green criterion defined
        → ADR discipline enforced

v0.2 — Write Orchestrator + git backend
        → Governed write pipeline crystallized
        → Version by evidence rule proven

v0.4 — DocGraph REST API correction
        → Documentary honesty rule born
        → Correction as first-class workflow proven
        → Demo as contract validated

v0.5 — H2 Intelligence complete
        → Progressive autonomy ladder stress-tested
        → Deferred complexity principle applied (H3 deferred)

v0.6 — OH2.5 Productization
        → Single validation pipeline (make all)
        → Skills dynamic management
        → Context packs for token efficiency
```

Each rule in method-kit exists because **ignoring it caused a real bug, delay, or rework** during AKOS development.

## Before vs After

### Without method-kit

```
❌ "Looks done" → discovered broken endpoints in demo
❌ Documentation promised features that didn't work
❌ No clear criteria for "ready" — subjective
❌ Agent invented facts because no source enforcement
❌ Wrote code before deciding architecture
❌ Jumped to H3 complexity before H2 was validated
❌ Tests passed but product didn't demo correctly
```

### With method-kit

```
✅ Spike defines "done" numerically before code starts
✅ Demo script is the final test — catches integration bugs
✅ Documentation corrected with same urgency as code
✅ Agent cites sources or declares absence — never invents
✅ ADR registered before implementation begins
✅ Each horizon closes with evidence before next opens
✅ make all = one command proves everything
```

## How AKOS uses method-kit as operational layer

```
AKOS repository
├── .method-kit/              ← methodology package
├── .memory/
│   ├── product-vision.md     ← problem + principles
│   ├── decisions.md          ← 19 ADRs (D-001..D-019)
│   ├── architecture.md       ← technical target
│   ├── mapping.md            ← surface ↔ layer
│   └── glossary.md           ← domain vocabulary
├── .agents/skills/           ← governance skills (5 core + community)
├── AGENTS.md                 ← agent contract §1-§8
├── docs/
│   └── roadmap.md            ← horizons + spikes
├── cortex/                   ← Go motor (indexing, MCP, API)
├── knowledge/                ← Markdown documents (source of truth)
├── scripts/
│   └── demo-stakeholder.sh   ← demo as contract
└── Makefile                  ← single validation pipeline
```

The method-kit is **not separate** from AKOS — it IS the governance layer that keeps the product honest.

## Key learnings

### 1. "Implemented" ≠ "Working"

AKOS v0.4.0 claimed "Dashboard REST API live". Reality: the endpoint returned zeros because it read the wrong database. The demo script caught it. Unit tests didn't.

**Rule born:** Demo as Contract (Pillar 7).

### 2. Benchmarks prevent false claims

Every spike has a numeric green criterion. "9/10 queries return correct result" is not negotiable — either the benchmark passes or the feature doesn't exist.

**Rule born:** Spike Validation (Pillar 2) + Version by Evidence.

### 3. Decisions must precede code

Multiple times during AKOS, code was written that contradicted prior architectural decisions. The ADR discipline forces you to check: "does this contradict D-012?" before touching code.

**Rule born:** Decision Before Code (Pillar 3).

### 4. Complexity must be explicitly deferred

AKOS tried to jump from H2 to "H4/H5" without finishing H2. The owner correctly caught this: "we haven't even finished H2, why are we starting H4?" The explicit deferral (D-019) kept focus.

**Rule born:** Deferred Complexity + Horizon Progression (Pillar 1).

### 5. Classification prevents real damage

A public-clearance agent could have accessed confidential documents. The RedactionPolicy blocks this structurally — not by trust, but by architecture.

**Rule born:** Classification × Capability (Pillar 5).

## Conclusion

Method-kit is not a theoretical framework. It's the **extracted operating discipline** of a real product that went from v0.1 (empty repo) to v0.6 (35+ MCP tools, 11 validated spikes, full governance) in one development cycle.

Every rule exists because breaking it caused pain. Every pillar exists because following it prevented rework.
