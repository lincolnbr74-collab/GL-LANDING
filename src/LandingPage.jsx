import { useState } from "react";
import { C, TYPE, SP, BR, GLOBAL_CSS } from "./design";

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwj_pWkJpYjsGpSsdSMBlDCIPzFUIFrqrwCI-68NGL893hibZB0oyfE0lsZsmZuXT1gMg/exec";

/* Variantes de copy por gênero */
const COPY = {
  f: {
    hint_objetivo: "Escolha o que mais se aproxima da sua realidade.",
    hint_historico: "Sem julgamento — isso vai ajudar a montar o protocolo certo.",
    hint_rotina: "O protocolo vai ser construído em cima do que você tem — não do ideal.",
    hint_comprometimento: "Essa é a pergunta mais importante. Seja honesta.",
    pronoun: "ela", voce: "você", pronta: "pronta", certa: "certa",
    confirm_sub: "O GL vai analisar suas respostas e entrar em contato em até 24 horas pelo WhatsApp.",
  },
  m: {
    hint_objetivo: "Escolha o que mais se aproxima da sua realidade.",
    hint_historico: "Sem julgamento — isso vai ajudar a montar o protocolo certo.",
    hint_rotina: "O protocolo vai ser construído em cima do que você tem — não do ideal.",
    hint_comprometimento: "Essa é a pergunta mais importante. Seja honesto.",
    pronoun: "ele", voce: "você", pronta: "pronto", certa: "certo",
    confirm_sub: "O GL vai analisar suas respostas e entrar em contato em até 24 horas pelo WhatsApp.",
  },
  n: {
    hint_objetivo: "Escolha o que mais se aproxima da sua realidade.",
    hint_historico: "Sem julgamento — isso vai ajudar a montar o protocolo certo.",
    hint_rotina: "O protocolo vai ser construído em cima do que você tem — não do ideal.",
    hint_comprometimento: "Essa é a pergunta mais importante. Seja honesto(a).",
    pronoun: "você", voce: "você", pronta: "pronto(a)", certa: "certo(a)",
    confirm_sub: "O GL vai analisar suas respostas e entrar em contato em até 24 horas pelo WhatsApp.",
  },
};

/* ─────────────────────────────────────────
   CSS GLOBAL — MOBILE FIRST
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   DADOS DAS TELAS
───────────────────────────────────────── */
const SCREENS = [
  { id:"intro", type:"intro",
    tag:"GL Consultoria",
    headline:["ANTES DE","COMEÇAR,","PRECISO TE","CONHECER."],
    accentLines:[1,3],
    sub:"São 5 perguntas rápidas. Suas respostas definem se o acompanhamento da GL Team é o caminho certo pra você.",
    cta:"Vamos lá", note:"Leva menos de 3 minutos",
  },
  { id:"genero", type:"gender",
    question:"Como você se identifica?",
    hint:"Isso personaliza o acompanhamento pra você.",
  },
  { id:"objetivo", type:"choice", step:1,
    question:"Qual é o seu principal objetivo agora?",
    hintKey:"hint_objetivo",
    options:[
      { id:"a", emoji:"↑", label:"Ganhar massa muscular",      sub:"Hipertrofia e definição" },
      { id:"b", emoji:"↓", label:"Perder gordura",              sub:"Emagrecimento com saúde" },
      { id:"c", emoji:"⟳", label:"Os dois ao mesmo tempo",      sub:"Recomposição corporal" },
      { id:"d", emoji:"◎", label:"Melhorar saúde e disposição", sub:"Qualidade de vida geral" },
    ],
  },
  { id:"historico", type:"choice", step:2,
    question:"Você já tentou mudar o corpo antes. O que aconteceu?",
    hintKey:"hint_historico",
    options:[
      { id:"a", emoji:"◷", label:"Comecei mas não mantive",           sub:"A consistência sempre foi o problema" },
      { id:"b", emoji:"◈", label:"Fiz por meses mas não vi resultado", sub:"Me esforcei bastante e não mudou quase nada" },
      { id:"c", emoji:"◉", label:"Nunca tive acompanhamento real",     sub:"Sempre fui no achismo ou sozinho(a)" },
      { id:"d", emoji:"◌", label:"Tive resultado, mas voltei ao zero", sub:"Perdi e recuperei mais de uma vez" },
    ],
  },
  { id:"rotina", type:"choice", step:3,
    question:"Como é sua rotina hoje?",
    hintKey:"hint_rotina",
    options:[
      { id:"a", emoji:"◑", label:"Corrida o dia todo",             sub:"Trabalho, família, compromissos — pouco espaço" },
      { id:"b", emoji:"◐", label:"Tenho algum tempo livre",         sub:"Consigo organizar 3–4 dias na semana" },
      { id:"c", emoji:"●", label:"Tenho bastante disponibilidade",  sub:"Posso me dedicar de verdade agora" },
      { id:"d", emoji:"○", label:"Minha rotina muda toda semana",   sub:"É imprevisível, mas quero tentar" },
    ],
  },
  { id:"comprometimento", type:"choice", step:4,
    question:"O que falta pra você não desistir dessa vez?",
    hintKey:"hint_comprometimento",
    options:[
      { id:"a", emoji:"◆", label:"Um plano que eu entenda e consiga seguir",       sub:"Clareza sobre o que fazer todo dia" },
      { id:"b", emoji:"◇", label:"Alguém acompanhando de perto",                   sub:"Suporte real quando surgir dúvida" },
      { id:"c", emoji:"▲", label:"Ver resultado rápido o suficiente pra continuar", sub:"Progresso visível nas primeiras semanas" },
      { id:"d", emoji:"△", label:"Um método que caiba na minha vida real",         sub:"Sem dieta impossível ou treino de 2h por dia" },
    ],
  },
  { id:"perfil_suporte", type:"choice", step:5,
    tag:"Quase lá · Montando seu perfil",
    question:"Como você aprende e evolui melhor?",
    hint:"Isso define como o acompanhamento vai funcionar pra você.",
    flavor:"Cada pessoa tem um jeito. Não existe resposta errada.",
    options:[
      { id:"a", emoji:"🎯", label:"Seguindo um plano à risca",             sub:"Gosto de saber exatamente o que fazer" },
      { id:"b", emoji:"💬", label:"Tendo alguém pra conversar quando trava", sub:"Funciono bem com suporte direto" },
      { id:"c", emoji:"📊", label:"Vendo os números evoluírem",              sub:"Progresso visível me mantém motivado(a)" },
      { id:"d", emoji:"🔍", label:"Entendendo o porquê de cada coisa",       sub:"Não sigo algo que não faz sentido pra mim" },
    ],
  },
  { id:"perfil_investimento", type:"choice", step:6,
    tag:"Quase lá · Montando seu perfil",
    question:"Qual dessas frases combina mais com você agora?",
    hint:"Pensa na sua relação com saúde e resultado.",
    flavor:"Escolha a que mais reflete onde você está de verdade.",
    options:[
      { id:"a", emoji:"🌱", label:"Nunca investi em acompanhamento profissional",   sub:"Sempre tentei sozinho(a) — agora quero tentar diferente" },
      { id:"b", emoji:"🔄", label:"Já investi antes, mas não vi o retorno esperado", sub:"Coloquei tempo e dinheiro — o resultado não veio" },
      { id:"c", emoji:"✅", label:"Já tive acompanhamento e funcionou — quero voltar", sub:"Sei o valor disso. Só preciso do método certo" },
      { id:"d", emoji:"⚖️", label:"Estou avaliando se vale o investimento",         sub:"Ainda pesando — mas estou aberto(a) se fizer sentido" },
    ],
  },
  { id:"perfil_momento", type:"choice", step:7,
    tag:"Última pergunta",
    question:"Se o método for o certo pra você, quando começa?",
    hint:"Sem compromisso agora — só queremos entender seu momento.",
    flavor:"Isso nos ajuda a entrar em contato na hora certa.",
    options:[
      { id:"a", emoji:"⚡", label:"Agora. Estou pronto(a).",        sub:"Só preciso saber que é o certo — e começo" },
      { id:"b", emoji:"📅", label:"Em até duas semanas",             sub:"Estou organizando — a decisão está quase tomada" },
      { id:"c", emoji:"🗓️", label:"No próximo mês",                 sub:"Quero me preparar antes de começar de vez" },
      { id:"d", emoji:"🤔", label:"Ainda estou avaliando",           sub:"Quero entender melhor antes de decidir" },
    ],
  },
  { id:"contato", type:"form", step:8,
    headline:["VOCÊ CHEGOU","ATÉ AQUI.","ISSO JÁ DIZ","MUITO."],
    accentLines:[1,3],
    sub:"Deixa seu contato. O GL vai analisar suas respostas e entrar em contato em até 24h.",
  },
  { id:"confirmacao", type:"confirm" },
];

const TOTAL_STEPS = 7;

/* ─────────────────────────────────────────
   COMPONENTES ATÔMICOS
───────────────────────────────────────── */

function Badge({ children, red }) {
  return (
    <span style={{
      ...TYPE.monoSM, fontSize:11,
      background: red ? "rgba(225,10,31,0.12)" : C.deep,
      color: C.red,
      border:`1px solid rgba(225,10,31,0.2)`,
      borderRadius: BR.full,
      padding:"4px 12px",
      display:"inline-flex", alignItems:"center", gap:6,
      letterSpacing:"2px", textTransform:"uppercase",
    }}>
      <span style={{width:4,height:4,borderRadius:"50%",background:C.red,display:"inline-block"}}/>
      {children}
    </span>
  );
}

function BtnPrimary({ children, onClick, disabled, fullWidth }) {
  return (
    <button className="btn-primary" onClick={onClick} disabled={disabled} style={{
      display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
      background: disabled ? "#222" : `linear-gradient(135deg,${C.red},${C.redDark})`,
      color: disabled ? C.textMuted : "#fff",
      border:"none", borderRadius:BR.full,
      padding:"14px 28px",
      ...TYPE.caption, fontWeight:600, letterSpacing:"0.5px",
      cursor: disabled ? "not-allowed" : "pointer",
      width: fullWidth ? "100%" : "auto",
      boxShadow: disabled ? "none" : "0 4px 20px rgba(225,10,31,0.22)",
      whiteSpace:"nowrap", minWidth:0,
    }}>{children}</button>
  );
}

function ProgressBar({ current, total }) {
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:2,background:C.border}}>
      <div style={{
        height:"100%", width:`${Math.round((current/total)*100)}%`,
        background:`linear-gradient(90deg,${C.redDark},${C.red})`,
        transition:"width 0.5s cubic-bezier(0.22,1,0.36,1)",
        boxShadow:`0 0 8px ${C.red}`,
      }}/>
    </div>
  );
}

function Ticker() {
  const items=["PROTOCOLO INDIVIDUAL","CHECK-IN SEMANAL","SUPORTE DIRETO","RESULTADO REAL","GL CONSULTORIA","SEM ACHISMO","TREINO E DIETA","MÉTODO GL"];
  const track=[...items,...items];
  return (
    <div style={{background:C.red,overflow:"hidden",padding:"10px 0",flexShrink:0}}>
      <div className="ticker-track">
        {track.map((item,i)=>(
          <span key={i} style={{
            ...TYPE.monoSM, fontSize:10,
            color:"#fff", letterSpacing:"3px", textTransform:"uppercase",
            padding:"0 28px", whiteSpace:"nowrap",
            display:"inline-flex", alignItems:"center", gap:28,
          }}>
            {item}
            <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,0.5)"}}/>
          </span>
        ))}
      </div>
    </div>
  );
}

function StepCounter({ step, total }) {
  return (
    <div style={{display:"inline-flex",alignItems:"center",gap:8}}>
      <span style={{...TYPE.monoSM,fontSize:11,color:C.red,letterSpacing:"2px"}}>{String(step).padStart(2,"0")}</span>
      <span style={{...TYPE.monoSM,fontSize:11,color:C.textMuted}}>/ {String(total).padStart(2,"0")}</span>
    </div>
  );
}

function OptionCard({ opt, index, selected, onClick }) {
  const cls=["anim-o1","anim-o2","anim-o3","anim-o4"];
  return (
    <button className={`opt-card ${selected?"opt-selected":""} ${cls[index]}`} onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:12,
      width:"100%", textAlign:"left",
      background: C.surface,
      border:`1px solid ${C.border}`,
      borderRadius: BR.lg,
      padding:"14px 16px",
      cursor:"pointer", color:C.text, outline:"none",
    }}>
      <div style={{
        width:36, height:36, borderRadius:BR.md, flexShrink:0,
        background: selected ? "rgba(225,10,31,0.15)" : "rgba(255,255,255,0.04)",
        border:`1px solid ${selected?C.red:C.border}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize: opt.emoji ? 16 : 13, transition:"all 0.18s",
        color: selected ? C.red : C.textMuted,
      }}>
        {selected ? "✓" : opt.emoji}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{...TYPE.caption,fontWeight:600,color:C.text,marginBottom:2,fontSize:"clamp(12px,3vw,14px)"}}>{opt.label}</div>
        <div style={{...TYPE.monoSM,fontSize:"clamp(10px,2.5vw,12px)",color:C.textMuted,lineHeight:1.4}}>{opt.sub}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,opacity:selected?1:0.25,transition:"opacity 0.18s"}}>
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke={selected?C.red:C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function GenderCard({ id, emoji, label, selected, onClick, animClass }) {
  return (
    <button className={`gender-card ${selected?"gender-selected":""} ${animClass}`} onClick={onClick} style={{
      flex:1, minWidth:0,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      gap:10, padding:"20px 12px",
      background: C.surface,
      border:`1px solid ${selected?C.red:C.border}`,
      borderRadius: BR.xl,
      cursor:"pointer", outline:"none",
      textAlign:"center",
    }}>
      <span style={{fontSize:"clamp(24px,6vw,32px)"}}>{emoji}</span>
      <span style={{...TYPE.caption,fontWeight:600,color:selected?C.text:C.textSub,fontSize:"clamp(11px,2.8vw,13px)",lineHeight:1.35,wordBreak:"break-word"}}>{label}</span>
    </button>
  );
}

function Input({ label, value, onChange, placeholder, required, type="text" }) {
  const [focused,setFocused]=useState(false);
  return (
    <div>
      <label style={{
        ...TYPE.monoSM, fontSize:10,
        color:C.textMuted, letterSpacing:"1.5px", textTransform:"uppercase",
        display:"block", marginBottom:6,
      }}>
        {label}{required&&<span style={{color:C.red}}> *</span>}
      </label>
      <input type={type} value={value}
        onChange={e=>onChange(e.target.value)}
        onFocus={()=>setFocused(true)}
        onBlur={()=>setFocused(false)}
        placeholder={placeholder}
        style={{
          width:"100%", display:"block",
          background:C.bg,
          border:`1px solid ${focused?C.red:C.border}`,
          borderRadius:BR.full, padding:"13px 20px",
          ...TYPE.body, fontSize:"clamp(14px,3.5vw,15px)",
          color:C.text, outline:"none",
          transition:"border-color 0.18s, box-shadow 0.18s",
          boxShadow:focused?`0 0 0 3px rgba(225,10,31,0.1)`:"none",
          fontFamily:"'Inter',sans-serif",
        }}
      />
    </div>
  );
}

function DisplayHeadline({ lines, accentLines=[], size="XL" }) {
  const t = size==="XL" ? TYPE.displayXL : TYPE.displayLG;
  return (
    <h1 style={{...t,color:C.text,marginBottom:0}}>
      {lines.map((line,i)=>(
        <span key={i} style={{display:"block",color:accentLines.includes(i)?C.red:C.text}}>{line}</span>
      ))}
    </h1>
  );
}

/* ─────────────────────────────────────────
   TELAS
───────────────────────────────────────── */

function IntroScreen({ screen, onNext }) {
  return (
    <div style={{...S.screen, minHeight:"100svh"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 55% at 50% 0%,${C.deep},${C.bg} 65%)`}}/>
      <div style={{position:"absolute",left:"clamp(20px,5vw,48px)",top:0,bottom:0,width:1,background:`linear-gradient(180deg,transparent,${C.red} 30%,${C.red} 70%,transparent)`,opacity:0.18}}/>
      <div style={{position:"absolute",right:"-2%",bottom:"-5%",fontFamily:"'Anton',sans-serif",fontSize:"clamp(100px,22vw,220px)",color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,0.025)",userSelect:"none",pointerEvents:"none",lineHeight:1}}>GL</div>

      <div style={{position:"relative",zIndex:1,maxWidth:560,width:"100%"}}>
        <div className="anim-tag" style={{marginBottom:SP[24]}}>
          <Badge>{screen.tag}</Badge>
        </div>
        <div className="anim-h1" style={{marginBottom:SP[20]}}>
          <DisplayHeadline lines={screen.headline} accentLines={screen.accentLines} size="XL"/>
        </div>
        <p className="anim-sub" style={{...TYPE.body,color:C.textSub,marginBottom:SP[40],maxWidth:400}}>{screen.sub}</p>
        <div className="anim-cta" style={{display:"flex",flexDirection:"column",gap:SP[12],alignItems:"flex-start"}}>
          <BtnPrimary onClick={onNext}>{screen.cta} →</BtnPrimary>
          <span style={{...TYPE.monoSM,fontSize:10,color:C.textMuted,letterSpacing:"1px"}}>◦ {screen.note}</span>
        </div>
      </div>
    </div>
  );
}

function GenderScreen({ onAnswer }) {
  const [sel, setSel] = useState(null);
  function choose(g) { setSel(g); setTimeout(()=>onAnswer("genero",g),320); }
  return (
    <div style={{...S.screen, minHeight:"100svh"}}>
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:520}}>
        <div className="anim-tag" style={{marginBottom:SP[20]}}>
          <Badge>GL Consultoria</Badge>
        </div>
        <div className="anim-h1" style={{marginBottom:SP[8]}}>
          <h2 style={{...TYPE.displayMD,color:C.text}}>Como você se identifica?</h2>
        </div>
        <p className="anim-sub" style={{...TYPE.monoSM,fontSize:11,color:C.textMuted,marginBottom:SP[32],letterSpacing:"0.5px"}}>
          Isso personaliza o acompanhamento pra você.
        </p>
        <div className="anim-o1" style={{display:"flex",gap:SP[12]}}>
          <GenderCard id="f" emoji="👩" label="Mulher"     selected={sel==="f"} onClick={()=>choose("f")} animClass="anim-o1"/>
          <GenderCard id="m" emoji="👨" label="Homem"      selected={sel==="m"} onClick={()=>choose("m")} animClass="anim-o2"/>
          <GenderCard id="n" emoji="✦"  label="Prefiro não informar" selected={sel==="n"} onClick={()=>choose("n")} animClass="anim-o3"/>
        </div>
      </div>
    </div>
  );
}

function ChoiceScreen({ screen, answers, onAnswer, onNext, copy }) {
  const selected = answers[screen.id];
  const hint = screen.hintKey ? copy[screen.hintKey] : screen.hint;
  return (
    <div style={{...S.screen, minHeight:"100svh", alignItems:"flex-start", paddingTop:"clamp(72px,12vw,100px)"}}>
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:560}}>
        <div className="anim-tag" style={{display:"flex",alignItems:"center",gap:12,marginBottom:SP[20],flexWrap:"wrap"}}>
          <StepCounter step={screen.step} total={TOTAL_STEPS}/>
          {screen.tag && screen.step>4 && <><span style={{width:1,height:14,background:C.border}}/><Badge>{screen.tag}</Badge></>}
          {(!screen.tag || screen.step<=4) && <><span style={{width:1,height:14,background:C.border}}/><span style={{...TYPE.monoSM,fontSize:10,color:C.textMuted}}>{hint}</span></>}
        </div>

        <div className="anim-h1" style={{marginBottom: screen.flavor?SP[8]:SP[24]}}>
          <h2 style={{...TYPE.displayMD,color:C.text}}>{screen.question}</h2>
        </div>

        {screen.flavor && (
          <p className="anim-sub" style={{...TYPE.monoSM,fontSize:11,color:C.textMuted,marginBottom:SP[20],fontStyle:"italic"}}>{screen.flavor}</p>
        )}

        <div style={{display:"flex",flexDirection:"column",gap:SP[8]}}>
          {screen.options.map((opt,i)=>(
            <OptionCard key={opt.id} opt={opt} index={i} selected={selected===opt.id} onClick={()=>onAnswer(screen.id,opt.id)}/>
          ))}
        </div>

        {selected && (
          <div className="anim-cont" style={{marginTop:SP[20]}}>
            <BtnPrimary onClick={onNext}>Continuar →</BtnPrimary>
          </div>
        )}
      </div>
    </div>
  );
}

function FormScreen({ screen, onSubmit, copy }) {
  const [nome,setNome]=useState("");
  const [whats,setWhats]=useState("");
  const [insta,setInsta]=useState("");
  const [comentario,setComentario]=useState("");
  const [loading,setLoading]=useState(false);
  const valid=nome.trim().length>0&&whats.replace(/\D/g,"").length>=8;

  function submit(){
    if(!valid||loading)return;
    onSubmit({nome,whats,insta,comentario});
  }

  return (
    <div style={{...S.screen, minHeight:"100svh"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 45% at 50% 100%,${C.deep},${C.bg} 55%)`}}/>
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:480}}>
        <div className="anim-tag" style={{marginBottom:SP[20]}}>
          <StepCounter step={screen.step} total={TOTAL_STEPS+1}/>
        </div>
        <div className="anim-h1" style={{marginBottom:SP[14]}}>
          <DisplayHeadline lines={screen.headline} accentLines={screen.accentLines} size="LG"/>
        </div>
        <p className="anim-sub" style={{...TYPE.body,color:C.textSub,marginBottom:SP[24]}}>{screen.sub}</p>
        <div className="anim-form" style={{display:"flex",flexDirection:"column",gap:SP[14],marginBottom:SP[20]}}>
          <Input label="Seu nome" value={nome} onChange={setNome} placeholder="Como prefere ser chamado(a)?" required/>
          <Input label="WhatsApp" value={whats} onChange={setWhats} placeholder="(00) 00000-0000" type="tel" required/>
          <Input label="Instagram" value={insta} onChange={setInsta} placeholder="@seuarroba"/>
          <div>
            <label style={{...TYPE.monoSM,fontSize:10,color:C.textMuted,letterSpacing:"1.5px",textTransform:"uppercase",display:"block",marginBottom:6}}>
              Algo que queira nos contar? <span style={{fontStyle:"italic"}}>opcional</span>
            </label>
            <textarea
              value={comentario}
              onChange={e=>setComentario(e.target.value.slice(0,280))}
              placeholder="Histórico, lesões, restrições, dúvidas..."
              rows={3}
              style={{
                width:"100%",display:"block",
                background:C.bg,
                border:`1px solid ${C.border}`,
                borderRadius:BR.lg,
                padding:"12px 16px",
                ...TYPE.body,fontSize:14,
                color:C.text,outline:"none",
                resize:"none",
                fontFamily:"'Inter',sans-serif",
              }}
            />
          </div>
        </div>
        <div className="anim-cta" style={{display:"flex",flexDirection:"column",gap:SP[12]}}>
          <BtnPrimary onClick={submit} disabled={!valid||loading} fullWidth>
            {loading
              ? <span style={{display:"flex",alignItems:"center",gap:8}}><span style={{animation:"pulse 0.9s infinite"}}>●</span> Enviando...</span>
              : "Quero fazer parte do GL Team →"
            }
          </BtnPrimary>
          <p style={{...TYPE.monoSM,fontSize:10,color:C.textMuted,textAlign:"center",letterSpacing:"0.5px"}}>Sem spam. Dados usados apenas para contato.</p>
        </div>
      </div>
    </div>
  );
}

function CommentBox() {
  const [text,setText]=useState("");
  const [sent,setSent]=useState(false);
  const [focused,setFocused]=useState(false);
  const max=280;
  function send(){if(!text.trim()||sent)return;console.log("Comentário:",text);setSent(true);}
  if(sent) return (
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:BR.lg,padding:"14px 18px",display:"flex",alignItems:"center",gap:10}}>
      <span style={{color:C.red,fontSize:15}}>✓</span>
      <span style={{...TYPE.caption,color:C.textSub}}>Comentário enviado. Obrigado!</span>
    </div>
  );
  return (
    <div>
      <textarea value={text} onChange={e=>setText(e.target.value.slice(0,max))}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        placeholder="Tem algo que queira nos contar antes do contato? Fique à vontade..."
        rows={3}
        style={{
          width:"100%",display:"block",background:C.bg,
          border:`1px solid ${focused?C.red:C.border}`,
          borderRadius:BR.lg, padding:"14px 14px",
          ...TYPE.body, fontSize:"clamp(13px,3vw,14px)",
          color:C.text, outline:"none", resize:"none",
          transition:"border-color 0.18s,box-shadow 0.18s",
          boxShadow:focused?`0 0 0 3px rgba(225,10,31,0.08)`:"none",
          fontFamily:"'Inter',sans-serif", marginBottom:8,
        }}
      />
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{...TYPE.monoSM,fontSize:10,color:C.textMuted}}>{text.length}/{max}</span>
        <button onClick={send} disabled={!text.trim()} style={{
          ...TYPE.monoSM, fontSize:10,
          background:"transparent",
          border:`1px solid ${text.trim()?C.red:C.border}`,
          color:text.trim()?C.red:C.textMuted,
          borderRadius:BR.full, padding:"7px 14px",
          cursor:text.trim()?"pointer":"not-allowed",
          transition:"all 0.18s", letterSpacing:"1px", textTransform:"uppercase",
        }}>Enviar →</button>
      </div>
    </div>
  );
}

function ConfirmScreen({ copy }) {
  return (
    <div style={{...S.screen,minHeight:"100svh",textAlign:"center"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 50% at 50% 50%,rgba(225,10,31,0.06),${C.bg} 65%)`}}/>
      <div style={{position:"relative",zIndex:1,maxWidth:460,width:"100%"}}>
        <div className="anim-conf" style={{width:64,height:64,borderRadius:"50%",border:`1px solid ${C.red}`,background:"rgba(225,10,31,0.08)",display:"flex",alignItems:"center",justifyContent:"center",margin:`0 auto ${SP[24]}px`,fontSize:24}}>✓</div>
        <div className="anim-h1" style={{marginBottom:SP[14]}}>
          <h2 style={{...TYPE.displayLG,color:C.text}}>RECEBIDO.<br/><span style={{color:C.red}}>OBRIGADO.</span></h2>
        </div>
        <p className="anim-sub" style={{...TYPE.body,color:C.textSub,marginBottom:SP[32]}}>{copy.confirm_sub}</p>

        <div className="anim-form" style={{display:"flex",justifyContent:"center",gap:SP[32],padding:`${SP[20]}px ${SP[24]}px`,background:C.surface,borderRadius:BR.xl,border:`1px solid ${C.border}`,marginBottom:SP[24]}}>
          {[{val:"24h",label:"Resposta em"},{val:"100%",label:"Individual"},{val:"GL",label:"Direto com o"}].map(m=>(
            <div key={m.label} style={{textAlign:"center"}}>
              <div style={{...TYPE.monoSM,fontSize:18,color:C.text,marginBottom:3}}>{m.val}</div>
              <div style={{...TYPE.monoSM,fontSize:10,color:C.textMuted,letterSpacing:"1px"}}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* comentário */}
        <div className="anim-form" style={{textAlign:"left",marginBottom:SP[24]}}>
          <label style={{...TYPE.monoSM,fontSize:10,color:C.textMuted,letterSpacing:"1.5px",textTransform:"uppercase",display:"block",marginBottom:8}}>
            Quer adicionar algo? <span style={{fontStyle:"italic"}}>opcional</span>
          </label>
          <CommentBox/>
        </div>

        <a href="https://instagram.com/gabriellincoln01" target="_blank" rel="noreferrer"
          style={{...TYPE.caption,color:C.textMuted,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8,transition:"color 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.color=C.text}
          onMouseLeave={e=>e.currentTarget.style.color=C.textMuted}
        >Me acompanhe no @gabriellincoln01 →</a>

        {/* logo */}
        <div style={{marginTop:SP[32],display:"flex",justifyContent:"center",opacity:0.9}}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDgAAAQ4CAYAAADsEGyPAAAACXBIWXMAAAsTAAALEwEAmpwYAABc/0lEQVR4nO3dB5jdVZkG8HfSQ0gIoXdEpQliBUHpRexS7R27iIq9d1HBXtYCVhRRFAVXQASRjriKqKAoivTeE0gmmX3+elxdpaTMzLnn3t/veeYhibu5L2Qyc+97z/m+oZGRkQAAAAC0bELtAAAAAADLSsEBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAA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AAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAACQ1v0vXuFCVEoUuI8AAAAASUVORK5CYII=" alt="GL Consultoria" style={{height:40,width:"auto"}}/>
        </div>
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
    minHeight:"100svh", width:"100%",
    display:"flex", alignItems:"center", justifyContent:"center",
    padding:"clamp(64px,12vw,96px) clamp(20px,5vw,64px) clamp(32px,6vw,48px)",
    paddingLeft:"clamp(32px,6vw,80px)",
    overflow:"hidden",
  },
};

/* ─────────────────────────────────────────
   APP PRINCIPAL
───────────────────────────────────────── */
export default function GLQualificacao() {
  const [screenIdx,setScreenIdx]=useState(0);
  const [answers,setAnswers]=useState({});
  const [animKey,setAnimKey]=useState(0);

  const screen=SCREENS[screenIdx];
  const genero=answers.genero||"n";
  const copy=COPY[genero];

  const progressScreens=SCREENS.filter(s=>s.type==="choice"||s.type==="form");
  const progressIdx=progressScreens.findIndex(s=>s.id===screen?.id);
  const showProgress=progressIdx>=0;
  const showTicker=screen.type==="intro";

  function goNext(){ setAnimKey(k=>k+1); setScreenIdx(i=>Math.min(i+1,SCREENS.length-1)); window.scrollTo(0,0); }
  function goBack(){ setAnimKey(k=>k+1); setScreenIdx(i=>Math.max(i-1,0)); window.scrollTo(0,0); }

  function handleAnswer(id,val){
    setAnswers(prev=>({...prev,[id]:val}));
    if(id==="genero") goNext();
  }

  function handleSubmit(data) {
    const params = new URLSearchParams({
      nome:                data.nome               || "",
      whatsapp:            data.whats              || "",
      instagram:           data.insta              || "",
      comentario:          data.comentario         || "",
      genero:              answers.genero          || "",
      objetivo:            answers.objetivo         || "",
      historico:           answers.historico        || "",
      rotina:              answers.rotina           || "",
      comprometimento:     answers.comprometimento  || "",
      perfil_suporte:      answers.perfil_suporte   || "",
      perfil_investimento: answers.perfil_investimento || "",
      perfil_momento:      answers.perfil_momento   || "",
    });
    // JSONP — ignora CORS completamente
    const script = document.createElement("script");
    script.src = `${WEBHOOK_URL}?${params.toString()}&callback=glLeadSent`;
    window.glLeadSent = () => { document.body.removeChild(script); };
    document.body.appendChild(script);
    goNext();
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {showProgress && <ProgressBar current={progressIdx+1} total={progressScreens.length}/>}

      {/* Logo header */}
      {screen.type!=="confirm" && (
        <div style={{position:"fixed",top: showTicker ? 46 : 10,right:16,zIndex:50,transition:"top 0.3s"}}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDgAAAQ4CAYAAADsEGyPAAAACXBIWXMAAAsTAAALEwEAmpwYAABc/0lEQVR4nO3dB5jdVZkG8HfSQ0gIoXdEpQliBUHpRexS7R27iIq9d1HBXtYCVhRRFAVXQASRjriKqKAoivTeE0gmmX3+elxdpaTMzLnn3t/veeYhibu5L2Qyc+97z/m+oZGRkQAAAAC0bELtAAAAAADLSsEBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRPwQEAAAA0T8EBAAAANE/BAQAAADRvUu0AUNMJa21SOwL0mvsleVuSC5J8OMnC2oEYW0MTJuSqy36Xp998SybOmlk7DvzD5CTLJZmeZEqS5ZPMSbJqklXKP2eWX+8+ZpV/ziz/vzO6T+/yZt608s/ueW/3jf/62v9yAIwNBQcAnRWSPCPJu5OslGRBkp8mOat2MMbW8Lx5ue/Wu2VocveaEMbV0L8UFiuWH6+XZN0kayVZu/xz5VJ0jAaf6AB9TMEBMNi6d0YfneQtSbYsLzj+8SLgW0nu270GrpyRMXTnTTdl80PekwnTuze5YUy/1mxYTol1xcX6STYoP+9+PF7HhxaN0+MAUIGCA2BwPbCc2Ng9ydS7+N+7d1G/mWSfCtmAtnXlxRZJNivXQu5Tfq07pQEAY0LBATCY11Fen+TF5TrKPdk7ycuSfGacsgHt6QrSNZNsXT6602DrlK8v3ckNABgXCg6AwXoRslcZIrrRv1xHuTfvTPLz8gHQPX9cPcmmSXZKslu5ftLNybChD4BqFBwAg+FRZc5Gdx1lSXUDAD+S5Mm2D/SXoaGhzF14U4bn3VE7Cm0UpF2hsU2S7ZPsWIZ/AkDPUHAA9LdueN8rkhw4CgVJd63lrWXDCn1g4Z3zs9ETn5rlH2BlNndru/LxyHJaw5UTAHqWggOgPy2X5KVJXlU2FoyGruA4Jcl/j9LvR2XD8+dntV12yOTVukM68H+6K2z7lqsnW4zjhhMAWCYKDoD+070oeX+Sh47B7314Wevoqgr0l24g6J5la9LDksxegjk9ANATFBwA/eP+Sd6Y5Nlj+PV9dlkd25UoQNumlHXR3bakZ5VNKADQLAUHQH+sfX1lmbWx6jg83s5lYOn7xuGxgNG3YpLHJ3la+ftsrgYAfUHBAdC2pyd5bZIHj+NjdmsgX53k7CQnjuPjMsoW3nFHFt5ya+0YjJ9uteszy3yNh9cOAwCjTcEB0Kbujvzbkzw2ycRK9/U/kOT3SS6t8Pgsq5GRrLnz9ll7/xfVTsLY6wYNv6bM1xitocMA0HMUHABtWSvJ65Lsl2RGD5QsbymbWu6onIWlMG3llTJxlgUZfWy9sk3p+UmsygGg7yk4ANpZ+7pHkoN67B3YFyc5Ocm3agcB/s/6SZ5X5vLMqR0GAMaLggOg979Ob1dOSmxf6TrKvem2qpya5IraQWDArVS2KB1QTm8AwEBRcAD0rvsmeVc5udGd4OhVQ0l+OM6DTllGI93HooW1YzA6ppZVrwf6ewjAIOsm4QPQW7oy441JTknyjB4vN/5h8yQfqR2CJWulJkzpXhfTuC2THJvkS8oNAAadggOgt07VPSnJ6UneXwaKtmJiGWT4hNpBWDxTVpydzQ77VO0YLL0VyteJnybZJcnk2oEAoDYFB0BveFCSbyQ5uvy4e4O9xRdc3RDU+9QOwr0bmuApQKO6IuMxSU4rJ72m1w4EAL3CsxuAulZP8o4kZybZJ+3bNMkHugMCtYNAH+o2ovxXku8n2azRIhQAxoyCA6COKWXFavcu7DuTTEv/eEqSF9YOAX3m8WVbUXcVzHUUALgLCg6A8bd1khPLO7HdppR+1A132KJ2COgDyyf5YJKjygkpAOBuKDgAxs+6ST6R5MdJtk3/+0YjG2AGcv7GrZdcWjsG9667hnJMkte79gUA907BATD2uhf5r0pyRpL9k8zIYNgkyUdrh+A/Lbzjzmz88v1qx+Ce7V02pOxQOwgAtELBATD29+aPLy/0W1r7Ohq6AYjPS/L02kH4/+bfelvu94Futi09+tzsrUm+nWSl2mEAoCUKDoCxO71wRJLvJnlUBlc3DPGQJPerHQQasEaSI8vgYQBgCSk4AEZ/jeMHytrXbpuIbQd/X4X7Od9z4B51A0R/mGSvJBNrhwGAFnmyCTA6pibZsxQbb0yyQu1APWanJG+rHQJ61JZls9KDawcBgJYpOACWTfdO6zZJvpPkW0k2rB2oh3XH7nesHWLQTZg8OTfdeXXtGPzTY5KcUq6nAADLQMEBsPS6oaGfTHJcGSY6qXagBnw5yWq1Qwyyeddelx0O7j5t6QH7Jvlmkmm1gwBAP1BwACy5KWXda/eu60uTzKwdqCHrJvlU+W9IBQvm3Z41ntWNh6Hyya9nJ/mS62wAMHoUHABL9qJktyQ/TfKxJPetHahReyd5flkjC4PoqeU003K1gwBAP1FwACye+yf5fJLjk2zt6+cyOzjJRrVDQKVrKV9X8AHA6PMEHeCerZzkwCTnllMHjI4ZSY6sHQLG2ZOSfKV2CADoVwoOgLu/jvLMch2lO20wq3agPrR5ks/WDgHjZPsknzNQFADGjoID4D9tkeTYckf+AbXD9Ln9kjytdggYYxsnOcwGIQAYWwoOgH9aI8kHyqmN3cspDsbWpPLffJPaQWCMdINED0+yQe0gANDvFBwAf3+R3Z0kOC3JG5PMrh1owKyX5IOuAdGnupMbD6kdAgAGgYIDGHTdvfhjknzBO6xVPSHJi5yaoc+8IclTaocAgEGh4AAG1bpJDk3yo3Idhfo+nOShtUPAKNkhyZtrhwCAQaLgAAbN9PKi4xdl7Wv3c3rHd5JMrR2iny23yqo563H71o4xCF7h2hUAjC8FBzBIczZ2K3M23pdk5dqBuEvrJPlS7RD9bOKUKbny3NNrxwAAGHUKDmAQvs49KMlXy6wNw/56315JXlI7RL8aWbQoy81cPbf87MzaUQAARpWCA+hnc8ppjZ8keVqSKbUDsVi6P6e3JNmydpB+NXWFmTnlMV2PBADQPxQcQD/qNnE8J8nJZe1rV3TQlrWTfCDJKrWD9OspjlkbrF87BgDAqFJwAP1kKMk2SY4vG1IeWDsQy2SnJK8u81MYZfNvvCl/fPO7a8cAABg1Cg6gX6yV5JAkpybZuZzioH1vKus2GWWLFi7MrRf+oXYMAIBRo+AAWtetYXxRknPLu/2+rvWfo5IsXztEvxkaGsr8G27K/Esvrx0FAGBUeCEAtOxJSU5I8rkkq9cOw5iWWEfXDtF3hoZy5Wln5rLDvlY7CQDAqFBwAC26f5JvJTkyyVa1wzAuti0DYxlFk2bMyJQ5ZvACAP1BwQG0ZKWyPvRnSfa19nWgdH/WrylFB6Nk8ozlcv67Dsptv/x17SgAAMtMwQG0Yp8kpyR5r+soA6tbGfuhJKvWDtIvhiYM5Y6bbsxNp52VLFxYOw4AwDJRcAC97qH/ch3lAbXDUN0jkry9doi+MZIsv8aa+ekrX5yFt8+tnQYAYJkoOIBefrf+Y0lOLtdR4B9eXk70MApGFi3KchNm/W2rCgBAyxQcQC9+Xdo/yS+SHJBkZu1A9KTDk6xfO0S/WG7OKjnnyU+vHQMAYJkoOIBe+nr0qCQnJflEknVqB6KnTU7y1SQTawfpBxOnTc3lJ51YOwYAwDJRcAC1defiN0ry2SQnJNm+diCa8cgk76gdom+uqcxZLXPP+03tKAAAS03BAdQ0I8kbypyNFyWZXjsQzX0POzDJLrWD9INJ06fntMcZbQIAtEvBAdQ6tbFHkp8k+UCSNWoHolnLldM/Vscuo5GRkSy/ztq1YwAALDUFBzDeHpTk6LL6davaYegL90vy6doh+sHtl12Rv364G4EDANAeBQcwXlZO8s4kZyR5YhkSCaNl7yQvqR2idQvnz8+1p57+t5kcAACtUXAA43GFoNs/eVYZCGnOBmPlY+WEEEtpwqRJuey4k3LlF7oFNQAAbVFwAGOpG/54TJLDk9y3dhj63tQkX04yq3aQlk2YMjkTpnX/KQEA2qLgAMbCOkk+l+QHSXaqHYaBskWSg5JMrB2kVZNnzMhFH/9s5l96We0oAABLRMEBjKbunfMDkpya5IWuo1BJN4vjyWVbD0to4pTJueyXp2XBtdfXjgIAsEQUHMBo2T3JiWUOwnpeXFJR97n3Gatjl87IopEsN2XlzL3wom53bO04AACLTcEBLKtNknwxyY+SPLx2GCi6cuObtUO0arlVV8mPn7FvYpsKANAQBQewtFZI8t4kpyV5Qe0wcBd2LKuJWULdmtjpE7q/4gAA7VBwAEvjOUnOSfKWJHNqh4F78Noku9UO0aLpc1bKr/Z9Xu0YAACLTcEBLImHJPlhksOSbFg7DCyGGUkOSbJu7SCtmThtai4++vvJwoW1owAALBYFB7A4uqGhByc5Jcljfe2gMZsleYetPkt+TWX51dfMObvtUTsKAMBi8SIFuCdTysrNk5McmGT52oFgKT0/yV62+yyFIf/JAIA2KDiAu7NLkuPKus371A4Do+CrSdavHaI1t192eW449oTaMQAA7pWCA/h39y/rNY8pWyi8fUu/6D6Xv187RGtuv+KaXHl09+UAAKC3KTiAf5hZrqGcneSpSabVDgRjYPMkH6sdoiWTpk/NhEmTkpGR2lEAAO6RggOYmuRJSU5L8uEkK9YOBGPsBUn2rh2iFV258fsvfiXXHuXwCwDQ2xQcMNgekeRbSb6X5IGuozAgumG5702yce0grZgwaXKGulMcAAA9TMEBg2mVclrjuHJ6Q7HBoNkoyfuSzKodpAVTZs7MHw7+ZIavu752FACAu6XggMEyPckLk5xe5m2sUDsQVLRnkmfUDtGCidOm5uLTT8jwjTfVjgIAcLecN4XB8agk70myQ+0g0AOGk5yb5MLaQVrRjRg1ZhQA6GUKDuh/6yV5VfkAkvPKJpVuHfKdtcO0YOG8edlwh8dl0hwziAGA3qXggP61XJL9kxyQZI3aYaAHXJvkU0k+k+S62mGaMTSU26+/Kg9+wUGZvNKc2mkAAO6WggP60x5J3p7kQbWDQA+Yl+RrST6e5AI3LZbMojvm57577Z2V93hc7SgAAPdIwQH9ZdMk70jy5G7xQe0w0ANOLGXf2d1r9dphWjRhyqSsuOVDM3HGjNpRAADukYID+sPqSV6S5JVJXJKH5C9JDkryudpBWjdpxoys9/ruphsAQG9TcED7q56fkuQtSR5QOwz0gFuSfDbJweZsjIKRkWyi3AAAGqHggHY9ohQbj0kysXYY6AFfT/LhJL+uHaQfDE2YkNuuuDxrvPDZtaMAACwWBQe0p9uI8p5ycmP52mGgB/wyybuTHF07SL8YGhrKLZf9OY8+62e1owAALDYFB7RjepJnl4GJa9YOAz3g8rIZ5XPlagqjZNHwcFZY936Z8fCH1I4CALDYFBzQ+yYn2aFsR9m6zN2AQXZHkm+Xsq8bJsooX025+ooLs8fP/+dvPwYAaIWCA3rb5klel+Tp5mzA35yW5P1JflQ7SL8anjcvmz5+30xbb53aUQAAloiCA3rT7CSvSLJ/klVrh4EecGmStyX5bpJba4fpZ3fefHPWePxjMmmVlWtHAQBYIgoO6L3rKHsleXNZ++p8OINufpmz8dEkV9YOMwizN9Z59C5Z8wXPqh0FAGCJKTigdzyobEd5fO0g0AOGk5xY5mycm2SkdqBBMHHKlKy87TbJJDfiAID2KDigvtWTvDTJW8zZgP9b+/rhJN+sHWTQVsMumD8v673hgNpRAACWioID6pmSZL8yRHT92mGgB1yT5L+SHGLt6/hbeOf8PPxTB9eOAQCw1BQcUMcuZe3ro2oHgR5wZzmt0b26/p3rKBUMDeXOm27MKk/Zs3YSAIClpuCA8bVBGSD6tCTL1Q4DPeCs8nfilG7GZe0wg2howoRcf9nv8/j/+UXtKAAAy0TBAeNjTpLnJXm9ta/wN1cl+UjZkNJtSqGShfPnZ/VNH5blNtqwdhQAgGWi4ICx99hyHWXL2kGgB8xL8qUk709yee0wg64bLHrDNX/KY755aCYsN712HACAZaLggLGzWZK3JtmjDBSFQXdMkg8mOb12EP5u+I47sslez8zMBz6gdhQAgGWm4IDRt1aSNyZ5RpIVa4eBHnBRkvckOdycjd6ycP6CrLLdIzNp5ZVqRwEAWGYKDhg9XZnxyiQvSbJ67TDQA65L8pkknyw/poeMLFyUVR66RdZ+5YtrRwEAGBUKDlh2k8s1lHcn2ah2GOgBw0l+VE4ydWtf6UETpk7JGo97dO0YAACjRsEBy2btJAeV6yhA8sskH0jy3e4GRO0w3P1q2HlXX5N1X7t/7SgAAKNGwQHLth2lW3Pp1Ab8/QrKu8qcjRtrh+Ge3XnTzXnUUV+rHQMAYFQpOGDprqS8vAxNXL52GKisGxr6+SQfSvLn2mFYPCMjyZzH7VY7BgDAqFJwwJKZWq6kvKp2EKisu35yWpJ3JvmZ7SjtXE259rIL8qTzfl07CgDAqFNwwJL5dJIX1A4BlV2Y5GNJvmjORlsW3nFn1nv4Dpm27rq1owAAjDoFByy+ryZ5Vu0QUNFN5e/Be5NcWzsMS2hoKDdf95c87Asfy8TZs2qnAQAYdQoOuHdDST6Z5Om1g0AlC5L8oGxH6bakuI7SoIV33JGN93lmVtxh29pRAADGhIID7tmEJG9M8rJSdMCg+V2SNyQ5vhQdNGpoaEJW3PJhmTh7hdpRAADGhIID7l5XaDw+ybuVGwygG5J8IsnHy9UUWjYykhnrrpV1X/uK2kkAAMaMggPu3kpJvpFkYu0gMI7mJzmiFHt/qh2G0TE0cWLu81y37ACA/qbggLt3dJIZtUPAOPppkg8mOa52EEbP0KQJue2yK7L2/i+uHQUAYEwpOOCudTMHHlk7BIyTv5Zi49Akd9YOwygaGsrtl1+ZnU76Ye0kAABjTsEB/+n+SV5dOwSMg9uSfD7JIUmuqB2G0TeycGGmrbRSVth+m9pRAADGnIID/tNbkqxWOwSMoW7N6yllQ9A5tcMwNoYmTMjVV1yYPc87v3YUAIBxoeCA/2/nJE+uHQLG0IVJPpTk8DJQlD41PG9eNtrpCZmy1pq1owAAjIsJ4/Mw0ITpSZ6aZIXaQWAMzE3ypiQ7JPmScqPPDSVzb7g66z3n6Zm80pzaaQAAxoUTHPBP6yfZr3YIGAOHlyGi7ioMiEV3LsgGe+yVlfd6Yu0oAADjRsEB//Tc2gFglOdsnJvkXUlO6G4s1A7E+JkwZXLmbPnQTJyxXO0oAADjRsEB/3Rg7QAwSi5N8okkn7T2dQANDWXitClZ7w0H1E4CADCuFBzwd49PMrF2CBiFta/fLqc2LqkdhjpGFi7Kpm/S1wIAg0fBAX/XrcuEVi1McmKS9yU503WUwV4Ne9tVl2WNFzyrdhQAgHGn4IC//z14RO0QsJT+UrajHJ3kjtphqGdoaCg3XXZxdj/7tNpRAACqUHBAsvvflypCU25N8vkkH05yde0w1LdoeDhz1t8wMx/6oNpRAACqUHBA8gQFB41dR/l+kncnOa92GHrnaso1V1yYJ519bjLROCEAYDApOCB5mIKDRnRrXz9UBonC/xmeNy+bPOEpmXaf9WpHAQCoRsHBoJuTZFbtEHAvrkrysSSfLptS4P+Zf8utWeMxu2XyKivXjgIAUI2Cg0G3cZKZtUPA3Zif5MtJDkry59ph6N3ZG2vttmPWePFza0cBAKhKwcGgWyPJ9Noh4C6cU9YXn1w7CL1t4pQpWWXbR/5tDgcAwCBTcDDoVksyrXYI+BeXJPlIki8kmVc7DL2tKzXmz5ub9d5wQO0oAADVKTgYdF3BMaV2COhuGpQBop9JcmntMLRh4bw7s+Vnuz4MAAAFB4PO9RR6wTFJ3p/krNpBaMjQUO645easss8etZMAAPQEBQeDbmrtAAyskSS/S/KuJN8vA0Vhsa+mXH/ZhXnCL39ZOwoAQM9QcACMv2uTfDbJwUlurR2G9gzPnZsNdntypm+0Ye0oAAA9Q8EBMH7uSHJskrcnuaB2GNo1PO+OrPHonZIpk2tHAQDoGXbKAYzPANFTkzw5ydOVGyyraausnNMPfGX+9PquKwMAoKPgABhbVyd5cZLHJjk+yYLagWjfyPBwVl5v05z9kW42LQAAHQUHwNiYV+ZsbJXki0luqx2I/rJowXBWWWOj/M+ez6odBQCgJyg4AEZfd1Jj5yQvS3JJ7TD09zaVG887P8M33Fg7CgBAdQoOgNHz2yT7Jdk9yZm1wzAARkay4Lbbc8aOT8j8Sy+vnQYAoCoFB8CyuyHJe5Jsn+TQ2mEYLBMmTcp15/8qV3/n6NpRAACqUnAALJvDkzyyrH69vnYYBtOMVdfMRf91WOZd+IfaUQAAqlFwACydXyd5YpJuwuOFtcMw2LpTHLddekV+suUuGRleWDsOAEAVCg6AJXNlkjcneVSSY7opCLUDwcjISKbNWTHzb78lN538s9pxAACqUHAALL5PJdkuyQeS3Fo7DPw/IyOZufY6+fFuj62dBACgCgUHwL07OcmuSfZP8sfaYeDujAwPZ4U11sulB3ddHADAYFFwANy1kVJmPDdJ95b4ibUDweIYGhrKuW94ay7/ry/VjgIAMK4UHAD/6eYkH03yiCRfSXJH7UCwJKbNXjHXnfyzjCxaVDsKAMC4UXAA/NP8JP+dZJckB1r7SqsmTpuWi486Otce+b3aUQAAxo2CA+DvfpHkaUn2THJu7TCwrKbNmp0rjvpBFt50S+0oAADjYtL4PAxAz7opyXuTdAMLbqgdBkbLpBnL5aLvfCt3Xn99tjrp2NpxAADGnBMcwCBfR/lqkm2SHKLcoN908zdmr3v//OnkH2b4Zqc4AID+p+AABtFpSR6f5DlJLqgdBsZybezKa26cnz1sxwxfZ6QMANDfFBzAIPlzktcm2TbJj2uHgfEy/5Zbcu5ez6odAwBgTCk4gEHQnc//WJJHlesoMFAmTJqUO2+4KbecelbtKAAAY0bBAfS7HyTZMcmrk1xROwzUcvOfLs6V3/l+7RgAAGNGwQH0q0uSPCPJ3kn+p3YYqG3a7Nn5y7eOynXfOyYZGakdBwBg1Ck4gH5zc5JPlDkb30iyoHYg6AlDQ1k0vCgn77lvFlx7Xe00AACjTsEB9JPvJtkjyQFJLq0dBnrNxKmTM3XqCrnyq0fUjgIAMOomjf5vCVBlO8rbkhyV5I7aYaCXLbf6qjn9dQdk0fw7s/6bu6VCAAD9wQkOoGU3JXlTkq3LdRTlBtyLRQsWZOW1N8n57/1I7SgAAKNKwQG06tdJtk9yUJKrk5iaCItpZNGiTF1xhVy4/+trRwEAGDUKDqBFP0myXSk5gKUwMjKSm8//bYZv7A5CAQC0T8EBtOY7SfYq21KApTQ0NJRrfv7LnPvkp9uqAgD0BQUH0IqFSb6e5PnKDRgd01acnYt/dlxuO/93taMAACwzBQfQih8meU6SW2sHgX66pjJn1fvmly9+VRbNnVs7DgDAMlFwAC34VZJ9ugUQtYNAv5k4ZUqu/eP5uf03F9SOAgCwTBQcQK+7IckTk8yvHQT6daPKnLU3zE+22TW3nH1u7TgAAEtNwQH0umcmubR2COj3kmPG6qvnzCc/o3YUAIClpuAAetlHkhxfOwQMyjyOidOn5arDulm+AADtUXAAveo3SQ42dwPGz/Dtc3PWiw7I9cfqFQGA9ig4gF50Z5IPJrmydhAYJBMmTcqEKZNzw2lnZGTBcO04AABLRMEB9KLfJnFOHiqYPmdOfvHB9+b23/yudhQAgCWi4AB6dbAoUGkWx6xZa+fij34mI4tGascBAFhsCg6g15yU5ILaIWCQTZ49Kxd87dCct8+za0cBAFhsCg6g17y5dgAYdCPDw5mz9oa5+OgfJAsX1o4DALBYFBxALzk/ye9rhwCSkUWLsvzqa+b0bXbN8A031Y4DAHCvFBxAL/lCkptrhwD+6cYL/piL3vyu2jEAAO6VggPoFbclObd747h2EOCfJs+YnuvP/WXmnt8tNwIA6F0KDqBXnJHkwtohgP9vaOLEXPmLs3Pz2b+oHQUA4B4pOIBe0b09fGPtEMC/6dbGrrFe/uf1b88tp5xeOw0AwN1ScAC9YF6S82qHAO7a0IQJmThxco7fYZfaUQAA7paCA+gF1yf5Ve0QwN0YGcmEKZMyY9aqueJzX66dBgDgLik4gF7QbU65oHYI4J5Nnj0rZ770FbVjAADcJQUH0AtuSTK/dgjgno0MD2fmmuvm9695c+0oAAD/QcEB1Nathb2kdghgMS0ayQWf+kIu+9hnaycBAPh/FBxALxQcl9UOASymoWTqrJm54axzsvCmm2qnAQD4PwoOoBdcVTsAsPgmTpuWPx75nfzq2S/Nwtvn1o4DAPA3Cg6gF05w3Fo7BLAERkYyc53185tjjsjCW/31BQB6g4ID6AULagcAlnzg6Oqr3T9n7Pzk2lEAAP5GwQH0AmfcoUETJk3KDRf+LvP+eHHtKAAACg4AYOmMdFdV1lgrP3nIDrn917+pHQcAGHAKDgBgmUqOSdOn5reveXPtKADAgFNwAADLfFXl1j//Ndcfe3ztKADAAFNwANDLptUOwOK5/bIrc8OpZ9SOAQAMMAUHAL1q5yTHJtmjdhDu3bSV5+SCj302l3/q88nCRbXjAAADSMEBQC9aKckbSsnx3SSHJtmwdiju2bRVV8lJ+784i+ZZjAQAjD8FBwC9ZmKS5yfZ9V9+rfv56Ulen2RGxWzck0WLstLs9fL7176tdhIAYAApOADoNRsn+dBd/PrKST6Y5KdJtq+Qi8UwedbMnP+5z+Z3LzuwdhQAYMAoOADoNV+9l//9YUmOS/KRJKuMUyYW08jwcGavtUGu+NGJGVlkFgcAMH4UHAD0krcnechibld5dZJzkjwryZRxyMbiGhnJ8G1zc8FLuj8iAIDxoeAAoFdslWRJ7zWsX058HFVOdtAjhiZNzC2/vyh3XPSn2lEAgAGh4ACgF8xK8onyz6Xx+CQnJHlnkhVGORtLYWjCUK4+69yc8dh9Mv+Kq2rHAQAGgIIDgNqGynWTLZfx91mxXHE5JckTyjYWKlpu1VVy1R9/lXkXXVw7CgAwABQcANT2wLL+dbTKki2S/CDJF8oVFirphoyuvMaGOf2JT8vc839XOw4A0OcUHADUNDnJ57s3+8fg935eGUK6X5Llx+D3Z3FMGMrE6dPy44ftWDsJANDnFBwA1PSGUbiack9WKQXKD5NsX054MJ5GkqGJEzJ9pRVzzbe6WbAAAGNDwQFALQ9O8p5xeJyu1NguybFJPm0IaSVDQ/ntuw6qnQIA6GMKDgBq6AaAfnmcH7O7pvLSJGcn2TfJpHF+/IG34Jbbc8kHPlo7BgDQpxQcANTwtiSbVnrsjZJ8s3x0A0kZJyPDw/mft7w9Nxx7fO0oAEAfUnAAMN66WRj7Vz5B0X3/2zvJz8oGl5kVswyMoYkTM3nG7Fz9oxOzaO7c2nEAgD6j4ABgPK1c5m7MSW+YleSDSY5L8ujaYQbB1Nmz8vPPHJwFV11TOwoA0GcUHACMp24GxrbpPdskOTrJV5OsUztMPxtZtCirrHTf/PK53acCAMDoUXAAMF42T/Lu9K5pSZ6V5Jwkz08ypXagfjVp+tRcdcZZOWv7x9WOAgD0EQUHAOPliLRh9SRfSPL9JA/1vXJsTnEst/oaufn3f8yCy66oHQcA6BOetAEwHg5Oskna+v64e5ITy4yOFWoH6jsjI8mEoZzyqEdn3h8uqp0GAOgDCg4AxtouSZ7bLdFIe2YneW2S05I8pXaYfjM0NJTbr7w6lx32tdpRAIA+oOAAYCytluTtSVZK2zZL8vUk30qyUe0w/WTanBVzyRFH57Zfnlc7CgDQOAUHAGNlUg9vTVnaf599k5ye5MCyYpZlNDRxYm7+68W59dxf/W02BwDA0lJwADBWNk3yjvSflcpMkR/2UXlTz8hIZq65bs588ctz7ZHfq50GAGiYggOAsXJU+tujkhyf5ONJ1qodpvmSY5375MSn7VM7CQDQMAUHAGPhkCT3S/+bnuSVSc4o13FYSiPDw5mz6n3zxze9s3YUAKBRCg4ARtuOSV6WwbJuks+UEx2b1w7TqolTpuT8D300f3lf14/BmPDcF6CPdQPTAGC0rFBOb0zLYNotyalJPlKurtxcO1BLuiGjy62yWq4+5bSs9/oDMjS56acp88vHwtpB+D/dJ5Q/D4A+1vQzB6BvTK4dgFHzuiQPzmDrSp53JdkzyXsGYBbJqG9VueaMs/Pr574km/3XRzNx5sw06kNJvtr1NrWD8H+GlI4A/U3BwaC7JckNSe6sHWSALSx/DrRvm1Jw8HdbJPlOki8lOSjJH2oHasW0FVfMH75xeEYWDGeLb3wxQ5OafLryq9oBAGDQDI2MeGOBwXXCWpuskmS2d9iquyrJbbVDsExmJDm9vKjnP11ZVst+LsnttcO0oCs1bvjrBdlwz6flwUd9rXYcAKABCg4G2glrbVI7AvSLDyZ5fe0QDTiznHLpyiDuxdCkCbnt0suywb57Z4sjDq0dBwDocSZJA7CstlJuLLatyxDS9ydZrXaYXjcyvCgz1lgzfz3mR/n1M1+YRfPm1Y4EAPQwBQcAy/p95Ou1QzQ46PBNSc5K8vQB3jiz2KbOXiF/PvK7+c0LXpGFt7rNBgDcNQUHAMviE0k2qB2iUesnObxsWXlQ7TC9brnVVs+F3/xazn/+y2pHAQB6lIIDgKW1e5Jn+F6yzB7bjQRK8o7udXztML1qZNGirLjuRvnDd47Ir/Z+du04AEAP8qQUgKWxepK3ly1ELLtVSsFxaimOmtyLOtZGhoez4tr3z1+OPjbnPWO/2nEAgB6j4ABgab53vLQMzGR0Z3M8JMmPknwmyX1rB+rVkxzLrbZa/nr0f/998Ohttu4CAH+n4ABgST2knN5g7Lwwyc+SdMcUptcO04umrrhC/vTNb+c3+70yC2+fWzsOANADFBwALKljawcYEGsm+WySH5bTMt0JD/5hJFl+7XVywbe+kvOf85LaaQCAHqDgAGBJdC+4V6sdYoB0szh2TPLjJB9PskLtQL02k2POupvkoqOOzK/2eW7tOABAZQoOABbX45M8rXaIATUjyf5Jzk7yJENI/3/JMXutDXLJD/475z1zv7/9HAAYTAoOABb3ukQ3d8MJgro2SvKdJIcn2cy1lb8bGRnJ9JVXyiXf/WHOf+5Ls/DW22pHAgAqUHAAcG8mJzkgycNrB+FvutMb+yb5SZK3OM3xT9PnrJjfHX5Ybjm9O+gCAAwaBQcA96YbcPn62iH4D6smeU+SnybZpXaYXjnJMW3S7ExYblrtKABABQoOAO5JdwXiS7VDcI8emeSYJF9Ism7tMAAAtSg4ALgnn0iyQe0Q3KvuyMJ+Sc5M8uwkU2oHAgAYbwoOAO7O7kleWjsESzwM9itJjkzyoNphAADGk4IDgLsyJ8nHk0ysHYSl0q2SPSnJh5LMrB0GAGA8KDgAuCvvS7Jh7RAskxWTvC7JOUn2qR0GAGCsKTgA+He7Jnle7RCMmo2TfCPJ4UnuVzsMAMBYUXAA8O/v+h+SZGrtIIyqSUmenuS0JK9KMr12IACA0abgAOBfvSPJ5rVDMGZWS/LRJD9KslPtMAAAo0nBAcA/bJfkgNohGBfbJzmurAFeu3YYAIDRoOAAoLNckiNqh2BcTU6yf7m2sp+NOQBA6xQcAKS8k99dX2DwrJfkC0mOSfKA2mEAAJaWggOAPZLs63vCwHtMWSn7xjJsFgCguanqMMi2TnJRkutqB4FK1k3y9iQzawehZ64qfaBsXHl3kqOSjNQO1fC65fv679dTuhL3S0nuqB0EgLGh4GDQPTfJjknekOR7tcNAhRkMr0nyoNpB6DndJp0jk3wzyVuT/Ll2oAa9OMletUPwH45OcmXtEACMDceRGXTduzj3T/Kt8q7OOrUDwTiyNYV7MlROcpyS5JVJpqcB0+aslHOfv38W3nJr7Sj0pkW1AwAwdhQc8M93srvTHGckeVGSqbUDwTj4eu0ANKErfj9e1spumx43ccqkXPen83P7b35XOwq9yZUhgD6m4ID/b+0knyvXVbaqHQbG0JeTrF47BM2d+PlZkvclWSM9amTRSOasff+c+Kida0cBAMaZggPufpvAqUnekWSV2mFglO1dPmBpvLlcW3lar55260qO6XNWzVWHHV47CgAwjhQccM/XVrqC4+Qke3Ynn2sHglFwn/J5PaN2EJrWzS76Sjnttll60KTp0/M/B76pdgwAYBwpOODeh+w9oGwT6OYVGEJKy7p329/Yqy9IabIE/sdpt7eUFbM9Y2TRokyesXwuftdBtaMAAONEwQGLpzu98dQk5yR5fivbBODfbFuG6MJomp3kPeXayq69tIJ+0fBwbjjj51k0f37tKADAOFBwwJLphjIemuTYJI8sJzygBd2Lzq/WDkHf6r4WPizJj5L8V5IN0gOGJk7M5Sf/LJd/9rDaUQCAcaDggKWzU1mZeHCSWbXDwGI4tJc3X9BXp91ekOSkJC/phRJ46gor5Kpjj8uCK6+qHQUAGGMKDlh6yyd5TVmb2A0hhV715CTPrh2CgbJekk8lOSHJI2oGmThtan5/4vcz7+JLasYAAMaBggOW3RZJjkjyjSQb1Q4D/2a1JJ+oHYKBPc2xSznN8eFaK7e7YaOrrLZhztz7OWZxAECfU3DA6G0TeFqS08ux7J7aJsBA64Y/2v5DTd1Q5tcmOS3J42qs3J4waWJuu/qy3HpGNycaAOhXCg4YXSsl+WySo2sfy4ZyNaXb+gO9YMMk303ytfLjcTMyMpJZ66yXE3bslrwAAP1KwQFjo3sWfXySTxpCSiXdQNFDarxbDvdgSjnt1q2Ufcd4PvDI8KLMWn3dXPqJz43nwwIA40jBAWOnKzZekeQXSZ5SOwwD56O9sqoT7mbl9juTnJlkx/FcG/v7j3x6vB4OABhnCg4Ye/dLcniSb5Yfw1iblOQBtUPAYuiu8v0wSdc6rDvma2VHRv42aPTP7z5oTB8GAKhDwQHjo7sm8NQyZO/AJFNrB6KvDSfZKsmbklxXOwwsxhDSl5VrK88Z6wdbtGA486+9YawfBgCoQMEB47+y8+Akx43nsWwG0twk3dvU2yb5cu0wsBjWT/KlJEcleeiYPcqEoUyY2o0CAQD6jYID6tihlBwfLcMgYaxcmOR5SfZM8pvaYWAx7DneA0gBgP6g4IB6urcQX1WurTyjzE2AsfK9JDsneV+SW2qHAQCA0abggPq6TRdfT3JEkvvXDkNfuybJW5PslOSE2mEAAGA0KTigd+xVVsq+MskKtcPQ17rPs0cnOSDJJbXDAADAaFBwQG+ZmeTjSX6cZPfaYeh7n0iydZLPlaGkAADQLAUH9KaHl5kJn0+ySu0w9LUrk7y0FGpn1Q4DAABLS8EBvWtakhcmOSPJM5NMrh2IvjWS5NQkuyV5Y5KbawcCAIAlpeCA3ne/JF9L8u0kD6odhr52a5IPJtmmnCBaUDsQAAAsLgUHtONJZaXsa5PMqh2Gvva7JHsmeVaS82uHAQCAxaHggLbMSPKhJMcl2TXJUO1A9LVvJdk5ySGGkAIA0OsUHNCeobL54vtJvpxkzdqB6GvXJnlDKTp+kmRR7UAAAHBXFBzQrulJnp3knHKVYGLtQPSthWXDymPKxpVu8woAAPQUBQe0b60kX0ry3SQPdG2FMbSgrC7eKskRSe6oHQgAAP5BwQH9oTu98cQkJyd5V1kxC2Pl0nJqaO8kv3BtBQCAXqDggP4yJ8nbkpyS5PG1w9DXhpP8sAy77WZ03Fk7EAAAg03BAf1pyyRHJTksybq1w9DXbkxycJJHlMG3AABQhYID+teUJM9LcmaS/ZJMrR2IvvarJPuWwbe/TzJSOxAAAINFwQH9r1sj+4Uk306yRe0w9LX5Sb6WZNskn0kyr3YgAAAGh4IDBscTkpxahpCuVDsMfe3aJK9I8qQkp9cOAwDAYFBwwGCZmeTtpejoNmDAWPpxkt2TvDzJDbXDAADQ3xQcMJg2SfLNcp1g7dph6Gu3lesqD0ny1dphAADoXwoOGFyTkjwzyVlJXpRkeu1A9LVLkjwnyV5JLqgdBgCA/qPgANZK8rkkP0jyqNph6HvfLUNI35tkbu0wAAD0DwUH8A+7JPlJeeG5cu0w9LXrk7wtyQ5Jvl87DAAA/UHBAfyrKUnelOSkcpWgu8YCY+XnSfZM8oIkf6kdBgCAtik4gLv6urB5km8l+UaSDWoHoq8tSnJYuR71addWAABYWgoO4O5MTLJPknOS7JdkudqB6GuXJ3lFkiclObd2GAAA2qPgAO7NSmUI6Q+TPLIUHzBWTiyfZ29PcnXtMAAAtEPBASzu14puIOSPknw8yazagehr85O8p1xb+VqShbUDAQDQ+xQcwJKYmeTlSc5Msm/tMPS9PyZ5TpI9kvy+dhgAAHqbggNYGpsm+XqSI5JsnGSodiD61kiSY5Jsn+SQJLfXDgQAQG9ScABLa3KSpyQ5LckrDSFljHXzOF6bZJckP64dBgCA3qPgAEZjCOnHkvygDIeEsXRWkt1KqXZJ7TAAAPQOBQcwWnZOclySTyZZpXYY+l73ebZjki8mubN2GAAA6lNwAKNp+SSvSHJOkmfVDkPf+3OSlyR5bJJza4cBAKAuBQcwFtZP8pUk305yv9ph6GvdCtmTkmyX5F1Jbq4dCACAOhQcwFjpNqvsXVbKHphkRu1A9LV5peDo5sAcm2R+7UAAAIwvBQcw1lZOcnCSE5LsXjsMfb9S9rdJ9kjynCQX1g4EAMD4UXAA42WbJMck+VSSNWqHoa8NJzmiDL7tyrVFtQMBADD2FBzAeJqU5GVJTi3vsE+uHYi+dkWSNyTZPsnPygkPAAD6lIIDqDGb475JvpzkO0k2qx2Ivtad3jgtya5JXp3k0tqBAAAYGwoOoKYnlpWyr0oyu3YY+lo3dPTj5TTHkeUaCwAAfUTBAdQ2PclHkvy4DCGdWDsQfe3PSZ6ZZJ8k59cOAwDA6FFwAL1ybeVhSb6X5LAkq9YORF9bkOTocprjjUnurB0IAIBlp+AAesm0JM9Oclb5ZzeUFMbKjUk+mGSrJMfXDgMAwLJRcAC96D5JvlROdDyknPCAsXJekicl2S/JxbatAAC0ScEB9PLXp8cn+WmStyaZWTsQfa27pnJoubbyqdphAABYcgoOoNd1xca7k5xQhpDCWLosySuTPLqslwUAoBEKDqAVjyhXVr6SZJ3aYeh7XaG2W7m20pUeAAD0OAUH0OIQ0p8neX6SybUD0dfmJTkyyUlJFtYOAwDAPVNwAC1arcxLOCrJA2uHoS8tn+SFSc4ppdrE2oEAALhnCg6gZU9IcnKS95UXpLCsuo09eyX5UZLPJ9m4diAAABaPggNo3Zwkb05yepI9a4ehWd0JjZ2SHJPkm0keVTsQAABLRsEB9Ivuqsq3yhDS9WqHobnPnW7WxrFJHme2CwBAmxQcQD+ZVOYldKc5XlKGksLd6bbxfCjJGeX0z/TagQAAWHoKDqAfrZXks0mOTvLw2mHoySG1byoDRF+XZEbtQAAALDsFB9DPHp3ktCTvSrJq7TBU153oeVlZ+/r+JKvXDgQAwOhRcAD9bkqStyc5Jcnevu4NpG6mxr5JfpLkU0k2rR0IAIDR54k+MCg2LtsxjiizFxiMla87Jjk+yeFJtim/BgBAH1JwAIM2hHSfMnvhhYZK9rUHJDm0XEfZsfzZAwDQxxQcwCDqZi98Psl/J9mudhhGTXc64/5JPlI2ozyvdiAAAMaPggMYZDskOa6sCp1TOwzLZOUyTPbkJK9OMqt2IAAAxpeCAxh008uq0J8aQtqkbsXry8sQ2beVFcEAAAwgT+QB/m7zfxlCulHtMNyrqWWeys+SfNJmFAAAFBwA/zmE9KwkLy6nA+gtE5M8Msl3kxyZ5CE2owAA0FFwAPyn2Uk+k+QHVov21Perh5bNKCcmeWztQAAA9BYFB8Ddf33cKcmPknyqlB7UsUEpnH6c5DlJptUOBABA71FwANyzbhvHy5L8PMnTaocZMCuVzSg/LVeGVqwdCACA3qXgAFg890vytSTfMoR0zHVFxkuSnJ3k7UnWqR0IAIDep+AAWLIBl/smOTXJgUmWqx2oz3RXT56Y5Pgkn01y39qBAABoh4IDYMmtkuTgJD9MskPtMH1gcpJdknwnyVFJHl47EAAA7VFwACy9HcoQ0k8kWaN2mEY9LMkRSb6f5HFlVS8AACwxBQfAsl+r2D/JGWXDh6+ri2e9JJ9OckKSPV33AQBgWXkiDjA61k/y5STfLgNJuWtrJXlrkrPKdhqbUQAAGBUKDoDR1Z1GODfJa8qKWf5uhST7JTklyXuSrF47EAAA/UXBATA2L+YPSfKTJI/NYJue5CllVskXbEYBAGCsKDgAxnaA5veSfG5ATyw8phQbX0uyde0wAAD0NwUHwNiakuSFSU4tQ0i7n9/VoNJ+snmSI5N8N8n2ZQ0sAACMKQUHwNgbKoNH/zGE9EH/9r+vluQBSWan7X/HDZN8NMnpSfbpw+IGAIAepuAAGF9PTHJmkgP/pdC4pGwX2SvJg9OeNZO8pZxSeVWSmbUDAQAweBQcAOOvO9nwoSQnJHl0konlx93Jh0eVbSO9VBJMLaczJt/FMNVXlGGq3WaUVSvlAwAABQdAxa+/D09ydJJDy0rZC5N8vZzo6K543L92yHKipLtSc02Shf+SvZsn8tMkH0uyceWMAACQSbUDAAy4aaUseFAZRvrzJD8uczlWLKcn7qyUrTu18dckdyS5vczZ2C7Ju5NsqyQHAKCXeHIK0Bu2KCci3lZmc1xdTnTMr5jpoiTXJ5lXCpivlfKl24zi+wcAAD3FE1SA3rFcOR1xWpLnlV8bqZine+x1k3wgyUlJnnE3a24BAKA6BQdA7+lWxh6W5MQkTy/Fx3hbJ8nbywDR15frMgAA0LPM4ADoXTuX6yDnJ/l+GUD6pzEuvXcsJzUeU+aAdHM3AACg5yk4AHr/6/SDy8drkpyS5AdJzkxyeZKbl+EaS3fdZKUkGyTZNckTyumRbrApAAA0RcEB0I5ZpYToPhYl+W2SXyT5VTnZ0Q0EvbV8dMNJh8upjInlmsvySVZIsnpZ7doNDt0qyRq1/8UAAGBZKTgA2tQVF5uXj3/oTnLckuSGsvlkfvm/605qzCxzNGrM8wAAgDGn4ADoH0PlhEb3AQAAA8UWFQAABkXN1dsAjDEFB4Pu6toBAIBxYzMUQB9TcDDo3p9kvyR/rB0EABhzM2oHAGDsKDggOTTJTkm+kGRB7TAAwJiZUzsAAGNHwQF/d2mSlyV5bJJzaocBAMbERrUDADB2FBzwT8NJTiynOV6f5ObagQCAUbVV7QAAjB0FB/yn25N8OMk2SU5IsrB2IABgVDyydgAAxo6CA+7e75I8MckLklxcOwwAsMzWSLJe7RAAjA0FB9yzO5N8Jcn25VQHANCu1ZI8q3YIAMaGggMWz2VlLscuSc6qHQYAWCoTkzwmySq1gwAw+hQcsGR+kmS3JG9Mck3tMADAEutmbO1ZOwQAo0/BAUvu1iQfTLJDkqNrhwEAltg7k6xbOwQspWm1A0CvUnDA0rsgyR5J9ktyUe0wAMBiWz3JkZ4L06A1k3w1yWtqB4Fe5Is6LLtDy9q5Q8qKWQCg922V5EdJZtQOAovpPkm+m2Sf8ryzK+lm1w4FvUTBAaPj2iSvTbJzktNrhwFo/Oup5yeMl93KfK0tageBezA9yeuSnFGKuX/oio4vJ5lVMRv0FE8gYHSdnWTXMoT0htphABp0SZK31A7BQNmqlBzdtrQ1aoeBfyk1NilXUX6R5EPlatW/e1KSlyQZqpAReo6CA0bfvDKE9BHl6OCC2oEAGvH7JF9Jcl7tIAyclcr37p8leUWSzZJMrR2KgTFUPgc3TbJ7kjcnObYUG4eUouPehuZuME5ZoadNqh0A+lg3ePQp5fjgO5I8oHYggB51ZZIvJvlokhvH8oEWzV+QeddcN5YPQdvul+STZaZWd+X0t0n+lOSmJLeVNy28U87Sbj7p3lyemGRmkuXL1ZLVysmhdUtJscJSfI51pz1eluTAMcoOzRgaGRmpnQGqOWGteyvER83q5ZvOy8s3IQCS4SQHJ/mvcjVlzE1ZcXa2Pu6oTF27W0Qwpr6TZK+xfhCAf9GdOppfOwTU5IoKjI+rkrwhyS5Jftq9iVg7EEBF3dfAbyZ5cJI3jVe50Zm5wfrjUW4A1LBv7QBQm4IDxvcJ/Rml5OhOc1xTOxBAhRMbJ5avg89K8pvxeuChSZNy0xV/zEN/0PUqAH3phbUDQG0KDhh/C5N8LMnWZZf5nbUDAYyDM5M8o2yaOrl8LRw382+9NZu9ZP/xfEiA8bZt7QBQm4ID6rk4yVPLx++SGIgD9KM/JDkgyXZls9S4G5o0ITfceEk2+egHajw8wHjqNgDBwFJwQF3dNPajk+xQVnyN6zuaAGPo+iSvTbJNkk+U6ylV3Hb5Fdnxk59PpkyuFQFgvGxeOwDUpOCA3nBtkneXo4Wn1A4DsAzmlkLjQUkOKUVHPSMjmTpzhay4wyMzNMHTHqCvdetlN64dAmrynR5674767klemeSvtcMALIE7ymrURyZ5VZLL0gNuv/qqbPqGAzJjs01rRwEYDxvUDgA1KTigN18kfDLJTkm+XjsMwGI4Jsljk+yT5Fc9M1NoZCQrb/HArLTz9rWTAIyXVWsHgJoUHNC7/lTWKO6d5PzaYQDuws/LZpQnls0oPWXRwoWZeZ/1MvPhD6kdBWC8rFg7ANSk4IDed1SS7u3Ht3WnrWuHAUhyUZIXJNkxyTfSi4aGMmn69Gx26KdqJwEYTxNrB4CaFBzQhhuTvLfcbf9p7TDAQA9EfmuSLZMc1sul68jChZnz4Adm0uwVakcBAMaJggPacl6SXZMckOTK2mGAgXFLks8neWiS9yW5KT1swuRJufaqP+Qh3zPGCAAGiYID2jNcVjBuU15wLKgdCOhrh5UV1i9OcmkacMcNN2er13W3+gCAQaLggHb9pbzgeEKSX9QOA/Sd/y4nxrpZG79OI4YmDOXWWy/Lfd70mtpRAIBxpuCA9h2f5NFJ3lGOkQMsrUVJzkny5CR7JDkxLRkayq2XX57tP/PFTFxhVu00AMA4U3BAf7g+ybvLtpXuXdeR2oGA5lyc5KVJtkvy/STz05iRRYuy/BprZuZWD8nQBE9xAGDQ+O4P/eVXSR6X5OXlCgvAvbkqyQeSPKjM9bkzjbrj+uuzwXOekpkP6f5VAIBBo+CA/vTZMoS0Gw44t3YYoCfNS/LBJI9I8uYkt6ZxKz1ws6zxlL1rxwAAKlFwQP/q1si+qAwhPbd2GKCnfDnJ1knemOSS9IGRkZFMX3P1zNhis9pRAIBKFBzQ3xYmOSnJTknelOT22oGAqiumjyuzevZLcl76xNDQUBbOuyMP/fZXakcBACpScMBg6I6eH5TkUUl+VF7oAIPj50n2TfLYJD8r5WffWDg8nLV23SGZMqV2FACgIgUHDN4Q0u7KyguTXFQ7DDDmur/nr0myZZLv9eOGpQmTJ+fqqy/KFkd2t24AgEGm4IDB071z270S2DnJp2qHAcbE1UneUIYNfzR9bN6112X7d3ezUgGAQafggMF1aZIDkuyW5OzaYYBRcUe5jtZtRvlQkuvS5+bPvTlrPO+ZtWMAAD1AwQGDbVGSH5fTHK9Lcn3tQMBSuTPJ4Um2KgOF/5J+NzSU2668PI/41Mcyda01aqcBAHqAggNI2a5ycBlCelw/3tOHPtYNDt41SXeM4dcZECOLFmX2BvfLrIc/+G9lBwCAggP4VxcmeWKS5ye5pHYY4F43ozyjbEY5NQNm/i23ZPVdd8jMLR9WOwoA0CMUHMC/W1CGkHbDCT9YrrEAvaE7XfX7JPsl2SnJNzKgZm94/9zn1S+vHQMA6CEKDuDuXJHkjUm2T3Jm7TDA3waGditfH5nk0CS3ZYAtt9Yamb7hfWvHAAB6iIIDuDenJdm9DCG9tnYYGEA3J/lkkocn+digDwMemjAhc6+6Mg895ojaUQCAHqPgABbHLWUI6XZJvl07DAzQytevlxMbrxyIzSiLYXjevNz3mU+rHQMA6EEKDmBJh5Dum+Q5SS6oHQb62H8neXySZyX5be0wvWJo0qRce/2fs/lXPls7CgDQgxQcwNL4ajnNcUiSW2uHgT6xqMy72TPJHkl+UjtQr5l75dXZ8ZBP144BAPQoBQewLAMPX5tklySn1A4DjbsoybPL36fvdVtQawfqOSMjydBQVn7Co2snAQB6lIIDWFbnJNmtDCHtSg9g8V2V5B1JtkpyeHdIoXagXnXbVZfnIQe9I9Pvb3MKAHDXFBzAaJhfhpA+Isl3ktxZOxD0uBvKRpRuM8q7k9xYO1AvGxkZyUoP2DwrbrNl7SgAQA9TcACj6U9J9kny1CTn1Q4DPWg4yVeS7Jzk1Ukuqx2oBcN33JEVt9g8y2/1sNpRAIAepuAAxsLR5drKQUkW1A4DPVJsHJNk1yQvSPKr2oFaMmON1bPxB99ZOwYA0OMUHMBYuSbJW5Jsn+SksiECBtFZZeXrXkl+mmRh7UBNGUlm3u8+mbLWGrWTAAA9TsEBjMfay92TvCrJpbUDwThvRnlpWal8vNNMS25o0qTccOVFeej3v1k7CgDQAAUHMB66F3afLC/0vl2O60O/+ms5vdQN3f0vxcbSW3DLrdnipQfUjgEANELBAYynvyR5RpJ9k/y2dhgYZbeUuTM7JHl/2ZTCUhqaMCHX33RJNjrkvbWjAACNUHAA4617N/t75TTHW727TR+4I8lhpdh4U5I/1w7UvKHktiuvyE6f+nyGpk6tnQYAaISCA6ile3f7fUm2KUNIoTXdVasflmLjhUl+WTtQvxhZNJJps2Znxe22+dtJDgCAxeFZA1DbuUkel+QVSS6rHQYWw0j5vH1a2Y5yti1Bo2vuNVdn09e9Mstt/oDaUQCAhig4gF454v/pslL2i7XDwN3oSozzk7yknNr4Tu1AfWlkJCs/cPOstGv35QAAYPEpOIBecnE56r+H4/70mCuSvCbJzkk+n+T22oH61cI752f59dfL8g97SO0oAEBjFBxALzo6yY5J3l42U0AtN5fNKN1Q3I8nubZ2oH633NprZvNDu63SAABLRsEB9PILy/ck2TbJCbXDMHBuTfLlJFuXzSh/qh2o3w1NmpQbrrgo2557ciatOLt2HACgQQoOoNf9Osmjk7zSEFLGaTPKj8vg2+cluaB2oEExfNttuf8T982EyZNrRwEAGqXgAFrRnVl/RJIvJJlXOwx9Z2GS05I8tZQbp9YONGinN6694S/ZwtUUAGAZKDiAllye5EVlNec5tcPQN7rNKM9O8tgkRyVZUDvQQBkaym2XX5Zt3vTOTFxhVu00AEDDFBxAi05KsnuSt5RZCbC0m1EOLJtRvuFzqY75t9yajfd7Xu73nrdmyPUUAGAZKDiAVt2Y5ANlu8V/l9kJsDiuSXJIkq2SfMRmlHpGRkayYO5tmbPdNsnEibXjAACNU3AALRtJ8qsyM+HFSf5YOxA97fYkh5cVxK81tLa+bqDolp84OKs9fe/aUQCAPqDgAPrFYUl2SPLFJHfUDkNPuTPJ95M8McmzkvyudiCSoQkTMveqq7PWy15QOwoA0CcUHEC/DSF9aTnRcU454cFg+2kpNp5SZrf4nOgFQ0O5/corsuNJP6idBADoIwoOoN8MlxeyOyV5fZJbageiit+XzSjdxp0TyikOesDQ0FBuvPwP2emEH2TWI7vNzwAAo0PBAfTzvIWDk2yT5LgkC2sHYsx1pzP+nORNSbZO8rXyeUCvGBrK3Guvy+zV75vpm29SOw0A0GcUHEC/+22SJyV5XhlC6opCf7qubETZNslBZcsOPWZk4cKs9MAHZNsTj87kVVauHQcA6DMKDmAQzC/v5u9YXgTTP25LcmiSXctmlG4OCz1q/m1zs/JWD8tyD3B6AwAYfQoOYJBcVl4Edy+Gz6wdhmV2ZJKdy4rgbl0wPW6lzTbJ/d7z1toxAIA+Nal2AIAKTiwFx8uSHJhktdqBWCJnJ3ln+XPshsrSwErY2664PLtd9tvuJ7XjAAB9yrMMYFB1wyc/nGT7JHZV9r5FSc5P8qIkO5TBscqNRiy8487cZ88nKTcAgDHlmQYw6H5fhpA+vwwhpff8YzNKV0Z9IckdtQOx+IYmTcrV1/0pW3zryxnA2T8AwDhScAD83ZeSPCrJh5LMqx2G/9uMclCZs9H9udiM0pihoaHc8teLs907P/i3Hw+Y621tAoDxpeAA+Kerk7yhXIE4tXaYAda98/3psvL1LeUEBw2ad90N2eJNr8/6b35NMnD9Rq50jQoAxpeCA+A/nZPkMUleV96FZXwMl9ka3UmaVyS5sMzeoEGLhoezaOGCzHnk1hmaPJAzzS9NsqB2CAAYJAoOgLsfQnpwkq3LOlLvxI6d7r/t6Un2TfKEJD+vHYhlN3nGcnnEFz6ROY/bLQOqm+mj4ACAcaTgALhnFyV5SpJnJflN7TB96BdJXphk1yTfUyT1j+mrr57Vn/uMDLDzktxZOwQADBIFB8DiOaIMu+xOddxWO0wf+GuS1ybp3t7v1msY7Novhob+dj1lwc23ZMDNdcUNAMaXggNg8V1ThpDukuQkGxKWSrcJ5T1lzsZHktxQOxCja2TRokyaNj3bnPyD2lF6wSm1AwDAIFFwACyZbujl2eXkwauTXFs7UEMzTb6aZMskby8DGBVEfWju1Vdnu7NPzORVV6kdpRd083sAgHGi4ABYOguTfDzJVkm+k+SO2oF6VPff5dgkuyd5Thm8SJ8amjQpNy+6KRNnLFc7Sq84uXYAYCCvx8HAUnAALJs/J3lakqcmOb92mB5zfJK9k+yR5LTaYRhbQ0NDueWvF+fhL3h5JkybWjtOLzm6dgBgoFxROwDUpOAAWHbd5o/vlyGk7yqnOwbZb8rWmScn+aHNKINheO68bPqyl2bjj38oQ5Mn147TS95XOwAwMEbKNVoYWAoOgNHTzeN4Z5JtB/Boevek6pIkr0qyQ5Kvu7YzWBYOL8ysTTd2PeU/XVBOegGMBxOeGWgKDoDRd2aSxyR5RXnRPwjFzkfKANFuLonVmANoeO5tWXDjTbVj9KJuBfJHa4cABsKfzLpi0Ck4AMbGnUk+XU4zfCP96ZYkXyv/jq8ta3QZUCtuuknm7NRt/+UuNi/9KMlFtYMAfW//2gGgNgUHwNj6S5lHsVeS36Z/XrB1pc2jy2aU39UORF0jCxdmxjprZ9Y2j6gdpVd176h+vnYIoK+dlOS42iGgNgUHwPgUAt9Nsl2St5Yj6636WVn5+swkZ5XZGwy4KSuumC2+9KnaMXrdZ5OcWzsE0JduTPKi2iGgFyg4AMbPDWWjwiMaG0I6UlbgdidRHpvkx4oN/tWEyZMyedVVasfodbeXq1wtF5xA7+m+pry8zN+AgafgABh/vy6nIPZvYF9994TpDUm2LptRuhdpwNI5Jcm7a4cA+mreV7e97Zu1g0CvUHAA1DE/SXem/1Hlbn53jaWXXFM2PzwyyYcVGzBqDkpyWO0QQF/oToV9qHYI6CUKDoC6/pzkxUme2CP387t3gz5Z5oW8JsnVtQNBH+pOb3nHFVhaNyd5anmjBPgXCg6A3vDDJLsleVeSWytlOCrJNklemeT3lTLAIJhbBgJ2L04W1A4DNHfVrVvPfmTtINCLFBwAvTUFvbtLu2eS34zTYy5McnoZHtq9G/Q/4/S4MOhuKyc5DiwDiAHuydVlE9vjk/zKsG+4awoOgN5zYpJty1rJW8f4ekz34mqnJD9KMjyGjwXcte5K2C5ls1KvzeIBeuPNjyPLqY33lXIUuBsKDoDedFOSlyV5TJKvJbllFH/vS5McUoqNj5eBp0A9vyx/15+Z5AR/J2HgjZQ3IboC9NFJnpbkwtqhoAWTagcA4B5110fOTPKAciz1yUm2XMqrKMcnOaac1vir463QU+4sg0ePLn/HH18+Nq4dDBg3lyf5SSk6f1p+DiyBoZERz28ZXCestUntCLCkZie5b5KHlI/7JVm//PrU8n8zr9zVvbS849PN1fh5ksvKcEMYVVNXmpPtf911cYyyVZKsl+SBSTYrZceaSeYkmekkLjRppFwzubF8X744yXll9tZfklzluhosPQUHAAAA0DzNPwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAADQPAUHAAAA0DwFBwAAANA8BQcAAACQ1v0vXuFCVEoUuI8AAAAASUVORK5CYII=" alt="GL" style={{height:32,width:"auto",display:"block"}}/>
        </div>
      )}

      {/* Voltar */}
      {screenIdx>0 && screen.type!=="confirm" && (
        <button onClick={goBack} style={{
          position:"fixed",top:12,left:16,zIndex:50,
          background:"transparent",border:"none",
          color:C.textMuted, cursor:"pointer",
          display:"flex",alignItems:"center",gap:6,
          ...TYPE.monoSM, fontSize:11,
          padding:"6px 10px", borderRadius:BR.md,
        }}
          onMouseEnter={e=>e.currentTarget.style.color=C.text}
          onMouseLeave={e=>e.currentTarget.style.color=C.textMuted}
        >← Voltar</button>
      )}

      <div key={animKey} style={{minHeight:"100svh",display:"flex",flexDirection:"column"}}>
        {showTicker && <Ticker/>}
        {screen.type==="intro"  && <IntroScreen screen={screen} onNext={goNext}/>}
        {screen.type==="gender" && <GenderScreen onAnswer={handleAnswer}/>}
        {screen.type==="choice" && <ChoiceScreen screen={screen} answers={answers} onAnswer={handleAnswer} onNext={goNext} copy={copy}/>}
        {screen.type==="form"   && <FormScreen   screen={screen} onSubmit={handleSubmit} copy={copy}/>}
        {screen.type==="confirm"&& <ConfirmScreen copy={copy}/>}
      </div>
    </>
  );
}
