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
  text:"#FFFFFF", textSub:"#A0A0A0", textMuted:"#666666",
  border:"#1E1E1E", borderHover:"#333333",
};
const TYPE = {
  displayXL: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(40px,9vw,72px)", lineHeight:1.0, fontWeight:400, textTransform:"uppercase", letterSpacing:"-0.5px" },
  displayLG: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(28px,6vw,48px)", lineHeight:1.0, fontWeight:400, textTransform:"uppercase", letterSpacing:"-0.3px" },
  displayMD: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(20px,4vw,36px)", lineHeight:1.1, fontWeight:400, textTransform:"uppercase" },
  body:      { fontFamily:"'Inter',sans-serif", fontSize:"clamp(14px,3.5vw,16px)", lineHeight:1.6, fontWeight:400 },
  caption:   { fontFamily:"'Inter',sans-serif", fontSize:"clamp(13px,3vw,14px)", lineHeight:1.5, fontWeight:400 },
  monoSM:    { fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(10px,2.5vw,13px)", lineHeight:1.4, fontWeight:400 },
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
`;
