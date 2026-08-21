---
name: revisemos-cerebro
description: Repasa el estado de las metas de Cerebro (titulación, trabajo, ahorro, aprendizaje) contra README.md y los archivos de metas/, avisa qué está urgente o vencido por fecha, y sugiere próximos pasos concretos. Úsala siempre que el usuario escriba /revisemos-cerebro, o diga frases como "revisemos Cerebro", "checamos el Cerebro", "cómo voy", "dame un resumen de mis metas", "qué me falta" o algo equivalente que pida un balance general en vez de hablar de una sola meta específica.
---

# Revisemos Cerebro

Este repo es el "Cerebro" personal del usuario: un espacio para organizar
metas de vida (no un proyecto de software). Esta skill automatiza el
ritual que ya describe `README.md` en "Cómo usar esto" — repasar el
estado de las metas — para que sea un solo comando en vez de tener que
pedirlo con texto libre cada vez.

El tono debe ser el de un compañero que ya conoce el contexto del
usuario, no el de un reporte de estado corporativo: directo, cálido,
breve.

## 1. Reunir el estado actual

Lee, en este orden:

1. `README.md` — la tabla de "Proyecto: Diciembre 2026" (estado de cada
   meta) y la sección "Próximas 2 semanas".
2. Los archivos de `metas/` que correspondan a metas activas —
   normalmente `titulacion.md`, `trabajo.md`, `ahorro.md`,
   `aprendizaje.md` — para ver el detalle y los checkboxes `- [ ]`
   pendientes de cada una. Si `trabajo.md` referencia `cv.md`, ábrelo
   también si hay algo pendiente ahí.
3. Compara fechas límite mencionadas en esos archivos (formato
   `DD/MM/AAAA`) contra la fecha de hoy. Marca como urgente cualquier
   fecha a menos de ~2 semanas, y como vencida cualquier fecha ya
   pasada — pero antes de asumir que algo sigue pendiente, revisa si el
   propio archivo ya explica que se resolvió distinto (por ejemplo, una
   ficha de pago que venció a propósito porque se decidió esperar a
   sacar una nueva). No repitas una alerta de fecha que el archivo ya
   marcó como resuelta o superada.

No leas todo `perfil/`, `finanzas/` ni `desempeno/` a menos que el
usuario pida explícitamente ese ángulo — esta skill es sobre las metas
del proyecto de diciembre, no un dump completo de Cerebro.

## 2. Presentar el resumen

Responde directo en la conversación — **no generes un artifact ni un
archivo nuevo** para esto, es una plática, no un entregable. Sé breve:
prioriza lo accionable sobre el detalle. Estructura sugerida:

- **Lo urgente/vencido primero**, si hay algo — con la fecha exacta y
  qué tan cerca o pasada está.
- **Qué avanzó** desde la última vez (compara contra qué checkboxes ya
  están en `[x]` y qué dice el estado de cada meta en el README).
- **1 a 3 próximos pasos concretos**, sacados de los checkboxes `- [ ]`
  sin marcar más relevantes ahora mismo — no listes los 20 pendientes
  de golpe, prioriza.

Evita relleno tipo "aquí está tu resumen completo" — ve directo al
contenido.

## 3. Si el usuario confirma avances

Si durante la plática el usuario dice que ya hizo algo (pagó, entregó,
mandó un correo, etc.), actualiza los archivos correspondientes en el
mismo turno, siguiendo las convenciones que ya usa el repo:

- Marca el checkbox correspondiente `- [x]` en el archivo de `metas/`
  que aplique.
- Si el avance cambia el estado general de esa meta, actualiza también
  la columna "Estado" de la tabla en `README.md` y la línea "Última
  actualización" al inicio del archivo (fecha de hoy).
- Si el avance es lo bastante significativo como para contar como
  logro (no cada checkbox chico, sino algo que valga la pena que el
  usuario vea después), agrega una fila nueva a la tabla de
  `logros.md` con el formato `| Fecha | Logro | Área |` que ya usa ese
  archivo. Ten presente que `logros.md` explica que los tableros
  Yo.exe/Habilidades.exe/Cerebro.exe recalculan trofeos y XP a partir
  de esa tabla — por eso vale la pena mantenerla al día, aunque no
  regeneres los tableros tú mismo aquí (ver paso 4).
- No inventes detalles que el usuario no dio — si falta un dato (monto,
  fecha exacta, a quién se le mandó algo), pregúntalo antes de
  escribirlo.

Si el usuario solo quiere el resumen y no menciona avances nuevos, no
toques ningún archivo — este paso es condicional.

## 4. Cierre: ofrecer actualizar los tableros

Si editaste algún archivo en el paso 3, termina preguntando si quiere
que también se actualicen los tableros `.exe` (Artifacts) relacionados
con lo que cambió — por ejemplo Yo.exe, Habilidades.exe, Titulación.exe,
Trabajo.exe, Logros.exe, según qué tocaste. **No los regeneres sin que
lo confirme** — son artifacts ya publicados y regenerarlos de más genera
ruido de versiones innecesario.

Si no hubo cambios (solo fue un chequeo informativo), no hace falta
preguntar esto.
