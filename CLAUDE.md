# CLAUDE.md

Guia do Claude Code neste repositório.

## Projeto: GL-LANDING

### Context

**O que é:** a porta de entrada comercial da GL Team. Hospedada na Vercel; a
`main` é o que vai para o ar.

**O caminho que o lead percorre** (desenhado pelo GL em 06/08/2026):

```
link da bio do Instagram
   → PÁGINA COMERCIAL   (cria desejo)      ← em construção
   → QUIZ               (qualifica)        ← já existia, funcionando
   → planilha GL LEADS  (via JSONP)
   → job do GL SYSTEM cria o card no Pipeline do Notion
```

**Para quem:** pessoa que já tentou mudar o corpo e não manteve. Chega do
Instagram, sem intenção de compra ainda.

**A regra que atravessa a página comercial:**

> Quem é selecionado não é a pessoa. É o encaixe.

O quiz é uma peneira, e peneira afasta quem tem autoestima baixa — que é quem
mais precisa e quem não acredita que seria escolhido. "Só aceito os melhores"
fecha a porta; "eu recuso quem eu não consigo ajudar" diz a mesma verdade e
convida. **Nenhum texto pode sugerir que a pessoa precisa provar que merece.**

### Arquivos

| Arquivo | O que é |
|---|---|
| `src/design.js` | **Fonte única** de cor, tipografia, espaçamento e animação |
| `src/PaginaComercial.jsx` | A página comercial (nova) |
| `src/LandingPage.jsx` | O quiz de qualificação (apesar do nome) |
| `src/App.js` | Troca comercial → quiz na mesma URL |

### Comandos

- `npm start` — dev server (usamos `PORT=3100` para não brigar com o GL SYSTEM na 3000)
- `npm run build` — build de produção. **É a única verificação que existe:** não há
  teste nem type-check neste projeto (é JS, não TS).

## Rules for ADHD Developers

1. **One Question Rule** — nunca mais de uma pergunta por mensagem.
2. **Evidence-First Completion** — `npm run build` + screenshot real antes de "pronto".
3. **Async Checkpoint Updates** — atualizar este arquivo a cada ~45 min ou após interrupção.
4. **Task Atomicity** — tarefas completáveis em até 45 min.
5. **No Re-Explaining** — se está aqui, apontar para a seção em vez de reexplicar.

## Known Learnings

- **Página sem `GLOBAL_CSS` injetado → fonte genérica e ticker quebrado → parece
  feita por IA.** Aconteceu em 06/08 na primeira montagem da página comercial. O
  `GLOBAL_CSS` de `design.js` carrega Anton/Inter/Mono, o grão e as animações.
  **Todo componente de página tem de injetar `<style>{GLOBAL_CSS}</style>`.**
  Por que importa: a nota do cofre "Por que sites feitos com IA parecem todos
  iguais" diz que o que denuncia página improvisada não é feiura, é incoerência.

- **Havia duas cópias quase idênticas do quiz** (`LandingPage.jsx` e
  `GLQualificacao.jsx`), só uma renderizada. A morta foi removida em 06/08. Por
  que importa: 700 linhas duplicadas são uma armadilha — alguém edita a metade
  errada e jura que o código não faz efeito.

- **Nada de foto de banco de imagens na prova.** As fotos de antes e depois são
  de aluno real e autorizadas. Prova genérica faria a página prometer uma coisa
  e a consultoria entregar outra.

- **O design não se inventa aqui.** `design.js` saiu do quiz sem mudar um valor,
  e é o mesmo par do GL SYSTEM (Anton + Inter + Mono, near-black + crimson).
  Reconhecimento entre story, anúncio e página é o que faz clicar antes de ler.

- **A página é a maré.** Nota do cofre "O gargalo do anúncio quase nunca é o
  anúncio": melhorar a página multiplica o desempenho de todo conteúdo que o GL
  já gravou. É o item de maior alavancagem do projeto.

## Current Checkpoint

**Última tarefa concluída** (06/08/2026)
- `design.js` extraído, cópia morta do quiz removida, primeira dobra da página
  comercial construída e conferida na tela (1440px e celular, zero rolagem
  horizontal). Fluxo comercial → quiz testado por clique.
- Está na branch **`pagina-comercial`**. A `main` segue intocada de propósito:
  ela é o que a Vercel publica e a página ainda não tem fotos.

**Próxima tarefa**
- Seção 2: antes e depois. É a razão de a página existir.

**Bloqueado por**
- **As fotos.** Sem par real, a seção não avança. Para cada par, além da imagem:
  quanto tempo levou e o que mudou FORA do corpo (dormir, espelho, dor no
  joelho) — é a segunda linha que gera identificação, não o corpo.

**Seções ainda não construídas** (ordem acordada)
1. ~~Dobra 1 — o espelho, não o troféu~~ ✅
2. Antes e depois ← bloqueada nas fotos
3. O que eu resolvo (nas palavras do lead, tiradas das opções do próprio quiz)
4. Como funciona — protocolo individual, check-in semanal, ajuste
5. Quem é o Gabriel — rosto, CREF, o porquê
6. A entrada — o quiz apresentado como conversa, não como peneira

**Decisões já tomadas, não reabrir**
- A página **não fala preço**. Termina no quiz, e o quiz já pergunta sobre investimento.
- Um único destino de clique: o quiz. Sem WhatsApp direto no meio, senão o lead
  pula a qualificação.
- Ângulo do título: a frustração de recomeçar ("Você já sabe o que fazer. O que
  nunca teve foi alguém junto."), escolhido pelo GL em 06/08.
