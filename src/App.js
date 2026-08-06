import { useState } from "react";
import PaginaComercial from "./PaginaComercial";
import LandingPage from "./LandingPage";

/**
 * A ordem que o GL desenhou (06/08/2026):
 *   link do Instagram → PÁGINA COMERCIAL (desejo) → quiz (qualificação)
 *
 * Troca de tela no mesmo endereço, sem rota nova: o link que ele já divulgou
 * continua valendo, e quem chega cai sempre na página comercial. Um segundo
 * endereço obrigaria a trocar o link da bio e quebraria o que já está por aí.
 */
export default function App() {
  const [etapa, setEtapa] = useState("comercial");

  if (etapa === "quiz") return <LandingPage />;
  return <PaginaComercial onComecar={() => { setEtapa("quiz"); window.scrollTo(0, 0); }} />;
}
