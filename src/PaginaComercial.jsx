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

/**
 * PROVA — só o que é verdade.
 *
 * Duas regras que o GL deu em 06/08 e que mandam nesta lista:
 *
 * 1. FIDEDIGNO. Onde não há história contada por ele, o card NÃO ganha texto.
 *    Legenda inventada sobre pessoa real é a primeira mentira da página, e
 *    derruba a confiança de todas as outras junto. Por isso `historia` é
 *    opcional: quem não tem, entra na faixa de resultados, sem frase.
 *
 * 2. SEM ROSTO. Todas as imagens foram recortadas acima dos ombros quando
 *    havia rosto identificável. Prova não precisa expor ninguém.
 *
 * O QUE SAIU: a foto de palco do Léo. Troféu e palco diziam "isto é para
 * atleta" bem no meio da seção que existe para acolher quem nunca manteve
 * rotina. Ele continua na página — como frase, no fim da seção, porque a
 * história dele é verdadeira e mostra até onde o método vai quando o objetivo
 * é esse. O que não pode é a imagem virar régua.
 *
 * Não há TEMPO em nenhum card: o GL não lembrava os prazos, e prazo inventado
 * é o tipo de número que ninguém confere e que quebra tudo se for descoberto.
 */
export const PARES = [
  {
    img: "/prova/maria-eduarda.webp",
    nome: "Maria Eduarda",
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
    // Costas e perfil da MESMA avaliação. Ficam DENTRO do card de propósito:
    // numa faixa separada, o rótulo "a aluna acima" fica ambíguo com dois
    // cards em cima, e o leitor pode atribuir as fotos à pessoa errada.
    angulos: [
      { img: "/prova/aluna-costas.webp", alt: "A mesma aluna, vista de costas" },
      { img: "/prova/aluna-lado.webp", alt: "A mesma aluna, vista de perfil" },
    ],
    notaAngulos: "Costas e perfil da mesma avaliação — é assim que se vê que não foi enquadramento favorável.",
  },
];

/**
 * OUTROS ÂNGULOS DA MESMA ALUNA — e o rótulo diz isso com todas as letras.
 *
 * Erro que quase foi para o ar: estas duas fotos são a MESMA pessoa do segundo
 * card (frente, costas e perfil da mesma avaliação). Numa faixa chamada "mais
 * resultados", elas seriam lidas como duas alunas a mais. Isso é enganar por
 * arranjo, sem escrever uma linha falsa — e continua sendo enganar.
 *
 * Nomeadas corretamente, elas ficam MAIS fortes: três ângulos da mesma
 * transformação provam que não é enquadramento favorável.
 */


/**
 * Uma aluna a mais, de quem o GL não contou a história.
 *
 * Fica em faixa PRÓPRIA, e não junto dos ângulos acima, porque juntar as duas
 * coisas faria três imagens parecerem três pessoas — quando duas são a mesma.
 * Enganar por arranjo é enganar.
 */
export const OUTRA_ALUNA = {
  img: "/prova/aluna-perfil.webp",
  alt: "Antes e depois de outra aluna da GL Consultoria",
};

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
function Prova({ onComecar }) {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: `${SP[32]}px ${SP[24]}px ${SP[64]}px` }}>
      <h2 style={{ ...TYPE.displayLG, maxWidth: 760 }}>
        CORPO FORTE, BONITO E FUNCIONAL.
        <span style={{ color: C.red }}> SEM TERRORISMO.</span>
      </h2>
      <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[16], maxWidth: 560 }}>
        Pontos de partida diferentes. Nenhuma delas passou fome para chegar aqui.
      </p>

      <div className="gl-prova-grade" style={{ marginTop: SP[48] }}>
        {PARES.map((p) => (
          <figure key={p.nome} style={{ margin: 0 }}>
            <img
              src={p.img}
              alt={`Antes e depois de ${p.nome}`}
              loading="lazy"
              style={{
                width: "100%", aspectRatio: "1 / 1", objectFit: "cover",
                display: "block", borderRadius: BR.lg, border: `1px solid ${C.border}`,
              }}
            />
            <figcaption style={{ marginTop: SP[16] }}>
              <span style={{ ...TYPE.monoSM, color: C.red, letterSpacing: "2px", textTransform: "uppercase", display: "block" }}>
                {p.nome}
              </span>
              {p.chamada && (
                <strong style={{
                  display: "block", marginTop: 6, color: C.text,
                  fontFamily: "'Inter',sans-serif", fontSize: 19, fontWeight: 600, lineHeight: 1.35,
                }}>
                  {p.chamada}
                </strong>
              )}
              {p.historia && (
                <p style={{
                  ...TYPE.body, fontSize: 17, lineHeight: 1.65,
                  color: C.textRead, marginTop: SP[12],
                }}>
                  {p.historia}
                </p>
              )}
              {p.angulos && (
                <div style={{ marginTop: SP[16] }}>
                  <div className="gl-prova-faixa">
                    {p.angulos.map((a) => (
                      <img
                        key={a.img}
                        src={a.img}
                        alt={a.alt}
                        loading="lazy"
                        style={{
                          width: "100%", aspectRatio: "1 / 1", objectFit: "cover",
                          display: "block", borderRadius: BR.md, border: `1px solid ${C.border}`,
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ ...TYPE.caption, color: C.textMuted, marginTop: SP[8] }}>{p.notaAngulos}</p>
                </div>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Faixa própria, com rótulo que diz que é OUTRA pessoa. */}
      <div style={{ marginTop: SP[48] }}>
        <span style={{ ...TYPE.monoSM, color: C.textMuted, letterSpacing: "2px", textTransform: "uppercase" }}>
          Outra aluna
        </span>
        <img
          src={OUTRA_ALUNA.img}
          alt={OUTRA_ALUNA.alt}
          loading="lazy"
          style={{
            width: "100%", maxWidth: 620, marginTop: SP[16], display: "block",
            borderRadius: BR.md, border: `1px solid ${C.border}`,
          }}
        />
      </div>

      {/* CHAMADA NO PICO. A página tem ~5.300px e tinha só dois botões, topo e
          fim: quem se convencia olhando as transformações precisava rolar mais
          três seções para poder agir. Este pega a pessoa no momento em que a
          prova acabou de fazer efeito. */}
      <div style={{ marginTop: SP[48], display: "flex", flexWrap: "wrap", alignItems: "center", gap: SP[16] }}>
        <button className="btn-primary" onClick={onComecar} style={{
          background: C.red, color: "#fff", border: "none", cursor: "pointer",
          borderRadius: BR.full, padding: "16px 30px",
          fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600,
        }}>
          Quero começar assim também →
        </button>
        <span style={{ ...TYPE.monoSM, color: C.textMuted, letterSpacing: "1px" }}>
          5 minutos · sem compromisso
        </span>
      </div>

      {/* O Léo fecha a seção em TEXTO. A história é real e mostra o alcance do
          método; a foto de palco é que não podia ficar no meio das outras. */}
      <p style={{
        ...TYPE.body, color: C.textSub, marginTop: SP[48], maxWidth: 640,
        paddingLeft: SP[16], borderLeft: `2px solid ${C.red}`,
      }}>
        E quando o objetivo é o palco, o método vai até lá: o <strong style={{ color: C.text, fontWeight: 600 }}>Léo</strong> procurou
        a consultoria querendo competir e virou bicampeão overall do Men&rsquo;s Physique.
        O objetivo era dele — o acompanhamento é o mesmo.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────
   DOBRA 3 — o que eu resolvo

   As quatro dores NÃO foram inventadas: são as opções que o próprio quiz do
   GL oferece na pergunta "você já tentou mudar o corpo antes, o que
   aconteceu?". Ou seja, são as palavras que os leads dele já escolhem — não
   as minhas. Copy que converte sai do vocabulário de quem lê.

   Seção COM movimento (a de prova, acima, é quieta). O ritmo alterna de
   propósito: nota "8 passos para tirar a cara de IA de um site".
───────────────────────────────────────── */
const DORES = [
  {
    titulo: "Comecei e não mantive",
    texto: "A consistência sempre foi o problema. O plano até existia — o que não existia era alguém percebendo quando ele parou de caber na sua semana.",
  },
  {
    titulo: "Me esforcei meses e não mudou quase nada",
    texto: "Esforço sem leitura vira desgaste. Sem medir o que está acontecendo, não dá para saber se falta ajuste ou falta tempo.",
  },
  {
    titulo: "Nunca tive acompanhamento real",
    texto: "Planilha genérica e vídeo de internet não sabem quem é você. Protocolo individual começa por perguntar, não por prescrever.",
  },
  {
    titulo: "Perdi e recuperei mais de uma vez",
    texto: "Todo protocolo agressivo funciona por um tempo. O que sustenta é o que você consegue manter depois que a novidade passa.",
  },
];

function Dores() {
  return (
    <section style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: `${SP[64]}px ${SP[24]}px` }}>
        <h2 style={{ ...TYPE.displayLG, maxWidth: 700 }}>
          SE VOCÊ SE RECONHECE AQUI,
          <span style={{ color: C.red }}> É COM ISSO QUE EU TRABALHO.</span>
        </h2>
        <div className="gl-dores" style={{ marginTop: SP[48] }}>
          {DORES.map((d, i) => (
            <div key={d.titulo} className={`anim-o${i + 1}`} style={{
              padding: SP[24], background: C.bg,
              border: `1px solid ${C.border}`, borderRadius: BR.lg,
            }}>
              <span style={{ ...TYPE.monoSM, color: C.red, letterSpacing: "2px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong style={{
                display: "block", marginTop: SP[12], color: C.text,
                fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 600, lineHeight: 1.35,
              }}>
                {d.titulo}
              </strong>
              <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[8] }}>{d.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DOBRA 4 — como funciona

   Três passos, e cada um é uma coisa que o sistema REALMENTE faz: protocolo
   individual por versão, check-in semanal lido e respondido, ajuste gravado.
   Nada aqui é promessa de brochura — é o que existe no GL SYSTEM.
───────────────────────────────────────── */
const PASSOS = [
  {
    n: "01",
    titulo: "Eu te conheço antes de prescrever",
    texto: "Anamnese, rotina real, histórico e o que já deu errado. O protocolo é montado depois disso — não antes.",
  },
  {
    n: "02",
    titulo: "Check-in toda semana",
    texto: "Você me conta como foi. Eu leio, respondo e registro. É esse retorno semanal que evita você passar um mês inteiro no caminho errado.",
  },
  {
    n: "03",
    titulo: "O plano muda quando a sua vida muda",
    texto: "Viagem, plantão, semana atípica, lesão. Ajuste faz parte do método — não é exceção nem recomeço.",
  },
];

function Metodo() {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: `${SP[64]}px ${SP[24]}px` }}>
      <div className="gl-metodo">
        <div>
          <h2 style={{ ...TYPE.displayLG }}>
            COMO FUNCIONA
          </h2>
          <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[16], maxWidth: 420 }}>
            Sem fórmula fechada e sem dieta de gaveta. O que existe é um processo
            que continua depois da primeira semana.
          </p>
          <img
            src="/prova/gl-frente.webp"
            alt="Gabriel Lincoln, responsável pela GL Consultoria"
            loading="lazy"
            style={{
              // Proporção travada: o arquivo é retrato alto (1100x1956) e, solto,
              // esticava a coluna da esquerda muito além dos três passos —
              // sobrava um vazio enorme à direita.
              width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center 20%",
              marginTop: SP[32], display: "block",
              borderRadius: BR.lg, border: `1px solid ${C.border}`,
            }}
          />
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: SP[24] }}>
          {PASSOS.map((p) => (
            <li key={p.n} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: SP[16], alignItems: "start" }}>
              <span style={{
                ...TYPE.monoSM, color: C.red, fontSize: 13, letterSpacing: "1px",
                border: `1px solid ${C.red}`, borderRadius: BR.full, padding: "6px 10px",
              }}>
                {p.n}
              </span>
              <div>
                <strong style={{
                  display: "block", color: C.text, fontFamily: "'Inter',sans-serif",
                  fontSize: 19, fontWeight: 600, lineHeight: 1.35,
                }}>
                  {p.titulo}
                </strong>
                <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[8] }}>{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DOBRA 5 — quem é o Gabriel

   NÃO é currículo. O GL foi explícito: "não o que eu faço, não o meu produto,
   mas o que eu resolvo". Então o texto fala do que muda para ela, e a foto do
   microfone faz o trabalho de autoridade sem uma linha de autoelogio —
   ninguém entrega microfone para quem só vende treino e dieta.
───────────────────────────────────────── */
function Quem() {
  return (
    <section style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div className="gl-quem" style={{ maxWidth: 1180, margin: "0 auto", padding: `${SP[64]}px ${SP[24]}px` }}>
        <img
          src="/prova/gl-palestra.webp"
          alt="Gabriel Lincoln falando em evento"
          loading="lazy"
          style={{
            width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center 25%",
            display: "block", borderRadius: BR.lg, border: `1px solid ${C.border}`,
          }}
        />
        <div>
          <span style={{ ...TYPE.monoSM, color: C.red, letterSpacing: "2px", textTransform: "uppercase" }}>
            Quem vai te acompanhar
          </span>
          <h2 style={{ ...TYPE.displayMD, marginTop: SP[12] }}>GABRIEL LINCOLN</h2>
          <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[16] }}>
            Eu não vendo treino e dieta. Isso é o material — qualquer um entrega.
            O que eu faço é ficar junto no meio do caminho, que é onde as coisas
            costumam desandar: a semana que virou, a viagem, o mês em que nada saiu
            como o planejado.
          </p>
          <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[16] }}>
            Trabalho com quem tem rotina difícil e pouca paciência para método que
            só funciona em condição ideal. Se para você o problema nunca foi saber
            o que fazer, e sim sustentar — é exatamente esse o meu trabalho.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DOBRA 6 — a entrada

   Aqui a regra do encaixe faz o trabalho pesado. O quiz É uma triagem, e
   esconder isso seria desonesto; o que muda é QUEM está sendo avaliado. A
   frase "se eu não for o caminho certo, eu te digo" transforma peneira em
   conversa — e é ela que derruba o medo de não ser escolhido, que foi a
   preocupação central do GL.
───────────────────────────────────────── */
function Entrada({ onComecar }) {
  return (
    <section style={{ maxWidth: 760, margin: "0 auto", padding: `${SP[80]}px ${SP[24]}px`, textAlign: "center" }}>
      <h2 style={{ ...TYPE.displayLG }}>
        O PRÓXIMO PASSO É
        <span style={{ color: C.red }}> UMA CONVERSA.</span>
      </h2>
      <p style={{ ...TYPE.body, color: C.textSub, marginTop: SP[24] }}>
        São cinco minutos de perguntas para eu entender a sua rotina, o seu
        histórico e o que já não funcionou. Não é teste e não tem resposta certa.
      </p>
      <p style={{ ...TYPE.body, color: C.text, marginTop: SP[16], fontWeight: 500 }}>
        Se eu não for o caminho certo pra você, eu te digo — e te aponto o que eu faria no seu lugar.
      </p>
      <div style={{ marginTop: SP[32], display: "flex", flexDirection: "column", alignItems: "center", gap: SP[12] }}>
        <button className="btn-primary" onClick={onComecar} style={{
          background: C.red, color: "#fff", border: "none", cursor: "pointer",
          borderRadius: BR.full, padding: "18px 38px",
          fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 600,
        }}>
          Começar as perguntas →
        </button>
        <span style={{ ...TYPE.monoSM, color: C.textMuted, letterSpacing: "1px" }}>
          Leva menos de 5 minutos · sem compromisso
        </span>
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
      <Prova onComecar={onComecar} />
      <Dores />
      <Metodo />
      <Quem />
      <Entrada onComecar={onComecar} />
    </div>
  );
}
