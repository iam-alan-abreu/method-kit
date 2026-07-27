---
name: cortex-product-context
description: Carrega a visão de produto CÓRTEX, o mapping das superfícies atuais e o glossário antes de qualquer edição de produto/UX/copy do Sonaris 2. Use quando o pedido tocar em enquadramento, textos da home, sidebar, novos fluxos, ou decidir onde uma feature nova deve morar.
---

# cortex-product-context

CÓRTEX é uma **plataforma AI-first de operações DevSecOps**. O nome interno atual da implementação é **Sonaris 2**. Este projeto é a casca funcional dessa visão.

## Antes de mexer em qualquer superfície de produto

1. Leia `.memory/product-vision.md` — a visão canônica.
2. Leia `.memory/mapping.md` — cada rota já tem um papel definido.
3. Leia `.memory/glossary.md` — termos internos (Missão, Mesh, Estômago, Imune) e da visão (Intenção, Grafo, Governança).
4. Consulte `.memory/decisions.md` — decisões anteriores; não contradizer sem entrada nova.

## Regras que valem sempre

- **Nunca criar rota nova** sem que a mudança caiba em uma camada do mapping. Se cabe, evoluir a superfície existente.
- **Nunca renomear rotas** — quebram histórico e links.
- **UI usa a linguagem CÓRTEX** (Intenção, Grafo, Governança) mas mantém os nomes internos das superfícies (Missão, Mesh, Imune, Estômago) para continuidade.
- **Tema visual terminal Hallmark opção 8**: fundo escuro, mono, verde phosphor, divisores ASCII. Ver `src/styles.css`.
- **Sem Lovable Cloud / Lovable AI.** Persistência = `localStorage`.

## Contrato mínimo para qualquer feature nova

- Cita qual **§ da visão** ela atende (H1/H2/H3, capacidade §10, princípio §5).
- Não duplica papel de superfície existente.
- Se envolve novo conteúdo do time (recurso/wiki), passa pelo **Estômago** com aprovação e versão.
- Se envolve restrição/compliance, é regra do **Imune** — não código escondido.
- Se depende de conhecimento que não existe, abre **Pedido** em vez de inventar.

## Quando o pedido é "grande"

Grande = toca em mais de uma superfície ou muda o enquadramento. Nesse caso:
1. Proponha primeiro a atualização de `.memory/mapping.md` ou `.memory/decisions.md`.
2. Só depois toque no código.
