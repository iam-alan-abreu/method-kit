---
name: cortex-autonomy-ladder
description: Matriz de classes de ação e como o Imune deve tratar cada uma. Use ao editar regras do Imune, quando decidir se uma ação nova é sugestão/execução aprovada/autônoma, ou ao planejar transições H1→H2.
---

# cortex-autonomy-ladder

Autonomia no CÓRTEX é **progressiva e por classe de ação** (§5.5 da visão). Nunca binária, nunca por entusiasmo.

## Escala

```
sugerir  →  executar com confirmação  →  executar com aprovação nomeada  →  autônomo com kill switch
   H1               H1                              H1                              H2/H3
```

Uma classe só avança quando tem **histórico auditado** — rollback ≈ 0, aceite ≥ 60%, incidentes causados = 0.

## Matriz H1 (estado atual)

| Classe | Exemplo | Autonomia | Aprovação | Superfície que registra |
|---|---|---|---|---|
| Leitura | Consultar recurso, wiki, missão, mesh | Total | — | — |
| Sugestão de plano | `planMission()` | Total | — | `/missao/$id` |
| Escrita em rascunho | Novo sinal no Estômago | Total | — | `/estomago` |
| Promover rascunho a Recurso/Wiki | `ApprovalDialog` | Nenhuma | Humano | `versions.ts` |
| Editar regra do Imune | `/imune` aba Regras | Nenhuma | Humano nomeado | `immune.ts` |
| Aviso do Imune sobre plano | Regra `acao: "avisar"` | Total | — | `immuneLog` |
| Bloqueio do Imune sobre plano | Regra `acao: "bloquear"` | Total (só bloqueia, não executa nada) | — | `immuneLog` |
| **Ainda não existe:** ação em não-prod (via MCP) | `az` CLI, ArgoCD sync | 0 | Confirmação inline | — |
| **Ainda não existe:** ação em produção | Deploy, rollback | 0 | Aprovação nomeada + kill switch | — |

## Como decidir onde uma ação nova entra

1. **É reversível?** Se não, começa em "aprovação nomeada".
2. **Afeta produção?** Se sim, exige kill switch documentado **antes** de qualquer autonomia.
3. **Tem histórico auditado?** Se não, começa em "sugerir".
4. **Cabe em regra do Imune?** Se sim, prefira editar Imune a codificar restrição em componente.

## Como o Imune trata cada nível

- `acao: "avisar"` → aparece como restrição no plano; humano decide.
- `acao: "bloquear"` → plano exibe `[imune · bloquear]`; agente não pode seguir sem revisar a regra.
- Regras têm `recursosAfetados` — usado para futura pipeline de bloqueio em MCP.

## Transição H1 → H2 (referência para o futuro)

Uma classe só migra para autonomia quando:
- `immuneLog` tem N ≥ 50 disparos sem falso positivo relevante.
- Aceite humano da sugestão anterior ≥ 60%.
- Existe rollback documentado e testado.

Registre a decisão em `.memory/decisions.md` antes de codificar o avanço.
