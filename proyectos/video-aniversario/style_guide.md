# Style guide — "felt world" de Fanny & Diego

Guía escrita **a partir de las láminas originales** (no al revés). Todo lo que
el motor agrega (tablero, marcos, letras, partículas) tiene que parecer hecho
del mismo material que las láminas: fieltro, estambre, hilo, botones.

## 1. Elenco y continuidad (no negociable)

| Personaje | Rasgos que nunca cambian |
|---|---|
| **Él (Diego)** | Cabello rizado oscuro, lentes redondos dorados, suéter de rayas arcoíris (en karaoke: saco azul; en Snoopy: suéter verde; en el coche: lentes oscuros). |
| **Ella (Fanny)** | Cabello azul lacio de estambre, lentes redondos, arracadas, chamarra negra, falda/overol de mezclilla. A veces gorra verde-amarilla. |
| **Tris** | Poodle/bichón blanco de rizos, collar rojo con dije de corazón. |
| **Cameos** | Peluche de Snoopy, el changuito con suéter arcoíris, los pingüinos con gorro. Solo fondo, nunca protagonistas. |

Las 14 láminas son **arte final**: el motor solo las recorta, las mueve y las
ilumina. Nunca se redibuja a nadie. Lo único que se "tocó" fue borrar los
números de galería ("17", "2", "11"…) que traían encimados los collages
(`tools/clean_numbers.py`, trasplante de textura vecina).

## 2. Paleta

Muestreada con k-means sobre las láminas (`tools/` → ver el comando en la
sección 7). Las láminas viven en **cálidos terrosos** (madera, piel de
fieltro, luz de atardecer) con **acentos saturados** de juguete.

**Base cálida (dominantes de las láminas)**

| Uso | Hex | De dónde sale |
|---|---|---|
| Madera / piel de fieltro | `#a16b43` `#ba8c5e` `#c28c5c` | coche, café, tacos |
| Sombra cálida | `#5c3121` `#4a231c` | café, amoshit |
| Crema / papel | `#dcb994` `#faedcb` | amoshit, café (luz de ventana) |
| Noche | `#27232f` `#1a0c13` | película, karaoke |
| Cielo lavado | `#b3d2e4` `#9ab6c6` | puente, safari |

**Acentos (los del suéter arcoíris y los parches)** — usados en letras,
notas, confeti y botones:

| Nombre | Hex |
|---|---|
| teal | `#2f8f8a` |
| mostaza | `#e3a52b` |
| rosa | `#e0708a` |
| morado | `#7a5aa8` |
| verde | `#5f9a4a` |
| naranja | `#e0763a` |
| cielo | `#6fa7d6` |
| rojo | `#c8323c` |

**Hilo rojo `#b3263a`** — el color del hilo de "Amoshit". Es el hilo
conductor visual del video: con él están cosidos todos los parches, las
etiquetas, el corazón del título, y en las transiciones de "jalón de hilo"
une una escena con la siguiente (el hilo rojo del destino).

**Crema de fieltro `#f3e7cf`** — marcos de los parches y etiquetas.

**Tablero por acto** (fieltro de fondo; cambia con un resorte, no de golpe):

| Acto | Color | Por qué |
|---|---|---|
| Título | vino `#5b2333` | romántico, el mismo del final (el video abre y cierra igual) |
| I · Cómo empezamos | teal profundo `#23505a` | contraste frío con la pared crema del salón de música |
| II · Nuestros días (mañana) | mostaza tostado `#8a5a1c` | la luz dorada del café y la cocina |
| II · Nuestros días (noche) | índigo `#3b2a55` → `#1d1b33` | atardecer del coche → noche de karaoke y película |
| III · Nuestras aventuras | verde bosque `#2d4a2b` | safari y aviario |
| IV · Dos años | vino `#5b2333` | cierra el círculo con el título |

## 3. Tipografía "bordada / cosida en fieltro"

Imita los letreros de las láminas: **PREPA 9** (letras gorditas de fieltro
teal con puntada), **2 AÑOS JUNTOS** (letras multicolor, una por color) y el
hilo **Amoshit** (cursiva de estambre rojo).

| Rol | Fuente | Tratamiento |
|---|---|---|
| Letras de fieltro (título, "Feliz aniversario") | **Fredoka** 600 (OFL) | cada letra de un color de acento, recortada en fieltro: textura de fibra, luz arriba/sombra abajo (volumen), canto oscuro de 3.5 % (grosor), sombra proyectada, **puntadas punteadas crema a ~7 % del borde hacia adentro**, leve rotación/desfase por letra (hecho a mano) |
| Hilo cursivo (subtítulos, pies de escena) | **Dancing Script** 700 (OFL) | relleno crema/tinta con patrón diagonal de hilo torcido y sombra; aparece **cosido** de izquierda a derecha con una aguja que arrastra hilo rojo |
| Etiquetas de acto | Fredoka 600 | etiqueta de fieltro crema con borde de puntada roja y un circulito rojo con el número romano |

Las letras "caen" una por una con un resorte subamortiguado (rebote de
~13 %) y las palabras del título aterrizan en beats de la canción.

## 4. Texturas y materiales

- **Fibra de fieltro**: textura procedural de 6 500 fibras cortas claras y
  oscuras (sin costuras), multiplicada sobre el tablero, los marcos y las letras.
- **Tablero acolchado (quilt)**: parches irregulares con leves diferencias de
  tono, costuras hundidas y puntadas a ambos lados.
- **Parches (tarjetas)**: marco de fieltro crema de 16–18 px, esquinas
  redondeadas, puntada roja punteada, sombra suave y sombra interior arriba
  (el parche está cosido "hacia adentro").
- **Utilería**: botones de 4 hoyos cosidos con hilo rojo y un carrete de hilo
  rojo en los márgenes del formato vertical (se retiran para el texto final).
- **Grano**: ruido suave en *soft-light* cambiando a 12 fps + viñeta.

## 5. Movimiento

- **Resortes en forma cerrada, nunca easing genérico.** Tres familias:
  - *dolly*: resorte críticamente amortiguado que persigue un objetivo que
    avanza a velocidad constante → la cámara arranca como una grúa real y
    sigue viva a través del corte.
  - *settle*: respuesta al escalón (ζ≈0.95, o 0.72 en Snoopy para que rebote)
    → llega y se asienta, para escenas íntimas.
  - *landing*: resorte subamortiguado calculado para cruzar su destino
    **exactamente en el beat** → los parches y las letras "aterrizan" en el
    tiempo fuerte y rebotan después.
- **Stop-motion**: todo lo que es "objeto de fieltro" (notas, hojas,
  confeti, espuma, puntadas de las letras) se mueve **a dos por cuadro
  (12 fps)**; la cámara y la luz van a 30 fps. Un "gate weave" de medio pixel
  a 12 fps da el temblor de set físico.
- **Reacción a la música**: los parches "respiran" (±0.7 %) en tiempos fuertes
  cuando hay energía; el coche brinca con cada beat; los reflectores del
  karaoke laten; el corazón del título late con los compases.

## 6. Partículas: solo donde aportan

| Escena | Detalle | Por qué ahí |
|---|---|---|
| Prepa, vinilos, karaoke | notas musicales de fieltro que brotan por los costados del parche | son escenas de música; salen del parche para no tapar caras |
| Amoshit, café, retrato | pelusa / polvo en la luz | luz cálida de ventana |
| Café | rayos de luz de la ventana | mañana |
| Coche | sol con destellos de lente, viento | atardecer en movimiento |
| Tacos | espuma de fieltro al chocar tarros, en un tiempo fuerte | el "¡salud!" |
| Película | parpadeo de la tele, **luciérnagas de lana** | la escena nocturna |
| Safari | flash de su cámara en un tiempo fuerte | se están tomando la foto |
| Aviario | hojas y pétalos de fieltro cayendo | selva |
| Puente | **confeti de fieltro que estalla en el golpe del clímax** + el sol del letrero brillando | el momento "2 años juntos" |

Cocina y Snoopy no llevan partículas a propósito: son las escenas más
"cotidianas" y respiran mejor limpias.

## 7. Cómo se sacó la paleta

```bash
python3 - <<'EOF'
import cv2, numpy as np
for i in ["prepa","cafe","coche","puente"]:
    px = cv2.cvtColor(cv2.imread(f"assets/scenes/raw/{i}.png"), cv2.COLOR_BGR2RGB).reshape(-1,3).astype(np.float32)
    _, lab, cen = cv2.kmeans(px[::40], 5, None, (3, 30, 1.0), 3, cv2.KMEANS_PP_CENTERS)
    print(i, ["#%02x%02x%02x" % tuple(map(int, c)) for c in cen])
EOF
```
