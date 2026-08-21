# 📒 Registro de gastos e ingresos

Historial que se llena a partir de los respaldos exportados del
tablero interactivo, o de lo que me cuentes en la conversación. Ver
[README.md](README.md) para cómo funciona esto.

## Resumen mensual

| Mes | Ingresos | Gastos | Ahorrado (fuera del fondo conjunto) | Notas |
|-----|----------|--------|--------------------------------------|-------|
| | | | | |

## Recibos de nómina oficiales (CFDI)

Desglose tal como viene en el recibo de nómina oficial (CFDI) de TTEC
CX Solutions México — respalda los montos de "Movimientos" más abajo.
El documento original (imagen/PDF) vive en
[biblioteca/finanzas/](../biblioteca/finanzas/).

| Quincena (fecha de pago) | Percepciones | Deducciones | Neto a pagar | Documento |
|---|---|---|---|---|
| 20/08/2026 | $13,562.66 | $4,333.32 | **$9,229.34** | [recibo-nomina_2026-08-20.png](../biblioteca/finanzas/recibo-nomina_2026-08-20.png) |

**Desglose del 20/08/2026** (15 días pagados, periodo 01/08–15/08/2026):

| Percepciones | Monto |
|---|---|
| Horas sueldo | $8,215.69 |
| Compensación Extraordinaria Variable | $2,550.00 |
| Séptimo día | $1,504.80 |
| Sueldo por Vacaciones | $809.96 |
| Prima Dominical | $247.59 (+ $234.62 exento) |

| Deducciones | Monto |
|---|---|
| Anticipo de Nómina MINU | $2,070.00 |
| ISR | $1,915.13 |
| Seguro Social (IMSS) | $348.19 |

⚠️ **Discrepancia a resolver:** en `finanzas/README.md` (quincena del
20/08) se había anotado un adelanto de $1,400 + $70 de comisión
($1,470 en total). El recibo oficial solo trae una línea, "Anticipo de
Nómina MINU: $2,070.00", sin más desglose — puede ser que el $1,470
sea una parte de ese anticipo, o que el estimado original fuera
impreciso. Vale la pena confirmarlo (con RH o el detalle del préstamo
MINU) para no arrastrar el número equivocado la próxima quincena.

**Cómo se usa esto para futuras quincenas:** en cuanto llegue el
siguiente recibo de nómina (foto o PDF), mándamelo en la conversación
— lo guardo en `biblioteca/finanzas/`, agrego la fila a la tabla de
arriba y actualizo el desglose. Así queda un historial real,
quincena por quincena, en vez de depender solo del estimado del estado
de cuenta bancario.

## Saldo en vivo — quincena del 20/08 al 04/09/2026

Próximo pago: **05/09/2026** (16 días).

**Corrección con tu estado de cuenta real (21/08):** el depósito de
nómina fue en realidad **$9,229.34** (no $8,953.48 — ese número era
tu saldo *después* de un cargo que no habíamos visto). También
aparecieron dos gastos que no teníamos registrados: un pago de
**crédito nómina de $307.89** (préstamo del banco, se descuenta solo)
y **$343 en Farmacias Similares** (anticonceptivos, Fanny puso $100 de
esos). La terapia ($350) ya se pagó, no sigue pendiente.

**Ya hiciste varios pagos más (21/08):** ahorro ($2,400 a Fanny —
confirmado, no eran $3,000), la primera deuda de $200, tu abuela ($500,
entregado), y un apoyo nuevo de $800 a tu mamá para gas y despensa.
Sobre la ficha: decidiste esperar al 05/09 y sacar una ficha nueva con
fecha de vencimiento nueva — no se pierde el trámite, solo se
regenera la referencia de pago (ya actualizado en
[metas/titulacion.md](../metas/titulacion.md)).

| | Monto |
|---|---|
| Santander | $937.68 |
| Efectivo (ya sin los $500 de la abuela, solo sueltos) | $66.50 |
| **Total que tienes ahorita** | **$1,004.18** |
| Reservado (otra deuda #2 + transporte — la ficha se mueve a la próxima quincena) | −$410.00 |
| **Libre real / colchón** | **$594.18** |

| Destino | Monto | Estatus |
|---|---|---|
| Otra deuda (la segunda, distinta a la que ya pagaste) | $200 | Pendiente |
| Transporte del resto de la quincena | ~$210 | Estimado |
| Ficha de titulación (ficha nueva, después del 05/09) | $620 | Movida a la próxima quincena |

**Cómo lo trackeamos:** en cuanto pagues algo, dímelo aquí en la
conversación ("ya pagué el hotel, $600" o "gasté $15 en combi") y lo
paso de "Compromisos pendientes" (o lo agrego si es nuevo) a
Movimientos, con el saldo bancario recalculado. El metro lo pagas con
el teléfono (saldo de la tarjeta, no efectivo) — sigue contando dentro
del presupuesto de transporte aunque no uses el cambio de la mochila
para eso.

## Movimientos

Reconstruido a partir de tu estado de cuenta real de Santander
(21/08/2026) — estos números ya no son estimados.

| Fecha | Tipo | Categoría | Descripción | Monto |
|-------|------|-----------|-------------|-------|
| 20/08/2026 | Ingreso | Nómina | Quincena (100h + bono $2,500, neto tras adelanto y comisión) | +$9,229.34 |
| 20/08/2026 | Gasto | Otros | Pago de crédito nómina (préstamo del banco, automático) | −$307.89 |
| 20/08/2026 | Gasto | Salud | Terapia | −$350.00 |
| 20/08/2026 | Gasto | Transporte | Gasolina (tarjeta) | −$483.80 |
| 20/08/2026 | Transferencia | — | Retiro de cajero: Santander → Efectivo | −$950.00 |
| 20/08/2026 | Gasto | Salidas/citas | Cerveza (OXXO) | −$189.00 |
| 20/08/2026 | Gasto | Salud | Farmacias Similares (anticonceptivos) — Fanny puso $100 de esto | −$343.00 |
| 20/08/2026 | Gasto | Salidas/citas | Hotel | −$580.00 |
| 21/08/2026 | Ingreso | Fanny | Para los boletos de Corona Capital (vía MercadoPago, a Santander) | +$2,000.00 |
| — | Gasto | Salidas/citas | Tacos (efectivo, no aparece en el banco) | −$410.00 |
| — | Gasto | Transporte | Gasolina, la parte en efectivo | −$107.00 |
| — | Ingreso | Fanny | En efectivo (la misma de arriba, no es extra) | +$100.00 |
| — | Gasto | Otros | Efectivo sin detalle — para cuadrar con lo que reportaste ($566.50 reales: $500 apartados + $66.50 sueltos) | −$60.00 |
| 21/08/2026 | Gasto | Salidas/citas | Boletos Corona Capital (total, ya con los $2,000 de Fanny adentro) | −$3,720.00 |
| 21/08/2026 | Gasto | Ahorro | Aporte a ahorro conjunto, enviado a Fanny | −$2,400.00 |
| 21/08/2026 | Gasto | Otros | Deuda (la primera de las dos) | −$200.00 |
| 21/08/2026 | Gasto | Otros | Efectivo → tu abuela (entregado) | −$500.00 |
| 21/08/2026 | Gasto | Otros | Apoyo a tu mamá (gas + despensa) | −$800.00 |

## Compromisos pendientes de esta quincena (20/08/2026)

Reportados por Diego, aún no confirmados como pagados — avísame cuando
salga cada uno y lo paso a Movimientos.

| Concepto | Categoría | Monto | Estatus |
|----------|-----------|-------|---------|
| Otra deuda (la segunda) | Otros | $200 | Pendiente |
| Transporte quincena (~12 días laborales) | Transporte | ~$210 (por confirmar días) | Recurrente |

## Movido a la próxima quincena (05/09 en adelante)

| Concepto | Categoría | Monto | Nota |
|----------|-----------|-------|------|
| Ficha de titulación (ficha nueva) | Otros | $620 | La actual vence 29/08; se saca una nueva con fecha nueva cuando haya flujo. Ver [metas/titulacion.md](../metas/titulacion.md). |

**Nota sobre el préstamo:** el crédito nómina ($307.89 esta quincena)
probablemente se descuenta solo cada quincena, no es un pago único —
vale la pena confirmarlo y ver si conviene liquidarlo antes, como
mencionaste. Dime si quieres que investiguemos eso.
