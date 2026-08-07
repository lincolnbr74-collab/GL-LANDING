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

> **Sessão nova? Comece por aqui.** Estado de 06/08/2026, noite.

### Em uma frase

**A página comercial ESTÁ NO AR.** `entrar.glteamconsultoria.com.br` deixou de
servir só o quiz em 06/08, às 20h — a `pagina-comercial` foi para a `main` (31
commits) e a Vercel publicou. Conferido no domínio, não no localhost.

### Retomar

```bash
cd /Users/gabriellincoln/Desktop/GL-LANDING
git checkout main
PORT=3100 BROWSER=none npm start     # abre http://localhost:3100
```

**Trabalhe na `main`.** A `pagina-comercial` cumpriu o papel e está fundida; ela
só existe agora como histórico.

### Como conferir o que está no ar (sem chutar)

```bash
# qual pacote a produção está servindo
curl -s https://entrar.glteamconsultoria.com.br/ | grep -o 'main\.[a-z0-9]*\.js'

# comparar com o que o build local gerou
CI=true npm run build | grep 'main\.'
```

Se os dois nomes batem, o que você está vendo no localhost é o que o lead vê.
A Vercel leva de 30 a 60 segundos depois do `git push origin main`.

### Como provar responsividade (não confie no print headless)

Chrome headless com `--window-size` **não** emula viewport de celular: o texto
sai cortado na captura mesmo com a página perfeita. O que vale é medir dentro
do navegador. O truque usado aqui: um HTML temporário em `public/` com um
iframe que varre as larguras e imprime `scrollWidth` contra `clientWidth` —
apagar depois de medir.

Última medição (06/08, antes de publicar): **zero estouro** em 390, 414, 768,
834, 1024, 1280 e 1440; 11 imagens carregadas, 0 quebradas.

### Onde ficam os originais (regra que já custou caro)

`public/` é público: **tudo** que está lá vai para o build e para a internet,
inclusive o que a página não usa. Já foram para o ar originais com nome de
aluna no arquivo, e 3,1 MB de arte que ninguém chamava.

| Pasta | O que é |
|---|---|
| `fontes-privadas/` | originais (JPG/HEIC/PDF/PNG de marca). Fora do build e do git |
| `public/prova/` | só os `.webp` da página, com **nome neutro** |
| `public/marca/` | só o `gl-tela.webp` (papel de parede da tela do notebook) |

Nome de arquivo é endereço público: `/prova/fulana-de-tal.webp` nomeia a aluna
mesmo com o card escrito "Aluna GL".

**Quem é quem** — confirmado pelo GL em 06/08, conferido foto a foto contra os
originais:

| Arquivo na página | Aluna | Card |
|---|---|---|
| `aluna-frente/costas/lado.webp` | Isis Otoni | 1º |
| `maria-eduarda-*.webp` | Maria Eduarda | 2º |
| `aluna-cortina.webp` | Hemanoelly Vieira | 3º |
| `aluna-lateral.webp` | Giovanna Caires | 4º |

Nos cards vai **só o primeiro nome**. Sobrenome em cima de foto de biquíni
identifica a mulher em qualquer busca.

### O que a página tem hoje

1. **Hero** — "Você já sabe o que fazer. O que nunca teve foi alguém junto."
2. **Prova** — quatro alunas, todas com nome, chamada e história. Isis e Maria
   Eduarda (com fotos extras) dividem a primeira linha; Hemanoelly e Giovanna a
   segunda. Cada card com moldura
3. **Dores** — quatro, tiradas das opções do próprio quiz
4. **Como funciona** — sete itens (o que o aluno recebe), a credencial do
   nutricionista com CRN, e a foto do notebook com o papel de parede do GL
5. **Quem é o Gabriel** — a história dele, e a credencial DEPOIS do medo
6. **Entrada** — o quiz apresentado como conversa

### Pendências abertas com o GL

0. **Depoimento fidedigno das alunas.** O roteiro de perguntas para ele mandar
   no WhatsApp está em `PERGUNTAS-DEPOIMENTO.md`, na raiz, e no cofre em
   `05 GL SYSTEM/Consultoria online/Perguntas para depoimento de aluna.md`.
   As quatro já têm história contada por ele; o roteiro serve para as próximas.
1. **Prints de depoimento na tela do notebook.** Ele vai anexar. Hoje a tela
   mostra o papel de parede da marca; os prints entram no MESMO recorte, é só
   trocar o conteúdo do `<g clipPath>` em `Metodo`.
2. **"A diferença da foto é de um mês"** (card da Hemanoelly) — é o único prazo
   curto da página e o mais contestável. Ele foi avisado; a decisão é dele.
3. **"Chegou pensando em cirurgia estética"** foi tirado da Isis por não estar
   no relato dele. Se ele confirmar, volta.
4. **CREF** — a documentação fica pronta na semana de 10/08. Não bloqueia nada.

### Decisões fechadas, não reabrir

- A página **não fala preço**. Termina no quiz, que já pergunta sobre investimento
- **Um único destino de clique:** o quiz. Sem WhatsApp direto no meio
- **Nenhum rosto identificável** em foto de aluna
- **O Léo saiu inteiro** — foto e texto. Troféu e palco diziam "isto é para
  atleta" no meio da seção que existe para acolher quem nunca manteve rotina
- **O link da bio não muda:** comercial → quiz é troca de estado, mesma URL
- **Nada de print de produto inventado.** A tela do notebook mostra a marca, não
  uma interface que ninguém viu
- **Tempo: "menos de 5 minutos"** nos quatro lugares das duas páginas. Número
  maior de propósito — é o único que não tem como quebrar promessa
- **O quiz tem 7 perguntas** e a intro diz 7. Já disse 5 e foi corrigido antes
  de publicar
- **Nenhum travessão em texto que o lead lê.** Pedido do GL em 07/08: travessão
  em toda frase é a marca registrada de texto de IA. Foram 16 na comercial e 10
  no quiz; viraram vírgula (quando a segunda parte completa a frase) ou ponto
  (quando ela é uma frase inteira). Vale para as DUAS telas — o lead vê as duas
  em sequência, e a incoerência entre elas é o que denuncia. Em comentário de
  código pode: ninguém lê

### Armadilhas que já morderam aqui

- **Crase dentro de comentário de CSS derruba o build.** O CSS mora em template
  literal de JS; uma crase solta encerra a string. Aconteceu DUAS vezes em 06/08
- **`object-fit: contain` não resolveu o encaixe das fotos.** O que funcionou
  foi limite máximo de largura e altura com dimensão automática, dentro de uma
  caixa `aspect-ratio` — ver `.gl-foto-caixa` em `design.js`
- **A máquina não tem Pillow nem ImageMagick**, e o ffmpeg instalado **não tem
  encoder de webp**. Para webp use `cwebp`; para recortar, `ffmpeg`; para
  recolorir PNG, script Python puro (há um no histórico do git, commit `e6e6a07`)
- **Duas sessões no mesmo repositório ao mesmo tempo** aconteceu em 06/08 e
  quase custou trabalho. Antes de editar, `git log --oneline -3` e `git status`
