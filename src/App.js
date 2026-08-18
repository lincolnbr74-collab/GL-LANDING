import { useState } from "react";
import PaginaComercial from "./PaginaComercial";
import LandingPage, { GenderScreen } from "./LandingPage";

/**
 * A ordem que o GL desenhou (06/08/2026), com a PORTA acrescentada em
 * 17/08/2026:
 *
 *   link do Instagram → PORTA (homem/mulher) → PÁGINA COMERCIAL → quiz
 *
 * Pedido dele, no cofre: *"no momento que o cliente clica se é homem ou mulher,
 * ao invés de ele entrar naquela aba principal falando das mulheres, se ele
 * clicar em homem, ele cai em uma só pra homem"*.
 *
 * > A PERGUNTA NÃO É NOVA. Ela já era a primeira coisa que o quiz perguntava,
 * > e a cópia inteira do quiz já se adaptava a ela. O que mudou foi ONDE ela
 * > acontece: antes da página comercial, para que a página também possa se
 * > adaptar. Quem responde na porta não responde de novo no quiz.
 *
 * **O formato enviado NÃO mudou**, e isso é o que protege o funil: `genero`
 * continua saindo no mesmo campo, com os mesmos valores (`f`/`m`/`n`). O
 * `lib/tasks/importLeads.ts` do GL SYSTEM não precisa saber que isto existe.
 *
 * **O contador de perguntas também não muda.** `genero` nunca teve `step`, e a
 * barra de progresso conta só as telas de escolha e o formulário — as 7
 * perguntas continuam 7, e a promessa da intro continua verdade.
 *
 * Continua tudo no MESMO endereço, sem rota nova: o link que ele divulgou na
 * bio segue valendo, que foi a decisão de 06/08.
 */
export default function App() {
  const [etapa, setEtapa] = useState("porta");
  const [genero, setGenero] = useState(null);

  if (etapa === "porta") {
    return (
      <GenderScreen
        onAnswer={(_id, g) => {
          setGenero(g);
          setEtapa("comercial");
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (etapa === "quiz") return <LandingPage generoInicial={genero} />;

  return (
    <PaginaComercial
      publico={genero}
      onComecar={() => {
        setEtapa("quiz");
        window.scrollTo(0, 0);
      }}
    />
  );
}
