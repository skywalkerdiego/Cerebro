# Dos años, hechos a mano — versión Laika

Corto de aniversario (20/10/2026) re-montado en **Remotion** con estética
stop-motion hiperrealista. Mismo guion, textos y música que el corto
original en Three.js ([artifact](https://claude.ai/artifact/SCo2pY6gZUxnJmcgVDXRw6)),
pero ahora las escenas son imágenes/clips generados con IA.

## Pasos

1. **Generar las escenas** con los prompts de [PROMPTS.md](PROMPTS.md)
   (primero las 3 hojas de personaje, luego las 10 escenas).
2. **Guardarlas** en `public/escenas/` con el nombre de la escena:
   `intro`, `karaoke`, `lago`, `venado`, `acuario`, `navidad`, `mundial`,
   `rancho`, `doctora`, `final` — en `.mp4` (clip) o `.jpg`/`.png`
   (imagen fija). Si existen los dos, gana el clip. Si falta alguno, sale
   un marcador de posición para que se vea qué falta.
3. `npm install` y `npm run studio` para verlo en vivo.
4. `npm run render` → `out/aniversario.mp4` (1080p, 30 fps, 90 s).

## Qué le hace el código a cada escena

| Capa | Archivo | Qué hace |
|---|---|---|
| Ken Burns | `src/efectos/KenBurns.tsx` | Zoom y paneo lentos con curva suave; el encuadre de cada escena está en `src/config.ts` |
| Stop-motion "en dos" | `src/escenas/Escena.tsx` | Sostiene cada cuadro dos veces (12 fps) sobre la imagen; texto y luz siguen fluidos. Se apaga con `STOP_MOTION = false` |
| Gradación cálida | `src/efectos/Gradacion.tsx` | Matriz de color ámbar + curva S con negros levantados, intensidad por escena (`calidez`) |
| Bloom | `src/efectos/Gradacion.tsx` | Altas luces aisladas, desenfocadas en dos radios y sumadas en pantalla; respira con los graves de la música |
| Rayos volumétricos + polvo | `src/efectos/Atmosfera.tsx` | Haces de luz desde la fuente de cada escena (`luz`) y motas de aserrín que solo brillan dentro del haz |
| Viñeteado, grano, parpadeo | `src/efectos/Atmosfera.tsx` | Viñeta cálida, grano de película que cambia cada 2 cuadros y parpadeo de exposición mínimo |
| Transición | `src/transiciones/fundidoCalido.tsx` | Disolvencia de 1 pulso con desenfoque de salida y fuga de luz ámbar |

## Sincronía con la música

La música va a **90 BPM** y el render a **30 fps → 1 pulso = 20 cuadros
exactos**. Todo se mide en pulsos (`src/config.ts`):

- Cada escena empieza en su pulso original (intro 0 s, karaoke 10 s,
  lago 18 s… final 74 s) y las transiciones duran 1 pulso.
- Cada leyenda cae en el **pulso 8** de su escena con un destello, y
  entra una palabra por medio pulso.
- El título entra letra por letra en cuartos de pulso; el cierre, una
  línea por pulso marcado.
- El bloom y los rayos leen la **energía real de graves** del audio
  (`src/efectos/ritmo.tsx`) y dan un golpe extra en el primer pulso de
  cada compás.

Si al ver el render los golpes caen corridos, ajusta `DESFASE_MUSICA`
(en cuadros) en `src/config.ts`.

`public/musica.mp3` es la misma pista del corto original.
