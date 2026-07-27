# Spike criterion — reference

Every validation spike in `docs/roadmap.md` has an **objective "green" criterion**. This document is the reference for how to write one and how a panel reads it. Extracted from CÓRTEX ADRs D-029 (S1), D-030 (S2), D-031 (S3).

---

## §1 · Anatomy of "green"

Four dimensions. Not all spikes use all four; pick the ones that decide the question.

1. **Minimum sample (`sampleMin`).** How many observations before the metric means anything. Default `10`. Rationale: enough for a p90 to stabilise; small enough that a demo seed can reach it.
2. **Coverage or anchoring (`coverageMin` %).** Semantics depend on the spike:
   - S1-like (context briefing): % of answers grounded in at least one graph node.
   - S2-like (signal capture): % of suggestions anchored to a real source.
   - S3-like (approval gate): does not apply; replaced by the hard invariant below.
3. **p90 latency (`p90Max` ms).** 90th percentile of the critical operation. Default per spike: S1 `< 10 000 ms`, S2 `< 500 ms`, S3 `< 5 000 ms`.
4. **Classes / types covered (`classesMin` / `totalClasses`).** For spikes that must exercise multiple flow types (e.g., action classes A0..A3, signal types). Default `≥ 3/4`.

Each dimension has a default, a rationale, and a value fixed by the ADR that governs the spike.

## §2 · Verdict scale

Three states. Never four.

- **`green`** — every criterion met.
- **`partial`** — sample ≥ half of `sampleMin` **and** at most one acceptable relaxation on a non-invariant dimension.
- **`insufficient`** — default; also forced when a hard invariant breaks (see §3).

The verdict is a chip in the panel and a promotion gate — `promote SN → done` is enabled only on `green`.

## §3 · Hard invariant

Some spikes have a structural gate that is not statistical — it must hold or the spike is not the spike we agreed to run. Example: S3 (approval gate) requires every execution record to carry `approvedBy`. If any execution lacks it, the invariant breaks and the verdict is **forced to `insufficient`** — never `partial`.

State the invariant per spike in one sentence.

## §4 · Additive demo seed

To close the validation loop without waiting for real usage, expose an opt-in "seed demo" button that injects synthetic observations into the telemetry store.

Rules:

- **Opt-in.** Button in the panel, never automatic.
- **Reversible.** A "clear" action removes only what the seed injected (or the entire panel-scoped store — never other surfaces).
- **Same API as real flow.** The seed uses the same recording function real usage does — no shortcut path.
- **Does not pollute other surfaces.** Seed writes only in the panel-owned key.
- **Labelled.** Records marked `synthetic: true` when the store shape allows.

## §5 · `SNPanel` component contract

Every spike ships a panel at `/architecture?tab=mvp` (or equivalent).

- **Verdict chip** — `green` / `partial` / `insufficient`, coloured; tooltip lists missing dimensions.
- **Cards per dimension** — one card per criterion, tone reflecting distance to target.
- **Data drawer** — modal listing raw observations, most recent first.
- **Promote button** — `promote SN → done`, enabled only when `canPromote(stats)` returns true. Disabled state shows what's missing on hover.
- **Clear button** — reversible; requires confirmation.

## §6 · Safe instrumentation

The critical path must record even when it throws.

- Wrap the recording call in `try/catch`.
- On catch, record a `no-record` event with the reason — never leave the metric silent.
- The metric is telemetry, not business logic — a failure to record must not break the user flow.

## §7 · Reference implementations

Fill per product. Example rows:

- `S1` telemetry module → panel component.
- `S2` telemetry module → panel component.
- `S3` telemetry module → panel component.
