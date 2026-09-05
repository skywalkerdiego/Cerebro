# 💵 Finanzas — tu dinero, en 3 números

> **La regla de este archivo:** arriba está *cómo estás hoy*, abajo
> está *cómo funciona el sistema*. Si solo tienes 30 segundos, lee la
> tabla de los 3 números y ya. El histórico completo vive en
> [gastos.md](gastos.md); el ahorro conjunto de la mudanza vive aparte
> en [../metas/ahorro.md](../metas/ahorro.md) y **no se mezcla** con
> esto.

---

## 🟢 Los 3 números (corte: 05/09/2026, día de pago)

Todo tu dinero se resume en tres preguntas. Si sabes estas tres,
sabes cómo estás.

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1️⃣ | **¿Cuánto tengo?** | Ver "Cuentas" abajo |
| 2️⃣ | **¿Cuánto debo y cuándo?** | Ver "Lo que debo" abajo |
| 3️⃣ | **¿Cuánto me queda libre hasta el próximo pago (18/09)?** | Ver "Libre real" abajo |

### 1️⃣ Cuentas — cuánto tienes

| Cuenta | Saldo | Para qué es |
|--------|-------|-------------|
| 🏦 **Santander** | $510.61 *(antes del depósito de hoy)* | Cuenta de nómina. Aquí cae el sueldo y de aquí salen los pagos grandes |
| 💛 **MercadoPago** | $606.98 | **Colchón de emergencia — no se toca.** Gana ~5.4% anual |
| 💵 **Efectivo** | ~$630 | Los vales Pluxee cambiados con tu amigo. Para transporte y tianguis |
| 🎟️ **Pluxee (vales)** | $0 | Ya se gastó/cambió todo este ciclo |
| 💰 **Fondo mudanza (con Fanny)** | $4,800 | Intocable. Vive en [../metas/ahorro.md](../metas/ahorro.md) |

⚠️ **Hoy cae tu nómina.** En cuanto veas el depósito real en Santander,
dímelo y actualizo este bloque completo. Hasta entonces, los números de
arriba son los del cierre del 04/09.

### 2️⃣ Lo que debo — con fecha

| Cuándo | Qué | Monto | De dónde sale |
|--------|-----|-------|----------------|
| **Hoy 05/09** | 🎓 Ficha de titulación (SPEI, concepto *"Pago de título"*) | **$620.00** | Nómina de hoy |
| **27/09** | 💳 Corte tarjeta MercadoPago (incluye el AT&T de $2,077 de mamá) | **$2,535.96** | Nómina del 18/09 |
| Cada quincena | 🏦 Crédito de nómina Santander (se descuenta solo) | ~$307.89 | Automático, ya viene descontado |
| **18/09** | 💰 Aporte al fondo de la mudanza | $2,400.00 | Nómina del 18/09 |
| Diario | 🚌 Transporte (~$15/día laboral) | ~$150 por quincena | Efectivo |

**Total comprometido de esta quincena: ~$770** (ficha + transporte).
La tarjeta de MercadoPago **no compite con esta quincena** — se paga
con la nómina del 18/09.

### 3️⃣ Libre real

```
Lo que entra hoy (nómina)        →  por confirmar
− Ficha de titulación                 $620.00
− Transporte hasta el 18/09          ~$150.00
− Aporte al ahorro (18/09)          $2,400.00
− Guardar para la tarjeta (27/09)   $2,535.96
─────────────────────────────────────────────
= Libre real de la quincena          por calcular con el depósito real
```

**Cuando me digas el depósito de hoy, lleno este bloque y ya sabes con
qué cuentas de verdad.**

---

## 🎯 Las 2 metas financieras vivas

| Meta | Estado | Cómo va |
|------|--------|---------|
| 🚫 **Dejar de pedir adelantos de nómina (MINU)** | En prueba desde esta quincena | El recibo del 20/08 traía $2,070 de anticipo. La prueba real es el recibo de HOY: si viene sin MINU, lo lograste |
| 💰 **Aportar $4,800/mes al fondo de la mudanza** | ✅ Al corriente | $2,400 el 22/08 y $2,400 el 04/09 |

---

## 📋 Cómo funciona esto (la mecánica)

### Las dos formas de capturar un gasto

1. **Contándome en la conversación** — *"gasté $350 en Chilis ayer"*.
   Yo lo anoto en [gastos.md](gastos.md) (queda permanente en GitHub)
   y lo agrego como dato semilla en el tablero. **Esta es la que
   manda.**
2. **Directo en el tablero** [Finanzas.exe](https://claude.ai/code/artifact/6841396f-30cd-494e-8139-b05c33caec8e)
   — se guarda solo en ese navegador. Para respaldarlo, usa
   "Exportar respaldo" y mándame el Markdown.

**No hay sincronización automática del tablero hacia este archivo.**
El archivo `.md` es la fuente de verdad; el tablero es la vista.

### Cuándo se actualiza

| Momento | Qué hacemos |
|---------|-------------|
| **Día de pago** (5 y 20 de cada mes) | Cierro la quincena anterior en `gastos.md` y abro la nueva con los 3 números |
| Cuando llega un recibo de nómina | Me lo mandas (foto/PDF), lo guardo en `biblioteca/finanzas/` y agrego el desglose |
| Cuando pagas algo | Me dices y lo paso de "Lo que debo" a Movimientos |
| Cuando revisas el banco | Me dices el saldo real y corrijo — el banco siempre gana sobre mi estimado |

### Categorías

🍔 Comida · 🚌 Transporte · 🎉 Salidas/citas · 🩺 Salud · 👕 Ropa/estilo ·
💾 Ahorro · 🏠 Casa/familia · 📱 Servicios · 🎓 Trámites · 🎁 Regalos ·
❓ Otros

### El tablero (Finanzas.exe), estilo Moneyfy

Rediseñado el 20/08/2026 con la lógica de apps tipo **Moneyfy**: no un
saldo suelto, sino **cuentas reales**.

- **Cuentas** (Santander, MercadoPago, Efectivo, Pluxee) — cada
  movimiento se asigna a una; tocar una filtra todo el tablero.
- **Categorías con ícono** — se eligen tocando un chip, no escribiendo.
- **Transferencias** entre cuentas, que no cuentan como gasto.
- **Pendientes de pagar** con botón "Ya lo pagué".
- **Accesos rápidos** para gastos repetidos (Metro, combi).
- **Historial agrupado por día**, presupuestos por categoría, gastos
  fijos recurrentes y tendencia mensual.

---

## Notas

- **Regla de oro:** el fondo de la mudanza ($12,000/mes combinados) no
  se toca para tapar huecos de la quincena. Si un mes no alcanza, se
  recorta de otro lado, no de ahí.
- El crédito de nómina de Santander (~$307.89 por quincena) sigue sin
  saldo confirmado. Vale la pena preguntarlo en el banco: si el saldo
  es chico, liquidarlo libera esa cantidad cada quincena.
