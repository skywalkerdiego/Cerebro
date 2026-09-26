# Prompts para generar las escenas — estilo Laika

Guion base: el corto **"Dos años, hechos a mano"** (90 s, 10 escenas,
música a 90 BPM). Cada escena necesita **una imagen fija 16:9** (la
llave visual) y, si quieres movimiento real, **un clip de 5–10 s**
generado a partir de esa imagen (image-to-video).

Flujo recomendado:

1. **Midjourney** (o Flux / Imagen) → genera primero las 3 *hojas de
   personaje* (Diego, Fanny, Tris). Escoge la mejor de cada una.
2. Usa esas hojas como referencia de personaje en **todas** las escenas
   (`--cref` / `--oref` en Midjourney, "Character reference" en
   Runway/Kling, "Elements" en Kling). Esto es lo que mantiene las caras
   iguales de escena a escena — sin esto cada imagen sale con otro muñeco.
3. Con la imagen fija de cada escena → **Kling / Runway / Sora** en modo
   image-to-video con el prompt de movimiento.
4. Exporta a `public/escenas/` con el nombre exacto que dice cada escena
   (`karaoke.jpg` o `karaoke.mp4`, etc.). El código de Remotion ya los
   busca ahí.

---

## 0. Bloque de estilo (se pega en TODOS los prompts)

```
Laika Studios style stop-motion animation, hyperrealistic CGI rendering of
hand-carved wooden puppets, intricate wood grain, visible chisel marks and
fine carving detail, subsurface scattering in the wood so it glows warm and
organic, realistic fabric textures with woven threads, stitching and soft
folds, handcrafted miniature set built at 1:6 scale, cinematic lighting,
warm golden key light, soft volumetric light rays through haze, soft
shadows, shallow depth of field, anamorphic 35mm lens, subtle film grain,
Coraline and Guillermo del Toro's Pinocchio production design,
award-winning feature film still, 8k
```

## 0.1 Negativo (se pega en TODOS los prompts)

En Midjourney va con `--no`; en Kling, Runway y SDXL en el campo
*Negative prompt*. Sora no tiene campo negativo: agrega al final del
prompt la frase *"Not low-poly, not plastic, not clay, no blocky shapes,
no smooth untextured surfaces."*

```
low-poly, plastic, clay, claymation, plasticine, blocky, smooth surfaces,
glossy toy, vinyl figure, Funko Pop, ball-jointed wooden beads, simple
spheres, 2D cartoon, anime, flat shading, cel shading, video game render,
Pixar style, uncanny human skin, extra fingers, deformed hands, text,
watermark, logo, oversaturated, blurry faces
```

---

## 1. Hojas de personaje (hazlas primero)

### 1.1 Él — Diego

```
Character turnaround sheet of a hand-carved wooden puppet young man, dark
curly hair carved from dark walnut wood with deeply defined individual
curls and ringlets, round thin gold wire-rimmed glasses, expressive carved
face with warm almond eyes, gentle smile, maple wood skin, small silver septum ring and tiny silver hoop earrings,
wearing a realistic lavender cotton button-up shirt with tiny mother-of-
pearl buttons, rolled sleeves, natural fabric folds and visible stitching,
dark navy trousers, front view, three-quarter view and side view on a
neutral warm grey backdrop, studio softbox lighting,
[BLOQUE DE ESTILO]
--ar 16:9 --style raw --stylize 250 --no [NEGATIVO]
```

### 1.2 Ella — Fanny

```
Character turnaround sheet of a hand-carved wooden puppet young woman,
long straight dark brown hair carved from walnut wood in long fine
parallel strands that fall past her shoulders, round thin wire-rimmed
glasses, delicate carved face with soft cheeks, warm brown eyes, painted
rosy blush, small gold hoop earrings, wearing a knee-length dusty rose
cotton dress with real woven cotton texture, tiny fabric-covered buttons,
soft gathers and natural wrinkles, front view, three-quarter view and side
view on a neutral warm grey backdrop, studio softbox lighting,
[BLOQUE DE ESTILO]
--ar 16:9 --style raw --stylize 250 --no [NEGATIVO]
```

### 1.3 Tris — la perrita

```
Character sheet of a small fluffy white dog puppet carved from pale
limewood, fur carved as thousands of soft fluffy curled tufts with fine
chisel detail, light cream patina, glossy shiny black glass bead eyes with
tiny catch-light reflections, small black carved nose, floppy fluffy ears,
tail curled up, sitting, standing and running poses on a neutral warm grey
backdrop, studio softbox lighting,
[BLOQUE DE ESTILO]
--ar 16:9 --style raw --stylize 250 --no [NEGATIVO]
```

> En las escenas, cambia la ropa en el prompt pero conserva siempre las
> frases de pelo, gafas y cara — son las que fijan la identidad.
> Midjourney: `--cref <url-hoja> --cw 60` (baja `--cw` a 30–40 cuando
> cambie la ropa, para que solo copie cara y pelo).

---

## 2. Escenas

Cada escena tiene: **archivo**, **imagen** (Midjourney) y **movimiento**
(Kling / Runway / Sora). Las duraciones coinciden con el guion; genera
clips de 5 s en Kling o 10 s en Runway — Remotion los estira o recorta.
En todos los prompts de imagen reemplaza `[BLOQUE DE ESTILO]` y
`[NEGATIVO]` por los bloques de la sección 0.

### 00 · Intro — "El taller despierta" (0–10 s)
Archivo: `public/escenas/intro.jpg` / `intro.mp4`

**Imagen**
```
Wide shot of a cozy woodcarver's workbench at night in a miniature
workshop, the two wooden puppets (the curly-haired young man with round
wire glasses and the young woman with long straight hair and round
glasses) lying asleep side by side on the workbench among curled wood
shavings, chisels, gouges, sandpaper and small glass jars of paint, a
small white fluffy wooden dog asleep on a folded cloth, a brass
articulated desk lamp just turning on and casting a warm golden cone of
volumetric light through floating sawdust, dark plank wall behind with a
shelf of jars,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> <tris> --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. The desk lamp flickers twice and turns on, warm
light floods the bench. The two wooden puppets slowly blink awake, sit up
and look at each other and smile; the little white dog lifts its ears and
hops toward them wagging its tail. Slow push-in dolly from high angle down
to the puppets' eye level. Sawdust floating in the light beam. Slightly
stepped stop-motion movement at 12 fps, handcrafted feel.
```

### 01 · Karaoke — "Desafinados, pero juntos" (10–18 s)
Archivo: `public/escenas/karaoke.jpg`

**Imagen**
```
Medium shot of the two wooden puppets singing karaoke together on a tiny
handmade stage, both holding miniature vintage microphones, he wears a
lilac cotton knit sweater with visible knit texture, she wears a deep
burgundy cotton dress, both laughing with eyes half closed, purple and
magenta neon glow from a miniature karaoke screen, cyan rim light, small
carved wooden music notes floating in the air, haze catching the colored
light beams,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. The two wooden puppets sing off-key into their
microphones, swaying to the beat, she bumps his shoulder and they both
laugh. Carved wooden music notes drift upward. Neon lights pulse slowly.
Slow lateral dolly from left to right. Stepped stop-motion movement.
```

### 02 · Lago — "Tú, yo y la neblina" (18–26 s)
Archivo: `public/escenas/lago.jpg`

**Imagen**
```
Misty lakeside dawn in a miniature set, the two wooden puppets standing on
a small stone pier behind a teal-painted metal railing, he wears a black
quilted puffer jacket with realistic nylon quilting and dark sunglasses
pushed up on his curly hair, she wears a charcoal puffer jacket and light
blue jeans with real denim weave, he leans in to kiss her cheek, soft
fog rolling over glassy teal water, pine forest silhouettes in the
background, two tiny carved ducks on the water, cool soft morning light
with a warm sun breaking through the fog in volumetric rays,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. Fog drifts slowly across the lake, tiny ripples on
the water, the ducks glide. The young man puppet leans in and gives her a
kiss on the cheek; she closes her eyes and smiles, tilting her head toward
him. Very slow push-in. Stepped stop-motion movement.
```

### 03 · Venado — "Alguien se coló en la foto" (26–34 s)
Archivo: `public/escenas/venado.jpg`

**Imagen**
```
Handheld-feeling medium shot in a misty miniature pine forest, the two
wooden puppets in black puffer jackets posing for a selfie in front of a
thin wire fence, a curious carved wooden deer with delicate branching
antlers pokes its head over the fence right between them, both puppets
turning with surprised open-mouth expressions, forest floor with carved
fallen leaves and moss, soft overcast light with volumetric rays through
the pines,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. The puppets smile for a selfie; the wooden deer
slowly leans its head in between them, tilts it curiously and blinks. The
puppets turn, surprised, then burst out laughing. Slight handheld camera
shake. Stepped stop-motion movement.
```

### 04 · Acuario — "Tú mirabas los peces; yo, a ti" (34–42 s)
Archivo: `public/escenas/acuario.jpg`

**Imagen**
```
The two wooden puppets seen from behind three-quarter in front of a huge
glowing aquarium tank, she looks up at the fish with wonder, he is not
looking at the fish — he looks at her with a tender smile, he wears a
cream and black horizontal-striped cotton t-shirt, she wears a slate grey
cotton top, silhouettes of carved and painted wooden fish and a manta ray
drifting in deep blue water, caustic light patterns dancing across their
wooden faces and clothes, bubbles, deep blue and violet ambience with a
warm skin highlight,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. Wooden fish glide slowly across the tank, bubbles
rise, water caustics ripple over the puppets. She points at a fish in
awe; he keeps looking only at her and smiles. Slow arc of the camera from
behind them to their profiles. Stepped stop-motion movement.
```

### 05 · Navidad — "Nuestra Navidad morada" (42–50 s)
Archivo: `public/escenas/navidad.jpg`

**Imagen**
```
Cozy miniature living room at Christmas night, the two wooden puppets in
matching lavender and purple knit sweaters with real wool texture, sitting
on a wooden floor beside a small Christmas tree decorated only in purple,
lilac and gold ornaments, a warm string of fairy lights across the wall,
the little white fluffy wooden dog wearing a tiny purple bow, a wrapped
gift with purple ribbon, snow falling outside a frosted window, warm
golden light with bokeh, soft shadows,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> <tris> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. Fairy lights twinkle, snow falls outside the
window. She opens the purple gift and gasps with joy, he watches her
smiling, the little dog tilts its head and wags its tail. Slow push-in
with a gentle bokeh shift. Stepped stop-motion movement.
```

### 06 · Mundial — "Mismo equipo, siempre" (50–58 s)
Archivo: `public/escenas/mundial.jpg`

**Imagen**
```
The two wooden puppets in a miniature living room wearing matching green
Mexico national team style soccer jerseys with real mesh polyester texture
and stitched details (no logos), jumping and celebrating a goal in front
of a small vintage wooden television glowing green, green white and red
papel picado bunting across the wall, paper confetti in the air, a tiny
stitched leather soccer ball on the rug, warm light with a green glow from
the TV,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> --cw 40 --no [NEGATIVO] logos, brand names
```

**Movimiento**
```
Stop-motion animation. The puppets jump up and hug, celebrating a goal,
confetti bursts and flutters down, papel picado sways. Quick push-in then
settles. Stepped stop-motion movement.
```

### 07 · Rancho — "Hasta de vaqueros" (58–66 s)
Archivo: `public/escenas/rancho.jpg`

**Imagen**
```
The two wooden puppets dressed as cowboys in a miniature rustic barn,
both wearing leather cowboy hats with real stitched leather texture, he
wears a blue plaid flannel shirt with pearl snap buttons and jeans, she
wears a brown suede fringe jacket over a red top and light jeans, hay
bales, wooden plank walls, a hanging oil lantern casting warm orange
light, dust motes floating in golden volumetric beams through the barn
slats,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. He tips his cowboy hat to her with a grin, she
laughs and does a little twirl, jacket fringe swinging. The lantern
flickers softly, dust floats in the light beams. Slow lateral dolly.
Stepped stop-motion movement.
```

### 08 · Doctora — "Mi doctora favorita" (66–74 s)
Archivo: `public/escenas/doctora.jpg`

**Imagen**
```
Bright miniature doctor's office, she wears a crisp white cotton lab coat
with realistic fabric folds and a stethoscope around her neck, listening
to his heart with the stethoscope while he wears a navy pinstripe button-
up shirt and blushes, the little white fluffy dog sitting at their feet
looking up, small carved wooden hearts floating up, soft morning light
pouring through a window with volumetric god rays, clean pale wood floor,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> <tris> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. She places the stethoscope on his chest and
listens, raises her eyebrows and smiles; small carved wooden hearts float
up from his chest. The dog wags its tail and hops. Slow push-in toward
their faces. Stepped stop-motion movement.
```

### 09 · Final — "Feliz aniversario" (74–90 s)
Archivo: `public/escenas/final.jpg` / `final.mp4`

**Imagen**
```
Back on the woodcarver's workbench at night, the two wooden puppets
sitting close together on a carved wooden block, he in a lilac striped
cotton shirt, she in a cream cotton dress, he gives her a small hand-
carved wooden heart, she holds it with both hands, the little white
fluffy dog at their feet, behind them on the plank wall a string of eight
polaroid photos hangs with tiny wooden clothespins, warm golden desk lamp
light with volumetric rays and floating sawdust, deep warm shadows,
[BLOQUE DE ESTILO] --ar 16:9 --style raw --stylize 300 --cref <él> <ella> <tris> --cw 40 --no [NEGATIVO]
```

**Movimiento**
```
Stop-motion animation. He offers the small carved wooden heart, she takes
it, covers her mouth in surprise, then leans in and kisses his cheek; he
blushes. The dog wags its tail. The polaroids on the wall sway gently.
Slow pull-back crane shot revealing the whole workbench as the lamp light
slowly dims. Stepped stop-motion movement.
```

---

## 3. Ajustes por herramienta

| Herramienta | Qué usar | Parámetros |
|---|---|---|
| **Midjourney v7** | Imágenes fijas y hojas de personaje | `--ar 16:9 --style raw --stylize 250-300`, `--cref` + `--cw 30-60`. Genera 4, escoge la de mejor madera y mejores manos. |
| **Kling 2.x** | Mejor opción para movimiento de muñecos | Image-to-video, 5 s, modo *Professional*, `creativity/relevance` ≈ 0.5, pega el negativo en *Negative prompt*. Usa *Elements* con las 3 hojas de personaje. |
| **Runway Gen-4** | Movimiento de cámara muy controlado | Image-to-video, 10 s, *Camera control*: Push-in 2–3 / Truck. Usa *References* con las hojas. |
| **Sora** | Escenas con mucha acción (mundial, venado) | Sube la imagen como primer frame, 8 s, 16:9. Agrega el negativo como frase al final del prompt. |

**Truco Laika:** si el clip sale demasiado fluido (se ve CGI), pide
`"animated on twos, 12 fps stop-motion stepping"` en el prompt de
movimiento. El proyecto de Remotion además tiene `stopMotion: true`
en `src/config.ts`, que sostiene cada cuadro dos veces (movimiento en
"dos").

**Resolución:** exporta 1920×1080 o más. Si Kling te da 720p, súbelo
antes con Topaz / Magnific; el efecto Ken Burns acerca hasta 12 % y se
nota la falta de resolución.
