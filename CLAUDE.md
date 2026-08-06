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

> **Sessão reiniciada? Leia só esta seção.** Ela é o estado exato de 06/08/2026.

### Como retomar em 30 segundos

```bash
cd /Users/gabriellincoln/Desktop/GL-LANDING
git branch --show-current      # tem de dizer: pagina-comercial
PORT=3100 BROWSER=none npm start
# abre http://localhost:3100  → deve aparecer a página comercial, não o quiz
```

O GL SYSTEM roda na 3000; esta LP usa a **3100** para os dois conviverem.

### O que está pronto

- `src/design.js` — cores/tipografia/espaçamento extraídos do quiz **sem mudar
  um valor**. As duas páginas bebem daqui.
- `src/PaginaComercial.jsx` — **dobra 1 apenas**. Título, subtítulo, CTA e um
  espaço tracejado reservado para a foto de abertura.
- `src/App.js` — abre na comercial; o CTA leva ao quiz na mesma URL.
- `src/GLQualificacao.jsx` — **removido** (era cópia morta do quiz).
- Conferido na tela em 1440px e 390px, zero rolagem horizontal, `npm run build`
  compilando limpo.

### Onde está o código

Branch **`pagina-comercial`**, com dois commits locais. **Não foi feito push, e
isso é de propósito:** a `main` é o que a Vercel publica, e a página ainda tem
um buraco no lugar da foto. Não mandar para a `main` até a seção 2 existir.

### A próxima tarefa é uma só

**Seção 2 — antes e depois.** É a razão de a página existir.

### O que trava (e é a única coisa que trava)

**As fotos ainda não existem no projeto.** `public/` está vazio; a LP inteira é
texto hoje.

O GL vai colocá-las em **`public/prova/`**. Foto colada no chat o Claude
**consegue ver, mas não consegue salvar** — para entrar no build, o arquivo tem
de existir no disco. O chat serve para escolher qual par usar; a pasta serve
para publicar.

De cada par, além da imagem, faltam duas informações:
- **quanto tempo levou** ("7 meses")
- **o que mudou FORA do corpo** ("voltou a dormir", "parou de se esconder no
  espelho", "treina sem dor no joelho")

A segunda linha é o que gera identificação. Corpo bonito ela já viu mil no
Instagram e ignorou.

Quando as fotos chegarem, o lugar de escrevê-las é a constante `PARES`, no topo
de `PaginaComercial.jsx` — já está comentada com o formato.

### Por que não adiantamos as outras seções

O GL perguntou se não seria melhor com as fotos primeiro. **Sim, e a decisão foi
essa.** As fotos mudam o layout (vertical ou horizontal, com rosto ou sem, lado
a lado ou sobreposto) e mudam o texto da seção "o que eu resolvo" — escrever as
dores antes de ver quem são essas pessoas seria chute.

### Seções ainda não construídas (ordem acordada)

1. ~~Dobra 1 — o espelho, não o troféu~~ ✅
2. **Antes e depois** ← próxima, bloqueada nas fotos
3. O que eu resolvo — nas palavras do lead, tiradas das opções do próprio quiz:
   *"comecei e não mantive"*, *"me esforcei meses e não mudou quase nada"*,
   *"nunca tive acompanhamento real"*, *"perdi e recuperei mais de uma vez"*
4. Como funciona — protocolo individual, check-in semanal, ajuste
5. Quem é o Gabriel — rosto, CREF, o porquê
6. A entrada — o quiz apresentado como conversa, não como peneira

### Decisões fechadas, não reabrir

- A página **não fala preço**. Termina no quiz, e o quiz já pergunta sobre
  investimento.
- **Um único destino de clique:** o quiz. Sem WhatsApp direto no meio, senão o
  lead pula a qualificação.
- **Ângulo do título:** a frustração de recomeçar — *"Você já sabe o que fazer.
  O que nunca teve foi alguém junto."* Escolhido pelo GL entre quatro opções.
- **O link da bio não muda.** A troca comercial → quiz é de estado, na mesma
  URL, para não invalidar o que já está divulgado.

### Antes de publicar (passo que ainda não foi feito)

A nota do cofre *"8 passos para tirar a cara de IA de um site"* pede uma
**autoauditoria com nota** antes de subir: hierarquia, performance, segurança,
responsividade e confiança. Régua dela: acima de 50 aceitável, acima de 80 bom.
Rodar isso quando a página estiver inteira, corrigir o que ela mesma apontar, e
só então mandar para a `main`.
