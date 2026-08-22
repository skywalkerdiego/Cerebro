# Instrucciones para Claude en este repo

Este es el "segundo cerebro" personal de Diego — ver `README.md` para
el mapa completo. Dos reglas de trabajo, además de lo que ya dice el
README:

## Mantener los tableros sincronizados

Cada vez que un cambio real en `metas/`, `perfil/`, `finanzas/` o
`desempeno/` afecte lo que se ve en uno de los tableros publicados
(enlaces en `README.md`: Yo.exe/HUD, Finanzas.exe, Biblioteca.exe,
Trabajo.exe, etc.), **republica ese tablero en la misma sesión, sin
que Diego tenga que pedirlo**. No hace falta republicar todos siempre
— solo el/los que de verdad cambiaron.

Para republicar: `Artifact` action `read` con la URL del tablero (está
en `README.md`) para traer el HTML actual, editar solo lo que cambió
(no rediseñar), y `Artifact` action `publish` con la misma `url` para
que quede en el mismo enlace.

## Fuente de verdad

Los archivos `.md` del repo son la fuente real de los datos (persiste
en git). Los tableros/artifacts son la vista — se regeneran a partir
de los `.md`, nunca al revés. Si un tablero interactivo (como
Finanzas.exe) usa `localStorage` del navegador, los cambios que le
haga Claude ahí son *datos semilla* — pueden no aparecer si Diego ya
tiene datos guardados localmente; el archivo `.md` correspondiente
sigue siendo la referencia definitiva.
