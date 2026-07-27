# Roadmap — Method Kit como Produto Unificado

Transformar o que existe hoje (AKOS + method-kit + boilerplate) num **produto único, agnóstico, reutilizável** que serve como:

1. **Segundo cérebro pessoal** (daemon persistente)
2. **Camada operacional por projeto** (dentro de qualquer repo)
3. **Metodologia instalável** (npx scaffold)
4. **Gateway de contexto para qualquer modelo/ferramenta de IA**

---

## Princípios do produto unificado

- **Agnóstico:** não depende de stack, modelo, linguagem ou ferramenta
- **Local-first:** zero dependência de cloud, API keys, ou serviços externos
- **Indexação sob demanda:** não indexa automaticamente; só quando solicitado
- **Skills dinâmicas:** skills vêm de comunidade (npx/git), atualizáveis, não hardcoded
- **Token-efficient:** context packs otimizados pra caber no budget do modelo
- **Multi-modo:** pessoal, projeto, scaffold — mesmo motor
- **Um comando prova tudo:** `make all` / `method-kit validate`

---

## Fase 1 — Extração e reorganização

**Objetivo:** Separar o motor do produto AKOS e criar repo `method-kit` independente.

### Tarefas

- [x] ~~Criar repo `github.com/iam-alan-abreu/method-kit`~~ (pendente push — estrutura pronta)
- [x] Mover `_boilerplate-method-kit/` como raiz do novo repo
- [ ] Mover `cortex/` (Go binary) como `core/` dentro do novo repo
- [x] Renomear CLI de `cortex` para `method-kit` (ou `mk`)
- [x] Criar `package.json` raiz com bin entry para `npx @method-kit/create`
- [x] Manter Go binary como motor (compilado separadamente)
- [x] README público com quick start
- [x] LICENSE MIT
- [ ] Tag v0.2.0 (após push)

### Estrutura alvo

```
method-kit/
├── core/                    ← motor Go (ex-cortex)
│   ├── cmd/mk/main.go       ← CLI unificado
│   ├── pkg/docgraph/        ← indexação + busca
│   ├── pkg/embedding/       ← semantic search
│   ├── pkg/vector/          ← vector store
│   ├── pkg/mcp/             ← MCP server
│   ├── pkg/writepolicy/     ← governança de escrita
│   └── pkg/api/             ← REST API
├── create/                  ← scaffold (npx)
│   ├── bin/cli.mjs
│   ├── templates/
│   └── scripts/
├── skills/                  ← skills metodológicas
│   ├── architecture-context/
│   ├── autonomy-ladder/
│   ├── knowledge-as-code/
│   ├── no-invention/
│   └── product-context/
├── METHODOLOGY.md
├── README.md
├── Makefile
└── package.json
```

---

## Fase 2 — Skills dinâmicas e atualizáveis

**Objetivo:** Skills não ficam hardcoded no repo. São baixadas/atualizadas de fontes externas.

### Tarefas

- [x] Criar `skills.lock.json` que mapeia skills instaladas → source (git URL ou npm)
- [x] Comando `method-kit skills update` que atualiza skills de suas fontes
- [x] Comando `method-kit skills add <source>` (git repo, npm package, ou URL)
- [x] Comando `method-kit skills list` (mostra instaladas + versão + source)
- [x] Skills da comunidade são clonadas em `.agents/skills/<name>/`
- [x] Cada skill tem `SKILL.md` + `metadata.json` (version, source, hash)
- [ ] Auto-update opcional (check on `method-kit brain start`)

### Formato de source

```json
{
  "skills": {
    "architecture-context": {
      "source": "github:iam-alan-abreu/method-kit/skills/architecture-context",
      "version": "0.2.0",
      "hash": "sha256:..."
    },
    "tdd": {
      "source": "github:mattpocock/skills/tdd",
      "version": "latest",
      "hash": "sha256:..."
    },
    "ruflo": {
      "source": "github:ruvnet/ruflo/SKILL.md",
      "version": "3.32.13",
      "hash": "sha256:..."
    }
  }
}
```

### Fontes suportadas

- `github:<owner>/<repo>/<path>` — clona diretório específico
- `npm:<package>` — instala e extrai skill
- `npx skills add <source>` — compatível com ecossistema skills.sh
- `local:<path>` — skill local (dev)

---

## Fase 3 — CLI unificado multi-modo

**Objetivo:** Um binário/comando que serve os 3 modos.

### Comandos

```bash
# Modo scaffold (cria estrutura)
method-kit init <project-name>

# Modo brain (daemon pessoal)
method-kit brain start          # inicia daemon persistente
method-kit brain stop           # para
method-kit brain status         # mostra estado

# Indexação (sob demanda)
method-kit index                # indexa knowledge/ do projeto atual
method-kit index --dir ~/notes  # indexa diretório externo

# Consulta
method-kit ask "como funciona X?"          # context pack
method-kit search "postgres tuning"         # busca textual
method-kit get note:akf-defaults            # documento específico

# MCP (para modelos conectarem)
method-kit mcp stdio            # JSON-RPC via stdin/stdout
method-kit mcp serve            # HTTP em porta configurável

# Skills
method-kit skills list
method-kit skills add <source>
method-kit skills update
method-kit skills remove <name>

# Validação
method-kit validate             # roda spikes + demo
method-kit benchmark            # roda benchmarks S1-S11

# Governança
method-kit write propose <id> <file>
method-kit write approve <proposal-id>
method-kit write commit <proposal-id>

# API + Dashboard
method-kit serve                # REST API + dashboard
method-kit serve --port 9090
```

---

## Fase 4 — Integração agnóstica com qualquer ferramenta

**Objetivo:** Qualquer modelo/ferramenta descobre e usa o method-kit sem configuração manual.

### MCP config template (`.mcp.json`)

Para qualquer repo que queira usar o brain:

```json
{
  "mcpServers": {
    "method-kit": {
      "command": "method-kit",
      "args": ["mcp", "stdio"]
    }
  }
}
```

Isso funciona se `method-kit` estiver no PATH (via `go install` ou `brew`).

### System prompt injection (para modelos sem MCP)

```
method-kit prompt
# Gera o system prompt otimizado para qualquer modelo
# Inclui: regras, tools disponíveis, formato de citação
```

### Integrações alvo

| Ferramenta | Como conecta | Config |
|---|---|---|
| Claude Code / Zed | `.mcp.json` no repo | auto |
| Cursor | `.cursor/mcp.json` | auto |
| Copilot | `.github/copilot-instructions.md` + MCP | manual + auto |
| Codex | MCP config | auto |
| Hermes (qualquer profile) | HTTP client → `method-kit mcp serve` | integration code |
| GPT (API) | System prompt + HTTP calls | wrapper |
| Ollama / local | System prompt + HTTP | wrapper |
| Windsurf | `.windsurfrules` + MCP | auto |

### Otimização de tokens

- Context packs respeitam `max_tokens` configurável
- Snippets truncados inteligentemente (não corta no meio de frase)
- Classificação declarada no pack (modelo sabe o que está lendo)
- Citações compactas (ID, não path completo)
- Markdown estruturado (headings permitem skip sections)

---

## Fase 5 — Dashboard / UI (futuro, pós-consolidação)

**Objetivo:** Visualização do conhecimento indexado para humanos.

### Tarefas

- [ ] Redesign completo do GraphView (react-force-graph ou alternativa)
- [ ] Layout responsivo (fullscreen)
- [ ] Filtros por tipo, classificação, status
- [ ] Search integrado
- [ ] Node detail panel
- [ ] Timeline view (temporal layer)
- [ ] Conflict view
- [ ] Mobile-friendly

**Nota:** Dashboard é feature de visualização, não de operação. O motor funciona sem dashboard. Dashboard vem depois que motor + CLI + skills + integrações estiverem estáveis.

---

## Fase 6 — Comunidade

**Objetivo:** Permitir contribuições e adoção.

### Tarefas

- [ ] Docs site (VitePress ou Astro)
- [ ] Guia de contribuição de skills
- [ ] Template de skill (`method-kit skills create <name>`)
- [ ] Registry de skills da comunidade
- [ ] Case studies
- [ ] Traduções (PT-BR, ES, EN)
- [ ] GitHub Actions para publish npm + Go binary
- [ ] Homebrew formula
- [ ] Docker image

---

## Ordem de execução recomendada

```
Fase 1 → Extração (1-2 dias)
  ↓
Fase 2 → Skills dinâmicas (2-3 dias)
  ↓
Fase 3 → CLI unificado (3-5 dias)
  ↓
Fase 4 → Integrações (2-3 dias)
  ↓
Fase 5 → Dashboard (1-2 semanas, outro momento)
  ↓
Fase 6 → Comunidade (ongoing)
```

---

## O que NÃO muda

- Metodologia (7 pilares) — permanece
- ADR discipline — permanece
- Spike validation — permanece
- Classification × Capability — permanece
- Progressive autonomy — permanece
- Demo as contract — permanece
- Knowledge-as-code — permanece

---

## O que muda

| De | Para |
|---|---|
| AKOS como projeto interno | method-kit como produto público |
| `cortex` CLI | `method-kit` CLI |
| Skills hardcoded no repo | Skills dinâmicas de fontes externas |
| Vive dentro do projeto | Pode viver separado (daemon) ou dentro |
| Só funciona com Claude Code | Funciona com qualquer modelo/ferramenta |
| Dashboard obrigatório | Dashboard opcional (motor funciona sem) |
| Indexação automática | Indexação sob demanda |
| `AKOS` naming | `method-kit` naming (ou outro que decidir) |
