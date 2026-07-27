# Mapping — surface ↔ layer ↔ technical component

Every user-facing surface names exactly one layer of the vision. Every layer names its target technical component. If a proposed change does not fit this table, either the table is wrong (open an ADR) or the change is wrong (do not build it).

| Surface (route / area) | Vision layer | Target technical component |
|---|---|---|
| {{SURFACE_1}} | {{LAYER_1}} | {{COMPONENT_1}} |
| {{SURFACE_2}} | {{LAYER_2}} | {{COMPONENT_2}} |

## Rules

- One surface per layer. No duplicates.
- Renaming a surface breaks history — open an ADR first.
- New surface requires: (a) a layer in `.memory/product-vision.md`, (b) an entry here, (c) an ADR in `.memory/decisions.md`.
