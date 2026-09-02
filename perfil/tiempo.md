# ⏳ Tiempo

Presupuesto semanal de tiempo real — a dónde se va cada hora del día
según los turnos rotativos de Boost Mobile y el traslado. Los números
salen de [rutina.md](rutina.md); desde el 01/09/2026 la vista visual ya
no es un tablero aparte (Tiempo.exe se desactualizaba solo) — es la
barra de horas dentro de cada día en la tabla semanal de
[Rutina.exe](https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433).
Este archivo sigue siendo la fuente del modelo (los porcentajes de abajo).

## El modelo (día con turno)

Con 1h20 de traslado por trayecto, cualquier turno de 10h (6am-4pm o
7am-5pm) se reparte así en 24h:

| Bloque | Horas | % del día |
|--------|-------|-----------|
| Turno | 10h | 41.7% |
| Traslado (2 trayectos) | 2h40 | 11.1% |
| Sueño | ~7-7.5h | 30.2% |
| Libre / foco de la noche | ~2.5h | 10.4% |
| Rutina matutina (antes de salir) | ~1h35 | 6.6% |

## El modelo (día off)

Sin turno ni traslado, el día no está mapeado hora por hora — se
reparte en bloques (mañana / tarde) según lo que toque esa semana, ver
la tabla en [rutina.md](rutina.md). Para la vista visual se usa una
aproximación simple: ~8h de sueño (más flexible que en día de turno) y
el resto (~16h) como bloque libre/flexible, sin fingir precisión que
no existe.

## Notas

- Esto es una plantilla, no un registro minuto a minuto — para el
  detalle real de cada semana (qué turno toca, qué foco va cada
  noche) la fuente sigue siendo [rutina.md](rutina.md).
- Duolingo y el tiempo con Fanny van todos los días, aparte de estos
  bloques — no compiten con el libre de la noche.
- Cuando cambien tus turnos, dímelo y remapeo rutina.md y la tabla
  semanal de Rutina.exe (schedule + barras de horas) juntos.
