# Decisions log — {{PRODUCT_NAME}}

Chronological log of product decisions. Each entry follows the ADR shape: **Context → Decision → Consequence**. IDs are incremental (`D-001`, `D-002`, ...) and never reused.

## Rules

- **Immutability.** An accepted ADR is never edited to change its meaning. Corrections and refinements land as new entries citing the previous one.
- **Two kinds of entry.**
  - **New ADR** — introduces or contradicts a decision. Requires the three blocks (Context / Decision / Consequence) and a status: `candidate`, `accepted`, or `superseded by D-YYY`.
  - **Execution ADR** — refines an accepted ADR without revoking it. Requires the three blocks with `Execution:` in place of `Decision:`.
- **Precedence.** If a skill or code proposal contradicts an accepted ADR, **stop** and open a new ADR here before proceeding (AGENTS.md §5).
- **Format.** Markdown, one H2 per entry, `D-XXX · <one-line summary>`.

---

## D-001 · {{TITLE_1}}

- **Context:** …
- **Decision:** …
- **Consequence:** …

## D-002 · {{TITLE_2}}

- **Context:** …
- **Decision:** …
- **Consequence:** …
