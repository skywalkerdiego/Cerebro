# 🎬 Videos hechos con Claude Opus 5.5 (animación como código)

**Fuente:** https://github.com/yihui-dev/awesome-opus5-5-videos
(leído el 25/10/2026; el repo se actualiza seguido — 703 prompts a esa fecha).
Cada prompt está en `prompts/<autor>-<id>.md` y todo junto en `data/videos.json`
(campos: `category`, `tech_tags`, `prompt`, `post_url`).

## La idea central

Nadie genera "video" directamente. Se le pide a Claude que **escriba la
animación como código** (un solo archivo HTML) y luego se graba la pantalla.
Sirve para: motion graphics, explicadores, escenas 3D, juegos, intros de marca,
lanzamientos de producto, reels.

## Qué hay en la colección

| Categoría | Cantidad |
|-----------|----------|
| Motion graphics | 369 |
| 3D | 117 |
| Explicadores | 116 |
| Interactivos / juegos | 101 |

Tecnologías más usadas: Canvas (267), SVG (183), Three.js (131), shaders (92),
GSAP (86), CSS (57), audio sintetizado en JS (39).

## Patrones de los prompts que funcionan

1. **Cortos.** Mediana ≈ 220 caracteres. No hace falta guion largo.
2. **Formato explícito:** duración ("30s"), proporción ("9:16" para reels/shorts),
   estilo ("dibujado a lápiz", "explicador", "como lanzamiento de SaaS en Twitter").
3. **Pasos de la historia en lista numerada** (1. … 2. … 3. …).
4. **Material propio:** logo, imágenes, URL del producto para que investigue,
   o un video de referencia del estilo.
5. **Subir la vara con palabras:** "como si fuera tu showreel, dalo todo",
   "calidad Pixar" — cambia el resultado.
6. **Audio:** pedir "melodía/efectos con sintetizador de JavaScript".
7. **Salida:** "un solo archivo HTML" → abrir en navegador → grabar pantalla.

## Plantilla lista para usar

> Haz una animación de **[duración]** en **[proporción]**, estilo **[estilo]**,
> con **[Canvas / SVG+GSAP / Three.js]**, sobre **[tema]**.
> Pasos: 1. … 2. … 3. …
> Usa mi logo/colores: [...]. Con sonido sintetizado. Un solo archivo HTML.
> Hazlo como si fuera tu showreel — dalo todo.

## Ideas para aplicarlo (Cerebro)

- Explicador animado de un concepto de finanzas (interés compuesto, ahorro).
- Reel 9:16 de logros o avance de metas.
- Visualización animada de métricas de Trabajo.exe.

## Cómo volver a consultarlo

```
git clone --depth 1 https://github.com/yihui-dev/awesome-opus5-5-videos
```
Buscar ejemplos por categoría/tecnología en `data/videos.json`.
