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
  // {
  //   antes: "/prova/nome-antes.jpg",
  //   depois: "/prova/nome-depois.jpg",
  //   nome: "Primeiro nome",
  //   tempo: "7 meses",
  //   alem: "Voltou a treinar sem dor no joelho e parou de pular o café da manhã.",
  // },
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

      <div className="anim-sub">
        {PARES.length > 0 ? null : <VagaDeFoto rotulo="Foto de abertura — antes e depois" altura={480} />}
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
    </div>
  );
}
