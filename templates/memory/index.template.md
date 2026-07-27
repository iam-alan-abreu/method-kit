---
name: index
description: Project memory index for {{PRODUCT_NAME}}
---

# Project Memory

## Core

One-liner rules applied on every action. Test: "would a new session on any page need this?" Keep each under ~150 chars.

- {{PRODUCT_NAME}} — {{PRODUCT_TAGLINE}}.
- No invention: every reply cites a graph node or opens a Request.
- Knowledge-as-code: knowledge only enters via Approval → immutable version. Never edit mocks to "add knowledge".
- Progressive autonomy per action class A0..A3. Never skip a step.
- **Roadmap is law** (AGENTS.md §5). No feature/ADR/spike/surface outside `docs/roadmap.md`, `.memory/product-vision.md`, `docs/architecture.md`, or accepted ADRs.
- **Mandatory closing block** (AGENTS.md §7): every delivery turn ends with progress bars per spike, aggregate %, checklist, ADRs, impact, `Skill applied:` line, and a `Next prompt` ready to paste. The Next prompt always carries the literal skill-selection paragraph.
- **Mandatory skill** (AGENTS.md §8): sweep both families in `.workspace/skills/` (upstream + product-specific). Both mandatory candidates. Product-specific wins on real tie. Apply during plan **and** execution.
- Visual theme: {{VISUAL_THEME}}. Constraint, not suggestion.
- Persistence and external-model policy: {{PERSISTENCE_POLICY}}.
- Never rename or remove routes — breaks history and links.
- Any change to protected modules ({{PROTECTED_MODULES}}) requires an entry in `.memory/decisions.md`.

## Memories

- [Product vision](.memory/product-vision.md) — canonical source: problem, principles, horizons, capabilities, metrics.
- [Architecture](.memory/architecture.md) — layers, surface map, spikes.
- [Mapping](.memory/mapping.md) — surface ↔ layer ↔ technical component.
- [Glossary](.memory/glossary.md) — domain terms.
- [Decisions log](.memory/decisions.md) — ADR history D-001..D-XXX.
- [Agent contract](AGENTS.md) — §1..§8, incl. §5 roadmap-is-law, §7 closing block, §8 skill selection.
- [Roadmap](docs/roadmap.md) — canonical single source: horizons, spikes, milestones, today vs target.
- [Skill catalogue](.agents/skills/) — upstream `mattpocock/skills` + product-specific `{{PRODUCT_SKILL_PREFIX}}-*`. Selection mandatory per §8.
