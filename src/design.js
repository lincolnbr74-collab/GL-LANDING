/**
 * DESIGN SYSTEM — fonte única de cor, tipografia, espaçamento e animação.
 *
 * Extraído de LandingPage.jsx em 06/08/2026, sem mudar UM valor: o objetivo é
 * as duas páginas (comercial e quiz) beberem do MESMO lugar, não redesenhar.
 *
 * O motivo está na nota "Por que sites feitos com IA parecem todos iguais":
 * o que entrega um site improvisado não é feiura, é INCOERÊNCIA — fonte
 * diferente, espaçamento diferente, um card com sombra e outro sem. E sem um
 * arquivo assim, pedir "muda a cor do botão" muda só AQUELE botão.
 *
 * Este par (Anton + Inter + JetBrains Mono sobre near-black com crimson) é o
 * mesmo do GL SYSTEM. Isso é de propósito: reconhecimento entre o story, o
 * anúncio e a página é o que faz a pessoa clicar antes de ler.
 */

const C = {
  bg:"#0A0A0A", surface:"#111111", deep:"#14060A",
  red:"#E10A1F", redDark:"#B00818", redGlow:"rgba(225,10,31,0.15)",
  text:"#FFFFFF",
  /* textRead: corpo de LEITURA. O textSub (#A0A0A0) nasceu para rótulo e
     legenda; usado em parágrafo longo sobre near-black, o GL reclamou que não
     dava para ler bem. Regra do GL SYSTEM: cinza só em rótulo. */
  textRead:"#DADADA",
  textSub:"#A0A0A0", textMuted:"#666666",
  border:"#1E1E1E", borderHover:"#333333",
};
const TYPE = {
  displayXL: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(40px,9vw,72px)", lineHeight:1.0, fontWeight:400, textTransform:"uppercase", letterSpacing:"-0.5px" },
  displayLG: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(28px,6vw,48px)", lineHeight:1.0, fontWeight:400, textTransform:"uppercase", letterSpacing:"-0.3px" },
  displayMD: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(20px,4vw,36px)", lineHeight:1.1, fontWeight:400, textTransform:"uppercase" },
  body:      { fontFamily:"'Inter',sans-serif", fontSize:"clamp(14px,3.5vw,16px)", lineHeight:1.6, fontWeight:400 },
  caption:   { fontFamily:"'Inter',sans-serif", fontSize:"clamp(13px,3vw,14px)", lineHeight:1.5, fontWeight:400 },
  monoSM:    { fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(10px,2.5vw,13px)", lineHeight:1.4, fontWeight:400 },

  /* ─── TRÊS TOKENS NOVOS (06/08), da queixa do GL: "não tá legal a
     tipografia, pequena, pouco visual".

     A página comercial tinha UM tamanho de texto para tudo: corpo em 17px e
     título de card em 19px. Dois pixels de diferença não é hierarquia — o olho
     não distingue, e o resultado é uma parede cinza uniforme que não diz por
     onde começar a ler. Numa página de venda, hierarquia é o que faz a pessoa
     descer: ela lê os títulos, se interessa, e SÓ ENTÃO volta para o corpo.

     A escala agora tem passos que se veem: 25 → 21 → 19 → 15 no desktop.

     `body` e `caption` NÃO foram tocados de propósito: eles são compartilhados
     com o quiz, que está pronto e no ar. Token novo é aditivo; mexer nos
     existentes mudaria uma página que ninguém pediu para mudar. */

  /* Subtítulo de dobra — a frase logo abaixo do título grande. */
  lead:      { fontFamily:"'Inter',sans-serif", fontSize:"clamp(17px,4.5vw,21px)", lineHeight:1.55, fontWeight:400 },
  /* Corpo de LEITURA longa (história de aluna, texto do GL). */
  bodyRead:  { fontFamily:"'Inter',sans-serif", fontSize:"clamp(16px,4vw,19px)", lineHeight:1.7, fontWeight:400 },
  /* Título dentro de card. Inter, não Anton: Anton é caixa-alta e gritaria
     em quatro cards seguidos. O salto vem do TAMANHO e do peso. */
  cardTitle: { fontFamily:"'Inter',sans-serif", fontSize:"clamp(19px,5vw,25px)", lineHeight:1.25, fontWeight:600, letterSpacing:"-0.2px" },
};
const SP = { 8:8,12:12,16:16,24:24,32:32,48:48,64:64,80:80 };
const BR = { sm:6, md:12, lg:16, xl:24, full:999 };

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; }
  html, body, #root {
    height: 100%; background: #0A0A0A; color: #fff;
    font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;
  }
  body { overflow-x: hidden; overflow-y: auto; }

  /* grain */
  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9999;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
  }

  /* ticker */
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ticker-track { display:flex; width:max-content; animation:ticker 20s linear infinite; }

  /* animações */
  @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes checkPop {
    0%{transform:scale(0) rotate(-12deg);opacity:0}
    70%{transform:scale(1.15) rotate(2deg);opacity:1}
    100%{transform:scale(1) rotate(0);opacity:1}
  }
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

  .anim-tag  { animation: fadeDown 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
  .anim-h1   { animation: fadeUp  0.6s  cubic-bezier(0.22,1,0.36,1) 0.15s both; }
  .anim-sub  { animation: fadeUp  0.55s cubic-bezier(0.22,1,0.36,1) 0.26s both; }
  .anim-cta  { animation: fadeUp  0.5s  cubic-bezier(0.22,1,0.36,1) 0.38s both; }
  .anim-o1   { animation: fadeUp  0.5s  cubic-bezier(0.22,1,0.36,1) 0.24s both; }
  .anim-o2   { animation: fadeUp  0.5s  cubic-bezier(0.22,1,0.36,1) 0.32s both; }
  .anim-o3   { animation: fadeUp  0.5s  cubic-bezier(0.22,1,0.36,1) 0.40s both; }
  .anim-o4   { animation: fadeUp  0.5s  cubic-bezier(0.22,1,0.36,1) 0.48s both; }
  .anim-cont { animation: fadeUp  0.38s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-form { animation: fadeUp  0.45s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
  .anim-conf { animation: checkPop 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both; }

  /* botões */
  .btn-primary { transition: opacity 0.18s, transform 0.18s, box-shadow 0.25s !important; }
  .btn-primary:hover { opacity:0.88 !important; transform:translateY(-1px) !important; box-shadow:0 8px 28px rgba(225,10,31,0.35) !important; }

  /* cards */
  .opt-card { transition: border-color 0.18s, background 0.18s, box-shadow 0.18s !important; }
  .opt-selected {
    border-color: #E10A1F !important;
    background: linear-gradient(135deg,rgba(225,10,31,0.1),rgba(176,8,24,0.05)) !important;
    box-shadow: 0 0 0 1px #E10A1F, 0 6px 24px rgba(225,10,31,0.1) !important;
  }

  /* gender cards */
  .gender-card { transition: border-color 0.18s, background 0.18s, transform 0.18s !important; }
  .gender-card:hover { border-color:#333 !important; transform:translateY(-2px) !important; }
  .gender-selected { border-color:#E10A1F !important; background:rgba(225,10,31,0.08) !important; }

  /* scrollbar */
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:#222; border-radius:2px; }
`;

export { C, TYPE, SP, BR, GLOBAL_CSS };

/* Hero da página comercial: duas colunas viram uma no celular. A foto vem
   DEPOIS do texto, porque no celular a promessa tem de ser a primeira coisa. */
export const CSS_COMERCIAL = `
  @media (max-width: 860px) {
    .gl-hero { grid-template-columns: 1fr !important; }
  }
  /* Três provas lado a lado no desktop; uma por vez no celular, para a foto
     não virar miniatura ilegível. */
  .gl-prova-grade {
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  /* Mesmo raciocínio das dores: em coluna única, três fotos quadradas
     empilhadas levavam a página de 5.000px (desktop) para 9.500px no iPad em
     pé. Duas colunas no tablet, uma só no celular. */
  @media (max-width: 640px) {
    .gl-prova-grade { grid-template-columns: 1fr; gap: 40px; }
  }
  /* CAIXA DA FOTO DE PROVA (06/08) — da queixa do GL: "fotos e relatos
     desalinhados".

     Cada antes e depois tem proporção própria (1.00, 1.03, 1.19, 1.34), e a
     regra da página é que NENHUM pode ser recortado: numa lateral, o glúteo é
     a comparação; num de frente, a cintura. Só que altura diferente em cada
     foto faz a legenda de cada card começar numa altura diferente — quatro
     nomes desalinhados, e a grade lê como coisa jogada.

     A saída não é recortar: é uma CAIXA de altura igual, com a foto contida
     dentro, nunca esticada. Sobra faixa nas laterais das fotos mais
     quadradas — e ela é assumida, com o fundo de superfície e a borda do
     sistema, virando moldura em vez de buraco.

     5/4 e não 4/3: é a razão que fica no meio das quatro fotos, então a sobra
     se divide em vez de castigar sempre a mesma. */
  .gl-foto-caixa {
    aspect-ratio: 5 / 4;
    background: #111111;
    border: 1px solid #1E1E1E;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* A foto NAO estica: ela cresce ate bater na parede mais proxima da caixa e
     para. Limite maximo com largura e altura automaticas garante isso sem
     depender de object-fit — a imagem nunca e redimensionada a forca, entao
     nao existe corte possivel.
     (Sem crase nenhuma neste comentario: ele vive dentro de um template
     literal de JS, e uma crase solta aqui encerra a string e quebra o build.
     Aconteceu em 06/08.) */
  .gl-foto-caixa img {
    max-width: 100%; max-height: 100%;
    width: auto; height: auto;
    display: block;
  }
  /* CARD COM MOLDURA (06/08) — da queixa do GL: "tem um espaço ali para duas
     fotos, nao pode ficar aquele vazio na landing page".

     O vazio era real e tinha causa: o segundo e o quarto card carregam fotos
     extras da MESMA aluna dentro deles, entao ficam mais altos que os
     vizinhos. Solto no preto, o que sobra do lado nao le como "o card ao lado
     tem mais coisa" — le como buraco, como se algo tivesse falhado ao
     carregar.

     Nao ha fotos extras das outras duas para preencher (conferido nos
     originais), entao a saida nao e material novo, e moldura: dentro de um
     card com fundo e borda, altura diferente vira "esse tem mais conteudo",
     que e a leitura certa. E o mesmo formato de depoimento que o GL mandou
     como referencia.

     Estica na grade e altura cheia aqui: os dois cards da linha terminam
     juntos, entao a borda de baixo fecha alinhada.
     (Sem crase: comentario dentro de template literal — crase encerra a
     string e derruba o build. Segunda vez em 06/08.) */
  .gl-prova-card {
    display: flex; flex-direction: column; height: 100%;
    background: #111111;
    border: 1px solid #1E1E1E;
    border-radius: 20px;
    padding: 14px 14px 22px;
  }
  .gl-prova-grade { align-items: stretch; }
  /* Dentro do card, a caixa da foto nao precisa de borda propria: duas bordas
     encostadas viram sujeira. */
  .gl-prova-card .gl-foto-caixa { border-color: transparent; background: #0A0A0A; }

  /* Faixa de resultados: menor que os cards com história, de propósito — o
     peso visual segue a hierarquia do conteúdo. */
  .gl-prova-faixa { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 640px) {
    .gl-prova-faixa { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  /* Duas colunas já no tablet. Entre 768 e 1023 tudo virava uma coluna só, e
     quatro cards empilhados esticavam demais a página no iPad em pé. */
  .gl-dores { display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gl-metodo { display: grid; gap: 48px; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); align-items: start; }
  .gl-quem { display: grid; gap: 48px; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); align-items: center; }
  @media (max-width: 900px) {
    .gl-metodo, .gl-quem { grid-template-columns: 1fr; gap: 32px; }
  }
  /* As dores só colapsam no celular de verdade. */
  @media (max-width: 640px) {
    .gl-dores { grid-template-columns: 1fr; }
  }
`;
