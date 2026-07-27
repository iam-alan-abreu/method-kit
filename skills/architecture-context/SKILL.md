---
name: cortex-architecture-context
description: Regras para qualquer agente que proponha ou avalie mudança técnica no CÓRTEX (Sonaris 2). Aplica quando o pedido toca camadas da arquitetura — ingestão, grafo de contexto, frota de agentes, MCP server, guardrails (Portkey/Presidio/Langfuse/promptfoo), execução, deployment AKS — ou introduz dependência nova, chamada a modelo, ou ação com efeito colateral.
---

# cortex-architecture-context

O CÓRTEX tem visão de produto (`.memory/product-vision.md`) **e** arquitetura técnica (`docs/arquitetura.md`). A arquitetura é o alvo — nada dela está implementado hoje. A implementação atual em `src/` é casca funcional em `localStorage`. Não confunda os dois planos.

## Antes de propor mudança técnica

1. Ler `docs/arquitetura.md` (fonte canônica v0.1) **e** `.memory/architecture.md` (resumo navegável).
2. Localizar a camada afetada em `.memory/mapping.md` (coluna "Componente técnico alvo").
3. Identificar o ADR que sustenta ou contradiz a proposta (D-010..D-015).

## Regras

1. **Toda proposta cita ADR.** Ex.: "grava no grafo (D-010: Postgres+pgvector)" ou "contradiz D-012 porque prioriza a Web sobre o MCP".
2. **Contradizer ADR ≠ ignorar ADR.** Se a mudança conflita com D-010..D-015, abrir nova entrada em `.memory/decisions.md` (D-016+) explicando contexto → decisão → consequência. Nunca editar ADR retroativamente.
3. **Nenhuma chamada a modelo externo fora do Portkey (D-014).** Nem no protótipo, nem em edge function, nem em script de dev. Spike temporário exige registro em `decisions.md`.
4. **Nenhuma ação A3 autônoma em H1 (D-015).** A1 exige confirmação do solicitante; A2 exige aprovação nomeada; A3 exige dupla aprovação e o agente **não propõe** A3 sozinho.
5. **Agente nunca segura credencial de prod.** Fluxo canônico: agente propõe → API avalia classe → aprovação → worker executa. Não introduzir atalho que dê credencial ao agente.
6. **Grafo é a fonte única de contexto para agente.** Perfis Hermes não leem ArgoCD/Jira/Grafana diretamente — só o grafo via Cortex API.
7. **Envelope de evento é imutável.** `payload` bruto sempre; `event_log` grava antes de qualquer processamento (§3).
8. **Resolução de entidade ambígua → pergunta ao humano.** `confidence < 1.0` em `relation` quando inferido.
9. **Repo `cortex-knowledge` é o único caminho para prompts/runbooks/policies/ADRs/skills.** Nada hardcoded em código de aplicação.
10. **Preservar a casca atual.** Missão/Recursos/Wiki/Pedidos/Mesh/Estômago/Imune permanecem como rotas e nomes. A arquitetura reenquadra, não substitui.

## Spikes pendentes (§12 arquitetura)

- **S1** Grafo v1 + MCP `context_briefing` no Claude Code < 10s — caminho crítico.
- **S2** Captura de sessão Claude Code → `cortex.decision`.
- **S3** Hermes com gate externo (propor→aprovar→retomar). Plano B: gate na Cortex API (D-013).
- **S4** Custo real de embeddings + operação simulada.

Se a proposta depende de S1..S4 ainda não realizado, dizer isso explicitamente.

## Antipadrões

- "Chamar OpenAI direto para testar rápido" → D-014 bloqueia.
- "Agente executa rollback" (sem gate) → D-015/§8 bloqueia.
- "Adicionar Neo4j para queries de grafo" → contradiz D-010; exige novo ADR com gatilho de revisão atendido.
- "Frontend Lovable como superfície primária" → contradiz D-012 (MCP-first).
- "Prompt hardcoded em `engine.ts`" → contradiz §9 (knowledge-as-code) e o skill `cortex-knowledge-as-code`.
- Editar ADR aceito sem nova entrada em `decisions.md`.
