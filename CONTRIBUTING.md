# Contributing to Method Kit

## How to contribute a skill

1. Fork this repo
2. Create `skills/<your-skill-name>/SKILL.md`
3. Follow the skill format:

```markdown
name: your-skill-name
description: One line describing when to use this skill
---

# Your Skill Name

[Full instructions for the AI agent...]
```

4. Open a PR with:
   - What real execution revealed this skill
   - Before/after evidence
   - Which pillar it supports (1-7)

## How to contribute a template

1. Create `templates/<category>/<name>.template.md`
2. Use `{{PLACEHOLDER}}` for variables
3. Document which placeholder maps to what

## How to report methodology improvements

1. Open an issue describing:
   - What you tried
   - What failed or was missing
   - What would have helped
2. Reference which pillar (1-7) is affected
3. Provide evidence from real execution (not theory)

## Rules

- Every contribution must cite real execution evidence
- No theoretical additions — only battle-tested improvements
- Skills must be stack-agnostic unless explicitly scoped
- Templates must work with `{{PLACEHOLDER}}` substitution
- Don't break existing skills/templates (backward compatible)