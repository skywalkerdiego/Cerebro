---
name: dinero
description: Captura rápida de un gasto o ingreso suelto en formato corto (ej. "150 comida", "gasté 350 en Chilis ayer", "700 gasolina santander") y lo registra en finanzas/gastos.md con la categoría, fecha y cuenta correctas, siguiendo el mismo formato que ya usa ese archivo. Úsala siempre que el usuario mencione un monto de dinero gastado o recibido fuera de una plática de revisión completa — no hace falta que diga "regístralo" explícitamente, basta con que suelte el dato (ej. "150 comida", "me llegaron 200 de mi hermana").
---

# Dinero — captura rápida de gastos

Este repo lleva las finanzas en `finanzas/gastos.md` (histórico,
fuente de verdad) y `finanzas/README.md` (resumen de "los 3 números").
Esta skill es el atajo para la forma #1 de capturar un gasto que ya
describe `finanzas/README.md`: *"Contándome en la conversación... Yo
lo anoto en gastos.md (queda permanente en GitHub) y lo agrego como
dato semilla en el tablero. Esta es la que manda."*

No inventes ni redecores el sistema existente — solo automatiza el
registro que Claude ya hacía a mano.

## 1. Interpretar el mensaje

Formatos que debe reconocer, todos equivalentes:

- `"150 comida"` — monto + categoría, sin más contexto
- `"gasté 350 en Chilis ayer"` — monto + descripción + fecha relativa
- `"700 gasolina santander"` — monto + categoría + cuenta
- `"me llegaron 200 de mi hermana"` — ingreso, no gasto

Extrae:

| Campo | Cómo se obtiene |
|---|---|
| **Monto** | El número en el mensaje. Ingreso si el verbo es "recibí/me llegó/me dieron/depositó"; gasto en cualquier otro caso (default: gasto). |
| **Fecha** | "hoy" si no se menciona; resuelve "ayer", "antier", días de la semana contra la fecha de hoy. Formato final: `DD/MM/AAAA`. |
| **Descripción** | Lo que quede del mensaje después de quitar monto/fecha/categoría/cuenta (ej. "Chilis", "gasolina"). Si no hay nada más específico que la categoría, usa el nombre de la categoría como descripción. |
| **Categoría** | Ver tabla de mapeo abajo. |
| **Cuenta** | Si el usuario la menciona (Santander, MercadoPago, Efectivo, Pluxee), úsala. Si no, **no la inventes** — dejar el campo en blanco o preguntar solo si el monto es grande (>$500) y cambia materialmente los "3 números". Para montos chicos, no interrumpas la conversación por esto. |

### Mapeo de categorías

Estas son las **11 categorías oficiales** que ya usa `finanzas/README.md`,
más una 12ª que aparece en la práctica en `gastos.md` aunque no está en
la lista oficial (⚠️ ver nota):

| Categoría | Palabras clave típicas |
|---|---|
| 🍔 Comida | comida, comer, restaurante, antojito, tacos, tianguis, súper, despensa, Chilis |
| 🚌 Transporte | transporte, gasolina, metro, combi, uber, taxi, camión |
| 🎉 Salidas/citas | cine, boletos, concierto, cita, salida, hotel, bar, cerveza |
| 🩺 Salud | doctor, farmacia, terapia, medicina, consulta |
| 👕 Ropa/estilo | ropa, zapatos, corte de pelo, estética |
| 💾 Ahorro | ahorro, fondo, mudanza, aporte |
| 🏠 Casa/familia | casa, familia, mamá, papá, hermana, renta, gas doméstico |
| 📱 Servicios | internet, luz, agua, teléfono, Totalplay, AT&T |
| 🎓 Trámites | trámite, título, ficha, gestión, licencia |
| 🎁 Regalos | regalo, cumpleaños, aniversario |
| ❓ Otros | cuando nada más aplica — nunca dejes la categoría vacía |
| 💳 Deuda *(no oficial, ver nota)* | tarjeta, deuda, crédito, corte, MSI |

⚠️ **Nota:** `finanzas/README.md` solo lista 11 categorías oficiales
(no incluye 💳 Deuda), pero `gastos.md` ya la usa para pagos de
tarjeta de crédito. Si el gasto es claramente un pago/abono de deuda
de tarjeta, usa 💳 Deuda igual que el resto del archivo — es más
preciso que forzarlo a ❓ Otros. No corrijas ni unifiques esto por tu
cuenta; si Diego pregunta, menciónaselo.

Si no puedes inferir la categoría con confianza (mensaje ambiguo tipo
"150 cosas"), pregunta antes de adivinar — una categoría mal puesta
ensucia el desglose que ya usa Finanzas.exe.

## 2. Escribir en `finanzas/gastos.md`

1. Determina la quincena en curso comparando la fecha del gasto contra
   los cortes (día de pago 5 y 20 — si el gasto cae antes del 5 o
   entre el 5 y el 19, etc., usa el mismo criterio de quincenas que ya
   usa el archivo).
2. Ve a la sección `## 📅 Quincena actual — ...` (la más reciente, no
   una cerrada) y agrega una fila nueva a la tabla **"Movimientos
   confirmados"**, con el mismo formato de columnas que ya existe:

   ```
   | Fecha | Tipo | Categoría | Descripción | Monto |
   ```

   - `Tipo`: Ingreso, Gasto, o Transferencia.
   - `Categoría`: el ícono + nombre de la tabla de arriba (deja `—`
     solo si es Transferencia, igual que el resto del archivo).
   - `Monto`: con signo (`+$` para ingreso, `−$` para gasto), dos
     decimales, formato `$1,234.56`.
3. Si esa sección de "Movimientos confirmados" no existe todavía en la
   quincena actual (por ejemplo, es el primer gasto suelto de la
   quincena), créala con el mismo encabezado que usan las quincenas
   anteriores — no inventes una estructura distinta.
4. No toques quincenas cerradas ni reescribas montos históricos.

## 3. Actualizar `finanzas/README.md` solo si corresponde

Los "3 números" de `README.md` (Cuentas, Lo que debo, Libre real) son
un snapshot manual, no se recalculan solos. Solo edítalos si:

- El usuario te dio también el saldo real de una cuenta (no solo el
  monto del gasto), o
- El gasto es lo bastante grande que dejar el snapshot viejo sería
  engañoso (por ejemplo, > $1,000 y afecta el "Libre real").

Para gastos chicos rutinarios ("150 comida"), **no toques
`README.md`** — solo `gastos.md`. Evita que el archivo se llene de
ediciones triviales que no cambian la foto general.

## 4. Confirmar y republicar

- Confirma en una línea lo que registraste: monto, categoría, fecha, y
  en qué archivo quedó — no hace falta un resumen largo.
- Sigue la regla de `CLAUDE.md` ("Mantener los tableros
  sincronizados"): si el cambio en `gastos.md` (y/o `README.md`) afecta
  lo que se ve en **Finanzas.exe**, republica ese tablero en el mismo
  turno sin que Diego tenga que pedirlo — `Artifact` `read` con la URL
  de Finanzas.exe (está en el README principal), agrega el movimiento
  como dato semilla (no rediseñes el tablero), y `Artifact` `publish`
  con la misma URL.
- Recuerda que Finanzas.exe guarda su propio estado en `localStorage`
  del navegador — el dato semilla que agregues puede no aparecer si
  Diego ya tiene datos guardados localmente ahí. El archivo `.md` sigue
  siendo la referencia definitiva; dilo si es relevante.

## 5. Cuando el mensaje no es un gasto suelto

Si el usuario está en medio de una revisión más amplia (ej. cerrando
quincena, reconciliando el banco), no uses esta skill de forma aislada
— sigue el flujo completo que ya describe `finanzas/README.md` en
"Cuándo se actualiza". Esta skill es para el caso rápido de una sola
línea suelta en conversación normal.
