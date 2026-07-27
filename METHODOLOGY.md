# Development Methodology — Method Kit v0.2.0

AI-first development methodology for products with progressive autonomy. Stack-agnostic. Model-agnostic. Language-agnostic.

## Seven Pillars

### 1. Horizon Progression

Work divides into sequential horizons. Each has closed scope and exit criterion. No horizon starts before the previous is validated by evidence.

- H1 = foundation minimum viable
- H2 = intelligence/capability on foundation
- H3 = scale/complexity on capability

No skipping. No parallel horizons.

### 2. Spike Validation with Objective Green Criterion

Every capability is proven by a spike — a question with numeric threshold defined BEFORE implementation:

```
Question: "Does the system deliver X?"
Criterion: sample ≥ N, rate ≥ Y%, latency < Z
Result: passes → GREEN ✅ | fails → RED ❌
```

No subjectivity. Benchmark passes or capability doesn't exist.

### 3. Decision Before Code (ADR)

Every decision registered before becoming code:

```
Context → Decision → Consequence → Acceptance metric
```

Decisions are immutable. Supersession is explicit.

### 4. Governed Write Pipeline

Every mutation through pipeline:

```
Intention → Schema validation → Diff → Proportional approval → Commit → Reindex
```

Approval scales with risk.

### 5. Classification × Capability

Every information has classification. Every consumer has capability. System filters before delivery.

### 6. Progressive Autonomy (A0..A3)

| Class | Definition | Autonomy | Gate |
|---|---|---|---|
| A0 | Read/query | Full | Free |
| A1 | Reversible write outside prod | Confirmation | Requester |
| A2 | Reversible write in prod | None | Named approval |
| A3 | Destructive/irreversible | Never autonomous | Dual approval |

### 7. Demo as Contract

Final test is the demo script. One command. Everything passes. Or nothing is ready.

## Operational Rules

- **Roadmap is law** — no feature without entry
- **Non-invention** — never fabricate; cite source or declare absence
- **Documentary honesty** — docs that lie = product bug
- **Version by evidence** — tag only when green
- **Deferred complexity** — explicit deferral with registered decision
- **Correction as first-class** — test that catches → fix → validate → register → supersede
- **Mandatory closing block** — every delivery declares state + next step
- **Skill selection per turn** — declare discipline before acting
- **Full audit** — who, what, when, context, result
- **Single validation pipeline** — setup → build → test → benchmark → demo

## Usage

```bash
npx @method-kit/create my-project
```

Or manually:

```bash
git clone https://github.com/iam-alan-abreu/method-kit
cp -r method-kit/.method-kit ./my-project/
cd my-project && .method-kit/scripts/init.sh my-project
```