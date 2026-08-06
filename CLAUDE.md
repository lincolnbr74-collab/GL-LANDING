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

> **Sessão reiniciada? Leia só esta seção.** Estado de 06/08/2026, fim do dia.

### Como retomar

```bash
cd /Users/gabriellincoln/Desktop/GL-LANDING
git branch --show-current      # pagina-comercial
PORT=3100 BROWSER=none npm start
```

### A página está INTEIRA

Seis dobras, nesta ordem:

1. **Hero** — "Você já sabe o que fazer. O que nunca teve foi alguém junto." + retrato do GL
2. **Prova** — "Corpo forte, bonito e funcional. Sem terrorismo." Duas histórias com
   foto (Maria Eduarda, Aluna GL), faixa de mais três resultados sem legenda, e o
   Léo em texto no fim
3. **Dores** — quatro, tiradas das opções do próprio quiz
4. **Como funciona** — três passos + foto do escritório
5. **Quem é o Gabriel** — foto do evento; texto fala do que ele resolve, não do currículo
6. **Entrada** — o quiz apresentado como conversa

`npm run build` compila limpo. Zero rolagem horizontal em 1440px e 390px.
Oito imagens, todas com alt, nenhuma quebrada, lazy nas de baixo.

### Decisões desta rodada (autorizadas pelo GL, para ele revisar)

- **A foto de palco do Léo saiu.** Troféu no meio da prova dizia "isto é para
  atleta" e afastava quem a página quer acolher. Ele ficou como TEXTO no fim da
  seção, com a moldura "procurou querendo competir".
- **Nenhum rosto identificável.** A foto de perfil da aluna foi recortada 46%
  acima; a da Maria Eduarda, 14%.
- **Nenhum card tem TEMPO.** O GL não lembrava os prazos, e prazo inventado é
  número que ninguém confere e que derruba tudo se for descoberto.
- **Três fotos entraram SEM legenda**, na faixa "mais resultados": não havia
  história contada sobre elas, e legenda inventada sobre pessoa real seria a
  primeira mentira da página.
- **Open Graph adicionado.** O link vive na bio do Instagram e é reenviado no
  WhatsApp; sem as tags a prévia chegava vazia. Imagem 1200x630 em `/prova/og.jpg`.

### O que falta antes de publicar

1. **Revisão do GL** — principalmente os textos das duas histórias e o da seção
   "quem é o Gabriel", que foram escritos por mim a partir do que ele contou.
2. ~~CREF~~ — **adiado pelo GL em 06/08**: a documentação dele só fica pronta na
   semana seguinte. **Não bloqueia nada.** Não há placeholder nem lacuna na
   página; a seção "quem é o Gabriel" fecha sem o número, e ele entra depois
   como uma linha. Marcador do que não existe tem o hábito de ir para o ar.
3. **Tempo de cada aluna**, se ele lembrar. Entra como uma linha em cada card.
4. **Publicar:** `git checkout main && git merge pagina-comercial && git push`.
   **NÃO foi feito de propósito** — a `main` é o que a Vercel serve para o link
   da bio, e a página não pode ir ao ar sem ele ter visto.

### Aprendizado da autoauditoria

Rodei a auditoria do passo 8 (nota do cofre) e ela deu **100/100** — o que
significa que a régua estava frouxa, não que a página estava pronta. Ela checava
se `title` e `description` EXISTIAM, não se prestavam, e não olhava Open Graph.
Foi olhando à mão que apareceu o buraco das prévias de link. **Auditoria que
passa de primeira não auditou.**

