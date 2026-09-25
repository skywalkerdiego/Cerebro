# CEREBRO.EXE — FULL AI CONTEXT


## 1. MANIFEST

```json
{
  "MANIFEST_VERSION": 1,
  "generated_at": "2026-09-11",
  "generated_by": "Claude (Sonnet 5), a petición explícita de Diego (skywalkerdiego), como snapshot forense para handoff a otra IA que continuará el desarrollo",
  "read_me_first": "Este archivo es el punto de entrada. Los demás archivos numerados (01-15) son índices detallados; SOURCE/ y ARTIFACTS_SOURCE/ son el código fuente real, sin resumir ni reformatear. No se inventó ningún dato — donde algo no pudo verificarse, está marcado UNKNOWN o REQUIRES_REVIEW en el archivo correspondiente.",
  "que_es_cerebro": "Un sistema personal de organización de vida (metas, finanzas, perfil, desempeño laboral) de un usuario llamado Diego. NO es software para terceros. Se compone de (a) un repo de git con ~46 archivos Markdown/PDF/imagen como base de datos textual, y (b) 39 Claude Artifacts (páginas HTML/CSS/JS) hosteados en claude.ai, de los cuales 22 forman una red de 'tableros' navegables desde un artifact hub llamado Cerebro.exe. Ver 01_PROJECT.json.",
  "estado_actual": "Activo y en uso diario. Última actualización de contenido reflejada en el material: 11/09/2026. El repo está en la rama `claude/eager-maxwell-jxj88u` (rediseño de Cerebro.exe), con `main` un poco atrás. Cerebro.exe fue rediseñado dos veces en las últimas 24-48h antes de este export (de 'cyberpunk' a un sistema tipo Linear/Arc).",
  "componentes": {
    "archivos_en_git": 46,
    "artifacts_publicados_total": 39,
    "tableros_de_navegacion_22": "ver 04_BOARDS.json — lista cerrada, extraída del propio código de Cerebro.exe",
    "artifacts_activos_fuera_de_la_nav": 6,
    "artifacts_huerfanos_o_retirados": 9,
    "skills_de_claude_code": 2
  },
  "donde_esta_cada_cosa": {
    "codigo_fuente_completo_de_git": "SOURCE/ — copia byte-idéntica del working tree, verificada con diff -rq contra el original",
    "configuracion_de_claude_code": "CLAUDE/.claude/ — copia byte-idéntica de .claude/",
    "codigo_fuente_completo_de_6_artifacts": "ARTIFACTS_SOURCE/*.html — Cerebro.exe (hub), Rutina.exe, Trabajo.exe, Titulación.exe, Periódico.exe, Perfil.exe. Los otros 33 artifacts están documentados por metadata + URL en 06_ARTIFACTS.json, no vendorizados como archivo — son re-fetcheables en segundos con la herramienta Artifact.",
    "historial_de_git": "GIT/*.txt + 15_GIT_HISTORY.md",
    "checksums": "CHECKSUMS_SHA256.txt (raíz) — SHA256 de los 46 archivos originales del repo"
  },
  "arquitectura": "ver 03_ARCHITECTURE.json y ARCHITECTURE.md — resumen: no hay build, no hay backend, no hay base de datos, no hay tests, no hay CI. El repo es datos; los Artifacts son la vista; localStorage del navegador de Diego es el único estado interactivo, y NUNCA escribe de vuelta al repo.",
  "que_debe_preservarse_siempre": [
    "Las 39 URLs de Artifact (UUID) — ver 06_ARTIFACTS.json e 10_IDENTIFIERS.json. Son IMMUTABLE.",
    "Los IDs de DOM, variables CSS (--nc/--tc/--sc) y localStorage keys de cada artifact — romperlos falla silenciosamente, sin error visible. Ver 10_IDENTIFIERS.json.",
    "La regla de gobierno de CLAUDE.md: los .md mandan, los tableros se regeneran a partir de ellos.",
    "El formato exacto de las tablas Markdown que ya usan finanzas/gastos.md y logros.md — varias skills y tableros dependen de que el formato no cambie (ver .claude/skills/dinero/SKILL.md)."
  ],
  "que_esta_roto_o_es_fragil": "ver 13_ISSUES.json — resumen: (1) la tabla horaria WEEK está triplicada y divergente entre Cerebro.exe/Rutina.exe/Periódico.exe y caduca cada 7 días; (2) 4 lenguajes visuales distintos sin sistema de diseño compartido; (3) Perfil.exe no tiene ninguna referencia en el repo, solo en el JS de Cerebro.exe; (4) una localStorage key de Rutina.exe tiene una fecha hardcodeada que nunca se actualiza; (5) 9 artifacts huérfanos publicados sin uso.",
  "que_esta_pendiente_documentado_como_futuro": "ver 14_FUTURE.md — nada de esto está implementado, es prosa de intención (persistencia real vía capacidad db de Artifacts, unificar WEEK, sistema de diseño único, plan de crédito de vivienda INFONAVIT, boda 2027, etc.)",
  "donde_esta_el_codigo_fuente_completo": "SOURCE/ para el 100% del repo de git; ARTIFACTS_SOURCE/ para 6 de 39 artifacts. La documentación (archivos 00-15) es un MAPA — nunca la fuente de verdad. Ante cualquier duda, leer el archivo fuente directamente.",
  "limitaciones_declaradas_de_este_export": [
    "33 de 39 artifacts se documentaron por metadata (nombre, URL, favicon, fecha, a qué board corresponde) y NO por código fuente completo — decisión deliberada de alcance, explicada en 13_ISSUES.json #8. Sus URLs están todas en 06_ARTIFACTS.json y son re-fetcheables.",
    "El repo de git es un shallow clone (.git/shallow presente) — no se puede garantizar que el historial de 96 commits visibles sea el historial completo desde el primer commit real.",
    "No se validó el contenido de los 6 PDFs ni de las 2 imágenes de biblioteca/ más allá de copiarlos íntegros y hashearlos — no se hizo OCR ni lectura de su contenido."
  ],
  "indice_de_archivos_de_este_export": {
    "00_MANIFEST.json": "este archivo",
    "01_PROJECT.json": "qué es Cerebro, quién lo usa, hechos arquitectónicos clave",
    "02_FILE_INDEX.json": "inventario de los 46 archivos del repo con checksum, tipo, categoría, importancia",
    "03_ARCHITECTURE.json": "arquitectura real (entry points, flujo de datos, capas de persistencia)",
    "ARCHITECTURE.md": "versión legible/diagrama de 03_ARCHITECTURE.json",
    "04_BOARDS.json": "los 22 tableros, extraídos del código fuente real de Cerebro.exe",
    "05_BOARD_RELATIONSHIPS.json": "relaciones entre tableros (edges confirmados + patrón inferido)",
    "06_ARTIFACTS.json": "los 39 artifacts publicados, reconciliados contra los 22 boards y contra el repo",
    "07_ENTITIES.json": "modelo de datos reconstruido (Meta, Gasto, Métrica, Logro, Board, Alerta, DiaSemana, Gusto)",
    "08_RELATIONSHIPS.json": "relaciones entre archivos/entidades del repo",
    "09_FEATURES.json": "inventario FEATURE→ARCHIVO→ESTADO (IMPLEMENTED/PARTIAL/PLACEHOLDER/BROKEN/UNKNOWN)",
    "10_IDENTIFIERS.json": "IDs/UUIDs/keys críticos, marcados IMMUTABLE o REVIEW_REQUIRED",
    "11_DESIGN_SYSTEM.json": "los ≥4 lenguajes visuales encontrados, con paletas y tipografías reales",
    "12_DECISIONS.md": "decisiones tomadas, clasificadas CONFIRMED/PROPOSED/SUPERSEDED/REJECTED",
    "13_ISSUES.json": "8 hallazgos concretos, con severidad y evidencia",
    "14_FUTURE.md": "ideas propuestas, explícitamente NO implementadas",
    "15_GIT_HISTORY.md": "historial de git curado por tema + hallazgo sobre archivos nunca borrados",
    "CHECKSUMS_SHA256.txt": "SHA256 de los 46 archivos originales del repo",
    "SOURCE/": "copia completa y verificada del repo de git (sin .git ni .claude)",
    "CLAUDE/.claude/": "copia completa de la configuración de Claude Code (skills)",
    "ARTIFACTS_SOURCE/": "código fuente HTML completo de 6 de 39 artifacts",
    "GIT/": "logs de git en bruto (full_log_with_stats.txt, log_compact.txt, merges.txt, branches.txt, etc.)"
  }
}
```


## 2. PROJECT

```json
{
  "name": "Cerebro (Yo.exe)",
  "type": "sistema personal de organización de vida — NO es un proyecto de software convencional",
  "owner": "Diego Ruiz Elizondo",
  "owner_email_seen_in_repo": "druizelizondo@gmail.com (CV/LinkedIn) — nota: skywalkerdiego13@gmail.com aparece como correo de la cuenta de Indeed, distinto, sin resolver si unificar (ver metas/trabajo.md)",
  "repo": "https://github.com/skywalkerdiego/Cerebro",
  "repo_description": "Ni más ni menos",
  "purpose": "Espacio para vaciar todo lo que Diego tiene en la cabeza (metas, finanzas, perfil personal, desempeño laboral) y darle seguimiento conversacional con Claude. Los archivos .md son la fuente de verdad persistente en git; los tableros .exe (Claude Artifacts) son vistas visuales generadas a partir de esos .md, republicadas manualmente cuando el dato cambia.",
  "primary_language_of_content": "español (México)",
  "current_snapshot_date_in_material": "actualizado hasta 11/09/2026 (ver README.md y Periódico.exe)",
  "export_generated_at": "2026-09-11T00:00:00Z",
  "export_generated_by": "Claude (Sonnet 5), a petición explícita de Diego, como snapshot forense para handoff a otra IA",
  "one_line_summary": "Un repo de Markdown en git (~46 archivos, 1.9MB) que funciona como base de datos textual de la vida de Diego, más una red de ~39 Claude Artifacts (páginas HTML/CSS/JS standalone, hosteadas en claude.ai, NO en el repo) que la visualizan. 22 de esos artifacts forman 'los tableros' navegables desde el artifact principal, Cerebro.exe.",
  "critical_architectural_fact": "El código fuente de los tableros NO vive en git. Vive exclusivamente en claude.ai como Artifacts publicados. El repo de git solo contiene los DATOS (.md, PDFs, imágenes) y la CONFIGURACIÓN de Claude Code (.claude/skills). Si se pierde el acceso a los Artifacts de claude.ai, se pierde el 100% del código de UI — solo quedarían los datos en texto plano. Este export intenta mitigar eso capturando 6 artifacts completos como muestra representativa y documentando los otros 33 por metadata + URL.",
  "governance_rules_confirmed_from_CLAUDE_md": [
    "Cada cambio real en metas/, perfil/, finanzas/ o desempeno/ que afecte un tablero publicado debe republicarse en la MISMA sesión, sin que Diego lo pida.",
    "No republicar todos los tableros siempre — solo los que de verdad cambiaron.",
    "Para republicar: Artifact 'read' con la URL del tablero (está en README.md), editar solo lo que cambió (no rediseñar), Artifact 'publish' con la misma URL.",
    "Los .md son la fuente de verdad; los tableros son la vista — se regeneran a partir de los .md, nunca al revés.",
    "Si un tablero usa localStorage del navegador (ej. Finanzas.exe), los cambios que Claude le haga ahí son 'datos semilla' — pueden no aparecer si Diego ya tiene datos guardados localmente; el .md sigue siendo la referencia definitiva."
  ]
}
```


## 3. FILE INDEX

```json
{
  "generated_at": "2026-09-11T00:00:00Z",
  "root": "SOURCE/ (copia byte-idéntica del working tree de git, verificada con diff -rq)",
  "total_files": 48,
  "total_size_bytes": 1839276,
  "note": "El contenido íntegro de cada archivo vive en SOURCE/<path>, sin resumir ni reformatear. Este índice es solo metadata + checksum. Los checksums también están consolidados en CHECKSUMS_SHA256.txt (raíz del export).",
  "files": [
    {
      "path": ".claude/skills/dinero/SKILL.md",
      "type": "md",
      "size_bytes": 7242,
      "category": "configuration/claude-code",
      "purpose": "skill de Claude Code (automatiza un flujo conversacional)",
      "importance": "critical",
      "preserve_on_migration": true,
      "sha256": "4eae028325f9b0caeb6dcfe942b33da8f0a8b3f165e1133a7510744b72a61a87"
    },
    {
      "path": ".claude/skills/revisemos-cerebro/SKILL.md",
      "type": "md",
      "size_bytes": 5440,
      "category": "configuration/claude-code",
      "purpose": "skill de Claude Code (automatiza un flujo conversacional)",
      "importance": "critical",
      "preserve_on_migration": true,
      "sha256": "e034c58fcfc7252b678f7afe0d2db791a7394b924313bf9ba2c131871cfac7ec"
    },
    {
      "path": "CLAUDE.md",
      "type": "md",
      "size_bytes": 1328,
      "category": "documentation",
      "purpose": "punto de entrada / instrucciones de gobierno del repo",
      "importance": "critical",
      "preserve_on_migration": true,
      "sha256": "4f76a5a00cf422b07d660c1812f64079fa289753db7ec42e636167e8e4d85f07"
    },
    {
      "path": "README.md",
      "type": "md",
      "size_bytes": 24420,
      "category": "documentation",
      "purpose": "punto de entrada / instrucciones de gobierno del repo",
      "importance": "critical",
      "preserve_on_migration": true,
      "sha256": "3283107586b589960bb227999a7f1a5ef4b86dfe3bdf066ad68141f7b7f82642"
    },
    {
      "path": "biblioteca/README.md",
      "type": "md",
      "size_bytes": 910,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "d41cceceb66692ded4dd1a28489872eafe8d7bdb500c3383cbf821b97fa7a87b"
    },
    {
      "path": "biblioteca/finanzas/recibo-nomina_2025-12-05.png",
      "type": "png",
      "size_bytes": 637775,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "7585ba1dff1e3f826a0a089826b474c131fdde2b9fd0ee792acd4c4f30d01d9d"
    },
    {
      "path": "biblioteca/finanzas/recibo-nomina_2026-08-20.png",
      "type": "png",
      "size_bytes": 579626,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "a1d3c1499ecb51637758c90b37e1f8afb2a121070d0e3265ef543f30968f466c"
    },
    {
      "path": "biblioteca/titulacion/ATI_ExpedienteDGAE.pdf",
      "type": "pdf",
      "size_bytes": 138684,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "0005b5714503809056bef2fd8d48ef5866a5faa35da445022e5080d3d6bc573e"
    },
    {
      "path": "biblioteca/titulacion/SolicitudTitulo_llenado.pdf",
      "type": "pdf",
      "size_bytes": 196266,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "94f317f9d0d42cb975d0b18af02d8c5f3abc15f3735c00590e037fb32e486d95"
    },
    {
      "path": "desempeno/README.md",
      "type": "md",
      "size_bytes": 4235,
      "category": "data",
      "purpose": "métricas laborales de Boost Mobile; alimenta Desempeño.exe y Llamadas.exe",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "a2a5bcb974e9e88440c6ab084f9d0466f71dd0d31e7f12240035540b100e2fdc"
    },
    {
      "path": "desempeno/metricas.md",
      "type": "md",
      "size_bytes": 7832,
      "category": "data",
      "purpose": "métricas laborales de Boost Mobile; alimenta Desempeño.exe y Llamadas.exe",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "69c7c702d6a3c7177b8ff41d23e8cefcdc7ba516f7c1cbbe25ca7c18e2a989aa"
    },
    {
      "path": "finanzas/README.md",
      "type": "md",
      "size_bytes": 9593,
      "category": "data",
      "purpose": "fuente de verdad financiera; alimenta Finanzas.exe",
      "importance": "critical",
      "preserve_on_migration": true,
      "sha256": "651e7993464c33abb3a4cc424659d4d9ab20700bdace2f6359e664e23a71c313"
    },
    {
      "path": "finanzas/gastos.md",
      "type": "md",
      "size_bytes": 12920,
      "category": "data",
      "purpose": "fuente de verdad financiera; alimenta Finanzas.exe",
      "importance": "critical",
      "preserve_on_migration": true,
      "sha256": "318a60375c311c7c90ea0be48b8cd1daa1e64b7281873c7adaeb8c3f444434a4"
    },
    {
      "path": "logros.md",
      "type": "md",
      "size_bytes": 7929,
      "category": "data",
      "purpose": "fuente de XP/trofeos de Yo.exe y Cerebro.exe — ver 07_ENTITIES.json",
      "importance": "critical",
      "preserve_on_migration": true,
      "sha256": "1227a598178e4cddb2f035e8cf8195ce547020b2c741a713b0c05272c18abe96"
    },
    {
      "path": "metas/ahorro.md",
      "type": "md",
      "size_bytes": 7964,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "d9f82cb42df456418006484ba92c7e8ead942d558ec6fc013e4489f37d828d28"
    },
    {
      "path": "metas/aprendizaje.md",
      "type": "md",
      "size_bytes": 4315,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "03ef450bfe3b2c6d0ce644f0bd105299d6e90a0fd173257e63f0011e389267b1"
    },
    {
      "path": "metas/articulo-giro-derecha.md",
      "type": "md",
      "size_bytes": 24942,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "24e99b1ffddc8a7590b39c223eea670deb5b506e1c497e92a43ed027e912918b"
    },
    {
      "path": "metas/cv.md",
      "type": "md",
      "size_bytes": 9250,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "ab5cd26f2272be4a722e4418bab21403178ad7673921148ec430ccdc2eb8c338"
    },
    {
      "path": "metas/cv/DiegoRuizElizondo.CV.ENG.pdf",
      "type": "pdf",
      "size_bytes": 4392,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "d81628fdb73df6c477015b6ae983da9619fe26bb277fe76e99550bebf9b72369"
    },
    {
      "path": "metas/cv/DiegoRuizElizondo.CV.ESP.pdf",
      "type": "pdf",
      "size_bytes": 4421,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "6955681e99674e44149f8da4a3cf26209f7ad17a637139c6bd1bf7d4ef7c324d"
    },
    {
      "path": "metas/cv/DiegoRuizElizondo.CartaPresentacion.SMJ.ESP.pdf",
      "type": "pdf",
      "size_bytes": 3294,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "69b4eebfe54d92af8f1f0120eeef2038a7e280a3ee251000db81fc57d5a96e64"
    },
    {
      "path": "metas/cv/DiegoRuizElizondo.CoverLetter.SMJ.ENG.pdf",
      "type": "pdf",
      "size_bytes": 3235,
      "category": "asset/document",
      "purpose": "documento original (PDF/imagen) referenciado desde un .md",
      "importance": "medium",
      "preserve_on_migration": true,
      "sha256": "a703292d52a52f3dfbee2be24475b3eaa431b4f6b634d2ec7c9796ba76e0864a"
    },
    {
      "path": "metas/patrimonio.md",
      "type": "md",
      "size_bytes": 19618,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "f7a621b640d559b04e32cd2dfabac6510b70de68a6275324094cc2373df76b83"
    },
    {
      "path": "metas/titulacion.md",
      "type": "md",
      "size_bytes": 10464,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "d65795da950d9f3e4be6e3b2aacdcfd48b2e18b05a594107dacbc1890f53653a"
    },
    {
      "path": "metas/trabajo.md",
      "type": "md",
      "size_bytes": 24450,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "f868388ff851f3da0967450706ccb51bf21e4afa5d8dcffc7c916b1789cd75ad"
    },
    {
      "path": "metas/tramites.md",
      "type": "md",
      "size_bytes": 1766,
      "category": "data",
      "purpose": "meta activa o de horizonte; cada una alimenta un tablero .exe específico",
      "importance": "high",
      "preserve_on_migration": true,
      "sha256": "cb44ae25d591799a90a2d99b83b62e0e82842e221c05bf3748e9687ee96b28d1"
    },
    {
      "path": "perfil/amigos.md",
      "type": "md",
      "size_bytes": 2053,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "3404177f17a979342d231ad573eeca17986885068d6b9adc9be8bca936aafa39"
    },
    {
      "path": "perfil/carros.md",
      "type": "md",
      "size_bytes": 3138,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "6579e5352195dfb4678c70de3dd6559016c6e0fccafb59b492e29c7c5c7d7232"
    },
    {
      "path": "perfil/citas.md",
      "type": "md",
      "size_bytes": 3973,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "94d8389631af1efaf153d5a8ab93a052948b2355c4888f7a44ee337af554a77f"
    },
    {
      "path": "perfil/compras.md",
      "type": "md",
      "size_bytes": 4325,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "d45fe57cfb5a4d894cbdf75429eded95f0dd0ff77700eb9487ac873dd6702c90"
    },
    {
      "path": "perfil/cuarto.md",
      "type": "md",
      "size_bytes": 1194,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "a0ed3d721781bb1ee1316d89b7d085bdae167ea7044d77771c9eeeabe90ba70d"
    },
    {
      "path": "perfil/edc.md",
      "type": "md",
      "size_bytes": 1811,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "9debc55d713dedbbad54a44eba85e6475b515f2196350d47b651157884d87ad0"
    },
    {
      "path": "perfil/eventos-cercanos.md",
      "type": "md",
      "size_bytes": 2493,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "a4b4780ac8d813fe66c61b19648e1a63087dc79f9d6dce183f0b77f746533832"
    },
    {
      "path": "perfil/eventos.md",
      "type": "md",
      "size_bytes": 3304,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "a013cf16e3f98ec35b3feb5e58ad3451b38fd1581ca6e4c0a4b5be8159c34114"
    },
    {
      "path": "perfil/familia.md",
      "type": "md",
      "size_bytes": 1366,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "f8b5acb842a0c8e258b951e975f140a594ade06d92b6290292d572dab12cd0a5"
    },
    {
      "path": "perfil/fechas-importantes.md",
      "type": "md",
      "size_bytes": 2193,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "8ef51600b8cca93b9d777699da26320490d93e635a2139b656ad3e0f729310b9"
    },
    {
      "path": "perfil/hoy.md",
      "type": "md",
      "size_bytes": 2926,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "c498a740973b6e61bb0b008e7945f96ffb961c4e48b76275b40455aa64cee0fc"
    },
    {
      "path": "perfil/intereses.md",
      "type": "md",
      "size_bytes": 8283,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "a281cfb1c75af8c06fa45c6c517839e889bc8123bcc46e9e10624642e4af2dd2"
    },
    {
      "path": "perfil/noticias.md",
      "type": "md",
      "size_bytes": 4202,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "a543bd76b22bd3be8b9db35222dde0bdcacbe2a374f40cea725258a2d91f9c9b"
    },
    {
      "path": "perfil/novia.md",
      "type": "md",
      "size_bytes": 2480,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "4c508c361132caf02409309d53fc7ebd3ceddfc88a9ca914bc07051bff1f2674"
    },
    {
      "path": "perfil/regalos-familia.md",
      "type": "md",
      "size_bytes": 2440,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "f518d00f06227e1611364c4ee4dd38868fe3ec9e8242c65fbfcec54e598545a4"
    },
    {
      "path": "perfil/regalos-novia.md",
      "type": "md",
      "size_bytes": 10516,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "9fa4a0e8d46696a36c4c8f1f5b154bdfae3f864609e19141e95064431b5758fc"
    },
    {
      "path": "perfil/relaciones.md",
      "type": "md",
      "size_bytes": 1578,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "8b288aa40c2a2a177a43f0a5cd1955a01fea0588ad75d310524c71996140c59a"
    },
    {
      "path": "perfil/rutina.md",
      "type": "md",
      "size_bytes": 10857,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "b95504bf7c06a6a25ae479275c844edcdaba09bbab87495fcdb053fabca1dd93"
    },
    {
      "path": "perfil/salud.md",
      "type": "md",
      "size_bytes": 3897,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "5f304d2e814d4289581742be0a53db699c9dd05009bacad8d562eb0c984ea559"
    },
    {
      "path": "perfil/servicios.md",
      "type": "md",
      "size_bytes": 5242,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "7ffb163236ff4d269a6cd82d24c02cc8aaf71f5cb6d74a2aa448f55327b94ad7"
    },
    {
      "path": "perfil/tiempo.md",
      "type": "md",
      "size_bytes": 1752,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "7b9e7fab54f200cdfd03edc0c6b9c837e683ce94002ebc245f1ec3f5c30b5fe9"
    },
    {
      "path": "perfil/viaje-cabana.md",
      "type": "md",
      "size_bytes": 6942,
      "category": "data",
      "purpose": "contexto personal; varios alimentan tableros directamente (rutina.md->Rutina.exe, hoy.md->Hoy.exe, etc.)",
      "importance": "medium-high",
      "preserve_on_migration": true,
      "sha256": "818d449446e7f1177dccd48508f4b63ff1ca90d71c4235a8c7b437b45d0aa1de"
    }
  ]
}
```


## 4. ARCHITECTURE

```json
{
  "generated_at": "2026-09-11",
  "summary": "Arquitectura de dos repositorios de facto: (1) un repo git con archivos de texto plano como base de datos, editado por Claude Code en conversación; (2) una red de Claude Artifacts (HTML/CSS/JS standalone) hosteados en claude.ai, que NO están en git, y que se republican manualmente leyendo los .md. No hay build, no hay servidor propio, no hay base de datos real, no hay tests.",
  "entry_points": [
    {
      "type": "humano",
      "desc": "Diego conversa con Claude (Claude Code / claude.ai). Es la ÚNICA forma de escritura del sistema — no hay UI de captura de datos fuera del chat, salvo los checkboxes/inputs client-side de algunos tableros (que NO escriben de vuelta al repo, ver 'flujo de datos')."
    },
    {
      "type": "automatizado",
      "desc": "5 Routines diarias (5:05am, 8:10am, 1:50pm, 6:05pm, 8:10pm) descritas en README.md — disparan una sesión de Claude que redacta y republica Periódico.exe. Configuración real de estas Routines NO vive en este repo (vive en la plataforma de Claude)."
    },
    {
      "type": "skill /dinero",
      "desc": "invocada por el usuario o detectada por Claude cuando el usuario suelta un monto de dinero en el chat"
    },
    {
      "type": "skill /revisemos-cerebro",
      "desc": "invocada explícitamente por el usuario, normalmente los jueves (primer día off)"
    }
  ],
  "execution_model": "No hay 'ejecución' de servidor. El repo es leído y escrito por Claude durante una conversación (vía herramientas de archivo). Los tableros .exe se 'ejecutan' cada vez que Diego los abre en su navegador — son documentos HTML autocontenidos que corren 100% client-side.",
  "data_flow": {
    "write_path": "Diego cuenta algo en el chat -> Claude edita el .md correspondiente en git (commit) -> si el cambio afecta un tablero publicado, Claude hace Artifact:read de ese tablero, edita el HTML a mano insertando el nuevo dato como literal (no hay plantilla/build), y Artifact:publish a la MISMA URL.",
    "read_path_for_diego": "Diego abre el tablero .exe directo en su navegador (guardado en pantalla de inicio) — lee el HTML/JS ya publicado, sin pasar por git ni por Claude en ese momento.",
    "one_way_street": "Los inputs interactivos de algunos tableros (checkboxes de Rutina.exe, inputs de Finanzas.exe) escriben SOLO a localStorage del navegador de Diego. NUNCA vuelven a escribirse en el .md ni en git — el flujo de vuelta depende 100% de que Diego se lo cuente a Claude en el chat. Esto es una asimetría de diseño confirmada, no un bug: CLAUDE.md lo advierte explícitamente para Finanzas.exe."
  },
  "persistence_layers": [
    {
      "layer": "git (SOURCE/)",
      "durability": "permanente, versionado, con historial",
      "contains": "toda la 'verdad' del sistema: metas, perfil, finanzas, desempeño, logros, biblioteca de documentos, skills de Claude Code"
    },
    {
      "layer": "Claude Artifacts (claude.ai)",
      "durability": "permanente pero fuera de git — sin versionado accesible al usuario más allá de 'versión N' interna de la plataforma",
      "contains": "el código fuente completo de cada tablero — CSS, JS, y datos LITERALES incrustados (arrays hardcoded como WEEK, GROUPS, ALERTS)"
    },
    {
      "layer": "localStorage del navegador de Diego",
      "durability": "volátil — se puede perder al limpiar el navegador, cambiar de dispositivo o modo incógnito",
      "contains": "checkboxes marcados en Rutina.exe, posibles datos semilla de Finanzas.exe/Desempeño.exe"
    }
  ],
  "no_build_no_framework": true,
  "no_backend": true,
  "no_database": true,
  "no_tests": true,
  "no_ci": true,
  "components": {
    "cerebro_exe_hub": "componente raíz: header+reloj, sección Ahora, Atención, Tu día, Pistas activas, Horizontes, buscador+filtro de 22 boards, dock de navegación",
    "board": "cada uno de los 22 tableros: documento HTML independiente, típicamente con header 'volver a Cerebro.exe', 1+ secciones de tarjetas, y opcionalmente estado en localStorage",
    "claude_code_skills": "2 skills (.claude/skills/) que automatizan flujos conversacionales específicos: captura de gasto, revisión de metas"
  }
}
```


## 5. BOARDS

```json
{
  "generated_at": "2026-09-11",
  "authoritative_source": "variable GROUPS dentro del código JS de Cerebro.exe (ARTIFACTS_SOURCE/Cerebro.exe__19dc184b....html) — NO existe una lista equivalente completa en ningún archivo .md del repo",
  "total_boards": 22,
  "matches_expected_22": true,
  "boards": [
    {
      "group": "Cada día",
      "icon": "📰",
      "name": "Periódico",
      "id": "4169c45b-465f-4ecd-9015-7f76693f3614",
      "what": "Tu portada de la mañana: clima, urgente, noticias",
      "source_md": [
        "perfil/hoy.md",
        "perfil/noticias.md"
      ],
      "source_captured_full": true,
      "url": "https://claude.ai/code/artifact/4169c45b-465f-4ecd-9015-7f76693f3614"
    },
    {
      "group": "Cada día",
      "icon": "🗓️",
      "name": "Rutina",
      "id": "4ef55817-2876-46f2-939e-7399e38db433",
      "what": "Tu semana, el día en bloques y los pendientes vivos",
      "source_md": [
        "perfil/rutina.md",
        "perfil/tiempo.md"
      ],
      "source_captured_full": true,
      "url": "https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433"
    },
    {
      "group": "Cada día",
      "icon": "🌤️",
      "name": "Hoy",
      "id": "b7358df3-d5c4-4b82-80c6-e4f375a149aa",
      "what": "Clima de casa y del trabajo, y lo más próximo",
      "source_md": [
        "perfil/hoy.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/b7358df3-d5c4-4b82-80c6-e4f375a149aa"
    },
    {
      "group": "Cada día",
      "icon": "📅",
      "name": "Calendario",
      "id": "8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778",
      "what": "El mes completo: conciertos, cumpleaños, aniversario",
      "source_md": [
        "perfil/eventos.md",
        "perfil/fechas-importantes.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778"
    },
    {
      "group": "Trabajo y escuela",
      "icon": "🎓",
      "name": "Titulación",
      "id": "ab59366f-ab5f-4bff-835e-348255129efc",
      "what": "El trámite paso por paso: ficha, ATI, solicitud",
      "source_md": [
        "metas/titulacion.md"
      ],
      "source_captured_full": true,
      "url": "https://claude.ai/code/artifact/ab59366f-ab5f-4bff-835e-348255129efc"
    },
    {
      "group": "Trabajo y escuela",
      "icon": "📊",
      "name": "Desempeño",
      "id": "9451d24a-fcd6-4017-b8c5-8f641583c24e",
      "what": "Tus métricas de Boost en % a meta",
      "source_md": [
        "desempeno/README.md",
        "desempeno/metricas.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/9451d24a-fcd6-4017-b8c5-8f641583c24e"
    },
    {
      "group": "Trabajo y escuela",
      "icon": "📞",
      "name": "Llamadas",
      "id": "cc525f96-4b21-4056-87df-b53c0bda9db5",
      "what": "Qué decir en cada tipo de llamada, para subir el FCR",
      "source_md": [
        "desempeno/metricas.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/cc525f96-4b21-4056-87df-b53c0bda9db5"
    },
    {
      "group": "Trabajo y escuela",
      "icon": "💼",
      "name": "Trabajo",
      "id": "fe81e91b-4a6f-4e04-aa6f-8355a64bb136",
      "what": "Vacantes, CV y LinkedIn — en modo mantenimiento",
      "source_md": [
        "metas/trabajo.md",
        "metas/cv.md"
      ],
      "source_captured_full": true,
      "url": "https://claude.ai/code/artifact/fe81e91b-4a6f-4e04-aa6f-8355a64bb136"
    },
    {
      "group": "Trabajo y escuela",
      "icon": "✍️",
      "name": "Artículos",
      "id": "25b45539-b542-44ea-9085-a19aeb4edca8",
      "what": "El artículo del giro a la derecha: fuentes y guion",
      "source_md": [
        "metas/articulo-giro-derecha.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/25b45539-b542-44ea-9085-a19aeb4edca8"
    },
    {
      "group": "Dinero",
      "icon": "💵",
      "name": "Finanzas",
      "id": "6841396f-30cd-494e-8139-b05c33caec8e",
      "what": "Cuentas, gastos y pendientes de la quincena",
      "source_md": [
        "finanzas/README.md",
        "finanzas/gastos.md"
      ],
      "source_captured_full": false,
      "note": "Usa localStorage — el .md sigue siendo la fuente de verdad, ver CLAUDE.md",
      "url": "https://claude.ai/code/artifact/6841396f-30cd-494e-8139-b05c33caec8e"
    },
    {
      "group": "Dinero",
      "icon": "🏠",
      "name": "Mudanza",
      "id": "d66ad007-842c-4377-ac69-c9fdc8267002",
      "what": "El ahorro de los $47,000 y cuándo estarían listos",
      "source_md": [
        "metas/ahorro.md"
      ],
      "source_captured_full": false,
      "artifact_title_on_platform": "Nuestra Casa Antes de Diciembre",
      "url": "https://claude.ai/code/artifact/d66ad007-842c-4377-ac69-c9fdc8267002"
    },
    {
      "group": "Dinero",
      "icon": "📜",
      "name": "Patrimonio",
      "id": "4f25e5f2-4321-4051-bbec-044c67464a3e",
      "what": "El largo plazo: boda, casa propia, INFONAVIT",
      "source_md": [
        "metas/patrimonio.md"
      ],
      "source_captured_full": false,
      "artifact_title_on_platform": "acta-patrimonial",
      "url": "https://claude.ai/code/artifact/4f25e5f2-4321-4051-bbec-044c67464a3e"
    },
    {
      "group": "Dinero",
      "icon": "🛒",
      "name": "Compras",
      "id": "ec0c9f2b-ad2e-46fa-9beb-4f00492373c3",
      "what": "Tu wishlist y el Fondo cosillas, aparte del ahorro",
      "source_md": [
        "perfil/compras.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/ec0c9f2b-ad2e-46fa-9beb-4f00492373c3"
    },
    {
      "group": "Fanny y familia",
      "icon": "💜",
      "name": "Nosotros",
      "id": "958d66cd-dbca-442a-b286-37994df7026e",
      "what": "El dossier de ustedes dos y el contador de días",
      "source_md": [
        "perfil/novia.md",
        "perfil/citas.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/958d66cd-dbca-442a-b286-37994df7026e"
    },
    {
      "group": "Fanny y familia",
      "icon": "✉️",
      "name": "Recetario para Fanny",
      "id": "9141d18a-8ce1-4279-afe0-362e57c24ce9",
      "what": "La carta imprimible, el separador y la receta",
      "source_md": [
        "perfil/regalos-novia.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/9141d18a-8ce1-4279-afe0-362e57c24ce9"
    },
    {
      "group": "Fanny y familia",
      "icon": "🌲",
      "name": "Árbol",
      "id": "d0c4a5cf-e170-4c8b-a29e-df6f7f8ca699",
      "what": "Quién es quién: familia, pareja y amigos",
      "source_md": [
        "perfil/relaciones.md"
      ],
      "source_captured_full": false,
      "artifact_title_on_platform": "Árbol de Diego",
      "url": "https://claude.ai/code/artifact/d0c4a5cf-e170-4c8b-a29e-df6f7f8ca699"
    },
    {
      "group": "Fanny y familia",
      "icon": "🧩",
      "name": "Perfil",
      "id": "1b3a94a5-78a4-4833-9e05-ff2d870c2917",
      "what": "Salud, familia, amigos y tus gustos",
      "source_md": [
        "perfil/salud.md",
        "perfil/familia.md",
        "perfil/amigos.md",
        "perfil/intereses.md"
      ],
      "source_captured_full": true,
      "NOTE_DISCREPANCIA": "Esta URL NO aparece en ningún archivo .md del repo (verificado por grep). Solo existe dentro del código JS de Cerebro.exe. Si se pierde ese artifact, se pierde el único puntero a este tablero — mitigado en este export (ver 06_ARTIFACTS.json y 13_ISSUES.json).",
      "url": "https://claude.ai/code/artifact/1b3a94a5-78a4-4833-9e05-ff2d870c2917"
    },
    {
      "group": "Tú y tus cosas",
      "icon": "🎮",
      "name": "Yo",
      "id": "f3018b22-33ba-4ddb-bda7-fd0fd8e924bf",
      "what": "Tu hoja de personaje: nivel, XP y atributos",
      "source_md": [
        "logros.md"
      ],
      "source_captured_full": false,
      "note": "XP = (checkboxes [x] en metas/ × 10) + (filas de logros.md × 50), según logros.md",
      "url": "https://claude.ai/code/artifact/f3018b22-33ba-4ddb-bda7-fd0fd8e924bf"
    },
    {
      "group": "Tú y tus cosas",
      "icon": "🏆",
      "name": "Logros",
      "id": "824aa431-f946-4228-b64a-da3c7fe40345",
      "what": "Lo que ya lograste, no lo que falta",
      "source_md": [
        "logros.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/824aa431-f946-4228-b64a-da3c7fe40345"
    },
    {
      "group": "Tú y tus cosas",
      "icon": "🚗",
      "name": "Carros",
      "id": "343ba47e-786d-4245-8ef0-44826ec627c7",
      "what": "El Chevy y el Aveo: stats y bitácora del taller",
      "source_md": [
        "perfil/carros.md",
        "perfil/viaje-cabana.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/343ba47e-786d-4245-8ef0-44826ec627c7"
    },
    {
      "group": "Tú y tus cosas",
      "icon": "📁",
      "name": "Biblioteca",
      "id": "35790e36-7e9e-4768-a2e1-17acfd3d1bb7",
      "what": "Tus documentos reales: CV, ATI, recibos",
      "source_md": [
        "biblioteca/README.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/35790e36-7e9e-4768-a2e1-17acfd3d1bb7"
    },
    {
      "group": "Tú y tus cosas",
      "icon": "🗺️",
      "name": "Descubre",
      "id": "776e9c82-74b6-4efc-9698-866474be9271",
      "what": "Noticias con perspectiva y qué hay cerca",
      "source_md": [
        "perfil/noticias.md",
        "perfil/eventos-cercanos.md"
      ],
      "source_captured_full": false,
      "url": "https://claude.ai/code/artifact/776e9c82-74b6-4efc-9698-866474be9271"
    }
  ]
}
```


## 6. BOARD RELATIONSHIPS

```json
{
  "generated_at": "2026-09-11",
  "method": "Para los 6 artifacts con código fuente capturado íntegro (ver 06_ARTIFACTS.json), las relaciones se extrajeron leyendo los <a href> reales del HTML. Para los 16 restantes, la única relación verificable sin re-fetch es 'aparece en el diccionario U de Cerebro.exe y por lo tanto tiene un link de vuelta a Cerebro.exe' (patrón confirmado en los 6 que sí se leyeron completos — todos usan <a class=\"back\" href=\"...19dc184b...\">).",
  "hub": {
    "id": "19dc184b-9e66-40e3-a25f-d4348f83bf4b",
    "name": "Cerebro.exe",
    "role": "único punto de entrada; contiene los 22 links a boards + su propia sección 'Ahora'/'Atención'/'Tu día'/'Pistas activas'/'Horizontes'",
    "links_out_confirmed_in_source": 22
  },
  "confirmed_edges_from_captured_sources": [
    {
      "from": "Cerebro.exe",
      "to": "Titulación.exe",
      "via": "pill (Pistas activas) + board row"
    },
    {
      "from": "Cerebro.exe",
      "to": "Desempeño.exe",
      "via": "pill (Pistas activas) + board row"
    },
    {
      "from": "Cerebro.exe",
      "to": "Rutina.exe",
      "via": "pill (Pistas activas) + board row"
    },
    {
      "from": "Rutina.exe",
      "to": "Cerebro.exe",
      "via": "back-link"
    },
    {
      "from": "Trabajo.exe",
      "to": "Cerebro.exe",
      "via": "back-link"
    },
    {
      "from": "Titulación.exe",
      "to": "Cerebro.exe",
      "via": "back-link"
    },
    {
      "from": "Titulación.exe",
      "to": "github.com/skywalkerdiego/Cerebro (PDFs)",
      "via": "file links a biblioteca/titulacion/*.pdf en GitHub raw"
    },
    {
      "from": "Periódico.exe",
      "to": "Cerebro.exe",
      "via": "back-link + ilink en texto"
    },
    {
      "from": "Periódico.exe",
      "to": "Descubre.exe, Trabajo.exe, Vaivén.exe, Calendario.exe",
      "via": "ilink dentro del texto de cada sección"
    },
    {
      "from": "Perfil.exe",
      "to": "Cerebro.exe",
      "via": "back-link"
    }
  ],
  "pattern_inferred_for_uncaptured_boards": "Los 16 tableros no capturados en full siguen, con altísima probabilidad, el mismo patrón visual (header con <a class='back' href='.../19dc184b...'>&larr; Cerebro.exe</a>) observado consistentemente en los 6 capturados — confirmarlo requiere un re-fetch puntual, no se asume como hecho.",
  "groups": {
    "Cada día": [
      "Periódico",
      "Rutina",
      "Hoy",
      "Calendario"
    ],
    "Trabajo y escuela": [
      "Titulación",
      "Desempeño",
      "Llamadas",
      "Trabajo",
      "Artículos"
    ],
    "Dinero": [
      "Finanzas",
      "Mudanza",
      "Patrimonio",
      "Compras"
    ],
    "Fanny y familia": [
      "Nosotros",
      "Recetario para Fanny",
      "Árbol",
      "Perfil"
    ],
    "Tú y tus cosas": [
      "Yo",
      "Logros",
      "Carros",
      "Biblioteca",
      "Descubre"
    ]
  }
}
```


## 7. ARTIFACTS

```json
{
  "generated_at": "2026-09-11",
  "method": "Cruce exacto entre `Artifact action:list` (39 resultados) y (a) la variable GROUPS embebida en el JS de Cerebro.exe (22 boards) y (b) grep -r sobre *.md del repo de trabajo (29 URLs encontradas). No se asumió que existieran exactamente 22 artifacts — se descubrió primero qué existe (39) y luego se comparó.",
  "summary": {
    "total_published_artifacts_found": 39,
    "count_is_one_of_22_boards": 22,
    "count_hub": 1,
    "count_active_linked_extra_not_in_nav": 8,
    "count_orphan_or_retired": 9,
    "reconciliation_note": "22 boards + 1 hub (Cerebro.exe, que también cuenta como board-like pero no está en su propia lista GROUPS) + 6 extra activos enlazados desde el repo pero fuera de la navegación de 22 (Vaivén.exe, Combo Totalplay, Chao AT&T, Bitácora de Cabaña, Alerta de Sistema, Habilidades.exe-referencia obsoleta) + 9 huérfanos confirmados = 22+1+6+9 = 38. El artifact #39 es el propio Cerebro.exe, ya contado como hub — por eso 22+6+9=37 sin hub, +1 hub +1 (Cerebro.exe está en ambas listas: es hub Y aparece en REFERENCED_IN_REPO_MD por sus propios back-links) = 39. Ver el conteo campo por campo en 'artifacts' para la verdad exacta; este texto es solo orientación."
  },
  "artifacts": [
    {
      "platform_title": "Rutina.exe",
      "id": "4ef55817-2876-46f2-939e-7399e38db433",
      "url": "https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433",
      "favicon": "🗓️",
      "last_updated_on_platform": "2026-09-09",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": true,
      "source_file": "ARTIFACTS_SOURCE/Rutina.exe__4ef55817-2876-46f2-939e-7399e38db433.html",
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Trabajo.exe",
      "id": "fe81e91b-4a6f-4e04-aa6f-8355a64bb136",
      "url": "https://claude.ai/code/artifact/fe81e91b-4a6f-4e04-aa6f-8355a64bb136",
      "favicon": "💼",
      "last_updated_on_platform": "2026-09-07",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": true,
      "source_file": "ARTIFACTS_SOURCE/Trabajo.exe__fe81e91b-4a6f-4e04-aa6f-8355a64bb136.html",
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Cerebro.exe",
      "id": "19dc184b-9e66-40e3-a25f-d4348f83bf4b",
      "url": "https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b",
      "favicon": "🖥️",
      "last_updated_on_platform": "2026-09-10",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": true,
      "source_file": "SOURCE/../ARTIFACTS_SOURCE/Cerebro.exe__19dc184b-9e66-40e3-a25f-d4348f83bf4b.html",
      "status": "ACTIVE_LINKED_EXTRA"
    },
    {
      "platform_title": "Titulación.exe",
      "id": "ab59366f-ab5f-4bff-835e-348255129efc",
      "url": "https://claude.ai/code/artifact/ab59366f-ab5f-4bff-835e-348255129efc",
      "favicon": "🎓",
      "last_updated_on_platform": "2026-09-09",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": true,
      "source_file": "ARTIFACTS_SOURCE/Titulacion.exe__ab59366f-ab5f-4bff-835e-348255129efc.html",
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Periódico.exe",
      "id": "4169c45b-465f-4ecd-9015-7f76693f3614",
      "url": "https://claude.ai/code/artifact/4169c45b-465f-4ecd-9015-7f76693f3614",
      "favicon": "📰",
      "last_updated_on_platform": "2026-09-11",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": true,
      "source_file": "ARTIFACTS_SOURCE/Periodico.exe__4169c45b-465f-4ecd-9015-7f76693f3614.html",
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Perfil.exe",
      "id": "1b3a94a5-78a4-4833-9e05-ff2d870c2917",
      "url": "https://claude.ai/code/artifact/1b3a94a5-78a4-4833-9e05-ff2d870c2917",
      "favicon": "👤",
      "last_updated_on_platform": "2026-08-20",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": true,
      "source_file": "ARTIFACTS_SOURCE/Perfil.exe__1b3a94a5-78a4-4833-9e05-ff2d870c2917.html",
      "status": "ACTIVE_BOARD",
      "note": "Es uno de los 22 boards (grupo 'Fanny y familia') según el JS de Cerebro.exe, PERO no está referenciado en ningún .md del repo (verificado por grep). Riesgo real de pérdida si se pierde Cerebro.exe."
    },
    {
      "platform_title": "Nuestra Casa Antes de Diciembre",
      "id": "d66ad007-842c-4377-ac69-c9fdc8267002",
      "url": "https://claude.ai/code/artifact/d66ad007-842c-4377-ac69-c9fdc8267002",
      "favicon": "🏡",
      "last_updated_on_platform": "2026-08-18",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD",
      "board_name_vs_platform_title": "Mudanza (nombre del board en Cerebro.exe) — el título real del artifact en la plataforma es 'Nuestra Casa Antes de Diciembre'"
    },
    {
      "platform_title": "Nuestra Primera Casa",
      "id": "d50e2452-4ae1-4b47-812d-fc7db112d5dd",
      "url": "https://claude.ai/code/artifact/d50e2452-4ae1-4b47-812d-fc7db112d5dd",
      "favicon": "🏠",
      "last_updated_on_platform": "2026-09-10",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "Nuestra Primera Casa — no referenciado en ningún .md. Posible borrador/duplicado de 'Nuestra Casa Antes de Diciembre' (= board Mudanza). REQUIRES_REVIEW."
    },
    {
      "platform_title": "acta-patrimonial",
      "id": "4f25e5f2-4321-4051-bbec-044c67464a3e",
      "url": "https://claude.ai/code/artifact/4f25e5f2-4321-4051-bbec-044c67464a3e",
      "favicon": "📜",
      "last_updated_on_platform": "2026-09-01",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD",
      "board_name_vs_platform_title": "Patrimonio (nombre del board) — título real en la plataforma: 'acta-patrimonial'"
    },
    {
      "platform_title": "Vaivén.exe",
      "id": "a99bf33b-8059-4c26-b568-29c6721c3eff",
      "url": "https://claude.ai/code/artifact/a99bf33b-8059-4c26-b568-29c6721c3eff",
      "favicon": "🎪",
      "last_updated_on_platform": "2026-09-09",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_LINKED_EXTRA"
    },
    {
      "platform_title": "Calendario.exe",
      "id": "8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778",
      "url": "https://claude.ai/code/artifact/8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778",
      "favicon": "📅",
      "last_updated_on_platform": "2026-09-09",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Recetario para Fanny",
      "id": "9141d18a-8ce1-4279-afe0-362e57c24ce9",
      "url": "https://claude.ai/code/artifact/9141d18a-8ce1-4279-afe0-362e57c24ce9",
      "favicon": "✉️",
      "last_updated_on_platform": "2026-09-06",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Nosotros.exe",
      "id": "958d66cd-dbca-442a-b286-37994df7026e",
      "url": "https://claude.ai/code/artifact/958d66cd-dbca-442a-b286-37994df7026e",
      "favicon": "💞",
      "last_updated_on_platform": "2026-08-18",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Finanzas.exe",
      "id": "6841396f-30cd-494e-8139-b05c33caec8e",
      "url": "https://claude.ai/code/artifact/6841396f-30cd-494e-8139-b05c33caec8e",
      "favicon": "💰",
      "last_updated_on_platform": "2026-09-09",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Árbol de Diego",
      "id": "d0c4a5cf-e170-4c8b-a29e-df6f7f8ca699",
      "url": "https://claude.ai/code/artifact/d0c4a5cf-e170-4c8b-a29e-df6f7f8ca699",
      "favicon": "🌳",
      "last_updated_on_platform": "2026-08-22",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD",
      "board_name_vs_platform_title": "Árbol (nombre del board) — título real: 'Árbol de Diego'"
    },
    {
      "platform_title": "Ruta a Comercio Exterior",
      "id": "c760fdb4-8c4e-4862-a80a-d7d140f03946",
      "url": "https://claude.ai/code/artifact/c760fdb4-8c4e-4862-a80a-d7d140f03946",
      "favicon": "🧭",
      "last_updated_on_platform": "2026-09-02",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "Ruta a Comercio Exterior — no referenciado en ningún .md. Posible material de apoyo para metas/trabajo.md nunca enlazado de vuelta. REQUIRES_REVIEW."
    },
    {
      "platform_title": "tiempo",
      "id": "01b588c9-30de-4d77-9599-c8d1927a0f39",
      "url": "https://claude.ai/code/artifact/01b588c9-30de-4d77-9599-c8d1927a0f39",
      "favicon": "⏳",
      "last_updated_on_platform": "2026-09-01",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "tiempo — Tiempo.exe standalone, retirado: perfil/tiempo.md dice explícitamente 'desde el 01/09/2026 la vista visual ya no es un tablero aparte'. Huérfano confirmado — cero referencias en el repo."
    },
    {
      "platform_title": "pendientes",
      "id": "63d7f21a-ee1d-4176-9147-d6d5739e70b8",
      "url": "https://claude.ai/code/artifact/63d7f21a-ee1d-4176-9147-d6d5739e70b8",
      "favicon": "✅",
      "last_updated_on_platform": "2026-09-01",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "pendientes — Pendientes.exe, retirado explícitamente según README ('se desactualizaba solo... se retiró'). Huérfano confirmado."
    },
    {
      "platform_title": "Descubre.exe",
      "id": "776e9c82-74b6-4efc-9698-866474be9271",
      "url": "https://claude.ai/code/artifact/776e9c82-74b6-4efc-9698-866474be9271",
      "favicon": "🗺️",
      "last_updated_on_platform": "2026-08-31",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Hoy.exe",
      "id": "b7358df3-d5c4-4b82-80c6-e4f375a149aa",
      "url": "https://claude.ai/code/artifact/b7358df3-d5c4-4b82-80c6-e4f375a149aa",
      "favicon": "⛅",
      "last_updated_on_platform": "2026-09-11",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Habilidades.exe",
      "id": "3a0ddef9-d6a7-493d-a512-387301f153fa",
      "url": "https://claude.ai/code/artifact/3a0ddef9-d6a7-493d-a512-387301f153fa",
      "favicon": "🌳",
      "last_updated_on_platform": "2026-08-31",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_LINKED_EXTRA",
      "note": "Habilidades.exe — logros.md dice explícitamente que se fusionó dentro de Yo.exe el 31/08/2026, pero perfil/hoy.md TODAVÍA lo enlaza como si fuera independiente. Referencia obsoleta en el repo, no corregida."
    },
    {
      "platform_title": "Compras.exe",
      "id": "ec0c9f2b-ad2e-46fa-9beb-4f00492373c3",
      "url": "https://claude.ai/code/artifact/ec0c9f2b-ad2e-46fa-9beb-4f00492373c3",
      "favicon": "🛒",
      "last_updated_on_platform": "2026-08-22",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Aspect.exe",
      "id": "9f1cc5e9-30b4-46d9-b540-6f2a3a3f938c",
      "url": "https://claude.ai/code/artifact/9f1cc5e9-30b4-46d9-b540-6f2a3a3f938c",
      "favicon": "🧭",
      "last_updated_on_platform": "2026-08-31",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "Aspect.exe — fusionado dentro de Rutina.exe el 31/08/2026 según logros.md y el propio código de Rutina.exe ('antes repartido en Aspect.exe, Tiempo.exe y Pendientes.exe'). Huérfano confirmado, cero referencias en el repo."
    },
    {
      "platform_title": "Yo.exe",
      "id": "f3018b22-33ba-4ddb-bda7-fd0fd8e924bf",
      "url": "https://claude.ai/code/artifact/f3018b22-33ba-4ddb-bda7-fd0fd8e924bf",
      "favicon": "🎮",
      "last_updated_on_platform": "2026-09-07",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Carros.exe",
      "id": "343ba47e-786d-4245-8ef0-44826ec627c7",
      "url": "https://claude.ai/code/artifact/343ba47e-786d-4245-8ef0-44826ec627c7",
      "favicon": "🚗",
      "last_updated_on_platform": "2026-08-29",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Alerta de Sistema",
      "id": "74510b0d-37ac-4714-a1e1-1b5ff6e3c5c1",
      "url": "https://claude.ai/code/artifact/74510b0d-37ac-4714-a1e1-1b5ff6e3c5c1",
      "favicon": "🚨",
      "last_updated_on_platform": "2026-08-29",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_LINKED_EXTRA"
    },
    {
      "platform_title": "Bitácora de Cabaña",
      "id": "022014ce-da2f-4832-8873-3d4d77e689fb",
      "url": "https://claude.ai/code/artifact/022014ce-da2f-4832-8873-3d4d77e689fb",
      "favicon": "🧭",
      "last_updated_on_platform": "2026-08-29",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_LINKED_EXTRA"
    },
    {
      "platform_title": "Escapada al Bosque",
      "id": "f5bfdce6-6a8b-4637-aecc-4c357758cfa6",
      "url": "https://claude.ai/code/artifact/f5bfdce6-6a8b-4637-aecc-4c357758cfa6",
      "favicon": "🏕️",
      "last_updated_on_platform": "2026-08-24",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "Escapada al Bosque — no referenciado en ningún .md; probablemente un borrador anterior a 'Bitácora de Cabaña' para el mismo viaje cancelado (28-30/08). Huérfano — REQUIRES_REVIEW para confirmar con Diego si puede borrarse."
    },
    {
      "platform_title": "Eventos.exe",
      "id": "3775956a-0f71-498c-84cc-6ae882ef24a0",
      "url": "https://claude.ai/code/artifact/3775956a-0f71-498c-84cc-6ae882ef24a0",
      "favicon": "🎪",
      "last_updated_on_platform": "2026-08-31",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_LINKED_EXTRA"
    },
    {
      "platform_title": "Biblioteca.exe",
      "id": "35790e36-7e9e-4768-a2e1-17acfd3d1bb7",
      "url": "https://claude.ai/code/artifact/35790e36-7e9e-4768-a2e1-17acfd3d1bb7",
      "favicon": "📁",
      "last_updated_on_platform": "2026-08-21",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Desempeño.exe",
      "id": "9451d24a-fcd6-4017-b8c5-8f641583c24e",
      "url": "https://claude.ai/code/artifact/9451d24a-fcd6-4017-b8c5-8f641583c24e",
      "favicon": "📈",
      "last_updated_on_platform": "2026-09-09",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Llamadas.exe",
      "id": "cc525f96-4b21-4056-87df-b53c0bda9db5",
      "url": "https://claude.ai/code/artifact/cc525f96-4b21-4056-87df-b53c0bda9db5",
      "favicon": "📞",
      "last_updated_on_platform": "2026-08-22",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Chao AT&T",
      "id": "fd1ec75f-bbba-4da2-a121-04b78cb2ba83",
      "url": "https://claude.ai/code/artifact/fd1ec75f-bbba-4da2-a121-04b78cb2ba83",
      "favicon": "📱",
      "last_updated_on_platform": "2026-08-22",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_LINKED_EXTRA"
    },
    {
      "platform_title": "Combo Totalplay",
      "id": "c4cdab4f-0b30-4b9e-ac5d-c24b24f73741",
      "url": "https://claude.ai/code/artifact/c4cdab4f-0b30-4b9e-ac5d-c24b24f73741",
      "favicon": "📺",
      "last_updated_on_platform": "2026-08-22",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_LINKED_EXTRA"
    },
    {
      "platform_title": "Logros.exe",
      "id": "824aa431-f946-4228-b64a-da3c7fe40345",
      "url": "https://claude.ai/code/artifact/824aa431-f946-4228-b64a-da3c7fe40345",
      "favicon": "🏆",
      "last_updated_on_platform": "2026-09-07",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Artículos.exe",
      "id": "25b45539-b542-44ea-9085-a19aeb4edca8",
      "url": "https://claude.ai/code/artifact/25b45539-b542-44ea-9085-a19aeb4edca8",
      "favicon": "✍️",
      "last_updated_on_platform": "2026-08-21",
      "is_one_of_the_22_boards": true,
      "referenced_in_repo_md_files": true,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ACTIVE_BOARD"
    },
    {
      "platform_title": "Un plan para nosotros",
      "id": "9e6e3077-fac7-4420-8c89-6e57f96c26c7",
      "url": "https://claude.ai/code/artifact/9e6e3077-fac7-4420-8c89-6e57f96c26c7",
      "favicon": "🌅",
      "last_updated_on_platform": "2026-08-20",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "Un plan para nosotros — no referenciado en ningún .md. Nombre sugiere contenido de pareja (Fanny); posible precursor de Nosotros.exe o citas.md. REQUIRES_REVIEW."
    },
    {
      "platform_title": "Noche de Hotel",
      "id": "01c01252-8315-4e29-8180-a9a916d55464",
      "url": "https://claude.ai/code/artifact/01c01252-8315-4e29-8180-a9a916d55464",
      "favicon": "🧳",
      "last_updated_on_platform": "2026-08-20",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "Noche de Hotel — no referenciado en ningún .md. Coincide en fecha (2026-08-20) con el gasto 'Hotel −$580.00' del 20/08 en finanzas/gastos.md — probable relación temática nunca enlazada. REQUIRES_REVIEW."
    },
    {
      "platform_title": "NuevoSave.exe",
      "id": "cca20439-d974-4026-ae25-80fbfa6d6c36",
      "url": "https://claude.ai/code/artifact/cca20439-d974-4026-ae25-80fbfa6d6c36",
      "favicon": "🎮",
      "last_updated_on_platform": "2026-08-20",
      "is_one_of_the_22_boards": false,
      "referenced_in_repo_md_files": false,
      "source_captured_verbatim_in_this_export": false,
      "source_file": null,
      "status": "ORPHAN_OR_RETIRED",
      "note": "NuevoSave.exe — no referenciado en ningún .md. Nombre y favicon 🎮 sugieren relación con Yo.exe (favicon también 🎮) — posible versión anterior/experimental. REQUIRES_REVIEW."
    }
  ]
}
```


## 8. ENTITIES

```json
{
  "generated_at": "2026-09-11",
  "note": "Ninguna de estas entidades tiene un schema formal (no hay base de datos ni JSON Schema en el repo). Se reconstruyeron leyendo las tablas Markdown y las estructuras JS (var WEEK, var GROUPS, var ALERTS) de los artifacts capturados. Los campos marcados INFERRED se dedujeron del uso, no de una definición explícita.",
  "entities": [
    {
      "name": "Meta",
      "origin": "un archivo .md por meta dentro de metas/",
      "fields": {
        "titulo": "string (encabezado H1)",
        "objetivo": "string libre",
        "fecha_limite": "string DD/MM/AAAA, INFERRED — no hay un campo tipado, es prosa",
        "estado": "enum INFERRED de los valores vistos: 'En pausa'|'Activa'|'Modo mantenimiento'|'Resuelto'|'Standby'",
        "pasos": "lista de checkboxes markdown '- [ ]' / '- [x]'",
        "tablero_asociado": "URL de Artifact, cuando existe"
      },
      "instances_found": [
        "ahorro.md",
        "aprendizaje.md",
        "articulo-giro-derecha.md",
        "cv.md",
        "patrimonio.md",
        "titulacion.md",
        "trabajo.md",
        "tramites.md"
      ],
      "consumers": [
        "README.md (tabla resumen)",
        "skill revisemos-cerebro (lee estos archivos)",
        "tableros .exe correspondientes"
      ]
    },
    {
      "name": "GastoOIngreso",
      "origin": "finanzas/gastos.md, tabla 'Movimientos confirmados' dentro de cada sección de quincena",
      "fields": {
        "Fecha": "string DD/MM/AAAA",
        "Tipo": "enum: Ingreso | Gasto | Transferencia",
        "Categoria": "enum de 12 valores (11 oficiales + Deuda no-oficial) — ver .claude/skills/dinero/SKILL.md para el mapeo completo",
        "Descripcion": "string libre",
        "Monto": "string con signo y formato $#,###.## (+ para ingreso, − para gasto)"
      },
      "persistence": "tabla markdown en git (permanente) + réplica opcional como 'dato semilla' en localStorage de Finanzas.exe (NO sincronizada automáticamente)",
      "consumers": [
        "finanzas/README.md (los 3 números, snapshot manual)",
        "Finanzas.exe"
      ]
    },
    {
      "name": "MetricaDesempeno",
      "origin": "desempeno/metricas.md, tablas por métrica",
      "fields": {
        "Fecha": "string",
        "pct_to_goal": "número (%), 100% = meta — todas las métricas están normalizadas así por Boost Mobile mismo"
      },
      "metric_types": [
        "ACT Chat",
        "Chat Survey",
        "ACT Voice/Escalations",
        "First Call Resolution",
        "Performance Total"
      ],
      "consumers": [
        "Desempeño.exe",
        "Llamadas.exe (plan de ataque por categoría de IS Evaluation)"
      ]
    },
    {
      "name": "Logro",
      "origin": "logros.md, tabla 'Registro'",
      "fields": {
        "Fecha": "DD/MM/AAAA",
        "Logro": "string",
        "Area": "string libre (Sistema|Trabajo|Finanzas|Perfil|Aprendizaje|...)"
      },
      "derived_values": {
        "XP_formula": "(checkboxes [x] en metas/ × 10) + (filas de esta tabla × 50) — INFERRED de logros.md, no hay código que lo calcule dentro del repo (el cálculo vive dentro del JS de Yo.exe, no capturado en este export)",
        "trofeos": "= número de filas de esta tabla (según logros.md)"
      },
      "consumers": [
        "Yo.exe",
        "Cerebro.exe (mencionado como recalculado, aunque Cerebro.exe capturado en este export ya NO muestra XP/trofeos — ver 13_ISSUES.json)"
      ]
    },
    {
      "name": "Board (tablero)",
      "origin": "hardcoded como objeto literal dentro de la variable GROUPS en el JS de Cerebro.exe",
      "fields": {
        "i": "emoji del icono",
        "n": "nombre corto",
        "u": "URL del artifact (de la tabla U)",
        "w": "descripción de una línea",
        "k": "string de keywords para el buscador, separadas por espacio"
      },
      "count": 22,
      "grouped_by": "5 grupos fijos: 'Cada día','Trabajo y escuela','Dinero','Fanny y familia','Tú y tus cosas'",
      "consumers": [
        "el propio Cerebro.exe (se renderiza a sí mismo desde este array)"
      ]
    },
    {
      "name": "Alerta",
      "origin": "hardcoded como array literal ALERTS dentro del JS de Cerebro.exe",
      "fields": {
        "i": "emoji",
        "l": "label",
        "s": "subtítulo opcional",
        "u": "URL destino",
        "date": "YYYY-MM-DD opcional",
        "hot": "1 si es urgente-sin-fecha (booleano INFERRED)"
      },
      "sort_logic": "JS ordena por días restantes (r.d); si no hay fecha, las 'hot' van primero, las demás al final — función rank() en el propio código",
      "note": "Es la ÚNICA fuente de 'lo urgente' en Cerebro.exe — es un array escrito a mano por Claude en cada sesión, no se deriva automáticamente de los .md."
    },
    {
      "name": "DiaSemana (WEEK)",
      "origin": "hardcoded como objeto literal WEEK, dentro de Cerebro.exe, Rutina.exe y Periódico.exe (TRIPLICADO — ver 13_ISSUES.json)",
      "fields": {
        "shift": "string ej '6am-4pm'",
        "leave": "HH:MM salida de casa",
        "start": "HH:MM entra turno",
        "b1": "HH:MM break 1",
        "lunch": "HH:MM comida",
        "b2": "HH:MM break 2",
        "end": "HH:MM sale turno",
        "home": "HH:MM llega a casa",
        "off": "booleano, día sin turno",
        "foco": "string, foco de la noche",
        "focoIcon": "emoji"
      },
      "source_of_truth": "perfil/rutina.md (tabla 'Semana del ... Kronos confirmado')",
      "critical_flaw": "Los 3 artifacts que usan esta estructura la tienen copiada y pegada con fechas fijas ('2026-09-07' a '2026-09-13'). Cuando pase esa semana, los 3 artifacts fallan simultáneamente a su estado de 'sin horario' — ver 13_ISSUES.json #1."
    },
    {
      "name": "GustoOInteres (Gustos e intereses / Perfil.exe)",
      "origin": "perfil/intereses.md (prosa) → reestructurado como objetos <details> en el JS/HTML de Perfil.exe",
      "fields": {
        "titulo": "string",
        "subtitulo": "string (año/autor/género)",
        "descripcion": "prosa",
        "similares": "lista de tags"
      },
      "note": "Es contenido curado a mano por Claude, no una tabla estructurada en el .md de origen — el .md es prosa libre; el tablero es quien le da estructura de tarjetas."
    }
  ]
}
```


## 9. RELATIONSHIPS

```json
{
  "generated_at": "2026-09-11",
  "relationships": [
    {
      "from": "README.md",
      "to": "cada metas/*.md",
      "type": "tabla resumen -> detalle",
      "confirmed": true
    },
    {
      "from": "README.md",
      "to": "cada tablero .exe",
      "type": "lista 'Enlaces rápidos' con URL",
      "confirmed": true
    },
    {
      "from": "CLAUDE.md",
      "to": "todos los tableros",
      "type": "regla de gobierno: republicar cuando cambie el .md fuente",
      "confirmed": true
    },
    {
      "from": "metas/trabajo.md",
      "to": "metas/cv.md",
      "type": "referencia cruzada explícita (link relativo)",
      "confirmed": true
    },
    {
      "from": "metas/patrimonio.md",
      "to": "metas/ahorro.md",
      "type": "referencia cruzada (regla de oro: fondo intocable)",
      "confirmed": true
    },
    {
      "from": "metas/titulacion.md",
      "to": "biblioteca/titulacion/*.pdf",
      "type": "documento de respaldo",
      "confirmed": true
    },
    {
      "from": "finanzas/gastos.md",
      "to": "biblioteca/finanzas/*.png",
      "type": "documento de respaldo (recibos CFDI)",
      "confirmed": true
    },
    {
      "from": "perfil/rutina.md",
      "to": "perfil/tiempo.md",
      "type": "perfil/tiempo.md es 'el modelo' detrás de las barras de Rutina.exe",
      "confirmed": true
    },
    {
      "from": "perfil/viaje-cabana.md",
      "to": "perfil/carros.md",
      "type": "el susto del Aveo originó la bitácora de carros",
      "confirmed": true
    },
    {
      "from": "perfil/regalos-novia.md",
      "to": "metas/ahorro.md",
      "type": "chequeo de que un regalo no compita con el fondo de mudanza",
      "confirmed": true
    },
    {
      "from": ".claude/skills/dinero/SKILL.md",
      "to": "finanzas/gastos.md + finanzas/README.md",
      "type": "skill escribe en estos archivos",
      "confirmed": true
    },
    {
      "from": ".claude/skills/revisemos-cerebro/SKILL.md",
      "to": "README.md + metas/*.md + logros.md + desempeno/ + finanzas/README.md",
      "type": "skill lee estos archivos y puede escribir en README.md, metas/*.md y logros.md",
      "confirmed": true
    },
    {
      "from": "logros.md",
      "to": "Yo.exe, Cerebro.exe, Habilidades.exe(histórico)",
      "type": "fuente de cálculo de XP/trofeos, según el propio logros.md",
      "confirmed": "parcial — Cerebro.exe capturado en este export YA NO calcula XP, ver 13_ISSUES.json"
    },
    {
      "from": "Cerebro.exe (JS var U + GROUPS)",
      "to": "los 22 boards",
      "type": "tabla de enrutamiento hardcodeada",
      "confirmed": true,
      "source": "leído directo del HTML capturado"
    },
    {
      "from": "cada board .exe",
      "to": "Cerebro.exe",
      "type": "back-link '<a class=back href=...19dc184b...>'",
      "confirmed": "en los 6 boards con fuente capturada; inferido para el resto por patrón consistente"
    }
  ]
}
```


## 10. FEATURES

```json
{
  "generated_at": "2026-09-11",
  "legend": "IMPLEMENTED = código presente y verificado funcionando en el HTML capturado. PARTIAL = existe pero con hueco conocido. EXPERIMENTAL = funciona pero fue explícitamente reemplazado/cuestionado en la historia. PLACEHOLDER = UI presente sin lógica real detrás. BROKEN = confirmado roto por el propio material. UNKNOWN = no se pudo verificar (artifact no capturado en full).",
  "features": [
    {
      "feature": "Reloj/turno en vivo ('Ahora') en Cerebro.exe",
      "file": "ARTIFACTS_SOURCE/Cerebro.exe__...html",
      "component": "IIFE 'ahora + línea del día'",
      "data": "WEEK (hardcoded 2026-09-07..13)",
      "status": "IMPLEMENTED",
      "caveat": "Deja de funcionar automáticamente fuera de esa semana — cae a estado 'Falta el Kronos', que SÍ está manejado (no crashea), pero dejó de ser útil"
    },
    {
      "feature": "Buscador de tableros con filtro por categoría",
      "file": "Cerebro.exe",
      "component": "IIFE 'tableros: todo a la vista, filtro + búsqueda'",
      "data": "GROUPS (hardcoded)",
      "status": "IMPLEMENTED",
      "caveat": "normaliza acentos, filtra por categoría Y texto simultáneamente — funciona completo"
    },
    {
      "feature": "Ruido de foco (dron marrón, Web Audio API)",
      "file": "Cerebro.exe",
      "component": "IIFE 'ruido de foco'",
      "data": "localStorage['cerebroRuido']",
      "status": "IMPLEMENTED",
      "caveat": "apagado por defecto a propósito"
    },
    {
      "feature": "Dock de navegación inferior con scroll-spy",
      "file": "Cerebro.exe",
      "component": "IIFE 'dock inferior'",
      "data": "n/a",
      "status": "IMPLEMENTED"
    },
    {
      "feature": "Checklist de bloques del día con persistencia por día",
      "file": "Rutina.exe",
      "component": "buildDayBlocks + localStorage 'rutinaBlocks:<fecha>'",
      "data": "WEEK hardcoded",
      "status": "IMPLEMENTED",
      "caveat": "la key incluye la fecha, así que se resetea sola cada día — comportamiento intencional"
    },
    {
      "feature": "Checklist diario fijo (dientes, bañarse, etc.)",
      "file": "Rutina.exe",
      "component": "buildChecklist('dailyChecklist', ...)",
      "status": "IMPLEMENTED"
    },
    {
      "feature": "Checklist 'pendientes vivos'",
      "file": "Rutina.exe",
      "component": "PEND array hardcoded + localStorage 'rutinaPend:2026-09-07'",
      "status": "PARTIAL",
      "caveat": "la key de localStorage tiene la fecha '2026-09-07' HARDCODEADA (no se recalcula), así que después de esa semana el checklist reusa siempre el mismo storage key sin importar la semana real — no se resetea nunca más"
    },
    {
      "feature": "Barra de presupuesto de horas por día (hbar)",
      "file": "Rutina.exe",
      "component": "CSS .hbar + valores % hardcoded (41.7/11.1/30.2/10.4/6.6)",
      "status": "IMPLEMENTED",
      "caveat": "los porcentajes vienen de perfil/tiempo.md, pegados a mano, no calculados desde WEEK"
    },
    {
      "feature": "Rutas de búsqueda de trabajo guardadas",
      "file": "Trabajo.exe",
      "component": "tabla estática 'saved'",
      "status": "IMPLEMENTED",
      "caveat": "son solo enlaces a bolsas de trabajo externas — no hay scraping ni automatización real"
    },
    {
      "feature": "Progreso de checklist LinkedIn/CV",
      "file": "Trabajo.exe",
      "component": "barras .bar-fill con % hardcoded (100%, 44.4%)",
      "status": "PLACEHOLDER",
      "caveat": "el % está escrito a mano por Claude en cada sesión, no se calcula de un array de verdad/falso — si Diego marca uno mentalmente, nada en el código lo registra"
    },
    {
      "feature": "Stepper visual del proceso de titulación",
      "file": "Titulación.exe",
      "component": ".steps/.step.done/.step.active",
      "status": "IMPLEMENTED",
      "caveat": "estado (done/active) hardcoded en el HTML, no derivado de una fuente de datos con fechas"
    },
    {
      "feature": "Links a PDFs de documentos de titulación",
      "file": "Titulación.exe",
      "component": ".files .file",
      "status": "IMPLEMENTED",
      "caveat": "apuntan a github.com/skywalkerdiego/Cerebro/blob/main/biblioteca/... (GitHub, no al artifact biblioteca/README.md ni a Biblioteca.exe)"
    },
    {
      "feature": "Edición del Periódico por hora del día (kicker dinámico)",
      "file": "Periódico.exe",
      "component": "JS: h<7 matutina / h<11 break1 / etc.",
      "status": "IMPLEMENTED"
    },
    {
      "feature": "Contenido editorial de Periódico.exe (titular, noticias, vacantes, eventos)",
      "file": "Periódico.exe",
      "component": "HTML estático con data-slot=... por sección",
      "status": "PLACEHOLDER seteado a valores reales del 11/09/2026 en la última republicación",
      "caveat": "README describe que 5 Routines diarias deben reescribir estas secciones con búsqueda en vivo — el HTML NO tiene código de fetch; el contenido lo escribe Claude a mano en cada trigger. Si una Routine falla, el contenido queda congelado con la fecha vieja (mecanismo de detección: README dice 'si aparece con texto de placeholder, es señal de que ese brief no corrió')"
    },
    {
      "feature": "WEEK hardcoded en Periódico.exe (variante propia, con foco distinto al de Rutina.exe)",
      "file": "Periódico.exe",
      "component": "var WEEK dentro del <script>",
      "status": "BROKEN a partir del 14/09/2026 (fuera del rango de fechas cubierto)",
      "caveat": "Es una TERCERA copia de la tabla semanal, con datos de foco DISTINTOS a los de Rutina.exe (ej. '2026-08-31' con foco 'Imprimir el ATI...' que ya no aplica) — desincronización activa confirmada por lectura directa, ver 13_ISSUES.json #1"
    },
    {
      "feature": "Perfil.exe — tarjetas de gustos con <details> colapsables",
      "file": "Perfil.exe",
      "component": ".gitem <details><summary>",
      "status": "IMPLEMENTED"
    },
    {
      "feature": "Skill /revisemos-cerebro",
      "file": ".claude/skills/revisemos-cerebro/SKILL.md",
      "component": "instrucciones markdown, no código ejecutable",
      "status": "IMPLEMENTED (como prompt de Claude Code)",
      "caveat": "depende de que el usuario invoque la skill; no hay cron ni automatización fuera de Claude Code"
    },
    {
      "feature": "Skill /dinero (captura rápida de gastos)",
      "file": ".claude/skills/dinero/SKILL.md",
      "component": "instrucciones markdown",
      "status": "IMPLEMENTED (como prompt de Claude Code)"
    },
    {
      "feature": "Routines automáticas (5am/8:10am/1:50pm/6:05pm/8:10pm)",
      "file": "README.md, sección Automatizaciones",
      "component": "descritas en prosa, NO hay archivo de configuración de Routines en el repo",
      "status": "UNKNOWN / no verificable desde el repo",
      "caveat": "Las Routines de Claude viven en la plataforma (claude.ai), no en git — este repo solo las documenta en prosa"
    },
    {
      "feature": "Cálculo de XP/nivel/trofeos en Yo.exe",
      "file": "Yo.exe (NO capturado en full en este export)",
      "component": "desconocido",
      "status": "UNKNOWN",
      "caveat": "logros.md describe la fórmula, pero no se verificó el código real de Yo.exe en esta exportación"
    },
    {
      "feature": "Persistencia de Finanzas.exe",
      "file": "Finanzas.exe (NO capturado en full)",
      "component": "localStorage, según CLAUDE.md y finanzas/README.md",
      "status": "UNKNOWN (descrito en prosa, no verificado en código)"
    }
  ]
}
```


## 11. IDENTIFIERS

```json
{
  "generated_at": "2026-09-11",
  "legend": "IMMUTABLE = cambiar esto rompe una referencia cruzada real, persistencia, o compatibilidad conocida. REVIEW_REQUIRED = no se pudo confirmar con certeza si es seguro cambiarlo.",
  "artifact_uuids": {
    "status": "IMMUTABLE",
    "reason": "39 identificadores de Claude Artifact. Cambiar cualquiera de las 22 URLs de boards rompe: (a) el diccionario var U en Cerebro.exe, (b) todos los links relativos en metas/*.md y perfil/*.md, (c) el propio README.md. Lista completa en 06_ARTIFACTS.json.",
    "sample": [
      "19dc184b-9e66-40e3-a25f-d4348f83bf4b (Cerebro.exe, hub)",
      "4ef55817-2876-46f2-939e-7399e38db433 (Rutina.exe)"
    ]
  },
  "dom_ids_cerebro_exe": {
    "status": "IMMUTABLE",
    "reason": "Referenciados por getElementById en múltiples IIFEs dentro del mismo archivo; renombrar uno sin el otro rompe silenciosamente esa función.",
    "ids": [
      "top",
      "stTime",
      "stDate",
      "stShift",
      "soundBtn",
      "refreshBtn",
      "nowCard",
      "nowEyebrow",
      "nowIco",
      "nowLeft",
      "nowRange",
      "nowLabel",
      "nowNext",
      "nowFill",
      "tagline",
      "nowWarn",
      "h-pistas",
      "s-atencion",
      "h-atencion",
      "alertTail",
      "alerts",
      "s-dia",
      "h-dia",
      "dayTail",
      "timeline",
      "tableros",
      "h-tableros",
      "boardTail",
      "filters",
      "boards",
      "noHits",
      "q",
      "dock",
      "navTop",
      "navAlerts",
      "navDay",
      "navSearch",
      "refreshBtn",
      "navClose"
    ]
  },
  "css_custom_properties_cerebro_exe": {
    "status": "IMMUTABLE",
    "reason": "El JS asigna estas variables inline vía style.setProperty (--nc, --tc, --sc); si se renombran en el CSS sin tocar el JS, los colores de estado dejan de aplicarse silenciosamente (sin error visible).",
    "vars": [
      "--bg",
      "--surface",
      "--surface-2",
      "--line",
      "--text",
      "--muted",
      "--accent",
      "--accent-text",
      "--on-accent",
      "--critical",
      "--warn",
      "--ok",
      "--paused",
      "--faint",
      "--nc (inyectada por JS)",
      "--tc (inyectada por JS)",
      "--sc (inyectada por JS, también en Rutina.exe y otros)"
    ]
  },
  "localStorage_keys": {
    "status": "IMMUTABLE",
    "reason": "Cambiar cualquiera de estas keys pierde silenciosamente el progreso ya guardado por Diego en su navegador — sin error, sin migración.",
    "keys": [
      {
        "key": "cerebroRuido",
        "file": "Cerebro.exe",
        "value": "'1'|'0'"
      },
      {
        "key": "rutinaBlocks:<YYYY-MM-DD>",
        "file": "Rutina.exe",
        "value": "JSON {blockId: bool}",
        "note": "la fecha va embebida en la key — se auto-resetea cada día"
      },
      {
        "key": "rutinaDaily:<YYYY-MM-DD>",
        "file": "Rutina.exe",
        "value": "JSON {itemId: bool}"
      },
      {
        "key": "rutinaWeekly",
        "file": "Rutina.exe",
        "value": "JSON {itemId: bool}",
        "note": "sin fecha en la key — nunca se auto-resetea"
      },
      {
        "key": "rutinaPend:2026-09-07",
        "file": "Rutina.exe",
        "value": "JSON {pendId: bool}",
        "note": "⚠️ fecha HARDCODEADA, no calculada — ver 09_FEATURES.json y 13_ISSUES.json"
      }
    ]
  },
  "internal_variable_names_of_note": {
    "status": "REVIEW_REQUIRED",
    "items": [
      {
        "name": "U (diccionario de URLs)",
        "file": "Cerebro.exe",
        "note": "Claves cortas (hoy, periodico, rutina...) usadas también como IDs internos en GROUPS y ALERTS — renombrar una clave sin actualizar sus 2-3 usos rompe el link silenciosamente"
      },
      {
        "name": "WEEK",
        "file": "Cerebro.exe, Rutina.exe, Periódico.exe (3 copias independientes)",
        "note": "mismo nombre, mismo propósito, TRES definiciones distintas y ya divergentes — ver 13_ISSUES.json #1. Unificarlas es deseable pero no trivial sin tocar los 3 artifacts a la vez"
      }
    ]
  },
  "github_paths_hardcoded_in_artifacts": {
    "status": "IMMUTABLE",
    "items": [
      "https://github.com/skywalkerdiego/Cerebro/blob/main/biblioteca/titulacion/ATI_ExpedienteDGAE.pdf",
      "https://github.com/skywalkerdiego/Cerebro/blob/main/biblioteca/titulacion/SolicitudTitulo_llenado.pdf"
    ],
    "reason": "Titulación.exe apunta directo a GitHub (no al repo local, no a Biblioteca.exe) — si el repo se renombra, se mueve, o se vuelve privado sin ajustar permisos, estos links de Titulación.exe se rompen sin aviso."
  }
}
```


## 12. DESIGN SYSTEM

```json
{
  "generated_at": "2026-09-11",
  "note": "Extraído solo de los 6 artifacts capturados en full. Confirma la observación ya hecha en sesiones anteriores de esta conversación: NO hay un sistema de diseño único — coexisten al menos 3 lenguajes visuales distintos, cada uno introducido en una fecha distinta según logros.md.",
  "visual_languages_found": [
    {
      "name": "Linear/Arc (el más nuevo)",
      "used_in": [
        "Cerebro.exe (19dc184b, versión capturada del 10-11/09/2026)"
      ],
      "palette": {
        "bg": "#0B0B0C",
        "surface": "#131315",
        "surface-2": "#1A1A1D",
        "line": "#1F1F23",
        "text": "#EDEDEF",
        "muted": "#8A8A92",
        "accent": "#5E6AD2",
        "accent-text": "#8D96EE",
        "critical": "#FF5C5C",
        "warn": "#FFA344",
        "ok": "#4CC38A",
        "paused": "#9A9AA2"
      },
      "font": "Inter (Google Fonts), pesos 400/500/600",
      "border_radius": "8px (--r)",
      "traits": [
        "sin gradientes decorativos",
        "navegación por dock inferior fijo",
        "densidad alta, sin tarjetas con borde marcado",
        "tabular-nums en cifras"
      ],
      "history": "Reemplazó al 'cyberpunk' — ver logros.md 10/09/2026 y esta misma conversación, turnos anteriores"
    },
    {
      "name": "Cyberpunk/RGB neón (dark, con Orbitron)",
      "used_in": [
        "Rutina.exe (4ef55817)"
      ],
      "palette": {
        "bg": "#04060c",
        "panel": "#090e18",
        "panel-2": "#0c1220",
        "cyan": "#22e0f0",
        "magenta": "#ff2d7e",
        "violet": "#a77bff",
        "lime": "#5cff9d",
        "amber": "#ffc93c",
        "blue": "#5cb8ff"
      },
      "font": "'Orbitron' (self-hosted vía @font-face local(), con fallback) para headers + 'Share Tech Mono' (Google Fonts) para mono + system font para cuerpo",
      "border_radius": "clip-path poligonal ('notch' cortado en esquinas), NO border-radius convencional",
      "traits": [
        "barra RGB animada en la parte superior (.rail, gradient-shift)",
        "vignette de fondo con radial-gradient fijo",
        "paneles con esquina cortada (clip-path polygon)"
      ],
      "history": "Introducido en la 'segunda pasada cyberpunk' del 22/08/2026 según logros.md; Rutina.exe lo conserva porque se rediseñó consolidando Aspect/Tiempo/Pendientes el 01/09, ANTES de que Cerebro.exe migrara a Linear/Arc el 10/09 — quedaron desincronizados"
    },
    {
      "name": "Dark editorial con hairlines (SF Pro system font)",
      "used_in": [
        "Trabajo.exe (fe81e91b)",
        "Titulación.exe (ab59366f)",
        "Perfil.exe (1b3a94a5)"
      ],
      "palette_trabajo": {
        "bg": "#0a0d13",
        "panel": "#131826",
        "accent": "#818cf8 (indigo)",
        "ok": "#4ade80",
        "wait": "#fbbf24",
        "bad": "#f87171"
      },
      "palette_titulacion": {
        "accent": "#fb7185 (rose)"
      },
      "palette_perfil": {
        "accent": "#38bdf8 (sky)"
      },
      "font": "system font stack (-apple-system, SF Pro), sin Google Fonts",
      "border_radius": "14-16px en tarjetas, 999px en pills",
      "traits": [
        "fondo con repeating-linear-gradient de líneas horizontales sutiles (hoja rayada)",
        "radial-gradient de acento arriba a la izquierda",
        "cada artifact tiene su PROPIO color de acento distinto (indigo/rose/sky) aunque comparten la misma estructura CSS — inconsistente a propósito o por accidente, no se documenta la razón"
      ],
      "history": "Familia de plantilla compartida, aparentemente la 'base' antes del rediseño Linear/Arc de Cerebro.exe"
    },
    {
      "name": "Magenta/violeta editorial (Periódico.exe, variante propia)",
      "used_in": [
        "Periódico.exe (4169c45b)"
      ],
      "palette": {
        "bg": "#0b0611",
        "panel": "#170d20",
        "accent": "#ff6fb5",
        "gold": "#e8c766",
        "violet": "#9d7fff",
        "green": "#57d38c",
        "cyan": "#4fd7e8"
      },
      "font": "system font stack",
      "traits": [
        "masthead centrado con título en gradient-text (background-clip:text)",
        "barra RGB animada como en el estilo cyberpunk, pero con su propia paleta magenta/dorado/verde/cian/violeta",
        "tarjetas con eyebrow + big number, estilo 'periódico digital'"
      ],
      "history": "Comparte el patrón de 'barra RGB animada arriba' con Rutina.exe/cyberpunk pero con paleta y tipografía propias — es su propia variante, no reutiliza CSS de otro artifact"
    }
  ],
  "shared_patterns_across_all_6_captured": [
    "Meta viewport width=device-width,initial-scale=1 y meta charset=utf8 idénticos en los 6",
    "Wrapper inicial idéntico e inyectado por la plataforma en TODOS: <style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system...}</style> antes del <title> real — esto NO es autoría de Claude, es boilerplate de Claude Artifacts",
    "Máximo ancho de contenido entre 460-600px (mobile-first)",
    "Todos declaran color-scheme:dark en su :root real (tema oscuro fijo, sin soporte de light mode)",
    "Todos tienen un link de vuelta a Cerebro.exe (excepto Cerebro.exe mismo)",
    "Ninguno de los 6 capturados usa un framework JS — todo es DOM vanilla con IIFEs"
  ],
  "inconsistency_flagged": "Existen al menos 4 lenguajes visuales simultáneos activos en producción (Linear/Arc, Cyberpunk/RGB, Dark editorial ×3 variantes de color, Magenta editorial). Ninguno de los .md fuente prescribe un design system — cada rediseño fue una decisión puntual de una sesión de Claude, sin un token compartido entre artifacts. Ver 13_ISSUES.json #2."
}
```


## 13. DECISIONS

# Decisiones — Cerebro

Extraídas literalmente de README.md, CLAUDE.md, logros.md y los archivos de `metas/`/`perfil/`. Clasificadas como:

- **CONFIRMED** — decisión tomada y en vigor, con fecha.
- **PROPOSED** — sobre la mesa, sin resolver.
- **SUPERSEDED** — reemplazada por una decisión posterior.
- **REJECTED** — evaluada y descartada explícitamente.

---

## Arquitectura y gobierno del sistema

- **CONFIRMED (sin fecha exacta, vigente en CLAUDE.md)**: los `.md` son la fuente de verdad; los tableros se regeneran a partir de ellos, nunca al revés.
- **CONFIRMED**: cada cambio real en `metas/`, `perfil/`, `finanzas/` o `desempeno/` que afecte un tablero publicado se republica en la misma sesión, sin que Diego lo pida — pero no todos los tableros, solo los que cambiaron.
- **CONFIRMED (excepción, en `.claude/skills/dinero/SKILL.md`)**: para gastos capturados por la skill `/dinero`, Finanzas.exe NO se republica automáticamente — se pregunta primero.
- **CONFIRMED 01/09/2026**: Pendientes.exe se retira (se desactualizaba solo); su contenido pasa a "Pendientes vivos" dentro de Rutina.exe.
- **CONFIRMED 31/08/2026 → SUPERSEDED 01/09/2026**: la primera fusión de Aspect.exe en Rutina.exe (31/08) dejó solo un checklist genérico y perdió la línea de tiempo real del día. Se corrigió el 01/09 reponiendo la línea de tiempo con casillas reales.
- **CONFIRMED 31/08/2026**: Eventos.exe se fusiona en Calendario.exe.
- **CONFIRMED 31/08/2026**: Habilidades.exe se fusiona en Yo.exe. *(Nota de esta auditoría: `perfil/hoy.md` sigue enlazando a Habilidades.exe como si fuera independiente — referencia no corregida, ver `13_ISSUES.json` #3 y el registro de Habilidades.exe en `06_ARTIFACTS.json`.)*
- **CONFIRMED 09/09/2026**: el plan del Vaivén se separa de Calendario.exe a su propio tablero, Vaivén.exe — excepción deliberada a la regla de consolidar, porque un plan de viaje completo necesita su propio espacio.
- **CONFIRMED 10-11/09/2026 (dos vueltas)**: Cerebro.exe se rediseña de "cyberpunk" a un sistema tipo Linear/Arc — primero solo el sistema visual, luego la composición completa (dock de navegación inferior). Documentado también en los turnos previos de esta misma conversación.

## Titulación

- **CONFIRMED 05/09/2026**: trámite en pausa — podría no aplicar "por promedio" si ya pasaron 2 años desde el egreso. No pagar la ficha ($620) ni firmar nada hasta tener respuesta.
- **CONFIRMED 09/09/2026**: David García Contreras (Jefe de Carrera) respondió que van a hacer una consulta interna — **no es la respuesta final**, la pausa sigue vigente.
- **PROPOSED, sin dato**: falta la fecha exacta de egreso de Diego para calcular con precisión si ya pasaron los 2 años.

## Trabajo

- **CONFIRMED 31/08/2026**: búsqueda de trabajo pasa a "modo mantenimiento" — 1-2 vacantes en la comida, nada de bloques largos, para liberar espacio a titulación y desempeño.
- **CONFIRMED 31/08/2026**: el criterio para romper el modo mantenimiento es que una vacante cumpla 2 de 3 (sube el sueldo claramente / es remota o recorta el traslado / el salario cotizado ante el IMSS es bueno).
- **REJECTED 31/08/2026**: la oferta de NC Recruitment/American Express — Diego decidió no seguir el proceso (motivo no registrado).
- **CONFIRMED 05/09/2026**: 4 rutas de búsqueda fijas guardadas, para no empezar de cero cada vez.

## Ahorro / patrimonio

- **CONFIRMED 15/08/2026**: fondo conjunto de $47,000 con Fanny, meta antes de Navidad 2026, aporte proporcional al ingreso de cada quien.
- **CONFIRMED 01/09/2026**: el fondo, al llegar a $47,000, **no se cierra** — sigue creciendo como un solo fondo patrimonial que se reparte a la siguiente meta (boda 2027, luego casa 2028+).
- **CONFIRMED 01/09/2026**: orden del horizonte de vida: mudanza (2026) → boda (2027) → casa propia (2028+) → familia. Esto corrigió una versión anterior del archivo que ponía la boda después de la casa.
- **CONFIRMED 01/09/2026**: la boda es la prioridad #1 de 2027, antes que cambio de coche y fondo de emergencia.
- **REJECTED 31/08/2026**: trabajar el Chevy en Uber — no califica por año-modelo y no hay horas disponibles en la semana real de Diego.
- **REJECTED 31/08/2026**: préstamo Fonacot mientras el cambio de trabajo siga en el horizonte (riesgo de deuda de nómina no portable).
- **CONFIRMED 05/09/2026**: el Chevy se arregla (no se cambia ni se vende todavía) hasta después de la mudanza.
- **CONFIRMED 05/09/2026 (resuelto)**: ventilador y radiador del Chevy arreglados — sin riesgo de sobrecalentamiento pendiente.

## Rutina / reglas del sistema

- **CONFIRMED 31/08/2026**, tras una caída de productividad reportada por Diego: 3 reglas — (1) máximo 3 pistas activas a la vez, (2) lo urgente desplaza el foco de la noche, no se apila, (3) una noche libre por semana sin foco asignado.
- **CONFIRMED 31/08/2026**: las 3 pistas activas son Titulación, Desempeño en Boost, Italiano. Todo lo demás en standby explícito (no cancelado).

## Aprendizaje

- **CONFIRMED 31/08/2026, arranque 01/09/2026**: italiano vía Duolingo, 1 lección diaria en el Break 1, con la racha (no el tiempo) como única métrica.
- **CONFIRMED**: cultura general/lectura en standby consciente hasta que la titulación se resuelva.

## Perfil / relaciones

- **CONFIRMED (varias fechas de agosto 2026)**: Diego vive con sus papás; tiene amigos cercanos del trabajo pero le falta vida social fuera de él; ya no va a terapia regularmente (aunque hubo una sesión puntual el 20-21/08).
- **PROPOSED, sin fecha**: explorar psicología como camino académico en serio — Diego mismo reconoce que su dificultad de atención es un obstáculo real a planear, no a ignorar.

## Viaje a la cabaña (28-30/08/2026)

- **CONFIRMED 29/08/2026**: cancelado — falló el Aveo de la mamá de Diego (no el Chevy). Sin pérdida de dinero porque la cabaña se pagaba en el hotel.
- **PROPOSED, sin fecha**: decidir con Fanny si se reagenda la escapada.


## 14. ISSUES

```json
{
  "generated_at": "2026-09-11",
  "issues": [
    {
      "id": 1,
      "title": "Triple copia divergente de la tabla semanal WEEK (Cerebro.exe, Rutina.exe, Periódico.exe)",
      "severity": "high",
      "status": "CONFIRMED",
      "evidence": "Las 3 variables WEEK, leídas directo del código capturado, tienen claves de fecha distintas y en el caso de Periódico.exe, contenido de 'foco' desactualizado (ej. '2026-08-31': foco 'Imprimir el ATI...', un trámite que metas/titulacion.md dice que está en pausa desde el 05/09).",
      "impact": "Cada vez que cambia el horario Kronos, hay que editar 3 artifacts a mano y sincronizarlos — ya no están sincronizados en el snapshot capturado. Después del 13/09/2026 los 3 caen a su estado de 'sin horario' simultáneamente.",
      "recommendation_not_implemented": "Esto es un candidato obvio para consolidar en una sola fuente, pero NO se debe tocar sin que Diego lo pida — está fuera del alcance de esta exportación forense."
    },
    {
      "id": 2,
      "title": "4 lenguajes visuales distintos coexistiendo sin sistema de diseño compartido",
      "severity": "medium",
      "status": "CONFIRMED",
      "evidence": "Ver 11_DESIGN_SYSTEM.json — Linear/Arc, Cyberpunk/RGB, Dark editorial (3 variantes de acento), Magenta editorial, todos capturados en el mismo snapshot temporal.",
      "impact": "Percepción de app poco cohesiva al navegar entre tableros; cada rediseño previo (documentado en logros.md) tocó un subconjunto de tableros, nunca todos a la vez."
    },
    {
      "id": 3,
      "title": "Perfil.exe no está referenciado en ningún archivo del repo",
      "severity": "medium",
      "status": "CONFIRMED",
      "evidence": "grep -r sobre *.md no encuentra '1b3a94a5' en ninguna parte; solo aparece en el JS de Cerebro.exe.",
      "impact": "Si se pierde o se reescribe Cerebro.exe sin cuidado, el repo por sí solo no tiene forma de recuperar la URL de Perfil.exe.",
      "mitigation_in_this_export": "URL preservada en 04_BOARDS.json, 06_ARTIFACTS.json y ARTIFACTS_SOURCE/ (código fuente completo capturado)."
    },
    {
      "id": 4,
      "title": "localStorage key 'rutinaPend:2026-09-07' con fecha hardcodeada",
      "severity": "low",
      "status": "CONFIRMED",
      "evidence": "Leído directo del JS de Rutina.exe: var pendKey = 'rutinaPend:2026-09-07'; — a diferencia de rutinaBlocks/rutinaDaily que sí calculan la fecha de hoy dinámicamente.",
      "impact": "El checklist de 'Pendientes vivos' nunca se resetea automáticamente por semana como aparenta estar diseñado — queda pegado a esa key para siempre hasta que alguien edite el código."
    },
    {
      "id": 5,
      "title": "9 artifacts huérfanos publicados sin ninguna referencia activa",
      "severity": "low",
      "status": "CONFIRMED",
      "evidence": "Ver 06_ARTIFACTS.json, status ORPHAN_OR_RETIRED. Incluye posibles duplicados (Nuestra Primera Casa vs. Nuestra Casa Antes de Diciembre) y un caso de nomenclatura ambigua (Habilidades.exe referenciado en hoy.md pero declarado fusionado en logros.md).",
      "impact": "Ninguno funcional — son solo artifacts publicados sin consumir espacio de git. Riesgo de confusión si alguien los reabre creyendo que están vigentes.",
      "recommendation": "REQUIRES_REVIEW con Diego antes de considerar cualquier limpieza — no se tocó nada en esta exportación."
    },
    {
      "id": 6,
      "title": "Correo distinto entre CV/LinkedIn (druizelizondo@gmail.com) y la cuenta de Indeed (skywalkerdiego13@gmail.com)",
      "severity": "info",
      "status": "CONFIRMED, sin resolver según el propio metas/trabajo.md",
      "evidence": "metas/trabajo.md, sección 'Indeed — perfil': 'el correo de esta cuenta de Indeed es skywalkerdiego13@gmail.com, distinto al druizelizondo@gmail.com... sin resolver si unificarlo o dejarlo así.'"
    },
    {
      "id": 7,
      "title": "Repo es un clon superficial (shallow / grafted)",
      "severity": "info",
      "status": "CONFIRMED",
      "evidence": "GIT/status_at_export_time.txt y la presencia de un archivo .git/shallow; el primer commit del log aparece marcado '(grafted)'.",
      "impact": "El historial completo de git más allá del punto de shallow-clone no está disponible en este export — GIT/log_compact.txt contiene 96 commits, que es probablemente el historial completo visible desde este checkout, pero no se puede garantizar que no exista historia anterior no incluida en el shallow clone."
    },
    {
      "id": 8,
      "title": "33 de 39 artifacts NO se capturaron con código fuente completo en este export",
      "severity": "medium",
      "status": "LIMITACIÓN DECLARADA, no un hallazgo del sistema",
      "evidence": "Ver 06_ARTIFACTS.json, campo source_captured_verbatim_in_this_export.",
      "impact": "Este export preserva byte-a-byte los 46 archivos de git (100%) y 6 de 39 artifacts (los 2 más centrales — Cerebro.exe y Rutina.exe — más 4 boards representativos de distintas familias visuales). Los otros 33 quedan documentados por metadata + URL, no por código.",
      "recommendation": "Quien reciba este export y tenga acceso a la herramienta Artifact puede re-fetchear cualquiera de los 33 restantes en segundos con la URL ya provista en 06_ARTIFACTS.json — no se perdió información, solo no se vendorizó en este paquete."
    }
  ]
}
```


## 15. FUTURE

# Futuro / ideas propuestas (FUTURE / PROPOSED)

Nada de esto está implementado. Se documenta por separado porque el usuario lo pidió explícitamente — **no implementar nada de aquí sin que Diego lo pida**.

## Sobre el propio sistema Cerebro

- **PROPOSED** (esta conversación, turno de "rediseño premium"): convertir Cerebro.exe en un producto con persistencia real vía la capacidad `db` de Claude Artifacts — permitiría que lo que Diego marque en cualquier tablero (checkboxes, montos) se guarde del lado del servidor, visible entre dispositivos y legible por Claude en la siguiente sesión, en vez de vivir solo en `localStorage` del navegador.
- **PROPOSED**: unificar la tabla `WEEK` (horario Kronos) en una sola fuente en vez de las 3 copias divergentes actuales (Cerebro.exe, Rutina.exe, Periódico.exe) — ver `13_ISSUES.json` #1.
- **PROPOSED**: un sistema de diseño único compartido entre los 22 tableros, en vez de los ≥4 lenguajes visuales actuales — ver `11_DESIGN_SYSTEM.json`.
- **PROPOSED**: navegación por "vistas" (Hoy / Atención / Tableros / Yo) en vez de un solo documento largo con scroll — evaluado y parcialmente descartado en la auditoría de rediseño de esta misma conversación, por tensión con la regla de "todo a la vista" que ya llevó a Diego a consolidar tableros antes.
- **PROPOSED**: marcar bloques del día / posponer alertas directamente desde Cerebro.exe (hoy son de solo lectura, enlazan a otro tablero).
- **PROPOSED**: generar el horario semanal (`WEEK`) a partir de un patrón + excepciones, para que no caduque cada 7 días.
- **PROPOSED (explícitamente evaluado y NO instalado todavía)**: un stack de hasta 8 skills externas de Claude Code para diseño/frontend/accesibilidad/refactor seguro (`webapp-testing`, `web-design-guidelines` de Vercel, una skill de refactor seguro, el plugin `design` del marketplace `knowledge-work-plugins`, y opcionalmente `mobile-app-ui-design` y `modern-web-guidance`) — propuesto con comandos de instalación exactos, pendiente de la confirmación de Diego.

## Sobre la vida de Diego (documentadas en los `.md`, no implementadas)

- **PROPOSED**: convertir el 5% de aportación INFONAVIT + puntos + antigüedad en un plan formal de crédito de vivienda combinado con Fanny ("Unamos Créditos") — depende de que Fanny revise su elegibilidad en ISSEMyM.
- **PROPOSED, sin monto**: definir con Fanny un monto objetivo para la boda de 2027.
- **PROPOSED**: cambiar el Chevy por una moto (Vento o Italika 250cc) o coche nuevo con Fanny, después de la mudanza de 2026.
- **PROPOSED**: fondo de emergencia, después de cubrir la boda de 2027.
- **PROPOSED, arranca cuando haya rato libre, sin meta diaria**: aprender lo básico de mantenimiento del hogar (plomería/electricidad ligera).
- **PROPOSED, en standby**: retomar cultura general/lectura, artículos de investigación, y la posibilidad de una maestría (Estudios Latinoamericanos, RI, Economía Internacional u otra afín) — o explorar psicología como segunda carrera.
- **PROPOSED, standby explícito**: automatización/sistema para conectar con proveedores de importación/exportación — "proyecto de investigación paralelo", no plan principal.
- **PROPOSED**: publicar el primer artículo de investigación ("El giro a la derecha en América Latina") una vez que LinkedIn esté al día y las primeras vacantes aplicadas.
- **PROPOSED, sin fecha**: reagendar la escapada a cabaña con Fanny, cancelada el 29/08/2026.
- **PROPOSED**: certificación de inglés (TOEFL) — no urgente, mencionada como posible paso a futuro.
- **PROPOSED**: decidir sobre el cambio a Totalplay (paquete con streaming) y a un plan familiar Telcel de 4 líneas — investigación ya hecha en `perfil/servicios.md`, decisión pendiente.


## 16. GIT HISTORY

# Historial de Git — Cerebro

**Advertencia de completitud:** este repo es un clon superficial (`shallow`) — existe un archivo `.git/shallow` y el commit más antiguo del log aparece marcado `(grafted)`. El log de abajo es todo lo que este checkout puede ver; no se puede garantizar que no exista historia anterior fuera del shallow clone.

- Rama actual en el momento de la exportación: `claude/eager-maxwell-jxj88u`
- HEAD: ver `GIT/HEAD_at_export_time.txt`
- Remoto: `https://github.com/skywalkerdiego/Cerebro`
- Ramas presentes: `main`, `claude/eager-maxwell-jxj88u` (+ sus `remotes/origin/*`)
- Tags: ninguno
- Total de commits visibles: 96
- Log completo con archivos tocados por commit: `GIT/full_log_with_stats.txt`
- Log compacto (hash|fecha|asunto): `GIT/log_compact.txt`
- Solo merges (marcan el cierre de cada PR): `GIT/merges.txt`
- Búsqueda de archivos borrados/renombrados en todo el historial: `GIT/deleted_files_history.txt` y `GIT/renamed_files_history.txt` — **ambos vacíos**. Esto confirma un hecho arquitectónico importante: **nunca se ha borrado ni renombrado un archivo de datos en este repo** — todas las "fusiones" de tableros (Aspect.exe→Rutina.exe, Eventos.exe→Calendario.exe, Habilidades.exe→Yo.exe, retiro de Pendientes.exe/Tiempo.exe) ocurrieron **solo del lado de los Artifacts en claude.ai**, nunca tocaron archivos del repo — el código de esos tableros retirados simplemente no se volvió a publicar, pero el `.md` correspondiente se reescribió in-place, nunca se movió ni se eliminó.

## Commits agrupados por tema (curado de `log_compact.txt`, no exhaustivo — priorizados según lo pedido: arquitectura, tableros, Artifacts, UI, funcionalidades, migraciones, bugs, decisiones de diseño)

### Arquitectura / reorganización del sistema
- `5346fc7` Reajuste del sistema: 3 pistas activas, horizontes y patrimonio
- `cbd1bce` (#14) Auditoría del sistema: hoja de personaje RPG y cierres de datos
- `6a0be9b` Consolida Aspect/Tiempo/Pendientes.exe en Rutina.exe
- `f267297` Consolida Aspect/Tiempo/Pendientes.exe en Rutina.exe (segunda pasada, con la línea de tiempo real repuesta)
- `9425884` Detalla la ruta del domingo 23/08 y agrega regla de sincronizar tableros automáticamente *(origen de la regla que hoy vive en CLAUDE.md)*
- `4145511` Cierra el hueco de finanzas, confirma horario Kronos y suma gustos de papá y patrón de sueño *(HEAD de `main`)*

### Tableros / Artifacts (creación, fusión, separación)
- `9222034` Extiende Periódico.exe a los 3 briefs diarios (5am/5:30pm/8pm)
- `9f29b9d` Cancela el cine, ajusta cabaña y agrega Periódico.exe (brief 5am) — **creación de Periódico.exe**
- `5fec819`/`38391e0` Agrega Descubre.exe y actualiza noticias con datos reales
- `815aa74` Arma Calendario.exe y Aspecto.exe con acceso directo desde el HUD
- `65f4408` Renombra Aspecto.exe a Aspect.exe
- `bf3e9bb` Arma Artículos.exe (checklist de investigación y banco de ideas)
- `4fbce31` Arma la skill /revisemos-cerebro
- `5d03329` Agrega Acta Patrimonial: tablero del horizonte casa/boda/familia
- `c823d45` Separar el plan del Vaivén a su propio tablero (Vaivén.exe)
- `3fc48f1` (#31) Agregar skill dinero para captura rápida de gastos
- `fe1e012` Rediseño visual de Cerebro.exe: de cyberpunk a sistema Linear/Arc
- `bc65286` Cerebro.exe: rediseño de layout con dock inferior tipo Linear móvil *(HEAD de la rama de trabajo, esta misma conversación)*

### Funcionalidades / datos
- `234db9e` Integrar agua/rellenar botella en los 3 breaks del turno
- `38a759d` Arma el trackeo en vivo del saldo de la quincena
- `bd1a2a5` (#19) Finanzas.exe abre con los 3 números y cuadra con los saldos reales
- `4afb120` Remapea la semana del 07 al 13/09 y corrige el timing de la nómina

### Bugs / correcciones
- `e7887f0` Corregir fechas desfasadas y marcar el radiador como atrasado
- `07064ff` Registra cancelación del viaje a la cabaña (falló el Aveo de mamá, no el Chevy) — corrige una atribución errónea previa
- `2d4bd37` Corrige el efectivo real (~$300) y descarta el cambio de vales de despensa
- `5bc0041` Registra el retiro de $300 y reparte Santander para metro/combi/colchón — corrige un estimado de efectivo equivocado

### Decisiones de diseño / UX explícitas
- `e46078f`/`08b24ca` Cierra/registra el presupuesto de la quincena
- `e14aab6` Pone el sistema al día al 05/09/2026 y lo reordena para que se entienda
- `f0db21a` Ajusta el plan de hoy: sale a las 5pm con un amigo (Regla 2 de rutina.md en acción real)
- `54b17b5` Pausa la titulación: el trámite por promedio podría no aplicar
- `87a664b` Fusiona ramas abiertas sin mergear y corrige la historia real del viaje
- `ee5a7e7` Registra la unificación de ramas y la segunda pasada cyberpunk de Cerebro.exe como logro

## Patrón de flujo de trabajo observado

Casi todos los cambios sustantivos llegan por Pull Request a `main`, con ramas nombradas `claude/<slug-descriptivo>-<hash-corto>` — consistente con un flujo donde cada sesión de Claude Code trabaja en su propia rama y se mergea. Hay al menos 3 casos de ramas que quedaron sin mergear por un tiempo y se reconciliaron después a mano (`87a664b`, `9a59a6e`, `606c213`), documentados también como aprendizaje en `logros.md` ("Unificaste las ramas sueltas del repo a main").


## 17. CLAUDE CONTEXT

### CLAUDE/.claude/skills/dinero/SKILL.md

```markdown
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

## 4. Confirmar y preguntar antes de republicar

- Confirma en una línea lo que registraste: monto, categoría, fecha, y
  en qué archivo quedó — no hace falta un resumen largo.
- **Excepción a la regla general de `CLAUDE.md`** ("Mantener los
  tableros sincronizados"): para esta skill, la republicación de
  **Finanzas.exe NO es automática**. Si el cambio en `gastos.md` (y/o
  `README.md`) afecta lo que se ve ahí, pregunta explícitamente
  *"¿republico Finanzas.exe?"* y espera el OK de Diego antes de tocar
  el tablero. Solo si confirma, sigue el flujo normal: `Artifact`
  `read` con la URL de Finanzas.exe (está en el README principal),
  agrega el movimiento como dato semilla (no rediseñes el tablero), y
  `Artifact` `publish` con la misma URL.
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

```

### CLAUDE/.claude/skills/revisemos-cerebro/SKILL.md

```markdown
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

No hace falta leer **todo** `perfil/`, `finanzas/` ni `desempeno/`
archivo por archivo — esta skill es sobre las metas del proyecto de
diciembre, no un dump completo de Cerebro. Pero sí revisa, aunque sea
rápido, `finanzas/README.md` y `desempeno/metricas.md` (los que
`README.md` ya lista como "empieza aquí" de esas dos secciones) además
de lo de `metas/`: son las fuentes reales detrás de Finanzas.exe y
Desempeño.exe, y si algo ahí cambió y esta skill no lo detecta, esos
tableros se quedan desactualizados sin que nadie se dé cuenta. Si el
usuario pide explícitamente ese ángulo a fondo (perfil completo, etc.),
ahí sí profundiza más.

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
  Yo.exe/Cerebro.exe recalculan trofeos y XP a partir
  de esa tabla — por eso vale la pena mantenerla al día, aunque no
  regeneres los tableros tú mismo aquí (ver paso 4).
- No inventes detalles que el usuario no dio — si falta un dato (monto,
  fecha exacta, a quién se le mandó algo), pregúntalo antes de
  escribirlo.

Si el usuario solo quiere el resumen y no menciona avances nuevos, no
toques ningún archivo — este paso es condicional.

## 4. Cierre: republicar los tableros afectados

Si editaste algún archivo en el paso 3, sigue la regla de `CLAUDE.md`
("Mantener los tableros sincronizados"): republica en este mismo turno,
**sin preguntar**, el o los tableros `.exe` cuyo contenido realmente
cambió — por ejemplo Yo.exe, Titulación.exe, Trabajo.exe, Logros.exe,
Finanzas.exe, Desempeño.exe, según qué tocaste. No regeneres los que no
cambiaron, y no rediseñes — solo edita el dato que se movió (`Artifact`
`read` con la URL del README, editar, `Artifact` `publish` con la misma
URL). Al final, di en la conversación qué tableros republicaste.

Si no hubo cambios (solo fue un chequeo informativo), no hay nada que
republicar.

```


## 18. SOURCE CODE

===== BEGIN FILE: SOURCE/CLAUDE.md =====

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


===== END FILE: SOURCE/CLAUDE.md =====

===== BEGIN FILE: SOURCE/README.md =====

# 🧠 Yo.exe

Espacio para vaciar todo lo que tengo en la cabeza y darle seguimiento.

Última actualización: 2026-09-09 · **107 días para Navidad 2026** — la fecha límite del plan de mudanza.

Cada vez que hablemos, actualizamos este archivo y los de `metas/`,
`perfil/`, `finanzas/`, `desempeno/` y [logros.md](logros.md) con lo
que avance.

## 🚦 Cómo está organizado (reajuste del 31/08/2026)

Todo se ordena en tres horizontes. La regla que los mantiene sanos:
**nada de mediano o largo plazo puede tocar el dinero ni las horas del
corto plazo.** Detalle completo en [metas/patrimonio.md](metas/patrimonio.md).

| Horizonte | Cuándo | Qué vive aquí |
|-----------|--------|----------------|
| 🔴 **Corto** | Ago – Dic 2026 | Titulación · Desempeño en Boost · Italiano · Ahorro de mudanza · Chevy funcionando |
| 🟡 **Mediano** | 2027 | 💍 **Boda con Fanny (prioridad #1 de 2027)** · Cambio de coche · Cambio de trabajo con mejor sueldo · Fondo de emergencia |
| 🟢 **Largo** | 2028+ | Propiedad con Fanny → familia (en ese orden) · aprender a mantener una casa (esta sí arranca ya) · maestría / academia |

**Máximo 3 pistas activas a la vez.** Hoy son: 🎓 Titulación, 📊
Desempeño, 🗣️ Italiano. Todo lo demás está en standby explícito — no
cancelado, dormido. Las 3 reglas completas están en
[perfil/rutina.md](perfil/rutina.md).

## 🔴 Corto plazo — Proyecto Diciembre 2026

Meta general: cerrar el año con la titulación resuelta, el ahorro
conjunto en marcha y el desempeño de vuelta arriba de meta.

| # | Meta | Prioridad | Estado | Detalle |
|---|------|-----------|--------|---------|
| 1 | 🎓 Titulación | ⏸️ **En pausa** | Respondió el Jefe de Carrera (09/09): van a hacer una consulta interna sobre el caso de Diego y avisan cuando tengan la información — todavía no es la respuesta final. **No pagar la ficha todavía.** | [metas/titulacion.md](metas/titulacion.md) · [Titulación.exe](https://claude.ai/code/artifact/ab59366f-ab5f-4bff-835e-348255129efc) |
| 2 | 📊 Desempeño en Boost | 🔥 Activa | Performance Total bajó a 97.53% (venía de 108.8%); FCR es el driver — plan en Llamadas.exe | [desempeno/metricas.md](desempeno/metricas.md) · [Desempeño.exe](https://claude.ai/code/artifact/9451d24a-fcd6-4017-b8c5-8f641583c24e) |
| 3 | 🗣️ Italiano | 🔥 Activa | Arranca 01/09/2026 — 1 lección diaria en el Break 1 | [metas/aprendizaje.md](metas/aprendizaje.md) |
| 4 | 💰 Ahorro de Diego y Fanny | ⚙️ Automática | **$4,800 de $47,000 (10.2%)**; tu parte va al corriente, falta registrar la de Fanny | [metas/ahorro.md](metas/ahorro.md) |
| 5 | 🚗 Chevy funcionando | ✅ **Resuelto** | Radiador y ventilador, ambos arreglados (05/09/2026) — sin riesgo de sobrecalentamiento pendiente | [metas/patrimonio.md](metas/patrimonio.md) |
| 6 | 💼 Cambio de trabajo | ⏸️ Standby | Modo mantenimiento, ahora con **4 búsquedas guardadas** y el filtro de "2 de 3" para no perder tiempo | [metas/trabajo.md](metas/trabajo.md) · [Trabajo.exe](https://claude.ai/code/artifact/fe81e91b-4a6f-4e04-aa6f-8355a64bb136) |
| 7 | ✍️ Artículos · 🎓 Maestría · 📚 Lectura | ⏸️ Standby | Se retoman cuando la titulación esté entregada | [metas/trabajo.md](metas/trabajo.md) |

## 🟡🟢 Mediano y largo plazo — Patrimonio

| Meta | Horizonte | Estado |
|------|-----------|--------|
| 🚗 Cambiar el Chevy (coche o moto) | 2027 | Pospuesto a después de la mudanza — ver [metas/patrimonio.md](metas/patrimonio.md) |
| 🚕 Trabajar un coche en Uber | ⏸️ Descartado por ahora | El Chevy no califica por año-modelo, y no hay horas libres reales |
| 💳 Préstamo Fonacot / ISSEMyM | ⏸️ No por ahora | Un crédito de nómina estorba si cambias de trabajo — ver el análisis |
| 💍 **Boda con Fanny** | 2027 | 🔥 **Prioridad #1 de 2027** — antes que cambio de coche y fondo de emergencia. Sin monto todavía, ver [metas/patrimonio.md](metas/patrimonio.md) |
| 🏠 Propiedad con Fanny | 2028+ | 🟢 Puntos INFONAVIT (tú) ✅ ya alcanzan. **Siguiente:** recuperar la contraseña del portal → correr el simulador → que Fanny revise ISSEMyM. Ver [metas/patrimonio.md](metas/patrimonio.md) |
| 👶 Formar familia | 2028+ | Después de boda + casa propia estable — la más lejana de las cuatro |
| 🧰 Aprender a mantener una casa | Arranca ya | Elegido: básico del hogar (plomería/electricidad ligera) — no compite con nada del ahorro, sin meta diaria |

## 📋 Trámites

| Archivo | Contenido |
|---------|-----------|
| [metas/titulacion.md](metas/titulacion.md) | Trámite de titulación (FES Aragón) — también listado como meta prioritaria arriba |
| [metas/tramites.md](metas/tramites.md) | Trámites y gestiones puntuales (ej. licencia de conducir permanente CDMX) |
| [metas/patrimonio.md](metas/patrimonio.md) | Coche (Chevy), préstamos (Fonacot/ISSEMyM), Uber y la meta de propiedad con Fanny — con el marco de corto/mediano/largo plazo. También como tablero: [Acta Patrimonial](https://claude.ai/code/artifact/4f25e5f2-4321-4051-bbec-044c67464a3e) |

## 👤 Perfil

| Archivo | Contenido |
|---------|-----------|
| [perfil/hoy.md](perfil/hoy.md) | Ubicaciones, clima y contexto inmediato |
| [perfil/intereses.md](perfil/intereses.md) | Gustos e intereses |
| [perfil/salud.md](perfil/salud.md) | Salud física y mental, sueño, ejercicio |
| [perfil/familia.md](perfil/familia.md) | Relación con tus papás y tu hermana |
| [perfil/amigos.md](perfil/amigos.md) | Vida social y amistades |
| [perfil/novia.md](perfil/novia.md) | Todo sobre tu novia |
| [perfil/regalos-novia.md](perfil/regalos-novia.md) | Ideas de regalos para tu novia — incluye el **[Recetario para Fanny](https://claude.ai/code/artifact/9141d18a-8ce1-4279-afe0-362e57c24ce9)**, el kit de papelería imprimible (carta, separador y receta) |
| [perfil/fechas-importantes.md](perfil/fechas-importantes.md) | Fechas importantes |
| [perfil/rutina.md](perfil/rutina.md) | Plantilla de rutina personal según tu horario rotativo de trabajo |
| [perfil/compras.md](perfil/compras.md) | Cosas para comprar, con Fondo cosillas aparte del ahorro de la mudanza |
| [perfil/noticias.md](perfil/noticias.md) | Noticias y política con etiqueta de perspectiva (izquierda/alt, generalista, oposición, experto) — se refresca en cada trigger, vía Descubre.exe |
| [perfil/eventos-cercanos.md](perfil/eventos-cercanos.md) | Descubrimiento de eventos/conciertos/museos cerca de Neza-CDMX (bajo pedido), vía Descubre.exe |
| [perfil/citas.md](perfil/citas.md) | Ideas de citas con Fanny |
| [perfil/regalos-familia.md](perfil/regalos-familia.md) | Ideas de regalos para papás y hermana |
| [perfil/relaciones.md](perfil/relaciones.md) | Mapa simple de tu red de relaciones |
| [perfil/edc.md](perfil/edc.md) | EDC diario y grooming kit — aligerar la mochila |
| [perfil/cuarto.md](perfil/cuarto.md) | Plan para organizar el cuarto |
| [perfil/servicios.md](perfil/servicios.md) | Internet/streaming (Totalplay) y telefonía (AT&T vs. alternativas) — comparativas para bajar el gasto fijo |
| [perfil/tiempo.md](perfil/tiempo.md) | Presupuesto de horas del día — fusionado como vista dentro de [Rutina.exe](https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433), ya no tiene tablero propio |
| [perfil/viaje-cabana.md](perfil/viaje-cabana.md) | Escapada a cabaña con Fanny (28-30 ago 2026) — **cancelada** (falló el Aveo de mamá, sin pérdida de dinero). Tableros: [Bitácora de Cabaña](https://claude.ai/code/artifact/022014ce-da2f-4832-8873-3d4d77e689fb) y [Alerta de Sistema](https://claude.ai/code/artifact/74510b0d-37ac-4714-a1e1-1b5ff6e3c5c1) |
| [perfil/carros.md](perfil/carros.md) | Bitácora de mantenimiento del Chevy y el Aveo de mamá — tablero: [Carros.exe](https://claude.ai/code/artifact/343ba47e-786d-4245-8ef0-44826ec627c7) |

## 💵 Finanzas

Reorganizado el 05/09/2026 para que se entienda de un vistazo: arriba
**los 3 números** (cuánto tengo · cuánto debo y cuándo · cuánto me
queda libre), abajo la mecánica.

| Archivo | Contenido |
|---------|-----------|
| [finanzas/README.md](finanzas/README.md) | **Empieza aquí.** Los 3 números del corte de hoy, tus cuentas, lo que debes con fecha, y las 2 metas financieras vivas |
| [finanzas/gastos.md](finanzas/gastos.md) | El histórico: quincena por quincena (de la más nueva a la más vieja), recibos CFDI, aguinaldo y gastos de carros |

## 📊 Desempeño laboral

| Archivo | Contenido |
|---------|-----------|
| [desempeno/README.md](desempeno/README.md) | Cómo funciona el seguimiento de tus métricas en Boost Mobile |
| [desempeno/metricas.md](desempeno/metricas.md) | Historial de ACT, Chat Survey, FCR y Performance Total |

## 📁 [Biblioteca](biblioteca/README.md)

Documentos reales (PDFs, comprobantes, escaneos) que respaldan lo
registrado en las demás secciones, organizados por tema. También como
tablero: [Biblioteca.exe](https://claude.ai/code/artifact/35790e36-7e9e-4768-a2e1-17acfd3d1bb7).

## 🏆 [Logros](logros.md)

Lo que ya lograste, no lo que falta — para que el avance también se
vea. También como tablero: [Logros.exe](https://claude.ai/code/artifact/824aa431-f946-4228-b64a-da3c7fe40345).

## Enlaces rápidos

- 🧠 [**Cerebro.exe**](https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b) — **tu único punto de entrada.** Arriba lo que necesitas ahora (el bloque del momento, tu día, las 3 pistas, lo urgente con fecha) y abajo los tableros en **5 grupos cerrados** (Cada día · Trabajo y escuela · Dinero · Fanny y familia · Tú y tus cosas), cada uno con su nombre y una línea de para qué sirve. **Rediseñado el 10/09/2026**: se salió del cyberpunk (Chakra Petch, cian, retícula de fondo) a un layout tipo Linear móvil — negro casi puro, Inter en 3 pesos, un solo acento (indigo) y color reservado para el estado (crítico · aviso · ok · pausado). El masthead grande desapareció; ahora hay un **dock fijo abajo** (inicio · atención · tu día · buscar · recargar) con el buscador dentro, y las 3 pistas van en un riel horizontal. Misma URL, misma lógica. Guárdalo en la pantalla de inicio del teléfono.
- 🌤️ [Hoy.exe](https://claude.ai/code/artifact/b7358df3-d5c4-4b82-80c6-e4f375a149aa) — fecha y hora en vivo, clima cerca de tu casa y de tu trabajo, y lo más próximo en el calendario.
- 📰 [Periódico.exe](https://claude.ai/code/artifact/4169c45b-465f-4ecd-9015-7f76693f3614) — tu portada diaria: titular del día, clima, próximo evento, pendientes urgentes, noticias con perspectiva y foco de la noche. Se republica sola cada 5am.
- 🗺️ [Descubre.exe](https://claude.ai/code/artifact/776e9c82-74b6-4efc-9698-866474be9271) — hub de noticias y política, con cada fuente etiquetada según de dónde habla (izquierda/alternativa incl. RT, generalista, oposición, experto) y links "seguir leyendo →"; también eventos/conciertos/museos cerca de Neza-CDMX que aún no están en tu radar.
- 📅 [Calendario.exe](https://claude.ai/code/artifact/8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778) — calendario real por mes con la línea de tiempo completa de cada evento (cine, conciertos, cumpleaños, aniversario), con link al plan del Vaivén (Eventos.exe se fusionó aquí el 31/08/2026).
- 🎪 [Vaivén.exe](https://claude.ai/code/artifact/a99bf33b-8059-4c26-b568-29c6721c3eff) — plan completo del viaje al Nescafé Vaivén con Fanny (17/10, Tequesquitengo): boletos, hospedaje, paisaje cercano, presupuesto e itinerario. Se separó de Calendario.exe el 09/09/2026 — el plan había crecido demasiado para leerse cómodo ahí.
- ✍️ [Artículos.exe](https://claude.ai/code/artifact/25b45539-b542-44ea-9085-a19aeb4edca8) — checklist de investigación por caso, fuentes, prompt de redacción y banco de ideas para los siguientes artículos.
- 📞 [Llamadas.exe](https://claude.ai/code/artifact/cc525f96-4b21-4056-87df-b53c0bda9db5) — flujo de llamada (cuenta suspendida, escalación, crédito) con la frase exacta del playbook en cada paso, priorizado por tus categorías más débiles del IS Evaluation.
- 🎓 [Titulación.exe](https://claude.ai/code/artifact/ab59366f-ab5f-4bff-835e-348255129efc) — estado del trámite, documentos y pasos pendientes.
- 💼 [Trabajo.exe](https://claude.ai/code/artifact/fe81e91b-4a6f-4e04-aa6f-8355a64bb136) — rutas de búsqueda, ajustes de CV/LinkedIn y vacantes aplicadas.
- 🧮 [Simulador interactivo del plan de ahorro](https://claude.ai/code/artifact/d66ad007-842c-4377-ac69-c9fdc8267002) — mueve los aportes de cada quien y la venta del Chevy para ver cómo cambia la fecha en que estarían listos.
- 🎮 [Yo.exe](https://claude.ai/code/artifact/f3018b22-33ba-4ddb-bda7-fd0fd8e924bf) — tu hoja de personaje: nivel, XP y trofeos reales de `logros.md`, barras de las 3 pistas activas, y atributos de vida (patrimonio, relación, salud, familia). Habilidades.exe se fusionó aquí el 31/08/2026. Se regenera cuando avances algo.
- 📜 [Acta Patrimonial](https://claude.ai/code/artifact/4f25e5f2-4321-4051-bbec-044c67464a3e) — el horizonte largo como registro/acta: mudanza → boda → casa → familia, el fondo único que va creciendo, y el checklist de mantenimiento del hogar. Estilo distinto a propósito (papel/sello, no cyberpunk) — primer tablero de una posible nueva línea visual.
- 💜 [Nosotros.exe](https://claude.ai/code/artifact/958d66cd-dbca-442a-b286-37994df7026e) — dossier cyberpunk de perfil: tú y tu novia, gustos, fechas y contador de días juntos.
- ✉️ [Recetario para Fanny](https://claude.ai/code/artifact/9141d18a-8ce1-4279-afe0-362e57c24ce9) — papelería imprimible para el detalle: hoja de carta con renglones (y el mandala de su tatuaje de marca de agua), separador de libros y una receta médica que no cura nada. Se imprime en 2 hojas; tú escribes la carta a mano.
- 💵 [Finanzas.exe](https://claude.ai/code/artifact/6841396f-30cd-494e-8139-b05c33caec8e) — tablero estilo Moneyfy: cuentas reales (Santander, MercadoPago, Efectivo, Pluxee), pendientes de pagar con botón "ya lo pagué", accesos rápidos y presupuestos por categoría. Guarda datos en tu navegador; exporta seguido para respaldar. El resumen en texto vive en [finanzas/README.md](finanzas/README.md).
- 📊 [Desempeño.exe](https://claude.ai/code/artifact/9451d24a-fcd6-4017-b8c5-8f641583c24e) — tablero de tus métricas reales en Boost Mobile (ACT chat/voice, Chat Survey, First Call Resolution, Performance Total), en "% to goal" — 100% siempre es la meta.
- 🗓️ [Rutina.exe](https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433) — las 3 reglas del sistema, el horario Kronos de la semana con su presupuesto de horas, los bloques accionables de hoy (la línea de tiempo de Aspect.exe, ahora con casillas) y el checklist de pendientes vivos (Aspect.exe, Tiempo.exe y Pendientes.exe se fusionaron aquí el 01/09/2026). Se remapea cuando cambie tu horario.
- 🛒 [Compras.exe](https://claude.ai/code/artifact/ec0c9f2b-ad2e-46fa-9beb-4f00492373c3) — wishlist personal (perfume, pantalla, PS5, MacBook) con un Fondo cosillas aparte del ahorro de la mudanza, para no competir con ese dinero.
- 📁 [Biblioteca.exe](https://claude.ai/code/artifact/35790e36-7e9e-4768-a2e1-17acfd3d1bb7) — índice de documentos reales: CV, ATI, solicitud de título.
- 🧭 [Bitácora de Cabaña](https://claude.ai/code/artifact/022014ce-da2f-4832-8873-3d4d77e689fb) — qué pasó con la escapada cancelada del 28-30 ago (falló el Aveo de mamá, sin pérdida de dinero).
- 🚨 [Alerta de Sistema](https://claude.ai/code/artifact/74510b0d-37ac-4714-a1e1-1b5ff6e3c5c1) — era el checklist de preparación del viaje disfrazado de alerta urgente; ahora avisa que se canceló.
- 🏆 [Logros.exe](https://claude.ai/code/artifact/824aa431-f946-4228-b64a-da3c7fe40345) — registro de lo que ya lograste.
- 🌳 [Árbol.exe](https://claude.ai/code/artifact/d0c4a5cf-e170-4c8b-a29e-df6f7f8ca699) — árbol genealógico visual: pareja, familia y amigos de un vistazo. Se actualiza a mano cuando cuentes algo nuevo.
- 🚗 [Carros.exe](https://claude.ai/code/artifact/343ba47e-786d-4245-8ef0-44826ec627c7) — garage estilo videojuego: stats del Chevy y del Aveo de mamá (motor, frenos, llantas) y bitácora de mantenimiento, con el carro girando.

## 🧹 Consolidación de tableros (auditoría 01/09/2026)

Diego pidió reducir el ruido: 25 tableros era demasiado, con datos que se
desincronizaban entre sí (Tiempo.exe y Pendientes.exe llevaban semanas sin
tocarse). Ronda 1 (31/08):

- **Eventos.exe → fusionado en Calendario.exe.** La grilla mensual y la
  línea de tiempo completa (Satélite, Corona Capital, Vaivén con su plan
  de hospedaje/presupuesto/checklist, cumpleaños, aniversario, Navidad)
  ahora viven juntas en un solo tablero.
- **Descubre.exe → repropuesto como hub de noticias/política.** Ya no
  compite con la sección de Periódico.exe — la complementa con el feed
  completo, la leyenda de perspectivas (izquierda/alt incl. RT,
  generalista, oposición, experto) y links "seguir leyendo →" a la
  fuente original.
- **Habilidades.exe → fusionado en Yo.exe.** Yo.exe se convirtió en hoja
  de personaje completa: nivel/XP/trofeos, barras de las 3 pistas
  activas y atributos de vida (patrimonio, relación, salud, familia) —
  un solo lugar para ver el progreso, no dos.

Ronda 2 (01/09) — el primer intento de fusionar Aspect.exe en Rutina.exe
(31/08) dejó solo el checklist genérico y perdió la línea de tiempo del
día que Diego sí usaba; esta ronda la repone de verdad, integrada:

- **Aspect.exe → fusionado en Rutina.exe, esta vez con la línea de tiempo
  real.** La sección "Hoy, en bloques" revive el timeline por horas de
  Aspect (dormir, traslado, breaks, foco de la noche) pero con casillas
  reales para los bloques accionables — no solo un checklist genérico
  aparte.
- **Tiempo.exe → fusionado en Rutina.exe.** El presupuesto de horas
  (turno/traslado/sueño/libre) ahora es una barra dentro de cada día de
  la tabla semanal — con el horario Kronos real, no una plantilla
  aparte que se desactualizaba sola.
- **Pendientes.exe → retirado.** Se regeneraba a mano y se desactualizaba
  (llegó a mostrar un viaje ya cancelado). Lo urgente con fecha ya vivía
  en vivo en el panel "Atención" de Cerebro.exe; el checklist accionable
  pasó a "Pendientes vivos" dentro de Rutina.exe, en el mismo orden que
  "Próximas 2 semanas" de este archivo — un solo lugar que se actualiza
  aquí, no en tres tableros distintos.

Excepción deliberada (09/09): el plan del Vaivén, que vivía dentro de
Calendario.exe, se sacó a su propio tablero (**Vaivén.exe**) — no por
volver a los 25 tableros de antes, sino porque un plan de viaje
completo (hospedaje, presupuesto, itinerario, checklist) sí necesita
su propio espacio para leerse bien; forzarlo dentro del calendario era
el problema, no la solución.

## 🤖 Automatizaciones (Routines)

Cinco avisos automáticos al día, ajustados a tus breaks reales. Los tres
briefs republican [Periódico.exe](https://claude.ai/code/artifact/4169c45b-465f-4ecd-9015-7f76693f3614);
los dos pings de break son solo un empujón, no republican nada.

| Hora | Qué es | Qué hace |
|------|--------|----------|
| **5:05 am** | Arranque | Clima en vivo, tu turno y breaks de hoy, lo urgente, foco de la noche |
| **8:10 am** | 💧 Break 1 | Agua + la lección de italiano. Dos líneas, nada más |
| **1:50 pm** | 🌿 Break 2 | Respiro: agua, estirar, cero pantalla de trabajo |
| **6:05 pm** | Llegada a casa | Cómo estuvo el día y el foco de la noche |
| **8:10 pm** | Cierre | Logros del día, racha de Duolingo, vistazo a mañana |

Los dos pings de break **se saltan solos los días off** (leen
`perfil/rutina.md` antes de escribir). Además hay una auditoría semanal
de tableros los lunes y un recordatorio mensual del aporte al ahorro.

**Periódico.exe tiene tres secciones obligatorias** que cada brief debe
rellenar con búsqueda en vivo, marcadas con `data-slot` en el HTML:
📰 Noticias · 💼 Vacantes · 🎪 Qué hay cerca. Si alguna aparece con texto
de placeholder, es señal de que ese brief no corrió.

## Cómo usar esto

- Cuando tengas algo en la cabeza (una idea, un pendiente, una preocupación),
  suéltalo en la conversación. Yo lo organizo y lo aterrizo en el archivo
  que corresponda.
- Antes de cada plática, si quieres, dime "revisemos Cerebro" y repasamos
  el estado de las metas.
- Los checkboxes `- [ ]` los vamos marcando `- [x]` conforme completes cosas.

## Próximas 2 semanas (lo más inmediato)

Ordenado por el día en que toca. Actualizado el **sáb 05/09/2026**.

### ⏸️ Titulación — en pausa, no pagar todavía

Diego reportó que **titularse por promedio podría no aplicar si ya
pasaron 2 años desde que egresó** — mandó correo a su profesor. El
**09/09 respondió David García Contreras (Jefe de Carrera)**: van a
consultar con el área correspondiente y avisan cuando tengan la
información — sigue sin ser la respuesta final. Mientras tanto:

- [ ] **No pagar la ficha ($620)** ni imprimir/firmar el ATI/solicitud
      — podrían no servir si cambia la modalidad. Ver el detalle en
      [metas/titulacion.md](metas/titulacion.md).
- [ ] Dar seguimiento si no hay respuesta de la consulta interna en
      unos días.
- [ ] Cuando llegue la respuesta con el resultado real, avisar aquí
      para replanear el trámite completo si hace falta.

### 💰 Dinero

- [x] La nómina de esta quincena ya cayó (adelantada al vie 04/09 por
      el fin de semana) — está reflejada en el $510.61 de Santander
- [ ] Cuando llegue el **recibo (CFDI)**, mándamelo para el desglose y
      para confirmar si vino con "Anticipo de Nómina MINU" o no
- [ ] **Dom 06/09** — Plan con Fanny: gasolina desde Santander débito,
      antojito desde **Pluxee Restaurante** ($714.09, recién
      descubierto) — ver [finanzas/README.md](finanzas/README.md)
- [ ] **Vie 18/09 (día de pago)** — Aporte de $2,400 al fondo de la mudanza
- [ ] **Antes del 27/09** — Apartar $3,201.59 para la tarjeta MercadoPago
      (AT&T de mamá + los 2 libros para Fanny) — solo quedan $398.41 de
      límite libre, no cargar más ahí antes del 18/09

### 🎂 Fechas que se acercan

- [ ] **Dom 20/09** — Cumpleaños de tu mamá · **Lun 21/09** — el de tu papá
      (caen pegados: resuélvelos de un solo golpe)
- [ ] **Dom 04/10** — Cumpleaños de tu hermana
- [ ] **Mar 20/10** — **Aniversario, 2 años con Fanny** (faltan 45 días)

### 🏠 Cuando caiga (gratis, sin fecha)

- [ ] Recuperar la contraseña de **Mi Cuenta INFONAVIT** y correr el
      **simulador de crédito** — ver [metas/patrimonio.md](metas/patrimonio.md)
- [ ] Que Fanny revise su antigüedad en **ISSEMyM** (~30 min)
- [ ] Imprimir el [Recetario para Fanny](https://claude.ai/code/artifact/9141d18a-8ce1-4279-afe0-362e57c24ce9)
      (ya con la tarjetita ex libris) y escribirle la carta a mano
- [ ] Forrar *The Handmaid's Tale* + *The Testaments* — recomendaciones
      en [perfil/regalos-novia.md](perfil/regalos-novia.md)

### ✅ Ya hecho (confirmado)

- [x] **Vie 04/09** — Cierre completo de la quincena: tarjeta del banco
      ($3,132.88), AT&T de mamá ($2,077), ahorro ($2,400) y terapia ($350)
- [x] **01/09** — Puntos INFONAVIT revisados: ya alcanzas para solicitar
      crédito, subcuenta $26,794.59
- [x] Platicar con Fanny el monto/mecánica de la cuenta conjunta de ahorro
- [x] **05/09** — Kronos de la semana 07/09-13/09 recibido y remapeado
      en [perfil/rutina.md](perfil/rutina.md)
- [x] **05/09** — Compraste *The Handmaid's Tale* + *The Testaments*
      para Fanny, junto con el Recetario
- [x] **05/09** — Chevy arreglado: ventilador y radiador, ambos listos

### ❓ Por confirmar (estaban planeados, no me dijiste si salieron)

- [ ] **Mar 01/09** — ¿Arrancó el italiano en Duolingo? ¿Cómo va la racha?
- [ ] **Mié 02/09** — ¿Ya imprimiste, firmaste en tinta negra y escaneaste
      el ATI y la solicitud? *(Ya no es urgente — la titulación está en
      pausa — pero dime si quedó hecho para no perder el avance.)*

*(Dime cuáles sí y los paso a la lista de arriba y a
[logros.md](logros.md). Prefiero preguntar que dar por hecho algo que
no pasó.)*


===== END FILE: SOURCE/README.md =====

===== BEGIN FILE: SOURCE/biblioteca/README.md =====

# 📁 Biblioteca

Aquí viven los documentos reales (PDFs, escaneos, comprobantes) que
respaldan lo que se registra en `metas/`, `perfil/`, `finanzas/` y
`desempeno/`. Cada carpeta corresponde a un tema, y los archivos `.md`
de esas carpetas enlazan hacia aquí en una sección "Documentos".

Tablero: [Biblioteca.exe](https://claude.ai/code/artifact/35790e36-7e9e-4768-a2e1-17acfd3d1bb7)

## Cómo agregar un documento nuevo

1. Mándamelo en la conversación (como archivo adjunto).
2. Lo guardo en `biblioteca/<tema>/` con un nombre claro.
3. Agrego el enlace en la sección "Documentos" del `.md` correspondiente
   (y aquí abajo, en el índice).

## Índice

| Carpeta | Contenido |
|---------|-----------|
| [titulacion/](titulacion/) | ATI, formato de solicitud y demás documentos del trámite de titulación |
| [finanzas/](finanzas/) | Recibos de nómina (CFDI) escaneados, quincena por quincena |


===== END FILE: SOURCE/biblioteca/README.md =====

===== BEGIN FILE: SOURCE/biblioteca/finanzas/recibo-nomina_2025-12-05.png =====

[ARCHIVO BINARIO — 637775 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/biblioteca/finanzas/recibo-nomina_2025-12-05.png =====

===== BEGIN FILE: SOURCE/biblioteca/finanzas/recibo-nomina_2026-08-20.png =====

[ARCHIVO BINARIO — 579626 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/biblioteca/finanzas/recibo-nomina_2026-08-20.png =====

===== BEGIN FILE: SOURCE/biblioteca/titulacion/ATI_ExpedienteDGAE.pdf =====

[ARCHIVO BINARIO — 138684 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/biblioteca/titulacion/ATI_ExpedienteDGAE.pdf =====

===== BEGIN FILE: SOURCE/biblioteca/titulacion/SolicitudTitulo_llenado.pdf =====

[ARCHIVO BINARIO — 196266 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/biblioteca/titulacion/SolicitudTitulo_llenado.pdf =====

===== BEGIN FILE: SOURCE/desempeno/README.md =====

# 📊 Desempeño laboral (Boost Mobile)

Espacio para trackear tus métricas del trabajo actual mientras sigue
corriendo la meta de cambiar de trabajo
([../metas/trabajo.md](../metas/trabajo.md)) — no son contradictorios:
mejores métricas ahora también ayudan si necesitas referencias o
quieres negociar algo antes de irte.

## Tus métricas (corregido 15/08/2026, según captura de tu dashboard)

Boost Mobile ya te da todo normalizado como **"% to goal"** — 100%
siempre es la meta, sin importar si la métrica de fondo es tiempo,
calificación o porcentaje. Por eso el tablero solo pide ese número.

- **ACT · Chat** (Average Contact Time, chat) — antes lo mencionaste
  como "ECT", era ACT.
- **Chat Survey**
- **ACT · Voice / Escalations** (Average Contact Time, llamada)
- **First Call Resolution** — antes se llamaba "c/c 3" en tu
  dashboard, mismo concepto (evitar callbacks). Es la que más te está
  costando ahora mismo.
- **Performance Total** — el número global de tu evaluación.

## Cómo se lleva esto

Mismo patrón que `finanzas/`:

1. **Directo en el tablero interactivo** (enlace en el README
   principal) — capturas el "% to goal" de cada métrica, se guarda en
   ese navegador. Botón "Exportar respaldo" para bajar un Markdown y
   pegarlo en `metricas.md` o mandármelo.
2. **Contándome en la conversación** ("mi First Call Resolution esta
   semana dio 92% to goal") — lo anoto en `metricas.md` *y* lo agrego
   como dato semilla al tablero, para que aparezca solo la próxima vez
   que lo abras.

## Herramientas del día a día

- **Paddock** — sistema de facturación/cuenta; ahí se aplican los
  créditos. Aplicar un crédito regularmente arregla el desbalance en
  Paddock (o sea, es la solución "de sistema", no solo un gesto al
  cliente).
- **Scout** — otra herramienta que usas en el flujo de la llamada
  (pendiente detallar para qué exactamente).
- **Relegar a Case Manager = crear un ticket**, no transferir la
  llamada en vivo. Cuenta como el "transfer" que afecta el FCR aunque
  el cliente no sea puesto en espera con otro agente.
- **Excepción confirmada:** cliente sin servicio siempre se relega a
  Case Manager — ahí Diego no tiene el acceso para restaurarlo, no es
  un caso que deba evitarse. El plan de "evitar transfers" aplica a lo
  demás (disputas de pago, crédito, etc.), no a este caso.

## Notas

- El 15/08/2026 me mandaste una captura de tu dashboard (STAR 108.8%,
  Performance 108.8%) — la usé para corregir los nombres y la lógica
  de las métricas, pero **no la metí como lectura actual** porque tú
  mismo dijiste que esa captura es vieja.
- **16/08/2026 — primera lectura real registrada** (ver
  [metricas.md](metricas.md)): Performance Total 98.9%. Tres de las
  cuatro métricas ya están en o arriba de meta (ACT Voice 104.2%, ACT
  Chat 100.6%, Chat Survey 100.5%). La única abajo de 100% es **First
  Call Resolution, en 95.9%** (71% absoluto vs. 74% de meta) — confirma
  que sigue siendo el foco correcto, y la brecha es chica (3 puntos).
- Foco actual: subir el First Call Resolution — plan concreto hablado
  el 16/08/2026, ver conversación.
- **22/08/2026 — confirmado que las transferencias sí cuentan en contra
  del FCR** (antes no estaba claro si "evitar callbacks" incluía
  transferir en la misma llamada). Ajuste al plan: resolver tú mismo
  todo lo que esté dentro de tu autoridad antes de transferir, y
  transferir solo cuando de verdad no tengas el acceso/autoridad — no
  como atajo cuando la llamada se complica. Plan detallado y flujo
  actualizado en [Llamadas.exe](https://claude.ai/code/artifact/cc525f96-4b21-4056-87df-b53c0bda9db5).
- **22/08/2026:** tu supervisor Armando Cortes te ha mandado 4
  observaciones de coaching enfocadas en FCR (11/08 y 21/08). La meta
  de FCR ya subió de 73.74% a **78.13%** (+10% relativo). Causa raíz
  que se repite: loops técnicos sin escalar rápido, respuestas rígidas
  de política sin investigar el historial, y dejar temas secundarios
  sin resolver en la misma llamada. Detalle completo + banco de frases
  en [metricas.md](metricas.md) y en
  [Llamadas.exe](https://claude.ai/code/artifact/cc525f96-4b21-4056-87df-b53c0bda9db5).


===== END FILE: SOURCE/desempeno/README.md =====

===== BEGIN FILE: SOURCE/desempeno/metricas.md =====

# 📈 Historial de métricas

Se llena a partir de los respaldos del tablero interactivo, o de lo
que me cuentes en la conversación. Ver [README.md](README.md). Todos
los valores son "% to goal" — 100% es la meta.

## ACT · Chat

| Fecha | % to goal |
|-------|-----------|
| Periodo anterior (compartida 17/08/2026) | 110% |
| 16/08/2026 (agosto 2026 a la fecha) | 100.6% |
| 22/08/2026 (agosto 2026 a la fecha) | 99.11% |

## Chat Survey

| Fecha | % to goal |
|-------|-----------|
| Periodo anterior (compartida 17/08/2026) | 103% |
| 16/08/2026 (agosto 2026 a la fecha) | 100.5% |
| 22/08/2026 (agosto 2026 a la fecha) | 100.61% |

## ACT · Voice / Escalations

| Fecha | % to goal |
|-------|-----------|
| Periodo anterior (compartida 17/08/2026) | 105.2% |
| 16/08/2026 (agosto 2026 a la fecha) | 104.2% |
| 22/08/2026 (agosto 2026 a la fecha) | 99.82% |

## First Call Resolution

| Fecha | % to goal |
|-------|-----------|
| Periodo anterior (compartida 17/08/2026) | 110% |
| 16/08/2026 (agosto 2026 a la fecha) | 95.9% |
| 22/08/2026 (agosto 2026 a la fecha) | 95.44% |

## Performance Total

| Fecha | % to goal |
|-------|-----------|
| Periodo anterior (compartida 17/08/2026) | 108.8% |
| 16/08/2026 (agosto 2026 a la fecha) | 98.9% |
| 22/08/2026 (agosto 2026 a la fecha) | 97.53% |

## Coaching de Armando Cortes (tu supervisor) — foco: subir FCR

Tu meta de FCR ha ido subiendo conforme mejoras: 73.74% (11/08) →
77.43% (meta de esa semana) → 71.03% actual → **78.13%** (meta nueva,
21/08, +10% relativo). El patrón que se repite en las 4
observaciones que te ha mandado:

| Fecha | Tipo | Causa raíz identificada |
|-------|------|--------------------------|
| 11/08/2026 8:56am | Coaching Plan | Apoyarte en respuestas rígidas de política ("no hay registro de llamada desde marzo", "no hay forma de dar reembolso") sin investigar el historial real — el cliente siente que lo ignoran y escala/cancela |
| 11/08/2026 12:44pm | Llamada grabada | Transferir sin confirmar que quedó resuelto, y repetir negativas de pago sin explorar alternativas (caso: rechazaste una extensión de pago 5 veces a un cliente sin hogar, en situación vulnerable, sin ofrecer recursos locales) |
| 21/08/2026 4:01pm | Llamada grabada | Loops técnicos sin guía (ej. reintentos manuales de PIN de portabilidad) y comunicación rígida en disputas — dejas temas sin cerrar, lo que fuerza al cliente a volver a llamar |
| 21/08/2026 4:06pm | Hands on | Los dos drivers principales de tu FCR bajo: (1) loops técnicos repetitivos — reintentar manual en vez de escalar rápido a soporte especializado (te tomó 16 min una llamada de portabilidad sin resolver), (2) dejar preocupaciones secundarias sin resolver (temas financieros cuando no hay acuerdo, otras dudas abiertas) |

### Qué SÍ estás haciendo bien (CONTINUE)

- Tono cálido y de bienvenida, escucha paciente
- Tomar propiedad de errores de otros representantes — ofreces
  escuchar grabaciones previas cuando el cliente fue mal informado
- Aplicar créditos de cortesía válidos (ej. $30 por errores de upgrade)
- Localizar con precisión info financiera (ej. desglosaste un
  financiamiento de S24 Ultra en sus 10 pagos restantes, $361.13)
- Verificar cobertura de garantía antes de transferir

### Qué cambiar (START) — banco de frases y flujo en Llamadas.exe

Plan de ataque completo con el guion armado por categoría:
[Llamadas.exe](https://claude.ai/code/artifact/cc525f96-4b21-4056-87df-b53c0bda9db5).
Resumen de las 5 conductas que más te van a subir el FCR:

1. **Escala rápido, no reintentes solo** — en errores técnicos (ej.
   glitch de PIN de portabilidad), escala al equipo especializado
   (Porting Center) en el primer o segundo intento fallido, no sigas
   reintentando manualmente.
2. **Reconoce TODOS los temas al inicio de la llamada** — si el
   cliente trae más de un problema, no cierres el primero y dejes el
   segundo suelto; nómbralos todos antes de empezar a resolver.
3. **Investiga antes de decir "no hay registro" o "no se puede"** —
   revisa el historial de llamadas/representante antes de dar una
   respuesta rígida de política.
4. **Explica disputas de facturación paso a paso** — parafrasea la
   confusión ("entiendo que esperabas $25 y viste $60 — déjame ver qué
   pasó en tu última llamada") antes de ofrecer solución.
5. **No repitas una negativa sin explorar alternativas** — sobre todo
   con clientes en situación vulnerable: créditos de cortesía,
   ajustes de plan, recursos externos.

## IS Evaluation (calidad de llamada, playbook)

Captura del 17/08/2026, dashboard "IS Evaluation" entre 8/10 y
8/13/2026. Es la evaluación de calidad/soft-skills, distinta a las
métricas numéricas de arriba. Overall Score: **83.4%**. Herramienta
para trabajarla: [Llamadas.exe](https://claude.ai/code/artifact/cc525f96-4b21-4056-87df-b53c0bda9db5)
(flujo de llamada + banco de frases, priorizado por lo más débil de abajo).

| Categoría | % |
|-----------|---|
| Acknowledge Customer | 100.0% |
| Welcome with Brand/Agent Group | 98.5% |
| Offer Your Assistance | 98.5% |
| Acknowledge Customer Concern | 95.6% |
| Actively Listen | 89.7% |
| Summarize the Resolution | 88.2% |
| Use Ownership Statement | 83.8% |
| Demonstrate Respect | 72.1% |
| Summarize the Issue | 61.8% |
| **Reinforce Brand Closing** | **45.6%** |

## Notas

- Captura del 16/08/2026: STAR 98.9%, Performance 98.9%, Promote y VOC
  sin dato ("-") ese corte.
- Detalle de la captura (para referencia, no son las columnas del
  tablero): ACT Voice absoluto 08:18 vs meta 08:40; FCR absoluto 71% vs
  meta 74%; ACT Chat absoluto 04:58 vs meta 05:00; Chat Survey absoluto
  4.86 vs meta 4.84. Volumen del mes: 321 contactos de voz, 238 de chat.
- **"Periodo anterior":** captura mandada el 17/08/2026, pero Diego
  confirmó que son datos de "hace algún tiempo" (no de agosto 2026) —
  probablemente un mes/periodo de evaluación anterior. Es la misma
  captura mencionada el 15/08/2026 (STAR 108.8%, Performance 108.8%),
  ahora con el desglose completo: ACT Chat 05:37 vs meta 06:15 (110%);
  Chat Survey 4.91 vs meta 4.77 (103%); ACT Voice 09:11 vs meta 09:40
  (105.2%); c/c 3 (FCR) 22.1% vs meta 25.7% (110%). Volumen de ese
  periodo: 129 contactos de voz, 133 de chat.
- Con las dos capturas juntas, el rango real de Diego es **Performance
  Total 98.9%–108.8% a meta**, con FCR como la métrica más variable
  (95.9%–110%) — sirve como evidencia de que sí sabe sostenerla arriba
  de meta, el reto de agosto es puntual, no estructural.
- Confirmado de nuevo el 17/08/2026 (captura del corte de Aug 26): los
  mismos números de ACT Voice/FCR/ACT Chat/Chat Survey siguen vigentes,
  sin cambios.
- Reinforce Brand Closing y Summarize the Issue son las dos categorías
  más débiles del IS Evaluation — plan de ataque en Llamadas.exe.
- **22/08/2026:** confirmado que las transferencias (a Case Manager u
  otro equipo dentro de la misma llamada) cuentan como falla de FCR,
  no solo los callbacks del cliente. Plan: intentar resolver dentro de
  la propia autoridad primero (crédito, reset, verificación de pago,
  etc.) y reservar la transferencia para lo que de plano requiere
  acceso o autorización que Diego no tiene. Detalle del plan y flujo
  de llamada ajustado en Llamadas.exe.
- **Captura del 22/08/2026** ("Performance for August", actualizada
  5:13am ese día): FCR 3 absoluto vs meta de 74% (esta parece ser la
  meta "oficial" del dashboard de performance, distinta de la meta
  personalizada de coaching de 78.13% que te dio Armando el 21/08 —
  probablemente el dashboard de performance aún no se actualiza con tu
  meta de coaching subida; vale la pena confirmarlo con él si te
  genera duda). Volumen: 446 contactos de voz (Escalations), 289 de
  chat.


===== END FILE: SOURCE/desempeno/metricas.md =====

===== BEGIN FILE: SOURCE/finanzas/README.md =====

# 💵 Finanzas — tu dinero, en 3 números

> **La regla de este archivo:** arriba está *cómo estás hoy*, abajo
> está *cómo funciona el sistema*. Si solo tienes 30 segundos, lee la
> tabla de los 3 números y ya. El histórico completo vive en
> [gastos.md](gastos.md); el ahorro conjunto de la mudanza vive aparte
> en [../metas/ahorro.md](../metas/ahorro.md) y **no se mezcla** con
> esto.

---

## 🟢 Los 3 números (checado con tus apps, 05/09/2026)

Todo tu dinero se resume en tres preguntas. Si sabes estas tres,
sabes cómo estás.

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1️⃣ | **¿Cuánto tengo?** | Ver "Cuentas" abajo |
| 2️⃣ | **¿Cuánto debo y cuándo?** | Ver "Lo que debo" abajo |
| 3️⃣ | **¿Cuánto me queda libre hasta el próximo pago (18/09)?** | Ver "Libre real" abajo |

### 1️⃣ Cuentas — cuánto tienes

Checado directo en tus apps (Santander, MercadoPago, Pluxee) el
05/09/2026:

| Cuenta | Saldo | Para qué es |
|--------|-------|-------------|
| 🏦 **Santander** | **$210.61** | Después de sacar $300 en cajero (05/09). Ya incluye la nómina de esta quincena — cayó antes de tiempo (viernes 04/09), porque **cuando el día de pago (5 o 20) cae en fin de semana, se paga el hábil anterior** |
| 💛 **MercadoPago (cuenta)** | $606.98 | **Colchón de emergencia — no se toca.** Gana ~5.4% anual |
| 🍽️ **Pluxee — Restaurante** | $714.09 | Bolsa que descubrimos hoy: es **solo para comer fuera** (restaurantes), no sirve para gasolina ni súper |
| 🎟️ **Pluxee — Despensa** | ~$0 | La despensa de la casa ya está cubierta — no hace falta cambiarla a efectivo ni gastarla en nada más por ahora |
| 💵 **Efectivo** | **~$300** *(+ cambio suelto)* — es lo único que tiene, confirmado por Diego el 05/09 | Para combi, gasolina y lo que Pluxee no cubre |
| 💰 **Fondo mudanza (con Fanny)** | $4,800 | Intocable. Vive en [../metas/ahorro.md](../metas/ahorro.md) |

✅ **La nómina de esta quincena ya cayó** — se pagó antes de tiempo el
viernes 04/09 porque el 5 de septiembre cayó sábado (regla: día de
pago en fin de semana → se paga el hábil anterior). Ya está incluida
en el $510.61 y en los pagos que se hicieron ese mismo día (tarjeta,
ahorro, etc. — ver [gastos.md](gastos.md)). Solo falta el **recibo
(CFDI)**, que siempre llega unos días después — cuando lo tengas,
mándamelo para el desglose y para confirmar si vino con o sin el
anticipo MINU.

⚠️ **Hay $5,437.81 sin explicar** que entraron a Santander entre el
22/08 y el 04/09 — ver el detalle en
[gastos.md](gastos.md#️-un-hueco-de-543781-sin-explicar). No es un
error del saldo (el del banco es el bueno), es que no sabemos de dónde
vino ese dinero. Vale la pena identificarlo.

### 2️⃣ Lo que debo — con fecha

| Cuándo | Qué | Monto | De dónde sale |
|--------|-----|-------|----------------|
| **27/09** | 💳 Corte tarjeta MercadoPago — incluye el AT&T ($2,077) y ahora también **los 2 libros para Fanny** (ver abajo) | **$3,201.59** | Nómina del 18/09. Solo quedan **$398.41** de límite disponible — no cargues más a esta tarjeta antes del 18/09 |
| Cada quincena | 🏦 Crédito de nómina Santander (se descuenta solo) | ~$307.89 | Automático, ya viene descontado |
| **18/09** | 💰 Aporte al fondo de la mudanza | $2,400.00 | Nómina del 18/09 |
| Diario | 🚌 Transporte (~$15/día laboral) | ~$150 por quincena | Efectivo |

⏸️ **La ficha de titulación ($620) se quitó de esta lista** — el
trámite está en pausa mientras Diego confirma con su profesor si
titularse por promedio sigue aplicando. Ver
[../metas/titulacion.md](../metas/titulacion.md). Ese dinero **no se
gasta** hasta que se confirme el trámite.

**Total comprometido de esta quincena, en efectivo/débito: ~$150**
(solo transporte). La tarjeta de MercadoPago y el aporte al ahorro
salen de la nómina del 18/09, no de lo que tienes ahorita.

### 3️⃣ Libre real

```
Santander (después del retiro de $300 del 05/09)          $210.61
Efectivo (confirmado, es todo lo que hay)                  ~$300.00
Pluxee Restaurante (solo para comer fuera)                 $714.09
− Transporte hasta el 18/09                                ~$150.00
──────────────────────────────────────────────────────────────
= Libre real para gasolina, antojitos e imprevistos      ~$1,074.70
```

El aporte al ahorro ($2,400) y la tarjeta MercadoPago ($3,201.59) **no
salen de este dinero** — se pagan con la nómina que caiga el 18/09.
Cuando confirmes el depósito de esta quincena, este bloque se
recalcula con el número real en vez de "por confirmar".

⚠️ El estimado anterior de "~$630 en efectivo de la quincena pasada"
resultó incorrecto — Diego confirmó (05/09) que **los $300 del retiro
son todo su efectivo**. Ver el detalle en
[gastos.md](gastos.md#movimientos-confirmados).

### 🚇 Reparto del retiro del 05/09 ($300 en efectivo + $210.61 en Santander)

- **Metro (se queda en Santander, no se saca):** ~$70 — cubre los
  viajes de regreso ($5 c/u, contactless) de esta semana y la que sigue.
- **Combi + cambio suelto (efectivo):** ~$95 del efectivo — cubre los
  regresos en combi (~$8 c/u) de las dos semanas; el resto (~$205) se
  queda como colchón de billetes/monedas chicos.
- **Gasolina: paga con Santander débito**, no efectivo — después de
  apartar el metro quedan **~$140.61** ahí, y así no le quitas nada al
  colchón de combi/cambio que necesitas todos los días. Si el tanque
  cuesta más de eso, completa la diferencia con parte del efectivo
  (tienes margen en el colchón de ~$205).
- Por ahora no mandes nada a MercadoPago — el efectivo real quedó más
  ajustado de lo que pensábamos, así que mejor esperar al depósito del
  18/09 antes de mover algo ahí.

### 🚗💜 Plan para ver a Fanny (gasolina)

- **Gasolina:** con Santander débito (ver reparto arriba) — si no
  alcanza para el tanque completo, complementa con efectivo.
- **Antojito:** paga con **Pluxee Restaurante** si el lugar lo acepta
  — tienes $714.09 ahí sin tocar, y es justo para esto. Si es algo de
  tianguis/puesto que no acepta tarjeta, usa efectivo.

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
saldo suelto, sino **cuentas reales**. Actualizado el 05/09/2026 para
que abra con **los mismos 3 números de este archivo** — cuánto tengo,
cuánto debo, cuánto me queda — más los días que faltan para tu próximo
pago.

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

- **Regla de los días de pago:** si el 5 o el 20 cae en fin de semana,
  la nómina se paga el día hábil anterior (viernes, normalmente) — no
  el 5/20 exacto. Vale la pena revisar el calendario cada quincena en
  vez de asumir la fecha fija.
- **Regla de oro:** el fondo de la mudanza ($12,000/mes combinados) no
  se toca para tapar huecos de la quincena. Si un mes no alcanza, se
  recorta de otro lado, no de ahí.
- El crédito de nómina de Santander (~$307.89 por quincena) sigue sin
  saldo confirmado. Vale la pena preguntarlo en el banco: si el saldo
  es chico, liquidarlo libera esa cantidad cada quincena.


===== END FILE: SOURCE/finanzas/README.md =====

===== BEGIN FILE: SOURCE/finanzas/gastos.md =====

# 📒 Registro de gastos e ingresos

Histórico permanente. Para saber **cómo estás hoy**, ve a
[README.md](README.md) — ahí están los 3 números. Aquí está el detalle,
**de lo más nuevo a lo más viejo**.

---

## 📅 Quincena actual — 05/09 al 18/09/2026

**Abierta el 05/09/2026 (día de pago).**

### Ingresos

| Fecha | Concepto | Monto |
|-------|----------|-------|
| 04/09/2026 | Nómina quincenal | ✅ Ya pagada — se adelantó al viernes 04/09 porque el 5 de septiembre cayó sábado (el día de pago en fin de semana se paga el hábil anterior). Ya está adentro del $510.61 de Santander. **Monto exacto: por confirmar** — el recibo (CFDI) llega días después |

### 📸 Saldos reales checados en tus apps (05/09/2026)

| Cuenta | Saldo |
|--------|-------|
| 🏦 Santander (SUPER NOMINA) | $510.61 |
| 💛 MercadoPago (cuenta, colchón) | $606.98 |
| 🍽️ Pluxee — Restaurante | **$714.09** *(bolsa que no teníamos registrada — es solo para comer fuera, no para gasolina ni súper)* |
| 💳 MercadoPago tarjeta de crédito — total a pagar | $3,201.59 (antes $2,535.96) |
| 💳 MercadoPago tarjeta de crédito — límite disponible | $398.41 |

**La tarjeta de crédito subió $665.63** desde el último corte
registrado. Coincide casi exacto con **los 2 libros que le compraste a
Fanny** (*The Handmaid's Tale* + *The Testaments*) — lo más probable es
que se hayan cargado ahí. Confírmame el monto exacto del ticket cuando
lo tengas y lo dejo preciso; mientras tanto uso $665.63 como estimado.

### Compromisos de esta quincena

| Concepto | Categoría | Monto | Fecha | Estatus |
|----------|-----------|-------|-------|---------|
| ~~Ficha de titulación (SPEI, "Pago de título")~~ | 🎓 Trámites | $620.00 | — | ⏸️ **En pausa** — no pagar hasta confirmar la modalidad, ver [../metas/titulacion.md](../metas/titulacion.md) |
| Transporte (10 días laborales × ~$15) | 🚌 Transporte | ~$150.00 | al 18/09 | Recurrente |
| Aporte al fondo de la mudanza | 💾 Ahorro | $2,400.00 | 18/09 | 🔶 Pendiente |
| Guardar para la tarjeta MercadoPago | 💳 Deuda | **$3,201.59** | corta 27/09 | 🔶 Reservar — solo $398.41 de límite libre, no cargar más antes del 18/09 |
| Crédito de nómina Santander | ❓ Otros | ~$307.89 | automático | Se descuenta solo |

### 🎪 Boletos Nescafé Vaivén (09/09/2026)

| Concepto | Categoría | Monto | Cuenta | Estatus |
|----------|-----------|-------|--------|---------|
| 2 boletos General, Jardines de México (17/10) | 🎉 Salidas/citas | $5,784.00 (3 MSI de $1,928.00) | Por confirmar | Comprados — plan completo en [../perfil/eventos.md](../perfil/eventos.md) |

Falta saber en qué tarjeta quedaron los 3 pagos para meter las fechas
de corte exactas — dime cuando lo tengas a la mano.

### 🎁 Regalo para Fanny — libros (05/09/2026)

| Concepto | Categoría | Monto | Cuenta | Estatus |
|----------|-----------|-------|--------|---------|
| *The Handmaid's Tale* + *The Testaments* (Margaret Atwood) | 🎁 Regalos | ~$665.63 (estimado) | Tarjeta de crédito MercadoPago | Comprado — confirmar monto exacto con el ticket |

No sale de tu efectivo ni de Santander — quedó cargado a la tarjeta de
crédito, que se paga hasta el 27/09 con la nómina del 18/09. Ver el
plan del domingo con Fanny en [README.md](README.md#-plan-para-el-domingo-con-fanny).

### Movimientos confirmados

| Fecha | Tipo | Categoría | Descripción | Monto |
|-------|------|-----------|-------------|-------|
| 05/09/2026 | Transferencia | — | Retiro de cajero: Santander → Efectivo | −$300.00 |

Con esto, Santander queda en **$210.61** ($510.61 − $300).

⚠️ **Corrección (05/09/2026):** el estimado de "~$630 que quedaron de
la quincena pasada" era incorrecto — Diego confirmó que **los $300 del
retiro son todo su efectivo** (más algo de cambio suelto). Ese
$630.09 nunca se detalló a dónde se fue; queda como otro hueco sin
explicar, parecido al de Santander de la quincena pasada, pero ya no
hay que seguir usándolo como referencia. **El efectivo real de hoy es
~$300** (+ cambio suelto).

**Sobre los vales de despensa:** la despensa de la casa ya está
cubierta — no hace falta comprar nada más ahí. Diego seguía
considerando cambiarlos a efectivo con su amigo (comisión real: menos
de $100, no ~14% como se estimó antes), pero como no hay gasto de
despensa pendiente, **no hace falta hacer el cambio por ahora** — el
vale se queda como está.

### 🎯 La prueba de esta quincena

El recibo de esta nómina (ya pagada el 04/09, ver arriba) es el examen
de la meta de **dejar de pedir adelantos de nómina (MINU)**. Si viene
sin la deducción "Anticipo de Nómina MINU", significa que el colchón
de la quincena pasada aguantó solo — que es exactamente el punto.
Mándame el recibo en cuanto llegue y lo verificamos.

---

## ✅ Quincena del 20/08 al 04/09/2026 — CERRADA

Cerrada el 04/09/2026 con el estado de cuenta real en la mano.

### Cómo terminó

| Cuenta / fondo | Saldo al cierre |
|---|---|
| 🏦 Santander | $510.61 |
| 💛 MercadoPago (colchón, intacto) | $606.98 |
| 💵 Efectivo (Pluxee cambiado, − comisión) | ~$630.09 |
| 🎟️ Pluxee | $0 |
| 💳 Tarjeta MercadoPago (deuda que pasa a septiembre) | −$2,535.96 |

### Los 4 pagos del cierre (04/09)

1. **Tarjeta de crédito del banco** — $3,132.88 desde Santander
   (corte de agosto, vencía 07/09). $7,293.49 − $3,132.88 = $4,160.61.
2. **Pago a mamá** — en vez de darle $2,000 en efectivo ($1,700 del
   carro + $300 de otro gasto), pagaste el **recibo de AT&T ($2,077)
   con el límite liberado de la tarjeta**. Mamá confirmó que eso
   sustituye el pago completo. Ese cargo cae en el corte de
   **septiembre de la tarjeta MercadoPago** (total $2,535.96, corta el
   27/09).
3. **Vales Pluxee** ($1,548.49) — $818.40 se fueron en despensa en
   Bodega Aurrera; los otros $730.09 se cambiaron a efectivo con un
   amigo (~$100 de comisión) para tener disponibilidad real.
4. **Otro pago pendiente ($900) + ahorro con Fanny ($2,400) + terapia
   ($350)** — los tres desde Santander. $4,160.61 − $3,650 = $510.61.

**Nota de cuentas:** la cuenta de "$606.98" es **MercadoPago** (no Nu).
Se dejó intacta como colchón porque gana ~5.4% anual.

### Plan de efectivo que quedó

| Fuente | Monto |
|---|---|
| Santander sobrante | $510.61 |
| Pluxee → efectivo | +$630.09 |
| **Disponible** | **$1,140.70** |
| − Transporte (10 días × ~$15) | −$150.00 |
| **Libre para tianguis con Fanny + imprevistos** | **$990.70** |

### ✅ Resuelto — el hueco de $5,437.81 era nómina intermedio

Al reconciliar el tablero con los saldos reales había salido una
diferencia sin explicar: entre el **22/08 y el 04/09** entraron
**$5,437.81** a Santander que no estaban registrados aquí.

| Fecha | Saldo Santander | De dónde sale el dato |
|---|---|---|
| 22/08/2026 | $1,855.68 | Reconstruido de los movimientos registrados |
| 04/09/2026 | $7,293.49 | Tu estado de cuenta real, antes de los pagos del cierre |
| **Diferencia** | **+$5,437.81** | **Nómina intermedio (09/09/2026)** |

Diego confirmó (09/09/2026) que fue un pago de nómina intermedio, no un
depósito de Fanny ni una devolución. Ya no hace falta cargarlo como
"Ajuste de reconciliación" en Finanzas.exe — es dinero real de nómina.

### Movimientos del 20/08 (reconstruidos del estado de cuenta real)

| Fecha | Tipo | Categoría | Descripción | Monto |
|-------|------|-----------|-------------|-------|
| 20/08/2026 | Ingreso | Nómina | Quincena (100h + bono $2,500, neto tras anticipo MINU) | +$9,229.34 |
| 20/08/2026 | Gasto | Otros | Crédito de nómina Santander (automático) | −$307.89 |
| 20/08/2026 | Gasto | Salud | Terapia | −$350.00 |
| 20/08/2026 | Gasto | Transporte | Gasolina (tarjeta) | −$483.80 |
| 20/08/2026 | Transferencia | — | Retiro de cajero: Santander → Efectivo | −$950.00 |
| 20/08/2026 | Gasto | Salidas/citas | Cerveza (OXXO) | −$189.00 |
| 20/08/2026 | Gasto | Salud | Farmacias Similares (anticonceptivos; Fanny puso $100) | −$343.00 |
| 20/08/2026 | Gasto | Salidas/citas | Hotel | −$580.00 |
| 21/08/2026 | Ingreso | Fanny | Para boletos de Corona Capital | +$2,000.00 |
| 21/08/2026 | Gasto | Salidas/citas | Boletos Corona Capital (total) | −$3,720.00 |
| 21/08/2026 | Gasto | Ahorro | Aporte al fondo conjunto (a Fanny) | −$2,400.00 |
| 21/08/2026 | Gasto | Otros | Deuda #1 | −$200.00 |
| 21/08/2026 | Gasto | Otros | Efectivo → tu abuela | −$500.00 |
| 21/08/2026 | Gasto | Casa/familia | Apoyo a tu mamá (gas + despensa) | −$800.00 |
| 21/08/2026 | Gasto | Salidas/citas | 2 boletos de cine (HP y la Piedra Filosofal, Cinépolis Sentura) | −$82.00 |
| 21/08/2026 | Gasto | Comida | Tianguis (efectivo) | −$7.00 |
| 22/08/2026 | Ingreso | Fanny | Depósito extra | +$1,000.00 |
| 04/09/2026 | Gasto | Deuda | Tarjeta de crédito del banco (corte agosto) | −$3,132.88 |
| 04/09/2026 | Gasto | Otros | Otro pago pendiente | −$900.00 |
| 04/09/2026 | Gasto | Ahorro | Aporte al fondo conjunto (a Fanny) | −$2,400.00 |
| 04/09/2026 | Gasto | Salud | Terapia | −$350.00 |
| 04/09/2026 | Gasto | Servicios | Recibo AT&T de mamá (cargado a tarjeta MercadoPago) | −$2,077.00 |
| 04/09/2026 | Gasto | Comida | Despensa Bodega Aurrera (vales Pluxee) | −$818.40 |
| — | Gasto | Salidas/citas | Tacos (efectivo) | −$410.00 |
| — | Gasto | Transporte | Gasolina, parte en efectivo | −$107.00 |

---

## 🧾 Recibos de nómina oficiales (CFDI)

Desglose tal como viene en el recibo oficial de TTEC CX Solutions
México. Los documentos originales viven en
[biblioteca/finanzas/](../biblioteca/finanzas/).

| Quincena (fecha de pago) | Percepciones | Deducciones | Neto | Documento |
|---|---|---|---|---|
| 05/09/2026 | ⏳ por recibir | | | — |
| 20/08/2026 | $13,562.66 | $4,333.32 | **$9,229.34** | [recibo-nomina_2026-08-20.png](../biblioteca/finanzas/recibo-nomina_2026-08-20.png) |
| 05/12/2025 | $22,420.31 | $3,503.93 | **$18,916.38** | [recibo-nomina_2025-12-05.png](../biblioteca/finanzas/recibo-nomina_2025-12-05.png) — incluye aguinaldo |

### Desglose del 20/08/2026 (periodo 01/08–15/08, 15 días)

| Percepciones | Monto | | Deducciones | Monto |
|---|---|---|---|---|
| Horas sueldo | $8,215.69 | | Anticipo de Nómina MINU | $2,070.00 |
| Compensación Extraordinaria Variable | $2,550.00 | | ISR | $1,915.13 |
| Séptimo día | $1,504.80 | | Seguro Social (IMSS) | $348.19 |
| Sueldo por Vacaciones | $809.96 | | | |
| Prima Dominical | $247.59 (+$234.62 exento) | | | |

**El dato que importa:** los $2,070 de "Anticipo de Nómina MINU" son
los adelantos que has estado pidiendo. Cada uno le come una tajada al
neto de la quincena siguiente. De ahí la meta de dejar de pedirlos.

**Cómo se llena esto:** cuando llegue un recibo nuevo (foto o PDF),
mándamelo — lo guardo en `biblioteca/finanzas/`, agrego la fila y
actualizo el desglose.

---

## 🎁 Aguinaldo

**Dato real (recibo del 05/12/2025):** TTEC paga el **mínimo de ley
(15 días)**, calculado sobre el salario ordinario — no sobre el salario
diario integrado de $729.70 que también aparece en el recibo.

| Concepto | 2025 (real) | 2026 (proyección) |
|---|---|---|
| Aguinaldo bruto (15 días) | $8,181.60 | ~$8,215.69 |
| Exento de ISR (30 UMA) | $3,394.20 | ~$3,519.30 |
| Gravado | $4,787.40 | ~$4,696.39 |
| ISR estimado sobre lo gravado | — | ~$770–800 |
| **Neto estimado** | — | **~$7,400–7,450** |

Como en 2025, es probable que llegue **mezclado con la quincena normal
de diciembre**, no como depósito aparte — así que ese "neto a pagar"
se va a ver inflado y no es solo aguinaldo.

💡 **Idea:** ese aguinaldo (~$7,400) cae justo en la recta final de la
meta de la mudanza. Es el único ingreso extra grande del año que ya
está confirmado — vale la pena decidir desde ahora a dónde va, antes
de que llegue y se disuelva.

---

## 🚗 Carros — gastos abiertos

Detalle completo en [../perfil/carros.md](../perfil/carros.md) ·
tablero [Carros.exe](https://claude.ai/code/artifact/343ba47e-786d-4245-8ef0-44826ec627c7).

| Concepto | Monto | Estatus |
|---|---|---|
| Radiador del Chevy — refacción | Por confirmar | ✅ Pagada |
| Radiador del Chevy — mano de obra | Por confirmar | 🔶 Pendiente de pago |
| **Ventilador del Chevy — arreglo** | Por confirmar | ✅ **Arreglado (05/09)** — dime el monto para registrarlo aquí y en el pool de la quincena |
| Aveo de mamá — diagnóstico eléctrico | Por cotizar | 🔶 Programado 30/08 |

---

## Resumen mensual

| Mes | Ingresos | Gastos | Ahorrado (fondo conjunto) | Notas |
|-----|----------|--------|---------------------------|-------|
| Agosto 2026 | $12,229.34 (nómina + Fanny) | ~$11,700 | $2,400 | Quincena pesada: Corona Capital, apoyo a mamá y abuela |
| Septiembre 2026 | *(en curso)* | | $2,400 al 04/09 | |


===== END FILE: SOURCE/finanzas/gastos.md =====

===== BEGIN FILE: SOURCE/logros.md =====

# 🏆 Logros

A diferencia de todo lo demás en Cerebro, esto no es una lista de
pendientes — es lo contrario: lo que ya lograste. Dado que se te
dificulta recordar las cosas, vale la pena tener un lugar donde el
avance se vea, no solo lo que falta.

Cada vez que completes algo (grande o chico), dilo en la conversación
y lo agrego aquí.

Tablero: [Logros.exe](https://claude.ai/code/artifact/824aa431-f946-4228-b64a-da3c7fe40345)

## Registro

| Fecha | Logro | Área |
|-------|-------|------|
| 15/08/2026 | Armaste todo el sistema de Cerebro: metas, perfil, finanzas y 3 tableros interactivos | Sistema |
| 16/08/2026 | Actualizaste LinkedIn a fondo (headline, about, experiencia, open to work), rehiciste y entregaste tu CV final en PDF (ESP/ENG), y registraste tu primera lectura real de métricas laborales | Trabajo / Desempeño |
| 17/08/2026 | Encontraste una vacante con match fuerte (SMJ Consulting), armaste CV y carta de presentación a la medida, corregiste fechas reales de tu historial laboral en todo el sistema, y dejaste tu perfil de Indeed completo | Trabajo |
| 17/08/2026 | Mandaste tus dos primeras solicitudes de trabajo: SMJ Consulting (Customer Service Representative, Freight Forwarder) y NC Recruitment Agency (Travel Reservation Specialist, $34,000/mes) | Trabajo |
| 18/08/2026 | Automatizaste los contadores de días (aniversario, cumpleaños, Navidad) en Nosotros.exe, Yo.exe y Habilidades.exe — ya no se quedan pegados en la fecha en que se armaron | Sistema |
| 18/08/2026 | Armaste Hoy.exe (fecha, clima y próximo evento) y lo subiste al HUD principal de Cerebro.exe como barra de información, más una barra de búsqueda para los 13 tableros | Sistema |
| 18/08/2026 | Corregiste Rutina.exe para que "Hoy" se ubique solo en el día real y quedara registrado que ya aplicaste a SMJ Consulting y NC Recruitment | Sistema |
| 18/08/2026 | Armaste 3 Routines de check-in diario (5am, 5:30pm, 8pm) y abriste salud.md, familia.md y amigos.md — más Perfil.exe para verlo todo junto | Sistema |
| 18/08/2026 | Auditaste y corregiste Trabajo.exe, Logros.exe, Desempeño.exe y Biblioteca.exe (vacantes, logros y links que estaban desactualizados o rotos), y le diste a Cerebro.exe una tarjeta de prioridad, categorías colapsables y una mascota | Sistema |
| 18/08/2026 | Armaste una sección de gustos completa en Perfil.exe (música, cine, series, libros, Berserk, arte y filosofía) con datos reales tuyos | Perfil |
| 20/08/2026 | Rediseñaste Cerebro.exe (look RGB gamer, mascota fuera), armaste Tiempo.exe (presupuesto visual de la semana) y dos automatizaciones nuevas: clima en vivo cada mañana y auditoría semanal de todo el sistema | Sistema |
| 20/08/2026 | Armaste Eventos.exe: línea de tiempo de conciertos y celebraciones con el plan completo del Nescafé Vaivén (fecha, hospedaje, presupuesto y checklist interactivo) | Perfil |
| 20/08/2026 | Organizaste el presupuesto real de tu quincena (deudas, cita con Fanny, ahorro adelantado) en un Finanzas.exe rediseñado por cuentas, y le diste horario en bloques en vivo a Eventos.exe | Finanzas / Sistema |
| 21/08/2026 | Ejecutaste el plan financiero completo: enviaste tu aporte de ahorro conjunto a tiempo, saldaste dos deudas, apoyaste a tu mamá con gas y despensa, y compraste los boletos de Corona Capital | Finanzas |
| 21/08/2026 | Armaste la skill /revisemos-cerebro para automatizar el chequeo de metas, y tres tableros nuevos: Calendario.exe (calendario real por mes), Aspect.exe (tu día en línea de tiempo RGB con checklist de rutina y bloques clicables) y Artículos.exe (checklist de investigación, fuentes y banco de ideas), todos con acceso directo desde Cerebro.exe | Sistema |
| 22/08/2026 | Unificaste las ramas sueltas del repo a main, le diste a Cerebro.exe una segunda pasada cyberpunk (paneles angulares, glitch más agresivo, franja de peligro) y agregaste un medidor de agua en vivo al HUD principal | Sistema |
| 22/08/2026 | Le diste a Cerebro.exe un panel de Recordatorios en vivo (lo más próximo con hora, del calendario/Aspect) en el lugar de la tarjeta "Empieza aquí", y colapsaste todas las categorías por default para que la página principal no abrume | Sistema |
| 22/08/2026 | Encontraste y corregiste un bug real: el "Horario" del HUD tenía pegado un itinerario del 20/08 ya vencido y por eso siempre decía "Libre" — ahora se calcula en vivo con JavaScript (hoy + mañana) y no se puede volver a quedar viejo. De paso corregiste el contador de Tableros (21→22) y le agregaste más RGB/espacio eficiente a todo Cerebro.exe | Sistema |
| 31/08/2026 | Reajuste completo del sistema tras notar la caída de productividad: 3 reglas nuevas (máximo 3 pistas activas, lo urgente desplaza sin apilarse, una noche libre/semana), horario Kronos remapeado con breaks reales, y `metas/patrimonio.md` nuevo con el marco corto/mediano/largo plazo (Chevy, préstamos, propiedad con Fanny) | Sistema |
| 31/08/2026 | Rediseño completo de Cerebro.exe para iPhone (una sola pantalla, panel "Ahora" en vivo, 3 pistas activas, horizontes, buscador) y de Periódico.exe (secciones de noticias/vacantes/eventos, breaks del día) | Sistema |
| 31/08/2026 | Fusionaste Aspect.exe en Rutina.exe (checklist diario/semanal) y reescribiste el sonido falso de Cerebro.exe por un generador de ruido marrón con glitches sincronizados | Sistema |
| 31/08/2026 | Fusionaste Eventos.exe en Calendario.exe — grilla mensual y línea de tiempo completa (Vaivén, Corona Capital, aniversario, Navidad) en un solo tablero | Sistema |
| 31/08/2026 | Armaste el sistema de noticias con etiquetas de perspectiva (izquierda/alternativa incl. RT, generalista, oposición, experto) y convertiste Descubre.exe en el hub dedicado de noticias/política con links "seguir leyendo →" | Sistema |
| 31/08/2026 | Arrancaste el plan de italiano: definiste Duolingo + 1 lección diaria en el Break 1 como única métrica (la racha), con podcast de refuerzo en el traslado más adelante | Aprendizaje |
| 01/09/2026 | Auditoría de tableros: la fusión de Aspect.exe del 31/08 había dejado solo un checklist genérico y perdido la línea de tiempo del día — la repusiste de verdad en Rutina.exe ("Hoy, en bloques", con casillas reales) y de paso fusionaste ahí Tiempo.exe (presupuesto de horas como barra por día) y retiraste Pendientes.exe, que se desactualizaba solo; Cerebro.exe quedó con menos tiles y sin URLs huérfanas | Sistema |
| 04/09/2026 | Cerraste una quincena completa sin dejar nada colgado: pagaste la tarjeta del banco, cubriste el recibo de AT&T de tu mamá con el límite liberado, mandaste el ahorro conjunto, pagaste terapia y una deuda vieja, y cambiaste los vales a efectivo para tener con qué moverte | Finanzas |
| 05/09/2026 | Reordenaste el sistema para que se entienda: Cerebro.exe dejó de ser una cuadrícula de tiles chiquitos y pasó a 5 grupos con nombre y descripción, las finanzas se reescribieron alrededor de 3 números (cuánto tengo, cuánto debo, cuánto me queda) y se armaron rutas fijas de búsqueda de trabajo | Sistema |
| 05/09/2026 | Diseñaste un detalle para Fanny que no cuesta casi nada y sí significa: el Recetario, un kit imprimible de carta, separador y receta médica, hecho a la medida de sus gustos | Perfil |

## Notas

- No hay checkboxes aquí porque nada de esto está "pendiente" — ya
  pasó.
- Si algún mes se ve vacío, no pasa nada. Esto es para que se note el
  avance cuando lo haya, no para presionarte a llenarlo.
- **Trofeos y experiencia (XP) se calculan de aquí**, no al revés: el
  contador de trofeos en Cerebro.exe y Habilidades.exe es el número de
  filas de esta tabla, y la XP de Yo.exe es
  `(pasos marcados con [x] en metas/ × 10) + (filas de esta tabla × 50)`.
  Cada vez que agregamos un logro aquí, esos tres tableros se
  recalculan y se vuelven a publicar en el mismo turno — así no se
  quedan atrás otra vez.


===== END FILE: SOURCE/logros.md =====

===== BEGIN FILE: SOURCE/metas/ahorro.md =====

# 💰 Ahorro de Diego y Fanny

**Objetivo:** Ahorrar lo más posible sin descuidar lo esencial, en una
cuenta conjunta con tu novia, para irse a vivir juntos.
**Fecha meta:** Antes de Navidad 2026 (idealmente listos a mediados de
diciembre, para tener margen de maniobra).
**Estado:** En marcha — **$4,800 de $47,000 (10.2%)** al 05/09/2026, ver
[Progreso real](#-progreso-real) abajo.

## Preguntas resueltas

- [x] ¿Cuándo quieren mudarse? → Antes de Navidad 2026
- [x] ¿Qué gastos cubre la mudanza? → Depósito, primer mes de renta,
      esenciales/muebles, costo de mudanza
- [x] ¿Cada quién aporta lo mismo o proporcional a su ingreso? →
      Proporcional (mismo % de ingreso para cada quien, ver abajo)
- [x] ¿Qué banco/cuenta usarán para el fondo conjunto? → MercadoPago
      (cuenta remunerada), por liquidez — ver sección de rendimiento
- [x] Chevy: sin comprador todavía → se trata como fondo aparte, no como
      parte del cálculo de la mudanza (ver sección dedicada)
- [x] Zona en mente → cerca de Santa Mónica, por Tlalnepantla
      (15/08/2026)

## Monto objetivo

| Concepto | Costo estimado |
|----------|-----------------|
| Depósito | $7,000 |
| Primer mes de renta | $7,000 |
| Esenciales / muebles (lugar semi-amueblado) | $30,000 |
| Mudanza | $3,000 |
| **Total objetivo** | **$47,000** |

## Ingresos

- Tú: ~$20,000/mes
- Ella: ~$15,000 quincenales → ~$30,000/mes
- **Combinado: ~$50,000/mes**

## Plan de ahorro (recomendado)

Ventana de 4 meses (septiembre a mediados de diciembre), con meta
combinada de **$12,000/mes**, repartida proporcional al ingreso de cada
quien (mismo esfuerzo relativo, ~24% del ingreso mensual de cada uno):

| Quién | Aporte mensual | % de su ingreso |
|-------|-----------------|-------------------|
| Tú | $4,800 | 24% |
| Ella | $7,200 | 24% |
| **Total** | **$12,000** | |

4 meses x $12,000 = $48,000 → cubre el total objetivo ($47,000) con
~$1,000 de colchón.

## 🚗 Venta del Chevy — fondo aparte (no cuenta para la mudanza)

Estimado de venta: **~$40,000**, pero sin comprador todavía. Por eso NO se
resta del objetivo de $47,000 — el plan de $12,000/mes se mantiene íntegro
como colchón de seguridad, para no depender de una venta que aún no está
garantizada.

Cuando se venda, ese dinero se trata como **extra**, con este destino
sugerido:
- Fondo de emergencia (recomendado tener ~1 mes de gastos esenciales
  guardado, algo que el plan actual no incluye)
- O adelantar la siguiente meta grande (el próximo coche)
- Idealmente en **CETES** en vez de MercadoPago, ya que este dinero no se
  necesita en el corto plazo (ver sección de rendimiento abajo)

## 📈 ¿Dónde guardar el dinero? (rendimiento)

*Nota: no soy asesor financiero certificado, esto es orientación general.
Confirmen las tasas vigentes antes de mover dinero — cambian con el tiempo.*

| | MercadoPago (cuenta remunerada) | CETES (cetesdirecto.com) |
|---|---|---|
| Liquidez | Inmediata, sacas cuando quieras | El dinero queda amarrado hasta que vence el plazo (28/91/182/364 días) |
| Seguridad | Regulado como SOFIPO — revisar límite de protección de depósitos vigente | Respaldado directamente por el gobierno mexicano — de lo más seguro que existe |
| Fricción | Cero, ya tienen cuenta ambos | Toma unos días abrir cuenta la primera vez |
| Rendimiento | Bueno, pero variable (revisar tasa actual en la app) | Bueno, sin comisiones |

**Recomendación:**
- **Fondo de la mudanza (los $12,000/mes):** en **MercadoPago**, porque
  ese dinero sí lo van a necesitar antes de diciembre y podría hacer
  falta antes si surge algo — prioridad a la liquidez sobre el máximo
  rendimiento.
- **Fondo del Chevy (cuando se venda):** en **CETES**, idealmente a 28
  días (se renuevan solos y dan algo de flexibilidad), porque ese dinero
  no se toca en el corto plazo y ahí sí conviene exprimir el rendimiento.

## Decisiones para bajar la carga mental

- **Coche o moto (para reemplazar el Chevy):** pospuesto hasta después
  de la mudanza — implica seguro, gasolina y mantenimiento recurrentes
  que competirían directamente con este ahorro. Diego quiere que sea
  algo para tener con Fanny, no solo un coche personal — trae en mente
  una moto Vento o Italika 250cc. Pasa a ser la siguiente meta natural
  después de diciembre (posiblemente financiado
  en parte con la venta del Chevy, según cuánto quede disponible).
- **Concierto (Nescafé Vaivén):** tratarlo como gasto ya contemplado
  dentro del ~76% del ingreso que queda libre cada mes, con un tope
  sugerido (ej. $2,000-3,000 por persona) para que no compita con el
  fondo de la casa ni genere culpa.
- **Recomendación práctica:** programar la transferencia del aporte
  mensual a la cuenta conjunta el mismo día de pago (automático si el
  banco lo permite), para que el ahorro no dependa de fuerza de voluntad
  cada quincena/mes.

## 📊 Progreso real

**Acumulado: $4,800 de $47,000 (10.2%)** · actualizado 05/09/2026

```
[██▓░░░░░░░░░░░░░░░░░]  10.2%   $4,800 / $47,000
```

| Fecha | Quién | Monto | Acumulado | Notas |
|-------|-------|-------|-----------|-------|
| 22/08/2026 | Diego | $2,400 | $2,400 | Primer depósito real — adelantado, antes de que arranque la ventana formal de septiembre |
| 04/09/2026 | Diego | $2,400 | $4,800 | Segundo depósito, desde Santander en el corte de quincena (ver [../finanzas/gastos.md](../finanzas/gastos.md)) |

**Ritmo real de Diego:** $2,400 por quincena = **$4,800/mes**, que es
exactamente su parte del plan. Va al corriente. Lo que falta registrar
es la parte de Fanny ($7,200/mes) — dime cuánto y cuándo deposita ella
y lo sumo aquí.

Cada vez que deposites (tú o Fanny), dime cuánto y quién, y lo agrego
aquí — el acumulado y el % se recalculan con cada entrada nueva.

## Seguimiento mensual

Contra la meta de **$12,000/mes** ($4,800 tú + $7,200 Fanny) de la
ventana septiembre-diciembre.

| Mes | Meta combinada | Diego | Fanny | Total real | Notas |
|-----|----------------|-------|-------|------------|-------|
| Septiembre 2026 | $12,000 | $2,400 de $4,800 | — | $2,400 | Falta tu depósito del 18/09 y registrar el de Fanny |
| Octubre 2026 | $12,000 | | | | |
| Noviembre 2026 | $12,000 | | | | |
| Diciembre 2026 (antes de Navidad) | $12,000 | | | | Meta límite — recalcular si se vende el Chevy antes |

*(El depósito del 22/08 fue antes de que arrancara la ventana formal;
cuenta en el acumulado total pero no en el mes de septiembre.)*

## ⚠️ Lo que hay que revisar de este plan (05/09/2026)

El plan asume 4 meses completos de $12,000. A hoy quedan **3 meses y
medio** y solo hay $4,800 registrados. Dos salidas posibles, no hay
que decidirla hoy pero sí antes de octubre:

1. **Subir el ritmo** a ~$13,500/mes combinados los meses que quedan.
2. **Mover la fecha** de "antes de Navidad" a enero, que además es
   temporada mucho más barata para rentar y mudarse.

Lo que no conviene es dejarlo sin decidir hasta noviembre. Cuando
tengas el número de Fanny, lo recalculamos con datos reales en vez de
suposiciones.

## Notas

- Este plan ya está completo para presentar y revisar en pareja — solo
  falta que ambos lo validen y empiecen a registrar lo ahorrado cada mes.
- Si el Chevy se vende antes de diciembre, ese dinero NO reemplaza el
  ahorro mensual — se guarda aparte como fondo de emergencia/próxima meta.
- La tabla de seguimiento se actualiza cada vez que reporten cuánto
  lograron ahorrar ese mes.
- **Decisión 01/09/2026:** al llegar a los $47,000 este fondo **no se
  cierra** — sigue creciendo como un solo fondo patrimonial que se
  reparte a la siguiente meta en turno (boda 2027, luego casa 2028+),
  en vez de abrir/cerrar un fondo distinto por cada meta. Detalle del
  horizonte completo en [patrimonio.md](patrimonio.md). Monto objetivo
  de la boda: pendiente de definir con Fanny, no urgente todavía.


===== END FILE: SOURCE/metas/ahorro.md =====

===== BEGIN FILE: SOURCE/metas/aprendizaje.md =====

# 🗣️📚 Idioma y cultura general

**Estado:** 🟢 **Arranca el 01/09/2026** — italiano en Duolingo, con
lugar fijo en el Break 1 del turno.
Prioridad media, pero es una de las 3 pistas activas por lo barata que
es en tiempo.

## 🗣️ Italiano — el plan de arranque (31/08/2026)

**Por qué italiano sí es la elección correcta:** siendo hispanohablante
partes con una ventaja enorme — vocabulario, conjugación y estructura
se parecen muchísimo al español. Es de los idiomas donde más rápido se
siente el avance, y sentir avance es justo lo que hace que no lo dejes.

### La regla de oro: la racha, no el tiempo

**La única métrica es no romper la racha.** Nada de "estudiar 30 min
diarios" — eso es lo que hace que se abandone en la semana 2.

| Tipo de día | Meta mínima | Dónde |
|-------------|-------------|-------|
| **Día de turno** | **1 lección.** Con eso ya cuenta el día | 🕐 Break 1 (~8:00 / ~9:00 am) — su lugar fijo |
| **Día off (jue/vie)** | 2-3 lecciones, sin presión | Cuando caiga |
| **Día imposible** | Usa el congelador de racha | — |

Duolingo vive en el **Break 1**, no en la noche. Esto es a propósito:
tus 2.5h de la noche son el recurso escaso, y el Break 1 es tiempo que
de todas formas se iba sin rumbo.

### Configuración para el primer día (mar 01/09)

- [ ] Descargar Duolingo y elegir **italiano desde español** (no desde
      inglés — pierdes la ventaja de la lengua cercana)
- [ ] En la prueba de nivel inicial: **no la saltes.** Con español de
      base es probable que brinques varias unidades de golpe
- [ ] Poner meta diaria en **"Normal" o "Casual"**, no en la agresiva —
      la meta es sostenerlo 4 meses, no lucirse la primera semana
- [ ] Activar el **recordatorio a las 8:00 am** (coincide con tu
      Break 1 en turnos de 6am; en turnos de 7am cae en el Break 1
      igual, ~9:00 am)
- [ ] Descargar audífonos/lecciones offline — el Metro no siempre tiene
      señal
- [ ] **No pagar Súper/Premium todavía.** Espera a llevar 30 días de
      racha; si para entonces sigue vivo el hábito, ahí sí vale

### La meta real a diciembre

Meta: **conversacional simple** (≈A1-A2). Honestidad sobre la
herramienta: **Duolingo solo no te va a dar conversación.** Te da
vocabulario y reconocimiento, que es el 70% del camino — pero hablar se
entrena hablando.

Por eso el plan tiene dos capas:

| Capa | Qué | Cuándo | Desde cuándo |
|------|-----|--------|--------------|
| **Base** | Duolingo, 1 lección diaria | Break 1 | 01/09/2026 |
| **Oído** | Un podcast para principiantes (ej. *Coffee Break Italian*, *Italiano Automatico*) en el traslado | Camino al trabajo, 1h20 sin usar | Cuando lleves ~3 semanas de racha |

**El traslado es tu recurso escondido:** 2h40 diarias que ahorita no
producen nada. No hay que llenarlas todas — pero 20 minutos de podcast
en italiano, 3 veces por semana, valen más que cualquier bloque
nocturno que le pudieras arrancar a la agenda.

### Progreso

| Fecha | Racha | Notas |
|-------|-------|-------|
| 01/09/2026 | — | Arranque previsto |

Dime cada cierto tiempo cómo va la racha y lo registro aquí.

- [x] Definir qué idioma — **italiano** (15/08/2026)
- [x] Meta a diciembre — **conversacional simple**
- [x] Método — **Duolingo** + podcast en el traslado
- [x] Definir cuándo y dónde — **Break 1, 1 lección diaria** (31/08/2026)
- [ ] Empezar — previsto martes 01/09/2026

## 📚 Cultura general / lectura

**En standby consciente.** No es abandono: es que las 3 pistas activas
ahorita son titulación, desempeño e italiano, y meter una cuarta es
exactamente lo que causó la caída de productividad de agosto.

Se retoma cuando la titulación esté entregada (previsto ~06/09/2026) —
ahí se libera un espacio.

- [ ] Definir qué tipo de lectura te interesa (historia, actualidad,
      novela, lo relacionado a RI/comercio exterior)
- [ ] Meta simple para empezar: ej. 1 libro al mes, o 15 min diarios

## Notas

- Mejor consistencia baja que abandono. Una lección de 3 minutos que se
  hace 120 días seguidos gana por mucho a una hora que se hace 4 veces
  y se abandona.
- Si un día se rompe la racha: **no se recupera con doble sesión al día
  siguiente.** Se retoma y ya. La deuda acumulada es lo que mata los
  hábitos.


===== END FILE: SOURCE/metas/aprendizaje.md =====

===== BEGIN FILE: SOURCE/metas/articulo-giro-derecha.md =====

# ✍️ Artículo: El giro a la derecha en América Latina (2023-2026)

Desglose de investigación para el primer artículo (ver
[trabajo.md](trabajo.md), sección "Camino alterno: academia /
investigación"). La investigación la haces tú — esto es la ruta.

Tablero: [Artículos.exe](https://claude.ai/code/artifact/25b45539-b542-44ea-9085-a19aeb4edca8)
— checklist interactivo por caso (I-IX), fuentes, el prompt de
redacción y el banco de ideas para los siguientes artículos. El
progreso que marques ahí vive en el navegador; cuéntame cuando avances
algo para reflejarlo también aquí.

## 1. Pregunta a responder

No arrancar asumiendo que "la derecha está ganando en toda la región" —
es la versión floja. Dos formas de plantearlo, decidir después de ver los
datos:

- **A) Tesis fuerte:** sí hay una tendencia real hacia la derecha, con
  causas comunes (inseguridad, inflación, hartazgo).
- **B) Tesis matizada (recomendada):** no es un giro ideológico uniforme,
  es una **ola anti-incumbente** — gana quien esté en la oposición, sea de
  izquierda o derecha, porque se castiga a quien gobierne. Explica mejor
  los casos que no encajan en A.

## 2. Puntos clave para tu análisis

Ocho aspectos que le dan rigor al artículo. No son investigación en sí
—son la lente con la que interpretas lo que vayas encontrando—.

1. **¿Es un giro real o son elecciones sueltas?** Antes de asumir que
   hay una "tendencia", cuenta cuántos países cambiaron realmente de
   bloque político y compáralo con los que se quedaron igual. Una ola
   necesita evidencia sistemática, no solo 2-3 casos ruidosos en las
   noticias.
2. **Calidad democrática ≠ orientación ideológica.** Son dos ejes
   distintos. Un gobierno de derecha puede fortalecer o debilitar la
   democracia, igual que uno de izquierda. No asumas que "derecha" es
   sinónimo de autoritario o "izquierda" de democrático — compara el
   índice (Economist/V-Dem) de cada país con su gobierno actual y ve qué
   pasa realmente.
3. **Anti-incumbencia: el patrón que cruza ideologías.** En muchos
   países la gente no elige "derecha" por convicción — castiga a quien
   esté gobernando por inflación, inseguridad o corrupción. Si tanto
   gobiernos de izquierda como de derecha están perdiendo elecciones
   seguidas, el patrón real es hartazgo con el poder en turno, no una
   ideología ganando.
4. **No toda "derecha" es la misma.** Milei (libertario), Bukele (mano
   dura/seguridad), la derecha tradicional conservadora — son proyectos
   distintos, con causas y consecuencias distintas. Meterlos en la misma
   bolsa simplifica de más y le resta rigor al análisis.
5. **Encuesta vs. resultado electoral.** Lo que la gente dice sentir en
   una encuesta (autoidentificación izq/derecha) no siempre coincide con
   por quién termina votando. El personalismo del candidato o el voto
   "antisistema" muchas veces pesan más que la ideología pura.
6. **Los contraejemplos son parte del argumento, no un obstáculo.**
   México, Colombia, Brasil, Honduras siguen gobernados por la
   izquierda/centro. No los escondas — úsalos para afinar tu tesis: ¿por
   qué esos sí resistieron la tendencia?
7. **El "por qué" de fondo, no solo el "qué".** Detrás del resultado
   electoral casi siempre hay 2-3 factores estructurales repetidos:
   inseguridad/crimen organizado, inflación/estancamiento, fatiga
   institucional/corrupción, migración. Identifica cuáles pesan más en
   cada país.
8. **Cruza tus fuentes, no confíes en una sola.** Ya viste que una
   fuente puso a Nicaragua como "derecha" por error. Antes de citar un
   dato fuerte, confírmalo en al menos dos fuentes independientes — una
   de datos duros (V-Dem/Latinobarómetro) y una de análisis o prensa.

## 3. Índice de investigación (ve marcando conforme avances por partes)

### I. Panorama general — arrancar aquí
- [ ] Mapa de gobiernos actuales por bloque político: ¿quién manda hoy en
      cada país de AL?
- [ ] Lista de países que cambiaron de signo político (izq→der o
      der→izq) entre 2023-2026
- [ ] Últimos datos de Latinobarómetro: confianza institucional,
      aprobación de la democracia, autoidentificación izq/derecha

**Hallazgos preliminares y links (búsqueda del 19/08/2026 — lee la
fuente original antes de citar cualquier dato, esto es punto de
partida, no verdad cerrada):**

- Entre 2023 y 2026, **11 de 14 elecciones presidenciales** en AL las
  habría ganado una fuerza de derecha — cifra y metodología a verificar
  directo en la fuente:
  [¿Cómo quedó el mapa ideológico de América Latina en 2025? — Diálogo
  Político](https://dialogopolitico.org/agenda/analisis/mapa-ideologico-america-latina-2025/)
- El triunfo de Abelardo de la Espriella en Colombia (2026) como el
  evento más reciente que reconfigura el mapa regional:
  [Infobae — "El triunfo de Abelardo de la Espriella cambió el mapa
  político de América
  Latina"](https://www.infobae.com/colombia/2026/06/23/el-triunfo-de-abelardo-de-la-espriella-cambio-el-mapa-politico-de-america-latina-asi-se-ve-la-region-entre-la-derecha-y-la-izquierda/)
- Análisis sobre la irrupción de las "nuevas derechas" en la región:
  [Radio Universidad de Chile — "El nuevo mapa político en América
  Latina"](https://radio.uchile.cl/2026/06/27/el-nuevo-mapa-politico-en-america-latina-las-claves-de-la-irrupcion-de-las-nuevas-derechas/)
- ⚠️ Una fuente (arbolinvertido.com) clasificó a **Nicaragua** como país
  de "derecha consolidada" — es un error o fuente poco confiable (el
  gobierno de Ortega/Murillo es autoritario de izquierda/FSLN, no de
  derecha). No uses esa fuente sin cruzarla con otra — es justo el tipo
  de dato que le resta credibilidad al artículo si se cuela sin revisar.
- **The Economist Democracy Index 2025:** la región cortó 9 años
  seguidos de declive democrático (subió de 5.61 a 5.71 en el índice
  agregado). Ranking destacado: Uruguay (9.90), Chile (9.25), Costa Rica
  (8.90) arriba; Venezuela (3.07), Cuba (3.05), Nicaragua (2.92) abajo;
  Brasil (7.50), Argentina (7.35), Bolivia/Colombia (6.55), El Salvador
  (4.27). Compilación con tablas por país:
  [Congress.gov — Democracy in Latin America and the Caribbean (CRS
  Report)](https://www.congress.gov/crs-product/R46016) · [PDF con
  tablas](https://www.congress.gov/crs_external_products/R/PDF/R46016/R46016.11.pdf)
  · [gráfico Statista](https://www.statista.com/chart/18737/democracy-index-world-map)
- **V-Dem Democracy Report 2026** incluye una sección nueva sobre el
  avance de la derecha radical en El Salvador, Brasil (era Bolsonaro) y
  Argentina — útil directo para el bloque de casos, no solo panorama:
  [PDF completo del reporte](https://www.v-dem.net/documents/75/V-Dem_Institute_Democracy_Report_2026_lowres.pdf)
  · [página de reportes](https://www.v-dem.net/publications/democracy-reports/)
  · [versión en español, nota de
  prensa](https://www.v-dem.net/news/out-now-democracy-report-2026-in-spanish/)
- **Latinobarómetro 2024 ("La Democracia Resiliente")** — confianza
  institucional, apoyo a la democracia, autoidentificación izq/derecha
  por país: [nota de
  presentación](https://www.latinobarometro.org/news/informe-latinobarometro-2024-la-democracia-resiliente)
  · [resultados por país
  (PDF)](https://www.latinobarometro.org/documents/LAT-2024/latinobarometro-2024-results-by-country.pdf)
  · [portal con todos los
  documentos/datos](https://www.latinobarometro.org/latinobarometro-2024)
- **LAPOP AmericasBarometer** — otra encuesta regional, buen
  contraste/complemento a Latinobarómetro: [reportes
  regionales](https://www.vanderbilt.edu/lapop/regional-reports.php) ·
  [análisis del Inter-American Dialogue sobre la edición
  2023](https://thedialogue.org/analysis/the-pulse-of-democracy-in-the-americas-results-of-the-2023-americasbarometer)

### II. Argentina — Milei
- [ ] Contexto previo: hiperinflación, crisis con el FMI, desgaste del
      kirchnerismo
- [ ] Coalición y bases electorales que lo llevaron al poder (dic. 2023)
- [ ] Medidas económicas tomadas ("motosierra", desregulación, relación
      con el dólar)
- [ ] Resultado a mitad de 2026: inflación, pobreza, nivel de aprobación
      *actual* (no el de su llegada)

**Links y accesos directos (búsqueda del 21/08/2026 — cruza estas fuentes,
hay versiones bastante distintas del "éxito" de Milei):**
- [Infobae — encuesta de aprobación del gobierno de Milei
  (mayo 2026)](https://www.infobae.com/politica/2026/05/04/una-nueva-encuesta-midio-el-nivel-de-aprobacion-del-gobierno-de-javier-milei/)
- [Infobae — análisis prospectivo de la Argentina de Milei
  (agosto 2026)](https://www.infobae.com/opinion/2026/08/01/un-analisis-prospectivo-de-la-argentina-de-javier-milei/)
- [Economics Observatory — "Argentina's second test: can the Milei
  government deliver lasting growth?"](https://www.economicsobservatory.com/argentinas-second-test-can-the-milei-government-deliver-lasting-growth)
  — salarios reales estancados y desempleo al alza pese a la baja de
  inflación, buen contrapeso a las notas más celebratorias
- ⚠️ Nota de fuente: [Freiheit.org (fundación liberal alemana) — "Two
  years of Javier Milei"](https://www.freiheit.org/argentina-brazil-paraguay-and-uruguay/javier-milei-two-years-office-impressive-successes-and)
  es un think tank con posición ideológica marcada a favor — útil como
  dato, no como fuente neutral única

### III. Ecuador — Noboa
- [ ] Contexto de crisis de seguridad/crimen organizado
- [ ] Cómo ganó (y si se reeligió)
- [ ] Balance real de resultados en seguridad

**Links y accesos directos (búsqueda del 21/08/2026):**
- [CNN — resultados en vivo, elecciones Ecuador
  2025](https://cnnespanol.cnn.com/latinoamerica/live-news/resultados-elecciones-ecuador-2025-quien-gana-gonzalez-noboa-orix)
  — Noboa ganó el balotaje con 56% vs. 44.05% de Luisa González
- [InSight Crime — "How Organized Crime Shaped Ecuador's Presidential
  Elections"](https://insightcrime.org/news/organized-crime-agenda-ecuadors-presidential-elections/)
- [Radio Nacional de Colombia — "La 'mano dura' de Noboa, bajo
  cuestionamiento: homicidios en Ecuador aumentaron más de 40% en
  2025"](https://www.radionacional.co/actualidad/mundo/violencia-en-ecuador-aumenta-pese-la-estrategia-de-noboa)
  — clave para la parte de "balance real": 15,561 homicidios entre
  nov. 2023 y oct. 2025 pese al discurso de "guerra al crimen"

### IV. Bolivia — elección 2025
- [ ] Causas del quiebre de ~20 años de hegemonía del MAS (fractura
      Evo/Arce, causas externas)
- [ ] Quién ganó y su perfil político/económico
- [ ] Primeras medidas del nuevo gobierno

**Links y accesos directos (búsqueda del 21/08/2026):**
- [Wikipedia — Elecciones generales de Bolivia de
  2025](https://es.wikipedia.org/wiki/Elecciones_generales_de_Bolivia_de_2025)
  — buen resumen con fechas y cifras exactas (1ª vuelta 17/ago,
  balotaje 19/oct, MAS <3% en la 1ª vuelta, Rodrigo Paz gana el
  balotaje con >54%)
- [Razón Pública — "Elecciones en Bolivia: fin de ciclo y lecciones
  para América Latina"](https://razonpublica.com/elecciones-bolivia-fin-ciclo-lecciones-america-latina/)
- [Misión de Observación Electoral de la UE en Bolivia 2025 — informe
  final
  (PDF)](https://www.eeas.europa.eu/sites/default/files/2025/documents/MOEUE_Bolivia_2025_Informe_Final.pdf)
  — fuente dura/oficial si necesitas citar con más peso

### V. Chile — proceso 2025-2026
- [ ] Resultado de la presidencial de fines de 2025
- [ ] Contraste con el rechazo a la propuesta constitucional *de
      derecha* en 2023 (no solo la de izquierda en 2022) — ¿por qué el
      electorado rechazó ambos extremos y qué cambió después?

**Links y accesos directos (búsqueda del 21/08/2026):**
- [Wikipedia — Elección presidencial de Chile de
  2025](https://es.wikipedia.org/wiki/Elecci%C3%B3n_presidencial_de_Chile_de_2025)
  — José Antonio Kast (Partido Republicano) ganó el balotaje del
  14/12/2025 con 58.16% sobre Jeannette Jara; asume el 11/03/2026
- [CNN — resumen resultados presidenciales y parlamentarias, Chile
  2025](https://cnnespanol.cnn.com/latinoamerica/live-news/elecciones-presidenciales-parlamento-chile-2025-resultados-orix)
- Para el contraste con 2023: busca directo "rechazo propuesta
  constitucional Chile diciembre 2023" — no quedó en esta ronda de
  búsqueda, pero es el dato que le da fuerza al matiz de este bloque

### VI. El Salvador — Bukele
- [ ] Modelo de "iliberalismo" de derecha: mano dura, estado de
      excepción
- [ ] Aprobación vs. críticas de derechos humanos
- [ ] Por qué es un caso distinto (no es libertario ni conservador
      clásico) — matiza que no toda "derecha" es igual

**Links y accesos directos (búsqueda del 21/08/2026):**
- [Human Rights Watch — Informe Mundial 2026, capítulo El
  Salvador](https://www.hrw.org/es/world-report/2026/country-chapters/el-salvador)
  — la fuente más fuerte del lado de derechos humanos
- [Emol — "Cuatro años de estado de excepción en El Salvador: cómo se
  aprobó y por qué sigue
  vigente"](https://www.emol.com/noticias/Internacional/2026/03/27/1195484/bukele-el-salvador-estado-excepcion.html)
  — 48 prórrogas seguidas desde marzo 2022, +91,000 detenciones (7,000+
  liberadas después por no tener vínculo con pandillas)
- [CNN — "Hasta dónde están dispuestos los salvadoreños a aceptar
  medidas extremas de Bukele con tal de vivir en
  calma"](https://cnnespanol.cnn.com/2026/05/01/latinoamerica/derechos-seguridad-salvador-bukele-orix)
  — el ángulo de aprobación pese a las críticas, útil para el punto de
  "por qué es un caso distinto"

### VII. Contraejemplos — no saltárselos, le dan rigor al artículo
- [ ] México (Sheinbaum/Morena, 2024) — ¿continuidad o giro?
- [ ] Colombia (Petro)
- [ ] Brasil (Lula, con el trasfondo de Bolsonaro)
- [ ] Honduras (Castro)
- [ ] Uruguay (el Frente Amplio volvió al poder en 2024)

**Links y accesos directos por país (búsqueda del 21/08/2026):**
- **México:** [CNN — "Morena vs. Morena: el desafío electoral para
  Claudia Sheinbaum en
  2027"](https://cnnespanol.cnn.com/2026/08/13/mexico/sheinbaum-morena-clave-electoral-mexico-orix)
  — aprobación de Sheinbaum ~70%, Morena controla 24/32 estados; hay
  lecturas encontradas sobre si el partido gira a la derecha por dentro
- **Colombia:** [CNN — "El legado de Gustavo Petro en Colombia, entre
  la popularidad, la retórica y las promesas
  incumplidas"](https://cnnespanol.cnn.com/2026/05/26/colombia/gustavo-petro-legado-colombia-elecciones-presidente-orix)
  · [ANIF — balance económico de la administración
  Petro](https://www.anif.com.co/informe-semanal/balance-economico-de-la-administracion-petro-notas-regulares-y-un-gran-lunar-en-materia-fiscal/)
  (su gobierno terminó el 07/08/2026, dato a confirmar/actualizar)
- **Brasil:** [Nueva Sociedad — "Brasil bajo la polarización: balance y
  perspectivas"](https://nuso.org/articulo/322-brasil-bajo-la-polarizacion/)
  — Lula busca reelección el 04/10/2026 contra Flávio Bolsonaro,
  encuestas muy cerradas (39% vs. 35%)
- **Honduras:** [Wikipedia — Gobierno de Xiomara
  Castro](https://es.wikipedia.org/wiki/Gobierno_de_Xiomara_Castro)
  (mandato terminó el 27/01/2026 — confirmar quién gobierna ahora, es
  un dato que puede haber cambiado después del corte de información)
- **Uruguay:** [France 24 — "Orsi gana las presidenciales y encumbra
  nuevamente a la izquierda en
  Uruguay"](https://www.france24.com/es/am%C3%A9rica-latina/20241125-orsi-gana-las-presidenciales-y-encumbra-nuevamente-a-la-izquierda-en-uruguay)
  — Orsi (Frente Amplio) ganó con 52%, terminando 5 años de gobierno de
  centroderecha (Lacalle Pou)

### VIII. Explicaciones de fondo
- [ ] Anti-incumbencia global/regional — comparar con lo que pasó en
      otras regiones del mundo post-pandemia/inflación
- [ ] Inseguridad y crimen organizado como issue transversal
- [ ] Papel de redes sociales y liderazgos "outsider"
- [ ] Influencia externa (postura de EE.UU., relación con China)
- [ ] Migración como tema movilizador

**Links y accesos directos por sub-tema (búsqueda del 21/08/2026) —
este bloque es el corazón de la tesis matizada (opción B), vale la pena
no saltárselo:**
- *Anti-incumbencia:* [Real Instituto Elcano — "Elecciones en América
  Latina (2024): ¿fin del voto de castigo al
  oficialismo?"](https://www.realinstitutoelcano.org/analisis/elecciones-en-america-latina-2024-fin-del-voto-de-castigo-al-oficialismo/)
  · [Real Instituto Elcano — "Las elecciones latinoamericanas en 2025:
  nuevas y viejas
  dinámicas"](https://www.realinstitutoelcano.org/analisis/las-elecciones-latinoamericanas-en-2025-nuevas-y-viejas-dinamicas/)
  — dato clave: en 2/3 de las elecciones entre 2022-2024 ganó la
  oposición, independientemente de su signo ideológico
- *Inseguridad/crimen organizado:* [InSight Crime — portal de
  investigación y análisis](https://insightcrime.org/) · [El Tiempo —
  "Los 10 riesgos políticos para América Latina en 2026: crimen
  organizado, inseguridad y caída de Nicolás
  Maduro"](https://www.eltiempo.com/mundo/latinoamerica/los-10-riesgos-politicos-para-america-latina-en-2026-crimen-organizado-inseguridad-y-caida-de-nicolas-maduro-desafian-a-la-region-3523912)
  — 20 homicidios por 100k habitantes en la región, 50% ligado a crimen
  organizado
- *Redes sociales/outsiders:* [ramonramon.org — "El nuevo manual del
  outsider latinoamericano: qué cambió desde
  Bukele"](https://ramonramon.org/blog/2026/06/16/el-nuevo-manual-del-outsider-latinoamericano-que-cambio-desde-bukele/)
  — plantea que el outsider ya no es anomalía, es categoría estable del
  sistema (Milei, Bukele, Rodrigo Chaves en Costa Rica)
- *Influencia externa (EE.UU.-China):* [CNN — "Trump y Xi se reúnen en
  China. América Latina está en el tablero de la disputa
  geopolítica"](https://cnnespanol.cnn.com/2026/05/13/latinoamerica/trump-xi-disputa-geopolitica-latinoamerica-orix)
  — casos concretos: Canal de Panamá, Venezuela, Colombia (descertificada
  por EE.UU. tras acercarse a China), Paraguay-Taiwán
- *Migración:* [Foreign Affairs Latinoamérica — "Centroamérica entre
  muros"](https://revistafal.com/centroamerica-entre-muros/) — causas
  estructurales (violencia, pobreza, clima) frente al uso político del
  tema en EE.UU. vs. México

### IX. Cierre
- [ ] Qué significa esto para México específicamente
- [ ] Qué significa para el comercio exterior/RI de la región (tu ángulo
      profesional)

**Links y accesos directos (búsqueda del 21/08/2026) — para conectar el
cierre con tu ángulo profesional de comercio exterior:**
- [The Logistics World — "Perspectivas del nearshoring 2026: ¿Qué se
  espera a nivel global y para
  México?"](https://thelogisticsworld.com/planeacion-estrategica/perspectivas-del-nearshoring-2026-que-se-espera-a-nivel-global-y-para-mexico/)
  — México como principal socio comercial de EE.UU. desde 2023,
  desplazando a China; el nearshoring entra en fase de mayor
  escrutinio político/regulatorio en 2026 (útil para conectar
  inestabilidad política regional con riesgo de inversión)
- [Coface — "Nearshoring en México: ¿oportunidad o falsa
  promesa?"](https://www.coface.es/noticias-economia-insights/nearshoring-en-mexico-oportunidad-o-falsa-promesa)
- Idea de gancho para el cierre: la estabilidad/orientación política de
  cada país (este artículo) es justo una de las variables que un
  analista de comercio exterior tendría que leer antes de recomendar
  una cadena de suministro o mercado — es tu valor agregado real frente
  a un politólogo puro

## 4. Autores y especialistas sugeridos (punto de partida — verificar
   vigencia y buscar sus publicaciones más recientes)

- **Steven Levitsky** (Harvard) — democracia y populismo en AL, coautor
  de *How Democracies Die*
- **Kenneth Roberts** (Cornell) — ciclos de izquierda/derecha y
  populismo latinoamericano
- **Javier Corrales** (Amherst) — Venezuela, autoritarismo, elecciones
- **Carlos de la Torre** (Universidad de Kentucky) — teoría del
  populismo latinoamericano
- **Cynthia Arnson** (Wilson Center, directora del Programa
  Latinoamérica) — análisis político regional
- **Michael Shifter** (Inter-American Dialogue) — comentarista frecuente
  sobre política regional
- **Andrés Malamud** (ISCTE-Lisboa) — buen puente entre academia y
  prensa, comentarista habitual
- **Oliver Stuenkel** (FGV, Brasil) — geopolítica y democracia en AL
- **Manuel Alcántara Sáez** (Universidad de Salamanca) — élites políticas
  latinoamericanas, buen dato duro
- Investigadores de **CIALC-UNAM** — tu propia ex-institución; vale la
  pena revisar directamente su catálogo de publicaciones recientes

## 5. Dónde buscar (instituciones y medios)

**Think tanks / centros de análisis**
- Wilson Center — Latin America Program
- Inter-American Dialogue
- Americas Society/Council of the Americas (AS/COA)
- Real Instituto Elcano (España)
- CIDOB (Barcelona)
- FLACSO

**Datos y encuestas**
- Latinobarómetro
- LAPOP (Vanderbilt) — AmericasBarometer
- V-Dem Institute
- Freedom House
- The Economist Democracy Index

**Revistas académicas**
- Nueva Sociedad (nuso.org, acceso abierto, en español)
- Journal of Democracy
- Latin American Politics and Society
- Americas Quarterly (tiene versión en español)
- Foreign Affairs Latinoamérica

**Prensa**
- El País (sección América)
- BBC Mundo
- Bloomberg Línea
- Infobae
- Reuters / AP — para hechos duros, fechas y resultados
- *Latin America Risk Report* (newsletter de James Bosworth) — buen
  análisis de riesgo político

**Resultados oficiales:** organismo electoral de cada país

**Google Scholar:** "derechización" OR "right turn" "Latin America"
2023-2026

## 6. Estructura sugerida

1. Gancho con 2-3 datos fuertes (cuántos países cambiaron de signo
   político 2023-2026)
2. Tesis (A o B)
3. 2-3 casos a profundidad — no los diez
4. Contraejemplos / matices
5. El "por qué" de fondo
6. Cierre: implicaciones para la región y para México

## Ojo

Hay elecciones y eventos muy recientes (Chile fin de 2025, Bolivia 2025)
cerca o después del corte de información más confiable de Claude —
verificar resultados y fechas exactas antes de citarlos, no darlos por
hechos solo porque se mencionen aquí.

## 7. Prompt para pedirle ayuda a Claude con la redacción

Una vez que tengas la investigación reunida, usa esto (copiar/pegar tal
cual, rellenando lo que está entre corchetes):

> Estoy escribiendo un artículo de investigación en español sobre "El
> giro a la derecha en América Latina (2023-2026)", para publicar en
> LinkedIn como parte de mi presencia profesional en Relaciones
> Internacionales / comercio exterior, y como evidencia de investigación
> de cara a una futura maestría. Vengo de dos años como asistente de
> investigación en CIALC-UNAM (investigación documental sobre temas
> políticos, económicos y sociales de América Latina y el Caribe).
>
> Mi tesis de trabajo es: **[pega aquí la tesis A o B que hayas elegido,
> o la tuya propia]**.
>
> Abajo te paso toda la investigación que ya reuní (notas, datos,
> fuentes, citas). Quiero que trabajes solo con esto — no completes
> huecos con información que no te haya dado, y si algo que necesito no
> está en mi investigación, dime exactamente qué falta en vez de
> inventarlo o suponerlo.
>
> Ayúdame a:
> 1. Revisar si mi tesis se sostiene con la evidencia que tengo, o si
>    necesito matizarla.
> 2. Proponer una estructura de artículo (2,000-3,000 palabras aprox.) a
>    partir de mis notas.
> 3. Redactar un primer borrador en tono analítico pero accesible para
>    LinkedIn — no académico duro, pero tampoco superficial.
> 4. Señalar si algún dato o afirmación necesita cita/fuente y no la
>    tengo clara.
>
> Aquí está mi investigación:
> **[pega tus notas, datos y fuentes aquí]**

## Estado

- [x] Tema elegido (19/08/2026): el giro a la derecha en AL
- [x] Desglose de investigación armado (19/08/2026)
- [x] Prompt de redacción armado (19/08/2026)
- [x] Links y accesos directos agregados en cada bloque del índice de
      investigación (21/08/2026) — cada sección (II-IX) ya trae de 2 a
      5 fuentes reales con las que arrancar, no hace falta salir a
      buscar desde cero
- [ ] Investigación (Diego) — ir sección por sección del índice
      (empezando en I. Panorama general), leer las fuentes ya puestas,
      marcar los checkboxes y anotar lo que vayas encontrando debajo de
      cada bloque de links
- [ ] Definir tesis final (A o B, o una propia)
- [ ] Primer borrador
- [ ] Publicar


===== END FILE: SOURCE/metas/articulo-giro-derecha.md =====

===== BEGIN FILE: SOURCE/metas/cv.md =====

# 📄 CV — borrador de referencia

Texto de referencia del CV, para no depender de un Word suelto que se
pierde entre sesiones. Ver el checklist de ajustes en
[trabajo.md](trabajo.md#cv--revisión-y-ajustes-pendientes-15082026).

**Estado (16/08/2026):** PDF final generado y entregado —
[cv/DiegoRuizElizondo.CV.ESP.pdf](cv/DiegoRuizElizondo.CV.ESP.pdf) y
[cv/DiegoRuizElizondo.CV.ENG.pdf](cv/DiegoRuizElizondo.CV.ENG.pdf).
La versión que Diego había enviado ese mismo día todavía era la
genérica original, sin los ajustes de comercio exterior/ATS — este
texto de abajo es el que ya quedó aplicado en esos PDF.

**No aplica tema de tesis** — titulación por promedio, no por trabajo
terminal. **Certificación de inglés:** ninguna todavía; TOEFL queda
como posible paso a futuro (no urgente).

**17/08/2026 — corrección importante:** Diego encontró (al analizar una
vacante que pedía explícitamente "Licenciatura en RI") que la sección
de Educación decía "Licenciatura en Relaciones Internacionales" sin
matizar que es **egresado, no titulado** — la titulación sigue en
trámite (ver [titulacion.md](titulacion.md)). Se corrigió el texto de
abajo y se regeneraron los PDF. Pendiente: aplicar el mismo matiz en
LinkedIn (ver checklist en [trabajo.md](trabajo.md)).

**17/08/2026 — carta de presentación:** se armó una carta específica
para la vacante de SMJ Consulting (Customer Service Representative,
Freight Forwarder). Reescrita el mismo día: la primera versión sonaba
acartonada (repetía el lenguaje de marketing del cliente) y además
partía de una premisa equivocada — el requisito real es "1 año en
customer service **o** importación marítima", y Diego ya lo cumple con
sus 2+ años en Boost Mobile, así que no hacía falta compensar nada. La
versión actual es más directa y en su propia voz. Ver
[cv/DiegoRuizElizondo.CartaPresentacion.SMJ.ESP.pdf](cv/DiegoRuizElizondo.CartaPresentacion.SMJ.ESP.pdf)
y [cv/DiegoRuizElizondo.CoverLetter.SMJ.ENG.pdf](cv/DiegoRuizElizondo.CoverLetter.SMJ.ENG.pdf).

**17/08/2026 — segunda pasada, tono formal:** Diego pidió que sonara
formal pero humana, sin rasgos detectables de IA. Se quitaron los
guiones largos, el saludo casual ("Hola") y frases genéricas, y se
metieron detalles concretos (fecha exacta de ingreso a Boost Mobile,
"casi dos años" en CIALC) para que se lea como alguien real, no una
plantilla. Mismos archivos, actualizados.

**17/08/2026 — métricas actualizadas:** Diego compartió una captura
anterior de su dashboard (Performance Total 108.8%, con detalle
completo por primera vez — ver [../desempeno/metricas.md](../desempeno/metricas.md)).
El bullet de Boost Mobile ahora usa el rango real (98.9%–108.8% a
meta) en vez de un solo corte, más representativo y más fuerte.

**17/08/2026 — fechas corregidas (via Indeed):** al armar su perfil de
Indeed, Diego recordó las fechas reales de sus dos roles institucionales,
distintas a lo que tenía el CV original:

- **CIALC:** era **septiembre 2023 – mayo 2025** (ya terminó), no
  "2025-2026 simultáneo" como decía el CV que él mismo había mandado.
  Ya no traslapa con DIF Tlalnepantla (que empezó justo después) — sí
  traslapó parcialmente con Boost Mobile.
- **DIF Tlalnepantla:** era **junio 2025 – julio 2026** (también ya
  terminó, el mes pasado), no "2025-2026" abierto. Sí fue simultáneo
  con Boost Mobile todo ese tiempo.

Con esto, la historia de fechas queda más simple y creíble: Boost
Mobile es el único trabajo en curso; CIALC y DIF fueron consecutivos
(uno terminó, empezó el otro), cada uno traslapando solo con Boost
Mobile, nunca los tres a la vez. Corregido en el CV (ver arriba) —
**pendiente aplicar la misma corrección en LinkedIn**, que todavía
dice fechas distintas (jun 2023 – feb 2026 para CIALC).

---

## Versión español

**DIEGO RUIZ ELIZONDO**
Estado de México, México
druizelizondo@gmail.com | +52 55 1932 7522 | linkedin.com/in/diego-ruiz-elizondo-634b48297

### Perfil Profesional
Egresado en Relaciones Internacionales por la UNAM, con enfoque académico
en comercio internacional, negocios internacionales y logística, y
experiencia real en atención al cliente bilingüe, investigación y
coordinación de proyectos. Busco desarrollarme en comercio exterior,
logística internacional o aduanas — y en paralelo, roles de operaciones
o soporte bilingüe para empresas internacionales.

### Áreas de conocimiento
Comercio Exterior · Comercio Internacional · Logística Internacional ·
Incoterms · Clasificación Arancelaria · Importación/Exportación ·
Negocios Internacionales

### Habilidades
- Atención al cliente
- Resolución de problemas
- Coordinación de proyectos
- Análisis de datos (Microsoft Excel)
- Comercio Exterior y Logística Internacional
- Investigación y análisis
- Comunicación con grupos de interés
- Microsoft PowerPoint y Canva

### Experiencia Profesional

**Boost Mobile** 2024 – Presente
*Customer Support Representative / Global Expert*
- Resolución de casos complejos para clientes de habla inglesa.
- Análisis de cuentas e historial de servicio para identificar soluciones eficientes.
- Colaboración con equipos especializados para resolver incidencias técnicas y administrativas.
- Performance Total consistente entre 98.9% y 108.8% a meta en los últimos meses, con métricas de atención en chat y voz frecuentemente por arriba de 100% a meta.

**DIF Tlalnepantla** Junio 2025 – Julio 2026
*Apoyo a Proyectos (medio tiempo, simultáneo con Boost Mobile)*
- Colaboración externa, tipo freelance, brindando apoyo flexible a distintos programas e iniciativas sociales según la necesidad del momento.
- Apoyo en la planeación logística de programas sociales y eventos.
- Elaboración de reportes y documentos para el seguimiento de proyectos.

**Centro de Investigaciones sobre América Latina y el Caribe (CIALC) – UNAM** Septiembre 2023 – Mayo 2025
*Asistente de Investigación*
- Creación de materiales educativos para la cátedra de Negocios Internacionales.
- Investigación documental sobre temas políticos, económicos y sociales de América Latina y el Caribe.
- Redacción y revisión de documentos académicos.

### Educación
**Licenciatura en Relaciones Internacionales — Egresado (titulación en trámite)**
Facultad de Estudios Superiores Aragón (UNAM) — Enfoque académico en negocios internacionales, comercio internacional y logística.

### Idiomas
- Español | Nativo
- Inglés | Competencia profesional (hablado y escrito)
- Alemán | Básico

---

## English version

**DIEGO RUIZ ELIZONDO**
State of Mexico, Mexico
druizelizondo@gmail.com | +52 55 1932 7522 | linkedin.com/in/diego-ruiz-elizondo-634b48297

### Professional Summary
International Relations graduate from UNAM with an academic focus on
international trade, international business, and logistics, plus
hands-on experience in bilingual customer support, research, and
project coordination. Seeking opportunities in foreign trade,
international logistics, or customs — and in parallel, bilingual
operations/support roles for international companies.

### Areas of Expertise
Foreign Trade · International Trade · International Logistics ·
Incoterms · Tariff Classification · Import/Export · International
Business

### Skills
- Data Analysis (Microsoft Excel, Pivot Tables, Lookup Functions)
- Customer Support & Problem Solving
- Project Coordination
- Research & Policy Analysis
- International Trade & Logistics
- Stakeholder Communication
- Presentation Development (PowerPoint & Canva)
- Cross-functional Collaboration

### Professional Experience

**Boost Mobile** 2024 – Present
*Customer Support Representative / Global Expert*
- Resolve complex customer escalations for English-speaking clients.
- Investigate account and service issues by analyzing customer history and technical information.
- Partner with specialized teams to deliver timely and accurate resolutions.
- Sustained a Performance Total between 98.9% and 108.8% to goal over recent months, with chat and voice metrics frequently above 100% to goal.

**DIF Tlalnepantla** June 2025 – July 2026
*Project Support (part-time, concurrent with Boost Mobile)*
- Provided flexible, freelance-style support across different social programs and institutional initiatives as needed.
- Supported operational planning and logistics for social welfare programs and public events.
- Prepared analytical documents and informational materials to support project development and institutional decision-making.

**Center for Research on Latin America and the Caribbean (CIALC) – UNAM** September 2023 – May 2025
*Research Assistant*
- Created educational materials for the International Business course.
- Conducted documentary research on political, economic, and social issues across Latin America and the Caribbean.
- Drafted and reviewed academic documents.

### Education
**Bachelor of Arts in International Relations — Coursework completed (degree conferral in process)**
FES Aragón (UNAM) — Academic focus in International Business, International Trade, and Logistics.

### Languages
- Spanish | Native
- English | Professional Working Proficiency
- German | Basic


===== END FILE: SOURCE/metas/cv.md =====

===== BEGIN FILE: SOURCE/metas/cv/DiegoRuizElizondo.CV.ENG.pdf =====

[ARCHIVO BINARIO — 4392 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/metas/cv/DiegoRuizElizondo.CV.ENG.pdf =====

===== BEGIN FILE: SOURCE/metas/cv/DiegoRuizElizondo.CV.ESP.pdf =====

[ARCHIVO BINARIO — 4421 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/metas/cv/DiegoRuizElizondo.CV.ESP.pdf =====

===== BEGIN FILE: SOURCE/metas/cv/DiegoRuizElizondo.CartaPresentacion.SMJ.ESP.pdf =====

[ARCHIVO BINARIO — 3294 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/metas/cv/DiegoRuizElizondo.CartaPresentacion.SMJ.ESP.pdf =====

===== BEGIN FILE: SOURCE/metas/cv/DiegoRuizElizondo.CoverLetter.SMJ.ENG.pdf =====

[ARCHIVO BINARIO — 3235 bytes — no representable como texto plano; contenido omitido en este documento de texto. Disponible íntegro y sin modificar en CEREBRO_FULL_EXPORT.zip en la misma ruta.]

===== END FILE: SOURCE/metas/cv/DiegoRuizElizondo.CoverLetter.SMJ.ENG.pdf =====

===== BEGIN FILE: SOURCE/metas/patrimonio.md =====

# 🏗️ Patrimonio — coche, créditos y propiedad

**Objetivo general:** construir patrimonio real con Fanny, sin que las
decisiones grandes (coche, préstamos, casa) canibalicen el ahorro de la
mudanza de diciembre 2026.

**Estado:** en evaluación — abierto el 31/08/2026 a partir de la
plática sobre el Beetle prestado, préstamos Fonacot/ISSEMyM y la idea
de adquirir una propiedad.

*Nota: no soy asesor financiero certificado. Todo lo de aquí es
orientación general y varias cifras/requisitos hay que confirmarlos en
la fuente oficial antes de decidir — están marcados con 🔎.*

---

## 🧭 El marco: corto, mediano y largo plazo

Esto es lo que ordena todo lo demás. La regla es simple: **nada de
mediano o largo plazo puede tocar el dinero del corto plazo.**

| Horizonte | Cuándo | Qué va aquí | Regla de dinero |
|-----------|--------|-------------|------------------|
| **Corto** | Ago – Dic 2026 | Titulación · Desempeño en Boost · Italiano · Ahorro de mudanza ($47,000) · Chevy funcionando | El fondo de $12,000/mes es **intocable**. Nada nuevo compite con él. |
| **Mediano** | 2027 | Cambio de coche (o moto) · Cambio de trabajo con mejor sueldo · Fondo de emergencia | Se financia con lo que sobre después de la mudanza + la venta del Chevy. |
| **Largo** | 2028+ | **Propiedad con Fanny** · maestría/academia | Se prepara desde HOY con puntos y antigüedad, no con dinero. Ver abajo. |

**La idea clave:** el largo plazo (la casa) no se construye ahorrando
más ahora — se construye con **antigüedad laboral, salario registrado
y puntos INFONAVIT/ISSEMyM**, que se acumulan solos con el tiempo. Por
eso bajar la prioridad de la búsqueda de trabajo no es perder terreno:
la continuidad laboral es literalmente parte del plan de la casa.

---

## 🚗 El Chevy: arreglar vs. cambiar

**✅ Resuelto (05/09/2026):** el ventilador ya quedó arreglado. Junto
con el radiador (ya listo desde antes), el Chevy está funcionando bien
— ya no hay riesgo de sobrecalentamiento pendiente.

<details>
<summary>Contexto del problema (ya resuelto)</summary>

El radiador quedó bien desde el 31/08, pero apareció un problema con
el **ventilador** — recomendación del taller en su momento: no dejarlo
calentar. Un motor que se sobrecalienta no es "un pendiente más" — es
el riesgo de fundir la junta de la cabeza y convertir un arreglo de
miles en uno de decenas de miles. Ya se cotizó y arregló, así que este
riesgo queda cerrado.

Reglas de manejo defensivo que ya no son obligatorias pero no está de
más recordar: ver el indicador de temperatura de vez en cuando, y si
alguna vez vuelve a subir la aguja, prender la calefacción al máximo
(roba calor al motor) y orillarse — nunca abrir el radiador en caliente.

</details>

### La decisión de fondo

| Opción | Costo | Veredicto |
|--------|-------|-----------|
| **Darle mantenimiento y usarlo otro rato** | El ventilador + servicio general | ✅ **Recomendado hasta después de la mudanza.** Es la única opción que no toca los $47,000 |
| Cambiarlo ya por otro coche | Enganche + mensualidades + seguro + tenencia | ❌ Compite de frente con el ahorro de diciembre |
| Venderlo ya | ~$40,000 estimado, sin comprador | ⏸️ Se vende **arreglado**, no descompuesto — un coche que calienta se castiga mucho en precio |

**Sobre el Beetle de tu tío:** lo que te gustó (la potencia y las
bocinas Fender) es real y es válido — pero son dos cosas distintas.
La *potencia* es una decisión de coche (mediano plazo, 2027). El
*sonido* es un antojo de ~$3,000-8,000 en un buen estéreo, que puedes
poner en el coche que sea. Eso último cabe en el **Fondo cosillas** de
[../perfil/compras.md](../perfil/compras.md), no en la meta de la casa.

---

## 🚕 La idea del Uber (préstamo para trabajar el carro)

Analizado el 31/08/2026. **Recomendación: no ahora.** No por la idea en
sí, sino por dos razones concretas:

**1. El Chevy no califica.** Uber en CDMX exige modelos relativamente
recientes, 4 puertas y permiso de transporte por aplicación 🔎. El
Chevy (descontinuado en México en 2012) queda fuera por año-modelo.
Así que "trabajar el carro como Uber" en realidad significa **comprar
otro coche a crédito** — no es aprovechar lo que ya tienes.

**2. No hay horas.** Tu semana real:

| | Horas |
|---|---|
| Turno | 10 h × 5 días = **50 h** |
| Traslado | 2h40 × 5 días = **13.3 h** |
| Sueño (7h) | **49 h** |
| **Comprometido** | **~112 h de 168** |

Las horas que quedan son tus 2.5h de noche y los jueves/viernes con
Fanny. Manejar Uber saldría **exactamente de ahí** — de las dos cosas
que ahorita son prioridad #1 y #2 (titulación y descanso para sostener
el desempeño en Boost). Y manejar cansado, en un coche a crédito, es
como se pierden las dos cosas a la vez.

**Cuándo sí reconsiderarlo:** si el trabajo cambia a remoto o a turnos
más cortos, la ecuación de horas cambia por completo. Queda anotado,
no descartado.

- [ ] (Standby — retomar solo si cambia el horario o el trabajo)

---

## 💳 Préstamos: Fonacot (tú) e ISSEMyM (Fanny)

### La pregunta que ordena todo

**¿Para qué es el préstamo?** La respuesta cambia si es buena o mala idea:

| Para qué | Veredicto |
|----------|-----------|
| Para **completar el ahorro de la mudanza** | ❌ **No.** Estarías pagando intereses por dinero que el plan de $12,000/mes ya cubre solo. Es cambiar una meta cumplida por una deuda. |
| Para el **enganche de una casa** | ⚠️ Con cuidado: muchos créditos de vivienda no permiten que el enganche venga de otra deuda, y sube tu nivel de endeudamiento justo cuando te evalúan 🔎 |
| Para **arreglar el coche** (si sale caro) | ✅ Defendible — es un gasto necesario, montos chicos, y protege un activo de $40,000 |
| Para **consolidar deuda cara** (tarjetas) | ✅ Si la tasa es realmente más baja |

### 🔎 Fonacot — lo que hay que verificar antes

- **Requisito clave:** que tu empresa esté **afiliada a Fonacot**. No
  todas lo están — confírmalo con RH antes de ilusionarte con el monto.
- **⚠️ El riesgo que importa en tu caso:** Fonacot se paga por
  **descuento vía nómina**. Si cambias de trabajo, **la deuda no
  desaparece** — pasa a ser pago directo tuyo, y la nueva empresa puede
  no estar afiliada. Con un cambio de trabajo en el horizonte (aunque
  esté en standby), atarte a un crédito de nómina es justo el tipo de
  amarre que estorba.
- Verificar tasa anual real y CAT vigentes en fonacot.gob.mx antes de
  firmar nada.

### 🔎 ISSEMyM (Fanny)

Como trabajadora del Estado de México, Fanny normalmente tiene acceso a
préstamos a corto plazo y a **crédito de vivienda** por ISSEMyM, con
descuento vía nómina y tasas mejores que la banca comercial.

- **Lo relevante no es el préstamo personal — es el crédito de
  vivienda.** Ese sí es la ruta al largo plazo.
- Requisitos típicos: antigüedad mínima cotizando y capacidad de
  descuento disponible 🔎

### Decisión sugerida (31/08/2026)

**Ninguno de los dos préstamos ahorita.** El único escenario que los
justifica en 2026 es si el arreglo del coche sale muy caro. La energía
de este tema se va mejor a la siguiente sección, que **no cuesta
dinero**:

---

## 🏠 Propiedad con Fanny (largo plazo, empieza hoy)

Esta es la meta que más te emociona y la que más lejos está — pero
tiene una particularidad buenísima: **los primeros pasos son gratis y
se pueden dar este mes.**

### Cómo funciona realmente (México)

- **Tú (empleo formal con IMSS):** tu patrón aporta 5% de tu salario a
  tu subcuenta de vivienda INFONAVIT. La elegibilidad se mide en
  **puntos**, que suben con: saldo acumulado, salario registrado, edad,
  y sobre todo **continuidad de cotización**. Se necesitan alrededor de
  1,080 puntos para poder ejercer el crédito 🔎
- **Fanny (ISSEMyM):** tiene su propia vía de crédito de vivienda por
  el instituto estatal.
- **La jugada de los dos juntos:** INFONAVIT tiene la figura de
  **"Unamos Créditos"**, que permite **juntar el crédito de dos
  personas** — y desde hace algunos años **no exige matrimonio**, puede
  ser pareja, familiar o incluso un tercero 🔎. Dos créditos sumados
  alcanzan para mucho más que uno.

### Por qué esto reordena tus prioridades (importante)

Los puntos INFONAVIT premian **continuidad y salario registrado**. Eso
significa:

1. **Bajar la prioridad de la búsqueda de trabajo ahorita no te frena
   — te ayuda.** Cada bimestre continuo suma.
2. **Cuando sí cambies de trabajo, el salario registrado (no el bruto
   con bonos) es lo que cuenta.** Vale la pena preguntarlo en cualquier
   oferta futura: cuánto se registra ante el IMSS.
3. Ojo con las ofertas tipo AmEx donde buena parte del paquete son
   vales, fondo de ahorro y bonos: eso **no** siempre cuenta como
   salario cotizado 🔎, y afecta directo tus puntos.

### Primeros pasos (gratis, ~30 min, sin compromiso)

- [x] Crear/entrar a **Mi Cuenta INFONAVIT** (micuenta.infonavit.org.mx)
      y ver: saldo de tu subcuenta de vivienda y **cuántos puntos
      llevas** — **hecho 01/09/2026, ver resultado abajo**
- [ ] Que Fanny revise en el portal de **ISSEMyM** su antigüedad y si
      ya califica para crédito de vivienda
- [ ] Con esos dos números en la mano, platicarlo juntos: **no para
      comprar ya**, sino para saber en qué año serían elegibles y qué
      monto darían combinados
- [ ] Confirmar con RH de Boost Mobile que tus aportaciones INFONAVIT
      se están haciendo (aparece en tu estado de cuenta)

### 📌 Resultado — Mi Cuenta INFONAVIT (01/09/2026)

Diego ya entró al portal. Resultado:

- **Ya alcanza los puntos para ejercer crédito** — la app lo dice
  directo: *"Ya puedes solicitar tu crédito Infonavit."*
- **Saldo actual en la Subcuenta de Vivienda: $26,794.59 MXN.**

Esto es una buena noticia, pero **no cambia el plan** — solo confirma
que el "lado gratis" de la casa (puntos + antigüedad) ya está resuelto
del lado de Diego, mucho antes de lo esperado. Lo que falta para
decidir algo real sigue siendo lo mismo de siempre:

1. **Que Fanny revise su antigüedad en ISSEMyM** — sin ese dato no se
   puede saber cuánto sumarían combinando créditos con "Unamos
   Créditos".
2. **El monto de crédito que de verdad ofrecerían** — tener puntos
   habilita *solicitar*, pero el monto depende del salario registrado,
   no solo del saldo de la subcuenta. Eso se confirma en el simulador
   de crédito dentro del mismo portal (Mi Cuenta INFONAVIT → simulador),
   no hay que adivinarlo 🔎.
3. **La regla de oro sigue de pie**: primero la mudanza y vivir juntos
   (2026), después la boda (2027), y solo entonces evaluar ejercer el
   crédito — elegibilidad no es lo mismo que "es momento de comprar".
   Ejercer el crédito ahora, sin haber vivido juntos ni saber el gasto
   real de pareja, es el riesgo que esta regla existe para evitar.

**Por qué "se siente imposible" y por qué probablemente no lo es:**
comprar una casa de contado con ahorro propio sí es casi imposible con
un sueldo de call center — pero **ese nunca fue el plan**. El plan usa
tres palancas que no dependen de juntar el precio completo en
efectivo: (1) el 5% que tu patrón ya aporta solo, sin que tú metas un
peso extra, (2) los puntos que suben por el simple hecho de seguir
trabajando formal, y (3) sumar el crédito de Fanny al tuyo. Hoy se
confirmó que la palanca 1 y 2 ya están dando resultado antes de lo
previsto. Sigue sin ser "ya, ahorita" — pero el "imposible" de hace un
rato ya no describe bien la situación real.

### 🔑 Recuperar el acceso a Mi Cuenta INFONAVIT (05/09/2026)

Diego no recuerda la contraseña del portal y va a reiniciarla. Los
pasos, para no perder tiempo:

1. Entra a [micuenta.infonavit.org.mx/cambio-contrasenia](https://micuenta.infonavit.org.mx/cambio-contrasenia)
   (o "Olvidé mi contraseña" en la pantalla de acceso).
2. Necesitas tu **NSS (Número de Seguridad Social)** a la mano — viene
   en tu recibo de nómina, en el CFDI que ya está guardado en
   [biblioteca/finanzas/](../biblioteca/finanzas/).
3. Captura el NSS y el captcha; te llega el enlace de restablecimiento
   **al correo registrado**.
4. **Si ya no tienes acceso a ese correo:** se valida identidad por
   teléfono o en un Centro de Servicio Infonavit (CESI). Infonatel:
   **55 9171 5050** (CDMX) o **800 008 3900** (resto del país).

### 📸 La captura de puntos que se perdió

Diego mandó en algún momento una imagen con sus puntos INFONAVIT, pero
esa conversación ya no se encuentra. Lo que **sí quedó registrado** de
esa consulta (01/09/2026) es lo importante:

- ✅ Ya alcanza los puntos para solicitar el crédito.
- 💰 Subcuenta de vivienda: **$26,794.59 MXN**.

Lo que **falta** es el número exacto de puntos y el monto de crédito
que ofrecerían. Cuando recuperes el acceso, vuelve a sacar la captura
y **mándamela en el chat** — con eso guardo la imagen en
`biblioteca/` y lleno los dos huecos de una vez, para no depender de
que una sesión vieja aparezca.

### ▶️ Los 3 pasos, en orden, para cerrar el tema de la casa

| # | Paso | Cuánto cuesta | Estado |
|---|------|----------------|--------|
| 1 | Recuperar acceso a Mi Cuenta INFONAVIT | Gratis, ~10 min | 🔶 En eso estás |
| 2 | Correr el **simulador de crédito** dentro del portal y anotar el monto ofrecido | Gratis, ~15 min | ⬜ Bloqueado por el paso 1 |
| 3 | Que Fanny revise su antigüedad y elegibilidad en **ISSEMyM** | Gratis, ~30 min | ⬜ Sin arrancar |

Con esos tres datos (tus puntos, tu monto, su elegibilidad) se puede
calcular por primera vez **cuánto darían combinados con "Unamos
Créditos"** — que es el número que hoy no existe y sin el cual todo lo
de la casa sigue siendo teoría.

**Recordatorio de la regla de oro:** tener el número no significa
ejercer el crédito. Primero mudanza (2026), luego boda (2027), y solo
entonces se evalúa comprar.

### Regla de oro para no atorarse

**Primero la mudanza (rentar juntos, diciembre 2026), después la
propiedad.** Vivir juntos primero les enseña cuánto gastan realmente
como pareja — ese número es exactamente lo que necesitan para saber qué
mensualidad hipotecaria aguantan sin ahogarse. Comprar antes de saberlo
es cómo la gente termina con una casa que no puede pagar.

---

## 💍👨‍👩‍👧 Plan completo: boda, familia y aprender a mantener una casa (actualizado 01/09/2026)

Diego alineó el horizonte completo con Fanny: **mudanza (2026) → boda
(2027) → casa propia (2028+) → familia**, más una pista aparte
—aprender a mantener una casa— que no espera a ninguna de las otras
tres. Este orden **corrigió una versión anterior** de este archivo que
ponía la boda después de la propiedad; Diego ya tiene año en mente
para la boda (**2027**), así que en realidad va *antes* que la casa,
no después.

### La línea de tiempo real

| Horizonte | Meta | Qué necesita |
|-----------|------|----------------|
| 🔴 2026 (corto, en marcha) | Mudanza con Fanny | Los $12,000/mes ya en marcha — ver [ahorro.md](ahorro.md) |
| 🟡 **2027 (mediano)** | **💍 Boda con Fanny** — prioridad #1 del año | Fondo patrimonial (ver abajo), venta del Chevy si se da a tiempo |
| 🟡 2027 (mediano, después de boda) | Cambio de coche/moto, fondo de emergencia | Lo que sobre tras cubrir la boda |
| 🟢 2028+ (largo) | 🏠 Propiedad con Fanny | Puntos INFONAVIT/ISSEMyM (arranca gratis desde hoy, ver sección de arriba) |
| 🟢 2028+ (largo, después de casa) | 👶 Familia | Boda + casa propia + ingreso más sólido que el actual |
| **Sin horizonte fijo — arranca ya** | 🧰 Aprender a mantener una casa | Nada — no cuesta ni compite con las demás |

### Por qué la boda se adelantó a 2027 (antes que la casa)

Con año fijo (2027), la boda deja de ser "lo que sigue después de la
casa" y pasa a competir de frente por el mismo dinero que ya estaba
reservado para 2027: cambio de coche y fondo de emergencia. **Decisión
de Diego (01/09/2026): la boda es la prioridad #1 de 2027** — el Chevy
se sigue usando (con el ventilador arreglado, ver arriba) el tiempo
que haga falta, y el fondo de emergencia espera a después de la boda,
salvo que la venta del Chevy (~$40,000) alcance para destrabar los
dos sin pelear entre sí.

**Esto no toca el ahorro de la mudanza.** Los $47,000 / $12,000 mensual
de 2026 siguen intocables — la boda se financia con lo que venga
*después* de diciembre 2026, no antes.

### El fondo: uno solo que va creciendo (no se cierra en diciembre)

Diego decidió que, a diferencia del plan original (donde el fondo de
MercadoPago se pensaba como algo que se "cierra" al llegar a los
$47,000), **el mismo fondo patrimonial sigue creciendo después de la
mudanza** y se va repartiendo a la siguiente meta en turno —primero
boda 2027, luego casa 2028+— en vez de abrir y cerrar un fondo nuevo
por cada meta. Implicaciones prácticas:

- El fondo de MercadoPago (liquidez alta) sigue siendo la casa del
  dinero de corto uso; cuando la ventana a la boda se acerque (~2027),
  vale la pena revisar si mover una porción a CETES tiene sentido —
  igual que ya se recomienda para el fondo del Chevy.
- No hay que decidir un monto de boda todavía — cuando Diego y Fanny
  tengan una cifra aproximada, se agrega aquí y en
  [ahorro.md](ahorro.md) como su propia línea dentro del mismo fondo.
- **Pendiente:** definir con Fanny un monto objetivo de boda una vez
  que 2026 esté resuelto — no es urgente todavía, solo queda anotado
  como el siguiente número que hace falta.

### 🧰 Aprender a mantener una casa — arranca ya (elegido: básico del hogar)

A diferencia de boda/casa/familia, esto no espera nada ni cuesta —
Diego eligió empezar por lo **básico del hogar**: plomería ligera,
electricidad segura, y las cosas que se rompen seguido (fugas,
contactos, cerraduras). **No es una 4ª pista activa** — no tiene meta
diaria como el italiano; se aprende cuando algo se rompe o cae un
rato libre, para no repetir el error de meter demasiadas pistas a la
vez (ver [../perfil/rutina.md](../perfil/rutina.md)).

- [ ] Elegir una fuente confiable para lo básico (canal de YouTube o
      guía de mantenimiento del hogar) — sin comprometerse a un curso
      formal todavía
- [ ] Priorizar lo aplicable a la renta de diciembre: qué sí se puede
      resolver uno mismo en un depa rentado (cambiar un empaque, un
      contacto, una cerradura) vs. qué le toca al dueño/administración
- [ ] Sin meta de ritmo — se retoma solo, oportunista

### Cómo se conecta con lo que ya hay armado

- Todo lo de la sección de Propiedad (arriba) sigue igual como el
  primer paso concreto y gratis del horizonte de largo plazo.
- El ahorro de la mudanza ($47,000, ver [ahorro.md](ahorro.md)) sigue
  intocable en 2026 — la boda se paga con dinero de 2027 en adelante.

---

## Resumen de decisiones (31/08/2026)

| Tema | Decisión |
|------|----------|
| 🚗 Chevy | **Arreglado** (05/09/2026) — ventilador y radiador ambos listos, funcionando bien |
| 🔊 Bocinas tipo Beetle | Antojo válido → Fondo cosillas, no meta |
| 🚕 Uber con préstamo | **No ahora** — el Chevy no califica y no hay horas |
| 💳 Fonacot | **No** mientras el cambio de trabajo siga en el horizonte |
| 💳 ISSEMyM (personal) | **No** — pero sí investigar su vía de **vivienda** |
| 🏠 Propiedad | **Sí, como meta de largo plazo** — puntos INFONAVIT de Diego ✅ ya alcanzan (01/09/2026, subcuenta $26,794.59 MXN); falta que Fanny revise ISSEMyM |


===== END FILE: SOURCE/metas/patrimonio.md =====

===== BEGIN FILE: SOURCE/metas/titulacion.md =====

# 🎓 Titulación

**Objetivo:** Terminar el trámite de titulación (FES Aragón, Relaciones Internacionales).
**Fecha límite deseada:** antes de diciembre 2026 (entre más pronto, mejor —
esto desbloquea el resto del año).

## ⏸️ EN PAUSA (05/09/2026) — no hagas el pago todavía

Diego reportó algo importante: **parece que si pasan más de 2 años
desde que egresaste, ya no puedes titularte por promedio.** Mandó un
correo a su profesor/asesor preguntando si esto aplica en su caso y
está esperando respuesta.

**Actualización (09/09/2026):** llegó respuesta de **David García
Contreras, Jefe de Carrera de Relaciones Internacionales**. No es la
respuesta final todavía — dice que van a hacer una consulta interna
con el área correspondiente para saber qué procede en el caso de
Diego, y que avisan en cuanto tengan la información. Sigue en pausa
exactamente igual que antes: no pagar la ficha ni imprimir/firmar
nada mientras no llegue esa segunda respuesta con el resultado real.

**Mientras no llegue esa respuesta:**

- 🚫 **No pagar la ficha de titulación ($620).** Si resulta que la
  modalidad por promedio ya no aplica, esa ficha específica podría no
  servir — sería pagar por un trámite equivocado.
- 🚫 No imprimir/firmar/escanear el ATI y la solicitud tampoco si
  todavía no lo has hecho — esos formatos son específicos de la
  modalidad por promedio; si cambia la modalidad, cambia el papeleo.
- ✅ Lo único que sí toca ahorita es **dar seguimiento al correo** — si
  no hay respuesta en unos días, es válido reenviarlo o llamar
  directamente a la coordinación:
  titulacion.relacionesinternacionales@aragon.unam.mx

**Falta un dato para poder calcular esto con precisión:** ¿en qué
fecha exacta egresaste (terminaste créditos/generación)? Con eso puedo
calcular si de verdad ya pasaron los 2 años o si todavía estás dentro
del plazo — dímelo en cuanto lo tengas a la mano y actualizo esta
sección con el cálculo real en vez de la incertidumbre de ahorita.

**Qué pasa si el profesor confirma que ya no aplica por promedio:**
no se pierde el trabajo hecho (el ATI y la solicitud llenados siguen
sirviendo como referencia), pero el trámite cambiaría de modalidad
(posiblemente a titulación por tesis, por examen general de
conocimientos, u otra que ofrezca la facultad) — eso sí es un cambio
de plan real, no solo un ajuste de fecha. En cuanto tengas la
respuesta, lo replaneamos juntos.

---

*Todo lo de abajo (documentos, checklist, pasos) sigue siendo válido
**si la modalidad por promedio se confirma** — se deja tal cual para
no perder el trabajo ya hecho, pero está en pausa hasta que llegue esa
confirmación.*

Contacto de la carrera: titulacion.relacionesinternacionales@aragon.unam.mx
Sistema de seguimiento: https://seguimientotitulacion.unam.mx/expediente/21179

Tablero: [Titulación.exe](https://claude.ai/code/artifact/ab59366f-ab5f-4bff-835e-348255129efc)

## Documentos

| Documento | Archivo |
|-----------|---------|
| Autorización de Transferencia de Información (ATI) — versión Expediente DGAE | [biblioteca/titulacion/ATI_ExpedienteDGAE.pdf](../biblioteca/titulacion/ATI_ExpedienteDGAE.pdf) |
| Formato de solicitud y elección de título (llenado) | [biblioteca/titulacion/SolicitudTitulo_llenado.pdf](../biblioteca/titulacion/SolicitudTitulo_llenado.pdf) |
| Comprobante de pago | Pendiente — se sube cuando esté armado |
| Formato de no adeudo de bibliotecas | Pendiente de mandar |

## Proceso general (según correo de Daniel Edgar Muñoz Torres)

1. Aprobación, desarrollo y conclusión del trabajo académico — ✅ hecho.
2. Entrega electrónica y física de los documentos — 🔄 en curso (etapa actual).

## Estado de documentos (captura del 04/11/2025)

| # | Documento | Estatus | Observación del sistema |
|---|-----------|---------|--------------------------|
| 1 | Autorización de Transferencia de Información (ATI) | ❌ Rechazado | "Favor de subir el documento corregido" |
| 2 | Formato de solicitud y elección de título | ❌ Rechazado | "Favor de subir el documento corregido" |
| 3 | Comprobante de pago | ❌ Rechazado | "Favor de subir el documento corregido" |
| 4 | Formato de no adeudo de bibliotecas | ✅ Aceptado | — |

El sistema no da el motivo específico del rechazo. Usa el checklist de abajo
(sacado de la guía de llenado oficial) para revisar cada uno antes de resubir.

## Pasos pendientes (retomar solo si se confirma la modalidad por promedio)

- [x] Llenar el ATI (versión "Expediente DGAE") con los datos personales
- [x] Llenar el formato de solicitud y elección de título (Licenciado en Relaciones Internacionales, cuenta 318117676, cartulina imitación pergamino)
- [ ] Imprimir, firmar a mano con tinta negra y escanear: ATI, formato de solicitud. *(En pausa — no lo hagas hasta confirmar la modalidad, ver arriba)*
- [ ] ~~Hacer el pago de la ficha ($620.00)~~ **EN PAUSA — no pagar hasta la respuesta del profesor.** La ficha original vencía el 29/08/2026; cuando se confirme la modalidad, se saca una ficha nueva en SIGEREL.
- [ ] Armar el comprobante de pago (ficha + CEP de BANXICO en un solo PDF, cada uno en su hoja) — *pendiente de que se destrabe lo de arriba*
- [ ] Subir los 3 documentos corregidos al sistema de seguimiento — *pendiente de que se destrabe lo de arriba*

### ⏰ Plan de pago por SPEI (en pausa — guardado para cuando se confirme la modalidad)

El plan decía "pagar el día de pago", pero ese día no hay banco ni
oficinas de FES Aragón abiertas, y tú estás en turno. **La solución es
pagar por transferencia SPEI**, que funciona 24/7 incluido el sábado:

1. Entra a [SIGEREL](https://sigerel.dgae.unam.mx/alumnos/login) desde
   el celular (en el Break 2 o en la noche) y **genera la ficha nueva**.
2. Haz la transferencia SPEI a la CLABE de la ficha. **El concepto debe
   decir exactamente "Pago de título"** — si dice otra cosa, el
   comprobante se rechaza.
3. Descarga el **CEP de BANXICO** de esa transferencia (es el
   comprobante oficial que pide el trámite; solo los pagos hechos en
   ventanilla BBVA Bancomer se salvan de este paso).
4. Al día siguiente (dom 06/09) armas el PDF: ficha en una hoja, CEP en
   otra, **sin empalmarlos**.

Con esto la titulación queda entregada el domingo 06/09 sin necesitar
un solo día hábil de oficina.
- [ ] Confirmar que fueron aceptados / dar seguimiento a la respuesta
- [ ] Una vez los 4 documentos estén "Aceptado", avanzar con la entrega física de la documentación (ver checklist de la carpeta física abajo)

## Checklist de corrección por documento

### 1. Autorización de Transferencia de Información (ATI)
Fuente: https://www.dgae.unam.mx/titulosgrados/registro_titulo_grado_cedula.html

- [ ] Se generan **dos versiones** del documento: "Egresado" (tu acuse) y "Expediente DGAE". **La que se sube a la plataforma de titulación es la versión "Expediente DGAE"** — revisa que no hayas subido por error la copia "Egresado".
- [ ] Nombre completo llenado a mano, iniciando por apellidos (o por nombre), en mayúsculas y minúsculas.
- [ ] Firma **autógrafa con tinta negra** (no digital, no azul).
- [ ] Documento impreso, firmado y escaneado completo (que se vea nítido, sin recortes).

### 2. Formato de solicitud y elección de título
Fuente: https://www.dgae.unam.mx/titulosgrados/recepcion_titulo_grado.html

- [ ] Fecha actual completa (día/mes/año).
- [ ] Leyenda exacta: "Licenciada/o en Relaciones Internacionales".
- [ ] Escuela: "Facultad de Estudios Superiores Aragón".
- [ ] Número de cuenta a **9 dígitos, sin guiones** (si el tuyo tiene 8, agrega un 0 al inicio).
- [ ] Nombre completo iniciando por apellidos, mayúsculas y minúsculas (debe coincidir tal cual con tu acta de nacimiento).
- [ ] **Solo una** casilla marcada para el tipo de título (papel seguridad / cartulina / pergamino piel de cabra) — revisa que no hayas dejado más de una marcada o ninguna.
- [ ] Firma autógrafa con tinta negra.

### 3. Comprobante de pago
Ficha: https://sigerel.dgae.unam.mx/alumnos/login

- [ ] Debe ser **un solo PDF** que incluya: la ficha de pago emitida por la universidad **+** el comprobante de pago (recibo bancario, captura de transferencia, o comprobante BANXICO si fue pago digital — excepto pagos en BBVA Bancomer, que no requieren BANXICO).
- [ ] Ambos documentos deben verse **completos y legibles**, cada uno en su propia hoja — **no los empalmes/sobrepongan**.
- [ ] Si el pago fue por transferencia SPEI, el concepto debía decir "Pago de título".
- [ ] Revisa que el número de cuenta y el monto en la ficha coincidan con el comprobante.

## Paso 6: Integración de la carpeta física de titulación

Una vez aprobados los documentos electrónicos, esto es lo que pide el sistema
para la carpeta física que se entrega a la Dirección de Certificación y
Control Documental de la DGAE (checklist del plantel, marcado con * = obligatorio):

- [ ] Constancia de liberación del servicio social (únicamente la obtenida del sistema DGOAE) *
- [ ] Copia del certificado de licenciatura cerrado con acuse de recibido *
- [ ] Constancia de idioma (si la emite la UNAM, solo copia; si es de otra institución, debe ser original) *
- [ ] Copia del certificado de bachillerato con acuse de recibido (solo si vienes de la ENP o el CCH)
- [ ] Oficio de autorización de modalidad de titulación *
- [ ] Protesta Universitaria de Integridad y Honestidad Académica y Profesional, con firma original *
- [ ] Formato ATI *
- [ ] Formato de solicitud y elección de título *
- [ ] Comprobante de pago por el tipo de título (ficha + comprobante BANXICO si aplica) *
- [ ] Formato de no adeudo de bibliotecas *
- [ ] 4 fotografías según los requisitos del tipo de título elegido *
- [ ] Original del acta de titulación debidamente requisitada *
- [ ] Copia del acta de titulación *

## Notas

- Esta es la meta más urgente porque es la de menor esfuerzo restante y la
  que probablemente destrabe tranquilidad mental para enfocarte en las
  otras dos (trabajo y ahorro).
- Si el sistema vuelve a rechazar algún documento sin motivo claro, escribir
  directamente a titulacion.relacionesinternacionales@aragon.unam.mx pidiendo
  el detalle exacto del rechazo.
- Si en algún punto no sabes qué sigue o te trabas con el papeleo, dilo
  aquí en la conversación — puedo ayudarte a redactar correos, checklist
  de requisitos, etc.


===== END FILE: SOURCE/metas/titulacion.md =====

===== BEGIN FILE: SOURCE/metas/trabajo.md =====

# 💼 Cambio de trabajo — Comercio exterior / Aduanas

**Objetivo:** Salir del trabajo actual hacia uno mejor pagado, idealmente
relacionado con Relaciones Internacionales, con foco en comercio exterior
y aduanas.
**Estado:** ⏸️ **Modo mantenimiento** desde el 31/08/2026 — 2 vacantes aplicadas (SMJ Consulting, NC Recruitment Agency). Actualizado 05/09/2026 con rutas de búsqueda fijas para los 15 min de la comida.

Tablero: [Trabajo.exe](https://claude.ai/code/artifact/fe81e91b-4a6f-4e04-aa6f-8355a64bb136)

## ⏸️ Modo mantenimiento (decisión del 31/08/2026)

Diego decidió **bajar la prioridad** de esta meta para liberar espacio a
titulación y desempeño (ver las 3 reglas en
[../perfil/rutina.md](../perfil/rutina.md)). No se cancela — se pone en
un ritmo mínimo sostenible.

**Qué significa en la práctica:**

| Sí | No |
|----|-----|
| Revisar **1-2 vacantes en la hora de comida**, un par de veces por semana | Bloques largos de búsqueda en los días off |
| Contestar a reclutadores que ya escribieron | Salir a buscar reclutadores nuevos |
| Aplicar si aparece algo **claramente mejor** (sueldo, remoto, o menos traslado) | Aplicar a todo lo que suene decente |
| Mantener LinkedIn con #OpenToWork prendido | Rehacer perfiles y CVs otra vez |

**El criterio para romper el modo mantenimiento:** que una vacante
cumpla al menos dos de estas tres — (1) sube el sueldo de forma clara,
(2) es remota o recorta el traslado de 2h40, (3) el **salario
registrado ante el IMSS** es bueno, no solo el paquete con bonos y
vales. Ese último punto ya no es un detalle: los puntos INFONAVIT para
la meta de propiedad dependen del salario cotizado — ver
[patrimonio.md](patrimonio.md).

**Bonus inesperado de este modo:** la continuidad laboral suma puntos
INFONAVIT. Quedarte en Boost unos meses más mientras se cierra la
titulación y arranca el ahorro **no es tiempo perdido** para la meta de
la casa — es exactamente lo que esa meta necesita.

**Actualización 15/08/2026 — prioridad real:** estás cansado del trabajo
actual y lo urgente es **más dinero y/o remoto**, no necesariamente
comercio exterior específicamente. Comercio exterior sigue como meta de
mediano plazo, pero no es la ruta más rápida a "gano más ya" (ver sección
de ruta rápida abajo) — se corren en paralelo, no es o uno o el otro.

## 🔎 Rutas de búsqueda — actualizado 05/09/2026

Tú dijiste que quieres volver a mirar vacantes. Esto **no rompe el modo
mantenimiento**: son 15 minutos en la comida, no un bloque de la noche.
Lo que cambia es que ahora hay una lista fija de dónde buscar, en vez
de empezar de cero cada vez.

### Las 4 búsquedas guardadas (guárdalas en favoritos del celular)

| Ruta | Dónde | Qué buscar exactamente |
|------|-------|-------------------------|
| 💵 **Remoto pagado en dólares** | [Indeed MX](https://mx.indeed.com/q-trabajo-remoto-espa%C3%B1ol,-pago-en-dolares-empleos.html) · [WeRemoto](https://www.weremoto.com/categoria-de-trabajo/atencion-al-cliente) | "customer success remoto", "bilingual support LatAm", "virtual assistant bilingual" |
| 🖥️ **Salto lateral de CS, mejor empresa** | [Computrabajo](https://mx.computrabajo.com/trabajo-de-customer-success-manager-en-remoto) · [Glassdoor CDMX](https://www.glassdoor.com.mx/Empleo/ciudad-de-m%C3%A9xico-customer-success-empleos-SRCH_IL.0,16_IC5017436_KO17,33.htm) | "customer success", "soporte bilingüe", filtrando **home office** |
| 🌎 **Comercio exterior (la meta de fondo)** | Indeed / OCC / LinkedIn | "auxiliar aduanal", "coordinador de importaciones", "analista de comercio exterior" |
| 🔁 **Lo que ya tienes prendido** | [LinkedIn](https://www.linkedin.com/in/diego-ruiz-elizondo-634b48297) con #OpenToWork | Contestar a reclutadores que escriban, nada más |

*(Estas son las plataformas donde de verdad viven estas vacantes en
México — no te puedo listar puestos concretos aquí porque cambian cada
día y no quiero apuntar una vacante que ya se cerró. Cuando encuentres
una que te lata, mándamela y la analizamos: sueldo real, salario
cotizado ante el IMSS, y si vale romper el modo mantenimiento.)*

### El filtro de 30 segundos (antes de aplicar a nada)

Una vacante vale tu tiempo solo si cumple **2 de estas 3**:

1. 💰 **Sube el sueldo de forma clara** (no "paquete con bonos" — sueldo).
2. 🏠 **Es remota o recorta el traslado de 2h40.**
3. 🧾 **El salario registrado ante el IMSS es bueno**, no solo el
   paquete con vales y fondo de ahorro.

⚠️ El punto 3 pesa más de lo que parece: tus **puntos INFONAVIT y el
monto del crédito de vivienda** dependen del salario cotizado, no del
bruto con bonos — ver [patrimonio.md](patrimonio.md). Una oferta de
"$27,000" que registra $12,000 ante el IMSS te **cuesta** dinero en la
meta de la casa.

### Cuidado con las estafas

- Nunca pagues por capacitación, equipo o "trámite de contratación".
- Nada de CURP, INE o datos bancarios antes de una oferta formal
  **por escrito**.
- Desconfía de procesos que viven solo en WhatsApp.

- [ ] Revisar 1-2 vacantes en la comida, un par de veces por semana
- [ ] Cuando algo pase el filtro de 2 de 3, mandármelo para analizarlo

## El panorama real (para no perder tiempo)

Ser **agente aduanal** en México es una profesión regulada: requiere examen
público del SAT/ANAM, cumplir requisitos específicos (edad, estudios,
experiencia) y obtener una patente. No es algo que se logre en 4 meses, y
está bien — no es la meta de diciembre, es el horizonte a largo plazo.

Lo que sí es alcanzable de aquí a diciembre es **entrar al sector** por una
puerta de acceso más rápida, y desde ahí construir experiencia y contactos.

## Puertas de entrada a explorar

- [ ] Investigar vacantes de **auxiliar aduanal** / asistente en agencias
      aduanales
- [ ] Investigar vacantes de **comercio exterior** en empresas
      importadoras/exportadoras (coordinador de importaciones/exportaciones,
      analista de comercio exterior)
- [ ] Investigar puestos de **logística internacional** (freight forwarders,
      operadores logísticos)
- [ ] Revisar si tu universidad/carrera tiene bolsa de trabajo o contactos
      en el sector
- [ ] Actualizar CV enfocado en RI + interés en comercio exterior — revisado
      15/08/2026, ver checklist de ajustes abajo
- [ ] Preparar LinkedIn con este enfoque y empezar a conectar con gente del
      gremio (agentes aduanales, comercio exterior)

## Vacantes aplicadas (agregado 15/08/2026)

Seguimiento real de a dónde le has entrado — actualízalo cada vez que
apliques a algo, sea comercio exterior o la ruta rápida remota/USD.

| Fecha | Empresa / vacante | Plataforma | Estatus | Notas |
|-------|--------------------|-----------|---------|-------|
| 17/08/2026 | SMJ Consulting (headhunter) — Customer Service Representative, Freight Forwarder ($25-28K MXN, presencial CDMX) | Indeed | **Aplicado** | Match fuerte con el perfil (RI + atención al cliente bilingüe). El requisito de "1 año en customer service o importación marítima" **sí lo cumple** — 2+ años en Boost Mobile es la vía de customer service, no hace falta el sector marítimo específico. CV (con métricas actualizadas) y carta enviados. Precaución: SMJ Consulting sin presencia sólida verificable en LinkedIn — no dar CURP/INE/datos bancarios ni aceptar entrevistas solo por WhatsApp antes de una oferta formal por escrito. |
| 17/08/2026 | NC Recruitment Agency (reclutador Jesse Lopez) — mismo proceso, dos vacantes ofrecidas: primero Travel Reservation Specialist Agent ($34,000 MXN/mes: $21,700 base + bonos, híbrido, Escandón CDMX, aplicado por Indeed) y ahora, 23/08, Customer Service Representative para **American Express** (híbrido, 3 días oficina/2 home, oficinas Av. Patriotismo CDMX) | Indeed → WhatsApp | **Rechazado (por Diego)** | Es el mismo reclutador/agencia, no dos aplicaciones separadas. Oferta vigente (AmEx CSR): hasta $27,200 MXN/mes ($18,100 base + $3,300 vales + $2,300 fondo de ahorro + $1,500 bono inglés + hasta $2,000 bono desempeño). Turnos de 8h entre 6am-12am, lunes a domingo con 2 días de descanso, capacitación de 3 meses con disponibilidad 5am-12am. **31/08/2026: Diego decidió no seguir** — cierra el hilo de NC Recruitment/AmEx. Motivo no registrado; si quieres, dime por qué para dejarlo anotado (te sirve luego para calibrar qué sí buscar en modo mantenimiento). |

Estatus sugeridos: Por aplicar → Aplicado → Entrevista → Oferta / Rechazado.

## Fase 2 (proyecto paralelo, no urgente): idea de automatización

La idea de armar algún tipo de sistema/automatización ligado a importación
y exportación (por ejemplo, para conectar con proveedores) es interesante
como **proyecto de investigación paralelo**, no como plan principal de
diciembre. Cuando quieras, la retomamos como un experimento: qué problema
resolvería, quién lo pagaría, qué tan viable es sin capital ni patente de
agente aduanal todavía.

- [ ] (Pendiente de retomar cuando el trabajo/titulación estén encaminados)

## CV — revisión y ajustes pendientes (15/08/2026)

**Plan (agregado 16/08/2026):** hoy, después del turno, toca actualizar
LinkedIn (headline/about ya redactados) y afinar este CV; aplicar a
vacantes se mueve a mañana 17/08. Ver el día a día en
[../perfil/rutina.md](../perfil/rutina.md) y [Rutina.exe](https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433).

Mandaste tu CV (versión inglés y español) para revisión. Diagnóstico: está
limpio y bien escrito, pero es **genérico** — serviría para cualquier
puesto de oficina. Para comercio exterior/aduanas necesita hablar ese
idioma explícitamente. Lo bueno: el enfoque académico de la carrera
(negocios internacionales, comercio internacional y logística) ya encaja
con la meta, solo está enterrado en una línea de Educación.

**16/08/2026 — revisión de los PDF reales:** mandaste el CV en ESP y ENG.
El borrador editado del 15/08 (resumen reescrito, "Áreas de
conocimiento") **no llegó a estos archivos** — son básicamente la
versión genérica original. Se rehizo el borrador de texto completo, ver
[cv.md](cv.md).

**16/08/2026 — PDF final generado y entregado.** En vez de solo dejar el
texto para que Diego lo pegara a mano en Word, se generó directamente el
CV final en PDF (ESP y ENG, mismo formato del original: nombre centrado,
regla horizontal, dos columnas de habilidades, empresa+fechas alineadas)
y se le mandó por chat. Ajustes aplicados, todos ya en el PDF entregado:

- [x] Subir el enfoque académico a una sección nueva y visible de
      "Áreas de conocimiento" (antes solo estaba en una línea de
      Educación)
- [x] Reescribir el resumen profesional nombrando explícitamente
      comercio exterior / logística internacional / aduanas
- [x] Meter palabras clave ATS: comercio exterior, importación/
      exportación, Incoterms, clasificación arancelaria, logística
      internacional
- [x] Cuantificar Boost Mobile con las cifras reales (Performance Total
      98.9%, FCR 95.9%, ACT 104.2%)
- [x] Ajustar bullets de DIF Tlalnepantla (freelance/flexible) y CIALC
      (los tres frentes reales: material de cátedra, investigación,
      redacción/revisión) — misma descripción que ya se usó en LinkedIn
- [x] Aclarar en las fechas que Boost Mobile, DIF Tlalnepantla y CIALC
      son simultáneos/medio tiempo — **actualizado 17/08/2026** con las
      fechas reales (CIALC sep 2023-may 2025, DIF jun 2025-jul 2026,
      ninguno de los dos sigue activo, ver [cv.md](cv.md))
- [x] Poner el LinkedIn como URL completa
      (`linkedin.com/in/diego-ruiz-elizondo-634b48297`), no solo texto

Pendiente solo de tu parte: revisar el PDF y confirmar que te gusta como
quedó (o pedir ajustes). El texto fuente vive en [cv.md](cv.md) por si
se necesita regenerar.

**Resuelto:** no hay tema de tesis que definir — Diego se titula por
promedio, no por trabajo terminal. Certificación de inglés: no tiene
ninguna todavía, pero tiene confianza en pasar el TOEFL — no es urgente,
queda como posible paso a futuro para respaldar el "Professional
Working Proficiency" con un número real.

## LinkedIn — revisión y ajustes pendientes (16/08/2026)

Revisé tu perfil (linkedin.com/in/diego-ruiz-elizondo-634b48297) a partir de
capturas que mandaste — LinkedIn está bloqueado para acceso directo en este
entorno, igual que pasó con TikTok. Mismo diagnóstico que el CV: bien
escrito, pero genérico, sin optimizar para comercio exterior ni para la
ruta remota/USD.

Lo que ya está bien: #OpenToWork activo, modalidad presencial/híbrido/remoto
marcada, "Acerca de" bien redactado, experiencia en CIALC ya visible como
becario de investigación.

Ajustes concretos pendientes:

- [x] Reescribir el headline para incluir palabras clave que de verdad se
      buscan: "Comercio Exterior", "Bilingüe" y algo de "Remote/Remoto" —
      hecho 16/08/2026
- [x] Meter las mismas palabras clave ATS del CV en el "Acerca de":
      comercio exterior, importación/exportación, Incoterms, clasificación
      arancelaria, logística internacional — y mencionar bilingüe/inglés
      explícitamente — hecho 16/08/2026
- [x] Cuantificar Boost Mobile con los números reales de
      `../desempeno/metricas.md` (Performance Total, FCR, ACT); DIF
      Tlalnepantla y CIALC con la descripción cualitativa aclarada el
      16/08/2026 — hecho
- [ ] Corregir en LinkedIn las fechas de CIALC (dice jun 2023 – feb
      2026; la fecha real, confirmada 17/08/2026 vía Indeed, es
      septiembre 2023 – mayo 2025, ya terminó) y de DIF Tlalnepantla
      (confirmar que diga junio 2025 – julio 2026, también terminado)
- [ ] Agregar sección de **Idiomas** formal (inglés, alemán en curso) en
      vez de dejarlo implícito en el texto
- [ ] Conectar activamente con gente del gremio — agentes aduanales,
      comercio exterior, RI, y reclutadores de trabajo remoto — 37
      contactos es muy poco para que el algoritmo te muestre en búsquedas
- [x] Revisar "Mostrar detalles" de las preferencias de #OpenToWork —
      hecho 16/08/2026: cambiaste "Ubicaciones (en remoto)" de
      Nezahualcóyotl a algo más amplio, y afinaste los **Cargos** (que
      antes eran genéricos: asistente ejecutivo/ejecutivo/administrador)
      hacia títulos de tus dos rutas
- [ ] Uniformar el idioma de la sección Educación (aparece en inglés,
      "International Relations and Affairs", mientras el resto del perfil
      está en español)
- [ ] Aceptar el prompt de LinkedIn de "añadir proyectos" — buen lugar
      para mostrar tu trabajo en CIALC o el CV rehecho
- [ ] **A futuro:** cuando publiques tus artículos de investigación (ver
      sección de abajo), usar la sección **Destacados** para fijarlos en
      la parte de arriba del perfil

## Indeed — perfil (creado 17/08/2026)

Diego creó cuenta en Indeed para aplicar a la vacante de SMJ Consulting.
Perfil casi vacío — se le pasó el texto del Resumen, Experiencia laboral
(Boost Mobile, DIF Tlalnepantla, CIALC) y Habilidades a agregar, mismo
contenido que ya está pulido en [cv.md](cv.md).

- [x] Pegar Resumen — hecho
- [x] Pegar las 3 experiencias laborales — hecho, y de paso Diego
      corrigió las fechas reales de CIALC y DIF Tlalnepantla (ver nota
      abajo y en [cv.md](cv.md))
- [x] Agregar habilidades de comex/bilingüe — hecho: Atención al
      cliente, Bilingüe, Resolución de problemas (más Liderazgo y
      Habilidades de comunicación que ya tenía)
- [x] Revisar "Datos personales" — visible: disponibilidad para viajar
      (Sí), grado de estudios ("Licenciatura incompleta o en curso" —
      coincide con el ajuste de egresado/titulación en trámite que ya
      se hizo en el CV), industria, total de años de experiencia (3)
- **Nota:** el correo de esta cuenta de Indeed es
  `skywalkerdiego13@gmail.com`, distinto al `druizelizondo@gmail.com`
  que usan el CV y LinkedIn — sin resolver si unificarlo o dejarlo así.
- La Escolaridad ya está bien tal cual ("agosto 2020 a Presente") — no
  necesita el mismo ajuste de "egresado/titulación en trámite" que el
  CV porque no reclama que ya terminó.

**Perfil de Indeed: completo.** Solo falta que Diego mande la
solicitud a la vacante de SMJ Consulting con el CV y la carta ya
corregidos.

## Ruta rápida: más dinero y/o remoto (agregado 15/08/2026)

Pregunta: ¿qué se puede conseguir YA con el CV actual, priorizando sueldo
y/o remoto sobre el enfoque específico de comercio exterior? Investigué
rangos de mercado (México, 2026) para calibrar expectativas:

| Ruta | Realista ahora | Sueldo aprox. |
|------|-----------------|-----------------|
| Auxiliar/asistente de comercio exterior (entrada) | Sí, pero es la meta de mediano plazo | $9,000–$18,000 MXN/mes — probablemente **menos** de lo que ganas hoy |
| Coordinador de comercio exterior/logística | No todavía (pide experiencia en el área) | $25,000–$45,000 MXN/mes, pero es el siguiente escalón, no el de entrada |
| Salto lateral a otro CS/soporte bilingüe (mejor empresa, remoto) | Sí, ya | Variable, pero con tu experiencia de casos complejos puedes apuntar arriba del piso de entrada |
| Asistente virtual / soporte operativo remoto para clientes de EU (Virtual Latinos, Belay, Boldly, Athena, Somewhere, Near) | **Sí, la más viable ahora** | $6–20 USD/hora según experiencia; con tu perfil, apuntar a $8–15/hora (~$1,300–2,400 USD/mes, pagado en dólares) |
| Customer Success/Support remoto para empresa de EU en LatAm | Sí, como entrada | ~$16K USD/año de entrada (~$1,300 USD/mes) con crecimiento |
| Coordinador de logística/documentación en forwarder o shared-services (DHL, Kuehne+Nagel, Uber Freight, etc.) | Sí, alineado con la carrera | Similar al salto lateral de CS, pero normalmente presencial/híbrido, no remoto |

**Conclusión:** la ruta más rápida a "gano más y/o trabajo remoto" es
capitalizar lo que ya tienes (bilingüe + atención a casos complejos +
coordinación + investigación/redacción) hacia empleadores que pagan en
USD — asistente virtual/soporte remoto o customer success remoto — no
entrar a comercio exterior por la puerta de abajo, que a corto plazo
puede significar un recorte de sueldo.

**Segundo CV entregado (15/08/2026):** versión enfocada en soporte/
operaciones remotas y compensación en dólares (resalta casos complejos,
coordinación, disponibilidad remota) en vez del ángulo de comercio
exterior/academia. Mismo aviso: llenar los datos en rojo antes de usarlo.

- [ ] Armar perfil en Virtual Latinos / Belay / Boldly / Somewhere / Near
      (agencias de asistentes virtuales bilingües para clientes de EU)
- [ ] Buscar vacantes de "Customer Success Specialist remote LatAm" /
      "Bilingual Support Specialist remote" en LinkedIn, RemoteRocketship,
      We Work Remotely
- [ ] Actualizar LinkedIn para que aparezca "Open to remote work" y el
      huso horario, no solo el enfoque de comercio exterior
- [ ] Cuidado con estafas de "trabajo remoto": nunca pagar por
      capacitación/equipo, desconfiar de ofertas que piden datos
      bancarios antes de una entrevista real

## Camino alterno: academia / investigación (agregado 15/08/2026)

Dijiste que no quieres cerrarte la puerta de la academia — investigación o
una maestría con miras a dar clases. Esto **no compite** con la meta de
diciembre 2026 (conseguir trabajo en comercio exterior): es horizonte de
mediano/largo plazo, y de hecho tu experiencia en CIALC ya es investigación
real que se puede aprovechar en una solicitud de maestría estando ya
empleado. El CV quedó redactado para sostener las dos puertas a la vez, sin
tener que elegir todavía.

- [ ] Explorar programas de maestría afines: Estudios Latinoamericanos,
      Relaciones Internacionales, Estudios sobre América del Norte,
      Economía Internacional, Cooperación Internacional — revisar cuáles
      ofrece la UNAM (posgrado.unam.mx) y otras opciones
- **Actualización (15/08/2026):** confirmaste que **sí quieres explorar
  psicología en serio**, no solo como comentario al aire. Tú mismo
  reconoces dos cosas de frente: implica investigar, aprender y leer
  muchísimo, y tu dificultad de atención le pega directo a eso — no es
  un detalle menor, es algo a planear alrededor, no a ignorar.
- [ ] Investigar qué caminos existen para alguien que ya tiene
      licenciatura en otra área: ¿segunda licenciatura, maestría afín
      que acepte tu perfil, diplomados como puente? Cada uno tiene
      distinto costo de tiempo/dinero — vale la pena compararlos antes
      de decidir.
- [ ] Si decides ir en serio, platicarlo también con tu terapeuta si
      retomas terapia — el tema de la atención es justo algo que un
      profesional te puede ayudar a manejar mientras estudias.
- [ ] Platicar con tu contacto/asesor en CIALC sobre posibilidad de
      extender la colaboración de investigación y pedirle orientación u
      referencia para posgrado
- [ ] Revisar requisitos de admisión típicos (promedio mínimo, examen de
      idioma, carta de exposición de motivos, EXANI-III si aplica) de 1-2
      programas que te llamen la atención
- **Resuelto (16/08/2026):** no aplica tema de tesis — Diego se titula
  por promedio, no por trabajo terminal. Para la maestría, el punto de
  partida sigue siendo tu experiencia real en CIALC, no una tesis.
- **Idea (agregada 16/08/2026):** escribir artículos de investigación
  (comercio exterior / RI) y publicarlos en LinkedIn u otra plataforma.
  Sirve doble: construye presencia profesional para la búsqueda de
  trabajo, y deja evidencia de investigación real de cara a una futura
  maestría. **Secuencia sugerida:** arrancarlo después de tener LinkedIn
  actualizado y las primeras vacantes aplicadas — no antes, para que no
  compita con el tiempo del pago de titulación (más urgente ahora mismo).
  - [ ] Definir 2-3 temas iniciales (comercio exterior, RI, o lo que
        salga de tu experiencia en CIALC)
    - **Primera tanda (19/08/2026, enfoque comercio exterior)** —
      propuesta inicial, pero dijiste que te late más lo social/político:
      1. Nearshoring y México: ¿oportunidad real o promesa sin
         infraestructura?
      2. El T-MEC a mitad de camino: qué está en juego en la revisión
         conjunta de 2026.
      3. Diversificación de socios comerciales en AL y el Caribe: CELAC,
         Alianza del Pacífico y Mercosur en un mundo multipolar.
    - **Segunda tanda (19/08/2026, enfoque social/político/diplomático)**
      — la que más te latió, agrupada por tema:
      - *Político*
        1. Populismo y polarización en América Latina: casos comparados
           (Argentina, Brasil, México) — de dónde viene el patrón.
        2. La crisis de gobernabilidad en Haití: ¿qué papel debe jugar
           la comunidad internacional?
        3. El giro a la derecha en América Latina (2023-2026): ¿fin del
           "ciclo progresista" o reacomodo temporal?
      - *Social*
        1. Migración centroamericana y mexicana hacia EE.UU.: causas
           estructurales más allá de la frontera.
        2. Desigualdad y movilidad social en AL: por qué la región sigue
           siendo la más desigual del mundo.
        3. El papel de la juventud latinoamericana en los movimientos
           sociales recientes (Perú, Colombia, Chile).
      - *Diplomático / geopolítico*
        1. La disputa EE.UU.-China por influencia en AL: préstamos,
           infraestructura y alineamientos.
        2. CELAC vs OEA: la pugna por el liderazgo regional y la
           autonomía diplomática latinoamericana.
        3. Multilateralismo en crisis: lecciones de la diplomacia
           clásica (griega/romana) para el mundo multipolar actual —
           conecta tu interés en civilizaciones antiguas con RI.
      - **Elegido (19/08/2026): "El giro a la derecha en América
        Latina"** — desglose de investigación armado en
        [articulo-giro-derecha.md](articulo-giro-derecha.md).
  - [ ] Publicar el primer artículo

## Notas

- Prioridad: primero conseguir un pie dentro del sector (aunque sea un
  puesto de entrada), después profundizar en la especialización aduanal.
- Podemos usar este espacio para llevar tu lista de vacantes aplicadas,
  entrevistas, y feedback.


===== END FILE: SOURCE/metas/trabajo.md =====

===== BEGIN FILE: SOURCE/metas/tramites.md =====

# 📋 Trámites personales

Trámites y gestiones puntuales (no son "metas" de largo aliento, pero
hay que darles seguimiento hasta cerrarlos).

## 🚗 Licencia de conducir permanente (CDMX)

**Objetivo:** Sacar la licencia permanente tipo A (vehículos particulares)
en la Ciudad de México.
**Costo:** $1,500 (pago único, sin renovaciones).
**Ventaja de sacarla en 2026:** el programa de licencia permanente cierra
el 31/12/2026 — quien la tramite antes de esa fecha conserva vigencia de
por vida. Después de esa fecha no se sabe si va a seguir disponible en
esta modalidad.

### Requisitos

- [ ] Identificación oficial vigente (INE o pasaporte)
- [ ] CURP actualizada (imprimir de https://www.gob.mx/curp)
- [ ] Comprobante de domicilio reciente (no mayor a 3 meses)
- [ ] No tener más de una sanción por el programa "Conduce sin Alcohol"
- [ ] No tener sentencias por delitos viales
- [ ] Si es primera licencia: aprobar el examen teórico de conocimientos
      de conducción y seguridad vial

### Pasos

- [ ] Agendar cita — opciones:
  - Sistema de Citas de SEMOVI en línea
  - Chatbot CDMX: 55 5658 1111
  - Llave CDMX
  - Locatel: 0311
- [ ] Reunir los documentos de la lista de arriba
- [ ] Presentarse a la cita en el macromódulo/módulo SEMOVI, alcaldía o SAF asignado
- [ ] Presentar examen teórico si aplica
- [ ] Pagar los $1,500
- [ ] Recoger la licencia permanente

### Notas

- Confirmar el requisito exacto y el módulo asignado al momento de agendar
  la cita — los requisitos pueden variar ligeramente según la fuente y
  conviene verificar en el sitio oficial de SEMOVI antes de ir.
- Vale la pena agendar la cita pronto: entre más se acerque el cierre del
  programa (31/12/2026), más saturados van a estar los módulos.


===== END FILE: SOURCE/metas/tramites.md =====

===== BEGIN FILE: SOURCE/perfil/amigos.md =====

# 🤝 Amigos y vida social

Espacio distinto a `metas/`: sin checklist ni fecha límite, es contexto
sobre tu vida social — algo que en [intereses.md](intereses.md) quedó
anotado como algo que te gustaría tener más de, no como algo que ya
tengas resuelto.

## Lo que ya sé

- **Sí tienes gente cercana: amigos del trabajo, que ves a diario**
  (confirmado 18/08/2026) — no es un vacío total, es más específico de
  lo que parecía: la vida social fuera del trabajo es la que falta.
- Te gustaría conocer gente, tener amigos, salir a comer, convivir más
  — lo mencionaste como algo que quieres más de, sobre todo fuera del
  trabajo. Ver [intereses.md](intereses.md).
- Tu horario rotativo y el traslado de 2h40 al día son parte del
  problema real: casi no queda tiempo libre entre semana para ver
  gente fuera del trabajo. Ver [rutina.md](rutina.md).

## Amigos

| Nombre | Qué tan cercano | Notas |
|--------|------------------|-------|
| Joe | Amigo | Es barbero — le vas a pedir que te corte el cabello (22/08/2026). Pendiente: avisarle. |

## Compañeros de trabajo

Vacío por ahora — dime nombres y con quién tienes más relación, y lo
voy llenando aquí, igual que hago con la familia de Fanny en
[novia.md](novia.md). Así puedo llevar contexto real (algo que les
esté pasando, un cumpleaños) en vez de tratarlos como un grupo
genérico.

| Nombre | Qué tan cercano | Notas |
|--------|------------------|-------|
| — | — | — |

## Lo que no sé y me serviría saber

- ¿Con quién de tus compañeros de trabajo tienes más relación? ¿Se ven
  también fuera del turno, o es solo ahí?
- ¿Tienes amigos de antes (la prepa, otra etapa) con quienes ya casi
  no hablas, o es más bien que nunca terminaste de construir ese lado?
- Si quisieras trabajar en esto activamente, ¿preferirías retomar
  contacto con gente que ya conoces, o conocer gente nueva?

## Cómo usar esto

- Es un espacio nuevo, casi vacío a propósito — cuéntame lo que
  quieras que quede registrado, al ritmo que tú decidas.


===== END FILE: SOURCE/perfil/amigos.md =====

===== BEGIN FILE: SOURCE/perfil/carros.md =====

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


===== END FILE: SOURCE/perfil/carros.md =====

===== BEGIN FILE: SOURCE/perfil/citas.md =====

# 💌 Ideas de citas con Fanny

Lista armada con lo que sabemos de los dos — ver
[intereses.md](intereses.md) y [novia.md](novia.md). Dime cuáles te
laten, cuáles ya hicieron, y las voy marcando.

## Próxima salida planeada

- **Domingo 13/09/2026, 5:00 pm** — Monumento a la Revolución → Myka
  Greek Frozen Yogurt (Ámsterdam 264-A, Hipódromo) → caminata a
  Metrobús L1 (Campeche/Michoacán) → Buenavista (transbordo) → Villa
  de Aragón → tu mamá los recoge y los lleva a tu casa → noche de
  terror. Ya está en tu calendario ([Calendario.exe](https://claude.ai/code/artifact/8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778)).

  | Tramo | Hora | Notas |
  |---|---|---|
  | Monumento → Myka | 5:00–5:45 pm | Caminando (~3.6 km); alterna: taxi/Uber 15-20 min |
  | En Myka | 5:45–7:15 pm | 1.5 h |
  | Myka → Metrobús | 7:15–7:25 pm | Caminando |
  | Metrobús → Buenavista | 7:25–8:00 pm | Línea 1 |
  | Transbordo en Buenavista | 8:00–8:10 pm | |
  | Buenavista → Villa de Aragón | 8:10–8:55 pm | |
  | Villa de Aragón → casa | 8:55–9:35 pm | En coche con tu mamá, tráfico 8-9 pm |
  | **Llegada estimada** | **~9:35 pm** | |

  **Presupuesto:** Metrobús $24 (2 tramos × 2 personas, con tarjeta) +
  Myka ~$250-300 (2 personas) + extras para la noche de peli ~$100 =
  **~$375-425 MXN total**.

  **Myka:** yogurt griego sabor miel y nuez o vainilla, con granola,
  fresa/mango y un toque de miel o Nutella.

  **Noche de terror en casa (3 opciones, ≤2h, sin gore extremo):**
  *A Quiet Place* (2018, Prime/Max), *The Others* (2001, Max), *Insidious*
  (2010, Netflix/Prime). Tip: luces bajas, palomitas dulces y saladas, y
  una leyenda urbana corta (La Llorona, El Callejón del Beso) antes de
  la peli.

## Para el aniversario (20 de octubre)

- [ ] Cena en un restaurante italiano + zapatos o maquillaje después —
      la idea que ya traías, y conecta con que estás aprendiendo
      italiano
- [ ] Día de spa / masaje para los dos — ella dijo que le relaja que le
      den masaje y cariño, así que es casi un regalo seguro
- [ ] Escapada corta de fin de semana fuera de la ciudad — aprovechas
      que te encanta manejar. **Se intentó del 28-30 de agosto 2026,
      pero se canceló** (falló el Aveo de mamá, sin pérdida de dinero)
      — sigue como idea pendiente de reagendar, ver
      [viaje-cabana.md](viaje-cabana.md)

## Casuales / frecuentes

- [ ] Noche de tacos probando un lugar nuevo (pastor, suadero, tripa)
- [ ] Maratón de *Peaky Blinders* o *Breaking Bad* en casa — las
      comparten
- [ ] Noche de terror con una peli que te guste a ti (ella también
      disfruta las películas, aunque el género sea más tuyo)
- [ ] Cita de videojuegos — arcade bar o quedarse jugando en casa

## Al aire libre

*(tú mismo dijiste que te falta más de esto — buen pretexto)*

- [ ] Caminata/hike cerca de CDMX (Desierto de los Leones, Ajusco)
- [ ] Picnic en Chapultepec
- [ ] Paseo en bici un domingo (Ciclotón/Ecobici)

## Gastronómicas

- [ ] Restaurante italiano — spaghetti/lasaña, algo que te gusta
- [ ] Chilis — ya sabes que te gusta
- [ ] Un lugar de comida saludable/ensaladas que le guste a ella

## Cultura y arte

- [ ] Museo de arte (Soumaya, Tamayo, o alguna expo temporal) — conecta
      con tu interés en arte, pintura y fotografía
- [ ] Revisar cartelera por si hay algo temático de Harry Potter o
      Snoopy en CDMX
- [ ] Revisar si algún artista que les gusta a los dos (Gorillaz, 21
      Pilots, Arctic Monkeys, etc.) tiene fecha en México — además del
      Nescafé Vaivén que ya tienen contemplado

## Con tema compartido

- [ ] Escape room de terror/misterio
- [ ] Noche de trivia de Game of Thrones o Harry Potter

## Historial

| Fecha | Cita | Notas |
|-------|------|-------|
| | | |

## Notas

- Si quieres, te ayudo a buscar fechas/lugares específicos vigentes
  (conciertos, exposiciones) cuando se acerque el momento.


===== END FILE: SOURCE/perfil/citas.md =====

===== BEGIN FILE: SOURCE/perfil/compras.md =====

# 🛒 Cosas para comprar

Lista personal de pendientes de compra — si es algo de la mudanza,
mejor va directo en [../metas/ahorro.md](../metas/ahorro.md). También
como tablero: [Compras.exe](https://claude.ai/code/artifact/ec0c9f2b-ad2e-46fa-9beb-4f00492373c3).

**Regla de oro (22/08/2026):** nada de esta lista toca el fondo
conjunto de $4,800/mes ni la venta del Chevy — esos ya están
comprometidos con la mudanza y el próximo coche. Todo lo de aquí sale
del **Fondo cosillas** (ver abajo) o de dinero suelto de la quincena.

- [ ] Revisar y comprar productos de higiene que se te estén acabando
      (22/08/2026 — dime cuáles en cuanto los revises y los detallo aquí)
      — **23/08/2026: no se compraron hoy, se pasa para mañana 24/08**
      (falta que Diego diga cuáles son exactamente)
- [ ] Mochila **The North Face Borealis** — para reemplazar la que
      usas ahorita (22/08/2026)
- [ ] Artículos de TikTok Shop y Temu — pendiente que le digas a
      Claude cuáles son para detallarlos aquí
- [ ] Chicles, body mist y cable **USB-C a USB-C**
- [ ] Grooming kit y EDC — ver [edc.md](edc.md) para el plan completo
      de qué llevar y qué sacar de la mochila

## Dónde comprar barato

- **Camino al metro desde el trabajo** hay puestos de artículos de
  aseo (chicles, body mist, etc.) y varios negocios de tecnología con
  cables — no son oficiales, pero pueden salir bien de precio. Vale
  la pena revisar ahí antes de comprar en tienda de marca, sobre todo
  para chicles, body mist y el cable USB-C.
- **Ojo con el cable USB-C:** uno genérico barato puede cargar más
  lento o incluso dañar el equipo a la larga si es de mala calidad —
  si el precio es sospechosamente bajo, mejor no arriesgar el
  celular/laptop por ahorrarte unos pesos.

**Aproximado de precio en puesto/tianguis** (referencia, no es precio
exacto — confírmalo ahí mismo):

| Artículo | Estimado |
|----------|----------|
| Chicles | ~$10-20 |
| Body mist | ~$40-80 |
| Cable USB-C a USB-C | ~$40-90 |
| **Total aprox.** | **~$90-190** |

## 💧 Próximo pago (05/09/2026) — lo rápido, no compite con nada

- [ ] Gel / producto para el cabello — se te está acabando (~$150 est.)
- [ ] Corte de pelo con Joe (~$150 est., ajusta al precio real)
- [ ] Perfume azul árabe bueno y versátil (ej. estilo Lattafa) — para
      reemplazar/rotar con YSL Y y Dior Sauvage (~$500-700 est.)

Esto cabe directo en el gasto normal de una quincena (~$800-1,000
entre los tres) — no hace falta esperar a que crezca el Fondo cosillas.

## 🎯 Fondo cosillas — para lo más grande

Idea: aparte del ahorro de la mudanza, separar un poco cada quincena
para estas compras, alimentado sobre todo **cortando lo suelto**
(cigarro suelto, dulces, papas — las "estupideces" de las que hablaste
el 22/08). Meta de arranque: **$700/quincena (~$1,400/mes)**, ajustable
en cuanto un mes completo de Finanzas.exe muestre cuánto realmente
sobra. Se guarda aparte (efectivo/MercadoPago, no mezclado con lo de
Fanny) y se va gastando en orden según lo que alcance:

| # | Cosa | Precio estimado | Con $1,400/mes, tarda | Nota |
|---|------|-------------------|--------------------------|------|
| 1 | 📺 Pantalla 43-50" 4K | ~$6,000-9,000 | ~5-6 meses | La más rápida de lograr |
| 2 | 🎮 PS5 Slim | ~$11,000-13,000 | ~8-9 meses | Revisa Hot Sale / El Buen Fin, bajan bastante ahí |
| 3 | 💻 MacBook Air M4 (13") | ~$20,000-25,000 | ~14-16 meses | La más cara — mejor pagarla con el aguinaldo de diciembre en vez de competir mes a mes con el fondo, sobre todo porque diciembre también es la fecha límite de la mudanza |

Los precios son estimados (agosto 2026, MercadoLibre/Amazon México) —
confirma el precio real antes de comprar, sobre todo si hay oferta.

## 🅿️ Ya definido en otro lado (no repetir aquí)

- Moto Vento o Italika 250cc y el coche nuevo con Fanny (para
  reemplazar el Chevy) — ya tienen su plan en
  [../metas/ahorro.md](../metas/ahorro.md), después de la mudanza.

## Notas

- Si algo aquí es caro o compite con el ahorro de la mudanza, lo
  señalamos y decidimos prioridad juntos.
- El Fondo cosillas es idea nueva (22/08/2026), sin dinero real
  guardado todavía — empieza a registrarlo en Compras.exe o dime
  cuánto vas apartando y lo llevo aquí.


===== END FILE: SOURCE/perfil/compras.md =====

===== BEGIN FILE: SOURCE/perfil/cuarto.md =====

# 🛏️ Organizar el cuarto

Sientes que tu cuarto está un tanto desordenado (22/08/2026) — este
archivo es para armar un plan simple, no una reorganización enorme de
un jalón.

## Por dónde empezar (categorías típicas)

- [ ] Ropa (limpia vs. sucia, doblar/colgar, separar lo que ya no usas)
- [ ] Escritorio/superficie de trabajo
- [ ] Cables y tecnología (cargadores, el cable USB-C nuevo cuando
      llegue, audífonos — ver [compras.md](compras.md))
- [ ] Productos de higiene/grooming (ver [edc.md](edc.md))
- [ ] Papeles/documentos sueltos (cuidado con los de titulación, ver
      [../metas/titulacion.md](../metas/titulacion.md) — esos no se
      tiran ni se pierden)
- [ ] Debajo de la cama / rincones que se acumulan

## Cómo lo vamos a trabajar

- No hace falta hacerlo todo en un día — dime con cuál categoría
  quieres empezar y armamos un plan de 15-30 min para esa sola área.
- Si algo ya no lo usas, considera donar/vender en vez de solo
  moverlo de lugar.

## Notas

- Es un espacio nuevo, casi vacío a propósito — cuéntame qué tan
  desordenado está en realidad (algo puntual o generalizado) y qué te
  gustaría lograr, y lo afino contigo.


===== END FILE: SOURCE/perfil/cuarto.md =====

===== BEGIN FILE: SOURCE/perfil/edc.md =====

# 🎒 EDC y grooming kit

Objetivo (22/08/2026): tu mochila Vans se siente pesada — separar
"lo que sí o sí llevas todos los días" (EDC) de "lo que solo llevas
cuando hace falta" (grooming kit aparte, en una bolsa chica), para
poder eficientar espacio. Va de la mano con cambiar a la mochila
**The North Face Borealis** (ver [compras.md](compras.md)).

## EDC diario — lo esencial, cada día

Con base en lo que ya sabemos de tu rutina
([rutina.md](rutina.md)):

- Cartera (identificación, tarjetas, efectivo)
- Llaves de casa
- Celular + cargador
- Audífonos
- Botella de agua (colapsable, ~600 ml)
- Gafete/credencial de trabajo

## Grooming kit — bolsa aparte, chica y ligera

Idea: un estuche/pouch pequeño con solo tamaños mini, en vez de traer
todo suelto por la mochila. Candidatos para armarlo:

- [ ] Desodorante mini o roll-on de viaje
- [ ] Body mist (por comprar — ver [compras.md](compras.md))
- [ ] Chicles (por comprar — ver [compras.md](compras.md))
- [ ] Perfume en atomizador/mini — de tu YSL Y o Dior Sauvage, para no
      cargar el frasco completo
- [ ] Toallitas húmedas o gel antibacterial mini
- [ ] Hilo dental o mini kit dental
- [ ] Bálsamo labial

## Qué sacar de la mochila (para aligerar)

- Todo lo que no uses a diario, muévelo a "llevar solo si hace falta"
  o a un cajón en casa.
- Cuéntame qué traes ahorita en la Vans, artículo por artículo, y lo
  revisamos juntos para decidir qué se queda en el EDC, qué pasa al
  grooming kit, y qué no necesitas cargar todos los días.

## Notas

- Este archivo está armado con lo que ya sabemos — cuéntame qué más
  cargas en la mochila y lo ajusto.
- Cuando llegue la Borealis, vemos juntos cómo organizar los
  compartimentos — para eso sirve tener EDC y grooming kit separados
  de antemano.


===== END FILE: SOURCE/perfil/edc.md =====

===== BEGIN FILE: SOURCE/perfil/eventos-cercanos.md =====

# 🗺️ Eventos cerca de ti

Distinto a [eventos.md](eventos.md) (que es tus planes ya agendados:
cine, cabaña, Vaivén) — esto es **descubrimiento**: qué hay cerca de
Neza/CDMX que todavía no está en tu radar, para que armes planes
nuevos. Se actualiza cuando pidas "qué hay cerca" o algo similar — no
es automático.

Tablero: [Descubre.exe](https://claude.ai/code/artifact/776e9c82-74b6-4efc-9698-866474be9271)
— dos pestañas: Noticias y Eventos cerca.

## 🎵 Conciertos que podrían interesarte (según tus gustos)

- **Corona Capital 2026** — headliners confirmados: Gorillaz, The
  Strokes, Twenty One Pilots. Ya tienes boletos comprados (ver
  [eventos.md](eventos.md)) — falta solo la fecha exacta y el plan
  logístico.
- **Septiembre 2026 en CDMX** hay ~91 conciertos y 60+ eventos
  confirmados (35 teatro, 22 conciertos, 3 deportes) — entre los más
  esperados: Siddhartha (4 sep, Palacio de los Deportes), 5 Seconds of
  Summer (9/11/12 sep), The Neighbourhood (25 sep, Palacio de los
  Deportes). No coinciden directo con los artistas que más te laten
  (Arctic Monkeys, Interpol, Kendrick Lamar) — esos han tocado antes en
  Corona Capital pero no aparecen confirmados para México en este
  momento; te aviso si aparece algo.

## 🎨 Arte y museos (conecta con tu interés en arte/pintura/historia)

- **Museo Soumaya** — "Colores de identidad": arte, memorabilia
  mundialista y arte popular (Rufino Tamayo, Diego Rivera, Jorge
  González Camarena, entre otros), en Plaza Loreto, Plaza Carso y
  Atrio de San Francisco.
- **Museo Tamayo** — "Tamayo Horizons" (hasta 20 sep) y "For All and my
  Sadness" de Fátima Rodrigo (hasta 27 sep).
- **Museo de Arte Moderno (MAM)** — nueva lectura del acervo con Frida
  Kahlo, Diego Rivera, Siqueiros, Remedios Varo, Tamayo, hasta el 13 de
  septiembre.

## 🌮 Ferias y gastronomía cerca de Neza

- No encontré ferias confirmadas para septiembre 2026 en
  Nezahualcóyotl específicamente (la Feria del Taco Mundialista fue en
  junio, la del Atole y Tamal en enero) — vale la pena revisar el sitio
  del [Ayuntamiento de Neza](https://www.neza.gob.mx) cerca de la fecha
  si quieres algo bien local.

## Notas

- Esto es research puntual (25/08/2026), no una fuente que se actualice
  sola — pide "qué hay cerca" o "busca conciertos/eventos" cuando
  quieras una pasada nueva.
- Si algo de aquí te late, dilo y lo paso a
  [eventos.md](eventos.md)/[citas.md](citas.md) como plan concreto.


===== END FILE: SOURCE/perfil/eventos-cercanos.md =====

===== BEGIN FILE: SOURCE/perfil/eventos.md =====

# 🎪 Eventos

Conciertos, cumpleaños y celebraciones que vienen — con lo que hay
que resolver para cada uno, no solo la fecha. Fuente de las fechas
fijas: [fechas-importantes.md](fechas-importantes.md).

Tablero: [Eventos.exe](https://claude.ai/code/artifact/3775956a-0f71-498c-84cc-6ae882ef24a0)
— línea de tiempo con conteo de días en vivo (mismo mecanismo que los
contadores de Nosotros.exe, Yo.exe y Habilidades.exe). Para verlo como
calendario de verdad (por mes, con los días marcados), está
[Calendario.exe](https://claude.ai/code/artifact/8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778).

## Nescafé Vaivén 2026

- **Fecha:** sábado 17 de octubre de 2026, 3:00 pm.
- **Sede:** Jardines de México, km 129 carretera México-Acapulco,
  Tehuixtla (Tequesquitengo), Morelos.
- **Boletos:** ✅ comprados (09/09/2026) — zona General, $5,784 en 3
  MSI de $1,928.
- **Cae 3 días antes del aniversario** (20/10) — vale la pena
  considerar si conviene estirar el viaje en vez de dos salidas
  separadas, dependiendo del presupuesto y el turno de esa semana.

**Plan completo del viaje** (cartel, transporte, hospedaje, paisaje
cercano, presupuesto, itinerario, consejos del festival y pendientes)
vive en su propio tablero: [Vaivén.exe](https://claude.ai/code/artifact/a99bf33b-8059-4c26-b568-29c6721c3eff)
— se separó de Calendario.exe el 09/09/2026 porque ya no cabía cómodo
ahí. Los checks se guardan en el navegador dentro de ese tablero —
dile a Claude cuando avances algo para que quede reflejado aquí
también.

## 🎬 Cine — CANCELADO (era viernes 28 de agosto 2026, 9:20 pm)

- **Película:** Harry Potter y la Piedra Filosofal — 25 años de magia.
- **Dónde:** Cinepolis Sentura Tlalnepantla, sala 6, asientos K-10 y K-11.
- **Boletos:** ya comprados (21/08/2026), $82.00 total (2 boletos + cargo
  de servicio) — ver [finanzas/gastos.md](../finanzas/gastos.md). Plan
  cancelado (25/08/2026); pendiente confirmar si hay reembolso o el
  gasto se queda como está.

## 🏡 Escapada a cabaña con Fanny — CANCELADA (era viernes 28 a domingo 30 de agosto 2026)

Plan completo y qué pasó vive en [viaje-cabana.md](viaje-cabana.md) —
no se duplica aquí para no desincronizarse. Resumen: se canceló el
29/08 porque falló el Aveo de mamá (el carro que iban a usar); la
cabaña reservada (Vista del Bosque, Villa del Carbón) se pagaba en el
hotel, así que no hubo pérdida de dinero.

## Resto del calendario

Fechas ya cubiertas en [fechas-importantes.md](fechas-importantes.md):
cumpleaños de mamá (20/09), papá (21/09), hermana (04/10), aniversario
con Fanny (20/10), tu cumpleaños (01/12), Navidad/meta de mudanza
(25/12) y cumpleaños de Fanny (20/01).

## Corona Capital (pendiente de planear)

Boletos ya comprados y pagados por completo (21/08/2026): $3,720 en
total, Fanny puso $2,000, tú pagaste el resto ($1,720) desde Santander
— ver [finanzas/gastos.md](../finanzas/gastos.md). Falta fecha exacta,
lineup y el plan completo — dijiste que lo armamos después, avísame
cuando quieras arrancar con esto y le doy el mismo tratamiento que al
Vaivén.

## Notas

- Si se anuncia otro concierto o celebración, dilo aquí en la
  conversación y lo agrego a Eventos.exe con el mismo tratamiento
  (checklist si aplica, presupuesto si aplica).


===== END FILE: SOURCE/perfil/eventos.md =====

===== BEGIN FILE: SOURCE/perfil/familia.md =====

# 👪 Familia

Espacio distinto a `metas/`: sin checklist ni fecha límite, es contexto
sobre tu familia más allá de solo las fechas de cumpleaños — cómo es tu
relación con ellos, y si hay algo pendiente ahí.

## Lo que ya sé

- **Vives con tus papás** actualmente (confirmado 18/08/2026).
- **Mamá** — cumpleaños el 20 de septiembre. Ver
  [fechas-importantes.md](fechas-importantes.md).
- **Papá** — cumpleaños el 21 de septiembre, un día después que tu
  mamá. Ver [fechas-importantes.md](fechas-importantes.md). Le gusta
  mucho el fútbol — es del Cruz Azul — y le gustan los enjambres de
  nuez de Sanborns (09/09/2026).
- **Hermana** — nació el 4 de octubre de 2004. Se llevan muy bien:
  escuchan música juntos y a veces fuman marihuana juntos. Ver
  [intereses.md](intereses.md).

## Lo que no sé y me serviría saber

- ¿Cómo describirías tu relación día a día con tus papás — cercana,
  distante, tensa en algún tema en particular?
- ¿Hay algo pendiente con tu familia ahorita (una conversación que
  falta, algo que arreglar, algo que celebrar)?
- ¿Alguien más en la familia que deba estar aquí (abuelos, tíos,
  primos con quienes tengas relación cercana)?

## Cómo usar esto

- Es un espacio nuevo, casi vacío a propósito — cuéntame lo que
  quieras que quede registrado, al ritmo que tú decidas.


===== END FILE: SOURCE/perfil/familia.md =====

===== BEGIN FILE: SOURCE/perfil/fechas-importantes.md =====

# 📅 Fechas importantes

*Conteos recalculados el **05/09/2026**. Pídeme que los vuelva a
calcular cuando pase tiempo — o mejor, míralos en vivo en
[Calendario.exe](https://claude.ai/code/artifact/8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778),
que los cuenta solo.*

## Lo más próximo (los siguientes 60 días)

| Faltan | Fecha | Qué es | Necesita algo de ti |
|--------|-------|--------|----------------------|
| **Hoy** | 05/09/2026 | ⏸️ Titulación en pausa — esperando respuesta del profesor sobre el límite de 2 años para titularse por promedio | No pagar la ficha todavía — ver [titulacion.md](../metas/titulacion.md) |
| **15 días** | 20/09/2026 | 🎂 Cumpleaños de tu mamá | Regalo/detalle — ver [regalos-familia.md](regalos-familia.md) |
| **16 días** | 21/09/2026 | 🎂 Cumpleaños de tu papá | Regalo/detalle |
| **22 días** | 27/09/2026 | 💳 Corte de la tarjeta MercadoPago ($2,535.96, trae el AT&T) | Sí — dejar el dinero listo |
| **29 días** | 04/10/2026 | 🎂 Cumpleaños de tu hermana (nació en 2004) | Regalo/detalle |
| **42 días** | 17/10/2026 | 🎤 Concierto Nescafé Vaivén | Fecha por confirmar |
| **45 días** | **20/10/2026** | 💜 **Aniversario con Fanny — 2 años** | Sí — plan en [regalos-novia.md](regalos-novia.md) |

## Más adelante

| Faltan | Fecha | Qué es |
|--------|-------|--------|
| 87 días | 01/12/2026 | 🎂 Tu cumpleaños (naciste en 2002) |
| 111 días | 25/12/2026 | 🎄 Navidad — **fecha límite de la mudanza** ([metas/ahorro.md](../metas/ahorro.md)) |
| 137 días | 20/01/2027 | 🎂 Cumpleaños de Fanny |
| 287 días | 19/06/2027 | 🎂 Cumpleaños de las hermanas gemelas de Fanny |
| 2027 | sin fecha | 💍 Boda con Fanny — prioridad #1 de 2027 ([metas/patrimonio.md](../metas/patrimonio.md)) |

## Notas

- Cuéntame las fechas que falten y las agrego, junto con si quieres
  recordatorio con anticipación (para regalos, ver
  [regalos-novia.md](regalos-novia.md) y [regalos-familia.md](regalos-familia.md)).
- Las tres fechas de septiembre-octubre (mamá 20/09, papá 21/09,
  hermana 04/10) caen muy juntas — vale la pena resolverlas de un solo
  golpe en una salida, no una por una.


===== END FILE: SOURCE/perfil/fechas-importantes.md =====

===== BEGIN FILE: SOURCE/perfil/hoy.md =====

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

Última lectura (21/08/2026):
- Casa (Nezahualcóyotl): ~17°C por la mañana con nubes y claros,
  subiendo a ~20°C por la tarde con lluvia débil y cielo cubierto,
  bajando a ~16°C en la noche con lluvia débil, viento SE ~10 km/h.
- Trabajo (Tabacalera/Monumento a la Revolución): ~18°C ahorita,
  parcialmente nublado con lluvia ligera, máxima del día entre
  18–21°C y mínima entre 13–16°C, viento N ~10 km/h.

## Notas

- La fecha/hora y "lo más próximo" en Hoy.exe sí se recalculan solos
  en cada carga (mismo mecanismo que los contadores de días de
  [Nosotros.exe](https://claude.ai/code/artifact/958d66cd-dbca-442a-b286-37994df7026e),
  [Yo.exe](https://claude.ai/code/artifact/f3018b22-33ba-4ddb-bda7-fd0fd8e924bf)
  y [Habilidades.exe](https://claude.ai/code/artifact/3a0ddef9-d6a7-493d-a512-387301f153fa)).
- Si cambia tu casa, tu trabajo o el traslado, dímelo y actualizo este
  archivo y el tablero.

## Brief diario automático (18/08/2026, ajustado 25/08/2026)

Tres check-ins al día, todos los días, vía Routines. Cada uno dispara
una sesión de chat aparte (con notificación a tu teléfono) que **no
aparece en el listado normal de sesiones de Claude** — por eso los
tres, además de mandar el mensaje de chat, republican
[Periódico.exe](https://claude.ai/code/artifact/4169c45b-465f-4ecd-9015-7f76693f3614)
como edición del momento, para que siempre tengas un link fijo al que
volver:

- **5:00 am** — edición matutina: fecha, clima real de casa y trabajo,
  el evento más próximo, lo más urgente pendiente, y el foco de esta
  noche.
- **5:30 pm** — edición vespertina: cómo te fue en el trabajo, el foco
  de la noche, y un aviso si algo está por vencer.
- **8:00 pm** — edición nocturna: qué avanzaste (se registra en
  [logros.md](../logros.md) si aplica), y un vistazo breve a mañana.

Si el ritmo se siente pesado o quieres cambiar horarios/contenido,
dime y lo ajusto.


===== END FILE: SOURCE/perfil/hoy.md =====

===== BEGIN FILE: SOURCE/perfil/intereses.md =====

# 🎯 Gustos e intereses

Espacio distinto a `metas/`: aquí no hay checklist ni fecha límite, es
contexto sobre ti para poder ayudarte con más criterio — qué te gusta, qué
te interesa, qué disfrutas.

## Lo que sé hasta ahora (15/08/2026)

### Carrera y forma de pensar

- **Relaciones Internacionales y comercio exterior** — no es solo un
  objetivo laboral: el enfoque en comercio internacional, negocios
  internacionales y logística fue una elección académica consciente
  dentro de la carrera.
- **Investigación y academia** — disfrutas el trabajo de investigación
  (tu paso por CIALC-UNAM) y no quieres cerrarte la puerta a un camino
  académico: maestría, e incluso dar clases a futuro.
- **Psicólogo — ya no es solo "trabajo soñado", dijiste que sí te
  interesa explorarlo en serio** (15/08/2026). Sabes que implica
  investigar, aprender y leer mucho, y que tu propia dificultad de
  atención es un obstáculo real a considerar, no un detalle menor. Ver
  [../metas/trabajo.md](../metas/trabajo.md).
- **Historia, antiguas civilizaciones y diplomacia** — conecta directo
  con RI; te gusta pensar y conocer curiosidades de distintos países.
  Te laten sobre todo griegos, romanos y culturas mesoamericanas.
- **Construir cosas / sistemas** — te llama la atención la idea de armar
  una automatización para conectar con proveedores de importación y
  exportación.
- **Tecnología** — te llama mucho la atención en general, no solo como
  consumidor (compras tech, Apple).
- **Diseño** — sí te gusta el lado creativo, más allá de usar Canva
  solo como herramienta de trabajo; te gustaría desarrollarlo.
- **Dibujar** y **escribir** — te gustaría dibujar más (tipo sketches),
  y escribes poemas sobre Fanny.

### Filosofía y religión

- No lees mucho, pero disfrutas analizar a fondo lo que sí lees.
- **Existencialismo, absurdismo y estoicismo** — Albert Camus (*El
  Extranjero*; el absurdismo es literalmente su filosofía central),
  *Siddhartha* de Hesse, *1984* de Orwell.
- Leyendo actualmente: *El arte de la guerra* (Sun Tzu), y releyendo
  *Siddhartha*.
- **Budismo y cristianismo** — te interesa conocer distintas religiones
  y formas de ver la vida, más allá de una sola.

### Idiomas

- Inglés (nivel profesional), alemán (aprendiendo).
- Interés en italiano y ruso.

### Música

- Vas a ir al concierto de Nescafé Vaivén.
- Tocas guitarra.
- Géneros que más te laten: rock, pop, hip-hop/rap, indie, reggaetón.
- Arctic Monkeys (*Tranquility Base Hotel &amp; Casino*), Interpol
  (*Turn on the Bright Lights*), Nirvana (*Nevermind*), Kendrick Lamar.
- Todavía te gusta algo de Eminem, aunque ya no lo sigues tanto.
- En repeat ahorita: "Helena Beat", de Foster the People.
- **Su canción con Fanny: "Disco", de Surf Curse.**
- Comparten mucho gusto musical — Kendrick Lamar, Gorillaz, Nirvana. Ver
  [novia.md](novia.md).

### Series y películas

- **Terror y suspenso** como género favorito — historias de terror en
  general, *Prisoners*, *Nocturnal Animals*.
- **Christopher Nolan** — *Tenet*, y *La Odisea* (su próxima película).
- **Stanley Kubrick** y **Michael Mann** (*Heat*) — directores que te
  laten mucho.
- *The Last of Us*, *Seinfeld*, *The Office*, *Better Call Saul*,
  *Shrek*.
- *Dexter* — te quedaste a medias, quieres retomarla.
- *Peaky Blinders* y *Breaking Bad* — también le gustan a Fanny, son
  algo que comparten.

### Manga — Berserk

- Te gusta muchísimo: el estilo del dibujo (Kentaro Miura), el
  personaje (Guts) y la esencia general de la historia.
- Si quieres profundizar (arco favorito, alguna cita, algo puntual),
  dime y lo agrego aquí.

### Arte y estilo

- Arte, pintura, fotografía.
- Relojes y estilo/moda — ropa de etiqueta, formal.
- Perfumes — Dior Sauvage EDP, Guerlain, Versace Eros. Quieres renovar
  tu YSL Y y tu Sauvage; buscando también un perfume azul árabe,
  versátil y barato.
- **Tatuajes** — te gustan muchísimo, y ya tienes varios (confirmado
  15/08/2026):
  - Pecho: pieza tribal/gótica geométrica sobre el esternón, con "alas"
    que se extienden hacia ambos hombros
  - Antebrazo: criatura tipo lobo/venado con cráneo, blackwork oscuro
  - Espalda/hombro: alas grandes tipo tribal, líneas afiladas negras
  - **Antebrazo, mandala de loto/girasol (el rojo) — el único con
    significado**: es un tatuaje en pareja con Fanny — tú tienes el
    relleno, ella el contorno.
  - Antebrazo: ilustración estilo grabado clásico de demonios alados
    con tridentes ascendiendo hacia un sol
  - Si te haces uno nuevo o quieres agregar más significado, dime y lo
    sumo aquí.
- Navajas — Victorinox y los stilettos.

### Comida y bebida

- Carne y cortes, pan de ajo, spaghetti, lasaña.
- Tacos de tripa, de pastor, de suadero, birria, caldo de gallina.
- Chilis (restaurante).
- Tomas alcohol, aunque no es lo tuyo particularmente — lo que sí te
  gusta mucho: **piña colada**.
- **Alergia:** a algún medicamento (sin especificar todavía cuál — si
  quieres, dime el nombre y lo dejo preciso, es dato de seguridad, no
  solo trivia).

### Viajes

- No has salido del país todavía.
- Te gustaría conocer algún país de Europa, y también Asia, Rusia y
  Estados Unidos.
- Destinos soñados específicos: Nueva York, Noruega y Japón.

### Manejar

- Te gusta muchísimo manejar, y rápido.
- Quieres cambiar el Chevy por una moto o un carro para tener con
  Fanny — traes en mente una Vento o Italika 250cc (ver
  [../metas/ahorro.md](../metas/ahorro.md) — próxima meta después de
  la mudanza).

### Otros

- Videojuegos — favoritos: *Red Dead Redemption 2*, *The Last of Us*,
  *God of War*, *Silent Hill*. Ahorita jugando el remake de *Silent
  Hill 2* (Bloober Team, 2024). Se nota el patrón con tu gusto por
  terror/suspenso e historias narrativas fuertes.
- Comida que nunca falla: pizza, hamburguesa, algún corte de carne.
- Preferencias rápidas: café sobre té, montaña sobre playa, te gustan
  tanto las mañanas como las noches, invierno sobre verano.
- Vida social — conocer gente, tener amigos, salir a comer, convivir.
- Aire libre — te gustaría hacer más actividades (es algo que te falta,
  no que ya hagas mucho).
- Marihuana — la consumes, a veces con tu hermana.
- No practicas ningún deporte actualmente, pero te gustaría empezar —
  te encantaría el box (aunque usas lentes, lo cual complica), y estás
  considerando tenis o squash como alternativa. Sigues explorando cuál.
- No sigues ningún equipo de fútbol.

### Tu hermana

- Nació el 4 de octubre de 2004.
- Se llevan muy bien — escuchan música y fuman marihuana juntos.

### Tu proyecto de vida en pareja

- La mudanza con Fanny y el ahorro conjunto son una prioridad real para
  ti, no solo un tema de dinero.
- Te gusta escribirle y contarle lo que sientes — es parte de cómo
  expresas cariño.
- Estar con ella es, en tus palabras, lo que más disfrutas de todo.
- Están perdidamente enamorados. Ver [novia.md](novia.md) para todo lo
  suyo.

## Notas personales (para ayudarte mejor)

- Sientes que te cuesta recordar las cosas — por eso este espacio te
  sirve; trato de dejar todo registrado para que no dependa de tu
  memoria.
- Te percibes como alguien inteligente en muchos aspectos, y también
  mencionas (medio en broma, 20/08/2026) que sientes que tienes
  "bastantes situaciones mentales" — lo dejo anotado en tus palabras,
  conecta con lo que ya está en [salud.md](salud.md) sobre atención,
  ansiedad y la posible TLP mencionada en terapia.
- Me contaste que sientes que tienes problemas de atención, y que en
  algún momento de terapia se mencionó la posibilidad de TLP y
  ansiedad. Lo dejo anotado tal cual me lo compartiste — no es un
  diagnóstico ni yo puedo darte uno, es contexto tuyo para que, si
  algún día quieres retomarlo con un profesional, lo tengas a la mano
  aquí.
- Ahorita ya no estás yendo a terapia (confirmado 15/08/2026).

## Cómo usar esto

- Es un borrador inicial armado con lo que hemos platicado — seguramente
  falta mucho: comida, deportes, series/películas, qué haces en tu
  tiempo libre, etc.
- Cuéntame de eso cuando quieras y lo voy agregando aquí, igual que con
  `metas/`.


===== END FILE: SOURCE/perfil/intereses.md =====

===== BEGIN FILE: SOURCE/perfil/noticias.md =====

# 📰 Noticias — sistema de perspectivas

Registro vivo de noticias y análisis político, con una etiqueta de
perspectiva en cada fuente para que puedas leer sabiendo desde dónde
habla cada quien. Se actualiza en automático en los triggers del día
(vía Periódico.exe) y a fondo en Descubre.exe, el hub dedicado.

## Tus temas fijos (15/08/2026, confirmados 31/08/2026)

- Ambiente internacional / geopolítica
- Temas políticos y sociales (México y América Latina)
- Temas importantes en México — gobierno de Sheinbaum, oposición,
  Congreso
- Temas de tu área (RI / comercio exterior)

## Sistema de perspectivas (etiquetas)

Cada nota trae una etiqueta de color que indica de dónde viene la voz,
no si es "verdad" o "mentira" — cruza varias antes de sacar una
conclusión:

| Etiqueta | Qué significa | Ejemplos |
|----------|----------------|----------|
| 🟥 **Alternativa/Izquierda** | Medios con línea editorial de izquierda o alternativa al mainstream occidental. **RT es medio estatal ruso** — en varios países está restringido por desinformación; lo incluyo porque lo pediste, pero contrástalo siempre con otra fuente antes de tomarlo como hecho. | RT en Español, La Jornada |
| ⬜ **Generalista/Agencia** | Cobertura de hechos con más pretensión de neutralidad — agencias y prensa de referencia. | Reuters, AP, Excélsior (nota informativa), Infobae |
| 🟨 **Oposición/Análisis** | Voces críticas al gobierno en turno, columnas y consultoras de centro-derecha. | Electoralia, La Silla Rota, El Economista (opinión) |
| 🟪 **Experto/Académico** | Análisis de especialistas, think tanks, papers — para el ángulo de fondo, no solo la coyuntura. | Integralia Consultores, El Colegio de México, Wilson Center |

## Registro (31/08/2026)

| Perspectiva | Nota | Resumen | Fuente |
|---|---|---|---|
| ⬜ | Gobernadora interina en Sinaloa | Graciela Domínguez fue elegida gobernadora interina de Sinaloa con respaldo de la presidenta Sheinbaum. | [Frentes Políticos 29/08 — Excélsior](https://www.excelsior.com.mx/opinion/frentes-politicos-29-agosto-2026) |
| ⬜ | Recuperación de activos ligados a García Luna | El gobierno recuperó 5.8 millones de dólares de 12 propiedades en Florida vinculadas a García Luna y la familia Weinberg. | [Frentes Políticos 29/08 — Excélsior](https://www.excelsior.com.mx/opinion/frentes-politicos-29-agosto-2026) |
| 🟥 | Reforma contra la doble nacionalidad en la presidencia | Sheinbaum impulsa cerrar la puerta a la doble nacionalidad para quien aspire a gobernar el país (y eventualmente las gubernaturas). | [La Jornada — Alerta temprana, 28/08](https://www.jornada.com.mx/2026/08/28/politica/014a1pol?partner=rss) |
| 🟨 | La oposición sigue sin reaccionar | Tras las elecciones de junio, PAN/PRI/MC se ven estáticos y desestructurados; su ventana real es 2027, no una confrontación nacional inmediata. | [Electoralia — La Oposición Política en México](https://electoralia.com.mx/la-oposicion-politica-en-mexico/) |
| 🟪 | 2027 como referendo sobre Sheinbaum | El próximo ciclo electoral se lee como plebiscito de los primeros 3 años de gobierno; a la oposición le basta recuperar algunas gubernaturas, no ganar la presidencia. | [Integralia Consultores — Diez riesgos políticos 2026 (PDF)](https://integralia.com.mx/web/wp-content/uploads/2026/01/Integralia-Consultores_Diez-riesgos-politicos-para-2026-08ENE26-VF-2.pdf) |
| 🟥 | Cobertura internacional del día | Tensión EE.UU.–Irán, ataques rusos a infraestructura militar ucraniana y nueva escalada Israel–Líbano, cubiertos desde la óptica de RT. | [RT en Español — Actualidad internacional](https://actualidad.rt.com/actualidad) |

## Notas

- El registro de arriba se refresca en cada corrida del trigger de
  Periódico.exe (mañana) — trae 1-2 notas frescas de al menos dos
  perspectivas distintas, nunca solo una.
- Si quieres profundizar en un tema específico fuera del ciclo
  automático, pide "dame las noticias de [tema]" y te las traigo aparte.
- El detalle completo con más notas vive en **Descubre.exe** — este
  archivo guarda solo el resumen más reciente para no duplicar de más.


===== END FILE: SOURCE/perfil/noticias.md =====

===== BEGIN FILE: SOURCE/perfil/novia.md =====

# 💜 Fanny

**Nació:** 2001
**Casa de Hogwarts:** Ravenclaw
**Cumpleaños:** 20 de enero
**Aniversario como pareja:** 20 de octubre — cumplen 2 años el 20/10/2026
**Profesión:** Doctora (todavía sin especialidad definida)

Ver fechas con cuenta regresiva en
[fechas-importantes.md](fechas-importantes.md) e ideas de regalo en
[regalos-novia.md](regalos-novia.md).

## Cómo se conocieron

Se conocieron en la prepa — ella era su crush. Compartían la misma clase
de música. Diego describe la relación como sumamente intensa, en todos
los aspectos, y le gusta mucho escribirle y contarle lo que siente.

## Música

- Joji
- Gorillaz
- 21 Pilots
- Olivia Rodrigo
- **Su canción con Diego: "Disco", de Surf Curse.**
- Comparten mucho gusto musical con Diego — Kendrick Lamar, Gorillaz,
  Nirvana.

## Series y películas

- Game of Thrones
- *That 70s Show* — su sitcom favorita
- *Community*
- *Inglourious Basterds*
- Le encantan las películas y series en general
- *Peaky Blinders* y *Breaking Bad* — le gustan a los dos, algo que
  comparten con Diego

## Fandoms

- Harry Potter — le fascina, incluyendo fanfics relacionados
- Snoopy

## Familia

- Tiene dos hermanas menores, gemelas entre ellas — cumplen el 19 de
  junio.

## Mascota

- Tiene una perrita llamada **Tris**.

## Tatuaje en pareja

- Tiene un tatuaje a juego con Diego — mandala de loto/girasol: ella
  el contorno, Diego el relleno. Es el único de los tatuajes de Diego
  con un significado.

## Comida y bebida

- Le gusta comer sano, las ensaladas.
- También le gustan mucho los tacos.
- Le gusta el café y la cerveza.

## Cuidado personal

- Skincare, cuidado de cabello, cuerpo y salud en general
- Maquillaje
- Gimnasio
- Marcas que usa: Elf, Cerave, Dior

## Tallas

- Calzado: 4 (MX)
- Ropa: M

## Bienestar

- Le estresa: el trabajo, el dinero.
- Le relaja: que le den masaje y cariño.
- Cómo le gusta recibir cariño: que tengas detalles con ella, que le
  digas cosas (palabras), y contacto físico (que la acaricies).

## Notas

- Están perdidamente enamorados — no es solo un dato, es lo que más te
  importa ahora mismo, y vale la pena que este archivo lo refleje.
- La foto de los dos (evento formal, 15/08/2026) ya está incorporada en
  el dossier visual [Nosotros.exe](https://claude.ai/code/artifact/958d66cd-dbca-442a-b286-37994df7026e).
- Este archivo es un borrador armado con lo que me has contado —
  cuéntame más cuando quieras y lo voy sumando.


===== END FILE: SOURCE/perfil/novia.md =====

===== BEGIN FILE: SOURCE/perfil/regalos-familia.md =====

# 🎁 Ideas de regalos — familia

Regalos para los cumpleaños de tus papás y tu hermana. Ver fechas en
[fechas-importantes.md](fechas-importantes.md) y contexto de la
relación en [familia.md](familia.md).

**Intención (22/08/2026):** un regalo memorable en cada caso — algo
con alma y significado, más algo material bueno y de buen gusto — con
la personalidad de cada quien.

## Próximas fechas

- **20 de septiembre** — Cumpleaños de tu mamá
- **21 de septiembre** — Cumpleaños de tu papá (un día después)
- **4 de octubre** — Cumpleaños de tu hermana

## Mamá — 20 de septiembre

- **Material:** ella ya pidió **un abrigo** (09/09/2026) — dirección
  confirmada, solo falta cerrar detalles: ¿qué presupuesto manejas?
  ¿conoces su talla y el color/estilo que usa más (básico/neutro vs.
  algo con más personalidad)? Con eso ya se puede buscar opciones
  concretas.
- **Con significado:** para que no se quede solo en "el abrigo", una
  idea barata de combinar: una carta corta a mano metida en el
  bolsillo o una foto de ambos junto con el regalo — cuéntame si
  quieres que te ayude a armar el texto.

## Papá — 21 de septiembre

Es del **Cruz Azul** y le gustan los **enjambres de nuez de Sanborns**
(confirmado 09/09/2026).

- **Material:** algo de Cruz Azul (jersey oficial, gorra, taza o
  bufanda) — dime tu presupuesto y si prefieres algo oficial de tienda
  de la Liga MX o algo más informal/genérico del equipo.
- **Con significado:** combínalo con una caja de enjambres de nuez de
  Sanborns como parte del detalle — sencillo, pero es justo su antojo,
  no un genérico.

## Hermana — 4 de octubre

- Se llevan muy bien, escuchan música juntos — ver
  [intereses.md](intereses.md). Eso ya es una pista fuerte: algo
  ligado a un artista o disco que compartan, o una experiencia
  musical juntos, puede ser el regalo "con alma".
- **Material:** por definir — dime sus gustos actuales.

## Historial de regalos

| Fecha | Ocasión | Regalo | Notas |
|-------|---------|--------|-------|
| | | | |

## Notas

- Este archivo está armado a propósito con huecos — cuéntame los
  gustos de cada quien (mamá, papá, hermana) según tengas tiempo y los
  voy llenando, para llegar a cada fecha con una idea concreta y no
  solo genérica.
- Si algún regalo compite con el fondo de la mudanza, lo cruzamos con
  [../metas/ahorro.md](../metas/ahorro.md) antes de decidir.


===== END FILE: SOURCE/perfil/regalos-familia.md =====

===== BEGIN FILE: SOURCE/perfil/regalos-novia.md =====

# 🎁 Ideas de regalos — tu novia

Espacio para juntar ideas de regalo, ligado a fechas importantes (ver
[fechas-importantes.md](fechas-importantes.md)) y al presupuesto
disponible (ver [../metas/ahorro.md](../metas/ahorro.md)). Sus gustos
completos están en [novia.md](novia.md).

Próxima fecha: **aniversario, 20 de octubre** (2 años) — faltan **45 días** al 05/09/2026.

**Presupuesto:** no te importa gastar algo considerable con tal de que
le guste. Idea que ya tienes en mente para el aniversario: una comida
+ unos zapatos o algo de maquillaje.

## 🎁 Detalle de ahora — el kit de papel + el libro (05/09/2026)

**Lo que pediste:** un detallito ya, sin gastar mucho, pero que
signifique. Una carta escrita a mano, sobre algo bonito.

**Lo que se armó:** un **kit imprimible de 4 piezas**, diseñado a la
medida de sus gustos (Snoopy, Twenty One Pilots, Joji, Game of Thrones,
The Walking Dead) y de que es doctora. Tú lo imprimes y lo escribes a
mano — el diseño es el envoltorio, las palabras son tuyas.

**Se completó con un regalo real:** compraste *The Handmaid's Tale* +
*The Testaments* (Margaret Atwood) — el separador del kit ahora tiene
para dónde ir.

Tablero/imprimible: **[Kit para Fanny](https://claude.ai/code/artifact/9141d18a-8ce1-4279-afe0-362e57c24ce9)**
— actualizado 06/09/2026: revisión de diseño a pedido tuyo — los
dibujitos que se sentían muy geométricos (el disco de vinil y la
brújula, que eran círculos perfectos de compás) ahora están dibujados
a mano como el resto del set, y se corrigió un desbordamiento real en
la segunda hoja donde el separador se encimaba con la tarjetita del
libro. Sigue con la paleta rosa, el separador con detalles de doctora
(estetoscopio con corazón, curita, pastillita, cruz médica, huellita
de Tris, moño) y la **tarjetita ex libris** para meter en el libro
("Este libro es de Fanny"). El botón de imprimir abre el diálogo de tu
navegador para guardar como PDF — **si quieres el PDF exacto sin pasar
por ahí, pídemelo en el chat y te lo mando directo**, siempre
actualizado.

| Pieza | Qué es | Para qué |
|-------|--------|----------|
| ✉️ **Hoja de carta** | Papel de carta con marco ilustrado y renglones guía | La carta escrita a mano |
| 🔖 **Separador de libros** | Marcapáginas con línea de electro y la constelación de ustedes dos | Que lo use a diario en sus libros y fanfics — se acuerda de ti sin que estés |
| 💊 **Receta médica** | Tarjetita tipo receta: "Rx: 2 abrazos cada 8 h, por tiempo indefinido" | El chiste interno de que es doctora. Es la pieza que la va a hacer reír |
| 📚 **Tarjetita ex libris** | Placa "Este libro es de Fanny · De: ___" + espacio para una notita corta | Se mete en *The Handmaid's Tale* / *The Testaments* — el regalo del libro y el del papel quedan conectados |

### Cuánto cuesta

| Concepto | Costo |
|----------|-------|
| Impresión a color en papel grueso (opalina/cartulina), 2 hojas | $20 – $60 |
| Sobre bonito (papelería) | $10 – $30 |
| *(Opcional)* algo chico que acompañe: café de especialidad, una flor, su snack | $80 – $200 |
| **Total** | **$30 – $290** |

**No compite con el ahorro de la mudanza ni con el regalo del
aniversario** — ese sigue siendo aparte, el 20/10 (faltan 45 días).

### 📖 Forrar los libros — recomendaciones

Querías forrar *The Handmaid's Tale* y *The Testaments* antes de
dárselos. Depende de qué buscas:

| Opción | Cómo se ve | Dónde/costo |
|--------|------------|-------------|
| **Forro transparente adhesivo** (el clásico "forro de libros") | Protege el libro pero se sigue viendo la portada original — buena opción si la portada ya es bonita | Papelería, $15–35 por libro |
| **Papel kraft + algo escrito/dibujado a mano** | Oculta la portada y la reemplaza con algo tuyo — combina bien con el estilo hecho-a-mano del resto del regalo | Kraft ~$10–20 el pliego (alcanza para varios libros), gratis si ya tienes plumones |
| **Forro de tela o vinil de patrón** | Más durable, se ve más "de colección" | Papelerías grandes o Amazon/Mercado Libre, $40–90 por libro |
| **Forro rojo liso** (nod al mood de *The Handmaid's Tale*, sin ser literal) | Un solo color rojo/vino, sobrio, conecta con el libro sin poner imágenes explícitas de la serie | Cualquier papel/tela roja que tengas, o forro liso de papelería |

**Sugerencia concreta:** si quieres que se sienta parte del mismo
regalo que el Recetario, el kraft + algo escrito a mano es lo más
consistente — mismo espíritu de "yo lo hice para ti" que la carta. El
forro transparente es la opción segura si no quieres arriesgar que se
vea torcido.

**Sobre la tarjetita que ya armé:** ya no tienes que diseñar una desde
cero — la ex libris del kit (arriba) ya cubre eso. Si prefieres algo
más simple, una notita de papel doblada dentro de la primera página
también funciona perfecto — no todo tiene que ser elaborado.

### 🛍️ Qué comprar para acompañarlo (opcional, barato)

Preguntaste qué comprarle de acompañamiento — algo sencillo y bonito,
sin gastar de más. Opciones concretas, de sus gustos reales
([novia.md](novia.md)):

| Opción | Por qué | Costo aprox. |
|--------|---------|--------------|
| 🐶 **Algo chiquito de Snoopy** (llavero, sticker, figura pequeña) | Es su fandom más "de peluche" — se consigue fácil en tiendas de regalos o Miniso | $50 – $150 |
| 🧴 **Un básico de Elf o Cerave** (labial, mascarilla, crema chica) | Marcas que ya usa — no falla, y es de su rutina diaria de skincare | $80 – $180 |
| ☕ **Su café o cerveza favorita** + algo dulce | Combina bien con leer la carta juntos, en su próxima cita | $60 – $150 |
| 🌻 **Una flor sola o un ramo chico** (no tiene que ser rosas) | Clásico, funciona siempre, y remata bien el sobre de papel | $50 – $120 |
| 📖 **Algo de Harry Potter chiquito** (marcapáginas de Ravenclaw, pin del águila) | Es Ravenclaw y le fascina el fandom — un detalle de casa siempre pega | $70 – $150 |

**Recomendación:** elige solo **uno**, no los cinco — el Recetario ya
es el regalo; esto es el acompañante. El café/cerveza + el sobre es
probablemente lo más fácil de conseguir hoy mismo si sales del trabajo
a las 4pm y la ves después.

### Qué escribirle (guion, no texto para copiar)

Tú escribes mejor que yo lo que sientes por ella — eso ya está en
[novia.md](novia.md). Esto es solo el esqueleto para que no te
quedes viendo la hoja en blanco:

1. **Un momento específico, no un adjetivo.** No "eres increíble",
   sino *el día que…*. El detalle concreto es lo que se recuerda.
2. **Algo que solo ustedes dos entiendan.** El tatuaje del mandala,
   "Disco" de Surf Curse, la clase de música de la prepa, Tris.
3. **Algo que hayas notado de ella últimamente** — que le estresa el
   trabajo y el dinero (está en [novia.md](novia.md)). Nombrarlo y
   decirle que lo ves vale más que cualquier cumplido genérico.
4. **Una promesa chiquita y cumplible**, no una grande y vaga. Las
   metas grandes (mudanza, boda) ya están en el sistema; aquí va algo
   de esta semana.
5. **Cierre corto.** Una línea. Las cartas largas se leen una vez;
   las que cierran bien se releen.

⚠️ **No la escribas en el celular y la copies.** Escríbela directo
sobre la hoja, con errores y todo — es justamente lo que la hace valer.

### Notas del diseño

Los dibujos del kit son **ilustración original** hecha a la medida
(línea, no personajes con copyright): una casita de perro con su pájaro,
electro/estetoscopio, un lobo y un cuervo de invierno, una brújula,
notas y un vinilo. Son guiños a lo que le gusta, no calcas de los
personajes — se ve mejor impreso y no es un póster genérico bajado de
internet.

---

## Regalos en puerta (22/08/2026)

Ya decidido, faltan detalles de dónde/cuándo comprar:

- **Kindle** — para lo mucho que lee/le gustan los fanfics y los
  libros.
- **Edición especial de un fanfic de Harry Potter que le gusta** —
  falta confirmar cuál exactamente y buscar la edición.
- **Battle Royale** — reponer su copia, que se maltrató por accidente
  tuyo.
- Le laten mucho **Los juegos del hambre**, así que una edición
  especial o algo temático de esa saga también es buena opción.
- ***Daisy Jones & the Six* (Taylor Jenkins Reid)** — conecta con que
  es amante de la música, las series y las películas (hay
  adaptación en serie).

## Ideas actuales (borrador, 15/08/2026)

Ideas de arranque según sus gustos — dime cuáles te laten para
investigarlas a fondo (tallas, marca, dónde comprar):

- **Música (Joji, Gorillaz, 21 Pilots, Olivia Rodrigo):** vinyl de su
  disco favorito, boleto si algún artista tiene fecha en México,
  playlist curada + algo físico que la acompañe
- **Snoopy:** peluche/figura de colección, joyería con motivo Snoopy
  (en **plata**, es lo que más le gusta), algo de cocina/casa con
  estampado (para cuando se muden)
- **Game of Thrones:** joyería con sigilo de casa (plata), edición
  especial de los libros, arte/print
- **Harry Potter (+ fanfics), es Ravenclaw:** joyería/pin del águila de
  Ravenclaw (plata), bufanda o playera de la casa, réplica de varita,
  edición ilustrada de un libro
- **Tris (su perrita):** algo temático de ella — collar grabado,
  foto/ilustración de Tris, accesorio para la perrita
- **Skincare / maquillaje (usa Elf, Cerave, Dior):** algo de Dior es la
  opción con más "peso" para un regalo especial (perfume o set de
  maquillaje); Elf/Cerave para detalles más chicos
- **Gimnasio:** ropa deportiva (talla M), tenis/accesorio — calza 4 (MX)
  si es calzado
- **Como doctora:** algo práctico para el trabajo (bata bordada,
  accesorio de calidad) o algo de autocuidado para después de un
  turno pesado — conecta con que le relaja que le den masaje/cariño:
  un masaje profesional o kit de spa en casa es buena opción segura

## Historial de regalos

| Fecha | Ocasión | Regalo | Notas |
|-------|---------|--------|-------|
| 05/09/2026 | Detalle sin motivo | *The Handmaid's Tale* + *The Testaments* (Margaret Atwood) — libro que quería desde hace tiempo | Va junto con el [Recetario para Fanny](https://claude.ai/code/artifact/9141d18a-8ce1-4279-afe0-362e57c24ce9): el separador se usa en este libro, y hay una tarjetita ex libris para meter adentro |

## Notas

- Si un regalo compite con el fondo de la mudanza, lo cruzamos con
  `metas/ahorro.md` antes de decidir, para no descarrilar el plan.


===== END FILE: SOURCE/perfil/regalos-novia.md =====

===== BEGIN FILE: SOURCE/perfil/relaciones.md =====

# 🕸️ Red de relaciones

Mapa simple de tu gente — quién es quién y qué tan cerca, en un solo
lugar. El detalle completo de cada quien vive en su archivo propio;
aquí solo el panorama. Para la versión visual tipo árbol genealógico,
ver [Árbol.exe](https://claude.ai/code/artifact/d0c4a5cf-e170-4c8b-a29e-df6f7f8ca699).

## Pareja

| Nombre | Relación | Detalle |
|--------|----------|---------|
| Fanny | Novia — 2 años el 20/10/2026 | [novia.md](novia.md) · [regalos-novia.md](regalos-novia.md) · [citas.md](citas.md) |

## Familia

| Nombre | Relación | Detalle |
|--------|----------|---------|
| Mamá | — | Cumpleaños 20/09 · [familia.md](familia.md) · [regalos-familia.md](regalos-familia.md) |
| Papá | — | Cumpleaños 21/09 · [familia.md](familia.md) · [regalos-familia.md](regalos-familia.md) |
| Hermana | Se llevan muy bien — escuchan música juntos | Nació 2004, cumpleaños 04/10 · [familia.md](familia.md) · [regalos-familia.md](regalos-familia.md) |

## Amigos

| Nombre | Relación | Detalle |
|--------|----------|---------|
| Joe | Amigo, barbero | [amigos.md](amigos.md) |

## Trabajo

Compañeros de Boost Mobile — todavía sin nombres registrados. Ver
[amigos.md](amigos.md).

## Notas

- Este archivo es un índice rápido — el contexto real (gustos,
  historia, pendientes) sigue viviendo en cada archivo enlazado, para
  no duplicar información que se pueda desactualizar.
- Cada vez que agregues a alguien nuevo a tu vida (amigo, compañero,
  familiar), dímelo y lo sumo aquí y en su archivo correspondiente.


===== END FILE: SOURCE/perfil/relaciones.md =====

===== BEGIN FILE: SOURCE/perfil/rutina.md =====

# 🗓️ Rutina personal

Tu horario de Boost Mobile es rotativo (Kronos) — cambia de semana a
semana. Súmale **1h20 de traslado por trayecto** (2h40 al día) y el
tiempo libre real después de un turno es más corto de lo que parece.
Por eso esto no es un horario fijo hora por hora, es una plantilla de
anclas que puedes reaplicar cada vez que te llega el horario nuevo.
Ver también [../desempeno/README.md](../desempeno/README.md) para las
métricas del trabajo y [Rutina.exe](https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433)
para la versión visual: la semana con su presupuesto de horas, el día de
hoy en bloques accionables y el checklist de pendientes vivos — Aspect.exe
y Tiempo.exe se fusionaron ahí el 01/09/2026 (ver [tiempo.md](tiempo.md)).

Última actualización: 09/09/2026 (horas de comida confirmadas con la captura completa del team GET).

## 🚦 Las 3 reglas del sistema (lo que cambió el 31/08/2026)

Diego reportó que sintió una caída de productividad. El diagnóstico no
fue falta de horas — fue **demasiadas pistas activas peleando por el
mismo bloque de 2.5h**. Estas 3 reglas son el ajuste:

**Regla 1 — Máximo 3 pistas activas a la vez.** Todo lo demás queda en
*standby* explícito (no cancelado, solo dormido). Pistas activas hoy:

| # | Pista activa ahora | Por qué |
|---|--------------------|---------|
| 1 | 🎓 **Titulación** | La más cerca de cerrarse; destraba todo lo demás |
| 2 | 📊 **Desempeño en Boost** | Bajó de 108.8% a 97.53%; si va a haber préstamos/crédito de vivienda, la estabilidad laboral y el salario registrado importan |
| 3 | 🗣️ **Italiano (Duolingo)** | Barata en tiempo — vive en un break, no compite con la noche |

**En standby (no se tocan sin decisión explícita):** búsqueda intensiva
de trabajo (pasa a modo mantenimiento, ver abajo), artículos de
investigación, maestría/psicología, automatización de comex.

**Regla 2 — Lo urgente no se apila, desplaza.** Si entra algo con fecha
(una llamada de reclutador, un trámite, el coche), esa noche el foco
planeado **se corre al día siguiente**. No se intenta meter las dos
cosas. No se acumula como deuda.

**Regla 3 — Una noche libre por semana, sin foco asignado.** Colchón
para lo imprevisto. Si no pasa nada imprevisto, es noche libre de
verdad — videojuegos, nada, lo que salga. No se "aprovecha" para
adelantar.

## Cuánto tiempo real tienes

Con 1h20 de traslado por trayecto:

- **Turno 6am-4pm:** sales de casa ~4:40 am, llegas de vuelta ~5:20 pm.
- **Turno 7am-5pm:** sales de casa ~5:40 am, llegas de vuelta ~6:20 pm.

En cualquiera de los dos, si duermes ~7-7.5h antes de la siguiente
salida temprana, te quedan **~2.5 horas libres reales** por la noche
(ya descontando comer y dejar listo lo del día siguiente) — alcanza
para **una cosa con foco**, no para varias.

<details>
<summary>Semana del 31/08 al 06/09/2026 (ya pasada)</summary>

| Día | Turno | Break 1 | 🍽️ Comida | Break 2 | Llegas | Foco de la noche |
|-----|-------|---------|-----------|---------|--------|-------------------|
| Lun 31/08 | 7am - 5pm | ~9:00 am | 12:45 pm | ~3:00 pm | ~6:20 pm | 🎓 Titulación — imprimir ATI + solicitud |
| Mar 01/09 | 6am - 4pm | ~8:00 am | 10:30 am ⚠️ | ~1:45 pm | sales a las 5pm | 🎮 Sales con un amigo |
| Mié 02/09 | 6am - 4pm | ~8:00 am | 11:30 am | ~2:00 pm | ~5:20 pm | 🎓 Firmar y escanear ATI + solicitud |
| Jue 03/09 (Off) | — | — | — | — | — | 💜 Fanny |
| Vie 04/09 (Off) | — | — | — | — | — | 💜 Fanny · 🚗 cotizar ventilador (no se hizo) |
| Sáb 05/09 | 6am - 4pm | ~8:00 am | 11:30 am | ~2:00 pm | ~5:20 pm | ⏸️ Titulación en pausa |
| Dom 06/09 | 7am - 5pm | ~9:00 am | 12:45 pm | ~3:00 pm | ~6:20 pm | 🎓 Armar comprobante + subir documentos |

</details>

## 📅 Semana del 07/09 al 13/09/2026 (horario Kronos confirmado) ← actual

Confirmado con la captura completa del team GET (09/09/2026) — turnos
de 10 horas y horas de comida exactas, ya no son estimadas. Los mismos
días off que la semana pasada (jueves y viernes) — el ciclo se repite
por ahora.

| Día | Turno | Break 1 | 🍽️ Comida | Break 2 | Llegas | Foco de la noche |
|-----|-------|---------|-----------|---------|--------|-------------------|
| **Lun 07/09** | 6am - 4pm | ~8:00 am | 11:30 am | ~2:00 pm | ~5:20 pm | — |
| **Mar 08/09** | 6am - 4pm | ~8:00 am | 11:30 am | ~2:00 pm | ~5:20 pm | — |
| **Mié 09/09** | 6am - 4pm | ~8:00 am | 11:30 am | ~2:00 pm | ~5:20 pm | — |
| **Jue 10/09 (Off)** | — | — | — | — | — | 💜 Fanny — día completo |
| **Vie 11/09 (Off)** | — | — | — | — | — | 💜 Fanny · bloque largo de la tarde |
| **Sáb 12/09** | 6am - 4pm | ~8:00 am | 12:00 pm | ~2:30 pm | ~5:20 pm | — |
| **Dom 13/09** | 7am - 5pm | ~9:00 am | 12:45 pm | ~3:00 pm | ~6:20 pm | — |

**Novedad de esta semana: Uber pagado en las mañanas.** Te lo mandan a
diario, así que el traslado de ida ya no te cuesta nada — solo pagas
el regreso (metro $5 por el teléfono, sin efectivo + combi $7.50-8 en
efectivo). Ver el desglose de cuánto sacar del cajero en
[../finanzas/README.md](../finanzas/README.md).

**✅ El Chevy ya quedó arreglado** (ventilador y radiador) — jueves
10/09 queda libre de verdad, sin ese pendiente.

**Todos los días, sin excepción:** 🗣️ Duolingo (en el Break 1) y 💜
tiempo con Fanny. Estas dos no compiten con el foco de la noche.

---

⚠️ **Martes 01/09 — la comida cae a las 10:30 am**, apenas 4.5h después
de entrar. Eso te deja **5.5 horas seguidas** de 10:30 am a 4:00 pm con
un solo break. Lleva snack para el Break 2 de ese día, no es opcional —
es justo el tipo de día donde el FCR se cae por cansancio, no por
técnica.

**Cambio del martes 01/09:** sales del trabajo a las 5pm (no 4pm) para
irte con un amigo — comer, videojuegos, checar vacantes, bañarte y
dormir, sin foco de titulación esta noche. El firmar + escanear del ATI
y la solicitud se corre al miércoles en la noche, que pasa a ser el día
de foco y deja de ser la noche libre de la semana (Regla 2: lo urgente
desplaza, no se apila — aquí el desplazado es el foco planeado, no algo
urgente nuevo, pero la mecánica es la misma).

**Todos los días, sin excepción:** 🗣️ Duolingo (en el Break 1) y 💜
tiempo con Fanny. Estas dos no compiten con el foco de la noche.

## ⏸️ El plan del pago de la ficha — en pausa (05/09/2026)

Este plan de partir el trámite en 3 noches (firmar/escanear → pagar por
SPEI → subir documentos) sigue guardado abajo por si se necesita, pero
**está en pausa**: Diego reportó que titularse por promedio podría no
aplicar si ya pasaron 2 años desde que egresó, y está esperando la
respuesta de su profesor. **No pagues la ficha ni firmes nada hasta
que llegue esa respuesta** — ver [../metas/titulacion.md](../metas/titulacion.md).

Esto en realidad te libera la noche del sábado: sin el pago pendiente,
hoy queda como noche libre de verdad.

<details>
<summary>Plan original (para retomar si se confirma la modalidad)</summary>

El plan decía "pagar la ficha de titulación el 05/09, día de pago" —
pero el 05/09 cae **sábado** y además trabajas 6am-4pm. FES Aragón y el
banco están cerrados. La solución no es mover la fecha, es partir el
trámite:

1. **Noches previas:** imprime, firma con tinta negra y
   escanea el **ATI** y el **formato de solicitud**. Estos dos **no
   dependen del pago** — adelantarlos deja un solo bloqueo real.
2. **Día de pago (Break 2 o en la noche):** entra a SIGEREL desde el
   celular, genera la ficha nueva ($620) y **paga por transferencia
   SPEI** — SPEI funciona 24/7, incluido sábado. El concepto debe decir
   exactamente *"Pago de título"*.
3. **Al día siguiente (noche):** arma el PDF del comprobante (ficha + CEP de
   BANXICO, cada uno en su hoja, sin empalmar) y sube los 3 documentos
   al sistema de seguimiento.

Con esto la titulación quedaría entregada sin necesitar un solo día
hábil de oficina — retomar tal cual en cuanto se confirme la modalidad.

</details>

## Durante el turno: qué hacer en los breaks

**Tomar agua va en los tres, siempre** — es lo primero al llegar, luego
lo demás. Ya no se lleva conteo de vasos (el medidor no servía de
mucho); es simplemente parte del ritual de cada break.

| Bloque | Para qué alcanza | Qué hacer |
|--------|-------------------|-----------|
| **Break 1** (~8:00 / ~9:00 am) | Una cosa corta | 💧 Rellenar botella · 🗣️ **Duolingo del día — este es su lugar fijo** |
| **🍽️ Comida** (sin pago, el más largo) | Algo con sustancia | 💧 Agua con la comida · 💼 revisar 1-2 vacantes (modo mantenimiento, ver [metas/trabajo.md](../metas/trabajo.md)) · 🎓 checar estatus del sistema de titulación si hay algo en vuelo |
| **Break 2** (~1:45 / ~3:00 pm) | Respiro real | 💧 Agua + **levantarte y estirar** · 🍎 snack (obligatorio los días de comida temprana) · **cero pantalla de trabajo** — es el bajón de la tarde, y es cuando el FCR se cae |

**Break 2 es el respiro, no un bloque productivo.** Es el punto del
turno donde llevas 6-8 horas y todavía te faltan 2. Si lo llenas de
pendientes, llegas a casa sin batería para el foco de la noche —
justo el patrón que hizo sentir la caída de productividad.

## Días off (jueves y viernes): aquí van los bloques largos

Este ciclo los off son **jueves y viernes**, y son para Fanny — te
quedas en su casa. Eso está bien y no hay que "recuperarlo": son 2 días
seguidos, alcanza para las dos cosas si se reparten.

- **Jueves:** día de Fanny, completo. Sin pendientes agendados.
- **Viernes:** mañana/mediodía con Fanny, y **una tarde de bloque
  largo** para lo que no cabe entre semana: trámites, el tema del
  coche, o la revisión semanal del sistema.

## Checada semanal del sistema

En tu primer día off (jueves), corre `/revisemos-cerebro` (~5 min) para
ver qué está urgente o vencido. Es mantenimiento, no trabajo nuevo. Si
se te pasa, no se acumula.

## Lo que ya no compite por tu tiempo

- **El ahorro** ($4,800/mes) se automatiza con transferencia programada
  el día de pago — ver [../metas/ahorro.md](../metas/ahorro.md). No
  necesita bloque semanal.
- **La búsqueda de trabajo** pasa a modo mantenimiento: 1-2 vacantes
  revisadas en la comida, nada de bloques largos. Ver
  [../metas/trabajo.md](../metas/trabajo.md).

## Notas

- Cuando te llegue el horario de la siguiente semana, mándame la
  captura de Kronos y te remapeo la tabla con las horas de comida y los
  breaks calculados — la plantilla (3 pistas activas, un foco por
  noche, una noche libre, off para bloques largos) no cambia.
- Si algún día no rinde nada de esto, no pasa nada — es para cuando sí
  hay energía, no una lista que hay que cumplir sí o sí.


===== END FILE: SOURCE/perfil/rutina.md =====

===== BEGIN FILE: SOURCE/perfil/salud.md =====

# 🩺 Salud

Espacio distinto a `metas/`: sin checklist ni fecha límite, es contexto
sobre tu salud física y mental para poder ayudarte con más criterio —
sobre todo porque tu horario rotativo (Kronos) y el traslado de 2h40 al
día le pegan directo al sueño y al tiempo para cuidarte.

## Lo que ya sé

- **Terapia:** dijiste que ya no ibas (15/08/2026), pero el 20/08
  mencionaste una sesión pagada para el día siguiente ($350) — parece
  que la retomaste, aunque sea suelta. Avísame si es algo puntual o si
  vas a volver de forma regular para dejarlo claro aquí. En algún
  momento se mencionó la posibilidad de TLP y ansiedad — lo dejo
  anotado tal cual me lo contaste, no es un diagnóstico ni yo puedo
  darte uno, es contexto tuyo por si algún día quieres retomarlo con
  un profesional.
- **Atención:** sientes que te cuesta concentrarte y recordar cosas —
  es parte de por qué existe todo este sistema.
- **Ejercicio:** no practicas ningún deporte actualmente, pero te
  gustaría empezar. Te llama el box (complicado por los lentes), y
  estás considerando tenis o squash como alternativa — sigues
  explorando cuál. Ver [intereses.md](intereses.md).
- **Vista:** usas lentes.
- **Alergia:** a algún medicamento, sin especificar todavía cuál —
  es dato de seguridad, no solo trivia, dímelo cuando quieras.
- **Sustancias:** consumes marihuana, a veces con tu hermana.
- **Sueño:** está mal casi siempre con el horario rotativo (confirmado
  18/08/2026) — no es solo en ciertos turnos, es más constante que
  eso. Es un problema real, no solo molestia.
- **Nada médico pendiente** ahorita (confirmado 18/08/2026) — al día
  en chequeos/dentista/etc.
- **Agua:** quieres tomar más (22/08/2026) — va integrado directo en
  los 3 breaks del turno (rellenar botella + tomar agua en Break 1,
  Meal y Break 2, ver [rutina.md](rutina.md#durante-el-turno-qué-hacer-en-los-breaks)
  y su sección "Hoy, en bloques"), en vez de solo un recordatorio suelto en los
  check-ins. Meta diaria calculada con tus datos (abajo): **~2,200 ml**.
  El medidor de agua en vivo del HUD principal (Cerebro.exe) ya cuenta
  en ml usando esta meta y la capacidad de tu botella (editable ahí
  mismo).
- **Estatura y peso (22/08/2026):** 1.78 m, 63 kg. Uso esto para
  calcular tu meta de agua (~35 ml por kg) y, a futuro, un medidor de
  calorías/planeador de comidas — todavía sin construir, queda como
  plan.

## Registro de sueño

Vacío por ahora — arráncalo cuando quieras, no hace falta esperar a
tener el patrón completo. Cuéntame en la conversación (o escríbelo tú
directo aquí) algo tan simple como "dormí 5 horas, turno 6am–4pm" y lo
agrego. Con unas semanas de datos reales podemos ver si el problema es
el traslado, el turno específico, o algo más — en vez de quedarnos
solo con la sensación de "duermo mal".

| Fecha | Horas dormidas | Turno ese día | Notas |
|-------|-----------------|---------------|-------|
| — | — | — | — |

## Patrón identificado (09/09/2026)

No es falta de tiempo por el traslado ni problema de calidad de sueño
en sí — **el patrón es que se te va el tiempo en cosas extra antes de
dejar listo lo del día siguiente**, y eso recorta las horas de sueño.
Confirmaste que quieres que los briefs (5am/6pm/8pm) te pregunten de
vez en cuando por esto.

## Lo que no sé y me serviría saber

- ¿Qué son esas "cosas extra" en concreto — celular/redes, algo de
  trabajo, platicar, videojuegos? Si lo identificamos, se puede poner
  un límite de tiempo específico en vez de uno genérico.
- ¿Has probado algo para cortarlo a tiempo (una alarma, dejar el
  celular fuera del cuarto, algo así), o es territorio sin explorar
  todavía?

## Cómo usar esto

- Es un espacio nuevo, casi vacío a propósito — cuéntame lo que
  quieras que quede registrado, al ritmo que tú decidas.


===== END FILE: SOURCE/perfil/salud.md =====

===== BEGIN FILE: SOURCE/perfil/servicios.md =====

# 📡 Servicios: internet/streaming y telefonía

Tableros para explicarle a la familia por qué conviene cambiar:

- [Combo Totalplay](https://claude.ai/code/artifact/c4cdab4f-0b30-4b9e-ac5d-c24b24f73741) — para papás y hermana.
- [Chao AT&T](https://claude.ai/code/artifact/fd1ec75f-bbba-4da2-a121-04b78cb2ba83) — para toda la familia (4 líneas: mamá, papá, hermana y tú).

Investigación para dejar de pagar de más — comparar lo que tienes hoy
contra alternativas que agrupen todo en un solo lugar o cuesten menos.

## 🌐 Internet + streaming (Totalplay)

**Situación actual:** paquete Turbo (nombre viejo — Totalplay renombró
sus paquetes por velocidad desde 2023, así que hoy aparece con otro
nombre), ~$500-600/mes, sin streaming incluido. Netflix, Disney+, Prime
Video y HBO Max se pagan aparte.

**Streaming que quieres incluir:** Netflix, Disney+, Prime Video, HBO Max.

### Paquetes Totalplay 2026 con streaming incluido

| Velocidad | Precio (pronto pago) | Streaming incluido sin costo extra |
|---|---|---|
| 500 Mb | ~$999/mes | Apple TV+ (1 año gratis de promo) |
| 1,000 Mb | ~$1,000-1,050/mes | Netflix, Disney+, HBO Max, Universal+, Apple TV — todas versión con anuncios |

Importante: **Prime Video no está incluido** en el combo de Totalplay —
se agrega aparte con un cargo extra de ~$39-50/mes. Netflix, Disney+ y
HBO Max vienen en su versión "con anuncios" (no la premium sin
anuncios).

### Comparación

| Opción | Costo mensual estimado | Qué cubre |
|---|---|---|
| Lo que probablemente pagas hoy | ~$500-600 (internet) + streaming por separado | Internet más lento + 4 suscripciones sueltas |
| Totalplay 1,000 Mb con streaming | ~$1,000-1,050 + ~$40-50 (Prime Video) = **~$1,040-1,100/mes** | Internet mucho más rápido + Netflix + Disney+ + HBO Max + Prime Video + Universal+ + Apple TV, todo en un solo recibo |

**Recomendación:** si hoy gastas ~$550 de internet + ~$650-700 en las 4
apps por separado (Netflix ~$239, Disney+ ~$229, Prime ~$99-149, HBO
Max ~$189 aprox.), ya estás cerca de $1,200-1,250/mes total. El
paquete de 1,000 Mb de Totalplay (~$1,040-1,100/mes con Prime Video
agregado) sale más barato que seguir pagando todo suelto, además de
que el internet sube de velocidad. Vale la pena:

- [ ] Confirmar con Totalplay (llamada o chat) el precio y velocidad
      exactos de tu paquete Turbo actual, para comparar real contra real.
- [ ] Preguntar directamente por el paquete de 1,000 Mb con streaming y
      si se puede agregar Prime Video al mismo recibo.
- [ ] Cancelar las suscripciones sueltas de streaming una vez que el
      combo esté activo (para no pagar doble el primer mes).

## 📱 Telefonía (AT&T actual → posible plan familiar de 4 líneas)

**Situación actual:** líneas repartidas en AT&T entre la familia.
Sensación: pagan mucho y la señal no es tan buena.

**Decisión (22/08/2026):** en vez de solo tú y tu mamá, se evaluó
juntar las 4 líneas de la familia (mamá, papá, hermana y tú) en un
solo plan.

### Alternativas 2026 — plan compartido de 4 líneas

| Operador | Plan | Precio (4 líneas) | Qué incluye |
|---|---|---|---|
| **Telcel** | Multilínea Familiar | **$636-716/mes** (~$159-179/línea) | 15 GB compartidos entre las 4, 600 min compartidos, SMS ilimitado por línea |
| **Movistar** | Pro Ilimitado ×4 (con desc. en adicionales) | ~$2,000+/mes | Datos verdaderamente ilimitados en las 4 líneas |
| **AT&T** | Planes actuales | $330-$1,300/línea según el plan | Referencia — confirmar lo que paga cada quien hoy |

**Reparto de datos:** tus papás casi no usan datos móviles, así que en
la práctica los 15 GB compartidos los consumen tú y tu hermana — unos
7.5 GB cada uno si se reparten parejo. Confirmaste que ambos usan WiFi
casi todo el tiempo, así que deberían alcanzar sin problema; si algún
mes no alcanza, Telcel vende paquetes de datos adicionales desde $39
(mejor eso que pagar de más todo el año por un plan con más GB fijos).

**Cobertura/señal:** Telcel es consistentemente el mejor en velocidad y
cobertura en México; Movistar y AT&T se han alternado el 2º/3er lugar
en pruebas recientes.

**Recomendación:** **Telcel Multilínea Familiar de 4 líneas, $636-716/mes
en total** (menos de $180/persona) — la opción más barata, con la
mejor red, y con los 15 GB compartidos + paquetes extra ocasionales
cubriendo bien el uso real de la familia.

- [ ] Juntar los recibos actuales de AT&T de las 4 líneas para comparar
      real contra real.
- [ ] Confirmar el precio exacto por línea con Telcel al momento de
      contratar (varía $159-179 según la promoción vigente).
- [ ] Verificar cobertura de Telcel en casa y en los lugares donde más
      se usa el teléfono, antes de portar.
- [ ] Portabilidad: se puede hacer sin perder el número, marcando *051
      o desde la app del operador nuevo.

## Notas

- Estos precios son de búsquedas de agosto 2026 y pueden variar por
  promoción o zona — confirma directo con cada compañía antes de
  cambiarte.
- Esto no compite con la meta de ahorro conjunto
  ([../metas/ahorro.md](../metas/ahorro.md)) — al contrario, si se
  logra bajar el gasto fijo mensual, ese dinero libre podría sumarse
  al ahorro.


===== END FILE: SOURCE/perfil/servicios.md =====

===== BEGIN FILE: SOURCE/perfil/tiempo.md =====

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


===== END FILE: SOURCE/perfil/tiempo.md =====

===== BEGIN FILE: SOURCE/perfil/viaje-cabana.md =====

# 🏕️ Escapada de fin de semana a cabaña — 28-30 agosto 2026 (CANCELADA)

## ❌ Actualización (29/08): viaje cancelado

El viaje se cancela definitivamente — **no fue por el Chevy ni el
radiador**, sino porque el carro de la mamá de Diego (un Aveo, el que
iban a usar para el viaje) falló. La reserva de la cabaña (Vista del
Bosque, ver abajo) se paga en el hotel, no por adelantado, así que al
no llegar a hacer check-in **no se cobró nada — sin pérdida de
dinero**, a pesar de que la política era "no reembolsable".

Dos cosas separadas para mañana (30/08):
- El **Chevy** va con el mecánico para la revisión que ya estaba
  planeada (radiador, llantas, aceite, frenos — ver abajo). Sigue en
  pie independientemente del viaje.
- El **Aveo de mamá** va aparte, a un taller eléctrico, por la falla
  que canceló el viaje.

Queda pendiente decidir con Fanny si se reagenda la escapada más
adelante (no hay fecha nueva todavía).

---

Plan real que se armó para la escapada con Fanny (viernes a domingo,
2 noches) — venía de la idea ya anotada en
[citas.md](citas.md#al-aire-libre--para-el-aniversario). Se conserva
completo abajo como referencia, por si se reagenda.

**Cómo llegó a esto (cronología real):**
- 24/08: propuesta inicial armada para Fanny (Mineral del Chico vs.
  Valle de Bravo), luego se encontró un Airbnb concreto en Santa Ana
  Jilotzingo — **esta opción quedó descartada**, ver abajo.
- 27/08: Diego decide llevarse el **carro de su mamá** en vez del
  Chevy (el radiador deja de ser bloqueo para salir), y aparece una
  cabaña distinta y más concreta: **Vista del Bosque**, reservada de
  verdad por Fanny vía Expedia.
- 29/08: el carro de mamá (Aveo) falla — se cancela el viaje.

## 🏡 Alojamiento — Vista del Bosque (reservación real, 27/08)

**Vista del Bosque** — reservación confirmada por Expedia, hecha por
Fanny. (La opción anterior en Airbnb, Santa Ana Jilotzingo, quedó
descartada cuando apareció esta.)

- **Dirección:** San Martín Cachihuapan, 54333, San Martín
  Cachihuapan, Villa del Carbón, México, México.
- **Fechas:** check-in viernes 28/08, check-out domingo 30/08 — 2
  noches.
- **Habitación:** Estándar 2 camas (tarifa Summer Sale), 2 adultos, 0
  niños.
- **Precio:** $1,805 MXN totales, impuestos incluidos — **pago en el
  hotel** (no se cobró por adelantado). Política "no reembolsable",
  pero como el cargo era hasta el check-in, cancelar antes de llegar
  no costó nada.
- **A nombre de:** Estefanya (Fanny) Naranjo González — folio de
  habitación 135-251-1, reserva booking_135-251.
- **Desde Satélite:** zona de Villa del Carbón, camino de montaña —
  del orden de 45-60 min (nunca se confirmó el tiempo exacto porque
  el viaje se canceló antes).

## 🚗 Traslado que se había planeado

- **Carro de la mamá de Diego** (no el Chevy) — decidido el 27/08.
  Quedó pendiente que Diego hablara con ella del préstamo (fechas,
  gasolina) y ubicara su tarjeta de circulación — sigue sin resolverse
  y ya no aplica porque el viaje se canceló.
- **Fanny vive en Satélite** (Naucalpan) — el plan era que Diego
  saliera de Neza, pasara por ella a Satélite, y de ahí juntos a la
  cabaña.
- Diego iba a salir del turno del viernes 28 a las 4:00 pm.

## 🔧 El radiador del Chevy (mantenimiento aparte, sigue en pie)

- El 27/08 Diego decidió llevarse el carro de su mamá para el viaje,
  así que el radiador del Chevy dejó de ser bloqueo para salir esa
  semana — pero seguía pendiente como mantenimiento real.
- **29/08:** el radiador ya se cambió — refacción pagada, falta la
  mano de obra. Mañana 30/08 el Chevy entra con el mecánico para
  revisar de una vez anticongelante, llantas (incluida la de
  refacción), aceite y frenos. Detalle completo en
  [carros.md](carros.md) y el tablero
  [Carros.exe](https://claude.ai/code/artifact/343ba47e-786d-4245-8ef0-44826ec627c7).

## 💰 Presupuesto que se había calculado

| Concepto | Estimado |
|----------|----------|
| Cabaña (2 noches, pago en el hotel) | $1,805 |
| Gasolina + casetas (ida y vuelta) | $200 - $350 |
| Comida (sin cocina en la cabaña — parrillada, 2 días) | $900 - $1,200 |
| Colchón / imprevistos | $200 - $300 |
| **Total** | **~$3,105 - $3,655** |
| **Mitad de Diego (a mitades con Fanny)** | **~$1,550 - $1,825** |

Como la cabaña se paga en el hotel y el viaje se canceló antes de
llegar, nada de esto llegó a gastarse.

### Opciones anteriores descartadas (por si sirven de referencia)

Antes de encontrar Vista del Bosque se compararon Mineral del Chico
(Hidalgo) y Valle de Bravo (Edomex), y después un Airbnb concreto en
Santa Ana Jilotzingo ($820/noche, 4.69★). Todas quedaron descartadas
en el camino — se documentaron en su momento pero ya no son el plan
vigente.

## 🎒 Checklist de mochila que se había armado (para referencia futura)

Lista completa por categoría, útil para la próxima vez que se
reagende algo similar:

**Documentos y dinero:** identificación oficial, confirmación de la
reserva, tarjeta de circulación del carro que se use, efectivo, la
tarjeta con la que se garantizó la reserva.

**Ropa:** ropa por capas (baja mucho la temperatura de noche en zona
de bosque/montaña), pijama, calzado cerrado y cómodo, chamarra o
rompevientos, ropa extra por si se moja/ensucia.

**Aseo personal:** cepillo y pasta de dientes, toallitas húmedas,
toalla de baño (cabañas rurales a veces no la dan), jabón/shampoo de
viaje, desodorante.

**Salud:** medicinas personales, botiquín básico, bloqueador y
repelente (zona boscosa), algo para el mareo en camino de montaña.

**Comida y cabaña (si no hay cocina):** carne/verduras para la
parrilla, carbón/leña + encendedor, platos/vasos/cubiertos
desechables, agua embotellada extra, bolsas de basura.

**Tecnología:** cargador y cable, power bank (poca señal gasta más
batería), ruta descargada offline en Maps, bocinita.

**Extras:** linterna + pilas, cobija, navaja/multiusos, cartas o
juego para la noche, impermeable ligero.

## 📝 Pendientes

- [x] Armar y mandarle a Fanny la propuesta del viaje (24/08)
- [x] Encontrar cabaña — primero Airbnb en Jilotzingo (descartado),
      luego Vista del Bosque vía Expedia ($1,805, 27/08)
- [x] Viaje cancelado (29/08) — falló el Aveo de mamá. Sin pérdida de
      dinero (se paga en el hotel, nunca se llegó a hacer check-in).
- [ ] Mañana (30/08): Chevy con el mecánico (radiador, llantas,
      aceite, frenos — revisión ya planeada, sigue en pie)
- [ ] Mañana (30/08): Aveo de mamá al taller eléctrico (falla que
      canceló el viaje)
- [ ] Decidir con Fanny si se reagenda la escapada y para cuándo

## Notas

- Esta escapada puede contar como la idea de "salir de la ciudad" que
  ya estaba anotada para el aniversario en [citas.md](citas.md) — si
  al final hacen algo aparte el 20 de octubre, avísame y la separamos.


===== END FILE: SOURCE/perfil/viaje-cabana.md =====


## 19. ARTIFACT SOURCE CODE (tableros capturados íntegros de claude.ai)

===== BEGIN FILE: ARTIFACTS_SOURCE/Cerebro.exe__19dc184b-9e66-40e3-a25f-d4348f83bf4b.html =====

<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>
<title>Cerebro.exe</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<style>
/* ============================================================
   Cerebro.exe — app oscura, navegación por dock inferior.
   Sin masthead, sin tarjetas con borde, sin secciones-caja.
   Todo se separa por espacio y peso tipográfico.
   ============================================================ */
:root {
  --bg:      #0B0B0C;
  --surface: #131315;
  --surface-2: #1A1A1D;
  --line:    #1F1F23;
  --text:    #EDEDEF;
  --muted:   #8A8A92;

  /* acento único (Linear indigo). El sólido se usa en relleno y en
     elementos no textuales; -text es la variante legible sobre negro. */
  --accent:      #5E6AD2;
  --accent-text: #8D96EE;
  --on-accent:   #FFFFFF;

  /* cuatro estados, saturados */
  --critical: #FF5C5C;
  --warn:     #FFA344;
  --ok:       #4CC38A;
  --paused:   #9A9AA2;
  --faint:    #8A8A92;   /* ROLE.transit lo referencia */

  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --r: 8px;
  --dock-h: 58px;

  color-scheme: dark;
}

* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; background: var(--bg); scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 15px;
  line-height: 1.45;
  letter-spacing: -.011em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.tabnum, .topbar, .tail, .hero-eyebrow, .alert-when, .tl-at, .hz b {
  font-variant-numeric: tabular-nums;
}

.vh {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
.skip {
  position: absolute; left: -9999px; top: 0;
}
.skip:focus {
  left: 0; z-index: 99;
  background: var(--accent); color: var(--on-accent);
  font-weight: 500; font-size: .88rem;
  padding: 10px 16px; border-radius: 0 0 var(--r) 0; text-decoration: none;
}

/* ---------- lienzo ---------- */
.app {
  max-width: 460px; margin: 0 auto;
  padding-inline: 18px;
  padding-block: 0 calc(var(--dock-h) + 66px + env(safe-area-inset-bottom, 0px));
}

/* ---------- 1. header mínimo de una línea ---------- */
.topbar {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; gap: 8px;
  margin-inline: -18px;
  padding: 10px 18px calc(10px + env(safe-area-inset-top, 0px));
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  font-size: .78rem; color: var(--muted);
}
.topbar b { color: var(--text); font-weight: 500; }
.tb-mark {
  width: 15px; height: 15px; flex: none; border-radius: 4px;
  background: linear-gradient(150deg, var(--accent), #3D47A8);
}
.tb-grow { flex: 1; }
.tb-chip {
  padding: 2px 7px; border-radius: 5px;
  background: var(--surface-2); color: var(--muted);
  font-size: .7rem; font-weight: 500; white-space: nowrap;
}
.tb-btn {
  flex: none; width: 28px; height: 28px;
  display: grid; place-items: center;
  background: none; border: 0; padding: 0; cursor: pointer;
  color: var(--muted);
  font-size: 0;                 /* el JS escribe un emoji: lo anulamos */
  transition: color .15s;
}
.tb-btn::before {
  content: ''; width: 17px; height: 17px; background: currentColor;
  -webkit-mask: var(--ico) center / contain no-repeat;
          mask: var(--ico) center / contain no-repeat;
  --ico: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 5 6 9H2v6h4l5 4z'/%3E%3Cpath d='m22 9-6 6M16 9l6 6'/%3E%3C/svg%3E");
}
.tb-btn:hover { color: var(--text); }
.tb-btn[aria-pressed="true"] { color: var(--accent-text); }
.tb-btn[aria-pressed="true"]::before {
  --ico: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 5 6 9H2v6h4l5 4z'/%3E%3Cpath d='M15.5 8.5a5 5 0 0 1 0 7'/%3E%3Cpath d='M18.8 5.2a9 9 0 0 1 0 13.6'/%3E%3C/svg%3E");
}

/* ---------- 2. AHORA: tipografía sobre negro, sin caja ---------- */
.hero { padding: 26px 0 4px; }
.hero-eyebrow {
  display: flex; align-items: baseline; gap: 8px;
  margin: 0 0 10px;
  font-size: .76rem; color: var(--muted);
}
.hero-ico { display: none; }             /* el JS mete un emoji: fuera */
.hero-left { margin-left: auto; color: var(--text); font-weight: 500; }
.hero-left small { font-size: .76rem; font-weight: 400; color: var(--muted); margin-left: 4px; }
.hero-label {
  margin: 0;
  font-size: 1.95rem; font-weight: 600;
  letter-spacing: -.038em; line-height: 1.12;
  color: var(--text); text-wrap: balance;
}
.hero-next { margin: 10px 0 0; font-size: .84rem; color: var(--muted); }
.hero-bar { height: 2px; margin-top: 18px; background: var(--line); overflow: hidden; }
.hero-bar i {
  display: block; height: 100%; width: 0;
  background: var(--nc, var(--accent)); transition: width .5s ease;
}
.hero-rule { margin: 9px 0 0; font-size: .74rem; color: var(--muted); opacity: .8; }
.hero-warn {
  margin: 16px 0 0; padding-left: 11px;
  border-left: 2px solid var(--warn);
  font-size: .83rem; line-height: 1.5; color: var(--text);
}

/* ---------- 5. PISTAS: riel horizontal ---------- */
.rail {
  display: flex; gap: 8px; overflow-x: auto;
  margin-inline: -18px; padding: 0 18px 2px;
  scrollbar-width: none; -ms-overflow-style: none;
}
.rail::-webkit-scrollbar { display: none; }
.pill {
  flex: none; width: 158px;
  display: flex; flex-direction: column; gap: 5px;
  padding: 11px 12px 10px;
  background: var(--surface); border-radius: var(--r);
  text-decoration: none; color: inherit;
  transition: background .15s;
}
.pill:hover { background: var(--surface-2); }
.pill-top { display: flex; align-items: center; gap: 7px; }
.pill-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--sc); flex: none; }
.pill-name {
  font-size: .875rem; font-weight: 500; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.pill-state { font-size: .74rem; color: var(--muted); }
.pill-bar { height: 2px; margin-top: 3px; background: var(--line); overflow: hidden; }
.pill-bar i { display: block; height: 100%; background: var(--sc); }

/* ---------- encabezados de sección ---------- */
.shead {
  display: flex; align-items: baseline; gap: 10px;
  margin: 30px 0 10px;
}
.shead h2 {
  margin: 0; font-size: .72rem; font-weight: 500;
  color: var(--muted); letter-spacing: 0;
}
.shead .tail { margin-left: auto; font-size: .72rem; color: var(--muted); opacity: .7; }

/* ---------- 3. ATENCIÓN: filas densas, sin bordes ---------- */
.alerts { display: flex; flex-direction: column; gap: 2px; }
.alert {
  display: flex; align-items: center; gap: 11px;
  padding: 9px 8px; margin-inline: -8px;
  border-radius: var(--r);
  text-decoration: none; color: inherit;
  transition: background .12s;
}
.alert:hover { background: var(--surface); }
.alert-ico { flex: none; width: 1.1rem; font-size: .95rem; line-height: 1; text-align: center; }
.alert-body { flex: 1; min-width: 0; }
.alert-title {
  display: block;
  font-size: .875rem; font-weight: 500; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.alert-sub {
  margin: 1px 0 0; font-size: .75rem; color: var(--muted);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.alert-when {
  flex: none; text-align: right;
  font-size: .82rem; font-weight: 500; color: var(--sc, var(--muted));
  line-height: 1.25;
}
.alert-when small { display: block; font-size: .69rem; font-weight: 400; color: var(--muted); opacity: .8; }

/* ---------- 4. TU DÍA: timeline denso, sin emojis ---------- */
.tl { position: relative; display: flex; flex-direction: column; }
.tl::before {
  content: ''; position: absolute; left: 2.5px; top: 13px; bottom: 13px;
  width: 1px; background: var(--line);
}
.tl-row {
  position: relative;
  display: flex; align-items: center; gap: 10px;
  padding: 5px 0 5px 20px;
  color: var(--muted);
}
.tl-row::before {
  content: ''; position: absolute; left: 0; top: 50%;
  width: 6px; height: 6px; margin-top: -3px;
  border-radius: 50%; background: var(--line);
}
.tl-ico { display: none; }
.tl-row.past { color: #5C5C64; }
.tl-row.now { color: var(--text); }
.tl-row.now::before {
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
}
.tl-at { flex: none; width: 3.4rem; font-size: .76rem; color: inherit; opacity: .85; }
.tl-row.now .tl-at { color: var(--accent-text); opacity: 1; }
.tl-what {
  flex: 1; min-width: 0; font-size: .84rem;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.tl-row.now .tl-what { font-weight: 500; }

/* ---------- 6. HORIZONTES: una sola línea ---------- */
.hz {
  display: flex; align-items: center; gap: 0;
  margin-top: 26px; padding: 11px 0;
  border-top: 1px solid var(--line);
  font-size: .76rem; color: var(--muted);
  overflow-x: auto; scrollbar-width: none;
}
.hz::-webkit-scrollbar { display: none; }
.hz-item { white-space: nowrap; }
.hz-item b { color: var(--text); font-weight: 500; margin-right: 5px; }
.hz-sep { flex: none; padding: 0 12px; color: var(--line); }

/* ---------- 8. TABLEROS: filas densas ---------- */
.filters {
  display: flex; gap: 6px; overflow-x: auto;
  margin-inline: -18px; padding: 0 18px 4px;
  scrollbar-width: none; -ms-overflow-style: none;
}
.filters::-webkit-scrollbar { display: none; }
.filter {
  flex: none; height: 30px; padding: 0 11px;
  background: var(--surface); border: 0; border-radius: 6px;
  font-family: var(--font); font-size: .78rem; font-weight: 400;
  letter-spacing: -.01em; color: var(--muted);
  cursor: pointer; white-space: nowrap;
  transition: color .12s, background .12s;
}
.filter:hover { color: var(--text); background: var(--surface-2); }
.filter[aria-pressed="true"] {
  color: var(--on-accent); background: var(--accent); font-weight: 500;
}

#boards { display: flex; flex-direction: column; gap: 1px; margin-top: 10px; }

.cat-label {
  margin: 18px 0 3px;
  font-size: .71rem; font-weight: 400; color: var(--muted); opacity: .75;
}
.cat-label:first-child { margin-top: 2px; }

.board {
  display: flex; align-items: center; gap: 11px;
  padding: 8px; margin-inline: -8px;
  border-radius: var(--r);
  text-decoration: none; color: inherit;
  transition: background .12s;
}
.board:hover { background: var(--surface); }
.board-ico { flex: none; width: 1.15rem; font-size: .98rem; line-height: 1; text-align: center; }
.board-body { flex: 1; min-width: 0; }
.board-name {
  display: block; font-size: .875rem; font-weight: 500; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.board-what {
  display: block; margin-top: 1px; font-size: .75rem; color: var(--muted);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.board-go { display: none; }

.hide { display: none !important; }
.no-hits { padding: 24px 0; font-size: .84rem; color: var(--muted); }

/* ---------- 7. DOCK FIJO ---------- */
.dock {
  position: fixed; z-index: 30;
  left: 50%; transform: translateX(-50%);
  bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  width: calc(100% - 32px); max-width: 424px;
  height: var(--dock-h);
  display: flex; align-items: center; gap: 4px;
  padding: 0 8px;
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border-radius: var(--r);
  box-shadow: 0 1px 0 0 #232329 inset, 0 6px 20px rgba(0,0,0,.5);
}
.dock-btn {
  flex: 1; height: 42px;
  display: grid; place-items: center;
  background: none; border: 0; padding: 0; cursor: pointer;
  color: var(--muted); border-radius: 6px;
  transition: color .12s, background .12s;
}
.dock-btn svg { width: 19px; height: 19px; display: block; }
.dock-btn:hover { color: var(--text); background: var(--surface-2); }
.dock-btn[aria-current="true"] { color: var(--text); background: var(--surface-2); }

/* modo búsqueda: el dock se convierte en campo */
.dock-search { display: none; flex: 1; align-items: center; gap: 8px; padding-left: 10px; }
.dock.searching .dock-btn { display: none; }
.dock.searching .dock-search { display: flex; }
.dock-search svg { width: 16px; height: 16px; flex: none; color: var(--muted); }
#q {
  flex: 1; min-width: 0; height: 42px;
  background: none; border: 0; outline: none;
  font-family: var(--font); font-size: .92rem; letter-spacing: -.011em;
  color: var(--text); -webkit-appearance: none;
}
#q::placeholder { color: var(--muted); }
#q::-webkit-search-cancel-button { -webkit-appearance: none; }
.dock-close {
  flex: none; height: 32px; padding: 0 11px; margin-right: 4px;
  background: var(--surface-2); border: 0; border-radius: 6px;
  font-family: var(--font); font-size: .78rem; color: var(--muted); cursor: pointer;
}
.dock-close:hover { color: var(--text); }

footer {
  margin-top: 34px; padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: .72rem; line-height: 1.7; color: var(--muted); opacity: .7;
}

a:focus-visible, button:focus-visible, input:focus-visible {
  outline: 2px solid var(--accent-text); outline-offset: 2px; border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation: none !important; transition: none !important; }
}
</style>

<a class="skip" href="#tableros">Saltar a los tableros</a>

<div class="app" id="top">

  <header class="topbar">
    <span class="tb-mark" aria-hidden="true"></span>
    <b id="stTime">--:--</b>
    <span id="stDate">—</span>
    <span class="tb-grow"></span>
    <span class="tb-chip" id="stShift">—</span>
    <button type="button" class="tb-btn" id="soundBtn" aria-pressed="false" title="Ruido de foco">🔇</button>
  </header>

  <div class="hero" id="nowCard" aria-live="polite">
    <p class="hero-eyebrow">
      <span id="nowEyebrow">En curso</span>
      <span class="hero-ico" id="nowIco" aria-hidden="true"></span>
      <span class="hero-left" id="nowLeft"></span>
    </p>
    <span class="vh" id="nowRange"></span>
    <p class="hero-label" id="nowLabel">Cargando…</p>
    <p class="hero-next" id="nowNext"></p>
    <div class="hero-bar"><i id="nowFill"></i></div>
    <p class="hero-rule" id="tagline">3 pistas activas · 1 foco por noche</p>
    <p class="hero-warn" id="nowWarn" hidden></p>
  </div>

  <div class="shead">
    <h2 id="h-pistas">Pistas activas</h2>
    <span class="tail">3 de 3</span>
  </div>
  <div class="rail" aria-labelledby="h-pistas">
    <a class="pill" style="--sc: var(--paused)" href="https://claude.ai/code/artifact/ab59366f-ab5f-4bff-835e-348255129efc" target="_blank" rel="noopener">
      <span class="pill-top">
        <span class="pill-dot" aria-hidden="true"></span>
        <span class="pill-name">Titulación</span>
      </span>
      <span class="pill-state">En pausa · sin fecha</span>
      <span class="pill-bar"><i style="width:55%"></i></span>
    </a>
    <a class="pill" style="--sc: var(--warn)" href="https://claude.ai/code/artifact/9451d24a-fcd6-4017-b8c5-8f641583c24e" target="_blank" rel="noopener">
      <span class="pill-top">
        <span class="pill-dot" aria-hidden="true"></span>
        <span class="pill-name">Desempeño</span>
      </span>
      <span class="pill-state">97.53 % a meta</span>
      <span class="pill-bar"><i style="width:98%"></i></span>
    </a>
    <a class="pill" style="--sc: var(--ok)" href="https://claude.ai/code/artifact/4ef55817-2876-46f2-939e-7399e38db433" target="_blank" rel="noopener">
      <span class="pill-top">
        <span class="pill-dot" aria-hidden="true"></span>
        <span class="pill-name">Italiano</span>
      </span>
      <span class="pill-state">Racha sin reportar</span>
      <span class="pill-bar"><i style="width:4%"></i></span>
    </a>
  </div>

  <div class="shead" id="s-atencion">
    <h2 id="h-atencion">Atención</h2>
    <span class="tail" id="alertTail"></span>
  </div>
  <div class="alerts" id="alerts"></div>

  <div class="shead" id="s-dia">
    <h2 id="h-dia">Tu día</h2>
    <span class="tail" id="dayTail"></span>
  </div>
  <div class="tl" id="timeline"></div>

  <div class="hz" aria-label="Horizontes">
    <span class="hz-item"><b>Corto</b>2026<span class="vh"> — Titulación, Desempeño, Italiano, Ahorro de mudanza, Chevy</span></span>
    <span class="hz-sep" aria-hidden="true">·</span>
    <span class="hz-item"><b>Mediano</b>2027<span class="vh"> — Boda con Fanny (prioridad 1), cambio de coche, fondo de emergencia</span></span>
    <span class="hz-sep" aria-hidden="true">·</span>
    <span class="hz-item"><b>Largo</b>2028+<span class="vh"> — Casa propia con Fanny, familia, maestría</span></span>
  </div>

  <div class="shead" id="tableros">
    <h2 id="h-tableros">Tableros</h2>
    <span class="tail" id="boardTail"></span>
  </div>
  <nav class="filters" id="filters" aria-label="Filtrar tableros por tema"></nav>
  <div id="boards"></div>
  <p class="no-hits hide" id="noHits">Nada coincide — prueba con otra palabra.</p>

  <footer>
    Arriba lo de ahora, abajo los tableros.<br>
    Guárdalo en la pantalla de inicio para entrar con un toque.
  </footer>

</div>

<nav class="dock" id="dock" aria-label="Navegación">
  <button type="button" class="dock-btn" id="navTop" aria-label="Ir al inicio" aria-current="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/></svg>
  </button>
  <button type="button" class="dock-btn" id="navAlerts" aria-label="Ir a Atención">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M4.5 6.5h15L21 13v5H3v-5z"/></svg>
  </button>
  <button type="button" class="dock-btn" id="navDay" aria-label="Ir a Tu día">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>
  </button>
  <button type="button" class="dock-btn" id="navSearch" aria-label="Buscar un tablero">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
  </button>
  <button type="button" class="dock-btn" id="refreshBtn" aria-label="Traer la última versión">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-.7 4.5"/><path d="M20 5v6h-6"/></svg>
  </button>

  <div class="dock-search">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
    <label class="vh" for="q">Buscar un tablero</label>
    <input type="search" id="q" placeholder="dinero, Fanny, ficha, coche…" autocomplete="off" autocapitalize="off" spellcheck="false">
    <button type="button" class="dock-close" id="navClose">Listo</button>
  </div>
</nav>

<script>
/* ====================== datos ====================== */
var A = 'https://claude.ai/code/artifact/';
var U = {
  hoy:        A + 'b7358df3-d5c4-4b82-80c6-e4f375a149aa',
  periodico:  A + '4169c45b-465f-4ecd-9015-7f76693f3614',
  calendario: A + '8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778',
  articulos:  A + '25b45539-b542-44ea-9085-a19aeb4edca8',
  llamadas:   A + 'cc525f96-4b21-4056-87df-b53c0bda9db5',
  titulacion: A + 'ab59366f-ab5f-4bff-835e-348255129efc',
  trabajo:    A + 'fe81e91b-4a6f-4e04-aa6f-8355a64bb136',
  ahorro:     A + 'd66ad007-842c-4377-ac69-c9fdc8267002',
  yo:         A + 'f3018b22-33ba-4ddb-bda7-fd0fd8e924bf',
  nosotros:   A + '958d66cd-dbca-442a-b286-37994df7026e',
  finanzas:   A + '6841396f-30cd-494e-8139-b05c33caec8e',
  desempeno:  A + '9451d24a-fcd6-4017-b8c5-8f641583c24e',
  rutina:     A + '4ef55817-2876-46f2-939e-7399e38db433',
  compras:    A + 'ec0c9f2b-ad2e-46fa-9beb-4f00492373c3',
  biblioteca: A + '35790e36-7e9e-4768-a2e1-17acfd3d1bb7',
  logros:     A + '824aa431-f946-4228-b64a-da3c7fe40345',
  arbol:      A + 'd0c4a5cf-e170-4c8b-a29e-df6f7f8ca699',
  perfil:     A + '1b3a94a5-78a4-4833-9e05-ff2d870c2917',
  descubre:   A + '776e9c82-74b6-4efc-9698-866474be9271',
  carros:     A + '343ba47e-786d-4245-8ef0-44826ec627c7',
  patrimonio: A + '4f25e5f2-4321-4051-bbec-044c67464a3e',
  recetario:  A + '9141d18a-8ce1-4279-afe0-362e57c24ce9'
};

/* Horario Kronos. Horas de comida confirmadas 09/09/2026 con la captura
   completa del team GET. leave = salida de casa, home = llegada. */
var WEEK = {
  '2026-09-07': { shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lunch: '11:30', b2: '14:00', end: '16:00', home: '17:20',
                  foco: 'Bloque libre de la noche', focoIcon: '🎯' },
  '2026-09-08': { shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lunch: '11:30', b2: '14:00', end: '16:00', home: '17:20',
                  foco: 'Bloque libre de la noche', focoIcon: '🎯' },
  '2026-09-09': { shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lunch: '11:30', b2: '14:00', end: '16:00', home: '17:20',
                  foco: 'Bloque libre de la noche', focoIcon: '🎯' },
  '2026-09-10': { off: true, foco: 'Fanny — día completo', focoIcon: '💜' },
  '2026-09-11': { off: true, foco: 'Fanny · bloque largo de la tarde', focoIcon: '💜' },
  '2026-09-12': { shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lunch: '12:00', b2: '14:30', end: '16:00', home: '17:20',
                  foco: 'Bloque libre de la noche', focoIcon: '🎯' },
  '2026-09-13': { shift: '7am-5pm', leave: '05:40', start: '07:00', b1: '09:00', lunch: '12:45', b2: '15:00', end: '17:00', home: '18:20',
                  foco: 'Bloque libre de la noche', focoIcon: '🎯' }
};

var GROUPS = [
  { n: 'Cada día', b: [
    { i: '📰', n: 'Periódico',  u: U.periodico,  w: 'Tu portada de la mañana: clima, urgente, noticias', k: 'brief diario titular noticias vacantes eventos portada' },
    { i: '🗓️', n: 'Rutina',     u: U.rutina,     w: 'Tu semana, el día en bloques y los pendientes vivos', k: 'Kronos turno horario breaks foco semana Duolingo bloques checklist pendientes horas' },
    { i: '🌤️', n: 'Hoy',        u: U.hoy,        w: 'Clima de casa y del trabajo, y lo más próximo', k: 'clima temperatura fecha hora Neza Tabacalera' },
    { i: '📅', n: 'Calendario', u: U.calendario, w: 'El mes completo: conciertos, cumpleaños, aniversario', k: 'mes dias cine conciertos Nescafe Vaiven Corona Capital cumpleanos aniversario' }
  ]},
  { n: 'Trabajo y escuela', b: [
    { i: '🎓', n: 'Titulación', u: U.titulacion, w: 'El trámite paso por paso: ficha, ATI, solicitud', k: 'ATI solicitud ficha pago 620 DGAE FES Aragon UNAM SPEI titulo' },
    { i: '📊', n: 'Desempeño',  u: U.desempeno,  w: 'Tus métricas de Boost en % a meta', k: 'ACT FCR chat survey performance Boost Mobile metricas' },
    { i: '📞', n: 'Llamadas',   u: U.llamadas,   w: 'Qué decir en cada tipo de llamada, para subir el FCR', k: 'playbook frases escalacion credito FCR guion' },
    { i: '💼', n: 'Trabajo',    u: U.trabajo,    w: 'Vacantes, CV y LinkedIn — en modo mantenimiento', k: 'CV LinkedIn Indeed vacantes reclutador empleo sueldo' },
    { i: '✍️', n: 'Artículos',  u: U.articulos,  w: 'El artículo del giro a la derecha: fuentes y guion', k: 'investigacion giro derecha america latina fuentes escribir' }
  ]},
  { n: 'Dinero', b: [
    { i: '💵', n: 'Finanzas',   u: U.finanzas,   w: 'Cuentas, gastos y pendientes de la quincena', k: 'ingresos gastos presupuesto quincena categoria Santander MercadoPago efectivo Pluxee tarjeta deuda' },
    { i: '🏠', n: 'Mudanza',    u: U.ahorro,     w: 'El ahorro de los $47,000 y cuándo estarían listos', k: 'ahorro mudanza simulador MercadoPago 47000 12000 Tlalnepantla casa rentar Fanny' },
    { i: '📜', n: 'Patrimonio', u: U.patrimonio, w: 'El largo plazo: boda, casa propia, INFONAVIT', k: 'patrimonio horizonte largo plazo boda casa familia fondo INFONAVIT ISSEMyM credito puntos' },
    { i: '🛒', n: 'Compras',    u: U.compras,    w: 'Tu wishlist y el Fondo cosillas, aparte del ahorro', k: 'wishlist cosillas perfume PS5 MacBook pantalla bocinas antojos' }
  ]},
  { n: 'Fanny y familia', b: [
    { i: '💜', n: 'Nosotros',   u: U.nosotros,   w: 'El dossier de ustedes dos y el contador de días', k: 'Fanny aniversario citas regalos dias juntos novia pareja' },
    { i: '✉️', n: 'Recetario para Fanny', u: U.recetario, w: 'La carta imprimible, el separador y la receta', k: 'carta regalo detalle imprimir papeleria Snoopy receta separador manuscrita' },
    { i: '🌲', n: 'Árbol',      u: U.arbol,      w: 'Quién es quién: familia, pareja y amigos', k: 'genealogico familia pareja amigos relaciones' },
    { i: '🧩', n: 'Perfil',     u: U.perfil,     w: 'Salud, familia, amigos y tus gustos', k: 'salud familia amigos gustos sueno ejercicio terapia' }
  ]},
  { n: 'Tú y tus cosas', b: [
    { i: '🎮', n: 'Yo',         u: U.yo,         w: 'Tu hoja de personaje: nivel, XP y atributos', k: 'stats nivel XP videojuego personaje atributos habilidades' },
    { i: '🏆', n: 'Logros',     u: U.logros,     w: 'Lo que ya lograste, no lo que falta', k: 'trofeos XP historial avance logros' },
    { i: '🚗', n: 'Carros',     u: U.carros,     w: 'El Chevy y el Aveo: stats y bitácora del taller', k: 'Chevy Aveo radiador ventilador mecanico taller mantenimiento coche' },
    { i: '📁', n: 'Biblioteca', u: U.biblioteca, w: 'Tus documentos reales: CV, ATI, recibos', k: 'documentos PDF CV ATI escaneos comprobantes recibos nomina' },
    { i: '🗺️', n: 'Descubre',   u: U.descubre,   w: 'Noticias con perspectiva y qué hay cerca', k: 'noticias politica eventos cerca museos ferias conciertos' }
  ]}
];

var ALERTS = [
  { i: '⏸️', l: 'Titulación en pausa', s: 'Podría no aplicar por promedio si ya pasaron 2 años del egreso — esperando respuesta del profesor. No pagar la ficha.', u: U.titulacion, hot: 1 },
  { i: '💰', l: 'Aporte al ahorro ($2,400)', s: 'El día de pago del 18/09, junto con la nómina.', u: U.ahorro, date: '2026-09-18' },
  { i: '🎂', l: 'Cumple mamá', s: 'Pidió un abrigo. El de papá cae al día siguiente — resuélvelos de un golpe.', u: U.perfil, date: '2026-09-20' },
  { i: '🎂', l: 'Cumple papá', s: 'Cruz Azul y enjambres de nuez de Sanborns.', u: U.perfil, date: '2026-09-21' },
  { i: '💳', l: 'Corte tarjeta MercadoPago', s: '$3,201.59 — el AT&T de tu mamá y los libros de Fanny. Solo $398.41 de límite libre.', u: U.finanzas, date: '2026-09-27' },
  { i: '🎂', l: 'Cumple hermana', s: '', u: U.perfil, date: '2026-10-04' },
  { i: '🎤', l: 'Nescafé Vaivén', s: '', u: U.calendario, date: '2026-10-17' },
  { i: '💜', l: 'Aniversario con Fanny — 2 años', s: 'La carta ya está diseñada, solo falta imprimirla y escribirla.', u: U.recetario, date: '2026-10-20' },
  { i: '🏠', l: 'Fanny revisa ISSEMyM', s: 'Gratis, ~30 min. Es lo único que falta del lado de la casa.', u: U.patrimonio }
];
</script>

<script>
/* ====================== utilidades ====================== */
function pad(n) { return n < 10 ? '0' + n : String(n); }
var MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
var DAYS = ['dom','lun','mar','mié','jue','vie','sáb'];

function dayKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function mins(hhmm) { var p = hhmm.split(':'); return Number(p[0]) * 60 + Number(p[1]); }
function fmtMin(m) {
  m = ((m % 1440) + 1440) % 1440;
  var h = Math.floor(m / 60), mm = m % 60;
  return (h % 12 === 0 ? 12 : h % 12) + ':' + pad(mm) + (h < 12 ? 'am' : 'pm');
}
function fmtLeft(m) {
  if (m >= 60) { return Math.floor(m / 60) + 'h ' + pad(m % 60) + 'm'; }
  return m + 'm';
}
function daysUntil(iso) {
  var p = iso.split('-');
  var t = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  var n = new Date(); n.setHours(0, 0, 0, 0);
  return Math.round((t - n) / 86400000);
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

/* El color dice ESTADO, no categoría. Cinco roles, nada más. */
var ROLE = {
  sleep:   'var(--paused)',
  prep:    'var(--paused)',
  transit: 'var(--faint)',
  work:    'var(--accent)',
  brk:     'var(--ok)',
  foco:    'var(--warn)'
};

/* ====================== bloques del día ====================== */
function buildBlocks(day) {
  if (!day) return null;
  var b = [];
  if (day.off) {
    b.push({ s: 0, e: 9 * 60, i: '😴', l: 'Dormir sin alarma', r: 'sleep' });
    b.push({ s: 9 * 60, e: 23 * 60, i: day.focoIcon || '💜', l: day.foco, r: 'foco', keep: 1 });
    b.push({ s: 23 * 60, e: 1440, i: '😴', l: 'Dormir', r: 'sleep', keep: 1 });
    return b;
  }
  var leave = mins(day.leave), start = mins(day.start), b1 = mins(day.b1),
      lunch = mins(day.lunch), b2 = mins(day.b2), end = mins(day.end), home = mins(day.home);
  b.push({ s: 0, e: leave - 35, i: '😴', l: 'Dormir', r: 'sleep' });
  b.push({ s: leave - 35, e: leave, i: '🪥', l: 'Alistarte', r: 'prep' });
  b.push({ s: leave, e: start, i: '🚇', l: 'Traslado al trabajo', r: 'transit', keep: 1 });
  b.push({ s: start, e: b1, i: '💼', l: 'Turno · ' + day.shift, r: 'work' });
  b.push({ s: b1, e: b1 + 15, i: '☕', l: 'Break 1 · agua + Duolingo', r: 'brk', keep: 1 });
  b.push({ s: b1 + 15, e: lunch, i: '💼', l: 'Turno', r: 'work' });
  b.push({ s: lunch, e: lunch + 45, i: '🍽️', l: 'Comida · agua + 1-2 vacantes', r: 'brk', keep: 1 });
  b.push({ s: lunch + 45, e: b2, i: '💼', l: 'Turno', r: 'work' });
  b.push({ s: b2, e: b2 + 15, i: '🌿', l: 'Break 2 · respiro, cero pantalla', r: 'brk', keep: 1 });
  b.push({ s: b2 + 15, e: end, i: '💼', l: 'Turno', r: 'work' });
  b.push({ s: end, e: home, i: '🚇', l: 'Traslado a casa', r: 'transit', keep: 1 });
  b.push({ s: home, e: 22 * 60 + 30, i: day.focoIcon || '🎯', l: day.foco, r: 'foco', keep: 1 });
  b.push({ s: 22 * 60 + 30, e: 1440, i: '😴', l: 'Dormir', r: 'sleep', keep: 1 });
  return b;
}

/* ====================== ahora + línea del día ====================== */
(function () {
  var card = document.getElementById('nowCard');
  var elIco = document.getElementById('nowIco'),
      elEye = document.getElementById('nowEyebrow'),
      elLabel = document.getElementById('nowLabel'),
      elNext = document.getElementById('nowNext'),
      elLeft = document.getElementById('nowLeft'),
      elFill = document.getElementById('nowFill'),
      elWarn = document.getElementById('nowWarn'),
      elRange = document.getElementById('nowRange'),
      elTl = document.getElementById('timeline'),
      elDayTail = document.getElementById('dayTail'),
      elShift = document.getElementById('stShift'),
      elTag = document.getElementById('tagline');

  function paint() {
    var now = new Date();
    var day = WEEK[dayKey(now)];
    var cur = now.getHours() * 60 + now.getMinutes();

    document.getElementById('stTime').textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
    document.getElementById('stDate').textContent = DAYS[now.getDay()] + ' ' + now.getDate() + ' ' + MONTHS[now.getMonth()];

    if (!day) {
      elShift.textContent = 'sin horario';
      elIco.textContent = '📮';
      elEye.textContent = 'Falta el Kronos';
      elLabel.textContent = 'Mándame la captura de la semana';
      elNext.textContent = 'Con eso te remapeo los breaks y el foco de cada noche. Mientras, la regla no cambia: 3 pistas, 1 foco por noche.';
      elLeft.innerHTML = '';
      elFill.style.width = '0%';
      elRange.textContent = '';
      elWarn.hidden = true;
      elTl.innerHTML = '<div class="tl-row"><span class="tl-what">Sin bloques para hoy — manda el horario y vuelve a cargar.</span></div>';
      elDayTail.textContent = '';
      card.style.setProperty('--nc', 'var(--paused)');
      return;
    }

    elShift.textContent = day.off ? 'día off' : day.shift;
    elTag.textContent = day.off ? 'día off · tiempo con Fanny' : '3 pistas activas · 1 foco por noche';

    var blocks = buildBlocks(day);
    var idx = 0;
    for (var i = 0; i < blocks.length; i++) {
      if (cur >= blocks[i].s && cur < blocks[i].e) { idx = i; break; }
    }
    var b = blocks[idx];
    var left = b.e - cur;
    var span = b.e - b.s;
    var done = span > 0 ? Math.min(100, Math.max(0, ((cur - b.s) / span) * 100)) : 0;

    card.style.setProperty('--nc', ROLE[b.r] || 'var(--accent)');
    elIco.textContent = b.i;
    elEye.textContent = fmtMin(b.s) + ' – ' + fmtMin(b.e);
    elLabel.textContent = b.l;
    elLeft.innerHTML = fmtLeft(left) + '<small>restante</small>';
    elFill.style.width = done.toFixed(1) + '%';
    elRange.textContent = day.off ? 'descanso' : day.shift;

    var nxt = blocks[idx + 1];
    elNext.textContent = nxt ? 'Sigue: ' + nxt.l + ' · ' + fmtMin(nxt.s) : 'Último bloque del día.';

    if (day.warn && !day.off && cur < mins(day.end)) {
      elWarn.hidden = false;
      elWarn.textContent = day.warn;
    } else { elWarn.hidden = true; }

    var visible = blocks.filter(function (x) { return x.keep; });
    elTl.innerHTML = visible.map(function (x) {
      var st = cur >= x.e ? 'past' : (cur >= x.s && cur < x.e ? 'now' : 'next');
      return '<div class="tl-row ' + st + '" style="--tc:' + (ROLE[x.r] || 'var(--accent)') + '">' +
        '<span class="tl-at">' + fmtMin(x.s) + '</span>' +
        '<span class="tl-ico" aria-hidden="true">' + x.i + '</span>' +
        '<span class="tl-what">' + esc(x.l) + '</span>' +
      '</div>';
    }).join('');
    elDayTail.textContent = day.off ? 'sin turno' : 'comida ' + fmtMin(mins(day.lunch));
  }

  paint();
  setInterval(paint, 20000);
})();

/* ====================== atención ====================== */
(function () {
  var wrap = document.getElementById('alerts');
  var tail = document.getElementById('alertTail');

  /* orden: lo marcado como urgente sin fecha va primero (es lo que está
     trabado hoy), luego por cercanía, y lo abierto sin fecha al final. */
  function rank(r) {
    if (r.d !== null) return r.d;
    return r.a.hot ? -1 : 999;
  }
  var rows = ALERTS.map(function (a) { return { a: a, d: a.date ? daysUntil(a.date) : null }; })
    .filter(function (r) { return r.d === null || r.d >= 0; })
    .sort(function (x, y) { return rank(x) - rank(y); });

  var top = rows.slice(0, 5);
  tail.textContent = top.length + ' de ' + rows.length;

  wrap.innerHTML = top.map(function (r) {
    /* el color viene de qué tan cerca está, no de qué tema es */
    var sc = 'var(--faint)', rel, abs;
    if (r.d === null) {
      sc = r.a.hot ? 'var(--warn)' : 'var(--paused)';
      rel = r.a.hot ? 'pausa' : 'abierto';
      abs = 'sin fecha';
    } else {
      if (r.d <= 3) sc = 'var(--critical)';
      else if (r.d <= 10) sc = 'var(--warn)';
      else sc = 'var(--paused)';
      rel = r.d === 0 ? 'hoy' : r.d === 1 ? 'mañana' : r.d + ' d';
      var p = r.a.date.split('-');
      abs = Number(p[2]) + ' ' + MONTHS[Number(p[1]) - 1];
    }
    return '<a class="alert" style="--sc:' + sc + '" href="' + r.a.u + '" target="_blank" rel="noopener">' +
      '<span class="alert-ico" aria-hidden="true">' + r.a.i + '</span>' +
      '<span class="alert-body">' +
        '<span class="alert-title">' + esc(r.a.l) + '</span>' +
        (r.a.s ? '<p class="alert-sub">' + esc(r.a.s) + '</p>' : '') +
      '</span>' +
      '<span class="alert-when">' + rel + '<small>' + abs + '</small></span>' +
    '</a>';
  }).join('');
})();

/* ====================== tableros: todo a la vista, filtro + búsqueda ====================== */
(function () {
  var wrap = document.getElementById('boards');
  var filters = document.getElementById('filters');
  var input = document.getElementById('q');
  var noHits = document.getElementById('noHits');
  var tail = document.getElementById('boardTail');
  if (!wrap) return;

  var total = 0;
  wrap.innerHTML = GROUPS.map(function (g, gi) {
    total += g.b.length;
    var rows = g.b.map(function (b) {
      return '<a class="board" data-cat="' + gi + '" data-k="' + esc(b.k + ' ' + b.n + ' ' + b.w) + '"' +
        ' href="' + b.u + '" target="_blank" rel="noopener">' +
        '<span class="board-ico" aria-hidden="true">' + b.i + '</span>' +
        '<span class="board-body">' +
          '<span class="board-name">' + esc(b.n) + '</span>' +
          '<span class="board-what">' + esc(b.w) + '</span>' +
        '</span>' +
        '<span class="board-go" aria-hidden="true">›</span>' +
      '</a>';
    }).join('');
    return '<h3 class="cat-label" data-cat="' + gi + '">' + esc(g.n) + '</h3>' + rows;
  }).join('');

  filters.innerHTML = '<button type="button" class="filter" data-f="all" aria-pressed="true">Todos</button>' +
    GROUPS.map(function (g, gi) {
      return '<button type="button" class="filter" data-f="' + gi + '" aria-pressed="false">' + esc(g.n) + '</button>';
    }).join('');

  var boards = wrap.querySelectorAll('.board');
  var labels = wrap.querySelectorAll('.cat-label');
  var chips = filters.querySelectorAll('.filter');
  var active = 'all';

  var ACCENTS = new RegExp('[\\u0300-\\u036f]', 'g');
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(ACCENTS, ''); }

  function apply() {
    var q = norm(input.value.trim());
    var shown = 0;
    var perCat = {};

    Array.prototype.forEach.call(boards, function (el) {
      var cat = el.getAttribute('data-cat');
      var okCat = active === 'all' || active === cat;
      var okQ = !q || norm(el.getAttribute('data-k')).indexOf(q) !== -1;
      var hit = okCat && okQ;
      el.classList.toggle('hide', !hit);
      if (hit) { shown++; perCat[cat] = (perCat[cat] || 0) + 1; }
    });

    Array.prototype.forEach.call(labels, function (el) {
      el.classList.toggle('hide', !perCat[el.getAttribute('data-cat')]);
    });

    noHits.classList.toggle('hide', shown > 0);
    tail.textContent = shown === total ? total + ' tableros' : shown + ' de ' + total;
  }

  Array.prototype.forEach.call(chips, function (c) {
    c.addEventListener('click', function () {
      active = c.getAttribute('data-f');
      Array.prototype.forEach.call(chips, function (o) {
        o.setAttribute('aria-pressed', o === c ? 'true' : 'false');
      });
      apply();
    });
  });
  input.addEventListener('input', apply);
  apply();
})();

/* ====================== recargar ====================== */
(function () {
  var btn = document.getElementById('refreshBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    btn.disabled = true;
    var url = new URL(window.location.href);
    url.searchParams.set('_r', Date.now());
    window.location.replace(url.toString());
  });
})();

/* ====================== ruido de foco (marrón, Web Audio) ======================
   Dron grave y estable para concentrarse. Arranca apagado a propósito:
   es continuo, y el teléfono en silencio no debería sonar solo. */
(function () {
  var KEY = 'cerebroRuido';
  var on = false;
  try { on = localStorage.getItem(KEY) === '1'; } catch (e) {}

  var ctx = null, src = null, gain = null, filter = null, lfo = null, lfoGain = null;

  function ensureGraph() {
    if (ctx) return;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    if (!ctx) return;

    var bufSize = 2 * ctx.sampleRate;
    var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    var data = buf.getChannelData(0);
    var last = 0;
    for (var i = 0; i < bufSize; i++) {
      var white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }

    src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;

    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;

    gain = ctx.createGain();
    gain.gain.value = 0;

    lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    lfoGain = ctx.createGain();
    lfoGain.gain.value = 40;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    src.start(); lfo.start();
  }

  var btn = document.getElementById('soundBtn');
  function paint() {
    if (!btn) return;
    btn.textContent = on ? '🌊' : '🔇';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Apagar el ruido de foco' : 'Encender el ruido de foco');
    btn.title = on ? 'Ruido de foco encendido' : 'Ruido de foco — grave y estable, para concentración';
  }
  paint();

  if (btn) {
    btn.addEventListener('click', function () {
      on = !on;
      try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {}
      paint();
      if (on) {
        ensureGraph();
        if (ctx && ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
        if (gain) {
          gain.gain.cancelScheduledValues(ctx.currentTime);
          gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.2);
        }
      } else if (gain && ctx) {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      }
    });
  }
})();

/* ====================== dock inferior (navegación) ======================
   Sólo mueve el scroll y abre el campo de búsqueda. El filtrado sigue
   siendo del buscador original: aquí no se toca. */
(function () {
  var dock = document.getElementById('dock');
  var input = document.getElementById('q');
  if (!dock) return;

  var SPOTS = [
    { btn: 'navTop',    to: null },
    { btn: 'navAlerts', to: 's-atencion' },
    { btn: 'navDay',    to: 's-dia' }
  ];

  function goTo(id) {
    if (!id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  SPOTS.forEach(function (s) {
    var b = document.getElementById(s.btn);
    if (b) b.addEventListener('click', function () { goTo(s.to); });
  });

  function openSearch() {
    dock.classList.add('searching');
    goTo('tableros');
    if (input) { input.focus({ preventScroll: true }); }
  }
  function closeSearch() {
    dock.classList.remove('searching');
    if (input) input.blur();
  }

  var bSearch = document.getElementById('navSearch');
  var bClose = document.getElementById('navClose');
  if (bSearch) bSearch.addEventListener('click', openSearch);
  if (bClose) bClose.addEventListener('click', closeSearch);
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
    });
  }

  /* marca en qué sección vas */
  var marks = [
    { id: 'navTop',    el: null },
    { id: 'navAlerts', el: document.getElementById('s-atencion') },
    { id: 'navDay',    el: document.getElementById('s-dia') },
    { id: 'navSearch', el: document.getElementById('tableros') }
  ];
  var ticking = false;
  function mark() {
    ticking = false;
    var y = window.scrollY + 120;
    var current = 'navTop';
    marks.forEach(function (m) {
      if (m.el && m.el.offsetTop <= y) current = m.id;
    });
    marks.forEach(function (m) {
      var b = document.getElementById(m.id);
      if (b) b.setAttribute('aria-current', m.id === current ? 'true' : 'false');
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(mark); }
  }, { passive: true });
  mark();
})();
</script>

</body></html>


===== END FILE: ARTIFACTS_SOURCE/Cerebro.exe__19dc184b-9e66-40e3-a25f-d4348f83bf4b.html =====

===== BEGIN FILE: ARTIFACTS_SOURCE/Perfil.exe__1b3a94a5-78a4-4833-9e05-ff2d870c2917.html =====

<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}</style></head><body>
<title>Perfil.exe</title>
<style>
  :root {
    --bg: #05070c;
    --panel: #0b0f18;
    --panel-2: #0e1420;
    --panel-border: rgba(120,200,220,0.16);
    --panel-border-hover: rgba(120,220,240,0.5);
    --text: #e8f4f5;
    --text-dim: #8fa3ac;
    --text-faint: #4c6169;
    --hairline: rgba(120,220,240,0.09);

    --accent: #38bdf8;
    --ok: #4ade80;
    --wait: #fbbf24;

    --font-display: -apple-system, "SF Pro Display", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-body: -apple-system, "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-mono: ui-monospace, "SF Mono", "Menlo", "Consolas", monospace;

    color-scheme: dark;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); }
  body {
    min-height: 100vh;
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    background-image:
      radial-gradient(ellipse 900px 500px at 15% -10%, rgba(56,189,248,0.09), transparent 60%),
      repeating-linear-gradient(transparent, transparent 27px, var(--hairline) 28px);
    background-attachment: fixed;
  }

  .screen { max-width: 600px; margin: 0 auto; padding: clamp(20px, 6vw, 40px) 18px 64px; }

  .back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-faint);
    text-decoration: none;
    margin-bottom: 22px;
  }
  .back:hover { color: var(--text-dim); }

  header.hero { margin-bottom: 26px; }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }
  .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); }

  header.hero h1 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(2rem, 8vw, 2.4rem);
    letter-spacing: -0.02em;
    margin: 0 0 10px;
    text-wrap: balance;
    text-shadow: 0 0 24px rgba(56,189,248,0.28);
  }
  header.hero p { margin: 0; color: var(--text-dim); font-size: 0.95rem; line-height: 1.55; max-width: 48ch; }

  .card {
    background: var(--panel);
    border: 1px solid var(--panel-border);
    border-radius: 16px;
    padding: 18px;
    margin-bottom: 14px;
  }
  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .card h2 {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 650;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .fill-tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--wait);
    background: color-mix(in srgb, var(--wait) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--wait) 40%, transparent);
    padding: 2px 8px;
    border-radius: 999px;
    text-shadow: 0 0 8px color-mix(in srgb, var(--wait) 60%, transparent);
  }

  ul.facts { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
  ul.facts li {
    display: flex; align-items: flex-start; gap: 9px;
    font-size: 0.87rem; line-height: 1.48; color: var(--text-dim);
  }
  ul.facts li .dot2 { flex: none; margin-top: 6px; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 6px var(--accent); }
  ul.facts li b { color: var(--text); font-weight: 600; }
  ul.facts li a { color: var(--accent); }

  .open-q {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--hairline);
    font-size: 0.82rem;
    color: var(--text-faint);
    font-style: italic;
    line-height: 1.5;
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 12px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--accent);
    text-decoration: none;
  }
  .card-link:hover { text-decoration: underline; }

  .subhead {
    font-family: var(--font-mono);
    font-size: 0.63rem;
    font-weight: 650;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin: 16px 0 8px;
  }
  .subhead:first-of-type { margin-top: 2px; }

  /* ---------- gustos: black/red edgy re-theme ---------- */
  .gustos-card {
    --gr-red: #ff2b3d;
    --gr-bg: #0c0505;
    --gr-panel: #170909;
    --gr-panel-2: #200b0b;
    --gr-text: #f5e8e8;
    --gr-text-dim: #b98f8f;
    --gr-text-faint: #6e4c4c;
    position: relative;
    overflow: hidden;
    background: var(--gr-bg);
    border-color: color-mix(in srgb, var(--gr-red) 35%, transparent);
  }
  .gustos-card::before {
    content: "";
    position: absolute; inset: 0;
    background:
      repeating-linear-gradient(115deg, color-mix(in srgb, var(--gr-red) 5%, transparent) 0 1px, transparent 1px 24px),
      radial-gradient(ellipse 130% 55% at 10% -10%, color-mix(in srgb, var(--gr-red) 16%, transparent), transparent 60%);
    pointer-events: none;
  }
  .gustos-card > * { position: relative; }
  .gustos-card .card-head h2 {
    color: var(--gr-red);
    text-shadow: 0 0 12px color-mix(in srgb, var(--gr-red) 70%, transparent), 0 0 2px var(--gr-red);
    letter-spacing: 0.09em;
  }

  .gustos-card .ghead {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gr-text-dim);
    margin: 20px 0 9px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .gustos-card .gustos-group:first-of-type .ghead { margin-top: 4px; }
  .gustos-card .ghead::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, color-mix(in srgb, var(--gr-red) 40%, transparent), transparent);
  }

  .glist { display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px; }
  .gitem {
    border: 1px solid color-mix(in srgb, var(--gr-red) 22%, transparent);
    border-left: 2px solid color-mix(in srgb, var(--gr-red) 55%, transparent);
    background: var(--gr-panel);
    border-radius: 4px;
    overflow: hidden;
  }
  .gitem[open] { border-color: color-mix(in srgb, var(--gr-red) 55%, transparent); border-left-color: var(--gr-red); }
  .gitem summary {
    list-style: none;
    cursor: pointer;
    padding: 10px 12px;
    display: flex;
    align-items: baseline;
    gap: 9px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--gr-text);
  }
  .gitem summary::-webkit-details-marker { display: none; }
  .gitem summary::marker { content: ""; }
  .gitem summary::after {
    content: "+";
    margin-left: auto;
    font-family: var(--font-mono);
    color: var(--gr-red);
    font-size: 0.9rem;
  }
  .gitem[open] summary::after { content: "\2212"; }
  .gitem summary:hover { background: color-mix(in srgb, var(--gr-red) 6%, transparent); }
  .gitem summary:focus-visible { outline: 2px solid var(--gr-red); outline-offset: -2px; }
  .gitem .gsub {
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: 0.68rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--gr-text-faint);
  }
  .gitem .gbody { padding: 0 14px 13px; font-size: 0.85rem; line-height: 1.55; color: var(--gr-text-dim); }
  .gitem .gbody p { margin: 0 0 8px; }
  .gitem .gbody p:last-child { margin-bottom: 0; }
  .gitem .gbody b { color: var(--gr-text); }
  .gsim { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 0.78rem; }
  .gsim .gsim-label { color: var(--gr-text-faint); }
  .stag {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--gr-text-dim);
    border: 1px solid color-mix(in srgb, var(--gr-red) 30%, transparent);
    border-radius: 999px;
    padding: 2px 8px;
  }

  .chip-row { display: flex; flex-wrap: wrap; gap: 7px; margin: 0 0 8px; }
  .chip {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--gr-text-dim);
    background: color-mix(in srgb, var(--gr-red) 10%, var(--gr-panel-2));
    border: 1px solid color-mix(in srgb, var(--gr-red) 32%, transparent);
    border-radius: 999px;
    padding: 5px 12px;
    white-space: nowrap;
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  }
  .chip:hover {
    transform: translateY(-1px);
    border-color: var(--gr-red);
    color: var(--gr-text);
    background: color-mix(in srgb, var(--gr-red) 20%, var(--gr-panel-2));
  }

  .chip-note { font-size: 0.82rem; color: var(--gr-text-faint); line-height: 1.55; margin: 0; }
  .chip-note b { color: var(--gr-text-dim); }

  .berserk-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--gr-red);
    background:
      repeating-linear-gradient(135deg, color-mix(in srgb, var(--gr-red) 8%, transparent) 0 2px, transparent 2px 14px),
      color-mix(in srgb, var(--gr-red) 9%, var(--gr-panel));
    border-radius: 6px;
    padding: 14px 16px;
    box-shadow: 0 0 22px -6px color-mix(in srgb, var(--gr-red) 55%, transparent), inset 0 0 30px -20px var(--gr-red);
  }
  .berserk-panel::before {
    content: "";
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 140% 100% at 100% 0%, color-mix(in srgb, var(--gr-red) 24%, transparent), transparent 60%);
    pointer-events: none;
  }
  .berserk-tag {
    position: relative;
    display: inline-block;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gr-bg);
    background: var(--gr-red);
    border-radius: 999px;
    padding: 3px 10px;
    margin-bottom: 9px;
  }
  .berserk-panel p {
    position: relative;
    margin: 0 0 8px;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--gr-text);
  }
  .berserk-panel p:last-child { margin-bottom: 0; }
  .berserk-panel .gsim { margin-top: 2px; }
  .berserk-panel .stag { border-color: color-mix(in srgb, var(--gr-red) 55%, transparent); }

  .gustos-card .open-q { color: var(--gr-text-faint); border-top-color: color-mix(in srgb, var(--gr-red) 22%, transparent); }

  footer {
    margin-top: 30px; padding-top: 18px; border-top: 1px solid var(--hairline);
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-faint);
    letter-spacing: 0.03em; line-height: 1.7;
  }
</style>

<div class="screen">
  <a class="back" href="https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b">&larr; Cerebro.exe</a>

  <header class="hero">
    <span class="eyebrow"><span class="dot"></span>contexto personal</span>
    <h1>Perfil</h1>
    <p>Lo que hay detrás de las metas: salud, familia, amigos y gustos. Sin checklist ni fecha límite — solo contexto para ayudarte con más criterio.</p>
  </header>

  <div class="card">
    <div class="card-head">
      <h2>🩺 Salud</h2>
      <span class="fill-tag">apenas empezando</span>
    </div>
    <ul class="facts">
      <li><span class="dot2"></span><span><b>El sueño está mal casi siempre</b> con el horario rotativo (confirmado 18/08/2026) — problema real, no solo molestia.</span></li>
      <li><span class="dot2"></span><span>Ya no vas a terapia (confirmado 15/08/2026); en algún momento se mencionó posible TLP y ansiedad — no es diagnóstico, es contexto tuyo.</span></li>
      <li><span class="dot2"></span><span>Sientes que te cuesta concentrarte y recordar cosas — parte de por qué existe este sistema.</span></li>
      <li><span class="dot2"></span><span>No practicas deporte todavía; te llama el box, y estás viendo tenis o squash como alternativa.</span></li>
      <li><span class="dot2"></span><span>Nada médico pendiente ahorita (confirmado 18/08/2026). Usas lentes.</span></li>
    </ul>
    <p class="open-q">Falta: si el sueño es falta de tiempo por el traslado o algo más, y si ya probaste algo para mejorarlo.</p>
  </div>

  <div class="card">
    <div class="card-head">
      <h2>👪 Familia</h2>
    </div>
    <ul class="facts">
      <li><span class="dot2"></span><span>Vives con tus papás actualmente (confirmado 18/08/2026).</span></li>
      <li><span class="dot2"></span><span><b>Mamá</b> — cumpleaños 20 de septiembre.</span></li>
      <li><span class="dot2"></span><span><b>Papá</b> — cumpleaños 21 de septiembre, un día después.</span></li>
      <li><span class="dot2"></span><span><b>Hermana</b> — nació el 4 de octubre de 2004. Se llevan muy bien: música y marihuana juntos.</span></li>
    </ul>
    <p class="open-q">Falta: cómo es la relación día a día con tus papás, si hay algo pendiente con la familia.</p>
  </div>

  <div class="card">
    <div class="card-head">
      <h2>🤝 Amigos / vida social</h2>
    </div>
    <ul class="facts">
      <li><span class="dot2"></span><span><b>Sí tienes gente cercana: amigos del trabajo, que ves a diario</b> (confirmado 18/08/2026) — la vida social que falta es más bien fuera del trabajo.</span></li>
      <li><span class="dot2"></span><span>Te gustaría conocer gente, salir a comer, convivir más fuera del turno.</span></li>
      <li><span class="dot2"></span><span>El horario rotativo y el traslado de 2h40 al día casi no dejan tiempo para eso entre semana.</span></li>
    </ul>
    <p class="open-q">Falta: si tienes amigos de antes de Boost Mobile, y si se ven también fuera del trabajo con los del turno.</p>
  </div>

  <div class="card gustos-card">
    <div class="card-head">
      <h2>⚔️ Gustos e intereses</h2>
    </div>

    <div class="gustos-group">
      <p class="ghead">🎵 Música</p>
      <div class="glist">
        <details class="gitem">
          <summary>Interpol <span class="gsub">post-punk · NYC</span></summary>
          <div class="gbody">
            <p><b>Turn on the Bright Lights</b> (2002) es el disco que los puso en el mapa: guitarras heladas, bajo al frente y la voz casi hablada de Paul Banks. Sonido oscuro y elegante, heredero directo de Joy Division.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Editors</span> <span class="stag">The Strokes</span> <span class="stag">She Wants Revenge</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Helena Beat <span class="gsub">Foster the People · 2011</span></summary>
          <div class="gbody">
            <p>De <b>Torches</b>, el álbum debut de Foster the People — indietrónica con synths brillantes y un groove que contrasta con lo oscuro de la letra. La traes en repeat ahorita.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">MGMT</span> <span class="stag">Passion Pit</span> <span class="stag">Two Door Cinema Club</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Arctic Monkeys <span class="gsub">rock indie · Sheffield</span></summary>
          <div class="gbody">
            <p><b>Tranquility Base Hotel &amp; Casino</b> (2018) fue su giro más arriesgado: dejaron el garage-rock de sus inicios por algo más lounge, art-rock, con Alex Turner al piano en vez de guitarra distorsionada.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">The Strokes</span> <span class="stag">Franz Ferdinand</span> <span class="stag">The Last Shadow Puppets</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Nirvana <span class="gsub">grunge · Seattle</span></summary>
          <div class="gbody">
            <p><b>Nevermind</b> (1991) llevó el grunge al mainstream de la noche a la mañana. "Smells Like Teen Spirit" cambió el rock de los 90 para siempre.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Pearl Jam</span> <span class="stag">Soundgarden</span> <span class="stag">Alice in Chains</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Kendrick Lamar <span class="gsub">rap · Compton</span></summary>
          <div class="gbody">
            <p><b>good kid, m.A.A.d city</b>, <b>To Pimp a Butterfly</b> y <b>DAMN.</b> — este último le ganó el Pulitzer de Música en 2018, el primero para un disco fuera de clásica o jazz.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">J. Cole</span> <span class="stag">Tyler, the Creator</span> <span class="stag">Vince Staples</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Eminem <span class="gsub">rap · Detroit</span></summary>
          <div class="gbody">
            <p><b>The Marshall Mathers LP</b> y <b>The Eminem Show</b> lo consolidaron como uno de los MCs más técnicos de su generación — flow denso, letras autobiográficas crudas. Ya no lo sigues tanto, pero se quedó.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">50 Cent</span> <span class="stag">D12</span> <span class="stag">Royce da 5'9"</span></p>
          </div>
        </details>
      </div>
      <p class="chip-note">Tocas guitarra. Te laten sobre todo rock, pop, hip-hop/rap, indie y reggaetón.</p>
    </div>

    <div class="gustos-group">
      <p class="ghead">🎬 Cine</p>
      <div class="glist">
        <details class="gitem">
          <summary>Prisoners <span class="gsub">2013 · Denis Villeneuve</span></summary>
          <div class="gbody">
            <p>Hugh Jackman y Jake Gyllenhaal en una investigación de secuestro que se vuelve moralmente turbia. Villeneuve antes de <i>Blade Runner 2049</i> y <i>Dune</i>.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Zodiac</span> <span class="stag">Gone Girl</span> <span class="stag">Mystic River</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Nocturnal Animals <span class="gsub">2016 · Tom Ford</span></summary>
          <div class="gbody">
            <p>Amy Adams recibe el manuscrito de su exesposo (Jake Gyllenhaal) y la historia dentro de la historia se vuelve una amenaza. Estética impecable, típica de un diseñador de modas convertido en director.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Prisoners</span> <span class="stag">Enemy</span> <span class="stag">Gone Girl</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Tenet <span class="gsub">2020 · Christopher Nolan</span></summary>
          <div class="gbody">
            <p>Espionaje con inversión temporal — la trama va y viene en el tiempo, literalmente. Una de las películas más complejas de Nolan, a la par de <i>Inception</i>. La verías mil veces sin cansarte.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Inception</span> <span class="stag">Interstellar</span> <span class="stag">Memento</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>La Odisea <span class="gsub">Christopher Nolan</span></summary>
          <div class="gbody">
            <p>Su adaptación de la Odisea de Homero, con un elenco enorme (Matt Damon, Tom Holland, Zendaya, entre otros). Su proyecto más ambicioso desde <i>Oppenheimer</i>.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Tenet</span> <span class="stag">Interstellar</span> <span class="stag">Troya</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Heat <span class="gsub">1995 · Michael Mann</span></summary>
          <div class="gbody">
            <p>Al Pacino y Robert De Niro cara a cara por primera vez en pantalla. La escena del atraco al banco es una de las mejores del cine de acción realista.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">The Town</span> <span class="stag">Collateral</span> <span class="stag">Sicario</span></p>
          </div>
        </details>
      </div>
      <p class="chip-note">Terror/suspenso, tu género favorito. Christopher Nolan, Stanley Kubrick y Michael Mann son los directores que más te laten.</p>
    </div>

    <div class="gustos-group">
      <p class="ghead">📺 Series</p>
      <div class="glist">
        <details class="gitem">
          <summary>Dexter <span class="gsub">Showtime · 2006–2013</span></summary>
          <div class="gbody">
            <p>Dexter Morgan, analista forense de sangre de día que de noche es un asesino serial — pero solo mata a otros asesinos. Te quedaste a medias; quieres retomarla.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Mindhunter</span> <span class="stag">You</span> <span class="stag">Hannibal</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>The Last of Us <span class="gsub">HBO</span></summary>
          <div class="gbody">
            <p>Adaptación del videojuego de Naughty Dog — Pedro Pascal y Bella Ramsey cargando la parte emocional más que la de zombis.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Chernobyl</span> <span class="stag">The Walking Dead</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Breaking Bad <span class="gsub">AMC · 2008–2013</span></summary>
          <div class="gbody">
            <p>Un profesor de química se convierte en fabricante de metanfetaminas. Bryan Cranston como Walter White, una de las transformaciones de personaje más estudiadas de la TV.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Better Call Saul</span> <span class="stag">Ozark</span> <span class="stag">The Wire</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Better Call Saul <span class="gsub">AMC · 2015–2022</span></summary>
          <div class="gbody">
            <p>El origen de Saul Goodman — más lento y más trágico de lo que esperarías de una precuela de comedia.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Breaking Bad</span> <span class="stag">Ozark</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Peaky Blinders <span class="gsub">BBC · 2013–2022</span></summary>
          <div class="gbody">
            <p>Familia de gángsters en el Birmingham de los años 20, liderada por Thomas Shelby (Cillian Murphy). Estética muy marcada, banda sonora anacrónica a propósito.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Boardwalk Empire</span> <span class="stag">Gangs of London</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Seinfeld <span class="gsub">NBC · 1989–1998</span></summary>
          <div class="gbody">
            <p>El "show sobre nada" — episodios sin moraleja, centrados en lo absurdo de la vida cotidiana en Nueva York.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Curb Your Enthusiasm</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>The Office <span class="gsub">NBC · 2005–2013</span></summary>
          <div class="gbody">
            <p>Steve Carell como el jefe más incómodo de la TV. El formato falso documental que se volvió el estándar de la comedia moderna.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Parks and Recreation</span> <span class="stag">Seinfeld</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>Shrek <span class="gsub">2001</span></summary>
          <div class="gbody">
            <p>DreamWorks subvirtiendo los cuentos de hadas de Disney con humor absurdo. El ogro que no quiere ser héroe.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Shrek 2</span> <span class="stag">Puss in Boots</span></p>
          </div>
        </details>
      </div>
    </div>

    <div class="gustos-group">
      <p class="ghead">📖 Libros</p>
      <div class="glist">
        <details class="gitem">
          <summary>Siddhartha <span class="gsub">Hermann Hesse · 1922</span></summary>
          <div class="gbody">
            <p>La búsqueda espiritual de un joven en la India, inspirada libremente en la vida de Buda. Corto, denso, se lee en pocas sentadas. Lo estás releyendo ahorita.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">El Alquimista</span> <span class="stag">Zen y el arte del mantenimiento de la motocicleta</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>1984 <span class="gsub">George Orwell · 1949</span></summary>
          <div class="gbody">
            <p>Vigilancia total, control del lenguaje, un régimen que reescribe la realidad. El origen de términos como "Gran Hermano" y "doblepensar".</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Un mundo feliz</span> <span class="stag">Fahrenheit 451</span></p>
          </div>
        </details>
        <details class="gitem">
          <summary>El Extranjero <span class="gsub">Albert Camus · 1942</span></summary>
          <div class="gbody">
            <p>Meursault, indiferente ante todo — incluso ante su propia sentencia de muerte. La novela que mejor resume el absurdismo de Camus.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">El mito de Sísifo</span> <span class="stag">La náusea</span></p>
          </div>
        </details>
      </div>
      <p class="chip-note">Leyendo ahora <b>El arte de la guerra</b> (Sun Tzu), y releyendo <b>Siddhartha</b>.</p>
    </div>

    <div class="gustos-group">
      <p class="ghead">🎮 Videojuegos</p>
      <div class="glist">
        <details class="gitem">
          <summary>Silent Hill 2 <span class="gsub">remake · Bloober Team, 2024</span></summary>
          <div class="gbody">
            <p>El remake del clásico de terror psicológico de 2001 — James Sunderland busca a su esposa muerta en un pueblo que refleja su propia culpa. Lo estás jugando ahorita.</p>
            <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Resident Evil</span> <span class="stag">The Evil Within</span> <span class="stag">Alan Wake</span></p>
          </div>
        </details>
      </div>
      <p class="chip-note">Otros favoritos: <b>Red Dead Redemption 2</b>, <b>The Last of Us</b>, <b>God of War</b> — se nota el patrón con terror/suspenso e historias narrativas fuertes.</p>
    </div>

    <div class="gustos-group">
      <p class="ghead">⚔️ Berserk</p>
      <div class="berserk-panel">
        <span class="berserk-tag">el que más te pega</span>
        <p>Manga de Kentaro Miura (1989–2021, continuado tras su muerte). Fantasía oscura, el arte más detallado y brutal del género — Guts cargando una espada más grande que él contra el destino mismo. Te encanta el estilo de dibujo, el personaje, y la esencia general de la historia.</p>
        <p class="gsim"><span class="gsim-label">Se parece a:</span> <span class="stag">Vagabond</span> <span class="stag">Dark Souls</span> <span class="stag">Attack on Titan</span></p>
      </div>
    </div>

    <div class="gustos-group">
      <p class="ghead">🎨 Arte y cosas cool</p>
      <div class="chip-row">
        <span class="chip">Absurdismo</span>
        <span class="chip">Estoicismo</span>
        <span class="chip">Existencialismo</span>
        <span class="chip">Budismo</span>
        <span class="chip">Relojes</span>
        <span class="chip">Perfumes</span>
        <span class="chip">Tatuajes</span>
        <span class="chip">Navajas</span>
        <span class="chip">Café</span>
        <span class="chip">Montaña</span>
        <span class="chip">Invierno</span>
      </div>
      <p class="chip-note">Pintura y fotografía en general — sin favoritos específicos todavía. Te gusta manejar rápido. Relaciones Internacionales, comercio exterior e investigación te llaman incluso hacia el camino académico. Comida que nunca falla: pizza, hamburguesa, algún corte de carne. Sueñas con conocer Nueva York, Noruega y Japón.</p>
    </div>

    <p class="open-q">Falta: pintores/obras específicas, y cualquier detalle de Berserk que quieras profundizar (arco, cita, momento).</p>
  </div>

  <footer>fuente: perfil/salud.md, familia.md, amigos.md e intereses.md &middot; se regenera cuando cuentes algo nuevo</footer>
</div>

</body></html>


===== END FILE: ARTIFACTS_SOURCE/Perfil.exe__1b3a94a5-78a4-4833-9e05-ff2d870c2917.html =====

===== BEGIN FILE: ARTIFACTS_SOURCE/Periodico.exe__4169c45b-465f-4ecd-9015-7f76693f3614.html =====

<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>
<!doctype html>
<html>
<head>
<meta charset="utf8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Periódico.exe</title>
<style>
  :root {
    --bg: #0b0611;
    --panel: #170d20;
    --panel-2: #1e1330;
    --line: rgba(255,111,181,0.15);
    --hair: rgba(255,111,181,0.10);
    --text: #f5eef8;
    --dim: #a494b3;
    --faint: #615473;

    --accent: #ff6fb5;
    --gold: #e8c766;
    --violet: #9d7fff;
    --green: #57d38c;
    --cyan: #4fd7e8;
    --blue: #5cc4ff;

    --font-display: -apple-system, "SF Pro Display", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-body: -apple-system, "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    color-scheme: dark;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); }
  body {
    min-height: 100vh;
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    background-image:
      radial-gradient(ellipse 800px 460px at 12% -8%, rgba(255,111,181,.13), transparent 60%),
      radial-gradient(ellipse 640px 460px at 92% 26%, rgba(157,127,255,.09), transparent 60%),
      repeating-linear-gradient(transparent, transparent 27px, var(--hair) 28px);
    background-attachment: fixed;
  }

  .screen { max-width: 460px; margin: 0 auto; padding: 16px 16px calc(46px + env(safe-area-inset-bottom,0px)); }

  .rgb {
    height: 3px; border-radius: 999px; margin-bottom: 14px;
    background: linear-gradient(90deg,#ff6fb5,#e8c766,#57d38c,#4fd7e8,#9d7fff,#ff6fb5);
    background-size: 220% 100%;
    box-shadow: 0 0 14px 1px rgba(255,111,181,.5);
  }
  @media (prefers-reduced-motion: no-preference) { .rgb { animation: rgbrun 3.2s linear infinite; } }
  @keyframes rgbrun { to { background-position: 220% 50%; } }

  .back {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono); font-size: .66rem; letter-spacing: .06em; text-transform: uppercase;
    color: var(--faint); text-decoration: none; margin-bottom: 16px;
  }
  .back:hover { color: var(--dim); }

  .masthead { text-align: center; border-bottom: 2px solid var(--line); padding-bottom: 14px; }
  .kicker {
    font-family: var(--font-mono); font-size: .6rem; letter-spacing: .16em; text-transform: uppercase;
    color: var(--faint); margin: 0 0 7px;
  }
  .masthead h1 {
    font-family: var(--font-display); font-weight: 800; font-size: clamp(1.9rem, 9vw, 2.5rem);
    letter-spacing: -.02em; margin: 0; text-wrap: balance;
    background: linear-gradient(90deg, var(--accent), var(--violet));
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .dateline {
    display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 8px; flex-wrap: wrap;
    font-family: var(--font-mono); font-size: .66rem; color: var(--dim);
  }
  .dateline .dot { width: 3px; height: 3px; border-radius: 50%; background: var(--faint); }

  .lead {
    margin: 16px 0 0; padding: 15px 16px 16px;
    background: var(--panel); border: 1px solid var(--line); border-radius: 14px;
    box-shadow: 0 0 28px -18px var(--accent);
  }
  .eyebrow {
    font-family: var(--font-mono); font-size: .6rem; letter-spacing: .12em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 7px; display: flex; align-items: center; gap: 6px;
  }
  .lead h2 { font-family: var(--font-display); font-weight: 700; font-size: 1.16rem; margin: 0 0 7px; line-height: 1.3; text-wrap: balance; }
  .lead p { margin: 0; color: var(--dim); font-size: .85rem; line-height: 1.55; }
  a.ilink { color: var(--accent); }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 14px 0 0; }
  .card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 12px 13px; }
  .card .eyebrow { color: var(--gold); }
  .card .big { font-family: var(--font-display); font-weight: 700; font-size: 1.25rem; margin: 0 0 2px; font-variant-numeric: tabular-nums; }
  .card .sub { font-size: .74rem; color: var(--dim); margin: 0; line-height: 1.45; }
  .card .foot { margin: 7px 0 0; font-family: var(--font-mono); font-size: .58rem; color: var(--faint); line-height: 1.4; }

  .wrow { display: flex; justify-content: space-between; align-items: baseline; gap: 6px; }
  .wrow + .wrow { margin-top: 5px; padding-top: 5px; border-top: 1px dashed var(--hair); }
  .wplace { font-size: .72rem; color: var(--dim); }
  .wtemp { font-family: var(--font-mono); font-size: .8rem; font-weight: 600; }

  /* ---- turno de hoy ---- */
  .shift { margin: 14px 0 0; padding: 12px 13px; background: var(--panel-2); border: 1px solid var(--line); border-radius: 12px; }
  .shift .eyebrow { color: var(--cyan); }
  .breaks { display: flex; flex-direction: column; gap: 4px; }
  .brow { display: flex; align-items: center; gap: 9px; font-size: .78rem; }
  .btime { flex: none; width: 3.2rem; font-family: var(--font-mono); font-size: .7rem; color: var(--cyan); font-variant-numeric: tabular-nums; }
  .bico { flex: none; font-size: .9rem; }
  .blab { flex: 1; min-width: 0; color: var(--dim); }

  .section { margin: 20px 0 0; }
  .section-title {
    font-family: var(--font-mono); font-size: .64rem; letter-spacing: .1em; text-transform: uppercase;
    color: var(--faint); margin: 0 0 8px; display: flex; align-items: center; gap: 8px;
  }
  .section-title::after { content: ""; flex: 1; height: 1px; background: var(--hair); }

  .story { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--hair); }
  .story:last-child { border-bottom: none; padding-bottom: 0; }
  .story-mark {
    flex: none; width: 24px; height: 24px; border-radius: 50%; margin-top: 1px;
    display: flex; align-items: center; justify-content: center; font-size: .76rem;
    background: color-mix(in srgb, var(--sc, var(--accent)) 20%, var(--panel));
    border: 1px solid color-mix(in srgb, var(--sc, var(--accent)) 55%, transparent);
  }
  .story-body { min-width: 0; }
  .story-body h3 { margin: 0 0 3px; font-size: .87rem; font-weight: 700; line-height: 1.3; }
  .story-body p { margin: 0; font-size: .78rem; color: var(--dim); line-height: 1.5; }
  .tag {
    font-family: var(--font-mono); font-size: .57rem; color: var(--sc, var(--accent)); letter-spacing: .04em;
    text-transform: uppercase; margin-left: 5px; white-space: nowrap;
  }
  .src { font-family: var(--font-mono); font-size: .58rem; color: var(--faint); }
  .src a { color: var(--cyan); text-decoration: none; }
  .src a:hover { text-decoration: underline; }
  .persp {
    font-family: var(--font-mono); font-size: .58rem; letter-spacing: .04em; text-transform: uppercase;
    color: var(--pc, var(--accent)); background: color-mix(in srgb, var(--pc, var(--accent)) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--pc, var(--accent)) 40%, transparent);
    border-radius: 999px; padding: 2px 7px; white-space: nowrap;
  }

  .empty {
    font-family: var(--font-mono); font-size: .72rem; color: var(--faint);
    border: 1px dashed var(--hair); border-radius: 10px; padding: 10px 12px; line-height: 1.5;
  }

  footer {
    margin-top: 26px; padding-top: 14px; border-top: 1px solid var(--hair);
    font-family: var(--font-mono); font-size: .6rem; color: var(--faint);
    letter-spacing: .02em; line-height: 1.7; text-align: center;
  }
  footer a { color: var(--faint); }
</style>
</head>
<body>
<div class="screen">
  <div class="rgb" aria-hidden="true"></div>
  <a class="back" href="https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b">&larr; Cerebro.exe</a>

  <div class="masthead">
    <p class="kicker" id="edicion">Edición matutina &middot; Nezahualcóyotl / CDMX</p>
    <h1>El Cerebro</h1>
    <div class="dateline">
      <span id="dateline">—</span>
      <span class="dot"></span>
      <span>5am &middot; break 1 &middot; break 2 &middot; llegada &middot; cierre</span>
    </div>
  </div>

  <!-- ===== SECCIÓN 1: TITULAR. La Routine la reescribe en cada edición. ===== -->
  <div class="lead" data-slot="titular">
    <p class="eyebrow">🌅 Edición matutina</p>
    <h2>Viernes 11/09, segundo día off: mañana con Fanny y bloque largo de tarde</h2>
    <p>Hoy no hay turno ni pendiente de trabajo encima — es el segundo de los dos días off del
       ciclo. La titulación sigue exactamente igual que el 09/09: esperando la respuesta definitiva
       de David García Contreras (Jefe de Carrera), así que sigue sin pagarse la ficha ni
       firmarse nada. El Chevy sigue arreglado. Mañana sábado 12/09 vuelve el turno 6am-4pm.</p>
  </div>

  <!-- ===== SECCIÓN 2: CLIMA + PRÓXIMO EVENTO ===== -->
  <div class="grid">
    <div class="card" data-slot="clima">
      <p class="eyebrow">🌤️ Clima ahora</p>
      <div class="wrow"><span class="wplace">Casa (Neza) ahora</span><span class="wtemp">26°C</span></div>
      <div class="wrow"><span class="wplace">Trabajo (Tabacalera) ahora</span><span class="wtemp">18°C</span></div>
      <p class="foot">Neza: 88% de nubes, viento SE ~19 km/h, humedad 34% — riesgo de chubasco
         tormentoso por la tarde. Tabacalera/CDMX: sensación de 17°C, parcialmente nublado con
         100% de probabilidad de lluvia hoy (máxima 25°C, mínima 15°C). Hoy no hay traslado
         (día off), pero si sales con Fanny, lleva paraguas.</p>
    </div>
    <div class="card" data-slot="proximo-evento">
      <p class="eyebrow">⏳ Próximo evento</p>
      <p class="big" id="nextEventDays">—</p>
      <p class="sub" id="nextEventName">Cumpleaños de mamá</p>
      <p class="foot">20 de septiembre</p>
    </div>
  </div>

  <!-- ===== SECCIÓN 3: TU TURNO HOY (breaks reales, se calcula solo) ===== -->
  <div class="shift" data-slot="turno">
    <p class="eyebrow" id="shiftLabel">⏱️ Tu turno hoy</p>
    <div class="breaks" id="breaks"></div>
  </div>

  <!-- ===== SECCIÓN 4: LO MÁS URGENTE ===== -->
  <div class="section" data-slot="urgente">
    <p class="section-title">Lo más urgente</p>
    <div class="story">
      <span class="story-mark" style="--sc:#e8c766">🎓</span>
      <div class="story-body">
        <h3>Titulación: sigue esperando la respuesta definitiva<span class="tag" style="--sc:#e8c766">en pausa</span></h3>
        <p>David García Contreras (Jefe de Carrera) contestó el 09/09 que van a consultar con el área
           correspondiente — no es la respuesta final. Sigue igual: no pagar la ficha ($620) ni
           imprimir/firmar el ATI o la solicitud mientras no llegue el resultado real.</p>
      </div>
    </div>
    <p class="empty">Nada vencido ni con fecha encima hoy — día off, sin pendiente de trabajo.
       Lo más próximo con fecha real: <strong>20/09</strong> cumpleaños de mamá (9 días) y
       <strong>21/09</strong> el de papá (10 días), pegados — resolverlos de un solo golpe.
       Después, <strong>27/09</strong> corte de la tarjeta MercadoPago ($3,201.59, con el AT&T
       de mamá dentro) en 16 días — apartar el dinero antes de esa fecha. Resto del panorama en
       <a class="ilink" href="https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b">Cerebro.exe</a>.</p>
  </div>

  <!-- ===== SECCIÓN 5: NOTICIAS. OBLIGATORIA en cada edición.
       La Routine debe buscarlas en vivo (comercio exterior, RI, América Latina,
       economía MX, tipo de cambio) y reemplazar estas historias. ===== -->
  <div class="section" data-slot="noticias">
    <p class="section-title">📰 Noticias de tus temas</p>
    <div class="story">
      <span class="story-mark" style="--sc:#5cc4ff">🛃</span>
      <div class="story-body">
        <h3>Sheinbaum y Ebrard aceleran la negociación comercial con EU<span class="tag" style="--sc:#5cc4ff">comercio exterior</span></h3>
        <p>Sheinbaum reportó avances tras hablar con Howard Lutnick (secretario de Comercio de EU);
           Ebrard ya está en Washington dando seguimiento. Todavía no hay acuerdo que anunciar,
           pero México mantiene la línea de "diálogo sin afectar soberanía ni economía" — de fondo
           está la revisión del T-MEC, el evento que puede mover todo el comercio exterior este año.</p>
        <p class="src"><a href="https://www.excelsior.com.mx/opinion/frentes-politicos-11-septiembre-2026" target="_blank" rel="noopener">seguir leyendo → Excélsior</a></p>
      </div>
    </div>
    <div class="story">
      <span class="story-mark" style="--sc:#9d7fff">🌎</span>
      <div class="story-body">
        <h3>Rubio busca una "época dorada" con Colombia tras reunirse con De la Espriella<span class="tag" style="--sc:#9d7fff">américa latina</span></h3>
        <p>El secretario de Estado de EE.UU. se reunió con el presidente colombiano y habló de
           relucir la relación bilateral; en paralelo, Perú anunció que "formará parte del Escudo
           de las Américas" tras la reunión de Fujimori con Rubio — misma gira que reordena el
           mapa de alianzas de EE.UU. en la región.</p>
        <p class="src"><a href="https://cnnespanol.cnn.com/latinoamerica" target="_blank" rel="noopener">seguir leyendo → CNN en Español</a></p>
      </div>
    </div>
    <div class="story">
      <span class="story-mark" style="--sc:#57d38c">💱</span>
      <div class="story-body">
        <h3>El peso abre la semana cerca de 16.90-17.00 por dólar<span class="tag" style="--sc:#57d38c">tipo de cambio</span></h3>
        <p>El tipo de cambio de referencia de Banxico para hoy viernes ronda los $16.99 por dólar,
           con la sesión de mercados abriendo cerca de $16.96 — variaciones menores según la fuente
           y el momento del día, pero el peso se mantiene relativamente estable esta semana.</p>
        <p class="src"><a href="https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=6&accion=consultarCuadro&idCuadro=CF373&locale=es" target="_blank" rel="noopener">seguir leyendo → Banxico</a></p>
      </div>
    </div>
    <p class="empty">Feed completo con más notas y la leyenda de perspectivas en
       <a class="ilink" href="https://claude.ai/code/artifact/776e9c82-74b6-4efc-9698-866474be9271">Descubre.exe</a>.
       Esta sección se refresca en cada edición automática.</p>
  </div>

  <!-- ===== SECCIÓN 6: VACANTES. OBLIGATORIA. Modo mantenimiento:
       1-2 vacantes que valga la pena mirar en la comida, no una lista larga. ===== -->
  <div class="section" data-slot="vacantes">
    <p class="section-title">💼 Vacantes que valen un vistazo</p>
    <p class="empty">Búsqueda en vivo de hoy (11/09): nada que cumpla claramente 2 de 3
       (sueldo más alto, remoto/menos traslado, salario bien registrado ante el IMSS). Lo que
       apareció fue genérico (bolsas de trabajo con cientos de resultados sin sueldo publicado) o
       por debajo de tu sueldo actual — un puesto de auxiliar de comercio exterior en CDMX rondaba
       $10,400-$12,500/mes, menos de lo que ganas hoy. No vale la pena romper el modo mantenimiento
       por esto. Sigue con las 4 búsquedas guardadas en la comida —
       <a class="ilink" href="https://claude.ai/code/artifact/fe81e91b-4a6f-4e04-aa6f-8355a64bb136">Trabajo.exe</a>.</p>
  </div>

  <!-- ===== SECCIÓN 7: EVENTOS / QUÉ HAY CERCA. OBLIGATORIA. ===== -->
  <div class="section" data-slot="eventos">
    <p class="section-title">🎪 Qué hay cerca</p>
    <div class="story">
      <span class="story-mark" style="--sc:#5cc4ff">🎤</span>
      <div class="story-body">
        <h3>aespa hoy y Laufey mañana, ambos en el Palacio de los Deportes<span class="tag" style="--sc:#5cc4ff">vie-sáb</span></h3>
        <p>aespa se presenta hoy viernes 11 a las 8pm (gira SYNK: COMPLæXITY); Laufey llega mañana
           sábado 12 con su Tour "A Matter of Time" y Amie Blu de telonera. El mismo fin de semana,
           el Vans Warped Tour corre 12-13 sep en el Autódromo Hermanos Rodríguez — ninguno estaba
           en tu radar, pero quedan cerca si algo se acomoda.</p>
        <p class="src"><a href="https://revistaflow.com/conciertos-cdmx-septiembre-2026/" target="_blank" rel="noopener">seguir leyendo → Revista Flow</a></p>
      </div>
    </div>
    <div class="story">
      <span class="story-mark" style="--sc:#e8c766">🎆</span>
      <div class="story-body">
        <h3>El Grito en Neza, gratis, el martes 15 de septiembre<span class="tag" style="--sc:#e8c766">en 4 días</span></h3>
        <p>Entrada libre en la Explanada del Palacio Municipal y en La Bola. Arranca a las 5pm con
           música en vivo, y cerca de las 11pm la ceremonia del Grito con fuegos artificiales — el
           plan más cercano a casa esta semana, sin cruzar a CDMX.</p>
        <p class="src"><a href="https://www.razon.com.mx/estados/2026/09/07/fiestas-patrias-2026-quien-estara-en-nezahualcoyotl-el-15-de-septiembre-para-el-grito/" target="_blank" rel="noopener">seguir leyendo → La Razón</a></p>
      </div>
    </div>
    <p class="empty">Ya agendado: Nescafé Vaivén el 17/10 (Zona General, boletos comprados, plan
       completo en <a class="ilink" href="https://claude.ai/code/artifact/a99bf33b-8059-4c26-b568-29c6721c3eff">Vaivén.exe</a>)
       y Corona Capital (boletos pagados, falta armar el plan). Más cerca en el calendario:
       cumpleaños de mamá (20/09) y de papá (21/09). Detalle completo en
       <a class="ilink" href="https://claude.ai/code/artifact/8b911d1f-0b5a-4d0a-9d11-41d7b7a4e778">Calendario.exe</a>.</p>
  </div>

  <!-- ===== SECCIÓN 8: FOCO DE LA NOCHE ===== -->
  <div class="section" data-slot="foco">
    <p class="section-title">Foco de esta noche</p>
    <div class="story">
      <span class="story-mark" style="--sc:#9d7fff">🎯</span>
      <div class="story-body">
        <h3 id="focoTitle">—</h3>
        <p id="focoDesc">Segundo día off consecutivo — mañana/mediodía con Fanny y, esta tarde,
           el bloque largo para lo que no cabe entre semana (trámites, el coche, o
           /revisemos-cerebro). Duolingo no depende de ningún break hoy — hazlo cuando quieras,
           sigue contando como todos los días. Titulación sigue en pausa: nada que hacer ahí hasta
           que llegue la respuesta del profesor.</p>
      </div>
    </div>
  </div>

  <footer>
    fuente: perfil/rutina.md · perfil/hoy.md · metas/titulacion.md · metas/patrimonio.md · metas/trabajo.md<br>
    se republica en cada trigger: 5am · break 1 · break 2 · llegada a casa · cierre
    &middot; <a href="https://github.com/skywalkerdiego/Cerebro">repo</a>
  </footer>
</div>

<script>
(function () {
  var now = new Date();

  /* --- fecha y etiqueta de edición --- */
  var dl = document.getElementById('dateline');
  dl.textContent = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(now);

  var h = now.getHours();
  var ed = h < 7 ? 'Edición matutina' : h < 11 ? 'Edición del Break 1'
         : h < 15 ? 'Edición del mediodía' : h < 18 ? 'Edición del Break 2'
         : h < 20 ? 'Edición de llegada' : 'Edición nocturna';
  document.getElementById('edicion').textContent = ed + ' · Nezahualcóyotl / CDMX';

  /* --- cuentas regresivas --- */
  function daysUntil(y, m, d) {
    var t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((new Date(y, m - 1, d) - t0) / 86400000);
  }
  var ne = daysUntil(2026, 9, 20);
  var neEl = document.getElementById('nextEventDays');
  neEl.textContent = ne < 0 ? 'pasó' : ne === 0 ? 'hoy' : ne === 1 ? 'mañana' : 'en ' + ne + ' días';

  /* --- turno, calculado del horario Kronos ---
     Antes de que termine el turno (antes de la hora de llegada, ~6pm), el
     bloque "shift" muestra el turno de HOY; después de esa hora ya se
     cerró, así que muestra el de MAÑANA. El bloque "foco" siempre
     muestra el foco de HOY. */
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function keyFor(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  var keyToday = keyFor(now);
  var tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var shiftIsToday = h < 18;
  var key = shiftIsToday ? keyToday : keyFor(tomorrowDate);
  document.getElementById('shiftLabel').textContent = shiftIsToday ? '⏱️ Tu turno hoy' : '⏱️ Tu turno mañana';
  var WEEK = {
    '2026-08-31': { s: '7am-5pm', b1: '9:00am', lu: '12:45pm', b2: '3:00pm', home: '6:20pm', foco: 'Imprimir el ATI y la solicitud de título' },
    '2026-09-01': { s: '6am-4pm', b1: '8:00am', lu: '10:30am', b2: '1:45pm', home: '5:20pm', foco: 'Firmar en tinta negra y escanear los dos documentos', warn: 'Comida a las 10:30am — lleva snack para el Break 2, son 5.5 h seguidas después.' },
    '2026-09-02': { s: '6am-4pm', b1: '8:00am', lu: '11:30am', b2: '2:00pm', home: '5:20pm', foco: 'Noche libre — el colchón de la semana. No la "aproveches".' },
    '2026-09-03': { off: 1, foco: 'Día off con Fanny — te quedas en su casa' },
    '2026-09-04': { off: 1, foco: 'Fanny, y por la tarde cotizar el ventilador del Chevy' },
    '2026-09-05': { s: '6am-4pm', b1: '8:00am', lu: '11:30am', b2: '2:00pm', home: '5:20pm', foco: 'Titulación en pausa — noche libre de verdad' },
    '2026-09-06': { s: '7am-5pm', b1: '9:00am', lu: '12:45pm', b2: '3:00pm', home: '6:20pm', foco: 'Sin foco asignado — titulación sigue en pausa (seguimiento al correo si acaso)' },
    '2026-09-07': { s: '6am-4pm', b1: '8:00am', lu: '11:30am', b2: '2:00pm', home: '5:20pm', foco: 'Sin foco fijo esta semana — revisa Rutina.exe' },
    '2026-09-08': { s: '6am-4pm', b1: '8:00am', lu: '11:30am', b2: '2:00pm', home: '5:20pm', foco: 'Sin foco fijo esta semana — revisa Rutina.exe' },
    '2026-09-09': { s: '6am-4pm', b1: '8:00am', lu: '11:30am', b2: '2:00pm', home: '5:20pm', foco: 'Sin foco fijo esta semana — revisa Rutina.exe' },
    '2026-09-10': { off: 1, foco: 'Fanny — día completo' },
    '2026-09-11': { off: 1, foco: 'Fanny · bloque largo de la tarde' },
    '2026-09-12': { s: '6am-4pm', b1: '8:00am', lu: '12:00pm', b2: '2:30pm', home: '5:20pm', foco: 'Sin foco fijo esta semana — revisa Rutina.exe' },
    '2026-09-13': { s: '7am-5pm', b1: '9:00am', lu: '12:45pm', b2: '3:00pm', home: '6:20pm', foco: 'Sin foco fijo esta semana — revisa Rutina.exe' }
  };
  var d = WEEK[key];
  var wrap = document.getElementById('breaks');

  function row(t, i, l) {
    return '<div class="brow"><span class="btime">' + t + '</span><span class="bico">' + i + '</span><span class="blab">' + l + '</span></div>';
  }

  if (!d) {
    wrap.innerHTML = '<p class="blab" style="font-size:.76rem">Falta el horario Kronos de esta semana — mándame la captura y se remapean los breaks.</p>';
  } else if (d.off) {
    wrap.innerHTML = row('todo el día', '💜', 'Día de descanso — sin turno ni breaks');
  } else {
    wrap.innerHTML =
      row(d.b1, '☕', 'Break 1 · agua + la lección de italiano') +
      row(d.lu, '🍽️', 'Comida · agua + 1-2 vacantes') +
      row(d.b2, '🌿', 'Break 2 · respiro, cero pantalla de trabajo') +
      row(d.home, '🏠', (shiftIsToday ? 'Llegas a casa · turno ' : 'Llegas a casa · turno ') + d.s);
    if (d.warn) {
      wrap.innerHTML += '<div class="brow"><span class="btime">⚠️</span><span class="blab" style="color:var(--gold)">' + d.warn + '</span></div>';
    }
  }

  var dToday = WEEK[keyToday];
  if (dToday && dToday.foco) document.getElementById('focoTitle').textContent = dToday.foco;
  else document.getElementById('focoTitle').textContent = 'Sin foco asignado — revisa Rutina.exe';
})();
</script>
</body>
</html>

</body></html>


===== END FILE: ARTIFACTS_SOURCE/Periodico.exe__4169c45b-465f-4ecd-9015-7f76693f3614.html =====

===== BEGIN FILE: ARTIFACTS_SOURCE/Rutina.exe__4ef55817-2876-46f2-939e-7399e38db433.html =====

<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>
<title>Rutina.exe</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #04060c;
  --panel: #090e18;
  --panel-2: #0c1220;
  --line: rgba(110,190,220,0.14);
  --line-hot: rgba(120,220,245,0.42);
  --text: #e6f1f5;
  --dim: #8298a6;
  --faint: #4a5f6b;

  --cyan: #22e0f0;
  --magenta: #ff2d7e;
  --violet: #a77bff;
  --lime: #5cff9d;
  --amber: #ffc93c;
  --blue: #5cb8ff;

  --font-display: 'Orbitron', -apple-system, "SF Pro Display", system-ui, sans-serif;
  --font-body: -apple-system, "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'Share Tech Mono', ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  --notch: 10px;
  --cut: polygon(var(--notch) 0, 100% 0, 100% calc(100% - var(--notch)), calc(100% - var(--notch)) 100%, 0 100%, 0 var(--notch));
  --notch-s: 5px;
  --cut-s: polygon(var(--notch-s) 0, 100% 0, 100% calc(100% - var(--notch-s)), calc(100% - var(--notch-s)) 100%, 0 100%, 0 var(--notch-s));

  color-scheme: dark;
}
@font-face {
  font-family: 'Orbitron'; font-weight: 700; font-style: normal; font-display: swap;
  src: local('Orbitron');
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); }
body { min-height: 100vh; font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; position: relative; }

.vignette {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(ellipse 900px 700px at 50% 0%, rgba(45,227,245,0.06), transparent 60%),
              radial-gradient(ellipse 1000px 900px at 50% 100%, rgba(5,7,12,0.9), transparent 70%),
              linear-gradient(rgba(5,7,12,0.35), rgba(5,7,12,0.55));
}
.screen { position: relative; z-index: 2; max-width: 460px; margin: 0 auto; padding: 16px 16px calc(46px + env(safe-area-inset-bottom,0px)); }

.rail { height: 3px; border-radius: 999px; margin-bottom: 14px; background: linear-gradient(90deg,var(--magenta),var(--amber),var(--lime),var(--cyan),var(--violet),var(--magenta)); background-size: 220% 100%; box-shadow: 0 0 14px 1px rgba(90,200,255,.5); }
@media (prefers-reduced-motion: no-preference) { .rail { animation: railrun 3.2s linear infinite; } }
@keyframes railrun { to { background-position: 220% 50%; } }

.back { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: .68rem; letter-spacing: .06em; text-transform: uppercase; color: var(--faint); text-decoration: none; margin-bottom: 14px; }
.back:hover { color: var(--dim); }

header.hero { margin-bottom: 14px; border-bottom: 1px solid var(--line); padding-bottom: 12px; }
header.hero h1 { font-family: var(--font-display); font-weight: 900; font-size: clamp(1.5rem, 8vw, 2.1rem); margin: 0 0 6px; text-shadow: 0 0 16px rgba(34,224,240,.5); }
header.hero p { margin: 0; color: var(--dim); font-size: .84rem; line-height: 1.5; font-family: var(--font-mono); }

.panel { background: linear-gradient(140deg, var(--panel), var(--panel-2)); border: 1px solid var(--line); clip-path: var(--cut); padding: 12px 14px; margin-bottom: 12px; }
.phead { display: flex; align-items: center; gap: 7px; margin-bottom: 10px; }
.phead .bar { width: 3px; height: 14px; border-radius: 2px; background: var(--pc, var(--cyan)); box-shadow: 0 0 8px var(--pc, var(--cyan)); flex: none; }
.phead h2 { font-family: var(--font-display); font-weight: 700; font-size: .74rem; letter-spacing: .14em; text-transform: uppercase; color: var(--pc, var(--cyan)); margin: 0; }
.phead .tail { margin-left: auto; font-family: var(--font-mono); font-size: .6rem; color: var(--faint); }

/* reglas */
.rules { display: flex; flex-direction: column; gap: 8px; }
.rule { display: flex; gap: 10px; align-items: flex-start; }
.rule .n { flex: none; font-family: var(--font-display); font-weight: 900; font-size: 1rem; color: var(--magenta); width: 1.4em; text-align: center; }
.rule p { margin: 0; font-size: .82rem; line-height: 1.5; color: var(--text); }
.rule b { color: var(--amber); }

/* tracks activos */
.tracks-row { display: flex; gap: 7px; flex-wrap: wrap; }
.track-chip { display: flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: .68rem; background: var(--panel-2); border: 1px solid color-mix(in srgb, var(--tc) 40%, var(--line)); color: var(--tc); padding: 4px 9px; border-radius: 999px; }

/* tabla semana */
.week-table { display: flex; flex-direction: column; gap: 5px; }
.wk-row { display: flex; align-items: flex-start; gap: 9px; padding: 8px 8px; border-radius: 9px; background: var(--panel-2); border: 1px solid var(--line); }
.wk-row.today { border-color: var(--line-hot); box-shadow: 0 0 14px -6px var(--cyan); }
.wk-day { flex: none; width: 3.4rem; }
.wk-day .d { font-family: var(--font-display); font-weight: 700; font-size: .74rem; color: var(--text); }
.wk-day .s { display: block; font-family: var(--font-mono); font-size: .58rem; color: var(--dim); margin-top: 1px; }
.wk-body { flex: 1; min-width: 0; }
.wk-times { font-family: var(--font-mono); font-size: .62rem; color: var(--faint); margin: 0 0 3px; }
.wk-times b { color: var(--blue); }
.wk-foco { font-size: .76rem; color: var(--text); margin: 0; line-height: 1.4; }
.wk-warn { margin: 4px 0 0; font-size: .66rem; color: var(--amber); line-height: 1.4; }

/* breaks */
.break-grid { display: flex; flex-direction: column; gap: 8px; }
.break-card { background: var(--panel-2); border: 1px solid var(--line); border-radius: 10px; padding: 9px 11px; }
.break-card b { font-family: var(--font-display); font-size: .76rem; color: var(--lime); display: block; margin-bottom: 3px; }
.break-card p { margin: 0; font-size: .76rem; color: var(--dim); line-height: 1.5; }

/* checklist */
.checklist { display: flex; flex-direction: column; gap: 2px; }
.check-item { display: flex; align-items: flex-start; gap: 9px; padding: 7px 6px; border-radius: 8px; cursor: pointer; font-size: .8rem; transition: background .15s; }
.check-item input { margin-top: 2px; }
.check-item:hover { background: rgba(255,255,255,.03); }
.check-item input { width: 17px; height: 17px; accent-color: var(--lime); flex: none; }
.check-item .txt { color: var(--text); }
.check-item.checked .txt { color: var(--faint); text-decoration: line-through; }
.check-item .sub { display: block; font-size: .68rem; color: var(--faint); margin-top: 2px; text-decoration: none; }
.check-hint { margin: 6px 2px 0; font-family: var(--font-mono); font-size: .6rem; color: var(--faint); }

/* mantenimiento */
.maint-list { display: flex; flex-direction: column; gap: 7px; }
.maint-item { font-size: .78rem; color: var(--dim); line-height: 1.5; padding-left: 14px; position: relative; }
.maint-item::before { content: '→'; position: absolute; left: 0; color: var(--violet); }
.maint-item b { color: var(--text); }

/* bloques del día (ex-Aspect.exe) */
.day-blocks { display: flex; flex-direction: column; gap: 5px; }
.blk { display: flex; align-items: flex-start; gap: 9px; padding: 7px 8px; border-radius: 8px; }
.blk .ic { flex: none; width: 1.5em; text-align: center; font-size: .95rem; line-height: 1.3; }
.blk .body { flex: 1; min-width: 0; }
.blk .t { display: block; font-family: var(--font-mono); font-size: .58rem; color: var(--faint); }
.blk .l { margin: 1px 0 0; font-size: .8rem; color: var(--dim); line-height: 1.4; }
.blk.now { background: var(--panel-2); border: 1px solid var(--line-hot); box-shadow: 0 0 14px -6px var(--cyan); }
.blk.now .l { color: var(--text); }
.blk.action { cursor: pointer; }
.blk.action input { width: 17px; height: 17px; accent-color: var(--lime); flex: none; margin: 2px 9px 0 0; }
.blk.action .ic { display: none; }
.blk.action.checked .l { color: var(--faint); text-decoration: line-through; }
.blk.action .l { color: var(--text); }

/* presupuesto de horas (ex-Tiempo.exe) */
.hbar { display: flex; height: 6px; border-radius: 4px; overflow: hidden; margin-top: 6px; background: rgba(255,255,255,.05); }
.hbar span { height: 100%; }
.hbar .seg-shift { background: var(--blue); }
.hbar .seg-commute { background: var(--violet); }
.hbar .seg-sleep { background: #3d3466; }
.hbar .seg-free { background: var(--lime); }
.hbar .seg-buffer { background: var(--faint); }
.hbar .seg-off { background: var(--amber); opacity: .55; }
.hbar-legend { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; font-family: var(--font-mono); font-size: .58rem; color: var(--faint); }
.hbar-legend span { display: inline-flex; align-items: center; gap: 4px; }
.hbar-legend i { width: 7px; height: 7px; border-radius: 2px; display: inline-block; }

footer { margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--line); font-family: var(--font-mono); font-size: .6rem; color: var(--faint); line-height: 1.7; text-align: center; }
</style>

<div class="vignette" aria-hidden="true"></div>
<div class="screen">
  <div class="rail" aria-hidden="true"></div>
  <a class="back" href="https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b">&larr; Cerebro.exe</a>

  <header class="hero">
    <h1>RUTINA.EXE</h1>
    <p>Turno rotativo (Kronos) + 1h20 de traslado por trayecto. No es un horario fijo — es la plantilla que se remapea cada semana. Un solo lugar para reglas, semana, presupuesto de horas, bloques de hoy y lo pendiente — antes repartido en Aspect.exe, Tiempo.exe y Pendientes.exe.</p>
  </header>

  <section class="panel" style="--pc: var(--magenta)">
    <div class="phead"><span class="bar"></span><h2>Las 3 reglas</h2><span class="tail">desde 31/08</span></div>
    <div class="rules">
      <div class="rule"><span class="n">1</span><p><b>Máximo 3 pistas activas</b> a la vez. Todo lo demás queda en standby explícito — dormido, no cancelado.</p></div>
      <div class="rule"><span class="n">2</span><p><b>Lo urgente desplaza, no se apila.</b> Si entra algo con fecha, el foco de hoy se corre a mañana. No se acumula como deuda.</p></div>
      <div class="rule"><span class="n">3</span><p><b>Una noche libre por semana</b>, sin foco asignado. Si no pasa nada imprevisto, es noche libre de verdad.</p></div>
    </div>
    <div class="tracks-row" style="margin-top:10px">
      <span class="track-chip" style="--tc: var(--magenta)">🎓 Titulación (en pausa)</span>
      <span class="track-chip" style="--tc: var(--blue)">📊 Desempeño</span>
      <span class="track-chip" style="--tc: var(--lime)">🗣️ Italiano</span>
    </div>
  </section>

  <section class="panel" style="--pc: var(--cyan)">
    <div class="phead"><span class="bar"></span><h2>Cuánto tiempo real tienes</h2></div>
    <p style="margin:0;font-size:.8rem;color:var(--dim);line-height:1.55">Con 1h20 de traslado por trayecto, en cualquier turno te quedan <b style="color:var(--text)">~2.5 horas libres reales</b> por la noche — alcanza para <b style="color:var(--text)">una cosa con foco</b>, no varias. Por eso un foco por noche, no todo junto.</p>
  </section>

  <section class="panel" style="--pc: var(--magenta)">
    <div class="phead"><span class="bar"></span><h2>Hoy, en bloques</h2><span class="tail" id="todayTail"></span></div>
    <div class="day-blocks" id="dayBlocks"></div>
    <p class="check-hint">los bloques con casilla se marcan solos y se limpian al día siguiente — el resto es solo referencia de a dónde se va la hora</p>
  </section>

  <section class="panel" style="--pc: var(--blue)" id="weekPanel">
    <div class="phead"><span class="bar"></span><h2>Semana del 07/09 al 13/09</h2><span class="tail">Kronos confirmado</span></div>
    <div class="week-table" id="weekTable"></div>
    <div class="hbar-legend">
      <span><i style="background:var(--blue)"></i>Turno</span>
      <span><i style="background:var(--violet)"></i>Traslado (gratis esta semana — Uber pagado en las mañanas)</span>
      <span><i style="background:#3d3466"></i>Sueño</span>
      <span><i style="background:var(--lime)"></i>Libre/foco</span>
      <span><i style="background:var(--faint)"></i>Rutina matutina</span>
      <span><i style="background:var(--amber);opacity:.55"></i>Off — flexible</span>
    </div>
  </section>

  <section class="panel" style="--pc: var(--lime)">
    <div class="phead"><span class="bar"></span><h2>En los breaks</h2></div>
    <div class="break-grid">
      <div class="break-card"><b>☕ Break 1</b><p>💧 Agua primero, siempre · 🗣️ Duolingo del día — su lugar fijo, mejor aquí que compitiendo con la noche.</p></div>
      <div class="break-card"><b>🍽️ Comida</b><p>💧 Agua otra vez · 💼 1-2 vacantes en modo mantenimiento · 🎓 checar estatus de titulación si hay algo en vuelo.</p></div>
      <div class="break-card"><b>🌿 Break 2</b><p>💧 Agua + levantarte y estirar · <b style="color:var(--amber)">cero pantalla de trabajo</b> — es el bajón de la tarde, donde se cae el FCR por cansancio, no por técnica.</p></div>
    </div>
  </section>

  <section class="panel" style="--pc: var(--amber)">
    <div class="phead"><span class="bar"></span><h2>Pendientes vivos</h2><span class="tail" id="pendTail"></span></div>
    <div class="checklist" id="pendChecklist"></div>
    <p class="check-hint">mismo orden que "Próximas 2 semanas" en README.md — se actualiza ahí, no aquí</p>
  </section>

  <section class="panel" style="--pc: var(--violet)">
    <div class="phead"><span class="bar"></span><h2>Rutina diaria fija</h2><span class="tail">se resetea cada día</span></div>
    <div class="checklist" id="dailyChecklist"></div>
    <p class="check-hint">se marca solo y se limpia cuando abras esto en un día nuevo</p>
  </section>

  <section class="panel" style="--pc: var(--amber)">
    <div class="phead"><span class="bar"></span><h2>Cuando toque</h2><span class="tail">no se resetea sola</span></div>
    <div class="checklist" id="weeklyChecklist"></div>
    <p class="check-hint">la desmarcas tú cuando vuelva a tocar</p>
  </section>

  <section class="panel" style="--pc: var(--cyan)">
    <div class="phead"><span class="bar"></span><h2>Días off — jueves y viernes</h2></div>
    <div class="maint-list">
      <p class="maint-item"><b>Jueves:</b> día completo con Fanny, en su casa. Sin pendientes agendados.</p>
      <p class="maint-item"><b>Viernes:</b> mañana con Fanny, tarde de bloque largo — trámites, el coche, o la revisión semanal del sistema.</p>
      <p class="maint-item"><b>Checada del sistema:</b> en tu primer día off corre <code style="color:var(--cyan)">/revisemos-cerebro</code> (~5 min). Mantenimiento, no trabajo nuevo — si se pasa la semana, no se acumula.</p>
    </div>
  </section>

  <footer>
    fuente real: perfil/rutina.md (incluye el presupuesto de horas y los bloques del día, ex-Tiempo.exe y ex-Aspect.exe) y "Próximas 2 semanas" en README.md (Pendientes vivos)<br>
    horas de comida confirmadas el 09/09/2026 con la captura completa del team GET<br>
    todos los días, sin excepción: 🗣️ Duolingo (Break 1) y 💜 tiempo con Fanny — van aparte del foco de la noche
  </footer>
</div>

<script>
(function () {
  var WEEK = [
    { key: '2026-09-07', d: 'Lun', shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lu: '11:30', b2: '14:00', end: '16:00', home: '17:20', foco: 'Bloque libre de la noche', focoIcon: '🎯' },
    { key: '2026-09-08', d: 'Mar', shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lu: '11:30', b2: '14:00', end: '16:00', home: '17:20', foco: 'Bloque libre de la noche', focoIcon: '🎯' },
    { key: '2026-09-09', d: 'Mié', shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lu: '11:30', b2: '14:00', end: '16:00', home: '17:20', foco: 'Bloque libre de la noche', focoIcon: '🎯' },
    { key: '2026-09-10', d: 'Jue', off: true, foco: 'Fanny — día completo', focoIcon: '💜' },
    { key: '2026-09-11', d: 'Vie', off: true, foco: 'Fanny · bloque largo de la tarde', focoIcon: '💜' },
    { key: '2026-09-12', d: 'Sáb', shift: '6am-4pm', leave: '04:40', start: '06:00', b1: '08:00', lu: '12:00', b2: '14:30', end: '16:00', home: '17:20', foco: 'Bloque libre de la noche', focoIcon: '🎯' },
    { key: '2026-09-13', d: 'Dom', shift: '7am-5pm', leave: '05:40', start: '07:00', b1: '09:00', lu: '12:45', b2: '15:00', end: '17:00', home: '18:20', foco: 'Bloque libre de la noche', focoIcon: '🎯' }
  ];

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function todayKey() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fmt12(hhmm) {
    var parts = hhmm.split(':'); var h = parseInt(parts[0], 10); var m = parts[1];
    var ap = h >= 12 ? 'pm' : 'am'; var h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + ':' + m + ap;
  }
  function mins(hhmm) { var p = hhmm.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
  function fmtMin(m) { var h = Math.floor(m / 60) % 24; var mm = m % 60; return fmt12(pad(h) + ':' + pad(mm)); }
  var tk = todayKey();

  var wrap = document.getElementById('weekTable');
  wrap.innerHTML = WEEK.map(function (w) {
    var isToday = w.key === tk;
    var times = w.off ? '' : '<p class="wk-times">Break 1 <b>' + fmt12(w.b1) + '</b> · comida <b>' + fmt12(w.lu) + '</b> · Break 2 <b>' + fmt12(w.b2) + '</b> · llegas <b>' + fmt12(w.home) + '</b></p>';
    var hbar = w.off
      ? '<div class="hbar"><span class="seg-sleep" style="flex:33.3"></span><span class="seg-off" style="flex:66.7"></span></div>'
      : '<div class="hbar"><span class="seg-shift" style="flex:41.7"></span><span class="seg-commute" style="flex:11.1"></span><span class="seg-sleep" style="flex:30.2"></span><span class="seg-free" style="flex:10.4"></span><span class="seg-buffer" style="flex:6.6"></span></div>';
    return '<div class="wk-row' + (isToday ? ' today' : '') + '">' +
      '<div class="wk-day"><span class="d">' + w.d + '</span><span class="s">' + (w.off ? 'Off' : w.shift) + '</span></div>' +
      '<div class="wk-body">' + times + '<p class="wk-foco">' + w.focoIcon + ' ' + w.foco + '</p>' +
      (w.warn ? '<p class="wk-warn">⚠️ ' + w.warn + '</p>' : '') + hbar +
      '</div></div>';
  }).join('');

  /* Hoy, en bloques — revive el timeline de Aspect.exe, con casillas reales en vez de solo mostrar la hora */
  function buildDayBlocks(day) {
    var b = [];
    if (day.off) {
      b.push({ i: '😴', l: 'Dormir sin alarma' });
      b.push({ i: day.focoIcon, l: day.foco, action: 1, id: 'foco' });
      b.push({ i: '😴', l: 'Dormir' });
      return b;
    }
    var leave = mins(day.leave), start = mins(day.start), b1 = mins(day.b1),
        lunch = mins(day.lu), b2 = mins(day.b2), end = mins(day.end), home = mins(day.home);
    b.push({ i: '😴', l: 'Dormir', t: '· hasta ' + fmtMin(leave - 35) });
    b.push({ i: '🪥', l: 'Alistarte y salir', t: fmtMin(leave - 35) + ' – ' + fmtMin(leave) });
    b.push({ i: '🚗', l: 'Uber al trabajo (pagado esta semana)', t: fmtMin(leave) + ' – ' + fmtMin(start) });
    b.push({ i: '💼', l: 'Turno · ' + day.shift, t: fmtMin(start) + ' – ' + fmtMin(b1) });
    b.push({ i: '☕', l: 'Break 1 — agua + Duolingo del día', t: fmtMin(b1), action: 1, id: 'b1' });
    b.push({ i: '💼', l: 'Turno', t: fmtMin(b1 + 15) + ' – ' + fmtMin(lunch) });
    b.push({ i: '🍽️', l: 'Comida — agua + 1-2 vacantes en mantenimiento', t: fmtMin(lunch), action: 1, id: 'lunch' });
    b.push({ i: '💼', l: 'Turno', t: fmtMin(lunch + 45) + ' – ' + fmtMin(b2) });
    b.push({ i: '🌿', l: 'Break 2 — respiro, cero pantalla de trabajo', t: fmtMin(b2), action: 1, id: 'b2' });
    b.push({ i: '💼', l: 'Turno', t: fmtMin(b2 + 15) + ' – ' + fmtMin(end) });
    b.push({ i: '🚇', l: 'Metro (teléfono) + combi — regreso a casa', t: fmtMin(end) + ' – ' + fmtMin(home) });
    b.push({ i: day.focoIcon, l: day.foco, t: 'foco de la noche', action: 1, id: 'foco' });
    b.push({ i: '😴', l: 'Dormir' });
    return b;
  }

  var day = null;
  for (var i = 0; i < WEEK.length; i++) { if (WEEK[i].key === tk) { day = WEEK[i]; break; } }
  var dayBlocksEl = document.getElementById('dayBlocks');
  var todayTail = document.getElementById('todayTail');
  if (day) {
    todayTail.textContent = day.d + (day.off ? ' · off' : ' · ' + day.shift);
    var blocks = buildDayBlocks(day);
    var storeKey = 'rutinaBlocks:' + tk;
    var savedBlocks = {};
    try { savedBlocks = JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (e) { savedBlocks = {}; }
    dayBlocksEl.innerHTML = blocks.map(function (blk, idx) {
      if (blk.action) {
        var checked = !!savedBlocks[blk.id];
        return '<label class="blk action' + (checked ? ' checked' : '') + '" data-idx="' + idx + '">' +
          '<input type="checkbox" data-id="' + blk.id + '"' + (checked ? ' checked' : '') + '>' +
          '<span class="body"><span class="t">' + (blk.t || '') + '</span><span class="l">' + blk.i + ' ' + blk.l + '</span></span></label>';
      }
      return '<div class="blk"><span class="ic">' + blk.i + '</span><span class="body">' + (blk.t ? '<span class="t">' + blk.t + '</span>' : '') + '<span class="l">' + blk.l + '</span></span></div>';
    }).join('');
    Array.prototype.forEach.call(dayBlocksEl.querySelectorAll('input[type=checkbox]'), function (inp) {
      inp.addEventListener('change', function () {
        inp.closest('.blk').classList.toggle('checked', inp.checked);
        var state = {};
        try { state = JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (e) { state = {}; }
        state[inp.dataset.id] = inp.checked;
        try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch (e) {}
      });
    });
  } else {
    todayTail.textContent = 'sin horario';
    dayBlocksEl.innerHTML = '<p style="margin:0;font-size:.78rem;color:var(--dim)">Falta el horario de esta semana — manda la captura de Kronos.</p>';
  }

  function buildChecklist(containerId, items, storageKey) {
    var container = document.getElementById(containerId);
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (e) { saved = {}; }
    items.forEach(function (item) {
      var row = document.createElement('label');
      row.className = 'check-item' + (saved[item.id] ? ' checked' : '');
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = !!saved[item.id];
      var span = document.createElement('span');
      span.className = 'txt';
      span.textContent = item.label;
      row.appendChild(input);
      row.appendChild(span);
      input.addEventListener('change', function () {
        row.classList.toggle('checked', input.checked);
        var state = {};
        try { state = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (e) { state = {}; }
        state[item.id] = input.checked;
        try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (e) {}
      });
      container.appendChild(row);
    });
  }

  buildChecklist('dailyChecklist', [
    { id: 'dientes-am', label: '🦷 Lavarse los dientes (mañana)' },
    { id: 'banarse', label: '🚿 Bañarse' },
    { id: 'cama', label: '🛏️ Tender la cama' },
    { id: 'duolingo', label: '🗣️ Duolingo del día' },
    { id: 'fanny', label: '💜 Tiempo con Fanny' },
    { id: 'dientes-pm', label: '🦷 Lavarse los dientes (noche)' }
  ], 'rutinaDaily:' + tk);

  buildChecklist('weeklyChecklist', [
    { id: 'coche', label: '🚗 Lavar el coche' },
    { id: 'ropa', label: '🧺 Lavar ropa' }
  ], 'rutinaWeekly');

  /* Pendientes vivos — mismo orden que "Próximas 2 semanas" de README.md */
  var PEND = [
    { id: 'p1', label: 'Titulación en pausa: dar seguimiento al correo del profesor si no hay respuesta', sub: 'No pagar la ficha ni firmar nada mientras tanto' },
    { id: 'p2', label: 'Confirmar el monto exacto de la nómina cuando llegue el recibo (CFDI)', sub: 'Ya cayó el 04/09 — falta el desglose y ver si trajo MINU' },
    { id: 'p3', label: 'Domingo con Fanny: gasolina desde Santander, antojito desde Pluxee Restaurante', sub: 'Dom 06/09' },
    { id: 'p5', label: 'Aporte de $2,400 al fondo de la mudanza', sub: 'Vie 18/09, día de pago' },
    { id: 'p6', label: 'Apartar $3,201.59 para la tarjeta MercadoPago (AT&T + libros de Fanny)', sub: 'Corta el 27/09 — solo $398.41 de límite libre' },
    { id: 'p7', label: 'Recuperar la contraseña de Mi Cuenta INFONAVIT y correr el simulador de crédito', sub: 'Gratis, cuando caiga' },
    { id: 'p8', label: 'Que Fanny revise su antigüedad en ISSEMyM', sub: '~30 min, gratis' },
    { id: 'p9', label: 'Imprimir el Recetario para Fanny y escribirle la carta a mano', sub: 'Ya tiene la tarjetita ex libris para el libro' }
  ];
  var pendKey = 'rutinaPend:2026-09-07';
  var pendSaved = {};
  try { pendSaved = JSON.parse(localStorage.getItem(pendKey) || '{}'); } catch (e) { pendSaved = {}; }
  var pendEl = document.getElementById('pendChecklist');
  pendEl.innerHTML = PEND.map(function (p) {
    var checked = pendSaved[p.id] !== undefined ? pendSaved[p.id] : !!p.done;
    return '<label class="check-item' + (checked ? ' checked' : '') + '" data-id="' + p.id + '">' +
      '<input type="checkbox" data-id="' + p.id + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="txt">' + p.label + '<span class="sub">' + p.sub + '</span></span></label>';
  }).join('');
  Array.prototype.forEach.call(pendEl.querySelectorAll('input[type=checkbox]'), function (inp) {
    inp.addEventListener('change', function () {
      inp.closest('.check-item').classList.toggle('checked', inp.checked);
      var state = {};
      try { state = JSON.parse(localStorage.getItem(pendKey) || '{}'); } catch (e) { state = {}; }
      state[inp.dataset.id] = inp.checked;
      try { localStorage.setItem(pendKey, JSON.stringify(state)); } catch (e) {}
    });
  });
  var pendDone = PEND.filter(function (p) { return (pendSaved[p.id] !== undefined ? pendSaved[p.id] : p.done); }).length;
  document.getElementById('pendTail').textContent = pendDone + '/' + PEND.length;
})();
</script>

</body></html>


===== END FILE: ARTIFACTS_SOURCE/Rutina.exe__4ef55817-2876-46f2-939e-7399e38db433.html =====

===== BEGIN FILE: ARTIFACTS_SOURCE/Titulacion.exe__ab59366f-ab5f-4bff-835e-348255129efc.html =====

<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>
<title>Titulación.exe</title>
<style>
  :root {
    --bg: #0a0d13;
    --panel: #131826;
    --panel-2: #161c2b;
    --panel-border: rgba(255,255,255,0.07);
    --panel-border-hover: rgba(255,255,255,0.16);
    --text: #eef1f7;
    --text-dim: #8b93a7;
    --text-faint: #4d5568;
    --hairline: rgba(255,255,255,0.09);

    --accent: #fb7185;
    --ok: #4ade80;
    --bad: #f87171;
    --wait: #fbbf24;

    --font-display: -apple-system, "SF Pro Display", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-body: -apple-system, "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-mono: ui-monospace, "SF Mono", "Menlo", "Consolas", monospace;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); }
  body {
    min-height: 100vh;
    font-family: var(--font-body);
    background-image:
      radial-gradient(ellipse 900px 500px at 15% -10%, rgba(251,113,133,0.09), transparent 60%),
      repeating-linear-gradient(transparent, transparent 27px, var(--hairline) 28px);
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
  }

  .screen { max-width: 560px; margin: 0 auto; padding: clamp(20px, 6vw, 40px) 18px 64px; }

  .back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-faint);
    text-decoration: none;
    margin-bottom: 22px;
  }
  .back:hover { color: var(--text-dim); }

  header.hero { margin-bottom: 26px; }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--wait);
    margin-bottom: 10px;
  }
  .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--wait); box-shadow: 0 0 8px var(--wait); }

  header.hero h1 {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(2rem, 8vw, 2.4rem);
    letter-spacing: -0.02em;
    margin: 0 0 10px;
    text-wrap: balance;
    text-shadow: 0 0 24px rgba(251,113,133,0.28);
  }
  header.hero p { margin: 0; color: var(--text-dim); font-size: 0.95rem; line-height: 1.55; max-width: 48ch; }

  .card {
    background: var(--panel);
    border: 1px solid var(--panel-border);
    border-radius: 16px;
    padding: 18px;
    margin-bottom: 14px;
  }
  .card h2 {
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 650;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin: 0 0 14px;
  }

  .card.pause {
    border-color: color-mix(in srgb, var(--wait) 45%, var(--panel-border));
    background: linear-gradient(140deg, color-mix(in srgb, var(--wait) 10%, var(--panel)), var(--panel-2));
    box-shadow: 0 0 26px -14px color-mix(in srgb, var(--wait) 70%, transparent);
  }
  .card.pause h2 { color: var(--wait); }
  .card.pause p { margin: 0 0 10px; font-size: 0.9rem; line-height: 1.55; color: var(--text); }
  .card.pause p:last-child { margin-bottom: 0; }
  .card.pause .ask {
    font-size: 0.84rem; color: var(--text-dim); border-left: 2px solid var(--wait); padding-left: 10px; margin-top: 12px;
  }
  .card.pause a { color: var(--accent); }
  .card.pause .update {
    font-size: 0.84rem; color: var(--text); border-left: 2px solid var(--ok); padding-left: 10px; margin: 12px 0;
  }
  .card.pause .update b { color: var(--ok); }

  /* stepper */
  .steps { display: flex; flex-direction: column; gap: 0; }
  .step { display: flex; gap: 12px; position: relative; padding-bottom: 16px; }
  .step:last-child { padding-bottom: 0; }
  .step::before {
    content: "";
    position: absolute;
    left: 9px; top: 22px; bottom: 0;
    width: 1px;
    background: var(--hairline);
  }
  .step:last-child::before { display: none; }
  .step-dot {
    flex: none; width: 19px; height: 19px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; margin-top: 1px;
    background: var(--panel-2); border: 1px solid var(--hairline);
  }
  .step.done .step-dot { background: color-mix(in srgb, var(--ok) 25%, var(--panel-2)); border-color: var(--ok); color: var(--ok); box-shadow: 0 0 10px -3px var(--ok); }
  .step.active .step-dot { background: color-mix(in srgb, var(--wait) 25%, var(--panel-2)); border-color: var(--wait); color: var(--wait); box-shadow: 0 0 12px -2px var(--wait); }
  @media (prefers-reduced-motion: no-preference) {
    .step.active .step-dot { animation: step-pulse 2.4s ease-in-out infinite; }
  }
  @keyframes step-pulse {
    0%, 100% { box-shadow: 0 0 12px -2px var(--wait); }
    50% { box-shadow: 0 0 18px 0px var(--wait); }
  }
  .step-name { font-weight: 600; font-size: 0.92rem; margin: 0 0 2px; }
  .step-note { font-size: 0.82rem; color: var(--text-dim); margin: 0; line-height: 1.4; }

  /* status table */
  .doc-row {
    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
    padding: 11px 0; border-top: 1px solid var(--hairline);
  }
  .doc-row:first-of-type { border-top: none; padding-top: 0; }
  .doc-name { font-size: 0.88rem; font-weight: 550; margin: 0 0 2px; }
  .doc-obs { font-size: 0.78rem; color: var(--text-faint); margin: 0; }
  .pill {
    flex: none;
    font-family: var(--font-mono);
    font-size: 0.64rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .pill.ok { color: var(--ok); background: color-mix(in srgb, var(--ok) 16%, transparent); border: 1px solid color-mix(in srgb, var(--ok) 40%, transparent); text-shadow: 0 0 8px color-mix(in srgb, var(--ok) 60%, transparent); }
  .pill.bad { color: var(--bad); background: color-mix(in srgb, var(--bad) 16%, transparent); border: 1px solid color-mix(in srgb, var(--bad) 40%, transparent); text-shadow: 0 0 8px color-mix(in srgb, var(--bad) 60%, transparent); }

  /* checklist */
  ul.checklist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  ul.checklist li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; line-height: 1.45; }
  .box { flex: none; width: 17px; height: 17px; border-radius: 5px; border: 1px solid var(--hairline); margin-top: 1px; display: flex; align-items: center; justify-content: center; }
  li.done .box { background: color-mix(in srgb, var(--ok) 22%, var(--panel-2)); border-color: var(--ok); color: var(--ok); font-size: 0.68rem; }
  li.done span.label { color: var(--text-dim); text-decoration: line-through; text-decoration-color: var(--text-faint); }
  li.pending span.label { color: var(--text); }
  li.paused .box { background: color-mix(in srgb, var(--wait) 20%, var(--panel-2)); border-color: var(--wait); color: var(--wait); font-size: 0.62rem; }
  li.paused span.label { color: var(--text-dim); }

  /* doc library */
  .files { display: flex; flex-direction: column; gap: 8px; }
  .file {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 12px;
    background: var(--panel-2);
    border: 1px solid var(--panel-border);
    border-radius: 12px;
    text-decoration: none; color: inherit;
    transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease;
  }
  .file:hover, .file:focus-visible { border-color: var(--accent); transform: translateY(-1px); box-shadow: 0 0 18px -8px var(--accent); }
  .file:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .file.pending { opacity: 0.5; pointer-events: none; }
  .file-icon {
    flex: none; width: 34px; height: 34px; border-radius: 9px;
    background: color-mix(in srgb, var(--accent) 16%, var(--panel));
    border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700; color: var(--accent);
    text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 60%, transparent);
  }
  .file-name { font-size: 0.85rem; font-weight: 550; margin: 0; }
  .file-sub { font-size: 0.74rem; color: var(--text-faint); margin: 1px 0 0; }
  .file-arrow { margin-left: auto; color: var(--text-faint); width: 14px; height: 14px; flex: none; }

  .contact {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-dim);
    line-height: 1.8;
  }
  .contact a { color: var(--accent); text-decoration: none; }
  .contact a:hover { text-decoration: underline; }

  footer {
    margin-top: 30px; padding-top: 18px; border-top: 1px solid var(--hairline);
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-faint);
    letter-spacing: 0.03em; line-height: 1.7;
  }
</style>

<div class="screen">
  <a class="back" href="https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b">&larr; Cerebro.exe</a>

  <header class="hero">
    <span class="eyebrow"><span class="dot"></span>en pausa</span>
    <h1>Titulación</h1>
    <p>FES Aragón, Relaciones Internacionales. Meta: antes de diciembre 2026 — entre más pronto, mejor, esto desbloquea el resto del año.</p>
  </header>

  <div class="card pause">
    <h2>⏸️ En pausa — no pagar la ficha todavía</h2>
    <p>Podría no aplicar titularse <strong>por promedio</strong> si ya pasaron <strong>2 años desde el egreso</strong>. Se mandó correo al profesor/asesor preguntando si esto aplica.</p>
    <p class="update">📩 <b>Actualización 09/09/2026:</b> respondió David García Contreras, Jefe de Carrera de Relaciones Internacionales — van a hacer una consulta interna con el área correspondiente sobre el caso de Diego y avisan en cuanto tengan la información. Todavía no es la respuesta final.</p>
    <p>Mientras no llegue: no pagar los $620 de la ficha, ni imprimir/firmar el ATI y la solicitud — son específicos de esa modalidad y podrían no servir si cambia.</p>
    <p class="ask">Falta un dato para calcular esto con precisión: la <strong>fecha exacta de egreso</strong>. En cuanto se tenga, se puede saber si de verdad ya pasaron los 2 años.</p>
  </div>

  <div class="card">
    <h2>Proceso</h2>
    <div class="steps">
      <div class="step done">
        <span class="step-dot">✓</span>
        <div><p class="step-name">Trabajo académico</p><p class="step-note">Aprobación, desarrollo y conclusión — hecho.</p></div>
      </div>
      <div class="step active">
        <span class="step-dot">●</span>
        <div><p class="step-name">Entrega de documentos</p><p class="step-note">En pausa — esperando la consulta interna de la carrera antes de seguir.</p></div>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>Estado de documentos <span style="text-transform:none; letter-spacing:0; font-weight:400; color:var(--text-faint)">· captura 04/11/2025</span></h2>
    <div class="doc-row">
      <div><p class="doc-name">Autorización de Transferencia de Información (ATI)</p><p class="doc-obs">Favor de subir el documento corregido</p></div>
      <span class="pill bad">Rechazado</span>
    </div>
    <div class="doc-row">
      <div><p class="doc-name">Formato de solicitud y elección de título</p><p class="doc-obs">Favor de subir el documento corregido</p></div>
      <span class="pill bad">Rechazado</span>
    </div>
    <div class="doc-row">
      <div><p class="doc-name">Comprobante de pago</p><p class="doc-obs">Favor de subir el documento corregido</p></div>
      <span class="pill bad">Rechazado</span>
    </div>
    <div class="doc-row">
      <div><p class="doc-name">Formato de no adeudo de bibliotecas</p><p class="doc-obs">—</p></div>
      <span class="pill ok">Aceptado</span>
    </div>
  </div>

  <div class="card">
    <h2>Documentos guardados</h2>
    <div class="files">
      <a class="file" href="https://github.com/skywalkerdiego/Cerebro/blob/main/biblioteca/titulacion/ATI_ExpedienteDGAE.pdf" target="_blank" rel="noopener">
        <span class="file-icon">PDF</span>
        <span><p class="file-name">ATI — Expediente DGAE</p><p class="file-sub">Llenado — en pausa, no imprimir/firmar todavía</p></span>
        <svg class="file-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
      </a>
      <a class="file" href="https://github.com/skywalkerdiego/Cerebro/blob/main/biblioteca/titulacion/SolicitudTitulo_llenado.pdf" target="_blank" rel="noopener">
        <span class="file-icon">PDF</span>
        <span><p class="file-name">Solicitud y elección de título</p><p class="file-sub">Llenado — en pausa, no imprimir/firmar todavía</p></span>
        <svg class="file-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
      </a>
      <span class="file pending">
        <span class="file-icon">···</span>
        <span><p class="file-name">Comprobante de pago</p><p class="file-sub">En pausa — no pagar hasta confirmar la modalidad</p></span>
      </span>
      <span class="file pending">
        <span class="file-icon">···</span>
        <span><p class="file-name">No adeudo de bibliotecas</p><p class="file-sub">Pendiente de mandar</p></span>
      </span>
    </div>
  </div>

  <div class="card">
    <h2>Pasos pendientes</h2>
    <ul class="checklist">
      <li class="done"><span class="box">✓</span><span class="label">Llenar el ATI (versión Expediente DGAE)</span></li>
      <li class="done"><span class="box">✓</span><span class="label">Llenar el formato de solicitud y elección de título</span></li>
      <li class="paused"><span class="box">⏸</span><span class="label">Pagar la ficha ($620) — en pausa, no pagar hasta confirmar la modalidad</span></li>
      <li class="paused"><span class="box">⏸</span><span class="label">Armar el comprobante de pago (ficha + recibo/CEP en un PDF)</span></li>
      <li class="paused"><span class="box">⏸</span><span class="label">Imprimir, firmar en tinta negra y escanear ATI y solicitud</span></li>
      <li class="paused"><span class="box">⏸</span><span class="label">Subir los 3 documentos corregidos al sistema</span></li>
      <li class="done"><span class="box">✓</span><span class="label">Mandar correo al profesor/asesor sobre la regla de los 2 años</span></li>
      <li class="pending"><span class="box"></span><span class="label"><strong>Dar seguimiento</strong> a la consulta interna (respondió el Jefe de Carrera el 09/09, todavía sin resultado) si no hay noticias en unos días</span></li>
      <li class="pending"><span class="box"></span><span class="label">Confirmar aceptación y avanzar con la carpeta física — una vez resuelto lo de arriba</span></li>
    </ul>
  </div>

  <div class="card">
    <h2>Contacto</h2>
    <p class="contact">
      titulacion.relacionesinternacionales@aragon.unam.mx<br>
      <a href="https://seguimientotitulacion.unam.mx/expediente/21179" target="_blank" rel="noopener">Sistema de seguimiento →</a>
    </p>
  </div>

  <footer>fuente: metas/titulacion.md · se actualiza cuando avances algo</footer>
</div>

</body></html>


===== END FILE: ARTIFACTS_SOURCE/Titulacion.exe__ab59366f-ab5f-4bff-835e-348255129efc.html =====

===== BEGIN FILE: ARTIFACTS_SOURCE/Trabajo.exe__fe81e91b-4a6f-4e04-aa6f-8355a64bb136.html =====

<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found]){display:none!important}</style></head><body>
<title>Trabajo.exe</title>
<style>
  :root {
    --bg: #0a0d13;
    --panel: #131826;
    --panel-2: #161c2b;
    --panel-border: rgba(255,255,255,0.07);
    --panel-border-hover: rgba(255,255,255,0.16);
    --text: #eef1f7;
    --text-dim: #8b93a7;
    --text-faint: #4d5568;
    --hairline: rgba(255,255,255,0.09);

    --accent: #818cf8;
    --ok: #4ade80;
    --wait: #fbbf24;
    --bad: #f87171;

    --font-display: -apple-system, "SF Pro Display", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-body: -apple-system, "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif;
    --font-mono: ui-monospace, "SF Mono", "Menlo", "Consolas", monospace;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); }
  body {
    min-height: 100vh;
    font-family: var(--font-body);
    background-image:
      radial-gradient(ellipse 900px 500px at 15% -10%, rgba(129,140,248,0.10), transparent 60%),
      repeating-linear-gradient(transparent, transparent 27px, var(--hairline) 28px);
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
  }

  .screen { max-width: 560px; margin: 0 auto; padding: clamp(20px, 6vw, 40px) 18px 64px; }

  .back {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--text-faint); text-decoration: none; margin-bottom: 22px;
  }
  .back:hover { color: var(--text-dim); }

  header.hero { margin-bottom: 26px; }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 7px;
    font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--wait); margin-bottom: 10px;
  }
  .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--wait); box-shadow: 0 0 8px var(--wait); }
  header.hero h1 {
    font-family: var(--font-display); font-weight: 700; font-size: clamp(2rem, 8vw, 2.4rem);
    letter-spacing: -0.02em; margin: 0 0 10px; text-wrap: balance;
    text-shadow: 0 0 24px rgba(129,140,248,0.3);
  }
  header.hero p { margin: 0; color: var(--text-dim); font-size: 0.95rem; line-height: 1.55; max-width: 48ch; }

  .callout {
    background: color-mix(in srgb, var(--wait) 10%, var(--panel));
    border: 1px solid color-mix(in srgb, var(--wait) 30%, transparent);
    border-radius: 14px; padding: 14px 16px; margin-bottom: 20px;
    font-size: 0.86rem; line-height: 1.5; color: var(--text-dim);
    box-shadow: 0 0 20px -10px var(--wait);
  }
  .callout strong { color: var(--text); }

  .card { background: var(--panel); border: 1px solid var(--panel-border); border-radius: 16px; padding: 18px; margin-bottom: 14px; }
  .card h2 {
    font-family: var(--font-display); font-size: 0.78rem; font-weight: 650; letter-spacing: 0.04em;
    text-transform: uppercase; color: var(--text-dim); margin: 0 0 14px;
  }

  table.routes { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  table.routes th {
    text-align: left; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--text-faint); font-weight: 500; padding: 0 8px 8px 0;
  }
  table.routes td { padding: 10px 8px 10px 0; border-top: 1px solid var(--hairline); vertical-align: top; line-height: 1.4; }
  table.routes td.route-name { font-weight: 600; color: var(--text); }
  table.routes td.route-pay { font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--accent); white-space: nowrap; text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 50%, transparent); }
  .table-wrap { overflow-x: auto; margin: -2px -2px 0; }
  .badge-now { display: inline-block; margin-top: 4px; font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ok); text-shadow: 0 0 8px color-mix(in srgb, var(--ok) 60%, transparent); }

  table.saved { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
  table.saved th {
    text-align: left; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--text-faint); font-weight: 500; padding: 0 8px 8px 0;
  }
  table.saved td { padding: 10px 8px 10px 0; border-top: 1px solid var(--hairline); vertical-align: top; line-height: 1.45; }
  table.saved td.saved-name { font-weight: 600; color: var(--text); white-space: nowrap; }
  table.saved a { color: var(--accent); text-decoration: none; }
  table.saved a:hover { text-decoration: underline; }

  ul.checklist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  ul.checklist li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; line-height: 1.45; }
  .box { flex: none; width: 17px; height: 17px; border-radius: 5px; border: 1px solid var(--hairline); margin-top: 1px; display: flex; align-items: center; justify-content: center; font-size: 0.68rem; }
  li.done .box { background: color-mix(in srgb, var(--ok) 22%, var(--panel-2)); border-color: var(--ok); color: var(--ok); box-shadow: 0 0 8px -2px var(--ok); }
  li.done span.label { color: var(--text-dim); text-decoration: line-through; text-decoration-color: var(--text-faint); }

  .progress-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 0.84rem; }
  .progress-row .count { font-family: var(--font-mono); color: var(--text-faint); font-size: 0.74rem; }
  .bar { height: 6px; border-radius: 999px; background: var(--panel-2); overflow: hidden; margin-bottom: 16px; }
  .bar-fill { height: 100%; background: var(--accent); border-radius: 999px; box-shadow: 0 0 12px -1px var(--accent); }

  .empty-state {
    border: 1px dashed var(--hairline); border-radius: 12px; padding: 18px;
    text-align: center; font-size: 0.82rem; color: var(--text-faint); line-height: 1.5;
  }

  .apps { display: flex; flex-direction: column; gap: 10px; }
  .apps-item { background: var(--panel-2); border: 1px solid var(--panel-border); border-radius: 12px; padding: 12px 14px; }
  .apps-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 4px; }
  .apps-name { font-weight: 600; font-size: 0.88rem; color: var(--text); margin: 0; }
  .apps-pill {
    flex: none; font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.04em; text-transform: uppercase;
    color: var(--ok); background: color-mix(in srgb, var(--ok) 16%, transparent);
    border: 1px solid color-mix(in srgb, var(--ok) 40%, transparent); padding: 3px 8px; border-radius: 999px; white-space: nowrap;
    text-shadow: 0 0 8px color-mix(in srgb, var(--ok) 60%, transparent);
  }
  .apps-pill.rejected {
    color: var(--bad); background: color-mix(in srgb, var(--bad) 16%, transparent);
    border-color: color-mix(in srgb, var(--bad) 40%, transparent); text-shadow: 0 0 8px color-mix(in srgb, var(--bad) 60%, transparent);
  }
  .apps-meta { font-family: var(--font-mono); font-size: 0.66rem; color: var(--text-faint); margin: 0 0 6px; }
  .apps-note { font-size: 0.78rem; color: var(--text-dim); line-height: 1.5; margin: 0; }

  footer {
    margin-top: 30px; padding-top: 18px; border-top: 1px solid var(--hairline);
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-faint);
    letter-spacing: 0.03em; line-height: 1.7;
  }
</style>

<div class="screen">
  <a class="back" href="https://claude.ai/code/artifact/19dc184b-9e66-40e3-a25f-d4348f83bf4b">&larr; Cerebro.exe</a>

  <header class="hero">
    <span class="eyebrow"><span class="dot"></span>⏸️ modo mantenimiento</span>
    <h1>Trabajo</h1>
    <p>Comercio exterior / aduanas como horizonte de mediano plazo — pero la prioridad real es más dinero y/o remoto, ya.</p>
  </header>

  <div class="callout">
    <strong>Modo mantenimiento (desde el 31/08/2026):</strong> se baja la prioridad para liberar espacio a titulación y desempeño. Nada de bloques largos de búsqueda — solo 1-2 vacantes en la comida, un par de veces por semana, y contestar a quien ya escribió. Aplicar solo si algo cumple 2 de 3: sube el sueldo, es remoto o recorta el traslado, o el salario cotizado ante el IMSS es bueno.
  </div>

  <div class="card">
    <h2>🔎 Rutas de búsqueda guardadas — actualizado 05/09/2026</h2>
    <p style="margin:0 0 12px; font-size:0.82rem; color:var(--text-dim); line-height:1.5;">15 min en la comida, no un bloque de la noche. Guarda estas 4 en favoritos del celular:</p>
    <div class="table-wrap">
      <table class="saved">
        <tr><th>Ruta</th><th>Dónde</th><th>Qué buscar</th></tr>
        <tr>
          <td class="saved-name">💵 Remoto en dólares</td>
          <td><a href="https://mx.indeed.com/q-trabajo-remoto-espa%C3%B1ol,-pago-en-dolares-empleos.html" target="_blank" rel="noopener">Indeed MX</a> · <a href="https://www.weremoto.com/categoria-de-trabajo/atencion-al-cliente" target="_blank" rel="noopener">WeRemoto</a></td>
          <td>"customer success remoto", "bilingual support LatAm"</td>
        </tr>
        <tr>
          <td class="saved-name">🖥️ Salto lateral de CS</td>
          <td><a href="https://mx.computrabajo.com/trabajo-de-customer-success-manager-en-remoto" target="_blank" rel="noopener">Computrabajo</a> · <a href="https://www.glassdoor.com.mx/Empleo/ciudad-de-m%C3%A9xico-customer-success-empleos-SRCH_IL.0,16_IC5017436_KO17,33.htm" target="_blank" rel="noopener">Glassdoor CDMX</a></td>
          <td>"customer success", "soporte bilingüe" + home office</td>
        </tr>
        <tr>
          <td class="saved-name">🌎 Comercio exterior</td>
          <td>Indeed / OCC / LinkedIn</td>
          <td>"auxiliar aduanal", "coordinador de importaciones"</td>
        </tr>
        <tr>
          <td class="saved-name">🔁 Lo ya prendido</td>
          <td><a href="https://www.linkedin.com/in/diego-ruiz-elizondo-634b48297" target="_blank" rel="noopener">LinkedIn #OpenToWork</a></td>
          <td>Contestar reclutadores que escriban, nada más</td>
        </tr>
      </table>
    </div>
    <p style="margin:14px 0 0; font-size:0.8rem; color:var(--text-dim); line-height:1.5;"><strong style="color:var(--text)">Filtro de 30 segundos</strong> — vale la pena solo si cumple 2 de 3: sube el sueldo de forma clara, es remota o recorta el traslado de 2h40, o el salario ante el IMSS es bueno (no solo el paquete con bonos).</p>
  </div>

  <div class="card">
    <h2>Rutas posibles (panorama de sueldos)</h2>
    <div class="table-wrap">
      <table class="routes">
        <tr><th>Ruta</th><th>Sueldo aprox.</th></tr>
        <tr>
          <td class="route-name">Asistente virtual / soporte remoto en USD<span class="badge-now">● la más viable ahora</span></td>
          <td class="route-pay">$8–15 USD/h</td>
        </tr>
        <tr>
          <td class="route-name">Customer Success remoto (empresa EU en LatAm)</td>
          <td class="route-pay">~$1,300 USD/mes</td>
        </tr>
        <tr>
          <td class="route-name">Salto lateral a otro CS/soporte bilingüe</td>
          <td class="route-pay">Variable</td>
        </tr>
        <tr>
          <td class="route-name">Coordinador logística/documentación (forwarder)</td>
          <td class="route-pay">Similar al lateral</td>
        </tr>
        <tr>
          <td class="route-name">Auxiliar comercio exterior (entrada)</td>
          <td class="route-pay">$9K–18K MXN</td>
        </tr>
        <tr>
          <td class="route-name">Coordinador comercio exterior/logística</td>
          <td class="route-pay">$25K–45K MXN</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="card">
    <h2>CV — ajustes (16/08/2026)</h2>
    <div class="progress-row"><span>Completado</span><span class="count">6 / 6</span></div>
    <div class="bar"><div class="bar-fill" style="width:100%"></div></div>
    <p style="margin:0; font-size:0.82rem; color:var(--text-dim); line-height:1.5;">PDF final entregado (ESP/ENG) con enfoque comex, cifras reales de Boost Mobile y palabras clave ATS. Segundo CV enfocado en soporte remoto/USD también entregado. Solo falta que confirmes que te gustó como quedó.</p>
  </div>

  <div class="card">
    <h2>LinkedIn — ajustes (16/08/2026)</h2>
    <div class="progress-row"><span>Completado</span><span class="count">4 / 9</span></div>
    <div class="bar"><div class="bar-fill" style="width:44.4%"></div></div>
    <ul class="checklist">
      <li class="done"><span class="box">✓</span><span class="label">Headline con palabras clave (comex, bilingüe, remoto)</span></li>
      <li class="done"><span class="box">✓</span><span class="label">Palabras clave ATS en "Acerca de"</span></li>
      <li class="done"><span class="box">✓</span><span class="label">Cuantificar Boost Mobile con métricas reales</span></li>
      <li class="done"><span class="box">✓</span><span class="label">Afinar preferencias de #OpenToWork</span></li>
      <li><span class="box"></span><span class="label">Corregir fechas de CIALC en LinkedIn (dice jun 2023–feb 2026, la real es sep 2023–may 2025) y de DIF Tlalnepantla</span></li>
      <li><span class="box"></span><span class="label">Agregar sección de Idiomas formal</span></li>
      <li><span class="box"></span><span class="label">Conectar con gente del gremio (37 contactos es poco)</span></li>
      <li><span class="box"></span><span class="label">Uniformar idioma de la sección Educación</span></li>
      <li><span class="box"></span><span class="label">Agregar proyectos destacados</span></li>
    </ul>
  </div>

  <div class="card">
    <h2>Puertas de entrada por explorar</h2>
    <ul class="checklist">
      <li><span class="box"></span><span class="label">Vacantes de auxiliar aduanal / asistente en agencias</span></li>
      <li><span class="box"></span><span class="label">Vacantes de comercio exterior en importadoras/exportadoras</span></li>
      <li><span class="box"></span><span class="label">Logística internacional (freight forwarders)</span></li>
      <li><span class="box"></span><span class="label">Bolsa de trabajo de la universidad</span></li>
      <li><span class="box"></span><span class="label">Perfil en Virtual Latinos / Belay / Boldly / Somewhere / Near</span></li>
    </ul>
  </div>

  <div class="card">
    <h2>Vacantes aplicadas</h2>
    <div class="apps">
      <div class="apps-item">
        <div class="apps-head">
          <p class="apps-name">SMJ Consulting — Customer Service Representative, Freight Forwarder</p>
          <span class="apps-pill">Aplicado</span>
        </div>
        <p class="apps-meta">17/08/2026 · Indeed · $25–28K MXN, presencial CDMX</p>
        <p class="apps-note">Match fuerte: RI + atención al cliente bilingüe. Cumple el requisito de "1 año en customer service o importación marítima" con tus 2+ años en Boost Mobile. CV y carta enviados. Sin respuesta registrada todavía.</p>
      </div>
      <div class="apps-item">
        <div class="apps-head">
          <p class="apps-name">NC Recruitment (Jesse Lopez) — Travel Reservation Specialist → Customer Service Rep, American Express</p>
          <span class="apps-pill rejected">Rechazado (por Diego)</span>
        </div>
        <p class="apps-meta">17/08 Indeed → 23/08 WhatsApp · hasta $27,200 MXN/mes, híbrido, oficinas Patriotismo CDMX</p>
        <p class="apps-note">Mismo reclutador, dos ofertas seguidas (Travel Reservation Specialist, luego CSR para AmEx). El 31/08/2026 decidiste no seguir — se cierra el hilo. Motivo no registrado; dilo si quieres dejarlo anotado para calibrar qué sí buscar en modo mantenimiento.</p>
      </div>
    </div>
  </div>

  <footer>fuente: metas/trabajo.md · se actualiza cuando avances algo</footer>
</div>

</body></html>


===== END FILE: ARTIFACTS_SOURCE/Trabajo.exe__fe81e91b-4a6f-4e04-aa6f-8355a64bb136.html =====

