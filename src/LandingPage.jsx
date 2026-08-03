import { useState } from "react";

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const C = {
  bg:          "#0A0A0A",
  surface:     "#111111",
  deep:        "#14060A",
  red:         "#E10A1F",
  redDark:     "#B00818",
  redGlow:     "rgba(225,10,31,0.15)",
  text:        "#FFFFFF",
  textSub:     "#A0A0A0",
  textMuted:   "#666666",
  border:      "#1E1E1E",
  borderHover: "#333333",
};

/* Escala tipográfica */
const TYPE = {
  displayXL: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(48px,7vw,72px)",  lineHeight:0.92, fontWeight:400, textTransform:"uppercase", letterSpacing:"-0.5px" },
  displayLG: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(32px,5vw,48px)",  lineHeight:1.0,  fontWeight:400, textTransform:"uppercase", letterSpacing:"-0.3px" },
  displayMD: { fontFamily:"'Anton',sans-serif", fontSize:"clamp(24px,3.5vw,36px)",lineHeight:1.1,  fontWeight:400, textTransform:"uppercase" },
  heading:   { fontFamily:"'Inter',sans-serif", fontSize:24, lineHeight:1.2, fontWeight:600 },
  subhead:   { fontFamily:"'Inter',sans-serif", fontSize:18, lineHeight:1.4, fontWeight:500 },
  body:      { fontFamily:"'Inter',sans-serif", fontSize:16, lineHeight:1.6, fontWeight:400 },
  caption:   { fontFamily:"'Inter',sans-serif", fontSize:14, lineHeight:1.5, fontWeight:400 },
  monoSM:    { fontFamily:"'JetBrains Mono',monospace", fontSize:13, lineHeight:1.4, fontWeight:400 },
};

/* Espaçamento */
const SP = { 8:8, 12:12, 16:16, 24:24, 32:32, 48:48, 64:64, 80:80, 120:120 };

/* Border Radius */
const BR = { sm:6, md:12, lg:16, xl:24, full:999 };

/* ─────────────────────────────────────────
   CSS GLOBAL
───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root {
    height: 100%; background: #0A0A0A; color: #fff;
    font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }
  body::after {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
  }

  /* ── Ticker ── */
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-track { display: flex; width: max-content; animation: ticker 18s linear infinite; }
  .ticker-track:hover { animation-play-state: paused; }

  /* ── Animações de entrada ── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes checkPop {
    0%   { transform:scale(0) rotate(-12deg); opacity:0; }
    70%  { transform:scale(1.18) rotate(2deg); opacity:1; }
    100% { transform:scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .anim-tag  { animation: fadeDown 0.5s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
  .anim-h1   { animation: fadeUp  0.65s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
  .anim-sub  { animation: fadeUp  0.6s  cubic-bezier(0.22,1,0.36,1) 0.28s both; }
  .anim-cta  { animation: fadeUp  0.55s cubic-bezier(0.22,1,0.36,1) 0.40s both; }
  .anim-o1   { animation: fadeUp  0.55s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
  .anim-o2   { animation: fadeUp  0.55s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
  .anim-o3   { animation: fadeUp  0.55s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
  .anim-o4   { animation: fadeUp  0.55s cubic-bezier(0.22,1,0.36,1) 0.52s both; }
  .anim-cont { animation: fadeUp  0.4s  cubic-bezier(0.22,1,0.36,1) both; }
  .anim-form { animation: fadeUp  0.5s  cubic-bezier(0.22,1,0.36,1) 0.24s both; }
  .anim-conf { animation: checkPop 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both; }

  /* hover nos botões */
  .btn-primary { transition: opacity 0.18s, transform 0.18s, box-shadow 0.25s !important; }
  .btn-primary:hover { opacity: 0.88 !important; transform: translateY(-1px) !important; box-shadow: 0 8px 32px rgba(225,10,31,0.35) !important; }
  .btn-outline:hover { background: rgba(225,10,31,0.08) !important; }
  .btn-ghost:hover   { border-color: #555 !important; color: #fff !important; }

  /* hover nos option cards */
  .opt-card { transition: border-color 0.18s, background 0.18s, transform 0.18s, box-shadow 0.2s !important; }
  .opt-card:not(.opt-selected):hover {
    border-color: #333 !important;
    transform: translateX(4px) !important;
  }
  .opt-selected {
    border-color: #E10A1F !important;
    background: linear-gradient(135deg, rgba(225,10,31,0.1), rgba(176,8,24,0.05)) !important;
    box-shadow: 0 0 0 1px #E10A1F, 0 8px 32px rgba(225,10,31,0.1) !important;
  }
`;

/* ─────────────────────────────────────────
   DADOS DAS TELAS
───────────────────────────────────────── */
const SCREENS = [
  {
    id: "intro", type: "intro",
    tag: "GL Consultoria · Qualificação",
    headline: ["ANTES DE", "COMEÇAR,", "PRECISO TE", "CONHECER."],
    accentLines: [2, 3],
    sub: "São 4 perguntas rápidas. Suas respostas definem se o acompanhamento da GL Team é o caminho certo pra você.",
    cta: "Vamos lá",
    note: "Leva menos de 2 minutos",
  },
  {
    id: "objetivo", type: "choice", step: 1,
    question: "Qual é o seu principal objetivo agora?",
    hint: "Escolha o que mais se aproxima da sua realidade.",
    options: [
      { id:"a", label:"Ganhar massa muscular",       sub:"Hipertrofia e definição" },
      { id:"b", label:"Perder gordura",               sub:"Emagrecimento com saúde" },
      { id:"c", label:"Os dois ao mesmo tempo",       sub:"Recomposição corporal" },
      { id:"d", label:"Melhorar saúde e disposição",  sub:"Qualidade de vida geral" },
    ],
  },
  {
    id: "historico", type: "choice", step: 2,
    question: "Você já tentou mudar o corpo antes. O que aconteceu?",
    hint: "Sem julgamento — isso vai ajudar a montar o protocolo certo.",
    options: [
      { id:"a", label:"Comecei mas não mantive",             sub:"A consistência sempre foi o problema" },
      { id:"b", label:"Fiz por meses mas não vi resultado",  sub:"Me esforcei bastante e não mudou quase nada" },
      { id:"c", label:"Nunca tive um acompanhamento real",   sub:"Sempre fui no achismo ou sozinha" },
      { id:"d", label:"Tive resultado, mas voltei ao zero",  sub:"Perdi e recuperei mais de uma vez" },
    ],
  },
  {
    id: "rotina", type: "choice", step: 3,
    question: "Como é sua rotina hoje?",
    hint: "O protocolo vai ser construído em cima do que você tem — não do ideal.",
    options: [
      { id:"a", label:"Corrida o dia todo",           sub:"Trabalho, filhos, compromissos — pouco espaço" },
      { id:"b", label:"Tenho algum tempo livre",      sub:"Consigo organizar 3–4 dias na semana" },
      { id:"c", label:"Tenho bastante disponibilidade", sub:"Posso me dedicar de verdade agora" },
      { id:"d", label:"Minha rotina muda toda semana",  sub:"É imprevisível, mas quero tentar" },
    ],
  },
  {
    id: "comprometimento", type: "choice", step: 4,
    question: "O que falta pra você não desistir dessa vez?",
    hint: "Essa é a pergunta mais importante. Seja honesta.",
    options: [
      { id:"a", label:"Um plano que eu entenda e consiga seguir",      sub:"Clareza sobre o que fazer todo dia" },
      { id:"b", label:"Alguém acompanhando de perto",                  sub:"Suporte real quando surgir dúvida ou dificuldade" },
      { id:"c", label:"Ver resultado rápido o suficiente pra continuar", sub:"Preciso de progresso visível nas primeiras semanas" },
      { id:"d", label:"Um método que caiba na minha vida real",        sub:"Sem dieta impossível ou treino de 2h por dia" },
    ],
  },
  /* ── QUALIFICAÇÃO GAMIFICADA ── */
  {
    id: "perfil_suporte", type: "choice", step: 5,
    tag: "Quase lá · Montando seu perfil",
    question: "Como você aprende e evolui melhor?",
    hint: "Isso define como o acompanhamento vai funcionar pra você.",
    flavor: "Cada pessoa tem um jeito. Não existe resposta errada.",
    options: [
      { id:"a", emoji:"🎯", label:"Seguindo um plano à risca",          sub:"Gosto de saber exatamente o que fazer — sem improvisar" },
      { id:"b", emoji:"💬", label:"Tendo alguém pra conversar quando trava", sub:"Funciono bem quando sei que posso tirar dúvida na hora" },
      { id:"c", emoji:"📊", label:"Vendo os números evoluírem",          sub:"Progresso visível me mantém motivada — peso, medidas, fotos" },
      { id:"d", emoji:"🔍", label:"Entendendo o porquê de cada coisa",   sub:"Não consigo seguir algo que não faz sentido pra mim" },
    ],
  },
  {
    id: "perfil_investimento", type: "choice", step: 6,
    tag: "Quase lá · Montando seu perfil",
    question: "Qual dessas frases combina mais com você agora?",
    hint: "Pensa na sua relação com saúde e resultado.",
    flavor: "Escolha a que mais reflete onde você está de verdade.",
    options: [
      { id:"a", emoji:"🌱", label:"Nunca investi em acompanhamento profissional", sub:"Sempre tentei sozinha — agora quero tentar diferente" },
      { id:"b", emoji:"🔄", label:"Já investi antes, mas não vi o retorno esperado", sub:"Coloquei tempo e dinheiro — o resultado não veio" },
      { id:"c", emoji:"✅", label:"Já tive acompanhamento e funcionou — quero voltar", sub:"Sei o valor disso. Só preciso do método certo agora" },
      { id:"d", emoji:"⚖️", label:"Estou avaliando se vale o investimento pra mim", sub:"Ainda pesando — mas estou aberta se fizer sentido" },
    ],
  },
  {
    id: "perfil_momento", type: "choice", step: 7,
    tag: "Última pergunta",
    question: "Se o método for o certo pra você, quando começa?",
    hint: "Sem compromisso agora — só queremos entender seu momento.",
    flavor: "Isso nos ajuda a entrar em contato na hora certa.",
    options: [
      { id:"a", emoji:"⚡", label:"Agora. Estou pronta.",              sub:"Só preciso saber que é o certo — e começo" },
      { id:"b", emoji:"📅", label:"Em até duas semanas",               sub:"Estou organizando — a decisão já está quase tomada" },
      { id:"c", emoji:"🗓️", label:"No próximo mês",                   sub:"Quero me preparar antes de começar de vez" },
      { id:"d", emoji:"🤔", label:"Ainda estou avaliando",             sub:"Quero entender melhor antes de qualquer decisão" },
    ],
  },

  {
    id: "contato", type: "form", step: 8,
    headline: ["VOCÊ CHEGOU", "ATÉ AQUI.", "ISSO JÁ DIZ", "MUITO."],
    accentLines: [2, 3],
    sub: "Deixa seu contato. O GL vai analisar suas respostas e entrar em contato em até 24h.",
  },
  { id: "confirmacao", type: "confirm" },
];

const TOTAL_STEPS = 7;

/* ─────────────────────────────────────────
   COMPONENTES ATÔMICOS
───────────────────────────────────────── */

/* Badge pill (JetBrains Mono 11px) */
function Badge({ children }) {
  return (
    <span style={{
      ...TYPE.monoSM, fontSize: 11,
      background: C.deep, color: C.red,
      border: `1px solid rgba(225,10,31,0.2)`,
      borderRadius: BR.full,
      padding: "4px 12px",
      display: "inline-flex", alignItems: "center", gap: 6,
      letterSpacing: "2px", textTransform: "uppercase",
    }}>
      <span style={{ width:4, height:4, borderRadius:"50%", background:C.red, display:"inline-block" }} />
      {children}
    </span>
  );
}

/* Botão primário */
function BtnPrimary({ children, onClick, disabled, fullWidth }) {
  return (
    <button
      className="btn-primary"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: SP[8],
        background: disabled ? "#333" : `linear-gradient(135deg, ${C.red} 0%, ${C.redDark} 100%)`,
        color: disabled ? C.textMuted : "#fff",
        border: "none", borderRadius: BR.full,
        padding: `${SP[16] - 2}px ${SP[32]}px`,
        ...TYPE.caption, fontWeight: 600, letterSpacing: "0.5px",
        cursor: disabled ? "not-allowed" : "pointer",
        width: fullWidth ? "100%" : "auto",
        boxShadow: disabled ? "none" : "0 4px 24px rgba(225,10,31,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

/* Botão outline */
function BtnOutline({ children, onClick }) {
  return (
    <button
      className="btn-outline"
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: SP[8],
        background: "transparent", color: C.red,
        border: `1px solid ${C.red}`, borderRadius: BR.full,
        padding: `${SP[16] - 2}px ${SP[32]}px`,
        ...TYPE.caption, fontWeight: 600, letterSpacing: "0.5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* Barra de progresso */
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 2, background: C.border,
    }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: `linear-gradient(90deg, ${C.redDark}, ${C.red})`,
        transition: "width 0.55s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: `0 0 10px ${C.red}`,
      }} />
    </div>
  );
}

/* Ticker / Marquee */
function Ticker() {
  const items = ["PROTOCOLO INDIVIDUAL", "CHECK-IN SEMANAL", "SUPORTE DIRETO", "RESULTADO REAL", "GL CONSULTORIA", "SEM ACHISMO", "TREINO E DIETA", "MÉTODO GL"];
  const track = [...items, ...items];
  return (
    <div style={{
      background: C.red, overflow: "hidden",
      padding: `${SP[12]}px 0`,
      borderTop: `1px solid rgba(255,255,255,0.1)`,
      borderBottom: `1px solid rgba(255,255,255,0.1)`,
    }}>
      <div className="ticker-track">
        {track.map((item, i) => (
          <span key={i} style={{
            ...TYPE.monoSM, fontSize: 11,
            color: "#fff", letterSpacing: "3px",
            textTransform: "uppercase",
            padding: `0 ${SP[32]}px`,
            whiteSpace: "nowrap",
            display: "inline-flex", alignItems: "center", gap: SP[32],
          }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* Step counter badge */
function StepCounter({ step, total }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: SP[8] }}>
      <span style={{ ...TYPE.monoSM, fontSize: 11, color: C.red, letterSpacing: "2px" }}>
        {String(step).padStart(2, "0")}
      </span>
      <span style={{ ...TYPE.monoSM, fontSize: 11, color: C.textMuted }}>
        / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

/* Option Card */
function OptionCard({ opt, index, selected, onClick }) {
  const animClasses = ["anim-o1","anim-o2","anim-o3","anim-o4"];
  const hasEmoji = !!opt.emoji;
  return (
    <button
      className={`opt-card ${selected ? "opt-selected" : ""} ${animClasses[index]}`}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: SP[16],
        width: "100%", textAlign: "left",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: BR.lg,
        padding: `${SP[16]}px ${SP[24]}px`,
        cursor: "pointer", color: C.text,
        outline: "none",
      }}
    >
      {/* emoji OU indicador de seleção */}
      {hasEmoji ? (
        <div style={{
          width: 40, height: 40, borderRadius: BR.md, flexShrink: 0,
          background: selected ? "rgba(225,10,31,0.15)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${selected ? C.red : C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, transition: "all 0.2s",
        }}>
          {selected ? "✓" : opt.emoji}
        </div>
      ) : (
        <div style={{
          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
          border: `1.5px solid ${selected ? C.red : C.borderHover}`,
          background: selected ? C.red : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}>
          {selected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      )}

      {/* texto */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...TYPE.caption, fontWeight: 600, color: C.text, marginBottom: 2 }}>
          {opt.label}
        </div>
        <div style={{ ...TYPE.monoSM, fontSize: 12, color: C.textMuted }}>
          {opt.sub}
        </div>
      </div>

      {/* seta */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
        flexShrink: 0, opacity: selected ? 1 : 0.3,
        transition: "opacity 0.2s",
      }}>
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke={selected ? C.red : C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

/* Input com estilo pill */
function Input({ label, value, onChange, placeholder, required, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        ...TYPE.monoSM, fontSize: 11,
        color: C.textMuted, letterSpacing: "1.5px",
        textTransform: "uppercase",
        display: "block", marginBottom: SP[8],
      }}>
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: "100%", display: "block",
          background: C.bg,
          border: `1px solid ${focused ? C.red : C.border}`,
          borderRadius: BR.full,
          padding: `${SP[16] - 2}px ${SP[24] - 4}px`,
          ...TYPE.body, fontSize: 15,
          color: C.text, outline: "none",
          transition: "border-color 0.18s, box-shadow 0.18s",
          boxShadow: focused ? `0 0 0 3px rgba(225,10,31,0.1)` : "none",
          fontFamily: "'Inter',sans-serif",
        }}
      />
    </div>
  );
}

/* Watermark tipográfica */
function Watermark({ text = "GL" }) {
  return (
    <div style={{
      position: "absolute", right: -24, bottom: -48,
      fontFamily: "'Anton',sans-serif",
      fontSize: "clamp(140px,20vw,240px)",
      color: "transparent",
      WebkitTextStroke: "1px rgba(255,255,255,0.025)",
      userSelect: "none", pointerEvents: "none", lineHeight: 1,
      zIndex: 0,
    }}>{text}</div>
  );
}

/* Linha decorativa vertical */
function VerticalLine() {
  return (
    <div style={{
      position: "absolute", left: 48, top: 0, bottom: 0, width: 1,
      background: `linear-gradient(180deg, transparent, ${C.red} 30%, ${C.red} 70%, transparent)`,
      opacity: 0.18,
    }} />
  );
}

/* Headline com linhas coloridas */
function DisplayHeadline({ lines, accentLines = [], size = "XL" }) {
  const t = size === "XL" ? TYPE.displayXL : TYPE.displayLG;
  return (
    <h1 style={{ ...t, color: C.text, marginBottom: 0 }}>
      {lines.map((line, i) => (
        <span key={i} style={{
          display: "block",
          color: accentLines.includes(i) ? C.red : C.text,
        }}>
          {line}
        </span>
      ))}
    </h1>
  );
}

/* ─────────────────────────────────────────
   TELAS
───────────────────────────────────────── */

/* TELA 0 — Intro */
function IntroScreen({ screen, onNext }) {
  return (
    <div style={S.screen}>
      {/* fundos */}
      <div style={{
        position:"absolute", inset:0,
        background:`radial-gradient(ellipse 80% 60% at 50% 0%, ${C.deep} 0%, ${C.bg} 65%)`,
      }} />
      <VerticalLine />
      <Watermark />

      <div style={{ position:"relative", zIndex:1, maxWidth:560, width:"100%" }}>
        {/* badge */}
        <div className="anim-tag" style={{ marginBottom: SP[32] }}>
          <Badge>{screen.tag}</Badge>
        </div>

        {/* headline */}
        <div className="anim-h1" style={{ marginBottom: SP[24] }}>
          <DisplayHeadline lines={screen.headline} accentLines={screen.accentLines} size="XL" />
        </div>

        {/* sub */}
        <p className="anim-sub" style={{
          ...TYPE.body, color: C.textSub,
          marginBottom: SP[48], maxWidth: 420,
        }}>{screen.sub}</p>

        {/* CTA */}
        <div className="anim-cta" style={{ display:"flex", flexDirection:"column", gap: SP[16], alignItems:"flex-start" }}>
          <BtnPrimary onClick={onNext}>
            {screen.cta} →
          </BtnPrimary>
          <span style={{ ...TYPE.monoSM, fontSize: 11, color: C.textMuted, letterSpacing:"1.5px" }}>
            ◦ {screen.note}
          </span>
        </div>
      </div>
    </div>
  );
}

/* TELA 1–4 — Choice */
function ChoiceScreen({ screen, answers, onAnswer, onNext }) {
  const selected = answers[screen.id];
  return (
    <div style={{ ...S.screen, alignItems:"flex-start", justifyContent:"center", paddingTop: SP[80] }}>
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:580 }}>

        {/* step + hint */}
        <div className="anim-tag" style={{ display:"flex", alignItems:"center", gap: SP[16], marginBottom: SP[16] }}>
          <StepCounter step={screen.step} total={TOTAL_STEPS} />
          <span style={{ width:1, height:16, background: C.border }} />
          <span style={{ ...TYPE.monoSM, fontSize: 12, color: C.textMuted }}>{screen.hint}</span>
        </div>

        {/* tag gamificada — aparece nas telas de qualificação */}
        {screen.tag && screen.step > 4 && (
          <div className="anim-tag" style={{ marginBottom: SP[16] }}>
            <Badge>{screen.tag}</Badge>
          </div>
        )}

        {/* pergunta */}
        <div className="anim-h1" style={{ marginBottom: screen.flavor ? SP[8] : SP[32] }}>
          <h2 style={{ ...TYPE.displayMD, color: C.text }}>{screen.question}</h2>
        </div>

        {/* flavor text — tom mais humano, gamificado */}
        {screen.flavor && (
          <p className="anim-sub" style={{
            ...TYPE.monoSM, fontSize: 12,
            color: C.textMuted, marginBottom: SP[24],
            fontStyle: "italic",
          }}>{screen.flavor}</p>
        )}

        {/* opções */}
        <div style={{ display:"flex", flexDirection:"column", gap: SP[8] }}>
          {screen.options.map((opt, i) => (
            <OptionCard
              key={opt.id} opt={opt} index={i}
              selected={selected === opt.id}
              onClick={() => onAnswer(screen.id, opt.id)}
            />
          ))}
        </div>

        {/* botão continuar — aparece após seleção */}
        {selected && (
          <div className="anim-cont" style={{ marginTop: SP[24] }}>
            <BtnPrimary onClick={onNext}>Continuar →</BtnPrimary>
          </div>
        )}
      </div>
    </div>
  );
}

/* TELA 5 — Formulário */
function FormScreen({ screen, onSubmit }) {
  const [nome, setNome]   = useState("");
  const [whats, setWhats] = useState("");
  const [insta, setInsta] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = nome.trim().length > 1 && whats.replace(/\D/g,"").length >= 10;

  function submit() {
    if (!valid || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSubmit({ nome, whats, insta }); }, 1100);
  }

  return (
    <div style={S.screen}>
      <div style={{
        position:"absolute", inset:0,
        background:`radial-gradient(ellipse 70% 50% at 50% 100%, ${C.deep} 0%, ${C.bg} 55%)`,
      }} />
      <VerticalLine />

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:500 }}>

        {/* badge */}
        <div className="anim-tag" style={{ marginBottom: SP[24] }}>
          <StepCounter step={screen.step} total={TOTAL_STEPS + 1} />
        </div>

        {/* headline */}
        <div className="anim-h1" style={{ marginBottom: SP[16] }}>
          <DisplayHeadline lines={screen.headline} accentLines={screen.accentLines} size="LG" />
        </div>

        {/* sub */}
        <p className="anim-sub" style={{
          ...TYPE.body, color: C.textSub, marginBottom: SP[32],
        }}>{screen.sub}</p>

        {/* campos */}
        <div className="anim-form" style={{ display:"flex", flexDirection:"column", gap: SP[16], marginBottom: SP[24] }}>
          <Input label="Seu nome" value={nome} onChange={setNome} placeholder="Como prefere ser chamada?" required />
          <Input label="WhatsApp" value={whats} onChange={setWhats} placeholder="(00) 00000-0000" type="tel" required />
          <Input label="Instagram" value={insta} onChange={setInsta} placeholder="@seuarroba" />
        </div>

        {/* submit */}
        <div className="anim-cta" style={{ display:"flex", flexDirection:"column", gap: SP[12] }}>
          <BtnPrimary onClick={submit} disabled={!valid || loading} fullWidth>
            {loading
              ? <span style={{ display:"flex", alignItems:"center", gap: SP[8] }}>
                  <span style={{ animation:"pulse 0.9s infinite" }}>●</span> Enviando...
                </span>
              : "Quero ser avaliada →"
            }
          </BtnPrimary>
          <p style={{ ...TYPE.monoSM, fontSize: 11, color: C.textMuted, textAlign:"center", letterSpacing:"0.5px" }}>
            Sem spam. Seus dados são usados apenas para contato.
          </p>
        </div>
      </div>
    </div>
  );
}

/* TELA 6 — Confirmação */
function ConfirmScreen() {
  return (
    <div style={{ ...S.screen, textAlign:"center" }}>
      <div style={{
        position:"absolute", inset:0,
        background:`radial-gradient(ellipse 60% 55% at 50% 50%, rgba(225,10,31,0.06) 0%, ${C.bg} 65%)`,
      }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:480, width:"100%" }}>
        {/* ícone check */}
        <div className="anim-conf" style={{
          width:72, height:72, borderRadius:"50%",
          border:`1px solid ${C.red}`,
          background:"rgba(225,10,31,0.08)",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:`0 auto ${SP[32]}px`, fontSize:28,
        }}>✓</div>

        {/* headline */}
        <div className="anim-h1" style={{ marginBottom: SP[16] }}>
          <h2 style={{ ...TYPE.displayLG, color: C.text }}>
            RECEBIDO.<br/>
            <span style={{ color: C.red }}>OBRIGADO.</span>
          </h2>
        </div>

        {/* sub */}
        <p className="anim-sub" style={{
          ...TYPE.body, color: C.textSub, marginBottom: SP[40],
        }}>
          O GL vai analisar suas respostas e entrar em contato em até{" "}
          <strong style={{ color: C.text }}>24 horas</strong> pelo WhatsApp.
        </p>

        {/* métricas */}
        <div className="anim-form" style={{
          display:"flex", justifyContent:"center", gap: SP[48],
          padding:`${SP[24]}px ${SP[32]}px`,
          background: C.surface, borderRadius: BR.xl,
          border:`1px solid ${C.border}`,
          marginBottom: SP[32],
        }}>
          {[
            { val:"24h",  label:"Resposta em" },
            { val:"100%", label:"Individual" },
            { val:"GL",   label:"Direto com o" },
          ].map(m => (
            <div key={m.label} style={{ textAlign:"center" }}>
              <div style={{ ...TYPE.monoSM, fontSize:20, color: C.text, marginBottom:4 }}>{m.val}</div>
              <div style={{ ...TYPE.monoSM, fontSize:11, color: C.textMuted, letterSpacing:"1px" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* instagram */}
        <a
          href="https://instagram.com/gabriellincoln01"
          target="_blank" rel="noreferrer"
          style={{
            ...TYPE.caption, color: C.textMuted,
            textDecoration:"none", display:"inline-flex",
            alignItems:"center", gap: SP[8],
            transition:"color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.text}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
        >
          Me acompanhe no @gabriellincoln01 →
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ESTILOS BASE
───────────────────────────────────────── */
const S = {
  screen: {
    position:"relative",
    minHeight:"100vh", width:"100%",
    display:"flex", alignItems:"center", justifyContent:"center",
    padding:`${SP[80]}px clamp(24px,6vw,${SP[80]}px)`,
    paddingLeft:"clamp(64px,8vw,120px)",
    overflow:"hidden",
  },
};

/* ─────────────────────────────────────────
   APP PRINCIPAL
───────────────────────────────────────── */
export default function GLQualificacao() {
  const [screenIdx, setScreenIdx] = useState(0);
  const [answers, setAnswers]     = useState({});
  const [animKey, setAnimKey]     = useState(0);

  const screen = SCREENS[screenIdx];

  const progressScreens = SCREENS.filter(s => s.type === "choice" || s.type === "form");
  const progressIdx = progressScreens.findIndex(s => s.id === screen?.id);

  function goNext() {
    setAnimKey(k => k + 1);
    setScreenIdx(i => Math.min(i + 1, SCREENS.length - 1));
  }

  function goBack() {
    setAnimKey(k => k + 1);
    setScreenIdx(i => Math.max(i - 1, 0));
  }

  function handleAnswer(id, val) {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

  function handleSubmit(data) {
    console.log("Lead GL Consultoria:", { answers, ...data });
    goNext();
  }

  const showTicker = screen.type === "intro";
  const showProgress = progressIdx >= 0;

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Barra de progresso */}
      {showProgress && (
        <ProgressBar current={progressIdx + 1} total={progressScreens.length} />
      )}

      {/* Logo fixo */}
      {screen.type !== "confirm" && (
        <div style={{
          position:"fixed", top:18, right:24, zIndex:50,
          fontFamily:"'Anton',sans-serif", fontSize:16, letterSpacing:2,
          color: C.textMuted,
        }}>
          GL<span style={{ color: C.red }}>.</span>
        </div>
      )}

      {/* Voltar */}
      {screenIdx > 0 && screen.type !== "confirm" && (
        <button
          onClick={goBack}
          style={{
            position:"fixed", top:16, left:24, zIndex:50,
            background:"transparent", border:"none",
            color: C.textMuted, cursor:"pointer",
            display:"flex", alignItems:"center", gap: SP[8],
            ...TYPE.monoSM, fontSize:12,
            padding:`${SP[8]}px ${SP[12]}px`,
            borderRadius: BR.md,
            transition:"color 0.18s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.text}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
        >
          ← Voltar
        </button>
      )}

      {/* Tela ativa */}
      <div key={animKey} style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        {showTicker && <Ticker />}

        {screen.type === "intro"  && <IntroScreen screen={screen} onNext={goNext} />}
        {screen.type === "choice" && (
          <ChoiceScreen
            screen={screen} answers={answers}
            onAnswer={handleAnswer} onNext={goNext}
          />
        )}
        {screen.type === "form"    && <FormScreen screen={screen} onSubmit={handleSubmit} />}
        {screen.type === "confirm" && <ConfirmScreen />}
      </div>
    </>
  );
}
