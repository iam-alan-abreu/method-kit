---
name: cortex-no-invention
description: Regra dura do CÓRTEX — o agente só responde com base em nós registrados (Recurso, Wiki, Missão, Pedido). Nunca inventa. Use sempre que estiver escrevendo lógica de resposta, chat, plano de missão, sugestão do Estômago, resposta do Mesh, ou qualquer texto que a UI apresente como "resposta do sistema".
---

# cortex-no-invention

O CÓRTEX é AI-first, mas o motor de resposta é **extrativo**, não gerativo. A IA nunca inventa.

## Regra

Toda resposta apresentada como conhecimento do sistema **precisa citar um nó do grafo** — ou declarar explicitamente que não há cobertura.

Nós válidos:
- `Resource` (`src/lib/platform/types.ts`)
- `WikiPage`
- `Mission`
- `KnowledgeRequest` (Pedido)
- Nós derivados do Mesh (`src/lib/platform/mesh.ts`) — pessoa, incidente

## Como implementar

Sempre passe pelas fontes canônicas:
- `planMission(pergunta)` em `src/lib/platform/engine.ts` — nunca reimplemente busca por conta própria.
- `allResources()` / `allWikiPages()` em `src/lib/platform/approved.ts` — respeita seeds + aprovados via Estômago.
- `askAboutNode(mesh, id, q)` em `src/lib/platform/mesh.ts` — resposta sempre lista as fontes.
- `evaluateImmune(pergunta)` — antes de qualquer plano.

## Quando não há cobertura

**Não gere texto plausível.** Faça literalmente:
1. Diga "não há registro sobre isso".
2. Ofereça abrir **Pedido** (`/pedidos`) preenchendo pergunta + autor + dono sugerido.
3. Se for um plano de Missão, use `cobertura: "sem-registro"` como faz o engine hoje.

## Antipadrões que este skill bloqueia

- Chamar LLM externo para "melhorar" uma resposta.
- Preencher campos vazios com texto genérico ("provavelmente...", "geralmente se faz...").
- Sugerir recursos que não estão no `RESOURCES` ou aprovados.
- Colocar arestas no Mesh sem `evidenciaIds`.
- Fabricar métricas (`usos30d`, `sucessos`, etc.) — se não vem do dado, não aparece.

## Teste rápido

Antes de commitar qualquer resposta gerada, pergunte: **"que nó do grafo sustenta isso?"** Se a resposta for "nenhum", apague e abra Pedido.
