# {{PRODUCT_NAME}} — Agent Contract

{{PRODUCT_TAGLINE}}

This document defines how any agent — human or AI — operates inside {{PRODUCT_NAME}}. Source of truth: `.memory/product-vision.md`. Surface ↔ layer map: `.memory/mapping.md`. Glossary: `.memory/glossary.md`.

## §1 · Operating principles

Non-negotiable. Applied by every agent, every turn.

1. **Epistemic honesty.** Declare uncertainty. Never invent. If the graph has no coverage, say so.
2. **Always cite sources.** Every claim points at the graph node that backs it.
3. **"I don't know" is a valid answer.** Better than a confident wrong one. When triggered, open a Request automatically.
4. **Approval by action class.** Reads are free; non-prod writes need confirmation; prod writes need named approval.
5. **Autonomy is progressive.** Suggest → approved execution → autonomy, only with audited history. Never skip a step.
6. **Full audit.** Every action records author, context used, model (if applicable), execution, and outcome.

## §2 · Data contract

- Every reply cites **at least one graph node** or declares absence.
- No node ≡ no answer → the agent **opens a Request**, filling in question, author, suggested owner.
- Knowledge only enters via the **Approval flow** (see `cortex-knowledge-as-code` skill), never through direct code edits of mocks.
- Guardrails apply **before** any plan is presented (see the product's Immune-equivalent surface).

## §3 · Action-class matrix (A0..A3)

Canonical scale. Aligned with `action_audit.action_class`.

| Class | Definition | Example | Autonomy | Approval gate |
|---|---|---|---|---|
| **A0** | Read / query | Consult resource, wiki, mission, mesh | Full | Free |
| **A1** | Reversible write outside prod | Draft signal; PR comment; staging ticket | Full (draft) / None (promote via Approval) | Requester confirmation; promotion needs domain curator |
| **A2** | Reversible write in prod | Rollback, restart, scale; edit guardrail rule | None | Named approval (Slack / MCP) |
| **A3** | Destructive / irreversible | Delete resource, secret change, RBAC change | **Agent does not propose A3 autonomously** | Dual approval |

## §4 · Surfaces

| Surface | Role of the agent here |
|---|---|
| {{SURFACES}} | Fill per product. Each surface names one layer of the vision. |

## §5 · Roadmap is law

No feature, ADR, spike, surface, tool, or integration may be proposed or built if it is not in `docs/roadmap.md`, `.memory/product-vision.md`, `docs/architecture.md`, or an accepted ADR in `.memory/decisions.md`. If something is missing, **first** open an entry in `.memory/decisions.md` (new ADR or execution note) — then code. Applies to human or AI, any surface. No shortcut: "would be nice" is not an entry.

### §5.1 · Mandatory pre-implementation checklist

Every proposal answers, in its own text, these six questions. Any blank → **stop** and open an entry in `.memory/decisions.md`:

1. **Which roadmap item does this address?** Cite `docs/roadmap.md` or a § of the vision.
2. **Which ADR supports it?** Cite `D-XXX`. If it contradicts an accepted ADR, open a new ADR first.
3. **Does it touch a protected module?** If yes ({{PROTECTED_MODULES}}), requires entry in `.memory/decisions.md`.
4. **Does it create a new surface / route?** If yes, must fit `.memory/mapping.md` — no duplicating an existing surface.
5. **Is the §7 closing block ready?** Roadmap block + next prompt formatted per §7. The "Next prompt" **must carry the literal skill-selection paragraph** citing both families.
6. **Skill selected and declared?** Apply §8: name + one-line reason (or `none` justified). Missing line blocks delivery.

## §6 · Relation with sibling products

Fill per product. State which sibling products share the underlying graph and how signals flow between them.

## §7 · Mandatory closing block

Hard rule: **every turn that ships work** ends with the standardised block below. Applies to human or AI, any surface. No negotiation.

### Scope

- **Applies to:** code, docs, `.memory/`, new/updated ADR, spike state change, UI change, refactor, migration, data seed.
- **Does not apply to:** conceptual discussion, scope negotiation before a plan, explanation ("explain X"), read-only return. In those cases:
  - Nothing changed → both blocks dispensed.
  - Some state changed but nothing shipped → keep only the "Roadmap status".

### Template (in order, always)

```text
━━ Roadmap {{ACTIVE_HORIZON}} ━━
S1 <question>        [██░░░░░░░░]  in progress
S2 <question>        [░░░░░░░░░░]  not started
S3 <question>        [░░░░░░░░░░]  not started
S4 <question>        [░░░░░░░░░░]  not started
Aggregate {{ACTIVE_HORIZON}}: N% · Checklist: X/Y · Accepted ADRs: D-001..D-XXX · candidates: D-YYY
Skill applied: <name> · reason: <1 line> — or `none · <reason>` (§8)
Impact: —

━━ Next prompt ━━
Draft a plan based on the following message 👇
<short message asking for the next roadmap step>

<literal skill-selection paragraph from templates/skill-selection-paragraph.txt — copy verbatim, do not paraphrase>
```

### Block rules

- **Number source.** Spikes read from `docs/roadmap.md` §Spikes + current state in the product's telemetry module. ADRs in `.memory/decisions.md`. Never invent a percentage.
- **Bars.** 10 progress blocks. Fixed status mapping:
  - `done` → `[██████████]` (100%)
  - `in_progress` → `[████░░░░░░]` (40%)
  - `blocked` → `[█░░░░░░░░░] ⚠` (10% + mark)
  - `not_started` → `[░░░░░░░░░░]` (0%)
- **Aggregate.** `round(spikesDone / totalSpikes * 100)`. If all `done`, header becomes `━━ Roadmap {{ACTIVE_HORIZON}} · complete ━━`.
- **Impact.** IDs separated by `·` — spike (`S1`), ADR (`D-XXX`), milestone. Nothing touched → `—`.
- **Next prompt.** Deterministic selection:
  1. First spike with status ≠ `done` in order S1 → S2 → S3 → S4.
  2. If all `done`, next H→H milestone open.
  3. If milestones closed, next item of the next horizon.
  4. Never invent an item outside `docs/roadmap.md`.
- **Next-prompt format.** Two parts, always:
  1. `Draft a plan based on the following message 👇` + short message (≤ 2 lines) asking for the next step. One option only, never a menu.
  2. The **literal, immutable** skill-selection paragraph from `.method-kit/templates/skill-selection-paragraph.txt` — do not paraphrase, do not summarise, do not omit.

### Anti-patterns

- Prose status ("we're at about 12%…") instead of the standardised block.
- Omitting the "Next prompt" on a delivery turn by claiming "I'd rather discuss first".
- Inventing a percentage, spike, or milestone not in `docs/roadmap.md`.
- Menu of next prompts (2+ options). Rule is one deterministic option.
- Omitting `Skill applied:` on a delivery turn.
- Omitting or paraphrasing the skill-selection paragraph in the "Next prompt" block — the paragraph is literal.

## §8 · Mandatory skill selection

Hard rule: **every delivery turn** explicitly selects the most adequate skill **before** acting. Human or AI. No negotiation.

### Base catalogue

- **Upstream:** `mattpocock/skills` (except `deprecated/`) — installed under `.agents/skills/`. Covers engineering, writing, workflow, TDD, code review, handoff.
- **Product-specific:** `{{PRODUCT_SKILL_PREFIX}}-*` — installed under `.agents/skills/`. Product rules always win over generic heuristic when both cover the same context.
- Live catalogue is whatever sits in `.workspace/skills/` at the turn.

### Selection criterion

1. Scan **all** active skills in `.workspace/skills/` — both families (upstream + product-specific) are mandatory candidates on every selection. Read the `description` frontmatter of every plausibly relevant one.
2. Pick the most specific to the turn's context. **Real tie** → product-specific wins; otherwise upstream can win without penalty.
3. If nothing fits, declare `Skill applied: none · reason: <why>` in the §7 block. Never force a pick to fill the line.
4. If the chosen skill contradicts an accepted ADR, **stop** and open a new ADR in `.memory/decisions.md` before proceeding (§5).

### Two moments

- **Moment 1 · plan.** The chosen skill guides plan construction (structure, checklist, validations). Not a post-hoc label. Declare at plan's end: `Suggested skill: <name> · reason: <one line>`.
- **Moment 2 · execution.** Re-evaluate when real code opens — the domain may shift. Apply the skill during execution. Declare in the §7 block: `Skill applied: <name> · reason: <one line>`.

### Anti-patterns

- Picking a generic skill just to "fill the line".
- Inventing a skill that doesn't exist in `.workspace/skills/`.
- Applying an upstream skill whose content contradicts an accepted ADR without a new ADR.
- Consulting only one family (upstream or product-specific) before choosing.
- Treating the skill as a footer stamp without applying it during plan / execution.
- Omitting `Skill applied:` claiming "it was obvious".
