# Brain Mode — Personal Second Brain

How to use method-kit as a persistent knowledge daemon.

## Concept

Brain mode keeps method-kit running as a background service.
Any AI tool you use (Claude, GPT, Cursor, Codex) connects to it
and gets context from YOUR knowledge, not from training data.

## Setup

```bash
# 1. Create your knowledge directory
mkdir -p ~/knowledge

# 2. Add your first documents
cat > ~/knowledge/notes/postgres-defaults.md << 'NOTE'
---
id: note:postgres-defaults
type: note
title: Postgres tuning defaults
status: active
classification: profissional
confidence: verified
---

Default settings for production Postgres:
- shared_buffers = 25% of RAM
- effective_cache_size = 75% of RAM
- work_mem = RAM / max_connections / 4
NOTE

# 3. Start brain daemon
method-kit brain start
# → Indexing ~/knowledge...
# → MCP server on localhost:8080
# → Ready.

# 4. Test
method-kit ask "postgres buffer settings"
# → Returns context pack with your note cited
```

## Connect your tools

Add to any project's `.mcp.json`:

```json
{
  "mcpServers": {
    "brain": {
      "command": "method-kit",
      "args": ["mcp", "stdio"]
    }
  }
}
```

Now any AI tool that opens that project has access to your brain.

## Adding knowledge

```bash
# Write a new note
cat > ~/knowledge/decisions/use-jwt.md << 'ADR'
---
id: adr:use-jwt
type: adr
title: Use JWT for authentication
status: accepted
classification: profissional
confidence: decision
---

## Context
Need stateless auth for microservices.

## Decision
Use JWT with RS256 signing.

## Consequence
No session store needed. Token validation is local.
ADR

# Reindex
method-kit index --dir ~/knowledge
```

## Ask from any tool

From Claude Code, Cursor, or any MCP client:

```
You: "What auth pattern do we use?"
Model calls: cortex_doc_context_pack("authentication pattern")
AKOS returns: "adr:use-jwt — Use JWT with RS256 signing (accepted, decision)"
Model responds: "Per ADR adr:use-jwt, we use JWT with RS256 signing for stateless auth."
```

The model cites YOUR decision, not training data.

## Classification

Documents have classification levels:
- `publico` — anyone can see
- `pessoal` — only you
- `profissional` — work context
- `confidencial` — restricted
- `sensivel` — owner only

When a model with `profissional` capability asks, it never sees `sensivel` docs.
