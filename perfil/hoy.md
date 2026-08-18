# 🌤️ Hoy

Información de contexto inmediato: dónde estás, a dónde te mueves, y
qué es lo próximo que se acerca en el calendario.

Tablero: [Hoy.exe](https://claude.ai/code/artifact/b7358df3-d5c4-4b82-80c6-e4f375a149aa)
— fecha y hora en vivo, más el evento más próximo calculado en tiempo
real. El clima es una lectura capturada (ver nota abajo), no en vivo.

## Ubicaciones

- **Casa:** Nezahualcóyotl, Estado de México (CP 57180).
- **Trabajo (Boost Mobile):** call center presencial, zona Tabacalera,
  junto al Monumento a la Revolución, CDMX.
- **Traslado:** ~1h20 por trayecto (2h40 al día) — ver
  [rutina.md](rutina.md).

## Clima

Los tableros no pueden llamar a un servicio de clima en vivo (los
artifacts de Claude no tienen acceso a internet en el navegador), así
que el clima en Hoy.exe es una **lectura capturada**, con fecha de
cuándo se tomó. Pídeme "actualiza el clima" cuando quieras una lectura
fresca y la vuelvo a consultar y a publicar.

Última lectura (18/08/2026):
- Casa (Nezahualcóyotl): 17–20°C, nublado con lluvia débil por la
  tarde/noche, viento SE ~10 km/h.
- Trabajo (Tabacalera/Monumento a la Revolución): 22°C, mayormente
  nublado con lluvias ligeras, viento N ~10 km/h.

## Notas

- La fecha/hora y "lo más próximo" en Hoy.exe sí se recalculan solos
  en cada carga (mismo mecanismo que los contadores de días de
  [Nosotros.exe](https://claude.ai/code/artifact/958d66cd-dbca-442a-b286-37994df7026e),
  [Yo.exe](https://claude.ai/code/artifact/f3018b22-33ba-4ddb-bda7-fd0fd8e924bf)
  y [Habilidades.exe](https://claude.ai/code/artifact/3a0ddef9-d6a7-493d-a512-387301f153fa)).
- Si cambia tu casa, tu trabajo o el traslado, dímelo y actualizo este
  archivo y el tablero.
