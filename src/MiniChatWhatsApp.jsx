import { C } from "./design";

/**
 * A saída pelo WhatsApp do quiz: um link discreto na PRIMEIRA tela do quiz, embaixo do
 * botão "Vamos lá" (decisão do GL, 28/10/2026).
 *
 * Duas versões já foram reprovadas no mesmo dia. A caixa que subia depois de 40 s
 * parado ("quem vai fazer isso?": no celular, quem desiste fecha a página e nenhuma
 * caixa alcança) e o link embaixo do formulário de contato ("não faz sentido colocar o
 * número depois que a pessoa respondeu tudo"). Quem prefere conversar tem de ver a
 * saída ANTES de começar. As perguntas seguem sem saída: o destino do clique é o quiz.
 *
 * A mensagem que abre no WhatsApp leva "Vim pelo site". É essa frase que o
 * GL SYSTEM procura no webhook da Z-API para criar o lead no CRM
 * (MARCA_DA_LANDING em lib/zapiWebhook.ts). Se mudar aqui, muda lá.
 */
const NUMERO = "553384432052";

/** Nenhuma pergunta foi respondida ainda: a mensagem não leva objetivo. */
const TEXTO = "Oi! Vim pelo site e prefiro conversar por aqui.";

const CSS = `
  .gl-whats-link {
    display:flex; align-items:center; justify-content:flex-start; flex-wrap:wrap; gap:4px 6px;
    min-height:44px; padding:6px 0;
    font-family:'Inter',sans-serif; font-size:15px; line-height:1.4;
    color:${C.textSub}; text-decoration:none; text-align:left;
  }
  .gl-whats-link-acao {
    display:inline-flex; align-items:center; gap:6px;
    color:${C.text}; font-weight:600;
    text-decoration:underline; text-underline-offset:3px; text-decoration-color:${C.textMuted};
  }
  .gl-whats-link:hover .gl-whats-link-acao { text-decoration-color:${C.text}; }
  .gl-whats-link:focus-visible { outline:2px solid ${C.red}; outline-offset:2px; border-radius:6px; }
`;

export default function MiniChatWhatsApp() {
  return (
    <a className="gl-whats-link" href={`https://wa.me/${NUMERO}?text=${encodeURIComponent(TEXTO)}`} target="_blank" rel="noopener noreferrer">
      <style>{CSS}</style>
      Prefere conversar?
      <span className="gl-whats-link-acao">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Me chama no WhatsApp
      </span>
    </a>
  );
}
