import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// El navegador no restaura el scroll abans que existeixin les animacions;
// l'àncora de la URL la gestiona HashScroll un cop tot està muntat.
// Nota: les entrades fan servir toggleActions "play none none none" i no
// once: true. Un ScrollTrigger "once" s'elimina sol quan es dispara, i si
// passa mentre se'n crea un altre (pàgina carregada ja desplaçada),
// ScrollTrigger.refresh falla i React desmunta tota la pàgina.
if (typeof window !== "undefined") ScrollTrigger.clearScrollMemory("manual");

export { gsap, ScrollTrigger, SplitText };
