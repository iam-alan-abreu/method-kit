---
name: cortex-knowledge-as-code
description: Workflow canônico para transformar sinais crus (log, PR, reunião, comando) em Recurso ou página de Wiki versionada. Use quando o pedido envolver criação/edição de conhecimento do time, aprovação de rascunho do Estômago, ou histórico de versões.
---

# cortex-knowledge-as-code

Conhecimento do time entra **por um único caminho**: Estômago → aprovação → Recurso/Wiki versionado. Nunca por edição direta no código-fonte de mocks.

## Fluxo completo

```
sinal cru → suggestDraft() → rascunho revisável → ApprovalDialog → allResources()/allWikiPages() → snapshot em versions.ts
```

## Módulos envolvidos

- `src/lib/platform/estomago.ts` — captura de sinais e `suggestDraft()`.
- `src/components/ApprovalDialog.tsx` — UI de aprovação (tags, versão, resumo de mudanças a partir da 2ª versão).
- `src/lib/platform/approved.ts` — upsert de aprovados (recurso ou wiki).
- `src/lib/platform/versions.ts` — snapshots imutáveis (`structuredClone`), `bumpVersion()`.
- `src/components/VersionHistory.tsx` — navegação entre versões nas páginas de detalhes.

## Regras

1. **Nunca** criar Recurso ou WikiPage direto — sempre via `saveApproved()` em `approved.ts`.
2. Toda aprovação **exige** tags padronizadas e uma versão semântica.
3. A partir da **2ª versão**, o `ApprovalDialog` exige "resumo de mudanças".
4. Toda aprovação **gera snapshot** em `versions.ts`. O snapshot é imutável — nunca edite retroativamente.
5. Recursos "seed" (mockados em `data.ts`) **não têm histórico**. UI trata isso com aviso.

## Onde o histórico aparece

- `/recursos/$id` — bloco `VersionHistory` no rodapé.
- `/wiki/$moduloId/$docId` — bloco `VersionHistory` no rodapé.
- `/estomago` (log) — cada sinal aprovado linka para a versão gerada.

## Ligações com a visão CÓRTEX

- Este workflow **é** o princípio §5.3 "conhecimento é código" na implementação atual.
- Em H2 (§9), o mesmo pipeline ganha CI (promptfoo) e distribuição por MCP. **Não invente esses passos hoje** — apenas mantenha o caminho aberto (não introduza atalhos que fujam do fluxo).

## Antipadrão

- Endpoint que aceita "criar recurso" fora do Estômago.
- Edição de mocks em `src/lib/platform/data.ts` para "adicionar conhecimento".
- Snapshot mutável / merge de versões.
