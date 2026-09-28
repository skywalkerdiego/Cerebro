# 🎬 Fanny & Diego — video de aniversario (2 años)

Video animado en estilo fieltro/stop-motion para el 20/10/2026, hecho 100 %
con código: las láminas originales se componen como capas en un HTML con
`seek(t)`, se renderizan cuadro por cuadro con Playwright y se unen con
ffmpeg. Ningún personaje se redibujó: la animación es de cámara, luz,
planos y detalles de fieltro alrededor del arte.

| Entregable | Archivo |
|---|---|
| Video vertical 9:16 (1080×1920, 30 fps) | `out/aniversario_9x16.mp4` |
| Video horizontal 16:9 (1920×1080, 30 fps) | `out/aniversario_16x9.mp4` |
| Animatic (baja calidad, 15 fps) | `out/animatic_9x16.mp4` |
| Versiones para compartir (< 30 MB, misma resolución) | `out/*_compartir.mp4` (las genera `make_video.sh`; no se versionan) |
| Guía de estilo | [`style_guide.md`](style_guide.md) |
| Beat sheet (escena · tiempo · movimiento) | [`beat_sheet.md`](beat_sheet.md) |

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
   ./make_video.sh ruta/a/cancion.mp4
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
