# {{PRODUCT_NAME}} — Roadmap

**Version 0.1 · {{DATE}}.** Canonical single source of roadmap. Consolidates `.memory/product-vision.md` §9 and §16 and `docs/architecture.md`. No new content: if something is missing, open an ADR in `.memory/decisions.md` first.

---

## §1 · Horizons

| H | Name | Timeframe | What changes |
|---|---|---|---|
| **H1** | {{H1_NAME}} | 0–6 m | {{H1_CHANGE}} |
| **H2** | {{H2_NAME}} | 6–18 m | {{H2_CHANGE}} |
| **H3** | {{H3_NAME}} | 18+ m | {{H3_CHANGE}} |

Scope of this roadmap: **details H1**, with pointers to what changes in H2/H3 when structurally relevant.

## §2 · Indicative roadmap by quarter

- **0–3 m** — {{Q1}}
- **3–6 m** — {{Q2}}
- **6–12 m** — {{Q3}}
- **12+ m** — {{Q4}}

## §3 · Validation spikes

Every spike has an **objective "green" criterion** — see `docs/spike-criterion.md`.

| # | Question | Green criterion (summary) | State |
|---|---|---|---|
| **S1** | {{S1_QUESTION}} | sample ≥ N · coverage ≥ M% · p90 < T | {{S1_STATE}} |
| **S2** | {{S2_QUESTION}} | sample ≥ N · types ≥ M/T · anchoring ≥ M% · p90 < T | {{S2_STATE}} |
| **S3** | {{S3_QUESTION}} | sample ≥ N · gated 100% (invariant) · rollback ≥ M% · p90 < T · classes ≥ M/T | {{S3_STATE}} |
| **S4** | {{S4_QUESTION}} | {{S4_CRITERION}} | {{S4_STATE}} |

## §4 · H1 → H2 exit milestones

Objective criteria implicit in the vision + architecture. Anchor for decision when each resolves.

- [ ] **S1..S4 green** (all spikes with status `done`).
- [ ] **{{MILESTONE_2}}**
- [ ] **{{MILESTONE_3}}**
- [ ] **{{MILESTONE_4}}**

## §5 · Today vs. target

| Layer / technical component | Current surface | State |
|---|---|---|
| {{ROW}} | {{SURFACE}} | {{STATE}} |

## §6 · Out of scope

Bullet list — pointer to `.memory/product-vision.md §15`.

## §7 · Risks

Bullet list — pointer to `.memory/product-vision.md §14`.

---

## References

- Vision: `.memory/product-vision.md` §9, §16, §14, §15.
- Architecture: `docs/architecture.md`.
- Technical state: `.memory/architecture.md`.
- Decisions: `.memory/decisions.md`.
- Agent contract: `AGENTS.md` §3 (A0..A3 matrix).

## Revision notes

Any change to a horizon, spike, milestone, or quarter requires an entry in `.memory/decisions.md` before editing here.
