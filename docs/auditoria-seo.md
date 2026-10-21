# Auditoria SEO de bieldiazbasullas.com

*Data: 21 d'octubre de 2026 · Abast: web publicada (`main`) i branca `feature/serveis-sense-preus`*

> **Com llegir aquest document**
> - No hi ha cap eina de SEO connectada (Ahrefs o Semrush) i la web no té Search Console. Per això **els volums de cerca són estimacions per rangs**.
> - La **dificultat** s'ha valorat mirant qui surt realment a Google per a cada cerca.
> - Per tenir xifres reals: connectar Ahrefs (el connector ja està instal·lat i només falta iniciar-hi sessió) o donar d'alta Search Console.

---

## Resum

**La web avui no apareix a Google per a res, ni tan sols si busques el nom.** No surten resultats amb `site:bieldiazbasullas.com` ni amb "Biel Diaz Basullas". La versió publicada (`main`) té problemes que impedeixen que l'indexin bé. La branca nova n'arregla la majoria, però encara en falta un de crític.

**La bona notícia:** a les cerques locals (Manresa i el Bages) hi surten sobretot directoris (Trustlocal, Proveedores.com) i agències petites amb webs senzilles. La competència és baixa i s'hi pot entrar ràpid.

**Les 3 prioritats:**

1. Publicar la branca i que el contingut vingui escrit dins de l'HTML, no només generat amb JavaScript.
2. Orientar la web a cerques locals ("disseny web Manresa", "pàgines web Bages").
3. Crear una pàgina pròpia per a cada servei.

---

## 1. Paraules clau

*Volum: cerques al mes a Espanya, **estimat per rangs**. Dificultat: segons qui surt avui a Google.*

| # | Paraula clau | Volum (est.) | Dificultat | Qui hi surt avui | Intenció | Oportunitat | On posar-la |
|---|---|---|---|---|---|---|---|
| 1 | diseño web Manresa | 100–300 | 🟢 Baixa | Directoris, Mecexis, Space Bits | Comercial | **Alta** | Inici (ES) + pàgina local |
| 2 | páginas web Manresa / pàgines web Manresa | 50–150 | 🟢 Baixa | Directoris, agències petites | Comercial | **Alta** | Pàgina local |
| 3 | disseny web Manresa / Bages | 20–70 | 🟢 Molt baixa | Directoris, Walaweb, Marcvirtual | Comercial | **Alta** | Inici (CA) |
| 4 | programador web Manresa | 10–50 | 🟢 Molt baixa | Ofertes de feina, cursos | Comercial | **Alta** | Inici + "Sobre mi" |
| 5 | diseño web WordPress Manresa | 10–50 | 🟢 Baixa | Creacions web Ramon, Walaweb | Comercial | **Alta** | Pàgina del servei WordPress |
| 6 | posicionamiento SEO Manresa | 50–150 | 🟡 Mitjana-baixa | Aritmetic, Net Engineer | Comercial | **Alta** | Pàgina del servei SEO |
| 7 | software gestión club atletismo / escuela deportiva | 10–50 | 🟡 Mitjana-baixa | Clupik, Engage Sports | Comercial | **Alta** | Cas d'èxit de CamEscola |
| 8 | programa gimnasio pago único / sin cuotas | 10–50 | 🟢 Baixa | Poques respostes directes | Transaccional | **Alta** (Repwise) | Cas de Repwise |
| 9 | quant costa una pàgina web | 50–150 | 🟢 Baixa (en català) | Pocs textos en català | Informativa | **Alta** | Article del blog |
| 10 | diseño web Sant Fruitós de Bages | <20 | 🟢 Mínima | Res específic | Comercial | Mitjana | Pàgina local |
| 11 | app gestión entrenador personal | 100–300 | 🟠 Mitjana-alta | Anolla, Carepatron, Koalendar | Comercial | Mitjana | Cas de Sergi Garcia + Repwise |
| 12 | software reservas clases pilates / yoga pequeño | 50–150 | 🟠 Mitjana | Programes generalistes | Comercial | Mitjana | Pàgina del servei gimnasos |
| 13 | desarrollador web freelance Barcelona | 100–300 | 🟠 Mitjana | Malt, Behance, Trustlocal | Comercial | Mitjana | Inici (ES) |
| 14 | web portfolio a medida para fotógrafos / diseñadores | 50–150 | 🟠 Mitjana | Plantilles (Wix, Squarespace) | Comercial | Mitjana | Pàgina del servei portfolis |
| 15 | fitxa de Google Business com optimitzar-la | 50–150 | 🟢 Baixa (en català) | Pocs textos en català | Informativa | Mitjana | Article del blog |
| 16 | juego mánager baloncesto online gratis | 100–500 | 🟠 Mitjana | Jocs establerts | Transaccional | Mitjana (és un altre domini) | Fitxa de Swish & Legacy |
| 17 | cuánto cuesta una página web | 1k–3k | 🔴 Alta | Agències grans, mitjans | Informativa | Baixa-mitjana | Article del blog (castellà) |
| 18 | aplicaciones a medida para pymes | 500–1k | 🔴 Alta | Agències, Duotach, directoris | Comercial | Baixa | Pàgina del servei pimes (a llarg termini) |
| 19 | software gestión gimnasio | 1k–3k | 🔴 Molt alta | Capterra, Virtuagym, ClickUp | Comercial | Baixa | No competir-hi directament |
| 20 | Biel Díaz Basullas (el nom) | <20 | 🟢 Mínima | No hi surt res | Navegacional | **Alta** (és la més fàcil) | Inici; només cal que l'indexin |

**Conclusió:** l'estratègia guanyadora és **local i en català o castellà local** (Manresa, Bages, Sant Fruitós), més **nínxols molt concrets** on ja hi ha un producte o un cas real. Els termes genèrics nacionals (com "software gestión gimnasio") estan dominats per Capterra i grans empreses: no val la pena atacar-los de cara.

---

## 2. Errors i solucions

### 2.1 A la web publicada ara (`main`)

| Problema | Gravetat | Solució | Estat |
|---|---|---|---|
| El cos de l'HTML és buit (`<div id="root">`) i tot el contingut el genera JavaScript | 🔴 Crític | Generar l'HTML amb el contingut ja escrit en fer el build | ❌ Pendent, també a la branca |
| No surt a Google ni pel nom | 🔴 Crític | Publicar la branca, donar d'alta Search Console i enviar el sitemap | Pendent (manual) |
| `robots.txt` retorna la pàgina web en lloc del fitxer | 🔴 Crític | `robots.txt` real | ✅ Arreglat a la branca |
| `lang="en"` en una web en català, sense descripció i títol genèric "Biel Diaz Basullas" | 🔴 Alt | Etiquetes per pàgina i idioma | ✅ Arreglat a la branca |
| Les etiquetes d'idioma apunten a `/ca`, `/es` i `/en`, que no existeixen: retornen l'inici amb codi 200 | 🔴 Alt | URL reals per idioma i 404 de veritat | ✅ Arreglat a la branca |
| `www.bieldiazbasullas.com` i `bieldiazbasullas.com` responen tots dos: contingut duplicat | 🟠 Alt | Redirecció 301 de `www` cap a l'adreça sense `www`, a Cloudflare | Pendent (manual, tauler de Cloudflare) |
| El sitemap només té l'inici | 🟡 Mitjà | Sitemap de 12 URL amb els idiomes | ✅ Arreglat a la branca |

### 2.2 A la branca, encara pendent

| Problema | Gravetat | Solució proposada |
|---|---|---|
| **Contingut no escrit a l'HTML**: Google executa JavaScript, però tard i no sempre; Bing i els cercadors d'IA (ChatGPT, Perplexity) sovint no ho fan | 🔴 Crític | Fer que el build generi l'HTML amb tot el text de cada pàgina, i que després React només hi afegeixi la interacció |
| Una sola URL per idioma per a 6 serveis: no es pot aparèixer per "diseño web WordPress Manresa" ni per "SEO Manresa" | 🟠 Alt | Una pàgina per servei (`/serveis/apps-de-gestio`, etc.) amb 400–700 paraules, preguntes freqüents i un projecte relacionat |
| El títol i el títol principal de l'inici no diuen on es treballa ("Webs i apps a mida.") | 🟠 Alt | Títol de pestanya: "Disseny web i apps a mida a Manresa i el Bages \| Biel Díaz". Afegir "a Manresa i el Bages" a la frase sota el títol |
| Poc contingut (~700 paraules, la majoria d'interfície) | 🟡 Mitjà | Afegir una secció de preguntes freqüents a l'inici (terminis, què cal per començar, manteniment, WordPress o a mida) |
| Els projectes enllacen fora, sense pàgines de cas d'èxit | 🟡 Mitjà | Una pàgina per projecte: el problema, la solució i el resultat. Cobreixen cerques com "software club atletisme" |
| Dades estructurades només de persona | 🟡 Mitjà | Afegir el tipus de negoci local (`ProfessionalService`) amb les zones de treball (Manresa, Bages, Barcelona), preguntes freqüents (`FAQPage`) i la llista de serveis |
| Nom inconsistent: "Biel Díaz" a les etiquetes i textos legals, "Biel Diaz" a la resta | 🟡 Mitjà | Triar-ne una forma i fer-la servir arreu (web, LinkedIn, Google Business). Google relaciona millor el nom si sempre és igual |
| El loader podria endarrerir la mesura de velocitat de càrrega (LCP) a la primera visita | 🟡 Mitjà | Mesurar amb PageSpeed Insights després de publicar. Si passa de 2,5 s, mostrar el contingut del hero sota el loader des del principi |
| La política de privacitat no diu que hi ha **Cloudflare Web Analytics** actiu | 🟡 Mitjà (legal) | Mencionar-lo. No fa servir cookies, així que no cal bàner |
| 50 MB de vídeos antics a `public/` que es publiquen sense fer-se servir | 🟢 Baix | Esborrar-los |
| JavaScript de 480 KB (160 KB comprimit) | 🟢 Baix | Acceptable; es pot dividir el codi de les animacions més endavant |

---

## 3. Contingut que falta

| Tema | Per què | Format | Prioritat | Esforç |
|---|---|---|---|---|
| Disseny web a Manresa i el Bages | Competència feble, intenció de compra | Pàgina local | 🔴 Alta | Mig dia |
| Una pàgina per servei (×6) | Cada servei té les seves cerques | Pàgines de servei | 🔴 Alta | Diversos dies |
| Casos d'èxit (CamEscola, Repwise, Sergi Garcia) | Nínxols amb poca competència i prova real | Pàgines de cas | 🟠 Mitjana | Mig dia cadascuna |
| "Quant costa una pàgina web el 2026" en català | Molta demanda, quasi cap competència en català | Article | 🟠 Mitjana | 2–3 h |
| Preguntes freqüents a l'inici | Apareix a "Altres preguntes" de Google i a les respostes d'IA | Secció i dades estructurades | 🟠 Mitjana | 1–2 h |
| WordPress o web a mida, quina triar | Cerca comparativa just abans de decidir | Article | 🟢 Baixa | 2–3 h |

---

## 4. Competència local (observada, sense mètriques)

| | Biel | Space Bits (Manresa) | Walaweb (Manresa) | Creacions web Ramon | Aritmetic (Manresa) |
|---|---|---|---|---|---|
| Surt a Google | ❌ No | ✅ | ✅ | ✅ | ✅ |
| Fitxa a Trustlocal | ❌ | ✅ 8,7 (21 ressenyes) | ✅ 8,2 (3) | ✅ 9,0 (16) | – |
| Pàgines per servei | ❌ | Probable | ✅ | ✅ | ✅ |
| Projectes propis visibles | ✅✅ (Repwise, jocs, apps) | ? | ? | ? | ? |
| Disseny i tecnologia | ✅✅ | ? | ? | WordPress | ? |

Hi ha més feina visible i millor tecnologia que tots ells. Falta presència: indexació, fitxes en directoris i ressenyes.

---

## 5. Pla d'acció

### Aquesta setmana (ràpid i amb impacte)

| # | Acció | Impacte | Esforç | Qui |
|---|---|---|---|---|
| 1 | Publicar la branca i donar d'alta **Search Console**, amb el sitemap enviat | Alt | 30 min | Biel |
| 2 | Redirecció de `www` cap a l'adreça sense `www` a Cloudflare | Alt | 10 min | Biel |
| 3 | Fitxa de **Google Business Profile** (Sant Fruitós de Bages, zona de servei Bages i Barcelona) i demanar ressenyes a 3 clients | Molt alt (local) | 1 h | Biel |
| 4 | Títols, frase de l'inici i dades estructurades locals amb Manresa i el Bages | Alt | 1 h | Claude |
| 5 | Unificar el nom (Díaz o Diaz) i mencionar Cloudflare Web Analytics a la política de privacitat | Mitjà | 15 min | Claude |
| 6 | Enllaços cap a la web: "Web feta per Biel Díaz" al peu de Tresdegé, CamEscola i Swish & Legacy (Sergi Garcia ja el té), i alta a Trustlocal Manresa i Proveedores.com | Alt | 1–2 h | Biel |

### Aquest trimestre

| # | Acció | Impacte | Esforç | Depèn de |
|---|---|---|---|---|
| 1 | HTML amb el contingut ja escrit en fer el build | Crític | 1 dia | — |
| 2 | Pàgines per servei en català i castellà, amb preguntes freqüents i projecte relacionat | Alt | 3–4 dies | Matisos de cada servei |
| 3 | Pàgina local "Disseny web a Manresa i el Bages" | Alt | Mig dia | — |
| 4 | Casos d'èxit de CamEscola, Repwise i Sergi Garcia | Mitjà | Mig dia cadascun | Dades reals de cada projecte |
| 5 | Un article al mes, començant per "Quant costa una pàgina web" en català | Mitjà | Continu | — |
| 6 | Revisar a 3 mesos amb dades reals de Search Console i Cloudflare Analytics | — | 1 h | Acció 1 de la setmana |

---

## Fonts

- [Trustlocal: diseñadores web en Manresa](https://trustlocal.es/barcelona/manresa/diseno-web/)
- [Proveedores.com: diseño web Manresa](https://proveedores.com/diseno-web/manresa)
- [Trustlocal: Space Bits](https://trustlocal.es/barcelona/manresa/diseno-web/space-bits-disseny-i-programacio-web/)
- [Trustlocal: Walaweb](https://trustlocal.es/barcelona/manresa/diseno-web/walaweb-diseno-web-y-optimizacion-digital/)
- [Trustlocal: Marcvirtual](https://trustlocal.es/barcelona/castellnou-de-bages/diseno-web/marcvirtual-disseny-web/)
- [Trustlocal: Manresa Web Design / Creacions web Ramon](https://trustlocal.es/barcelona/manresa/diseno-web/manresa-web-design/)
- [Proveedores.com: Aritmetic Digital Marqueting](https://proveedores.com/proveedores/aritmetic-digital-marqueting/)
- [Trustlocal: Net Engineer](https://trustlocal.es/barcelona/manresa/diseno-web/net-engineer-sl/)
- [Capterra: software de gestión de gimnasios](https://www.capterra.es/directory/33276/gym-management/software)
- [Virtuagym: software gestión gimnasios](https://business.virtuagym.com/es/software-gestion-gimnasios)
- [ClickUp: software de gestión de gimnasios](https://clickup.com/es-ES/blog/429913/software-de-gestion-de-gimnasios)
- [Anolla: software para entrenadores personales](https://anolla.com/es/software-de-entrenamiento-personal)
- [Carepatron: entrenadores personales](https://www.carepatron.com/es/professionals/personal-training-software)
- [Koalendar: entrenadores personales](https://koalendar.com/es/software-agendar-citas-para/entrenadores-personales)
- [Proveedores.com: desarrollo de software Barcelona](https://proveedores.com/desarrollo-de-software/barcelona)
- [Duotach: software a medida Madrid y Barcelona](https://duotach.com/blog/software-a-medida-madrid-barcelona)
- [Clupik (CB Insights)](https://www.cbinsights.com/investor/clupik)
- [Malt: perfil d'exemple](https://www.malt.fr/profile/albapizarro)
- [Trustlocal: diseño web Barcelona](https://trustlocal.es/barcelona/barcelona/diseno-web/)
