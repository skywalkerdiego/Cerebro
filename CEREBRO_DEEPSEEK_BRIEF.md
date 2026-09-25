# CEREBRO.EXE — CONTEXTO Y DIAGNÓSTICO PARA IA

> Documento de contexto compacto, derivado de `CEREBRO_FULL_EXPORT.zip` (exportación forense del repo `skywalkerdiego/Cerebro`, snapshot 2026-09-11). No es código: es diagnóstico. Marcadores usados en todo el documento: **[CONFIRMADO]** = verificado directo en código/repo, **[INFERENCIA]** = deducido sin confirmación explícita, **[CONTRADICCIÓN]** = archivos en desacuerdo entre sí.

---

## 1. Qué es Cerebro.exe

Cerebro.exe es el "segundo cerebro" personal de Diego Ruiz Elizondo: un sistema de organización de vida (trabajo, finanzas, titulación universitaria, relación de pareja, salud, rutina diaria) construido como conversación continua con Claude. **[CONFIRMADO]**

No es una app tradicional con backend propio. Es la combinación de:
1. Un repositorio de GitHub (`skywalkerdiego/Cerebro`) con archivos Markdown que son la fuente de verdad de los datos.
2. Un conjunto de páginas HTML/CSS/JS publicadas como **Claude Artifacts** (hospedadas en claude.ai, fuera de git) que sirven de interfaz visual — los "tableros" (`.exe`).
3. Claude (vía Claude Code) actuando como el único agente de lectura/escritura entre ambos lados. **[CONFIRMADO]**

El nombre "Cerebro.exe" designa dos cosas a la vez: (a) el proyecto completo, y (b) el artifact-hub específico (UUID `19dc184b-9e66-40e3-a25f-d4348f83bf4b`) que sirve de portada/dashboard y enlaza a los demás tableros. **[CONFIRMADO]**

## 2. Objetivo y filosofía del sistema

- Un único usuario (Diego), un único escritor real de datos (Claude, a petición de Diego). **[CONFIRMADO]**
- Los `.md` del repo son la **fuente de verdad permanente**; los tableros son **vistas regenerables**, nunca al revés — regla explícita en `CLAUDE.md`. **[CONFIRMADO]**
- Cada cambio real en `metas/`, `perfil/`, `finanzas/` o `desempeno/` que afecte un tablero publicado se republica en la misma sesión sin que Diego lo pida, salvo la excepción explícita de gastos capturados por la skill `/dinero` (Finanzas.exe no se autopublica ahí, se pregunta antes). **[CONFIRMADO]**
- Filosofía de **consolidación activa**: con el tiempo, Diego ha ido fusionando tableros que se solapaban (ver sección 4) en vez de multiplicarlos. Regla implícita: "todo a la vista", pocos tableros densos en vez de muchos tableros delgados. **[INFERENCIA]**, respaldada por el patrón de fusiones documentado en `logros.md`.
- Reglas de enfoque explícitas (31/08/2026): máximo 3 "pistas" activas a la vez, lo urgente desplaza el foco de la noche (no se apila), una noche libre por semana sin foco asignado. **[CONFIRMADO]**

## 3. Arquitectura actual

```
Diego ⇄ (conversación) ⇄ Claude Code
                              │              │
                     lee/escribe .md    Artifact:read/publish
                              │              │
                     REPO GIT (verdad)   CLAUDE ARTIFACTS (vista)
                     46 archivos, 1.9MB  39 páginas HTML/CSS/JS
                                              │
                                     navegador de Diego → localStorage
                                     (volátil, NUNCA escribe de vuelta al repo)
```

Hechos arquitectónicos clave **[CONFIRMADO]**:
- **El código de los tableros no vive en git.** Vive únicamente en claude.ai como Artifacts. El repo, por sí solo, es solo datos + configuración de Claude Code (`.claude/skills/`). Si se pierde el acceso a Artifacts, se pierde el 100% del código de interfaz.
- **La escritura es unidireccional y pasa siempre por Claude.** No existe formulario ni app donde Diego capture datos directo al repo.
- **No hay build, ni framework, ni backend, ni base de datos, ni tests, ni CI.** Cada tablero es HTML/CSS/JS vanilla autocontenido, inyectado en un wrapper que la propia plataforma de Artifacts añade.
- El único punto de persistencia interactiva (checkboxes marcados en el navegador, por ejemplo) es `localStorage`, por dispositivo, nunca sincronizado de vuelta al repo.

## 4. Cómo evolucionó el proyecto

Extraído de `logros.md`, `README.md` y `CLAUDE.md` — fechas y hechos reales, no inferidos:

- **15/08/2026**: fondo conjunto de ahorro con Fanny ($47,000) establecido como meta.
- **20-31/08/2026**: expansión de `perfil/` con múltiples archivos de vida personal.
- **31/08/2026**: consolidación grande — `Eventos.exe` se fusiona en `Calendario.exe`; `Habilidades.exe` se fusiona en `Yo.exe`; primera fusión de `Aspect.exe` en `Rutina.exe` (con pérdida temporal de la línea de tiempo real, ver más abajo).
- **01/09/2026**: `Pendientes.exe` se retira (se desactualizaba solo) → su contenido pasa a "Pendientes vivos" dentro de `Rutina.exe`. Corrección de la fusión del 31/08: se repone la línea de tiempo real con casillas dentro de `Rutina.exe`. **[CONTRADICCIÓN corregida en su momento]**: la primera fusión (31/08) dejó solo un checklist genérico y perdió la línea de tiempo del día; se corrigió al día siguiente.
- **09/09/2026**: el plan del Vaivén se separa de `Calendario.exe` a su propio tablero `Vaivén.exe` — excepción deliberada a la regla de consolidar, justificada porque un plan de viaje completo necesita su propio espacio.
- **10-11/09/2026**: Cerebro.exe (el hub) se rediseña dos veces en la misma sesión — primero solo paleta/tipografía (estilo Linear/Arc), luego composición completa de layout (dock de navegación inferior fijo, reemplazando header/nav previos).

**[INFERENCIA]**: el patrón general es "expandir → notar solapamiento/desactualización → consolidar", repetido al menos 3 veces (Aspect+Tiempo+Pendientes→Rutina; Eventos→Calendario; Habilidades→Yo).

## 5. Los 22 tableros (boards)

Fuente única y autoritativa: la variable `GROUPS` embebida en el JS de Cerebro.exe — **no existe una lista equivalente en ningún `.md` del repo**. **[CONFIRMADO]**

| Grupo | Tablero | UUID | Qué hace |
|---|---|---|---|
| Cada día | **Periódico** | `4169c45b-...f3614` | Portada de la mañana: clima, urgente, noticias |
| Cada día | **Rutina** | `4ef55817-...9e38d433` | Semana, día en bloques, pendientes vivos (fusiona Aspect+Tiempo+Pendientes) |
| Cada día | **Hoy** | `b7358df3-...f375a149aa` | Clima de casa/trabajo y lo más próximo |
| Cada día | **Calendario** | `8b911d1f-...41d7b7a4e778` | Mes completo: conciertos, cumpleaños, aniversario (fusiona Eventos) |
| Trabajo y escuela | **Titulación** | `ab59366f-...348255129efc` | Trámite paso a paso: ficha, ATI, solicitud |
| Trabajo y escuela | **Desempeño** | `9451d24a-...8f641583c24e` | Métricas de Boost en % a meta |
| Trabajo y escuela | **Llamadas** | `cc525f96-...b53c0bda9db5` | Guiones por tipo de llamada, para subir el FCR |
| Trabajo y escuela | **Trabajo** | `fe81e91b-...8355a64bb136` | Vacantes, CV, LinkedIn — modo mantenimiento |
| Trabajo y escuela | **Artículos** | `25b45539-...a19aeb4edca8` | Artículo del giro a la derecha: fuentes y guion |
| Dinero | **Finanzas** | `6841396f-...b05c33caec8e` | Cuentas, gastos, pendientes de quincena (usa localStorage) |
| Dinero | **Mudanza** | `d66ad007-...c9fdc8267002` | Ahorro de $47,000 y fecha estimada — título real en plataforma: *"Nuestra Casa Antes de Diciembre"* |
| Dinero | **Patrimonio** | `4f25e5f2-...044c67464a3e` | Largo plazo: boda, casa propia, INFONAVIT — título real: *"acta-patrimonial"* |
| Dinero | **Compras** | `ec0c9f2b-...4f00492373c3` | Wishlist y "Fondo cosillas" |
| Fanny y familia | **Nosotros** | `958d66cd-...37994df7026e` | Dossier de pareja, contador de días |
| Fanny y familia | **Recetario para Fanny** | `9141d18a-...362e57c24ce9` | Carta imprimible, separador, receta |
| Fanny y familia | **Árbol** | `d0c4a5cf-...df6f7f8ca699` | Quién es quién: familia, pareja, amigos — título real: *"Árbol de Diego"* |
| Fanny y familia | **Perfil** | `1b3a94a5-...ff2d870c2917` | Salud, familia, amigos, gustos. **[CONTRADICCIÓN]** no referenciado en ningún `.md` del repo |
| Tú y tus cosas | **Yo** | `f3018b22-...fd0fd8e924bf` | Hoja de personaje: nivel, XP, atributos (fusiona Habilidades) |
| Tú y tus cosas | **Logros** | `824aa431-...da3c7fe40345` | Registro de logros ya conseguidos |
| Tú y tus cosas | **Carros** | `343ba47e-...44826ec627c7` | Chevy y Aveo: stats y bitácora de taller |
| Tú y tus cosas | **Biblioteca** | `35790e36-...17acfd3d1bb7` | Documentos reales: CV, ATI, recibos |
| Tú y tus cosas | **Descubre** | `776e9c82-...866474be9271` | Noticias con perspectiva, qué hay cerca |

(UUIDs truncados por legibilidad; completos en `06_ARTIFACTS.json`/`10_IDENTIFIERS.json` dentro del ZIP.)

## 6. Los 39 Artifacts y su relación con los 22 tableros

`Artifact:list` devuelve **39 artifacts publicados**, no 22. **[CONFIRMADO]** Descomposición exacta:

- **22** son los boards de la tabla anterior (`ACTIVE_BOARD`).
- **1** es el propio hub, Cerebro.exe (`19dc184b-...`) — no aparece en su propia lista `GROUPS` pero es el punto de entrada de todos.
- **6** son "extra activos" enlazados desde el repo pero fuera de la navegación de 22: `Vaivén.exe`, `Combo Totalplay`, `Chao AT&T`, `Bitácora de Cabaña`, `Alerta de Sistema`, y `Habilidades.exe` (referencia obsoleta — ver sección 20).
- **9** son huérfanos o retirados sin ninguna referencia activa en el repo: `Nuestra Primera Casa`, `Ruta a Comercio Exterior`, `tiempo` (Tiempo.exe retirado), `pendientes` (Pendientes.exe retirado), `Aspect.exe` (fusionado en Rutina), `Escapada al Bosque`, `Un plan para nosotros`, `Noche de Hotel`, `NuevoSave.exe`.

**[INFERENCIA]** varios huérfanos parecen ser borradores/duplicados de tableros activos (`Nuestra Primera Casa` ≈ duplicado de `Mudanza`; `Escapada al Bosque` ≈ precursor de `Bitácora de Cabaña`, mismo viaje cancelado del 28-30/08). Ninguno se ha confirmado con Diego como seguro de borrar.

## 7. Entidades principales

Reconstruidas de tablas Markdown y estructuras JS (`WEEK`, `GROUPS`, `ALERTS`) — **no hay schema formal en ningún lado**. **[CONFIRMADO que no existe schema; entidades mismas son INFERRED de su uso]**

1. **Meta** — un `.md` por meta en `metas/` (título, objetivo, fecha límite en prosa, estado, checkboxes de pasos, tablero asociado).
2. **GastoOIngreso** — filas de tabla en `finanzas/gastos.md` (Fecha, Tipo, Categoría de 12 valores, Descripción, Monto con signo).
3. **MetricaDesempeno** — filas en `desempeno/metricas.md`, 5 tipos de métrica normalizados a % de meta (Boost Mobile las define así).
4. **Logro** — filas en `logros.md` (Fecha, Logro, Área). Fórmula de XP derivada: `(checkboxes [x] en metas/ × 10) + (filas de logros.md × 50)` — **[INFERENCIA]**, el cálculo real vive en el JS de Yo.exe, no capturado en este export.
5. **Board** — objeto literal dentro de `GROUPS` en Cerebro.exe: `{i: icono, n: nombre, u: url, w: descripción, k: keywords de búsqueda}`. 22 instancias, agrupadas en 5 categorías fijas.
6. **Alerta** — array `ALERTS` hardcodeado a mano en cada sesión (no se deriva automáticamente de los `.md`): `{i, l, s, u, date?, hot?}`. Es la única fuente de "lo urgente" en Cerebro.exe.
7. **DiaSemana (WEEK)** — objeto `{shift, leave, start, b1, lunch, b2, end, home, off, foco, focoIcon}`. Fuente real: `perfil/rutina.md`. **[CONTRADICCIÓN]** triplicado de forma independiente en Cerebro.exe, Rutina.exe y Periódico.exe (ver sección 20).
8. **GustoOInteres** — prosa libre en `perfil/intereses.md`, reestructurada a mano como tarjetas `<details>` dentro del HTML de Perfil.exe.

## 8. Modelo de datos actual

No hay modelo de datos formal ni tipado. Todo el "esquema" existe implícitamente en:
- Tablas Markdown con encabezados consistentes por convención humana, no validadas por ninguna herramienta.
- Objetos/arrays JS hardcodeados a mano dentro de cada artifact, sin generador ni build step.

**[CONFIRMADO]** No hay un único punto donde se declaren los 22 boards fuera del propio JS de Cerebro.exe — es dato y código a la vez.

## 9. Relaciones entre entidades

- `README.md` ⇄ `metas/*.md`: tabla resumen en README apunta a cada archivo de meta.
- `.claude/skills/*` ⇄ archivos de datos: la skill `dinero` escribe en `finanzas/gastos.md`; la skill `revisemos-cerebro` lee across `metas/`, `perfil/`, etc.
- Cerebro.exe (JS) ⇄ 22 boards: mapeo 1 a 1 vía diccionario `U` (URLs) + array `GROUPS`.
- Cada board ⇄ uno o más `.md`: relación documentada explícitamente en `04_BOARDS.json` (`source_md`), ej. `Rutina` ⇐ `perfil/rutina.md` + `perfil/tiempo.md`.
- Patrón de "back-links": la mayoría de tableros están referenciados por URL en al menos un `.md` del repo — **excepto Perfil.exe** (ver contradicción #3).

## 10. IDs/UUIDs importantes

- **39 UUIDs de Artifact** — IMMUTABLE, romper cualquiera de las 22 URLs de boards rompe el diccionario `U`, los links relativos en `.md`, y `README.md`.
- **DOM IDs de Cerebro.exe** (IMMUTABLE, ~38 ids: `top`, `stTime`, `stDate`, `nowCard`, `alerts`, `timeline`, `tableros`, `dock`, `navSearch`, etc.) — referenciados por `getElementById` en múltiples IIFEs del mismo archivo.
- **CSS custom properties** IMMUTABLE: `--bg`, `--surface`, `--text`, `--accent`, `--critical/warn/ok/paused`, más `--nc/--tc/--sc` inyectadas dinámicamente por JS vía `style.setProperty` — renombrar sin tocar el JS rompe colores de estado silenciosamente.
- **localStorage keys** IMMUTABLE: `cerebroRuido`, `rutinaBlocks:<fecha>`, `rutinaDaily:<fecha>`, `rutinaWeekly` (sin fecha, nunca se resetea), y **`rutinaPend:2026-09-07`** (fecha hardcodeada, ver deuda técnica).
- **Variable `U`** (diccionario de URLs, claves cortas) y **`WEEK`** (triplicada) — REVIEW_REQUIRED, ver sección 20.
- **Rutas GitHub hardcodeadas** en Titulación.exe apuntando directo a `github.com/skywalkerdiego/Cerebro/blob/main/biblioteca/titulacion/*.pdf` — si el repo cambia de nombre/visibilidad, estos links se rompen sin aviso.

## 11. Funcionalidades existentes

- Dashboard central (Cerebro.exe) con: reloj/estado del turno actual, bloque "Ahora", lista de Alertas ordenadas por urgencia, timeline del día, pistas activas, grid de 22 tableros con buscador por keywords, dock de navegación inferior fijo.
- Rutina.exe: semana completa, día en bloques con checkboxes persistidos en localStorage, pendientes vivos.
- Finanzas.exe: registro de gastos/ingresos con posible "dato semilla" en localStorage.
- Desempeño.exe / Llamadas.exe: métricas normalizadas a % y guiones de llamada asociados.
- Titulación.exe: checklist de trámite con links directos a PDFs en GitHub.
- Skills de Claude Code: `/dinero` (captura gastos con confirmación antes de republicar Finanzas.exe) y `revisemos-cerebro` (auditoría/lectura cruzada del sistema).

## 12. Funcionalidades duplicadas

- **La tabla `WEEK`** existe en 3 artifacts distintos (Cerebro.exe, Rutina.exe, Periódico.exe), cada una editada a mano por separado. **[CONFIRMADO]**
- **Habilidades.exe** funcionalmente duplicada/absorbida por Yo.exe desde el 31/08, pero el artifact sigue publicado y aún enlazado desde `perfil/hoy.md`. **[CONTRADICCIÓN]**

## 13. Qué comparte datos y qué está aislado

- **Comparten dato de origen pero no sincronización runtime**: los 3 artifacts con `WEEK` leen (en su momento de creación) de `perfil/rutina.md`, pero después viven como copias JS independientes — cambios posteriores al `.md` no se propagan automáticamente a los 3.
- **Aislado por diseño**: `localStorage` es por dispositivo y por artifact — Finanzas.exe, Rutina.exe no comparten storage entre sí ni con el repo.
- **Aislado por accidente**: Perfil.exe (contradicción #3) — solo el código de Cerebro.exe sabe que existe.

## 14. Flujo de información actual

```
Diego cuenta algo en el chat
        → Claude edita el/los .md correspondientes (fuente de verdad)
        → Claude, en la misma sesión, republica el/los tableros afectados
        → Diego ve el tablero actualizado en su navegador
        → si interactúa (checkbox, campo) → solo toca localStorage de ESE dispositivo
        → ese dato de localStorage NUNCA vuelve al repo por sí solo
```
Es un flujo **unidireccional** repo→artifact, con un callejón sin salida en localStorage. **[CONFIRMADO]**

## 15. Design system actual

No existe un sistema de diseño único. **[CONFIRMADO]** Se identificaron ≥4 lenguajes visuales distintos coexistiendo en el mismo snapshot:
1. **Linear/Arc** (Cerebro.exe, tras el rediseño del 10-11/09): un solo acento, color solo por estado, Inter, mobile-first, dock inferior.
2. **Cyberpunk/RGB** (Rutina.exe): Orbitron auto-hospedada + Share Tech Mono, cian, notches con `clip-path`.
3. **Dark editorial** (Trabajo.exe, Titulación.exe, Perfil.exe): 3 acentos de color distintos entre sí.
4. **Magenta/violeta editorial** (Periódico.exe), único en su familia.

Patrones compartidos entre todos: viewport meta estándar, `max-width` 460-600px, `color-scheme: dark` fijo, JS vanilla sin framework.

## 16. Tecnologías utilizadas

- HTML5 + CSS3 + JavaScript vanilla (ES5/ES6 mixto), sin frameworks (no React/Vue/etc.), sin bundler, sin build step.
- Markdown como formato de datos persistentes.
- `localStorage` del navegador como única capa de escritura interactiva.
- Claude Artifacts (plataforma claude.ai) como hosting/runtime de las páginas.
- Claude Code como agente de edición, con 2 skills propias (`dinero`, `revisemos-cerebro`) definidas en `.claude/skills/*/SKILL.md`.
- Git/GitHub como almacenamiento de la fuente de verdad (repo `skywalkerdiego/Cerebro`, clon superficial/shallow — ver limitaciones).

## 17. Dependencias

Ninguna dependencia de paquetes (no `package.json`, no `node_modules`, no lockfiles). **[CONFIRMADO]** Las únicas "dependencias" son:
- Acceso a claude.ai/Claude Artifacts para que el código de los tableros exista y sea editable.
- Acceso al repo de GitHub para que los `.md` persistan.
- Fuentes web: Orbitron + Share Tech Mono autohospedadas en Rutina.exe (único caso, el resto usa fuentes de sistema/Inter).

## 18. Limitaciones de la arquitectura actual

- El código de interfaz vive 100% fuera de git — no hay control de versiones real del código de los tableros, solo de los datos.
- No hay tests, CI, linting, ni validación de estructura de los `.md`.
- No hay forma automática de saber si un board dejó de estar referenciado (se descubrió por grep manual en esta auditoría).
- Repo es un **clon superficial (shallow/grafted)**: `96` commits visibles, primer commit marcado `(grafted)` — no se puede garantizar que no exista historia anterior fuera de este checkout. **[CONFIRMADO]**
- 33 de los 39 artifacts no tienen su código fuente vendorizado en el export forense (solo metadata + URL) — no es una limitación del sistema en sí, sino del alcance de esa exportación puntual; son re-obtenibles vía la tool `Artifact:read`.

## 19. Deuda técnica

1. **Triple copia divergente de `WEEK`** — alta severidad. Cada cambio de horario requiere editar 3 artifacts a mano; ya están desincronizados en el snapshot capturado (Periódico.exe tenía un "foco" del 31/08 sobre un trámite que estaba en pausa desde el 05/09).
2. **`localStorage` key con fecha hardcodeada** (`rutinaPend:2026-09-07` en Rutina.exe) — el checklist de "Pendientes vivos" nunca se resetea automáticamente por semana como aparenta, a diferencia de `rutinaBlocks`/`rutinaDaily` que sí calculan la fecha dinámicamente.
3. **4 lenguajes visuales sin sistema compartido** — cada rediseño tocó un subconjunto de tableros, nunca todos a la vez.
4. **9 artifacts huérfanos publicados** sin limpieza — no rompen nada, pero generan riesgo de confusión.
5. Variable interna `U` (diccionario de URLs de Cerebro.exe) con claves cortas reusadas en 2-3 lugares distintos del mismo archivo — renombrar una sin actualizar todos sus usos rompe el link silenciosamente, sin error visible.

## 20. Problemas y contradicciones encontradas

- **[CONTRADICCIÓN]** `perfil/hoy.md` sigue enlazando a `Habilidades.exe` como tablero independiente, pero `logros.md` documenta su fusión en `Yo.exe` desde el 31/08/2026 — referencia no corregida.
- **[CONTRADICCIÓN]** `Perfil.exe` es uno de los 22 boards oficiales (grupo "Fanny y familia") pero no aparece en ningún `.md` del repo — solo existe como referencia dentro del propio JS de Cerebro.exe.
- **[CONTRADICCIÓN]** Correo de trabajo: CV/LinkedIn usan `druizelizondo@gmail.com`, la cuenta de Indeed usa `skywalkerdiego13@gmail.com` — `metas/trabajo.md` reconoce esto explícitamente como "sin resolver si unificarlo o dejarlo así".
- **[CONTRADICCIÓN, ya corregida en su momento]** La primera fusión de Aspect.exe en Rutina.exe (31/08) perdió la línea de tiempo real del día, dejando solo un checklist genérico; se corrigió al día siguiente (01/09) reponiéndola.
- **[CONFIRMADO, hallazgo no resuelto]** `git log --diff-filter=D` y `--diff-filter=R` devuelven vacío en todo el historial visible: ningún archivo fue jamás borrado o renombrado en git. Esto confirma que **todas** las consolidaciones de tableros ocurrieron solo del lado de los Artifacts, nunca tocaron el repo.

## 21. Decisiones históricas importantes

(Ver `12_DECISIONS.md` dentro del ZIP para el detalle completo con fechas; resumen de las más relevantes para migración)

- Los `.md` son fuente de verdad; los tableros se regeneran a partir de ellos, nunca al revés — **CONFIRMED**, vigente.
- Excepción explícita: gastos capturados por `/dinero` NO republican Finanzas.exe automáticamente — se pregunta primero — **CONFIRMED**.
- Orden del horizonte de vida (01/09/2026): mudanza (2026) → boda (2027) → casa propia (2028+) → familia — **CONFIRMED**, corrigió una versión anterior que ponía la boda después de la casa.
- Búsqueda de trabajo en "modo mantenimiento" desde 31/08/2026 — **CONFIRMED**.
- Reglas de enfoque (máx. 3 pistas activas, urgente desplaza sin apilar, una noche libre/semana) — **CONFIRMED**, 31/08/2026.
- Titulación en pausa desde 05/09/2026, pendiente de respuesta de la escuela — **CONFIRMED**, sin fecha de resolución.

## 22. Ideas futuras ya registradas

(Ver `14_FUTURE.md` dentro del ZIP; **nada de esto está implementado**)

Sobre el sistema mismo:
- Persistencia real vía capacidad `db` de Claude Artifacts, para que los cambios interactivos (checkboxes, montos) se guarden del lado servidor en vez de solo en `localStorage`.
- Unificar la tabla `WEEK` en una sola fuente.
- Sistema de diseño único compartido entre los 22 tableros.
- Navegación por "vistas" (Hoy/Atención/Tableros/Yo) — evaluada y parcialmente descartada por tensión con la filosofía de "todo a la vista".
- Generar `WEEK` a partir de un patrón + excepciones, para que no caduque cada 7 días.
- Un stack de hasta 8 skills externas de Claude Code para diseño/frontend/accesibilidad/refactor — propuesto con comandos exactos, explícitamente NO instalado, pendiente de confirmación de Diego.

Sobre la vida de Diego (no relevante para arquitectura, documentado por completitud): plan de crédito de vivienda con Fanny, monto objetivo de boda 2027, cambio de coche, fondo de emergencia, aprendizaje de mantenimiento del hogar, posible maestría/psicología, publicación de artículo, TOEFL, decisión de Totalplay/Telcel.

## 23. Qué NO debería romperse durante una migración

- Las **39 URLs de Artifact** (22 boards + 6 extra activos + el hub) — son las únicas llaves primarias del sistema.
- Los **DOM IDs y CSS custom properties de Cerebro.exe** listados en la sección 10 — múltiples funciones JS dependen de ellos por nombre exacto.
- Las **localStorage keys existentes** — cambiar cualquiera pierde silenciosamente el progreso que Diego ya tiene guardado en su navegador, sin migración ni aviso.
- La regla de gobierno ".md es la fuente de verdad, los tableros son la vista" — es la única garantía de que no se pierdan datos si un artifact se corrompe o se pierde.
- Las rutas de GitHub hardcodeadas en Titulación.exe hacia los PDFs de `biblioteca/titulacion/`.
- La excepción de la skill `/dinero` (no autopublica Finanzas.exe).

## 24. Qué debería conservarse de la experiencia actual

- El flujo conversacional Diego↔Claude como único punto de entrada de datos — es intencional, no un accidente a corregir.
- La filosofía de consolidación (pocos tableros densos, fusionar cuando hay solapamiento) — ha funcionado 3 veces ya (Aspect+Tiempo+Pendientes, Eventos, Habilidades).
- Las 5 categorías de agrupación de tableros ("Cada día", "Trabajo y escuela", "Dinero", "Fanny y familia", "Tú y tus cosas") — organización ya validada por uso real.
- El sistema de Alertas (`ALERTS`) como "lo urgente" curado a mano — funciona porque Claude tiene criterio de qué es urgente, cosa que una regla automática no necesariamente replicaría bien.

## 25. Qué tendría que cambiar para convertir Cerebro.exe en una aplicación real

**[INFERENCIA — análisis, no implementado]**

- Pasar de "39 páginas HTML independientes hardcodeadas" a algún tipo de fuente única de componentes/tokens de diseño, para eliminar los 4 lenguajes visuales.
- Reemplazar las 3 copias de `WEEK` por una sola fuente de datos consumida por los 3 lugares que la necesitan (implica algún mecanismo de datos compartido entre artifacts, que hoy no existe — los Artifacts de Claude no se importan entre sí de forma nativa salvo que se use la capacidad `db`).
- Decidir la persistencia interactiva: hoy vive en `localStorage` (volátil, por dispositivo). Migrar a la capacidad `db` de Artifacts (ya propuesta en `14_FUTURE.md`) resolvería tanto la triplicación de `WEEK` como la pérdida de checkboxes al cambiar de dispositivo.
- Formalizar mínimamente el "esquema" de cada entidad (Meta, GastoOIngreso, MetricaDesempeno, etc.) — hoy es solo convención de tabla Markdown, sin validación.
- Resolver las contradicciones activas (Habilidades.exe, Perfil.exe sin referencia en repo) antes de que una migración las arrastre sin que nadie las note.

## 26. Qué arquitectura futura parece más adecuada (sin implementar)

**[INFERENCIA]** — dado lo ya propuesto en `14_FUTURE.md` y confirmado como PROPOSED por Diego mismo:
- Mantener el modelo ".md como fuente de verdad" para las metas/perfil/finanzas — funciona bien y es legible/versionable.
- Adoptar la capacidad `db` de Claude Artifacts como capa de persistencia compartida entre tableros, específicamente para: (a) los checkboxes de Rutina.exe, (b) una única fuente de `WEEK` leída por los 3 artifacts que hoy la triplican, (c) el estado de Finanzas.exe si Diego decide que debe sobrevivir entre dispositivos.
- No se propone descartar el modelo Artifact-por-tablero — es apropiado al caso de uso de un solo usuario. El problema no es "cuántas páginas" sino "cuántas copias independientes del mismo dato".

## 27. Riesgos de migración

- **Perder Perfil.exe silenciosamente**: al no estar referenciado en ningún `.md`, cualquier migración basada solo en "grep del repo" lo pasaría por alto. Su única URL de recuperación vive dentro del propio `Cerebro.exe` (o en este export, en `06_ARTIFACTS.json`/`ARTIFACTS_SOURCE/`).
- **Migrar `WEEK` sin sincronizar los 3 artifacts a la vez** dejaría el sistema peor que antes (2 fuentes en vez de 3, pero aún inconsistentes).
- **Reescribir `localStorage` keys sin plan de migración de datos** perdería silenciosamente progreso ya guardado por Diego, sin ningún error visible al usuario.
- **Tratar los 9 huérfanos como basura sin confirmar con Diego** — al menos 2 parecen duplicados intencionales de un mismo evento (viaje a cabaña cancelado), pero eso es interpretación, no hecho confirmado.
- **Asumir que el shallow clone contiene toda la historia** — no está garantizado; cualquier decisión que dependa de "cuándo se creó X por primera vez" antes del commit más antiguo visible debe tratarse con cautela.

## 28. Preguntas que todavía necesitan respuesta

1. ¿Perfil.exe debe agregarse explícitamente a algún `.md` del repo para dejar de depender solo del JS de Cerebro.exe?
2. ¿Cuál de los 9 artifacts huérfanos puede borrarse con seguridad y cuáles deben conservarse como borradores válidos?
3. ¿Se unifica el correo de trabajo (`druizelizondo@gmail.com` vs `skywalkerdiego13@gmail.com`) o se deja así intencionalmente?
4. ¿Vale la pena migrar a la capacidad `db` de Artifacts ahora, o seguir con `localStorage` mientras el sistema siga siendo de un solo dispositivo principal?
5. ¿Se corrige ahora la referencia obsoleta a `Habilidades.exe` en `perfil/hoy.md`, o se deja como está hasta el próximo rediseño de ese archivo?
6. ¿Existe historia de git anterior al commit grafted que valga la pena recuperar, o el shallow clone ya cubre todo lo relevante?

---

**Tamaño del archivo**: ver comando de verificación al final de la respuesta del asistente.
**Número de secciones**: 28 (más este bloque de cierre).
**Número de tableros analizados**: 22 (los 22 boards oficiales de `GROUPS`).
**Número de Artifacts analizados**: 39 (universo completo descubierto vía `Artifact:list`, cruzado contra 22 boards + 29 URLs referenciadas en `.md` del repo).
**Información no verificable**: historia de git anterior al punto de shallow-clone (no se puede confirmar si existe); intención original detrás de los 9 artifacts huérfanos (no se preguntó a Diego); si el `.md` de origen de Perfil.exe realmente se perdió o nunca existió como archivo separado.
