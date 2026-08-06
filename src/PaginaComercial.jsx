import { C, TYPE, SP, BR, GLOBAL_CSS, CSS_COMERCIAL } from "./design";

/**
 * PÁGINA COMERCIAL — o que a pessoa vê ao clicar no link do Instagram,
 * ANTES do quiz de qualificação.
 *
 * Por que ela existe (contexto do GL, 06/08/2026): o quiz sozinho pede um
 * compromisso antes de ter dado qualquer motivo. Pior, ele tem cara de
 * peneira — e peneira afasta exatamente quem tem autoestima baixa, que é
 * quem mais precisa e quem não acredita que seria selecionado.
 *
 * A regra que atravessa a página inteira:
 *
 *   QUEM É SELECIONADO NÃO É A PESSOA. É O ENCAIXE.
 *
 * "Só aceito os melhores" fecha a porta. "Eu recuso quem eu não consigo
 * ajudar" diz a mesma verdade e convida. Nenhum texto aqui pode sugerir que a
 * pessoa precisa provar que merece.
 *
 * DESIGN: nada é inventado. Cores, tipografia e espaçamento vêm de
 * `design.js`, o mesmo do quiz e do GL SYSTEM — pela razão que a nota "Por que
 * sites feitos com IA parecem todos iguais" registra: o que denuncia página
 * improvisada é incoerência, e reconhecimento entre story, anúncio e página é
 * o que faz clicar antes de ler.
 */

/* ─────────────────────────────────────────
   PROVA — pares de antes e depois

   Fotos de aluno real, com autorização (confirmado pelo GL em 06/08).
   `tempo` e `alem` não são enfeite: é o que transforma foto em
   identificação. A pessoa não se reconhece num corpo, se reconhece numa
   história — "voltei a dormir", "parei de me esconder no espelho".

   Enquanto os arquivos não chegam, a lista fica VAZIA e a seção se desenha
   como reservada. Nada de foto de banco de imagem: a página prometeria uma
   coisa e a consultoria entregaria outra.
───────────────────────────────────────── */
export const PARES = [
  {
    img: "/prova/maria-eduarda.webp",
    nome: "Maria Eduarda",
    // A dor dela é a dor de quem tem agenda mandando na vida — a ponte mais
    // direta com o posicionamento de "treinador de empresário".
    chamada: "A rotina nunca deixava treinar",
    historia:
      "Engordou, e o trabalho não tem horário. Não arrumamos a rotina dela: montamos uma dieta que cabe nela, com refeição que dá prazer. A consistência veio depois disso, não antes.",
  },
  {
    img: "/prova/aluna-frente.webp",
    nome: "Aluna GL",
    chamada: "Já tinha emagrecido. Faltava perder o medo",
    historia:
      "Ex-obesa, ela já tinha perdido o peso. O que não tinha perdido era o medo: de comer, da balança, do que sobrou no espelho. Chegou pensando em cirurgia estética. Ficou quando descobriu que dava para construir corpo comendo — não deixando de comer.",
  },
  {
    img: "/prova/leo.webp",
    nome: "Léo",
    chamada: "Procurou querendo competir",
    // Moldura obrigatória. Sem o "procurou querendo competir", o palco e os
    // troféus dizem "isso é para atleta" — e afastam exatamente quem a página
    // quer acolher. Com ela, o Léo vira teto, não régua.
    historia:
      "Bicampeão overall do Men's Physique, com vários destaques no caminho. O objetivo era dele; o método é o mesmo.",
  },
];

function Ticker() {
  const items = [
    "PROTOCOLO INDIVIDUAL", "CHECK-IN SEMANAL", "SUPORTE DIRETO", "RESULTADO REAL",
    "GL CONSULTORIA", "SEM ACHISMO", "TREINO E DIETA", "MÉTODO GL",
  ];
  const track = [...items, ...items];
  return (
    <div style={{ background: C.red, overflow: "hidden", padding: "10px 0", flexShrink: 0 }}>
      <div className="ticker-track">
        {track.map((item, i) => (
          <span key={i} style={{
            ...TYPE.monoSM, fontSize: 10, color: "#fff", letterSpacing: "3px",
            textTransform: "uppercase", padding: "0 28px", whiteSpace: "nowrap",
            display: "inline-flex", alignItems: "center", gap: 28,
          }}>
            {item}
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Espaço reservado da foto. Existe para a seção nascer com a forma certa. */
function VagaDeFoto({ rotulo, altura = 420 }) {
  return (
    <div style={{
      height: altura, borderRadius: BR.lg, border: `1px dashed ${C.borderHover}`,
      background: `linear-gradient(160deg, ${C.surface}, ${C.deep})`,
      display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: SP[24],
    }}>
      <span style={{ ...TYPE.monoSM, color: C.textMuted, letterSpacing: "2px", textTransform: "uppercase" }}>
        {rotulo}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   DOBRA 1 — o espelho, não o troféu
───────────────────────────────────────── */
function Hero({ onComecar }) {
  return (
    <section style={{
      maxWidth: 1180, margin: "0 auto", padding: `${SP[64]}px ${SP[24]}px ${SP[48]}px`,
      display: "grid", gap: SP[48], gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)",
      alignItems: "center",
    }} className="gl-hero">
      <div>
        <span className="anim-tag" style={{
          ...TYPE.monoSM, display: "inline-flex", alignItems: "center", gap: 8,
          color: C.red, letterSpacing: "2px", textTransform: "uppercase",
          border: `1px solid ${C.red}`, borderRadius: BR.full, padding: "6px 14px",
        }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.red }} />
          GL Consultoria
        </span>

        {/* O acento cai em "ALGUÉM JUNTO" — é a promessa, e é o que falta na
            história de quem já tentou sozinho três vezes. */}
        <h1 className="anim-h1" style={{ ...TYPE.displayXL, marginTop: SP[24] }}>
          <span style={{ display: "block" }}>VOCÊ JÁ SABE</span>
          <span style={{ display: "block" }}>O QUE FAZER.</span>
          <span style={{ display: "block" }}>O QUE NUNCA TEVE</span>
          <span style={{ display: "block", color: C.red }}>FOI ALGUÉM JUNTO.</span>
        </h1>

        <p className="anim-sub" style={{
          ...TYPE.body, color: C.textSub, marginTop: SP[24], maxWidth: 460,
        }}>
          Não é falta de informação — você já ouviu de tudo. É que ninguém montou
          um plano para a <strong style={{ color: C.text, fontWeight: 600 }}>sua</strong> rotina
          e ficou por perto quando ela mudou.
        </p>

        <div className="anim-cta" style={{ marginTop: SP[32], display: "flex", flexWrap: "wrap", gap: SP[16], alignItems: "center" }}>
          <button className="btn-primary" onClick={onComecar} style={{
            background: C.red, color: "#fff", border: "none", cursor: "pointer",
            borderRadius: BR.full, padding: "18px 34px",
            fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600,
          }}>
            Quero um plano pra mim →
          </button>
          {/* Diz o custo antes de pedir o clique: tempo e o que acontece
              depois. Ninguém entra em formulário sem saber onde vai dar. */}
          <span style={{ ...TYPE.monoSM, color: C.textMuted, letterSpacing: "1px" }}>
            5 minutos · sem compromisso
          </span>
        </div>
      </div>

      {/* O retrato abre a página, e não um corpo. O título diz "o que nunca
          teve foi ALGUÉM JUNTO" — e o rosto ao lado é a resposta literal da
          frase. Corpo aqui faria a página parecer sobre estética; rosto faz
          ela parecer sobre acompanhamento, que é o que ele vende.
          Escolhida entre nove: é a única em ambiente real, com olhar quase na
          câmera e expressão de quem conversa. As de estúdio com notebook são
          bem feitas, mas leem como ensaio — e ensaio genérico é justamente o
          que o cofre chama de "cara de IA". */}
      <div className="anim-sub gl-hero-foto">
        <img
          src="/prova/gl-retrato.webp"
          alt="Gabriel Lincoln, treinador responsável pela consultoria"
          width={920}
          height={1150}
          style={{
            width: "100%", height: "auto", display: "block",
            borderRadius: BR.lg, border: `1px solid ${C.border}`,
          }}
        />
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────
   DOBRA 2 — a prova

   O título é a tese do GL, nas palavras dele: "corpo forte, bonito e
   funcional SEM TERRORISMO". Ela nomeia o inimigo (a restrição como régua)
   sem atacar ninguém — e as três histórias são a mesma tese em três
   contextos: uma venceu o medo de comer, outra venceu a rotina impossível,
   o terceiro foi até o palco porque quis.

   Seção QUIETA de propósito: a dobra 1 tem movimento de entrada e o ticker
   rolando. Animação aqui também cansaria. O ritmo é alternar — é o melhor
   achado da nota "8 passos para tirar a cara de IA de um site".
───────────────────────────────────────── */
function Prova() {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: `${SP[32]}px ${SP[24]}px ${SP[64]}px` }}>
      <h2 style={{ ...TYPE.displayLG, maxWidth: 720 }}>
        CORPO FORTE, BONITO E FUNCIONAL.
        <span style={{ color: C.red }}> SEM TERRORISMO.</span>
      </h2>
      <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[16], maxWidth: 560 }}>
        Três pessoas, três pontos de partida diferentes. Nenhuma delas passou fome
        para chegar aqui.
      </p>

      <div className="gl-prova-grade" style={{ marginTop: SP[48] }}>
        {PARES.map((p) => (
          <figure key={p.nome} style={{ margin: 0 }}>
            <img
              src={p.img}
              alt={`Antes e depois de ${p.nome}`}
              loading="lazy"
              style={{
                // Proporção FIXA nas três: os arquivos vêm com alturas
                // diferentes (973 e 1000 px) e sem isto as legendas começam em
                // linhas diferentes, o que faz a grade parecer desalinhada.
                width: "100%", aspectRatio: "1 / 1", objectFit: "cover",
                display: "block", borderRadius: BR.lg, border: `1px solid ${C.border}`,
              }}
            />
            <figcaption style={{ marginTop: SP[16] }}>
              <span style={{
                ...TYPE.monoSM, color: C.red, letterSpacing: "2px",
                textTransform: "uppercase", display: "block",
              }}>
                {p.nome}
              </span>
              <strong style={{
                display: "block", marginTop: 6, color: C.text,
                fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 600, lineHeight: 1.35,
              }}>
                {p.chamada}
              </strong>
              <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[8] }}>{p.historia}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function PaginaComercial({ onComecar }) {
  return (
    <div style={{ minHeight: "100%", background: C.bg, color: C.text }}>
      {/* GLOBAL_CSS carrega as fontes (Anton/Inter/Mono), o grão e as
          animações — inclusive a do ticker. Sem ele, o título cai numa
          sans genérica e o ticker quebra em três linhas: foi exatamente o
          que aconteceu na primeira montagem desta página. */}
      <style>{GLOBAL_CSS}</style>
      <style>{CSS_COMERCIAL}</style>
      <Ticker />
      <Hero onComecar={onComecar} />
      <Prova />
    </div>
  );
}
