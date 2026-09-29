# 🎬 Fanny & Diego — la serie · T2·E24 «Dos años»

Un **capítulo de miniserie** animado para el aniversario (20/10/2026).
Las láminas de fieltro originales se vuelven **títeres**: las cabezas giran
y asienten, los cuerpos respiran, los ojos de botón parpadean, las bocas
hablan sílaba por sílaba, los tarros brindan, la jirafa se asoma a la
foto… y todo se cuenta con **diálogo** en globos de fieltro cosidos y
vocecitas de balbuceo. Nada se redibujó: es la misma lámina, animada
(malla deformable en WebGL, detalles de fieltro encima).

| Entregable | Archivo |
|---|---|
| **Episodio horizontal 16:9** (1920×1080, 30 fps) | `out/episodio_16x9.mp4` |
| **Episodio vertical 9:16** (1080×1920, 30 fps, "en la tele de fieltro") | `out/episodio_9x16.mp4` |
| Versiones para compartir (< 30 MB) | `out/episodio_*_compartir.mp4` (las genera `make_episode.sh`) |
| Guion (legible) | [`episodio/guion.md`](episodio/guion.md) |
| Guion ejecutable (diálogos, acciones, cámara) | [`episodio/guion.json`](episodio/guion.json) |
| Rigs de cada lámina (cabezas, bocas, ojos, manos, objetos) | [`episodio/rigs.json`](episodio/rigs.json) |

```bash
./make_episode.sh ruta/a/cancion.mp4   # con la canción real (solo toma el audio)
./make_episode.sh                       # con la pista temporal original
```

## El capítulo

| # | Escena | Qué pasa |
|---|---|---|
| 1 | **Cold open** — café | "¿Sabes qué día es hoy?" · "Mmm… ¿martes?" · ella lo mira ¬¬ · "¡Es broma! Hoy cumplimos dos años." · corazoncitos de fieltro |
| 2 | **Entrada de la serie** | *Fanny & Diego — la serie*, con retratos del elenco (Fanny, Diego, Tris) y "Temporada 2 · Capítulo 24 · «Dos años»" (temporada 2 = segundo año, capítulo 24 = mes 24) |
| 3 | **Flashback** — prepa 9 | "Hace un buen rato…" Él toca los platillos pensando "no la mires…", ¡CRASH!, ella voltea: "¿Siempre tocas así de fuerte?" · "Solo cuando tú estás." (se sonroja) |
| 4 | **Amoshit** | "Y un día…" Los dos lo dicen, y un brillo recorre el hilo rojo de ella a él |
| 5 | **El coche** | "¡Pon nuestra canción!" → clic → **empieza la canción** |
| 6 | Montaje sobre la canción | coche ("¿A dónde vamos?" "¡A donde sea!"), cocina ("¿Le pusiste sal?" … grillos), Snoopy y Tris ("¡Guau!"), vinilos ("¿Kendrick o Interpol?" "¿Por qué no los dos?"), tacos (el "¡Salud!" cae en un tiempo fuerte), karaoke, noche de *That '70s Show* (ella se recarga en él), y de la tele sale el safari ("Creo que quiere salir en la foto") y el aviario (el loro grita "¡Dos años!") |
| 7 | **Clímax** — el puente "2 AÑOS JUNTOS" | cae **exactamente en el clímax de la canción**: destello y confeti. "Dos años, ¿eh?" · "Y todos los que faltan." · "¡Guau!" |
| 8 | **Epílogo** — en casa | "¿Otro capítulo mañana?" · "Todos los que quieras." → iris de caricatura: **Continuará…** |
| 9 | Créditos | "Protagonizada por Fanny y Diego · Tris (como ella misma) · Snoopy, el changuito y los pingüinos · Escrita, dirigida y hecha con amor por Diego · Feliz aniversario, Fanny" |

No se inventó nada de su historia: todo sale de lo que hay en
`perfil/novia.md` y de las láminas; "Amoshit" solo se dice, no se explica.

## Decisiones creativas (versión 2)

**1. Títeres sin tijeras.** Cada lámina se dibuja sobre una malla densa
(una celda cada 2 px de la lámina) y en `rigs.json` cada escena tiene
*handles*: cabeza (gira sobre el cuello), cuerpo (respira), mandíbula,
brazos (cápsulas que giran desde el hombro), objetos (tarros, cámara,
jirafa, platillos, espadañas, colibríes). Cada handle deforma la malla con
una caída suave, así que no hay recortes ni huecos: se mueve la lámina
misma. Encima de eso: *idle* (respiración y vaivén de cabeza, distinto
por personaje), loops de escena a tiempo con la música (los platillos
cada dos tiempos, Fanny bailando en el xilófono, el coche que brinca) y
acciones del guion (ladear la cabeza, levantar la ceja, recargarse,
aplaudir, el ¡crash!).

**2. Bocas, ojos y sonrojo.** Las mandíbulas tienen una "compuerta": solo
se mueve lo que está debajo de la línea de la boca, así que la boca se
abre de verdad sin estirar la nariz. En el café (sonrisas cerradas) se
suma una boquita de fieltro que se abre por sílaba. Los ojos de botón
parpadean aplastándose hasta volverse una rayita (a 12 fps, como
stop-motion); las pestañas de Fanny se juntan solas. El sonrojo de Diego
en la prepa es fieltro rosa difuminado.

**3. Diálogo que se lee y se oye.** Los globos son de fieltro crema con
puntada roja (el hilo de "Amoshit"), se escriben sílaba por sílaba al
ritmo de la voz, y su lugar se elige probando varias posiciones: gana la
que no tapa caras ni otros globos, con la colita apuntando a la boca.
Hay globos de pensamiento (nube), de grito (picos) y el del loro
(amarillo, dentado). Las voces son **balbuceo tipo Animal Crossing pero
con las vocales reales del guion** (síntesis por formantes a/e/i/o/u,
consonantes de ataque y entonación: las preguntas suben al final), así
que "¿Sabes qué día es hoy?" *suena* a esa frase sin decir palabras.
Diego más grave, Fanny más aguda, el loro raspa, Tris ladra.

**4. La música cuenta la estructura.** Antes de "nuestra canción" hay un
tema original a 100 BPM (cajita musical en el café, tema de la serie en
la entrada, banda escolar en la prepa que se corta con el ¡CRASH!,
ternura en Amoshit, motor y radio en el coche). La canción entra con el
clic del estéreo, y desde ahí la **canción manda**: las escenas se
reparten con programación dinámica sobre sus tiempos fuertes, cada una
con un mínimo duro (lo que dura su diálogo) y el puente arranca en el
clímax detectado. La canción baja 5 dB solo cuando alguien habla y todo
queda a −14 LUFS.

**5. 9:16 = el capítulo en la tele de fieltro.** Las láminas son
apaisadas; en vertical el episodio se ve en una tele de los 70 de
fieltro (guiño a *That '70s Show*) con pantalla 4:3, el logo de la serie
arriba, las tazas del café y el carrete de hilo rojo en la mesa, y una
etiqueta "♪ nuestra canción ♪" que brinca a tiempo mientras suena.

**6. Una sola corrección al arte, pedida por Diego.** En la lámina del
safari los dos personajes eran Fanny. El de la gorra ahora es Diego: su
cabeza sale de otra lámina (el café, donde tiene casi la misma pose),
alineada por los lentes, recortada a mano y con Fanny, las manos y la
cámara por delante; el color se igualó a la luz del safari. Todo lo demás
es la lámina tal cual (`tools/fix_safari_diego.py`, reversible).

**7. Lenguaje de serie.** Rótulos cosidos ("Hace un buen rato…", "Y un
día…"), el pasado con tono cálido y bordes crema, transición de
flashback con ondas, barrido con desenfoque de movimiento, la pantalla
de la tele que crece y se vuelve el safari, destello en el clímax, iris
de caricatura para el "Continuará…" y créditos en fieltro.

## ⚠️ Lo que falta (igual que en la v1)

- **La canción** no llegó a la sesión: el episodio usa la pista temporal
  original (`tools/compose_scratch.py`) analizada con el mismo analizador.
  Con el mp4: `./make_episode.sh cancion.mp4` re-reparte las escenas sobre
  la canción real, vuelve a poner el puente en su clímax y re-renderiza.
- **6 de las 20 láminas** (la cascada, dormir con Tris, el retrato
  abrazados riendo y otras 3). Para sumarlas: la lámina en
  `assets/scenes/raw/`, su rig en `episodio/rigs.json` y su escena en
  `episodio/guion.json`.

## Cómo se hizo (loop de crítica)

1. **Guion** (`guion.md` → `guion.json`) a partir de lo que hay en el
   segundo cerebro, y **rigs** anotados sobre hojas con cuadrícula
   (`tools/grid_view.py`); los ojos se afinaron detectando el botón oscuro
   de cada ojo.
2. **Clip de prueba** (cold open + entrada) enviado temprano.
3. **Crítica** con cuadros clave de cada escena calificados del 1 al 10:

   | Ronda | Peores (nota) | Arreglo |
   |---|---|---|
   | Stills | Colitas de globo encajadas en la frente · globos tapando la cara del otro · párpados como parches planos · tarros que no se podían separar | Colita corta que apunta a la boca · lugar del globo elegido entre varios candidatos evitando caras · parpadeo por aplastamiento de la malla · brindis: los tarros bajan y suben juntos en el "¡Salud!" |
   | 1 (video completo) | Prepa (6): la estrella del ¡crash! tapaba a Diego y el flashback se lavaba · Coche (7): rayas de viento sobre las caras · Créditos (7): primera tarjeta pobre y faltaba el pingüino | Estrella chica en el borde del platillo, destello crema más suave · viento solo sobre el camino · créditos con texto cosido + fieltro y los tres peluches |
   | 2 (video completo) | Café: los corazoncitos pasaban por las caras · puente: el letrero cortaba las cabezas · 9:16: las tazas encimadas en la etiqueta y el "·" que no existe en la letra cursiva | Corazones solo en el hueco entre los dos · encuadre del letrero más alto · utilería reacomodada y fechas con "/" |
   | Nota de Diego | **Safari: salían dos Fannys** (el de la gorra también tenía la cara y el pelo azul de ella). Recolorear el pelo no bastó: seguía pareciendo Fanny | `tools/fix_safari_diego.py`: trasplante de la cabeza de Diego desde la lámina del café (misma pose: inclinado hacia ella, ojos cerrados, lentes), alineada por los lentes, con Fanny, las manos y la cámara delante y el color igualado a la luz del safari. Ahora Diego sale y habla en cuadro. El original queda como `safari_original.*` |
   | Final | Todas las escenas en 8 o más | — |

## Código del episodio

```
make_episode.sh            un comando: canción -> tiempos -> audio -> 16:9 + 9:16 -> verificación
episodio/guion.md          el guion legible
episodio/guion.json        el guion ejecutable: diálogos, acciones, cámara, efectos, sonidos
episodio/rigs.json         por lámina: handles (cabeza, mandíbula, cuerpo, brazos, objetos), ojos, globos, encuadres, loops
episodio/index.html        la página (canvas); ?preview=1&format=16x9 para verla en el navegador
episodio/ep.js             motor: malla WebGL2 deformable, títeres, globos, cámara, transiciones, tarjetas, tele 9:16
episodio/episode.js/.json  GENERADOS: tiempos de cada escena, sílabas de cada línea y eventos de audio
tools/build_episode.py     guion + canción -> línea de tiempo (sílabas en español, DP sobre la canción, clímax)
tools/episode_audio.py     voces de balbuceo por formantes, efectos, música de la parte A, mezcla a -14 LUFS
tools/grid_view.py         hojas con cuadrícula para anotar los rigs
```

---

# Versión 1 — el tablero de fieltro (solo cámara)

La primera versión sigue en el repo: las mismas láminas como parches
cosidos sobre un tablero, con cámara, luz y parallax (sin títeres ni
diálogo).

| Entregable v1 | Archivo |
|---|---|
| Video vertical 9:16 | `out/aniversario_9x16.mp4` |
| Video horizontal 16:9 | `out/aniversario_16x9.mp4` |
| Animatic | `out/animatic_9x16.mp4` |
| Guía de estilo / beat sheet | [`style_guide.md`](style_guide.md) · [`beat_sheet.md`](beat_sheet.md) |

## ⚠️ Lo que no llegó (y cómo terminarlo)

1. **La canción no llegó a la sesión.** Solo llegaron las 4 imágenes, y el
   mp4 no estaba ni en los adjuntos ni en tu Drive. En `perfil/novia.md` dice
   que su canción es *"Disco"* de Surf Curse, pero no la descargué de
   internet. Para no entregar un video mudo ni con tiempos inventados,
   compuse una **pista temporal original** (`tools/compose_scratch.py`: ~69 s,
   120 BPM, Re mayor, glockenspiel tipo cajita musical como guiño al
   xilófono de la prepa). El video está sincronizado a esa pista **usando el
   mismo analizador que va a usar la canción real**: el motor nunca lee la
   partitura, solo lo que detecta en el audio.

   **Para la versión final con la canción:**
   ```bash
   ./make_video.sh ruta/a/cancion.mp4   # v1 (o ./make_episode.sh para el episodio)
   ```
   Extrae solo el audio (`ffmpeg -vn`), re-analiza tempo, secciones y
   clímax, vuelve a repartir las escenas, renderiza ambos formatos y verifica
   que el video solo lleve nuestros cuadros más el audio. Si no quieres
   correrlo tú, mándame el mp4 (adjunto o en Drive) y lo re-renderizo en
   unos minutos: todo el pipeline está listo y probado con un mp4 de prueba.

2. **Llegaron 14 escenas, no 20.** Las 4 imágenes eran collages: 1 retrato
   + 5 + 3 + 5 paneles. No llegaron **la cascada, dormir con Tris y el
   retrato abrazados riendo** (y, según el conteo, otras 3 más). Para
   agregarlas: guarda cada una como `assets/scenes/raw/<id>.png`, corre
   `tools/prepare_assets.sh` y agrega su entrada en `scenes.json` (con su
   acto, peso, cámara y transición). El reparto de tiempos se recalcula solo.

## Decisiones creativas

**1. Un tablero de fieltro con parches cosidos.** Casi todas las láminas son
apaisadas (hasta 2.3:1) y el formato nativo de la canción es 9:16. Recortarlas
a pantalla completa en vertical habría significado ampliar 6× un panel de
300 px de alto. En su lugar, cada escena es un **parche cosido** con marco de
fieltro crema sobre un tablero acolchado (quilt), y la cámara se mueve
**dentro** del parche. Así el vertical queda lleno y el espacio de arriba y
abajo se usa para la etiqueta del acto, el pie de escena cosido y la utilería
de costura.

**2. El hilo rojo.** El hilo de "Amoshit" es rojo. Lo convertí en el hilo
conductor del video: todos los parches, etiquetas y el corazón del título
están cosidos con ese hilo, y en las transiciones de "jalón" el hilo rojo une
una escena con la siguiente, como el hilo rojo del destino.

**3. Orden: un día completo dentro del Acto 2.** Respeté los 4 actos, pero
dentro de la vida cotidiana ordené las escenas **como un día**: café de la
mañana → cocinar → jugar con Snoopy → coche al atardecer → tacos y chelas →
vinilos → karaoke → noche de película. La luz va de la mañana a la noche y
los cortes se sienten motivados; además, las escenas tranquilas caen en el
verso y las intensas en el coro. El coche al atardecer abre el coro. De la
tele de la noche de película "crece" la pantalla que se vuelve el safari:
la aventura empieza cuando se apaga la película. El retrato final tiene
atardecer en la ventana, así que el video cierra el día.

**4. La música manda los tiempos** (`tools/build_timeline.py`). Programación
dinámica sobre los tiempos fuertes: los cortes caen en el tiempo 1 de compás
(o en el 3), se premian los cortes justo en cambios de sección y cada escena
tiene una energía preferida (el café no cae en el coro). El resultado no es
parejo: Amoshit dura 6 s (el momento en que empezó todo), cocina y Snoopy 3 s,
karaoke 5 s, y el puente 8 s. **El letrero "2 años juntos" arranca
exactamente en el clímax detectado** (52.01 s con la pista temporal), con un
corte seco, destello y confeti de fieltro en ese mismo cuadro.

**5. Una cámara distinta por escena.** Paneos en ambos sentidos, tilt de
manos a caras, grúas que bajan, push-ins que se asientan, un pull-back desde
la tele y travellings con parallax. El detalle, con su porqué, está en
[`beat_sheet.md`](beat_sheet.md).

**6. Resortes en forma cerrada, nada de easing.** Hay tres tipos:
- *dolly*: resorte críticamente amortiguado que persigue un objetivo en
  movimiento. Arranca orgánico y sigue vivo a través del corte.
- *settle*: llega y se asienta.
- *landing*: resorte subamortiguado calculado para cruzar su destino
  exactamente en el beat. Así los parches y las letras aterrizan en el tiempo
  fuerte y rebotan después.

Los golpes de beat (el coche que brinca, los parches que respiran, el corazón
que late) son respuestas al impulso del mismo oscilador.

**7. Stop-motion de verdad.** Lo que es "objeto de fieltro" (notas, hojas,
confeti, espuma, puntadas de las letras) se mueve a dos por cuadro (12 fps).
La cámara y la luz van a 30 fps, con medio pixel de temblor de set a 12 fps.

**8. Parallax en planos, como un diorama multiplano.** Mapas de profundidad
(Depth Anything V2) separan los planos de coche, safari, aviario (3 planos),
puente y retrato. Cada máscara se afina contra los bordes reales y detrás de
cada recorte solo se rellena lo que la cámara alcanza a asomar. En el safari,
coche y jirafa comparten plano porque separarlos partía el techo del coche.

**9. Partículas solo donde aportan:** notas de fieltro que brotan por los
costados del parche en las escenas de música (sin tapar caras), espuma en el
brindis, flash de su cámara en el safari, luciérnagas de lana en la noche de
película, hojas en el aviario y confeti en el clímax. Cocina y Snoopy van
limpias a propósito.

**10. Textos** (editables en `scenes.json` → `titles`): "Fanny & Diego · dos
años de nosotros · 20·10·2024 — 20·10·2026" al abrir, y "Feliz aniversario ·
y por todos los que faltan" al cerrar. Todo en letras de fieltro cosidas
(Fredoka) e hilo cursivo (Dancing Script), imitando los letreros PREPA 9,
2 AÑOS JUNTOS y el hilo Amoshit.

**11. Resolución.** Las láminas miden ~700 px de ancho. Real-ESRGAN x4
(CPU/ncnn) les da nitidez, pero "plancha" la fibra del fieltro, así que la
versión HD es **60 % ESRGAN + 40 % el original ampliado**: nítido y todavía
con textura. Los números de galería ("17", "2", "11"…) que traían los
collages se borraron con un trasplante de textura vecina.

## Flujo de trabajo que se siguió

1. **Revisión del repo**: el `CLAUDE.md` y las skills que hay (`dinero`,
   `revisemos-cerebro`) son del segundo cerebro; no había nada de animación
   ni de render que reutilizar, así que el pipeline se hizo desde cero dentro
   de `proyectos/video-aniversario/`.
2. **Style guide y beat sheet**: `style_guide.md` (paleta muestreada de las
   láminas, tipografía y texturas) y `beat_sheet.md` (generado del análisis).
3. **Animatic** a media resolución y 15 fps para revisar composición y
   tiempos de las 14 transiciones.
4. **Loop de crítica** con stills de los frames clave calificados del 1 al 10:

   | Ronda | Peores 3 (nota) | Arreglo |
   |---|---|---|
   | 1 | Película (5.5): a mitad del paneo solo pared vacía · Título (6): vacío abajo, subtítulo tardío · Amoshit (6): a mitad del paneo no se ve a nadie. Extra: espuma del brindis tapando los tarros (6.5) | Parches más anchos para película y Amoshit · corazón de fieltro cosido que late en el título · espuma más chica y hacia arriba |
   | 2 | Título completo visible solo 0.4 s · Película (7) · Título 16:9 (7.5) | Palabras del título en cada beat · pull-back desde la película de la tele · composición del 16:9 rebalanceada |
   | 3 (bordes de parallax a resolución nativa) | Techo del coche partido en el safari · esquinas borrosas en el arco del puente · manchas en la punta de los postes | Coche y jirafa en un solo plano · umbral de profundidad del puente · relleno solo bajo lo opaco y "máscara segura" donde la profundidad no deja duda · parallax más sutil |
   | Final | Todas las escenas en 8 o más (puente 9) | — |
5. **Render final** en alta calidad de ambos formatos y verificación
   (`tools/verify_video.py`): 1 pista de video + 1 de audio, con correlación
   1.000 de la envolvente contra la canción analizada.

## Código

```
make_video.sh            un comando: canción -> análisis -> tiempos -> animatic -> 9:16 + 16:9 -> verificación
scenes.json              dirección: orden, actos, pesos, cámara por formato, efectos, transiciones, textos
engine/index.html        el HTML único (canvas); ?preview=1 para verlo en el navegador con audio
engine/engine.js         motor: seek(t) determinista, resortes, parallax, partículas, tipografía de fieltro
engine/timeline.js       GENERADO: tiempos de cada escena según la canción
tools/analyze_audio.py   tempo (rejilla fina o seguimiento dinámico), compases, energía, secciones, clímax
tools/build_timeline.py  reparte escenas en la música (DP) y regenera beat_sheet.md
tools/render.cjs         Playwright en paralelo + ffmpeg (ganancia lineal a -14 LUFS, sin compresión)
tools/verify_video.py    verifica pistas y que el audio sea el de la canción
tools/compose_scratch.py la pista temporal original
tools/prepare_assets.sh  láminas -> escenas: split_panels, clean_numbers, upscale, prepare_hd, depth, layers
assets/source/           las 4 láminas tal como llegaron
assets/scenes/           raw (14 escenas), hd (3x), depth, layers (planos de parallax)
assets/fonts/            Fredoka y Dancing Script (licencia OFL incluida)
```

**Requisitos:** Python 3 con numpy, scipy, librosa, opencv-python-headless,
pillow y soundfile; Node con Playwright (Chromium); ffmpeg. Para regenerar
los assets también hacen falta ncnn, onnxruntime y los modelos listados en
`tools/prepare_assets.sh`.

**Vista previa interactiva:** `npx http-server .` y abre
`engine/index.html?preview=1&format=9x16` (o `16x9`).
