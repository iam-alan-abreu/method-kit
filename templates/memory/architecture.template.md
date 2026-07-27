# Architecture — navigable summary

Short summary for orientation. Full source: `docs/architecture.md`. Structural decisions in `.memory/decisions.md`. Surface ↔ layer map in `.memory/mapping.md`.

> **Current state.** State what is implemented vs. target. The functional shell in `src/` is the minimum {{ACTIVE_HORIZON}} skeleton that leaves room for real components to arrive without breaking UX.

## Layers

1. **Ingestion / events** — {{LAYER_1}}
2. **Context graph** — {{LAYER_2}}
3. **Agent fleet** — {{LAYER_3}}
4. **Surfaces** — {{LAYER_4}}
5. **Guardrails** — {{LAYER_5}}
6. **Execution** — {{LAYER_6}}
7. **Knowledge** — {{LAYER_7}}

## Layer ↔ current surface

| Layer / technical component | Current surface | State |
|---|---|---|
| {{COMPONENT_1}} | {{SURFACE_1}} | {{STATE_1}} |
| {{COMPONENT_2}} | {{SURFACE_2}} | {{STATE_2}} |

## Validation spikes

| # | Question | State |
|---|---|---|
| S1 | {{S1_Q}} | {{S1_STATE}} |
| S2 | {{S2_Q}} | {{S2_STATE}} |
| S3 | {{S3_Q}} | {{S3_STATE}} |
| S4 | {{S4_Q}} | {{S4_STATE}} |

Each spike gets an objective "green" criterion — see `docs/spike-criterion.md`.

## Derived rules for any technical change

Bullet list. Each bullet cites the ADR that supports it.
