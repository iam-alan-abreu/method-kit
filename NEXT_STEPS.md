# Next Steps — Method Kit Boilerplate

This file is the development prompt for completing and publishing this methodology kit.

## What this IS

- A development methodology for AI-assisted projects
- Portable, installable via `npx @method-kit/create <project-name>`
- Stack-agnostic, model-agnostic, language-agnostic
- 7 pillars + operational rules extracted from real execution
- Templates + skills that any project adopts

## What this is NOT

- Not a product, not a framework, not a library
- Not tied to AKOS, Cortex, or any specific product
- Not tied to Go, React, SQLite, or any stack
- Not a replacement for build tools or CI/CD

## Current state

- [x] README.md with quick start and pillars
- [x] METHODOLOGY.md with full methodology text
- [x] package.json with bin entry for npx
- [x] bin/cli.mjs installer script
- [x] AGENTS.template.md
- [ ] Templates in templates/memory/*.template.md (need to be created from .method-kit originals)
- [ ] Templates in templates/docs/*.template.md (need to be created from .method-kit originals)
- [ ] Skills in skills/cortex-* (need to be copied from .method-kit/skills/)
- [ ] scripts/init.sh (shell alternative to npx)
- [ ] Tests for the CLI
- [ ] GitHub Actions for publish to npm
- [ ] Real npm publish under @method-kit/create
- [ ] Landing page / docs site (optional)

## To complete before first publish

### 1. Copy templates from source

From `/Users/iam.alan.abreu/Works/L3AN/ai-knowledge-operate-system/.method-kit/templates/`:
- `AGENTS.template.md` → `templates/AGENTS.template.md`
- `skill-selection-paragraph.txt` → `templates/skill-selection-paragraph.txt`
- `memory/*.template.md` → `templates/memory/*.template.md`
- `docs/*.template.md` → `templates/docs/*.template.md`

### 2. Copy skills from source

From `/Users/iam.alan.abreu/Works/L3AN/ai-knowledge-operate-system/.method-kit/skills/`:
- `cortex-architecture-context/` → `skills/architecture-context/` (rename prefix)
- `cortex-autonomy-ladder/` → `skills/autonomy-ladder/`
- `cortex-knowledge-as-code/` → `skills/knowledge-as-code/`
- `cortex-no-invention/` → `skills/no-invention/`
- `cortex-product-context/` → `skills/product-context/`

Rename `cortex-*` prefix to generic names since this is no longer CÓRTEX-specific.

### 3. Update skill content

Inside each skill SKILL.md, replace CÓRTEX-specific references with generic methodology references. Keep the discipline; remove the product.

### 4. Create scripts/init.sh

Shell script alternative for environments without Node.js. Same behavior as bin/cli.mjs.

### 5. Test the CLI

```bash
cd /tmp
mkdir test-project && cd test-project
node /path/to/boilerplate/bin/cli.mjs my-test-project
# Verify: AGENTS.md, .memory/, docs/, .agents/skills/ all created
# Verify: placeholders replaced
# Verify: no overwrites on re-run
```

### 6. Publish

```bash
npm login
npm publish --access public
```

Then users can:
```bash
npx @method-kit/create my-project
```

### 7. GitHub repo setup

- Create `github.com/iam-alan-abreu/method-kit`
- Add README, LICENSE (MIT), METHODOLOGY.md
- Tag v0.2.0
- Enable npm publish via GitHub Actions on tag

## Design decisions

- **npx over global install** — zero friction, always latest version
- **No overwrites** — safe to re-run, idempotent
- **Templates use `{{PLACEHOLDER}}`** — simple, no engine needed
- **Skills are copied, not symlinked** — works on Windows, in zip, in monorepos
- **Skill prefix is configurable** — not hardcoded to `cortex-`
- **No runtime dependency** — the kit is static files + one CLI script

## Vision

This becomes the standard way to start an AI-assisted development project with governance. Like `create-react-app` was for React, but for methodology — not for code.

The community contributes:
- New skills (e.g., `security-audit`, `performance-review`)
- New templates (e.g., for specific frameworks)
- Translations (Portuguese, Spanish, etc.)
- Case studies showing how the methodology was applied