import { useEffect, useRef, useState } from "react";
import { C, BR } from "./design";

/**
 * O mini chat do WhatsApp, SÓ para quem desiste do quiz (decisão do GL,
 * 28/10/2026: "só se desistir").
 *
 * A decisão de 06/08 continua de pé: o destino do clique é o quiz. Esta caixa
 * não aparece para quem está respondendo. Ela só sobe quando a pessoa para
 * numa pergunta (40 s sem tocar em nada) ou, no computador, quando o mouse
 * sai pela parte de cima da janela, que é o gesto de quem vai fechar a aba.
 * Uma vez por visita: depois de aparecer, não volta, nem se ela fechar.
 *
 * A mensagem que abre no WhatsApp leva "Vim pelo site". É essa frase que o
 * GL SYSTEM procura no webhook da Z-API para criar o lead no CRM
 * (MARCA_DA_LANDING em lib/zapiWebhook.ts). Se mudar aqui, muda lá.
 */
const NUMERO = "553384432052";
const OCIOSO_MS = 40000;
const CHAVE_VISTO = "gl-minichat-visto";

/** A resposta da pergunta 1 do quiz, escrita como a pessoa diria. */
const OBJETIVO = {
  a: "ganhar massa muscular",
  b: "perder gordura",
  c: "perder gordura e ganhar massa",
  d: "melhorar saúde e disposição",
};

function jaApareceu() {
  try { return sessionStorage.getItem(CHAVE_VISTO) === "1"; } catch { return false; }
}

function marcarQueApareceu() {
  // Aba privada pode recusar o sessionStorage: aí a caixa pode voltar na mesma visita, e só.
  try { sessionStorage.setItem(CHAVE_VISTO, "1"); } catch { /* sem armazenamento */ }
}

const CSS = `
  .gl-minichat {
    position:fixed; right:16px; bottom:calc(16px + env(safe-area-inset-bottom)); z-index:60;
    width:min(340px, calc(100vw - 32px)); box-sizing:border-box;
    background:${C.surface}; border:1px solid ${C.borderHover}; border-radius:${BR.lg}px;
    padding:20px 20px 18px; box-shadow:0 18px 40px rgba(0,0,0,0.6);
    animation:fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
  }
  .gl-minichat-titulo { margin:0 44px 6px 0; font-family:'Inter',sans-serif; font-size:18px; line-height:1.3; font-weight:600; color:${C.text}; }
  .gl-minichat-texto { margin:0 0 16px; font-family:'Inter',sans-serif; font-size:15px; line-height:1.5; color:${C.textRead}; }
  .gl-minichat-fechar {
    position:absolute; top:6px; right:6px; width:44px; height:44px;
    display:flex; align-items:center; justify-content:center;
    background:transparent; border:none; border-radius:${BR.md}px; color:${C.textSub}; cursor:pointer;
  }
  .gl-minichat-fechar:hover { color:${C.text}; }
  .gl-minichat-cta {
    display:flex; align-items:center; justify-content:center; gap:10px; min-height:48px;
    background:${C.redDark}; color:${C.text}; border-radius:${BR.md}px; text-decoration:none;
    font-family:'Inter',sans-serif; font-size:16px; font-weight:600;
    transition:background 0.2s ease;
  }
  .gl-minichat-cta:hover { background:${C.red}; }
  .gl-minichat-fechar:focus-visible, .gl-minichat-cta:focus-visible { outline:2px solid ${C.red}; outline-offset:3px; }
  @media (max-width: 480px) { .gl-minichat { left:16px; width:auto; } }
  @media (prefers-reduced-motion: reduce) { .gl-minichat { animation:none; } }
`;

export default function MiniChatWhatsApp({ ativo, tela, objetivoId }) {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef(null);

  // Quem volta a responder não pode achar a caixa por cima do "Continuar" (celular baixo,
  // navegador do Instagram): ela sai na pergunta seguinte e no primeiro toque fora dela.
  useEffect(() => { setAberto(false); }, [tela]);

  // O relógio recomeça a cada gesto e a cada pergunta nova: só conta quem PAROU.
  useEffect(() => {
    if (!ativo || aberto || jaApareceu()) return undefined;
    const abrir = () => { marcarQueApareceu(); setAberto(true); };
    let relogio = setTimeout(abrir, OCIOSO_MS);
    const mexeu = () => { clearTimeout(relogio); relogio = setTimeout(abrir, OCIOSO_MS); };
    const saindoPeloTopo = (e) => { if (!e.relatedTarget && e.clientY <= 0) abrir(); };
    const gestos = ["pointerdown", "keydown", "scroll", "touchstart"];
    gestos.forEach((g) => window.addEventListener(g, mexeu, { passive: true }));
    document.addEventListener("mouseout", saindoPeloTopo);
    return () => {
      clearTimeout(relogio);
      gestos.forEach((g) => window.removeEventListener(g, mexeu));
      document.removeEventListener("mouseout", saindoPeloTopo);
    };
  }, [ativo, aberto, tela]);

  useEffect(() => {
    if (!aberto) return undefined;
    const esc = (e) => { if (e.key === "Escape") setAberto(false); };
    const foraDela = (e) => { if (caixa.current && !caixa.current.contains(e.target)) setAberto(false); };
    window.addEventListener("keydown", esc);
    document.addEventListener("pointerdown", foraDela);
    return () => {
      window.removeEventListener("keydown", esc);
      document.removeEventListener("pointerdown", foraDela);
    };
  }, [aberto]);

  if (!aberto || !ativo) return null;

  const objetivo = OBJETIVO[objetivoId];
  const texto = objetivo
    ? `Oi! Vim pelo site e prefiro conversar por aqui. Meu objetivo é ${objetivo}.`
    : "Oi! Vim pelo site e prefiro conversar por aqui.";
  const link = `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`;

  return (
    <aside ref={caixa} className="gl-minichat" role="dialog" aria-modal="false" aria-labelledby="gl-minichat-titulo">
      <style>{CSS}</style>
      <button type="button" className="gl-minichat-fechar" aria-label="Fechar" onClick={() => setAberto(false)}>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <p id="gl-minichat-titulo" className="gl-minichat-titulo">Prefere conversar?</p>
      <p className="gl-minichat-texto">Me chama no WhatsApp. Quem responde sou eu.</p>
      <a className="gl-minichat-cta" href={link} target="_blank" rel="noopener noreferrer" onClick={() => setAberto(false)}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chamar no WhatsApp
      </a>
    </aside>
  );
}
