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
 * O QUE SAIU: o Léo, INTEIRO. Primeiro a foto de palco — troféu e palco diziam
 * "isto é para atleta" bem no meio da seção que existe para acolher quem nunca
 * manteve rotina. Sobrou uma frase no fim da seção, e em 06/08 o GL mandou
 * tirar essa também: sozinha ela lia como resto de construção, e carregava a
 * mesma régua que a foto carregava. O texto está no histórico do git.
 *
 * SOBRE PRAZO: a regra nasceu como "nenhum card tem tempo", porque o GL não
 * lembrava os prazos e prazo inventado é o tipo de número que ninguém confere
 * e que derruba tudo se for descoberto. Ela continua valendo para prazo que
 * eu não ouvi dele. Os dois que existem hoje — "a diferença da foto é de um
 * mês" e "procurou a GL em março" — vieram DELE, sobre alunas dele, e por isso
 * ficam. Nenhum outro entra sem ele dizer.
 */
export const PARES = [
  // ORDEM PENSADA PARA A ALTURA, 06/08 — o GL: "tem um espaço ali para duas
  // fotos, não pode ficar aquele vazio na landing page".
  //
  // Dois cards carregam fotos extras da mesma aluna e ficam mais altos. Antes
  // eles estavam em linhas diferentes, cada um ao lado de um card curto, e
  // sobrava um buraco em CADA linha. Agora os dois altos dividem a primeira
  // linha e os dois curtos a segunda: a diferença de altura fica ENTRE as
  // linhas, onde ninguém vê, em vez de ao lado, onde grita.
  //
  // De quebra, a página passa a abrir a prova pela Isis, que é a história
  // mais completa que existe aqui — três ângulos da mesma avaliação.
  {
    img: "/prova/aluna-frente.webp",
    // Isis — frente, costas e perfil da mesma avaliação, conferidas contra o
    // original em fontes-privadas.
    nome: "Isis",
    // REESCRITA em 06/08, a partir do relato que o GL ditou. Saiu a frase
    // "chegou pensando em cirurgia estética": ela não aparece na versão dele, e
    // no lugar dela ele falou em flacidez de pele. Detalhe que ninguém confere
    // é justamente o que não pode estar errado numa página de prova.
    chamada: "Já tinha emagrecido. Achava que teria que comer menos ainda",
    historia:
      "Foi obesa na adolescência e já tinha emagrecido quando me procurou. Queria condicionamento, firmeza de pele e músculo, mas chegou convencida de que o caminho era comer menos. Foi o contrário: comendo e treinando com acompanhamento, ela construiu o que a restrição não ia dar.",
    // Costas e perfil da MESMA avaliação. Ficam DENTRO do card de propósito:
    // numa faixa separada, o rótulo "a aluna acima" fica ambíguo com dois
    // cards em cima, e o leitor pode atribuir as fotos à pessoa errada.
    angulos: [
      { img: "/prova/aluna-costas.webp", alt: "Isis, vista de costas" },
      { img: "/prova/aluna-lado.webp", alt: "Isis, vista de perfil" },
    ],
    notaAngulos: "Costas e perfil da mesma avaliação. É assim que se vê que não foi enquadramento favorável.",
  },
  {
    // FOTO REFEITA DO ORIGINAL em 06/08. O GL abriu a página e disse: "a foto
    // lateral corta o glúteo dela". Estava certo, e a causa não era o CSS —
    // era o arquivo. O `aluna-perfil.webp` que estava aqui tinha 1000x540,
    // metade da altura de qualquer outra foto de prova: o corte que tirou o
    // rosto levou o glúteo junto, nos dois lados. O original inteiro sempre
    // esteve na pasta (`48F00866…JPG`, 2048x2048). Recortado de novo logo
    // abaixo do queixo: some o rosto, fica o corpo inteiro.
    //
    // Por que importa: numa lateral de antes e depois, o glúteo É a
    // comparação. Cortar ali é publicar a prova sem a parte que prova.
    img: "/prova/maria-eduarda-lateral.webp",
    // É ELA, confirmado pelo GL em 06/08 apontando este card: "essa é a Maria
    // Eduarda". Sem história ainda — card com foto e nome é honesto; frase
    // inventada sobre pessoa real, não.
    nome: "Maria Eduarda",
    // A HISTÓRIA VOLTOU PARA A DONA (06/08). Esta era a frase que estava no
    // card da Hemanoelly, e a suspeita registrada lá — "a história pode ter
    // sido contada sobre a Maria Eduarda e colada na foto errada junto com o
    // nome" — estava certa: o GL mandou o relato de cada aluna com o nome na
    // frente, e este é o dela.
    chamada: "A rotina nunca deixava treinar",
    historia:
      "Engordou, e o trabalho não tem horário. Não arrumamos a rotina dela: montamos uma dieta que cabe nela, com refeição que dá prazer. A consistência veio depois disso, não antes.",
    // A FOTO DA PISCINA, pedida pelo GL em 06/08: "é a mesma aluna do topper
    // preto, gostaria que colocasse também". Fica DENTRO do card dela, pelo
    // mesmo motivo do segundo card: solta, seria lida como mais uma aluna.
    //
    // O rosto saiu, cortado no pescoço. Era a única foto do conjunto com rosto
    // visível nos dois lados, e "nenhum rosto identificável" é decisão fechada
    // da página. Se o GL quiser com rosto, é trocar o arquivo — o original
    // está em `470c2dd0….jpeg`.
    angulos: [
      {
        img: "/prova/maria-eduarda-piscina.webp",
        alt: "A mesma aluna, de corpo inteiro, antes e depois",
      },
    ],
    notaAngulos: "A mesma aluna, de frente, antes e depois da mesma jornada.",
  },
{
    img: "/prova/aluna-cortina.webp",
    // QUEM É: Hemanoelly. O GL identificou renomeando o arquivo de origem, e
    // em 06/08 cobrou que o nome aparecesse ("as meninas que estão com nome
    // ainda estão Aluna GL").
    //
    // Este card já levou o nome ERRADO uma vez — dizia "Maria Eduarda", que é
    // outra pessoa, e o engano só apareceu porque o GL apontou a tela. Por
    // isso a identificação passou a ser conferida foto a foto contra o
    // original antes de qualquer nome entrar.
    //
    // SÓ O PRIMEIRO NOME, e isso vale para os quatro cards: sobrenome em cima
    // de foto de biquíni identifica a pessoa para qualquer busca. O primeiro
    // nome dá autoria à história sem entregar a mulher.
    nome: "Hemanoelly",
    // O original não tem rosto: ela está de costas para a câmera nos dois
    // lados. Já foi recortada "por segurança" uma vez, e o corte comia metade
    // do corpo — desfeito em 06/08.
    //
    // A HISTÓRIA QUE ESTAVA AQUI NÃO ERA DELA. Era a da Maria Eduarda ("a
    // rotina nunca deixava treinar"), colada neste card junto com o nome
    // errado. Em 06/08 o GL mandou o relato de cada aluna com o nome na
    // frente e a troca apareceu. A dela é esta, e é outra história inteira.
    //
    // O MÊS é dele, não meu: "em apenas um mês tivemos essa evolução". É o
    // único prazo da página — os outros cards continuam sem tempo porque ele
    // não lembrava, e prazo inventado quebra tudo se for conferido.
    chamada: "Já treinava pesado. Faltava saber o que era dela",
    historia:
      "Chegou avançada, com anos de treino e bastante massa muscular, mas seguindo o que servia para qualquer um, nunca o que o corpo dela pedia. Montei um protocolo direcionado para glúteo e posteriores de coxa. A diferença da foto é de um mês.",
  },
  {
    img: "/prova/aluna-lateral.webp",
    // Giovanna — conferida contra "GIOVANNA CAIRES 1.jpeg" em fontes-privadas.
    nome: "Giovanna",
    // História ditada pelo GL em 06/08. A chamada é o detalhe mais útil do
    // relato dele: ela chegou querendo COMPRAR OUTRA COISA (uma ficha de
    // treino) e recebeu acompanhamento. É a distância entre planilha e
    // consultoria, contada por um caso em vez de por adjetivo.
    chamada: "Chegou querendo só uma ficha de treino",
    historia:
      "Procurou a GL em março atrás de uma ficha, e saiu com treino e dieta montados para o caso dela: correção postural, posteriores de coxa e glúteo. Seguiu o protocolo sem sofrer na dieta, que é o que explica ela ter seguido até o fim.",
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
          ...TYPE.lead, color: C.textRead, marginTop: SP[24], maxWidth: 520,
        }}>
          Não é falta de informação. Você já ouviu de tudo. É que ninguém montou
          um plano para a <strong style={{ color: C.text, fontWeight: 600 }}>sua</strong> rotina
          e ficou por perto quando ela mudou.
        </p>

        <div className="anim-cta" style={{ marginTop: SP[32], display: "flex", flexWrap: "wrap", gap: SP[16], alignItems: "center" }}>
          <button className="btn-primary" onClick={onComecar} style={{
            background: C.red, color: "#fff", border: "none", cursor: "pointer",
            borderRadius: BR.full, padding: "18px 34px",
            fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 600,
          }}>
            Quero um plano pra mim →
          </button>
          {/* Diz o custo antes de pedir o clique: tempo e o que acontece
              depois. Ninguém entra em formulário sem saber onde vai dar. */}
          <span style={{ ...TYPE.monoSM, color: C.textMuted, letterSpacing: "1px" }}>
            Menos de 5 minutos · sem compromisso
          </span>
        </div>
      </div>

      {/* O retrato abre a página, e não um corpo. O título diz "o que nunca
          teve foi ALGUÉM JUNTO" — e a pessoa ao lado é a resposta literal da
          frase. Corpo aqui faria a página parecer sobre estética; rosto faz
          ela parecer sobre acompanhamento, que é o que ele vende.

          TROCA DE 06/08, pedida pelo GL: a foto do microfone, que estava lá
          embaixo em "quem vai te acompanhar", passa a ABRIR a página, e a de
          camiseta branca desce para o lugar dela. Ele pediu literalmente
          "inverter" as duas.
          Ganho de leitura: quem chega do Instagram vê autoridade antes de ler
          qualquer linha — ninguém entrega microfone para quem só vende treino
          e dieta — e a foto de camiseta, mais próxima e olhando na câmera,
          passa a ficar exatamente onde ele se apresenta pessoalmente.

          Recortada em 4/5: o arquivo é 1100x1650 e, solto, empurrava a dobra 1
          para ~900px de altura no desktop, jogando o botão para fora da tela.
          O corte tira só borda de teto e de chão — cabeça, microfone e joelho
          continuam dentro. */}
      <div className="anim-sub gl-hero-foto">
        <img
          src="/prova/gl-palestra.webp"
          alt="Gabriel Lincoln falando com o microfone na mão, em evento"
          width={1100}
          height={1375}
          style={{
            width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center 20%",
            height: "auto", display: "block",
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
   sem atacar ninguém — e as histórias são a mesma tese em contextos
   diferentes: uma venceu o medo de comer, outra venceu a rotina impossível.
   (Havia uma terceira, do Léo indo ao palco; saiu em 06/08 — ver o cabeçalho
   de PARES.)

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
      <p style={{ ...TYPE.lead, color: C.textSub, marginTop: SP[16], maxWidth: 620 }}>
        Pontos de partida diferentes. Nenhuma delas passou fome para chegar aqui.
      </p>

      <div className="gl-prova-grade" style={{ marginTop: SP[48] }}>
        {PARES.map((p) => (
          <figure key={p.img} className="gl-prova-card" style={{ margin: 0 }}>
            {/* A foto vive DENTRO de uma caixa de altura fixa, contida e nunca
                recortada (ver `.gl-foto-caixa` no design.js). É o que alinha os
                nomes dos quatro cards na mesma linha sem cortar prova nenhuma. */}
            <div className="gl-foto-caixa">
              <img
                src={p.img}
                alt={`Antes e depois de ${p.nome}`}
                loading="lazy"
              />
            </div>
            <figcaption style={{ marginTop: SP[16] }}>
              <span style={{ ...TYPE.monoSM, color: C.red, letterSpacing: "2px", textTransform: "uppercase", display: "block" }}>
                {p.nome}
              </span>
              {p.chamada && (
                <strong style={{
                  ...TYPE.cardTitle,
                  display: "block", marginTop: SP[8], color: C.text,
                }}>
                  {p.chamada}
                </strong>
              )}
              {p.historia && (
                <p style={{
                  ...TYPE.bodyRead, color: C.textRead, marginTop: SP[12],
                }}>
                  {p.historia}
                </p>
              )}
              {p.angulos && (
                <div style={{ marginTop: SP[16] }}>
                  {/* A faixa nasceu com DUAS colunas fixas (costas + perfil da
                      mesma avaliação). Com uma foto só — o caso da piscina da
                      Maria Eduarda — ela ficava espremida em meia largura, com
                      um buraco do lado. O número de colunas passa a seguir o
                      número de fotos. */}
                  <div
                    className="gl-prova-faixa"
                    style={p.angulos.length === 1 ? { gridTemplateColumns: "minmax(0, 1fr)" } : undefined}
                  >
                    {p.angulos.map((a) => (
                      <img
                        key={a.img}
                        src={a.img}
                        alt={a.alt}
                        loading="lazy"
                        style={{
                          // Sem proporção forçada: mesmo em miniatura, um antes
                          // e depois cortado ao meio deixa de ser comparação.
                          width: "100%", height: "auto", display: "block",
                          borderRadius: BR.md, border: `1px solid ${C.border}`,
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
          Menos de 5 minutos · sem compromisso
        </span>
      </div>

      {/* O LÉO SAIU INTEIRO (06/08, decisão do GL). A foto de palco já tinha
          saído por dizer "isto é para atleta" no meio da seção que existe para
          acolher quem nunca manteve rotina; a frase sobrevivente carregava o
          mesmo peso e ficou lendo como resto de construção. Não reabrir sem ele
          pedir — o texto está no histórico do git se um dia voltar. */}
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
    texto: "A consistência sempre foi o problema. O plano até existia. O que não existia era alguém percebendo quando ele parou de caber na sua semana.",
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
                ...TYPE.cardTitle,
                display: "block", marginTop: SP[12], color: C.text,
              }}>
                {d.titulo}
              </strong>
              <p style={{ ...TYPE.bodyRead, color: C.textSub, marginTop: SP[12] }}>{d.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DOBRA 4 — como funciona

   REESCRITA EM 06/08. O GL abriu a página e disse: "COMO FUNCIONA está muito
   vago e carente de informações do que realmente fazemos". Estava certo — a
   seção tinha três passos que qualquer consultoria do Instagram assinaria
   ("eu te conheço antes de prescrever", "check-in toda semana", "o plano
   muda"). Nenhum deles dizia o que a pessoa RECEBE.

   Os sete passos abaixo são a lista que ele ditou, sem invenção nenhuma:
   anamnese, treino e dieta por aplicativo, dieta prescrita por nutricionista,
   WhatsApp individualizado, correção de execução, leitura de exame
   laboratorial, check-in semanal, check shape (comparativo de evolução),
   feedback e atualização mensal dos planos.

   Por que sete e não três: aqui a pessoa já se reconheceu nas dores e viu a
   prova. Esta é a dobra em que ela quer saber o que compra. Vago no lugar
   errado custa caro — vago AQUI é o que faz ela sair para perguntar no direct.

   Regra mantida: nada de promessa de brochura. Cada linha é coisa que já
   existe (as sete estão no GL SYSTEM ou no dia a dia dele).
───────────────────────────────────────── */
const PASSOS = [
  {
    n: "01",
    titulo: "Anamnese antes de qualquer prescrição",
    texto: "Rotina real, histórico, lesão, remédio, o que já deu errado, e o seu exame de sangue, quando você tem. Eu leio o laudo e o protocolo sai depois disso, não antes.",
  },
  {
    n: "02",
    titulo: "Treino e dieta no aplicativo",
    texto: "Série, carga, progressão e vídeo de execução na mão, no dia. Nada de PDF que envelhece na galeria do celular.",
  },
  {
    n: "03",
    titulo: "A dieta é prescrita por nutricionista",
    texto: "Quem prescreve a sua dieta é nutricionista com registro, não um treinador chutando caloria. Com substituição pronta para o dia em que a comida do plano não existe.",
    // O GL mandou foto e CRN em 06/08. Nome e número saíram do PDF de
    // assinatura dele (`public/prova/CRN Rogério Nutri.pdf`), copiados letra
    // por letra — registro profissional é dado conferível e não se aproxima.
    //
    // O rosto vale mais que a frase: "prescrita por nutricionista" é o que toda
    // consultoria escreve. Com nome, cara e número, vira coisa que a leitora
    // pode conferir no site do CRN — e é exatamente esse o efeito.
    credencial: {
      foto: "/prova/nutri-rogerio.webp",
      nome: "Rogério do Nascimento",
      registro: "Nutricionista · CRN 11679",
    },
  },
  {
    n: "04",
    titulo: "WhatsApp direto comigo",
    texto: "Dúvida no meio do treino, cardápio de restaurante, plantão que virou a noite. Você fala comigo, não com atendente, não com grupo, não com robô.",
  },
  {
    n: "05",
    titulo: "Correção de execução",
    texto: "Você grava a série e eu assisto. Técnica errada é o que faz treinar muito e mudar pouco. E é o que machuca quem estava indo bem.",
  },
  {
    n: "06",
    titulo: "Check-in toda semana",
    texto: "Você me conta como foi. Eu leio, respondo e registro. É esse retorno semanal que evita você passar um mês inteiro no caminho errado.",
  },
  {
    n: "07",
    titulo: "Check shape e plano novo todo mês",
    texto: "Comparativo de evolução lado a lado, feedback do que mudou e treino e dieta atualizados. E, no meio do mês, se a sua vida virar: viagem, lesão, semana atípica. Ajuste faz parte do método, não é exceção nem recomeço.",
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
          <p style={{ ...TYPE.lead, color: C.textSub, marginTop: SP[16], maxWidth: 460 }}>
            Sem fórmula fechada e sem dieta de gaveta. Isto é o que você recebe,
            item por item, e o que continua acontecendo depois da primeira
            semana.
          </p>
          {/* A FOTO DO NOTEBOOK, pedida pelo GL em 06/08 para esta seção. Ela
              diz "acompanhamento" melhor que qualquer retrato: é ele com a
              ferramenta na mão, na dobra que explica o trabalho.

              A TELA ESTÁ COBERTA, de propósito. O arquivo original mostra a
              tela de bloqueio do Windows, com relógio e data — e o GL foi
              explícito: "não gostaria de colocar o fundo com o Windows da
              imagem". A cobertura é um quadrilátero em clip-path, com os quatro
              cantos medidos no arquivo (o notebook está levemente inclinado, um
              retângulo reto não encaixaria). Como está em %, acompanha a foto
              em qualquer largura.

              É NESSE ESPAÇO que entram os prints de depoimento que ele vai
              anexar. Enquanto não chegam, a tela fica apagada — que é honesto e
              não finge conteúdo nenhum.

              Sobre a foto ser de estúdio, com fundo claro: é o único ponto
              claro da página, e por isso mesmo prende o olho na dobra em que a
              pessoa decide se vale continuar lendo. */}
          <div style={{ position: "relative", marginTop: SP[32], borderRadius: BR.lg, overflow: "hidden", border: `1px solid ${C.border}` }}>
            <img
              src="/prova/gl-notebook.webp"
              alt="Gabriel Lincoln com o notebook na mão, onde acompanha os alunos"
              loading="lazy"
              width={1100}
              height={1375}
              style={{
                // O arquivo JÁ é 4/5 (1100x1375), recortado no disco: sem corte
                // no navegador, os cantos da tela caem sempre no mesmo lugar e
                // a cobertura em % nunca sai do sítio.
                width: "100%", height: "auto", display: "block",
              }}
            />
            {/* A TELA, agora com a marca em vez de retângulo preto (06/08).

                O GL: "colocar a minha logo nela, alguma coisa em relação à
                consultoria, não deixar a tela preta". Retângulo preto no meio
                de uma foto clara lê como defeito — o olho procura conteúdo ali
                e não acha nada.

                É SVG e não HTML de propósito: o `viewBox` é o tamanho exato do
                arquivo (1100x1375), então tudo que é desenhado aqui usa as
                MESMAS coordenadas do polígono medido na foto, e escala junto
                com a imagem em qualquer largura, sem media query nenhuma.

                O que está na tela é a marca, não um print de produto: inventar
                uma tela de app que não existe seria a página prometer uma coisa
                e a consultoria entregar outra. Quando os prints de depoimento
                que ele vai anexar chegarem, eles entram AQUI, no lugar da
                marca — as coordenadas já estão prontas. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1100 1375"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <defs>
                <linearGradient id="glTela" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#17171e" />
                  <stop offset="55%" stopColor="#0d0d11" />
                  <stop offset="100%" stopColor="#08080a" />
                </linearGradient>
                {/* Brilho vermelho fraco atrás da marca: sem ele a tela fica
                    chapada e parece desligada, com o logotipo colado por cima. */}
                <radialGradient id="glBrilho" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E10A1F" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#E10A1F" stopOpacity="0" />
                </radialGradient>
                <clipPath id="glRecorteTela">
                  {/* Os quatro cantos da tela, medidos no arquivo. O notebook
                      está levemente inclinado — retângulo reto não encaixa. */}
                  <polygon points="508,466 977,470 975,732 507,725" />
                </clipPath>
              </defs>

              <g clipPath="url(#glRecorteTela)">
                {/* O PAPEL DE PAREDE DO GL (06/08). Ele mandou a arte 3D da
                    marca e pediu: "coloca como se fosse o fundo da minha tela
                    de trabalho, com a opacidade um pouco mais baixa para
                    parecer que está na tela do computador".

                    Substituiu o símbolo solto que estava aqui. É melhor por
                    dois motivos: já traz o lockup inteiro (GABRIEL LINCOLN,
                    TREINADOR), e um papel de parede é o que de fato aparece
                    numa tela de trabalho — símbolo centralizado em fundo liso
                    lê como tela de carregamento parada.

                    Recortado de 2000x1200 para 1.767, que é a proporção medida
                    da tela nesta foto: 34px fora em cima e embaixo, e a arte
                    fica no eixo. Sem esticar nada.

                    A OPACIDADE em 0.82, com um véu escuro por cima: tela de
                    verdade nunca é tão saturada quanto o arquivo original, e o
                    branco cheio brigaria com a foto clara do estúdio. */}
                <rect x="500" y="460" width="490" height="280" fill="#08080a" />
                <image
                  href="/marca/gl-tela.webp"
                  x="500" y="458" width="490" height="280"
                  preserveAspectRatio="xMidYMid slice"
                  opacity="0.82"
                />
                {/* Véu: assenta a arte na cena e tira o ar de imagem colada. */}
                <rect x="500" y="460" width="490" height="280" fill="#08080a" opacity="0.18" />
                {/* O FILETE DE BRILHO NO TOPO SAIU (06/08). A ideia era simular
                    o reflexo do vidro para a tela parecer acesa; na prática
                    virou uma faixa clara com borda visível na altura do
                    cabeçalho do papel de parede — o GL viu na hora: "a parte de
                    cima está um pouquinho mais clara do que o restante".

                    Reflexo de vidro real é gradiente, não bloco. Um retângulo
                    de opacidade fixa sempre vai desenhar uma linha onde acaba.
                    Como a tela já lê como acesa por causa do véu e do contraste
                    com a moldura escura, o filete só tinha a perder. */}
              </g>
            </svg>
          </div>
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
                  ...TYPE.cardTitle,
                }}>
                  {p.titulo}
                </strong>
                <p style={{ ...TYPE.bodyRead, color: C.textSub, marginTop: SP[12] }}>{p.texto}</p>
                {/* CREDENCIAL — só o passo do nutri tem. Fica dentro do passo,
                    e não numa seção própria: solta, ela viraria "conheça a
                    equipe" e roubaria o assunto da dobra, que é o que a pessoa
                    recebe. */}
                {p.credencial && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: SP[12],
                    marginTop: SP[16], padding: SP[12],
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: BR.md,
                  }}>
                    <img
                      src={p.credencial.foto}
                      alt={`${p.credencial.nome}, nutricionista da GL Consultoria`}
                      loading="lazy"
                      width={56}
                      height={56}
                      style={{
                        width: 56, height: 56, flexShrink: 0, objectFit: "cover",
                        borderRadius: "50%", border: `1px solid ${C.borderHover}`,
                        display: "block",
                      }}
                    />
                    <div>
                      <strong style={{
                        display: "block", color: C.text, fontFamily: "'Inter',sans-serif",
                        fontSize: 15, fontWeight: 600, lineHeight: 1.3,
                      }}>
                        {p.credencial.nome}
                      </strong>
                      <span style={{
                        ...TYPE.monoSM, display: "block", marginTop: 4,
                        color: C.textMuted, letterSpacing: "1px",
                      }}>
                        {p.credencial.registro}
                      </span>
                    </div>
                  </div>
                )}
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
        {/* A CAMISETA BRANCA DESCEU PARA CÁ (06/08, "inverter" pedido pelo GL —
            ver o comentário na dobra 1). É a foto mais próxima do conjunto:
            olhando na câmera, em academia real, sem palco. É o rosto certo para
            a seção em que ele se apresenta e conta do que teve medo. */}
        <img
          src="/prova/gl-frente.webp"
          alt="Gabriel Lincoln, treinador responsável pela consultoria"
          loading="lazy"
          style={{
            width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center 30%",
            display: "block", borderRadius: BR.lg, border: `1px solid ${C.border}`,
          }}
        />
        <div>
          <span style={{ ...TYPE.monoSM, color: C.red, letterSpacing: "2px", textTransform: "uppercase" }}>
            Quem vai te acompanhar
          </span>
          <h2 style={{ ...TYPE.displayMD, marginTop: SP[12] }}>GABRIEL LINCOLN</h2>

          {/*
            Escrito a partir de um texto do próprio GL (06/08), quase palavra
            por palavra. A ponte não é retórica: o menino que achava que não se
            encaixava É a leitora que acha que não seria selecionada. É a mesma
            insegurança, e é por isso que ela funciona aqui — não porque
            comove, mas porque explica por que esta consultoria não exige que
            ninguém se encaixe em nada.
          */}
          <p style={{ ...TYPE.bodyRead, color: C.textRead, marginTop: SP[16] }}>
            Eu fui o menino que tinha medo. Que se sentia estranho, que achava que
            não se encaixava.
          </p>
          <p style={{ ...TYPE.bodyRead, color: C.textRead, marginTop: SP[16] }}>
            Demorei para entender que aquilo não era fraqueza. Era fase, era
            construção, e ninguém me disse isso na época.
          </p>
          {/*
            CREDENCIAL, acrescentada em 06/08 com os dados do próprio GL.

            A seção tinha vulnerabilidade e zero competência. São DUAS perguntas
            diferentes na cabeça de quem lê — "esse cara me entende?" e "esse
            cara sabe o que faz?" — e a página só respondia a primeira, para
            alguém que está decidindo entregar o corpo dela a um estranho da
            internet.

            Vem DEPOIS do medo, não antes: antes seria currículo; depois, é
            alguém que já provou que sabe escolhendo falar do que teve medo.

            O número não é placar. Ele existe para provar de onde saiu o título
            da página ("o que nunca teve foi alguém junto"): 300 pessoas, seis
            países, sempre o mesmo buraco. Deixa de dizer "eu sou grande" e passa
            a dizer "eu já vi o seu caso".

            A ressalva do fisiculturismo NÃO é modéstia — é a mesma razão que
            tirou a foto de palco do Léo da prova. Sozinha, a palavra dispara
            "isto é para atleta, não é para mim" na leitora que a página existe
            para acolher. Sem essa segunda frase, eu não colocaria a primeira.
          */}
          <p style={{ ...TYPE.bodyRead, color: C.textRead, marginTop: SP[16] }}>
            Sou formado em Educação Física e fui atleta de fisiculturismo. Faço
            isso há mais de dez anos. Já acompanhei mais de 300 pessoas, em seis
            países, e o que trava é quase sempre a mesma coisa: ninguém do lado.
          </p>
          <p style={{ ...TYPE.bodyRead, color: C.textRead, marginTop: SP[16] }}>
            O fisiculturismo me ensinou o método. Não é o que eu vendo. Quase
            ninguém que eu atendo quer subir num palco.
          </p>
          <p style={{ ...TYPE.bodyRead, color: C.textRead, marginTop: SP[16] }}>
            É por isso que aqui você não precisa se encaixar em nada. Nem em dieta
            impossível, nem em rotina de atleta, nem num padrão que outra pessoa
            inventou. Você não precisa ser a mais disciplinada do mundo. Precisa
            ser comprometida com o seu próprio processo.
          </p>
          <p style={{ ...TYPE.bodyRead, color: C.text, marginTop: SP[16], fontWeight: 500 }}>
            O meu trabalho é ficar do seu lado enquanto isso acontece.
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
      <p style={{ ...TYPE.lead, color: C.textRead, marginTop: SP[24] }}>
        São menos de cinco minutos de perguntas para eu entender a sua rotina,
        o seu histórico e o que já não funcionou. Não é teste e não tem resposta
        certa.
      </p>
      <p style={{ ...TYPE.lead, color: C.text, marginTop: SP[16], fontWeight: 500 }}>
        Se eu não for o caminho certo pra você, eu te digo, e te aponto o que eu faria no seu lugar.
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

/**
 * @param publico "f" | "m" | "n" | null — quem respondeu na porta (17/08/2026).
 *
 * Só UMA dobra depende do público, e é a Prova: as quatro histórias são de
 * ALUNAS reais, com foto e relato que o GL entregou. As outras cinco (Hero,
 * Dores, Método, Quem, Entrada) foram escritas em linguagem neutra desde o
 * começo e servem aos dois sem uma palavra trocada — conferido linha a linha
 * antes de mexer.
 *
 * > A PROVA NÃO É REESCRITA PARA HOMEM. Não existe antes-e-depois de aluno
 * > homem neste repositório, e depoimento não se inventa: seria uma pessoa que
 * > não existe dizendo um resultado que não aconteceu. Para o público
 * > masculino a dobra simplesmente NÃO É DESENHADA, e a página segue com as
 * > outras cinco.
 *
 * **O que falta é conteúdo, e é do GL:** fotos de antes e depois de alunos
 * homens, com o relato de cada um, no mesmo formato do `PARES`. No dia em que
 * elas existirem, esta é a única linha que muda.
 */
export default function PaginaComercial({ onComecar, publico = null }) {
  // "n" (prefiro não informar) vê a prova que existe: esconder a dobra mais
  // forte de quem não quis se classificar seria punir a discrição.
  const mostrarProva = publico !== "m";

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
      {mostrarProva && <Prova onComecar={onComecar} />}
      <Dores />
      <Metodo />
      <Quem />
      <Entrada onComecar={onComecar} />
    </div>
  );
}
