# Creating and Contributing Skills

How to create a new skill for method-kit.

## What is a skill?

A skill is a set of instructions that teaches an AI agent a specific discipline.
It lives in a directory with a `SKILL.md` file.

## Structure

```
skills/my-skill/
└── SKILL.md
```

## SKILL.md format

```markdown
name: my-skill
description: One line describing when to activate this skill
---

# My Skill Name

## When to use

Describe the trigger conditions — when should the agent load this skill.

## Rules

1. First rule the agent must follow
2. Second rule
3. Third rule

## Anti-patterns

- What NOT to do (common mistakes)
- Another anti-pattern

## Examples

Good:
```
[example of correct behavior]
```

Bad:
```
[example of incorrect behavior]
```
```

## Creating a new skill

```bash
# 1. Create directory
mkdir -p .agents/skills/my-new-skill

# 2. Write SKILL.md
cat > .agents/skills/my-new-skill/SKILL.md << 'SKILL'
name: my-new-skill
description: Enforce security review before merging auth-related code
---

# Security Review Skill

## When to use

Activate when the change touches authentication, authorization,
cryptography, secrets management, or access control.

## Rules

1. Never hardcode secrets — use environment variables or vault
2. Always validate input on the server side
3. Use parameterized queries — never string concatenation for SQL
4. Log auth events (success and failure) without logging credentials
5. Require review from security-tagged reviewer before merge

## Anti-patterns

- Storing JWT secret in source code
- Using MD5 or SHA1 for passwords
- Disabling CORS for convenience
- Catching and swallowing auth errors silently
SKILL

# 3. Register in skills.lock.json
method-kit skills add local:.agents/skills/my-new-skill

# 4. Verify
method-kit skills list
```

## Publishing a skill

1. Push to a GitHub repo
2. Others install with:

```bash
method-kit skills add github:your-user/your-repo/skills/my-new-skill
```

## Contributing to method-kit core skills

1. Fork https://github.com/iam-alan-abreu/method-kit
2. Add your skill to `skills/your-skill-name/SKILL.md`
3. Open a PR with:
   - What real execution revealed this skill is needed
   - Which pillar (1-7) it supports
   - Before/after evidence

## Rules for skill contributions

- Every skill must cite real execution evidence (not theory)
- Skills must be stack-agnostic unless explicitly scoped
- One `SKILL.md` per skill (keep it focused)
- Description must be one line (used for auto-matching)
- Anti-patterns section is mandatory (prevents misuse)
