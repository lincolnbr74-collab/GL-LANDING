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

- **O repositório não tinha `.gitignore`, e isso custou caro** (06/08). Ao
  instalar as dependências para trabalhar, `git add -A` varreu 37.499 arquivos
  de `node_modules` para dentro dos commits — 20 mil linhas só no primeiro. A
  branch foi reescrita com `filter-branch` antes de qualquer merge, e o
  `.gitignore` passou a existir. **Neste projeto, confira `git status` antes de
  `git add -A`.**

- **A skill `frontend-design` está instalada em `~/.claude/skills/`** desde
  06/08. Ela tinha sido baixada para dentro DESTE repositório (pasta
  `frontend-design 2`), que é por que não carregava. Skill não mora no projeto.

## Current Checkpoint

> **Sessão nova? Comece por aqui.** Estado de 06/08/2026, fim do dia.

### Em uma frase

A página comercial está **pronta e inteira**, em 15 commits na branch
`pagina-comercial` (já no GitHub). Falta a revisão do GL, dois textos curtos e
a publicação.

### Retomar

```bash
cd /Users/gabriellincoln/Desktop/GL-LANDING
git checkout pagina-comercial
PORT=3100 BROWSER=none npm start     # abre http://localhost:3100
```

A Vercel deve ter gerado um **preview** dessa branch — serve para o GL abrir no
celular sem servidor local. Vale procurar no painel antes de subir outro.

### As três coisas que faltam, em ordem

**1. As histórias das duas alunas de baixo.** Elas aparecem na grade com foto e
o rótulo "Aluna GL", sem texto, porque o GL não contou as delas. Basta uma linha
de cada: **o que travava** e **o que mudou**. O lugar é a constante `PARES`, no
topo de `PaginaComercial.jsx` — os campos `chamada` e `historia` já existem e
estão em `null`.

**REGRA QUE NÃO SE NEGOCIA:** nada de frase inventada sobre pessoa real. Se o GL
não lembrar, o card fica sem texto mesmo. Foi assim que se decidiu não pôr TEMPO
em nenhum card.

**2. "5 perguntas" contra o contador `/ 07`.** A intro do quiz
(`LandingPage.jsx`, tela `intro`) promete *"São 5 perguntas rápidas"* e o
contador mostra 7. É a primeira promessa da página sendo quebrada dois segundos
depois, no momento exato do compromisso. Duas saídas, e a escolha é do GL:
trocar o texto para "7 perguntas" (um minuto) ou cortar duas perguntas do quiz
(decisão comercial — envolve abrir mão de qualificação).

**3. Publicar.** Só depois do aval dele:

```bash
git checkout main && git merge pagina-comercial && git push
```

Isso troca o que `entrar.glteamconsultoria.com.br` serve. Hoje aquele endereço
ainda mostra a versão antiga (só o quiz) — conferido pelas tags Open Graph, que
existem no build local e não na produção.

### O que a página tem hoje

1. **Hero** — "Você já sabe o que fazer. O que nunca teve foi alguém junto." +
   foto do GL de frente, olhando para a câmera
2. **Prova** — "Corpo forte, bonito e funcional. Sem terrorismo." Grade 2×2:
   duas alunas com história (Maria Eduarda, Aluna GL), duas só com foto. Dentro
   do card da segunda, costas e perfil da mesma avaliação. O Léo fecha em texto.
   CTA no fim da seção, no pico do interesse.
3. **Dores** — quatro, tiradas das opções do próprio quiz
4. **Como funciona** — três passos + retrato do GL no evento
5. **Quem é o Gabriel** — escrito a partir do texto que ELE mandou: o menino que
   achava que não se encaixava. A ponte é estrutural, não retórica: é a mesma
   insegurança da leitora que acha que não seria selecionada.
6. **Entrada** — o quiz apresentado como conversa

### Verificado (não é opinião)

- `npm run build` limpo
- 0 de rolagem horizontal em 390, 768, 834, 1024, 1280 e 1440
- **Nenhuma foto de antes e depois recortada** — medido comparando proporção
  natural com a da caixa. Só a foto do microfone é cortada, de propósito
- 3 CTAs em toda largura; fluxo comercial → quiz → gênero → pergunta 01/07
  testado por clique
- Todas as imagens com `alt`, nenhuma quebrada, `lazy` abaixo da dobra
- Open Graph completo (o link vive na bio do Instagram e é reenviado no
  WhatsApp; sem isso a prévia chegava vazia)

### Decisões fechadas, não reabrir

- A página **não fala preço**. Termina no quiz, que já pergunta sobre investimento
- **Um único destino de clique:** o quiz. Sem WhatsApp direto no meio
- **Nenhum rosto identificável** nas fotos de aluno
- **A foto de palco do Léo não entra.** Troféu no meio da prova diz "isto é para
  atleta" e afasta quem a página quer acolher. Ele ficou como texto
- **O link da bio não muda:** a troca comercial → quiz é de estado, na mesma URL
- Ângulo do título: a frustração de recomeçar, escolhido pelo GL entre quatro

### Na mesa, sem decisão

- Um **antes e depois masculino** que o GL nunca mencionou, em
  `public/prova/atalho de CONSULTORIA ONLINE GL.JPG`: de frente, num ginásio,
  sem palco e sem troféu. Muito mais próximo do leitor comum que o do Léo
- A foto de piscina/praia (`470c2dd0…`) ficou **de fora**: rosto visível nos dois
  lados, e cenário/luz diferentes entre antes e depois enfraquecem a comparação
- **CREF** — adiado pelo GL; a documentação dele fica pronta na semana de 10/08.
  Não bloqueia: não há placeholder na página
