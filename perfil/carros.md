# 🚗 Carros

Bitácora de mantenimiento de los dos carros que Diego trae en la
cabeza ahorita: el Chevy (suyo, se va a vender después de la mudanza)
y el Aveo (de su mamá, Diego coordina las citas). Nace del susto del
28-30/08: el Aveo falló y canceló el viaje a la cabaña — ver
[viaje-cabana.md](viaje-cabana.md).

Tablero: [Carros.exe](https://claude.ai/code/artifact/343ba47e-786d-4245-8ef0-44826ec627c7)
— panel estilo videojuego con las stats de cada carro (motor, frenos,
llantas...) y un modelo del carro girando. Los "stats" son una lectura
cualitativa de lo que sabemos (no un diagnóstico real de taller), se
actualizan con lo que reporte el mecánico/eléctrico cada vez.

## 🚙 Chevy (de Diego)

**Uso:** día a día. **Destino:** se vende después de la mudanza — el
estimado (~$40,000) vive como fondo aparte en
[../metas/ahorro.md](../metas/ahorro.md#-venta-del-chevy--fondo-aparte-no-cuenta-para-la-mudanza),
sin comprador todavía.

**Stats actuales:**

| Sistema | Estado | Nota |
|---|---|---|
| Motor / radiador | Atención | Radiador cambiado — refacción pagada, falta la mano de obra |
| Frenos | Por revisar | Entra a revisión el 30/08 |
| Llantas | Por revisar | Entra a revisión el 30/08 (incluida la de refacción) |
| Aceite | Por revisar | Entra a revisión el 30/08 |
| Batería / eléctrico | Sin problema reportado | — |
| Carrocería | Sin problema reportado | — |

**Historial:**

| Fecha | Concepto | Costo | Estatus |
|---|---|---|---|
| 29/08/2026 | Radiador — refacción | Por confirmar monto | ✅ Pagada |
| 29/08/2026 | Radiador — mano de obra | Por confirmar monto | 🔶 Pendiente de pago |
| 30/08/2026 | Revisión con el mecánico: llantas, aceite, frenos, anticongelante | Por cotizar | 🔶 Programada |

## 🚗 Aveo (de mamá)

**Uso:** de la mamá de Diego; Diego coordina la cita porque fue el
carro que iba a usarse alrededor del viaje cancelado.

**Stats actuales:**

| Sistema | Estado | Nota |
|---|---|---|
| Eléctrico | Crítico | Falla que canceló el viaje del 28-30/08 |
| Motor | Sin datos | — |
| Frenos | Sin datos | — |
| Llantas | Sin datos | — |
| Carrocería | Sin datos | — |

**Historial:**

| Fecha | Concepto | Costo | Estatus |
|---|---|---|---|
| 29/08/2026 | Falla eléctrica — canceló el viaje a la cabaña | — | 🔴 Detectada |
| 30/08/2026 | Taller eléctrico — diagnóstico | Por cotizar | 🔶 Programado |

## 📝 Pendientes

- [ ] Confirmar monto de la mano de obra del radiador del Chevy y
      pagarlo
- [ ] Resultado de la revisión del Chevy (30/08): llantas, aceite,
      frenos, anticongelante
- [ ] Diagnóstico y costo del Aveo (30/08) en el taller eléctrico
- [ ] Registrar ambos montos en
      [../finanzas/gastos.md](../finanzas/gastos.md) en cuanto se
      confirmen

## Notas

- Cuando el mecánico o el eléctrico te den un diagnóstico, cuéntamelo
  aquí en la conversación y actualizo este archivo y Carros.exe.
- Si el Chevy tiene un problema serio antes de venderse, avísame para
  ver si vale la pena repararlo o si mejor se ajusta el precio de
  venta esperado en `metas/ahorro.md`.
